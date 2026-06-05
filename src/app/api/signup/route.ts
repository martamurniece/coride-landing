import { NextRequest } from 'next/server';
import { LinearClient } from '@linear/sdk';
import { Resend } from 'resend';

/* ── Rate-limit store (in-memory, resets on restart — fine for v1) ── */
const rateMap = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  rateMap.set(ip, recent);
  return false;
}

/* ── Validation helpers ── */
const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, '');
}

function clean(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return stripTags(value).trim().slice(0, maxLen);
}

/* ── Linear helpers ── */
async function getOrCreateLabel(
  linear: LinearClient,
  teamId: string,
  labelName: string,
): Promise<string> {
  const labels = await linear.issueLabels({
    filter: { name: { eq: labelName }, team: { id: { eq: teamId } } },
  });
  const existing = labels.nodes[0];
  if (existing) return existing.id;

  const created = await linear.createIssueLabel({ name: labelName, teamId });
  const label = await created.issueLabel;
  if (!label) throw new Error('Failed to create label');
  return label.id;
}

/* ── POST handler ── */
export async function POST(request: NextRequest) {
  /* Same-origin check */
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host || new URL(origin).host !== host) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  /* Rate limit */
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';
  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();

    /* Honeypot */
    if (body.website) {
      // Silently accept to not tip off bots
      return Response.json({ ok: true });
    }

    /* Consent check */
    if (!body.consent) {
      return Response.json(
        { error: 'You must agree to be contacted to submit this form.' },
        { status: 400 },
      );
    }

    const role = clean(body.role, 20);
    if (role !== 'individual' && role !== 'partner') {
      return Response.json({ error: 'Invalid role.' }, { status: 400 });
    }

    const email = clean(body.email, 254);
    if (!email || !EMAIL_RE.test(email)) {
      return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    /* Role-specific validation */
    let title: string;
    let description: string;
    let labelName: string;
    let emailSubject: string;
    let emailBody: string;

    if (role === 'individual') {
      const name = clean(body.name, 100);
      const company = clean(body.company, 200);
      const area = clean(body.area, 500);

      if (!name) {
        return Response.json({ error: 'Name is required.' }, { status: 400 });
      }
      if (!company) {
        return Response.json({ error: 'Workplace is required.' }, { status: 400 });
      }

      title = `[Individual] ${name} — ${company}`;
      description = [
        `**Name:** ${name}`,
        `**Email:** ${email}`,
        `**Workplace:** ${company}`,
        area ? `**Commute area:** ${area}` : null,
      ]
        .filter(Boolean)
        .join('\n\n');
      labelName = 'lead:individual';
      emailSubject = 'We got your Coride request';
      emailBody = [
        `Hi ${name},`,
        '',
        'Thanks for signing up for early access to Coride! We received your request and will be in touch when Coride goes live for your workplace.',
        '',
        'In the meantime, feel free to reply to this email if you have any questions.',
        '',
        'The Coride team.',
      ].join('\n');
    } else {
      const businessName = clean(body.businessName, 200);
      const contactName = clean(body.contactName, 100);
      const perkIdea = clean(body.perkIdea, 500);

      if (!businessName) {
        return Response.json({ error: 'Business name is required.' }, { status: 400 });
      }
      if (!contactName) {
        return Response.json({ error: 'Name and role is required.' }, { status: 400 });
      }

      title = `[Partner] ${contactName} — ${businessName}`;
      description = [
        `**Business:** ${businessName}`,
        `**Contact:** ${contactName}`,
        `**Email:** ${email}`,
        perkIdea ? `**Perk idea:** ${perkIdea}` : null,
      ]
        .filter(Boolean)
        .join('\n\n');
      labelName = 'lead:partner';
      emailSubject = 'Welcome to the Coride partner inquiry';
      emailBody = [
        `Hi ${contactName},`,
        '',
        `Thanks for expressing interest in becoming a Coride partner with ${businessName}! We received your inquiry and will be in touch soon to discuss how we can work together.`,
        '',
        'Feel free to reply to this email if you have any questions.',
        '',
        'The Coride team.',
      ].join('\n');
    }

    /* Env checks */
    const linearKey = process.env.LINEAR_API_KEY;
    const linearTeamId = process.env.LINEAR_TEAM_ID;
    const linearProjectId = process.env.LINEAR_PROJECT_ID;
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!linearKey || !linearTeamId || !linearProjectId || !resendKey || !fromEmail) {
      console.error('Missing required environment variables');
      return Response.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    /* Create Linear issue */
    const linear = new LinearClient({ apiKey: linearKey });
    const labelId = await getOrCreateLabel(linear, linearTeamId, labelName);

    await linear.createIssue({
      teamId: linearTeamId,
      projectId: linearProjectId,
      title,
      description,
      labelIds: [labelId],
    });

    /* Send confirmation email */
    const resend = new Resend(resendKey);
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: emailSubject,
      text: emailBody,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Signup route error:', err instanceof Error ? err.message : 'Unknown error');
    return Response.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    );
  }
}

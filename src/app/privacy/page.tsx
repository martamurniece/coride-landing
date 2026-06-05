import type { Metadata } from 'next';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy - Coride',
  description: 'How Coride (SIA "Milup") collects, uses, and protects personal data.',
};

export default function PrivacyPage() {
  return (
    <div className="page">
      <Nav />
      <main className="legalDoc">
        <article className="legalInner">
          <h1>Privacy Policy</h1>
          <p className="legalMeta">Last updated: June 5, 2026</p>

          <p className="legalLead">
            This Privacy Policy explains how Milup SIA (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
            &ldquo;Coride&rdquo;) collects, uses, and protects personal data when you use the
            Coride website.
          </p>

          <h2>1. Who we are</h2>
          <p>
            Coride is a brand of SIA &ldquo;Milup&rdquo;, registered in Latvia. Registration
            number: 40203734972. Registered address: Raunas iela 45 k-1 - 20, Rīga, LV-1084.
            Contact: <a href="mailto:info@coride.org">info@coride.org</a>.
          </p>

          <h2>2. What data we collect</h2>
          <p>When you submit the signup form, we collect:</p>
          <ul>
            <li>Your name</li>
            <li>Your email address</li>
            <li>For individuals: your employer name (or &ldquo;Don&rsquo;t want to say&rdquo;)</li>
            <li>For partners: business name, role, perk offer (optional)</li>
            <li>Technical: IP address (used only for rate limiting, not stored long-term)</li>
          </ul>
          <p>
            We do not use cookies or analytics that track you. The site uses Plausible Analytics,
            which is cookieless and does not collect personal data.
          </p>

          <h2>3. Why we collect it</h2>
          <ul>
            <li>To respond to your inquiry about Coride</li>
            <li>To notify you when Coride launches at your workplace</li>
            <li>
              To improve our understanding of Coride&rsquo;s potential user base (in aggregated
              form)
            </li>
          </ul>
          <p>
            We do not sell, rent, or share your personal data with third parties for marketing.
          </p>

          <h2>4. How we store it</h2>
          <p>Form submissions are processed by:</p>
          <ul>
            <li>
              Linear (linear.app): used as our lead-tracking system. Data controller: us. Data
              processor: Linear.
            </li>
            <li>
              Resend (resend.com): sends our confirmation emails. Data controller: us. Data
              processor: Resend.
            </li>
          </ul>
          <p>
            We retain submitted contact information for up to 12 months from submission, after
            which it is anonymized or deleted.
          </p>

          <h2>5. Your rights</h2>
          <p>
            Under GDPR, you have the right to access, correct, or request deletion of your data, and
            to lodge a complaint with the Latvian Data State Inspectorate (Datu valsts inspekcija).
            To exercise any of these rights, email{' '}
            <a href="mailto:info@coride.org">info@coride.org</a>.
          </p>

          <h2>6. Changes to this policy</h2>
          <p>
            We will update this policy as our services evolve. The &ldquo;last updated&rdquo; date
            at the top reflects the most recent revision.
          </p>

          <h2>7. Contact</h2>
          <p>
            For privacy-related questions: <a href="mailto:info@coride.org">info@coride.org</a>
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}

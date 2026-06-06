'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type Branch = 'individual' | 'employer' | 'partner';
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

// TODO: replace with the real Coride Calendly link once it's set up.
const CALENDLY_URL = 'https://calendly.com/coride/intro';

export function SignupForm() {
  const [branch, setBranch] = useState<Branch>('individual');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [consent, setConsent] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const sizeStage = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const active = stage.querySelector('.branch.active') as HTMLElement | null;
    if (active) {
      // Use the fractional height and round up so the last line is never clipped
      // by the stage's overflow: hidden.
      stage.style.height = `${Math.ceil(active.getBoundingClientRect().height)}px`;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    // Measure after the next frame so layout is fully settled.
    const raf = requestAnimationFrame(() => {
      if (!cancelled) sizeStage();
    });
    window.addEventListener('resize', sizeStage);

    // Re-measure once web fonts have loaded — they swap in async and can make
    // content (e.g. the mono email note) taller than the initial measurement.
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        if (!cancelled) sizeStage();
      });
    }

    // Keep the stage in sync if the active branch's content changes size.
    const stage = stageRef.current;
    const active = stage?.querySelector('.branch.active') as HTMLElement | null;
    const ro = active ? new ResizeObserver(() => sizeStage()) : null;
    if (active && ro) ro.observe(active);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener('resize', sizeStage);
    };
  }, [branch, sizeStage]);

  // Re-measure when status changes (success message replaces form fields)
  useEffect(() => {
    sizeStage();
  }, [status, sizeStage]);

  const handleBranchChange = (b: Branch) => {
    setBranch(b);
    setStatus('idle');
    setErrorMsg('');
  };

  const handleSubmit = async () => {
    if (status === 'submitting') return;

    if (!consent) {
      setErrorMsg('You must agree to be contacted to submit this form.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    const form = formRef.current;
    if (!form) return;

    // Honeypot field value
    const honeypot = (form.querySelector('input[name="website"]') as HTMLInputElement)?.value ?? '';

    let payload: Record<string, unknown>;

    if (branch === 'individual') {
      const name = (form.querySelector('input[name="name"]') as HTMLInputElement)?.value ?? '';
      const email = (form.querySelector('input[name="email"]') as HTMLInputElement)?.value ?? '';
      const company = (form.querySelector('input[name="company"]') as HTMLInputElement)?.value ?? '';

      if (!name || !email || !company) {
        setErrorMsg('Please fill in all required fields.');
        setStatus('error');
        return;
      }

      payload = { role: 'individual', name, email, company, consent: true, website: honeypot };
    } else {
      const businessName = (form.querySelector('input[name="businessName"]') as HTMLInputElement)?.value ?? '';
      const contactName = (form.querySelector('input[name="contactName"]') as HTMLInputElement)?.value ?? '';
      const email = (form.querySelector('input[name="partnerEmail"]') as HTMLInputElement)?.value ?? '';
      const perkIdea = (form.querySelector('input[name="perkIdea"]') as HTMLInputElement)?.value ?? '';

      if (!businessName || !contactName || !email) {
        setErrorMsg('Please fill in all required fields.');
        setStatus('error');
        return;
      }

      payload = { role: 'partner', businessName, contactName, email, perkIdea, consent: true, website: honeypot };
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const handleBookCall = () => {
    window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="signup" id="signup">
      <div className="secHead">
        <h2>Start before the first ride.</h2>
      </div>
      <p className="signupSubhead">
        Coride pilots launch later this year. Tell us where you work, and we&apos;ll let you know when
        your company can join.
      </p>

      <form className="formCard" ref={formRef} onSubmit={(e) => e.preventDefault()}>
        {/* Honeypot — hidden from real users, bots will fill it */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', tabIndex: -1 } as React.CSSProperties}>
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        {status !== 'success' && (
          <>
            <div className="radioLabel">I&apos;m signing up as…</div>
            <div className="radioOpts">
              <RadioOption
                value="individual"
                title="An individual"
                desc="I'd like to use Coride at my workplace."
                checked={branch === 'individual'}
                onChange={() => handleBranchChange('individual')}
              />
              <RadioOption
                value="employer"
                title="An employer"
                desc="I want to bring Coride to my team."
                checked={branch === 'employer'}
                onChange={() => handleBranchChange('employer')}
              />
              <RadioOption
                value="partner"
                title="A partner"
                desc="My business wants to offer perks to Coride riders."
                checked={branch === 'partner'}
                onChange={() => handleBranchChange('partner')}
              />
            </div>
          </>
        )}

        <div className={`formStage${status === 'success' ? ' formStageSuccess' : ''}`} ref={stageRef}>
          {/* Individual */}
          <div className={`branch ${branch === 'individual' ? 'active' : ''}`}>
            {status === 'success' && branch === 'individual' ? (
              <div className="formSuccess">
                <p>We got it. We&apos;ll be in touch when Coride goes live for you.</p>
                <button className="formCta formCtaBack" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Back to top <span className="arr">↑</span>
                </button>
              </div>
            ) : (
              <>
                <div className="field">
                  <label>Your name</label>
                  <input type="text" name="name" placeholder="Jānis Bērziņš" />
                </div>
                <div className="field">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="janis@example.lv" />
                </div>
                <div className="field">
                  <label>Where do you work?</label>
                  <input type="text" name="company" placeholder={`Company name or "Prefer not to say"`} />
                </div>

                <label className="consentRow">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => { setConsent(e.target.checked); if (status === 'error') setErrorMsg(''); }}
                  />
                  <span className="consentText">
                    I agree to be contacted about Coride and have read the{' '}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                  </span>
                </label>

                {status === 'error' && errorMsg && (
                  <div className="formError">{errorMsg}</div>
                )}

                <button
                  className="formCta"
                  type="button"
                  disabled={status === 'submitting'}
                  onClick={handleSubmit}
                >
                  {status === 'submitting' ? 'Submitting…' : (
                    <>Add my workplace to the list <span className="arr">→</span></>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Employer */}
          <div className={`branch ${branch === 'employer' ? 'active' : ''}`}>
            <p className="branchMsg">
              We&apos;d rather talk than have you fill a form. Pick a 20-minute slot and we&apos;ll walk you
              through what a Coride pilot looks like for your team.
            </p>
            <button className="formCta" type="button" onClick={handleBookCall}>
              Book a call with Coride <span className="arr">→</span>
            </button>
            <div className="emailNote">
              Or email us: <a href="mailto:info@coride.org">info@coride.org</a>
            </div>
          </div>

          {/* Partner */}
          <div className={`branch ${branch === 'partner' ? 'active' : ''}`}>
            <p className="branchMsg">
              Want to offer perks to Coride riders? Let&apos;s talk. Pick a 20-minute slot and we&apos;ll
              figure out a partnership that works for your business.
            </p>
            <button className="formCta" type="button" onClick={handleBookCall}>
              Book a call with Coride <span className="arr">→</span>
            </button>
            <div className="emailNote">
              Or email us: <a href="mailto:info@coride.org">info@coride.org</a>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

function RadioOption({
  value,
  title,
  desc,
  checked,
  onChange,
}: {
  value: string;
  title: string;
  desc: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className={`ropt ${checked ? 'selected' : ''}`}>
      <input type="radio" name="who" value={value} checked={checked} onChange={onChange} />
      <span className="rmeta">
        <span className="rtitle">{title}</span>
        <span className="rdesc">{desc}</span>
      </span>
    </label>
  );
}

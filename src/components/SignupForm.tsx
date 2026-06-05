'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type Branch = 'individual' | 'employer' | 'partner';

export function SignupForm() {
  const [branch, setBranch] = useState<Branch>('individual');
  const stageRef = useRef<HTMLDivElement>(null);

  const sizeStage = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const active = stage.querySelector('.branch.active') as HTMLElement | null;
    if (active) stage.style.height = `${active.offsetHeight}px`;
  }, []);

  useEffect(() => {
    sizeStage();
    window.addEventListener('resize', sizeStage);
    return () => window.removeEventListener('resize', sizeStage);
  }, [branch, sizeStage]);

  return (
    <section className="signup" id="signup">
      <div className="secHead">
        <h2>Get on board early.</h2>
      </div>
      <p className="signupSubhead">
        First pilots launching later this year. Tell us who you are and we&apos;ll be in touch when
        Coride goes live for you.
      </p>

      <div className="formCard">
        <div className="radioLabel">I&apos;m signing up as…</div>
        <div className="radioOpts">
          <RadioOption
            value="individual"
            title="An individual"
            desc="I'd like to use Coride at my workplace."
            checked={branch === 'individual'}
            onChange={() => setBranch('individual')}
          />
          <RadioOption
            value="employer"
            title="An employer"
            desc="I want to bring Coride to my team."
            checked={branch === 'employer'}
            onChange={() => setBranch('employer')}
          />
          <RadioOption
            value="partner"
            title="A partner"
            desc="My business wants to offer perks to Coride riders."
            checked={branch === 'partner'}
            onChange={() => setBranch('partner')}
          />
        </div>

        <div className="formStage" ref={stageRef}>
          {/* Individual */}
          <div className={`branch ${branch === 'individual' ? 'active' : ''}`}>
            <div className="field">
              <label>Your name</label>
              <input type="text" placeholder="Jānis Bērziņš" />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="janis@example.lv" />
            </div>
            <div className="field">
              <label>Where do you work?</label>
              <input type="text" placeholder="Company name, or 'Don't want to say'" />
            </div>
            <div className="field">
              <label>Roughly where in Rīga do you commute from?</label>
              <input type="text" placeholder="Neighbourhood or area (e.g. Pārdaugava)" />
            </div>
            <button className="formCta" type="button">
              Add my workplace to the list <span className="arr">→</span>
            </button>
          </div>

          {/* Employer */}
          <div className={`branch ${branch === 'employer' ? 'active' : ''}`}>
            <p className="branchMsg">
              We&apos;d rather talk than have you fill a form. Pick a 20-minute slot and we&apos;ll walk you
              through what a Coride pilot looks like for your team.
            </p>
            <button className="formCta" type="button">
              Book a call with Coride <span className="arr">→</span>
            </button>
            <div className="emailNote">
              Or email us: <a href="mailto:info@coride.org">info@coride.org</a>
            </div>
          </div>

          {/* Partner */}
          <div className={`branch ${branch === 'partner' ? 'active' : ''}`}>
            <div className="field">
              <label>Business name</label>
              <input type="text" placeholder="Rocket Bean Roastery" />
            </div>
            <div className="field">
              <label>Your name and role</label>
              <input type="text" placeholder="Jānis Bērziņš, Owner" />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="janis@example.lv" />
            </div>
            <div className="field">
              <label>
                What kind of perk could you offer?{' '}
                <span className="optionalHint">(optional)</span>
              </label>
              <input type="text" placeholder="e.g. 10% off coffee, free class pass" />
            </div>
            <button className="formCta" type="button">
              Become a partner <span className="arr">→</span>
            </button>
          </div>
        </div>
      </div>
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

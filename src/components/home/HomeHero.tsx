'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { HeroDemo } from './HeroDemo';

export function HomeHero() {
  const { t } = useLocale();
  const h = t.hero;

  return (
    <header className="hHero" id="hero">
      <svg className="hHeroDeco" aria-hidden="true" width="224" height="960" viewBox="1216 0 224 960" fill="none">
        <path d="M1440,300 H1368" stroke="#F26B1F" strokeWidth="4" />
        <circle cx="1363" cy="300" r="5" fill="#F7F7F7" stroke="#F26B1F" strokeWidth="3" />
        <path d="M1216,700 V772 H1440" stroke="#0CA64A" strokeWidth="4" />
      </svg>
      <div className="hHeroCopy">
        <h1>{h.title}</h1>
        <p className="hHeroSub">{h.sub}</p>
        <div className="cCtaRow">
          <a className="cBtn" href="#signup">
            <span>{h.ctaPrimary}</span>
            <span aria-hidden="true">→</span>
          </a>
          <a className="cGhost" href="#how">
            <span className="cGhostIcon" aria-hidden="true">↓</span>
            <span>{h.ctaGhost}</span>
          </a>
        </div>
        <div className="hHeroLine" aria-hidden="true">
          <span />
        </div>
        <p className="hHeroNote">
          <strong>{h.tractionBold}</strong> {h.tractionRest}
        </p>
      </div>
      <div className="hHeroDemo">
        <HeroDemo />
      </div>
    </header>
  );
}

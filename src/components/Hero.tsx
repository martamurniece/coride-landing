'use client';

import { HeroLines } from './HeroLines';
import { HeroShowcase } from './showcase/HeroShowcase';
import { useLocale } from '@/i18n/LocaleProvider';

export function Hero() {
  const { t } = useLocale();

  return (
    <header className="hero">
      {/*
        Desktop line work. The green line is the FUNCTIONAL route: it enters
        from the top of the page, runs through the showcase panel (which draws
        its own segment), then turns below the panel and exits to the right
        page edge. Orange and blue are decorative side roads that dock into
        the panel's outer frame and never touch the route inside it.
        Panel box (see showcase.css): left 784, top 110, right 1344, bottom
        ~919; route x = 784 + 560 × (300/540) = 1095.
      */}
      <div className="heroNet" aria-hidden="true">
        <svg viewBox="0 0 1440 920" fill="none" preserveAspectRatio="none">
          {/* Lines outside the widget stay thinner than the route inside it.
              Green overlaps the panel edge (outer SVG sits behind the widget)
              so it reads as one continuous route; below the panel it turns
              and runs to the right page edge. Orange and blue are straight
              side stubs — same motif, no elbows. */}
          <path d="M1095,-20 V130" stroke="#0CA64A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1095,900 V960 H1462" stroke="#0CA64A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1462,300 H1344" stroke="#F26B1F" strokeWidth="5" strokeLinecap="round" />
          <path d="M-20,850 H784" stroke="#1B4FCF" strokeWidth="5" strokeLinecap="round" />
          <circle cx="1344" cy="300" r="5" fill="#fff" stroke="#F26B1F" strokeWidth="2.5" />
          <circle cx="784" cy="850" r="5" fill="#fff" stroke="#1B4FCF" strokeWidth="2.5" />
        </svg>
      </div>

      <div className="heroContent">
        <h1>{t.hero.title}</h1>
        <p className="heroSub">{t.hero.sub}</p>
        <div className="ctaRow">
          <a className="btnPrimary" href="#signup">
            {t.hero.ctaPrimary} <span className="arr">→</span>
          </a>
          <a className="btnGhost" href="#how">
            <span className="ico">↓</span> {t.hero.ctaGhost}
          </a>
        </div>
        <p className="traction">
          <strong>{t.hero.tractionBold}</strong> {t.hero.tractionRest}
        </p>
      </div>

      <HeroLines />

      <HeroShowcase />
    </header>
  );
}

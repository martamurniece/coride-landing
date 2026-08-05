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
        from the top of the page, runs at full weight through the showcase
        panel (which draws its own segment), and fades out below. The other
        coloured lines are decorative texture — they dock into the panel's
        outer frame and never touch the route inside it.
        Panel box (see showcase.css): left 784, top 110, right 1344, bottom
        ~919; route x = 784 + 560 × (300/540) = 1095.
      */}
      <div className="heroNet" aria-hidden="true">
        <svg viewBox="0 0 1440 920" fill="none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="heroRouteExit" gradientUnits="userSpaceOnUse" x1="0" y1="933" x2="0" y2="1046">
              <stop offset="0" stopColor="#0CA64A" />
              <stop offset="1" stopColor="#0CA64A" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Lines outside the widget stay thinner than the route inside it.
              Green stops short of the panel's top (110) and bottom (~919) so
              there's a clear gap at the edges — the inner route is unchanged.
              Blue runs along the hero's lower edge then rises toward the panel. */}
          <path d="M1095,-20 V96" stroke="#0CA64A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1095,933 V1046" stroke="url(#heroRouteExit)" strokeWidth="5" />
          <path d="M1462,300 H1344" stroke="#F26B1F" strokeWidth="5" strokeLinecap="round" />
          <path d="M-20,980 H900 V919" stroke="#1B4FCF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1200,1058 V919" stroke="#1f1f1f" strokeWidth="5" strokeLinecap="round" />
          <circle cx="1344" cy="300" r="5" fill="#fff" stroke="#F26B1F" strokeWidth="2.5" />
          <circle cx="900" cy="919" r="5" fill="#fff" stroke="#1B4FCF" strokeWidth="2.5" />
          <circle cx="1200" cy="919" r="5" fill="#fff" stroke="#1f1f1f" strokeWidth="2.5" />
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

'use client';

import { HeroLines } from './HeroLines';
import { useLocale } from '@/i18n/LocaleProvider';

export function Hero() {
  const { t } = useLocale();

  return (
    <header className="hero">
      <div className="heroNet" aria-hidden="true">
        <svg viewBox="0 0 1440 920" fill="none" preserveAspectRatio="none">
          <path d="M836,-20 V820 H1130" stroke="#0CA64A" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1462,300 H1344 V820 H1130" stroke="#F26B1F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-20,866 H1130 V820" stroke="#1B4FCF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1130,784 V820" stroke="#1f1f1f" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="1130" cy="784" r="5.5" fill="#fff" stroke="#1f1f1f" strokeWidth="3" />
          <circle cx="1130" cy="820" r="9" fill="#fff" stroke="#1f1f1f" strokeWidth="3" />
        </svg>
      </div>

      <div className="heroContent">
        <h1>{t.hero.title}</h1>
        <p className="heroSub">{t.hero.sub}</p>
        <div className="ctaRow">
          <button className="btnPrimary" type="button">
            {t.hero.ctaPrimary} <span className="arr">→</span>
          </button>
          <button className="btnGhost" type="button">
            <span className="ico">↓</span> {t.hero.ctaGhost}
          </button>
        </div>
        <p className="traction">
          <strong>{t.hero.tractionBold}</strong> {t.hero.tractionRest}
        </p>
      </div>

      <HeroLines />

      <div className="appFrame">
        <div className="notch" />
        <div className="appScreen">
          <div className="appPhGrid" />
          <div className="appPhStop" />
          <div className="appPhLabel">{t.hero.appPreview}</div>
          <div className="appPhNote">{t.hero.appNote}</div>
        </div>
      </div>
    </header>
  );
}

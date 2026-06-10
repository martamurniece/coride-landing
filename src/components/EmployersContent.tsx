'use client';

import Image from 'next/image';
import { useLocale } from '@/i18n/LocaleProvider';
import { CALENDLY_URL } from '@/lib/constants';
import { RouteBand } from './RouteBand';

const AFTER_LOT = [
  'car',
  'free',
  'free',
  'free',
  'free',
  'free',
  'car',
  'free',
  'free',
  'free',
  'free',
  'car',
  'free',
  'free',
  'free',
  'free',
] as const;

function CarCell() {
  return (
    <div className="ba-cell car">
      <Image src="/assets/coride-car.png" alt="" width={30} height={15} />
    </div>
  );
}

function BeforeAfterVisual() {
  const { t } = useLocale();

  return (
    <div
      className="diagram hv hv2"
      aria-label={t.employers.hero.baAria}
    >
      <div className="ba">
        <div className="ba-col before">
          <div className="ba-label">
            <span className="swatch" />
            {t.employers.hero.baBefore}
          </div>
          <div className="ba-grid">
            {Array.from({ length: 16 }, (_, i) => (
              <CarCell key={`before-${i}`} />
            ))}
          </div>
        </div>
        <div className="ba-arrow" aria-hidden="true">
          →
        </div>
        <div className="ba-col after">
          <div className="ba-label">
            <span className="swatch" />
            {t.employers.hero.baAfter}
          </div>
          <div className="ba-grid">
            {AFTER_LOT.map((kind, i) =>
              kind === 'car' ? (
                <CarCell key={`after-${i}`} />
              ) : (
                <div className="ba-cell free" key={`after-${i}`}>
                  <span className="d" />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <p className="ba-cap">{t.employers.hero.baCap}</p>
    </div>
  );
}


export function EmployersContent() {
  const { t } = useLocale();

  return (
    <>
      <header className="hero">
        <div className="empHeroInner">
          <div className="heroContent">
            <h1>{t.employers.hero.title}</h1>
            <p className="heroSub">{t.employers.hero.sub}</p>
            <div className="ctaRow">
              <a className="btnPrimary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                {t.employers.hero.ctaPrimary} <span className="arr">→</span>
              </a>
              <a className="btnGhost" href="#how">
                <span className="ico">↓</span> {t.employers.hero.ctaGhost}
              </a>
            </div>
          </div>
          <div className="empHeroVisual">
            <BeforeAfterVisual />
          </div>
        </div>
      </header>

      <section className="section" id="cost" style={{ paddingTop: 104 }}>
        <div className="section-head">
          <div className="station line-orange">
            <span className="tick" />
            <span className="node" />
          </div>
          <h2>{t.employers.cost.title}</h2>
          <p className="lead">{t.employers.cost.lead}</p>
        </div>
        <div className="grid cols-2">
          {t.employers.cost.cards.map((card) => (
            <article className={`cell ${card.line}`} key={card.title}>
              <div className="cell-mark">
                <span className="node" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="value" style={{ paddingTop: 120 }}>
        <div className="section-head">
          <div className="station line-green">
            <span className="tick" />
            <span className="node" />
          </div>
          <h2>{t.employers.value.title}</h2>
          <p className="lead">{t.employers.value.lead}</p>
        </div>
        <div className="grid cols-2">
          {t.employers.value.cards.map((card) => (
            <article
              className={`cell ${card.line}${'span2' in card && card.span2 ? ' span-2' : ''}`}
              key={card.title}
            >
              <div className="cell-mark">
                <span className="node" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="how" style={{ paddingTop: 120 }}>
        <div className="section-head">
          <div className="station line-magenta">
            <span className="tick" />
            <span className="node" />
          </div>
          <h2>{t.employers.how.title}</h2>
          <p className="lead">{t.employers.how.lead}</p>
        </div>
        <div className="metro">
          <div className="metro-line" />
          <div className="metro-stops">
            {t.employers.how.steps.map((step) => (
              <div className={`stop ${step.line}`} key={step.step}>
                <span className="dot" />
                <div className="stepno">Step {step.step}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RouteBand
        title={t.employers.pilot.title}
        body={t.employers.pilot.body}
        carAria={t.employers.pilot.carAria}
      />

      <section className="closing">
        <h2>{t.employers.closing.title}</h2>
        <p>{t.employers.closing.body}</p>
        <div className="ctaRow">
          <a className="btnPrimary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            {t.employers.closing.cta} <span className="arr">→</span>
          </a>
        </div>
        <div className="email-note">
          {t.employers.closing.emailNote}{' '}
          <a href="mailto:info@coride.org">info@coride.org</a>
        </div>
      </section>
    </>
  );
}

'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { CALENDLY_URL } from '@/lib/constants';
import { RouteBand } from './RouteBand';

function RouteMapVisual() {
  const { t } = useLocale();
  const map = t.partners.hero.map;

  return (
    <div className="diagram netmap" role="img" aria-label={map.aria}>
      <svg aria-hidden="true">
        <line x1="58%" y1="6%" x2="58%" y2="94%" stroke="var(--ink-300)" strokeWidth="3" />
        <line x1="58%" y1="24%" x2="38%" y2="24%" stroke="var(--line-orange-500)" strokeWidth="3" />
        <line x1="58%" y1="42%" x2="76%" y2="42%" stroke="var(--line-green-500)" strokeWidth="3" />
        <line x1="58%" y1="60%" x2="40%" y2="60%" stroke="var(--line-magenta-500)" strokeWidth="3" />
        <line x1="58%" y1="78%" x2="74%" y2="78%" stroke="var(--line-brown-500)" strokeWidth="3" />
        <circle cx="58%" cy="6%" r="6" fill="var(--ink-950)" />
        <circle cx="58%" cy="94%" r="6" fill="var(--ink-950)" />
        <circle cx="58%" cy="24%" r="6" fill="var(--surface-elevated)" stroke="var(--line-orange-500)" strokeWidth="3.5" />
        <circle cx="58%" cy="42%" r="6" fill="var(--surface-elevated)" stroke="var(--line-green-500)" strokeWidth="3.5" />
        <circle cx="58%" cy="60%" r="6" fill="var(--surface-elevated)" stroke="var(--line-magenta-500)" strokeWidth="3.5" />
        <circle cx="58%" cy="78%" r="6" fill="var(--surface-elevated)" stroke="var(--line-brown-500)" strokeWidth="3.5" />
      </svg>
      <span className="hublabel" style={{ left: '63%', top: '4%' }}>{map.home}</span>
      <span className="hublabel" style={{ left: '63%', bottom: '4%' }}>{map.work}</span>
      <span className="biz" style={{ right: '66%', top: '24%', transform: 'translateY(-50%)' }}>
        <span className="pin" style={{ background: 'var(--line-orange-500)' }} />
        {map.cafe}
      </span>
      <span className="biz" style={{ left: '78%', top: '42%', transform: 'translateY(-50%)' }}>
        <span className="pin" style={{ background: 'var(--line-green-500)' }} />
        {map.gym}
      </span>
      <span className="biz" style={{ right: '64%', top: '60%', transform: 'translateY(-50%)' }}>
        <span className="pin" style={{ background: 'var(--line-magenta-500)' }} />
        {map.shop}
      </span>
      <span className="biz" style={{ left: '76%', top: '78%', transform: 'translateY(-50%)' }}>
        <span className="pin" style={{ background: 'var(--line-brown-500)' }} />
        {map.bakery}
      </span>
      <div className="diagram-cap">{map.cap}</div>
    </div>
  );
}

export function PartnersContent() {
  const { t } = useLocale();

  return (
    <>
      <header className="hero">
        <div className="empHeroInner">
          <div className="heroContent">
            <h1>{t.partners.hero.title}</h1>
            <p className="heroSub">{t.partners.hero.sub}</p>
            <div className="ctaRow">
              <a className="btnPrimary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                {t.partners.hero.ctaPrimary} <span className="arr">→</span>
              </a>
              <a className="btnGhost" href="#how">
                <span className="ico">↓</span> {t.partners.hero.ctaGhost}
              </a>
            </div>
          </div>
          <div className="empHeroVisual">
            <RouteMapVisual />
          </div>
        </div>
      </header>

      <section className="section" id="why" style={{ paddingTop: 104 }}>
        <div className="section-head">
          <div className="station line-orange">
            <span className="tick" />
            <span className="node" />
          </div>
          <h2>{t.partners.why.title}</h2>
          <p className="lead">{t.partners.why.lead}</p>
        </div>
        <div className="grid cols-2">
          {t.partners.why.cards.map((card) => (
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

      <section className="section" id="how" style={{ paddingTop: 120 }}>
        <div className="section-head">
          <div className="station line-green">
            <span className="tick" />
            <span className="node" />
          </div>
          <h2>{t.partners.how.title}</h2>
          <p className="lead">{t.partners.how.lead}</p>
        </div>
        <div className="metro">
          <div className="metro-line" />
          <div className="metro-stops">
            {t.partners.how.steps.map((step) => (
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

      <section className="section" id="local" style={{ paddingTop: 120 }}>
        <div className="section-head">
          <div className="station line-magenta">
            <span className="tick" />
            <span className="node" />
          </div>
          <h2>{t.partners.local.title}</h2>
          <p className="lead">{t.partners.local.body}</p>
        </div>
        <div className="biztags">
          {t.partners.local.tags.map((tag) => (
            <span className={`tag ${tag.color}`} key={tag.label}>
              <span className="pin" />
              {tag.label}
            </span>
          ))}
        </div>
      </section>

      <RouteBand
        title={t.partners.network.title}
        body={t.partners.network.body}
        carAria={t.partners.network.carAria}
      />

      <section className="closing">
        <h2>{t.partners.closing.title}</h2>
        <p>{t.partners.closing.body}</p>
        <div className="ctaRow">
          <a className="btnPrimary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
            {t.partners.closing.cta} <span className="arr">→</span>
          </a>
        </div>
        <div className="email-note">
          {t.partners.closing.emailNote}{' '}
          <a href="mailto:info@coride.org">info@coride.org</a>
        </div>
      </section>
    </>
  );
}

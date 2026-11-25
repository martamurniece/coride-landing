'use client';

import { useLocale } from '@/i18n/LocaleProvider';
import { CALENDLY_URL } from '@/lib/constants';
import { AdminTimeline } from './employers/AdminTimeline';
import { ReportDemo } from './employers/ReportDemo';

const STEP_COLORS = ['blue', 'orange', 'green', 'magenta'];
const FEATURE_COLORS = ['blue', 'green', 'magenta'];

function SecMark({ color }: { color: string }) {
  return (
    <div className="emMark" aria-hidden="true" style={{ ['--mc' as string]: `var(--${color})` }}>
      <span />
      <span />
    </div>
  );
}

export function EmployersContent() {
  const { t } = useLocale();
  const e = t.employers;

  return (
    <>
      <header className="emHero">
        <div className="emHeroCopy">
          <h1>{e.hero.title}</h1>
          <p className="emHeroSub">{e.hero.sub}</p>
          <div className="cCtaRow">
            <a className="cBtn" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <span>{e.hero.ctaPrimary}</span>
              <span aria-hidden="true">→</span>
            </a>
            <a className="cGhost" href="#how">
              <span className="cGhostIcon" aria-hidden="true">↓</span>
              <span>{e.hero.ctaGhost}</span>
            </a>
          </div>
        </div>
        <div className="emHeroVisual">
          <AdminTimeline />
        </div>
      </header>

      <section className="emSec" id="value">
        <div className="emHead">
          <SecMark color="green" />
          <h2>{e.value.title}</h2>
          <p>{e.value.lead}</p>
        </div>
        <div className="emTiles">
          <article className="emTile emTileBig">
            <p className="emToday">{e.value.big.today}</p>
            <h3>{e.value.big.title}</h3>
            <p>{e.value.big.desc}</p>
          </article>
          {e.value.cards.map((c) => (
            <article key={c.title} className={`emTile tint-${c.color}`}>
              <span className="emTileDot" aria-hidden="true" />
              {c.today && <p className="emToday">{c.today}</p>}
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </article>
          ))}
          <article className="emTile emTileWide tint-lime">
            <span className="emTileDot" aria-hidden="true" />
            <h3>{e.value.wide.title}</h3>
            <p>{e.value.wide.desc}</p>
          </article>
        </div>
      </section>

      <section className="emSec" id="admin">
        <div className="emHead">
          <SecMark color="blue" />
          <h2>{e.admin.title}</h2>
          <p>{e.admin.lead}</p>
        </div>
        <div className="emAdmin">
          <div className="emFeatures">
            {e.admin.features.map((f, i) => (
              <div key={f.title} className="emFeature">
                <span aria-hidden="true" style={{ background: `var(--${FEATURE_COLORS[i]})` }} />
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="emAdminVisual">
            <ReportDemo />
          </div>
        </div>
      </section>

      <section className="emSec" id="how">
        <div className="emHead">
          <SecMark color="magenta" />
          <h2>{e.how.title}</h2>
          <p>{e.how.lead}</p>
        </div>
        <div className="emSteps">
          <div className="emStepsLine" aria-hidden="true" />
          <ol>
            {e.how.steps.map((s, i) => (
              <li key={s.title}>
                <span className="emStepDot" aria-hidden="true" style={{ borderColor: `var(--${STEP_COLORS[i]})` }} />
                <div className={`emStepNum c-${STEP_COLORS[i]}`}>
                  {e.how.step} {String(i + 1).padStart(2, '0')}
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="emSec emClosingSec" id="signup">
        <div className="emClosing">
          <div className="emClosingRow">
            <div className="emClosingLeft">
              <div className="emClosingLabel">
                <span aria-hidden="true" />
                <span>{e.closing.label}</span>
              </div>
              <h2>{e.closing.title}</h2>
            </div>
            <div className="emClosingRight">
              <p>{e.closing.body}</p>
              <a className="cBtn cBtnLight" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                <span>{e.closing.cta}</span>
                <span aria-hidden="true">→</span>
              </a>
              <p className="emClosingEmail">
                {e.closing.emailNote} <a href="mailto:info@coride.org">info@coride.org</a>
              </p>
            </div>
          </div>
          <div className="emClosingRoad" aria-hidden="true">
            <div className="emClosingRoadLine" />
            <span className="emClosingCar">
              <svg width="44" height="21" viewBox="0 0 44 21">
                <rect x="1" y="1.5" width="42" height="18" rx="7" fill="#F7F7F7" />
                <rect x="27" y="4" width="7" height="13" rx="2.5" fill="#8C8C8C" />
                <rect x="9" y="4" width="5" height="13" rx="2" fill="#C4C4C4" />
              </svg>
            </span>
            <span className="emClosingStop" style={{ left: '37%', borderColor: 'var(--orange)' }} />
            <span className="emClosingStop" style={{ left: '67%', borderColor: 'var(--green)' }} />
            <span className="emClosingStop emClosingEnd" />
          </div>
        </div>
      </section>
    </>
  );
}

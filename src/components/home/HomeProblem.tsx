'use client';

import { useLocale } from '@/i18n/LocaleProvider';

export function HomeProblem() {
  const { t } = useLocale();
  const p = t.home.problem;

  return (
    <section className="hSec hProblem" id="problem">
      <span className="hMNode" data-color="blue" aria-hidden="true" />
      <h2 className="hH2">{p.title}</h2>
      <div className="hProblemGrid">
        <article className="hCard">
          <div className="hCardArt" aria-hidden="true">
            <div className="artCost">
              <div className="artCostCol">
                <span />
                <span />
              </div>
              <span className="artCostCar" />
              <div className="artCostCol">
                <span />
                <span />
              </div>
            </div>
          </div>
          <div className="hCardBody">
            <div className="tag tagOrange">
              <span aria-hidden="true" />
              <span>{p.cost.tag}</span>
            </div>
            <h3>{p.cost.title}</h3>
            <p>{p.cost.desc}</p>
          </div>
        </article>
        <article className="hCard">
          <div className="hCardArt" aria-hidden="true">
            <div className="artPlaces">
              {p.coverage.places.map((place) => (
                <span key={place} className="pill">
                  <span className="pillRing" />
                  {place}
                </span>
              ))}
            </div>
          </div>
          <div className="hCardBody">
            <div className="tag tagGreen">
              <span aria-hidden="true" />
              <span>{p.coverage.tag}</span>
            </div>
            <h3>{p.coverage.title}</h3>
            <p>{p.coverage.desc}</p>
          </div>
        </article>
        <article className="hCard">
          <div className="hCardArt" aria-hidden="true">
            <div className="artTrust">
              <div className="artTrustRow">
                <span className="artAvatar">AK</span>
                <span className="artLink" />
                <span className="artAvatar">TV</span>
                <span className="artLink" />
                <span className="artAvatar">LB</span>
              </div>
              <span className="pill">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#B5279E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 7.5l3 3 6-7" />
                </svg>
                {p.trust.verified}
              </span>
            </div>
          </div>
          <div className="hCardBody">
            <div className="tag tagMagenta">
              <span aria-hidden="true" />
              <span>{p.trust.tag}</span>
            </div>
            <h3>{p.trust.title}</h3>
            <p>{p.trust.desc}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

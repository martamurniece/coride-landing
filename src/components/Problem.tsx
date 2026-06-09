'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';

export function Problem() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Build parking grid for card 4
    const grid = section.querySelector('.a4Grid');
    if (grid && grid.children.length === 0) {
      const stay = new Set([2, 6, 11]);
      for (let i = 0; i < 15; i++) {
        const cell = document.createElement('div');
        cell.className = 'a4Cell' + (stay.has(i) ? '' : ' leave');
        const car = document.createElement('div');
        car.className = 'ccar';
        car.style.animationDelay = `${i * 45}ms`;
        cell.appendChild(car);
        grid.appendChild(cell);
      }
    }

    // IntersectionObserver for card animations
    const cards = section.querySelectorAll('.pcard');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('play');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 },
    );
    cards.forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="problem" id="problem" ref={sectionRef}>
      <div className="secHead">
        <h2>{t.problem.title}</h2>
      </div>

      <div className="pgrid">
        {/* Card 1 — Traffic */}
        <article className="pcard line-blue" id="card1">
          <div className="pcardMedia">
            <div className="a1Lane">
              <span className="edge l" />
              <span className="edge r" />
            </div>
            <div className="cg empty a1Car c1" style={{ '--stop': '188px', zIndex: 5 } as React.CSSProperties} />
            <div className="cg empty a1Car c2" style={{ '--stop': '170px', zIndex: 4 } as React.CSSProperties} />
            <div className="cg empty a1Car c3" style={{ '--stop': '152px', zIndex: 3 } as React.CSSProperties} />
            <div className="cg empty a1Car c4" style={{ '--stop': '134px', zIndex: 2 } as React.CSSProperties} />
            <div className="cg empty a1Car c5" style={{ '--stop': '116px', zIndex: 1 } as React.CSSProperties} />
          </div>
          <div className="pcardBody">
            <div className="pcardTag"><span className="pip" />{t.problem.cards[0].tag}</div>
            <h3>{t.problem.cards[0].title}</h3>
            <p>{t.problem.cards[0].desc}</p>
          </div>
        </article>

        {/* Card 2 — Cost */}
        <article className="pcard line-orange" id="card2">
          <div className="pcardMedia">
            <div className="a2Stage">
              <div className="a2Car">
                <div className="cg" style={{ position: 'relative' }} />
                <div className="a2Seat s1" style={{ left: -34, top: 0 }} />
                <div className="a2Seat s2" style={{ right: -34, top: 0 }} />
                <div className="a2Seat s3" style={{ left: -34, bottom: 0 }} />
                <div className="a2Seat s4" style={{ right: -34, bottom: 0 }} />
              </div>
            </div>
          </div>
          <div className="pcardBody">
            <div className="pcardTag"><span className="pip" />{t.problem.cards[1].tag}</div>
            <h3>{t.problem.cards[1].title}</h3>
            <p>{t.problem.cards[1].desc}</p>
          </div>
        </article>

        {/* Card 3 — Coverage */}
        <article className="pcard line-green" id="card3">
          <div className="pcardMedia">
            <div className="a3Wrap">
              <svg viewBox="0 0 620 196" fill="none" preserveAspectRatio="xMidYMid meet">
                <path className="a3Line" pathLength={100} d="M70,150 L70,96 L190,96 L190,140 L320,140 L320,70 L430,70" />
                <g className="a3Dest">
                  <circle cx="466" cy="48" r="7" fill="none" stroke="#0CA64A" strokeWidth="3" />
                  <circle cx="466" cy="98" r="7" fill="none" stroke="#0CA64A" strokeWidth="3" />
                  <circle cx="466" cy="148" r="7" fill="none" stroke="#0CA64A" strokeWidth="3" />
                  <text x="482" y="52" fontFamily="DM Mono, monospace" fontSize="11" fill="#5e5e5e">Industrial park</text>
                  <text x="482" y="102" fontFamily="DM Mono, monospace" fontSize="11" fill="#5e5e5e">Airport RIX</text>
                  <text x="482" y="152" fontFamily="DM Mono, monospace" fontSize="11" fill="#5e5e5e">Logistics hub</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="pcardBody">
            <div className="pcardTag"><span className="pip" />{t.problem.cards[2].tag}</div>
            <h3>{t.problem.cards[2].title}</h3>
            <p>{t.problem.cards[2].desc}</p>
          </div>
        </article>

        {/* Card 4 — Parking */}
        <article className="pcard line-magenta" id="card4">
          <div className="pcardMedia">
            <div className="a4Grid" />
          </div>
          <div className="pcardBody">
            <div className="pcardTag"><span className="pip" />{t.problem.cards[3].tag}</div>
            <h3>{t.problem.cards[3].title}</h3>
            <p>{t.problem.cards[3].desc}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

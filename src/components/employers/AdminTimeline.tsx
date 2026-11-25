'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';

const SHARING = [4, 11, 18, 25, 31];
const PARKED = [15, 13, 11, 9, 7];
const BAR_H = [14, 32, 52, 74, 100];
// Order in which parking spaces empty out, so the free spaces look scattered.
const ORDER = [0, 5, 10, 15, 2, 7, 12, 1, 6, 11, 3, 8, 13, 4, 9, 14];

function Car() {
  return (
    <svg aria-hidden="true" width="26" height="13" viewBox="0 0 44 21" className="emCar">
      <rect x="1" y="1.5" width="42" height="18" rx="7" fill="#1F1F1F" />
      <rect x="27" y="4" width="7" height="13" rx="2.5" fill="#8C8C8C" />
      <rect x="9" y="4" width="5" height="13" rx="2" fill="#5E5E5E" />
    </svg>
  );
}

export function AdminTimeline() {
  const { t } = useLocale();
  const tl = t.employers.timeline;
  const [stage, setStage] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (interacted) return;
    // With reduced motion the panel stays put; visitors can still tap the stops.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer: number | undefined;
    let visible = false;
    let current = 0;
    const tick = () => {
      window.clearTimeout(timer);
      if (!visible) return;
      const last = current === 4;
      timer = window.setTimeout(() => {
        current = last ? 0 : current + 1;
        setStage(current);
        tick();
      }, last ? 3200 : 1500);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) tick();
        else window.clearTimeout(timer);
      },
      { threshold: 0.3 },
    );
    if (rootRef.current) io.observe(rootRef.current);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [interacted]);

  const go = (i: number) => {
    setInteracted(true);
    setStage(i);
  };

  const sharing = SHARING[stage];
  const parked = PARKED[stage];

  return (
    <div className="emTl" role="group" aria-label={tl.aria} ref={rootRef}>
      <div className="emCardHead">
        <div className="emCardTitle">{tl.title}</div>
        <span className="emBadge">{tl.badge}</span>
      </div>

      <div className="emTrack">
        <div className="emTrackBar" aria-hidden="true">
          <span style={{ width: `${(stage / 4) * 100}%` }} />
        </div>
        <div className="emStops" role="tablist" aria-label={tl.periodAria}>
          {tl.stages.map((label, i) => {
            const active = i === stage;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={label}
                className={`emStop${i <= stage ? ' passed' : ''}${active ? ' on' : ''}`}
                onClick={() => go(i)}
              >
                <span className="emStopDot" aria-hidden="true" />
                <span className="emStopLabel emStopLong" aria-hidden="true">{label}</span>
                <span className="emStopLabel emStopShort" aria-hidden="true">{tl.stagesShort[i]}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="emTlGrid">
        <div className="emPanel">
          <div className="emPanelLabel">{tl.sharing}</div>
          <div className="emDots" aria-hidden="true">
            {Array.from({ length: 40 }, (_, i) => (
              <span key={i} className={i < sharing ? 'on' : undefined} />
            ))}
          </div>
          <div className="emPanelNote">{tl.countsOnly}</div>
        </div>
        <div className="emPanel">
          <div className="emPanelLabel">{tl.parking}</div>
          <div className="emLot" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => {
              const car = ORDER.indexOf(i) < parked;
              return (
                <span key={i} className={car ? 'car' : 'free'}>
                  {car ? <Car /> : <span className="emFreeDot" />}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="emPanel">
        <div className="emPanelLabel">{tl.co2}</div>
        <div className="emBars" aria-hidden="true">
          {BAR_H.map((h, i) => (
            <span key={i} className={i <= stage ? 'on' : undefined} style={{ height: `${i <= stage ? h : 8}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

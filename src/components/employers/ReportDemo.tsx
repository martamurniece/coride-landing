'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';

const RIDE_COLORS = ['var(--blue)', 'var(--orange)', 'var(--green)', 'var(--magenta)', 'var(--lime)', 'var(--brown)'];
const RIDE_PEOPLE = [3, 2, 4, 3, 2, 3];
const TARGETS = [78, 64, 52];
const BAR_COLORS = ['var(--blue)', 'var(--green)', 'var(--magenta)'];

export function ReportDemo() {
  const { t } = useLocale();
  const r = t.employers.admin.report;
  const [rides, setRides] = useState(0);
  const [saved, setSaved] = useState(false);
  const [run, setRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer: number | undefined;
    let n = 0;
    const step = () => {
      window.clearTimeout(timer);
      if (!visible.current) return;
      if (reduced) {
        // No animation: show the finished report straight away.
        n = 6;
        setRides(6);
        return;
      }
      if (n >= 6) {
        timer = window.setTimeout(() => {
          n = 0;
          setRides(0);
          step();
        }, 4200);
        return;
      }
      timer = window.setTimeout(() => {
        n += 1;
        setRides(n);
        step();
      }, n === 0 ? 900 : 700);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting) step();
        else window.clearTimeout(timer);
      },
      { threshold: 0.3 },
    );
    if (rootRef.current) io.observe(rootRef.current);
    const stopOnSave = () => window.clearTimeout(timer);
    const el = rootRef.current;
    el?.addEventListener('coride:saved', stopOnSave);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      el?.removeEventListener('coride:saved', stopOnSave);
    };
  }, [run]);

  const done = rides >= 6;
  const k = rides / 6;

  const download = () => {
    if (!done) return;
    setSaved(true);
    rootRef.current?.dispatchEvent(new Event('coride:saved'));
  };

  const replay = () => {
    setSaved(false);
    setRides(0);
    setRun((x) => x + 1);
  };

  return (
    <div className="emReport" role="group" aria-label={r.aria} ref={rootRef}>
      <div className="emCardHead">
        <div className="emCardTitle">{r.title}</div>
        <span className="emBadge">{r.badge}</span>
      </div>
      <div className="emReportGrid">
        <div className="emRides">
          {RIDE_PEOPLE.map((n, i) => {
            const counted = i < rides;
            return (
              <div key={i} className={`emRide${counted ? ' counted' : ''}`} style={{ ['--rc' as string]: RIDE_COLORS[i] }}>
                <span className="emRoute" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="emRideLabel">{r.ride.replace('{n}', String(n))}</span>
                <span className="emCheck" aria-hidden="true">✓</span>
              </div>
            );
          })}
        </div>
        <div className="emSheet">
          <div className="emSheetHead">
            <div className="emSheetTitle">{r.reportTitle}</div>
            <div className="emSheetSub">{r.reportSub}</div>
          </div>
          {r.rows.map((label, i) => (
            <div key={label} className="emRow">
              <div className="emRowLabel">{label}</div>
              <div className="emRowTrack">
                <span style={{ width: `${k * TARGETS[i]}%`, background: BAR_COLORS[i] }} />
              </div>
            </div>
          ))}
          <div className="emSheetNote">{r.note}</div>
          <div className="emSheetActions">
            <button
              type="button"
              onClick={download}
              aria-disabled={!done}
              className={`emDownload${done ? ' ready' : ''}${saved ? ' saved' : ''}${done && !saved ? ' glow' : ''}`}
            >
              {saved ? r.downloaded : r.download}
            </button>
            <button type="button" aria-label={r.replay} onClick={replay} className="emReplay">
              ↺
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';

type PersonId = 'ak' | 'tv';
type Added = Partial<Record<PersonId, boolean>>;
type Pt = [number, number];

const MAP_W = 560;
const MAP_H = 400;
const PEOPLE: { id: PersonId; ini: string; first: string; x: number; y: number }[] = [
  { id: 'ak', ini: 'AK', first: 'Anna', x: 200, y: 262 },
  { id: 'tv', ini: 'TV', first: 'Toms', x: 350, y: 150 },
];
const STREETS = [
  'M20,56 H540', 'M20,150 H540', 'M20,210 H540', 'M20,262 H540', 'M20,340 H540',
  'M110,20 V390', 'M200,20 V390', 'M350,20 V390', 'M450,20 V390', 'M280,20 V390',
];
// Example fuel shares in cents. The app splits by distance driven, so Anna
// (picked up first, rides further) pays a little more than Toms.
const SHARE_CENTS: Record<PersonId, number> = { ak: 160, tv: 120 };
const COIN_START = 500; // ms into the Save step before the first coin leaves
const COIN_GAP = 900; // ms between coins
const COIN_FLY = 750; // ms a coin takes to reach the wallet
const COUNT_UP = 450; // ms the wallet total takes to count up per share
const SPEED = 0.13; // map units per ms
const DWELL = 1100; // pause at each pick-up, ms

const fmt = (s: string, v: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k: string) => String(v[k] ?? ''));

function routePts(a: Added): Pt[] {
  if (a.ak && a.tv) return [[110, 340], [110, 262], [200, 262], [200, 150], [450, 150], [450, 56]];
  if (a.ak) return [[110, 340], [110, 262], [200, 262], [200, 210], [450, 210], [450, 56]];
  if (a.tv) return [[110, 340], [110, 150], [450, 150], [450, 56]];
  return [[110, 340], [110, 210], [450, 210], [450, 56]];
}

const segLen = (a: Pt, b: Pt) => Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);

function distTo(pts: Pt[], x: number, y: number) {
  let d = 0;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const onX = a[1] === b[1] && y === a[1] && x >= Math.min(a[0], b[0]) && x <= Math.max(a[0], b[0]);
    const onY = a[0] === b[0] && x === a[0] && y >= Math.min(a[1], b[1]) && y <= Math.max(a[1], b[1]);
    if (onX || onY) return d + Math.abs(x - a[0]) + Math.abs(y - a[1]);
    d += segLen(a, b);
  }
  return d;
}

type Leg = { from: number; to: number; t0: number; t1: number; stop: { id: PersonId; first: string } | null };

function plan(a: Added) {
  const pts = routePts(a);
  let total = 0;
  for (let i = 1; i < pts.length; i++) total += segLen(pts[i - 1], pts[i]);
  const stops = PEOPLE.filter((p) => a[p.id])
    .map((p) => ({ id: p.id, first: p.first, d: distTo(pts, p.x, p.y) }))
    .sort((x, y) => x.d - y.d);
  const marks = [0, ...stops.map((s) => s.d), total];
  const legs: Leg[] = [];
  let t = 0;
  for (let i = 1; i < marks.length; i++) {
    const dur = Math.max(500, (marks[i] - marks[i - 1]) / SPEED);
    legs.push({ from: marks[i - 1], to: marks[i], t0: t, t1: t + dur, stop: stops[i - 1] ?? null });
    t += dur;
    if (i < marks.length - 1) t += DWELL;
  }
  return { pts, legs, total, duration: t };
}

function pointAt(pts: Pt[], dist: number) {
  let d = dist;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const len = segLen(a, b);
    if (d <= len || i === pts.length - 1) {
      const f = len ? Math.min(1, d / len) : 0;
      const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
      return { x: a[0] + (b[0] - a[0]) * f, y: a[1] + (b[1] - a[1]) * f, ang };
    }
    d -= len;
  }
  return { x: pts[0][0], y: pts[0][1], ang: 0 };
}

const ease = (u: number) => (u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2);

function rideState(t: number, a: Added) {
  const pl = plan(a);
  let dist = pl.total;
  const picked: Added = {};
  let joining: string | null = null;
  for (const leg of pl.legs) {
    if (t < leg.t0) break;
    if (t <= leg.t1) {
      dist = leg.from + (leg.to - leg.from) * ease((t - leg.t0) / (leg.t1 - leg.t0));
      break;
    }
    dist = leg.to;
    if (leg.stop && t < leg.t1 + DWELL) joining = leg.stop.first;
  }
  for (const leg of pl.legs) if (leg.stop && t > leg.t1) picked[leg.stop.id] = true;
  return { pos: pointAt(pl.pts, dist), picked, joining };
}

const PHASES: { step: number; added?: Added; d?: number }[] = [
  { step: 0, added: {}, d: 2600 },
  { step: 0, added: { ak: true, tv: true }, d: 2600 },
  { step: 1 },
  { step: 2, d: 6200 },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

export function HeroDemo() {
  const { t } = useLocale();
  const d = t.hero.demo;
  const [step, setStep] = useState(0);
  const [added, setAdded] = useState<Added>({});
  const [interacted, setInteracted] = useState(false);
  const [rideT, setRideT] = useState(0);
  const [saveT, setSaveT] = useState(0);
  const [cycle, setCycle] = useState(0);

  const rootRef = useRef<HTMLDivElement>(null);
  const phase = useRef(0);
  const timer = useRef<number | undefined>(undefined);
  const raf = useRef<number | undefined>(undefined);
  const addedRef = useRef<Added>({});
  const interactedRef = useRef(false);
  const reducedRef = useRef(false);

  const stopRide = () => {
    if (raf.current !== undefined) cancelAnimationFrame(raf.current);
  };

  const startRide = useCallback((a: Added) => {
    stopRide();
    const total = plan(a).duration + 200;
    if (reducedRef.current) {
      setRideT(total);
      return;
    }
    const t0 = performance.now();
    setRideT(0);
    const tick = (now: number) => {
      const el = now - t0;
      setRideT(el);
      if (el < total) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  const startSave = useCallback(() => {
    stopRide();
    const total = COIN_START + COIN_GAP * 2 + COIN_FLY + COUNT_UP + 100;
    if (reducedRef.current) {
      setSaveT(total);
      return;
    }
    const t0 = performance.now();
    setSaveT(0);
    const tick = (now: number) => {
      const el = now - t0;
      setSaveT(el);
      if (el < total) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, []);

  const goTo = useCallback(
    (s: number, a: Added) => {
      addedRef.current = a;
      setAdded(a);
      setStep(s);
      if (s === 1) startRide(a);
      else if (s === 2) startSave();
      else stopRide();
    },
    [startRide, startSave],
  );

  const scheduleRef = useRef<() => void>(() => {});
  const schedule = useCallback(() => {
    window.clearTimeout(timer.current);
    const ph = PHASES[phase.current % PHASES.length];
    const a = ph.added ?? addedRef.current;
    goTo(ph.step, a);
    setCycle((c) => c + 1);
    const delay = ph.step === 1 ? plan(a).duration + 900 : (ph.d ?? 2600);
    timer.current = window.setTimeout(() => {
      if (interactedRef.current) return;
      phase.current += 1;
      scheduleRef.current();
    }, delay);
  }, [goTo]);
  useEffect(() => {
    scheduleRef.current = schedule;
  }, [schedule]);

  // Autoplay only while the card is on screen, and never with reduced motion.
  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedRef.current) return;
    const el = rootRef.current;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started && !interactedRef.current) {
          started = true;
          schedule();
        }
      },
      { threshold: 0.3 },
    );
    if (el) io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer.current);
      stopRide();
    };
  }, [goTo, schedule]);

  // Coin flight paths: from each pin on the map to the wallet total. Layout
  // effect so a new coin never paints at its default spot first.
  useLayoutEffect(() => {
    if (step !== 2) return;
    const root = rootRef.current;
    const target = root?.querySelector('.hdWalletSum');
    if (!root || !target) return;
    const rr = root.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    root.querySelectorAll<HTMLElement>('.hdCoin').forEach((coin) => {
      const pin = root.querySelector(`.hdPin[data-id="${coin.dataset.id}"] .hdPinDot`);
      if (!pin) return;
      const pr = pin.getBoundingClientRect();
      coin.style.left = `${pr.left + pr.width / 2 - rr.left}px`;
      coin.style.top = `${pr.top + pr.height / 2 - rr.top}px`;
      coin.style.setProperty('--dx', `${tr.left + tr.width / 2 - (pr.left + pr.width / 2)}px`);
      coin.style.setProperty('--dy', `${tr.top + tr.height / 2 - (pr.top + pr.height / 2)}px`);
    });
  });

  const takeOver = () => {
    window.clearTimeout(timer.current);
    interactedRef.current = true;
    setInteracted(true);
  };

  const toggle = (id: PersonId) => {
    if (step !== 0) return;
    takeOver();
    const next = { ...added, [id]: !added[id] };
    addedRef.current = next;
    setAdded(next);
  };

  const goStep = (i: number) => {
    takeOver();
    goTo(i, added);
  };

  const next = () => {
    if (step === 2) {
      phase.current = 0;
      interactedRef.current = false;
      setInteracted(false);
      if (reducedRef.current) goTo(0, {});
      else schedule();
      return;
    }
    goStep(step + 1);
  };

  const ak = !!added.ak;
  const tv = !!added.tv;
  const n = (ak ? 1 : 0) + (tv ? 1 : 0);
  const pts = routePts(added);
  const route = 'M' + pts.map((p) => `${p[0]},${p[1]}`).join(' L');
  const ride = step === 1 ? rideState(rideT, added) : null;
  const durs = [5200, plan(added).duration + 900, 6200];
  const names = [ak ? 'Anna' : null, tv ? 'Toms' : null].filter(Boolean) as string[];

  let cardTitle: string;
  let cardSub: string;
  let nextLabel: string;
  let nextDisabled = false;
  if (step === 0) {
    if (n === 0) {
      cardTitle = d.matchNoneTitle;
      cardSub = d.matchNoneSub;
      nextDisabled = true;
    } else if (n === 1) {
      cardTitle = fmt(d.matchOneTitle, { name: names[0] });
      cardSub = fmt(d.matchOneSub, { other: names[0] === 'Anna' ? 'Toms' : 'Anna' });
    } else {
      cardTitle = fmt(d.matchTwoTitle, { a: 'Anna', b: 'Toms' });
      cardSub = d.matchTwoSub;
    }
    nextLabel = d.start;
  } else if (step === 1 && ride) {
    const waiting = names.filter((nm) => !ride.picked[nm === 'Anna' ? 'ak' : 'tv']);
    if (ride.joining) {
      cardTitle = fmt(d.joinsTitle, { name: ride.joining });
      cardSub = d.joinsSub;
    } else if (!n) {
      cardTitle = d.onWayTitle;
      cardSub = d.aloneSub;
    } else if (waiting.length) {
      cardTitle = d.onWayTitle;
      cardSub = fmt(d.nextSub, { name: waiting[0] });
    } else {
      cardTitle = d.boardTitle;
      cardSub = d.boardSub;
    }
    nextLabel = d.arrive;
  } else {
    cardTitle = n ? d.sharedTitle : d.soloTitle;
    cardSub = n ? fmt(d.sharedSub, { n: n + 1 }) : d.soloSub;
    nextLabel = d.replay;
  }

  const pos = ride ? ride.pos : { x: 110, y: 340, ang: -90 };

  // Save step: each colleague's fuel share flies into the wallet, in pick-up order.
  const payers = PEOPLE.filter((p) => added[p.id]);
  const coins = payers.map((p, i) => {
    const leave = COIN_START + i * COIN_GAP;
    const land = leave + COIN_FLY;
    return { p, i, leave, land, flying: saveT >= leave && saveT < land, landed: saveT >= land };
  });
  const walletCents = coins.reduce(
    (sum, c) => sum + SHARE_CENTS[c.p.id] * Math.min(1, Math.max(0, (saveT - c.land) / COUNT_UP)),
    0,
  );
  const money = (cents: number) => fmt(d.money, { v: (cents / 100).toFixed(2).replace('.', d.decimal) });

  return (
    <div className="hd" ref={rootRef}>
      <div className="hdTabs" role="tablist" aria-label={d.tabsAria}>
        {d.tabs.map((label, i) => {
          const active = i === step;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={active}
              className={`hdTab${active ? ' on' : ''}`}
              onClick={() => goStep(i)}
            >
              <span className="hdTabNum">{i + 1}</span>
              <span>{label}</span>
              {active && !interacted && (
                <span
                  key={cycle}
                  aria-hidden="true"
                  className="hdProgress"
                  style={{ animationDuration: `${Math.round(durs[i])}ms` }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="hdMap" role="img" aria-label={d.mapAria}>
        <svg aria-hidden="true" viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="hdMapSvg">
          {STREETS.map((s) => (
            <path key={s} d={s} stroke="#EEEEEE" strokeWidth="14" strokeLinecap="round" fill="none" />
          ))}
          <path className="hdRoute" d={route} stroke="#0CA64A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <span className="hdPlace" style={{ left: pct(110, MAP_W), top: pct(340, MAP_H) }} aria-hidden="true" />
        <span className="hdPlaceLabel" style={{ left: `calc(${pct(110, MAP_W)} + 18px)`, top: pct(340, MAP_H) }}>
          {d.home}
        </span>
        <span className="hdPlace" style={{ left: pct(450, MAP_W), top: pct(56, MAP_H) }} aria-hidden="true" />
        <span
          className="hdPlaceLabel hdPlaceLabelLeft"
          style={{ left: `calc(${pct(450, MAP_W)} - 18px)`, top: pct(56, MAP_H) }}
        >
          {d.office}
        </span>
        <span className="hdEta">{step === 2 ? d.etaDone : d.eta}</span>

        {PEOPLE.map((p) => {
          const on = !!added[p.id];
          const picked = on && (step === 2 || (!!ride && !!ride.picked[p.id]));
          const match = step === 0;
          return (
            <div key={p.id} className="hdPin" data-id={p.id} style={{ left: pct(p.x, MAP_W), top: pct(p.y, MAP_H) }}>
              <div className="hdPinDot">
                {match && !on && <span aria-hidden="true" className="hdPing" />}
                <button
                  type="button"
                  aria-label={fmt(on ? d.removeAria : d.addAria, { name: p.first })}
                  aria-pressed={on}
                  disabled={!match}
                  onClick={() => toggle(p.id)}
                  className={`hdAvatar${on ? ' on' : ''}${picked ? ' picked' : ''}`}
                >
                  {picked ? (
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 9.5l3.2 3.2L14 5.5" />
                    </svg>
                  ) : (
                    p.ini
                  )}
                </button>
              </div>
              {match && !on && (
                <button type="button" tabIndex={-1} aria-hidden="true" className="hdAdd" onClick={() => toggle(p.id)}>
                  {fmt(d.add, { name: p.first })}
                </button>
              )}
              {match && on && <span className="hdAdded">{fmt(d.added, { name: p.first })}</span>}
            </div>
          );
        })}

        {step === 1 && (
          <div
            aria-hidden="true"
            className="hdCar"
            style={{ left: pct(pos.x, MAP_W), top: pct(pos.y, MAP_H), transform: `translate(-50%, -50%) rotate(${pos.ang}deg)` }}
          >
            <svg width="34" height="17" viewBox="0 0 44 21">
              <rect x="1" y="1.5" width="42" height="18" rx="7" fill="#1F1F1F" />
              <rect x="27" y="4" width="7" height="13" rx="2.5" fill="#8C8C8C" />
              <rect x="9" y="4" width="5" height="13" rx="2" fill="#5E5E5E" />
            </svg>
          </div>
        )}
      </div>

      <div className="hdPanel">
        <div className="hdPanelRow">
          <div className="hdPanelText" aria-live="polite">
            <div className="hdPanelTitle">{cardTitle}</div>
            <div className="hdPanelSub">{cardSub}</div>
          </div>
          <button type="button" className="hdNext" onClick={next} disabled={nextDisabled}>
            {nextLabel}
          </button>
        </div>
        {step === 2 && n > 0 && (
          <div className="hdWallet">
            <div className="hdWalletRow">
              <span className="hdWalletIcon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                  <rect x="2" y="4.5" width="14" height="10" rx="2.5" />
                  <path d="M12 9.5h4" strokeLinecap="round" />
                  <path d="M4 4.5l7-2.5 1 2.5" />
                </svg>
              </span>
              <span className="hdWalletLabel">{d.wallet}</span>
              <span className={`hdWalletSum${walletCents > 0 ? ' on' : ''}`}>
                +{money(walletCents)}
              </span>
            </div>
            <div className="hdChips">
              <span className="hdChip hdChipOrange">{fmt(d.chipFuel, { n: n + 1 })}</span>
              {coins
                .filter((c) => c.landed)
                .map((c) => (
                  <span key={c.p.id} className="hdChip hdChipGreen hdChipIn">
                    {fmt(d.shareFrom, { name: c.p.first, amount: money(SHARE_CENTS[c.p.id]) })}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>

      {step === 2 &&
        coins
          .filter((c) => c.flying)
          .map((c) => (
            <span key={`${c.p.id}-${cycle}`} data-id={c.p.id} className="hdCoin" aria-hidden="true">
              €
            </span>
          ))}
    </div>
  );
}

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';
import { BASE_ETA_MIN, COLLEAGUES, TIMINGS, formatEur, totalEta, totalEur } from './config';
import { Scene, fmt, type SceneView } from './Scene';

/**
 * The lazy interactive layer of the hero showcase: scripted state machine,
 * autopilot loop, focus + aria-live handling, and the euro count-up ticker.
 * All animation is CSS transitions / SVG stroke draw-on plus one small
 * requestAnimationFrame ticker — no animation library.
 */

type StateId = 'idle' | 'previewA' | 'toastA' | 'waitB' | 'previewB' | 'toastB' | 'summary';

const COMMITTED: Record<StateId, number> = {
  idle: 0,
  previewA: 0,
  toastA: 1,
  waitB: 1,
  previewB: 1,
  toastB: 2,
  summary: 2,
};

declare global {
  interface Window {
    plausible?: (event: string) => void;
  }
}

export function ShowcaseInteractive({
  mode,
  initialAdd = false,
}: {
  mode: 'desktop' | 'mobile';
  /** Mobile: the tap that loaded this chunk landed on Anna's "+ Add". */
  initialAdd?: boolean;
}) {
  const { t } = useLocale();
  const s = t.hero.showcase;

  const [state, setState] = useState<StateId>(initialAdd ? 'previewA' : 'idle');
  const [cueLive, setCueLive] = useState(false);
  const [eurTicker, setEurTicker] = useState<string | null>(null);
  const [announce, setAnnounce] = useState('');
  const [reduced, setReduced] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const manualRef = useRef(initialAdd);
  const trackedRef = useRef(false);
  const focusConfirmRef = useRef(initialAdd);
  const tickerRaf = useRef(0);

  // ── Pause-aware timer (one pending step at a time) ────────────────
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const pauseBits = useRef({ hover: false, focus: false, hidden: false, offscreen: false });
  const timerRef = useRef<{ id: ReturnType<typeof setTimeout> | null; fn: (() => void) | null; remaining: number; startedAt: number }>({
    id: null,
    fn: null,
    remaining: 0,
    startedAt: 0,
  });

  const clearStep = useCallback(() => {
    const tm = timerRef.current;
    if (tm.id !== null) clearTimeout(tm.id);
    tm.id = null;
    tm.fn = null;
  }, []);

  const scheduleStep = useCallback(
    (fn: () => void, ms: number) => {
      clearStep();
      const tm = timerRef.current;
      tm.fn = fn;
      tm.remaining = ms;
      if (!pausedRef.current) {
        tm.startedAt = performance.now();
        tm.id = setTimeout(() => {
          tm.id = null;
          tm.fn = null;
          fn();
        }, ms);
      }
    },
    [clearStep],
  );

  const applyPause = useCallback(() => {
    const bits = pauseBits.current;
    const next = bits.hover || bits.focus || bits.hidden || bits.offscreen;
    if (next === pausedRef.current) return;
    pausedRef.current = next;
    setPaused(next);
    const tm = timerRef.current;
    if (next) {
      if (tm.id !== null) {
        clearTimeout(tm.id);
        tm.id = null;
        tm.remaining = Math.max(120, tm.remaining - (performance.now() - tm.startedAt));
      }
    } else if (tm.fn) {
      tm.startedAt = performance.now();
      const fn = tm.fn;
      tm.id = setTimeout(() => {
        tm.id = null;
        tm.fn = null;
        fn();
      }, tm.remaining);
    }
  }, []);

  // ── Environment: reduced motion, visibility, viewport ─────────────
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener('change', sync);

    const onVis = () => {
      pauseBits.current.hidden = document.hidden;
      applyPause();
    };
    document.addEventListener('visibilitychange', onVis);

    const el = wrapRef.current;
    const io = el
      ? new IntersectionObserver(
          (entries) => {
            pauseBits.current.offscreen = !entries[0]?.isIntersecting;
            applyPause();
          },
          { threshold: 0.2 },
        )
      : null;
    if (el && io) io.observe(el);

    return () => {
      mq.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', onVis);
      io?.disconnect();
    };
  }, [applyPause]);

  // ── Attention cue: after ~3s, or as soon as the pointer enters the hero.
  // Under reduced motion the CSS media query applies a static emphasis to
  // every `.has-cue` button instead, so no cue state is needed at all.
  useEffect(() => {
    if (reduced) return;
    const id = setTimeout(() => setCueLive(true), TIMINGS.attentionDelay);
    const hero = wrapRef.current?.closest('.hero');
    const onEnter = () => setCueLive(true);
    hero?.addEventListener('pointerenter', onEnter, { once: true });
    return () => {
      clearTimeout(id);
      hero?.removeEventListener('pointerenter', onEnter);
    };
  }, [reduced]);

  const autoloop = mode === 'desktop' && !reduced;

  // ── Euro count-up ticker ───────────────────────────────────────────
  const runTicker = useCallback(
    (from: number, to: number) => {
      cancelAnimationFrame(tickerRaf.current);
      if (reduced || mode === 'mobile') {
        setEurTicker(null);
        return;
      }
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / TIMINGS.tickerMs);
        const eased = 1 - (1 - p) * (1 - p);
        setEurTicker(formatEur(from + (to - from) * eased));
        if (p < 1) {
          tickerRaf.current = requestAnimationFrame(step);
        } else {
          setEurTicker(null);
        }
      };
      tickerRaf.current = requestAnimationFrame(step);
    },
    [reduced, mode],
  );

  useEffect(() => () => cancelAnimationFrame(tickerRaf.current), []);

  // ── Actions (shared by user and autopilot) ─────────────────────────
  const doAdd = useCallback(
    (idx: 0 | 1, user: boolean) => {
      setState(idx === 0 ? 'previewA' : 'previewB');
      if (user) {
        manualRef.current = true;
        focusConfirmRef.current = true;
        if (!trackedRef.current) {
          trackedRef.current = true;
          window.plausible?.('hero_demo_interact');
        }
        const c = COLLEAGUES[idx];
        setAnnounce(
          fmt(s.announceAdd, { name: c.shortName, min: c.etaDeltaMin, eur: `€${c.eurEarned.toFixed(2)}` }),
        );
      }
    },
    [s],
  );

  const doConfirm = useCallback(
    (idx: 0 | 1, user: boolean) => {
      setState(idx === 0 ? 'toastA' : 'toastB');
      runTicker(totalEur(idx), totalEur(idx + 1));
      if (user) {
        manualRef.current = true;
        const c = COLLEAGUES[idx];
        setAnnounce(
          idx === 0
            ? fmt(s.announceConfirmNext, { name: c.shortName, next: COLLEAGUES[1].shortName })
            : fmt(s.announceConfirm, { name: c.shortName }),
        );
        // The card the user was focused on is gone; keep focus in the panel
        // without ever moving it on our own otherwise.
        if (wrapRef.current?.contains(document.activeElement)) {
          wrapRef.current?.focus({ preventScroll: true });
        }
      }
    },
    [s, runTicker],
  );

  const doCancel = useCallback(
    (idx: 0 | 1, user: boolean) => {
      setState(idx === 0 ? 'idle' : 'waitB');
      if (user) {
        manualRef.current = true;
        if (wrapRef.current?.contains(document.activeElement)) {
          wrapRef.current?.focus({ preventScroll: true });
        }
      }
    },
    [],
  );

  const reset = useCallback(() => {
    clearStep();
    cancelAnimationFrame(tickerRaf.current);
    setEurTicker(null);
    manualRef.current = false;
    setState('idle');
  }, [clearStep]);

  // ── Sequence: schedule the next step for the current state ─────────
  useEffect(() => {
    switch (state) {
      // Transient toasts always dismiss themselves (pause-aware).
      case 'toastA':
        scheduleStep(() => setState('waitB'), TIMINGS.toastMs);
        break;
      case 'toastB':
        scheduleStep(() => {
          setState('summary');
          if (manualRef.current) {
            setAnnounce(
              fmt(s.announceSummary, {
                names: `${COLLEAGUES[0].shortName} & ${COLLEAGUES[1].shortName}`,
                min: totalEta(2),
                eur: `€${totalEur(2).toFixed(2)}`,
              }),
            );
          }
        }, TIMINGS.toastMs);
        break;
      // The resting summary holds (its growing time-border shows for how
      // long), then the demo resets itself — in every mode, since there is
      // no manual reset control.
      case 'summary':
        scheduleStep(reset, TIMINGS.summaryHold);
        break;
      // Autopilot drives the rest only while the visitor hasn't taken over.
      case 'idle':
        if (autoloop && !manualRef.current) scheduleStep(() => doAdd(0, false), TIMINGS.idleDwell);
        else clearStep();
        break;
      case 'waitB':
        if (autoloop && !manualRef.current) scheduleStep(() => doAdd(1, false), TIMINGS.betweenDwell);
        else clearStep();
        break;
      case 'previewA':
        if (autoloop && !manualRef.current) scheduleStep(() => doConfirm(0, false), TIMINGS.previewDwell);
        else clearStep();
        break;
      case 'previewB':
        if (autoloop && !manualRef.current) scheduleStep(() => doConfirm(1, false), TIMINGS.previewDwell);
        else clearStep();
        break;
    }
  }, [state, autoloop, scheduleStep, clearStep, doAdd, doConfirm, reset, s]);

  useEffect(() => clearStep, [clearStep]);

  // Focus moves to Confirm when a decision card opens from a user action.
  useEffect(() => {
    if ((state === 'previewA' || state === 'previewB') && focusConfirmRef.current) {
      focusConfirmRef.current = false;
      confirmRef.current?.focus({ preventScroll: true });
    }
  }, [state]);

  // ── Derived scene view ─────────────────────────────────────────────
  const view = useMemo<SceneView>(() => {
    const committed = COMMITTED[state];
    return {
      committed,
      pending: state === 'previewA' ? 0 : state === 'previewB' ? 1 : null,
      tomsVisible: state !== 'idle' && state !== 'previewA',
      cueTarget: committed === 0 && state === 'idle' ? 0 : committed === 1 && state !== 'previewB' ? 1 : null,
      cueLive,
      card:
        state === 'previewA'
          ? { kind: 'decision', idx: 0 }
          : state === 'previewB'
            ? { kind: 'decision', idx: 1 }
            : state === 'toastA'
              ? { kind: 'toast', idx: 0 }
              : state === 'toastB'
                ? { kind: 'toast', idx: 1 }
                : state === 'summary'
                  ? { kind: 'summary' }
                  : null,
      etaShown: BASE_ETA_MIN + totalEta(committed),
      eurTicker,
    };
  }, [state, cueLive, eurTicker]);

  const handlers = useMemo(
    () => ({
      onAdd: (idx: 0 | 1) => doAdd(idx, true),
      onConfirm: () => doConfirm(state === 'previewB' ? 1 : 0, true),
      onCancel: () => doCancel(state === 'previewB' ? 1 : 0, true),
    }),
    [doAdd, doConfirm, doCancel, state],
  );

  const setHover = (v: boolean) => {
    pauseBits.current.hover = v;
    applyPause();
  };
  const setFocusBit = (v: boolean) => {
    pauseBits.current.focus = v;
    applyPause();
  };

  return (
    <div
      ref={wrapRef}
      className={`scWrap is-interactive ${paused ? 'is-paused' : ''} ${reduced || mode === 'mobile' ? 'is-instant' : ''}`}
      tabIndex={-1}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setFocusBit(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusBit(false);
      }}
    >
      <Scene view={view} on={handlers} confirmRef={confirmRef} />
      <div className="scLiveRegion" aria-live="polite">
        {announce}
      </div>
    </div>
  );
}

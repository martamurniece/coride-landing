'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const BAND_EASE_TAU = 55;
const BAND_MAX_LAG = 0.14;

/** CSS ease — cubic-bezier(0.25, 0.1, 0.25, 1), same as --ease-default on home */
function easeDefault(t: number): number {
  const u = Math.max(0, Math.min(1, t));
  return u * u * (3 - 2 * u);
}

export type RouteBandProps = {
  title: string;
  body: string;
  carAria: string;
};

export function RouteBand({ title, body, carAria }: RouteBandProps) {
  const routeRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef(false);
  const userControlledRef = useRef(false);
  const introRef = useRef<number | null>(null);
  const easeRef = useRef(0);
  const lastEaseRef = useRef(0);
  const targetRef = useRef(0);
  const shownRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const toProgress = useCallback((clientX: number) => {
    const route = routeRef.current;
    if (!route) return 0;
    const rect = route.getBoundingClientRect();
    const pad = 12;
    const travel = rect.width - pad * 2;
    if (travel <= 0) return 0;
    return Math.max(0, Math.min(1, (clientX - rect.left - pad) / travel));
  }, []);

  const paint = useCallback(() => {
    setProgress(shownRef.current);
  }, []);

  const startEaseLoop = useCallback(() => {
    if (easeRef.current) return;

    const tick = (now: number) => {
      const dt = lastEaseRef.current ? Math.min(64, now - lastEaseRef.current) : 16;
      lastEaseRef.current = now;

      let diff = targetRef.current - shownRef.current;

      if (Math.abs(diff) > BAND_MAX_LAG) {
        shownRef.current = targetRef.current - Math.sign(diff) * BAND_MAX_LAG;
        diff = Math.sign(diff) * BAND_MAX_LAG;
      }

      if (Math.abs(diff) < 0.001) {
        shownRef.current = targetRef.current;
        paint();
        easeRef.current = 0;
        lastEaseRef.current = 0;
        return;
      }

      const k = 1 - Math.exp(-dt / BAND_EASE_TAU);
      shownRef.current += diff * k;
      paint();
      easeRef.current = requestAnimationFrame(tick);
    };

    lastEaseRef.current = 0;
    easeRef.current = requestAnimationFrame(tick);
  }, [paint]);

  const setTarget = useCallback(
    (next: number) => {
      targetRef.current = Math.max(0, Math.min(1, next));
      startEaseLoop();
    },
    [startEaseLoop],
  );

  const snapTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(1, next));
      targetRef.current = clamped;
      shownRef.current = clamped;
      paint();
    },
    [paint],
  );

  useEffect(() => {
    const route = routeRef.current;
    if (!route) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setReady(true);
      snapTo(1);
      return;
    }

    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || fired || userControlledRef.current) return;
          fired = true;
          setReady(true);
          io.disconnect();

          const duration = 2200;
          const delay = 1700;
          const startAt = performance.now() + delay;

          const introTick = (now: number) => {
            if (userControlledRef.current) return;
            const elapsed = now - startAt;
            if (elapsed < 0) {
              introRef.current = requestAnimationFrame(introTick);
              return;
            }
            const linear = Math.min(1, elapsed / duration);
            setTarget(easeDefault(linear));
            if (linear < 1) introRef.current = requestAnimationFrame(introTick);
          };

          introRef.current = requestAnimationFrame(introTick);
        });
      },
      { threshold: 0.45 },
    );

    io.observe(route);
    return () => {
      io.disconnect();
      if (introRef.current) cancelAnimationFrame(introRef.current);
      if (easeRef.current) cancelAnimationFrame(easeRef.current);
    };
  }, [setTarget, snapTo]);

  useEffect(() => {
    const stopDrag = () => {
      dragRef.current = false;
    };

    const onMove = (event: PointerEvent) => {
      if (!dragRef.current) return;
      setTarget(toProgress(event.clientX));
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', stopDrag);
    window.addEventListener('pointercancel', stopDrag);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', stopDrag);
      window.removeEventListener('pointercancel', stopDrag);
    };
  }, [setTarget, toProgress]);

  const takeControl = useCallback(() => {
    userControlledRef.current = true;
    if (introRef.current) cancelAnimationFrame(introRef.current);
    setReady(true);
  }, []);

  const onTrackPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    takeControl();
    setTarget(toProgress(event.clientX));
  };

  const onCarPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.button !== 0) return;
    takeControl();
    dragRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setTarget(toProgress(event.clientX));
  };

  const onCarPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    setTarget(toProgress(event.clientX));
  };

  const onCarPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const carLeft = `calc(12px + (100% - 24px) * ${progress})`;
  const fillWidth = `calc((100% - 24px) * ${progress})`;

  return (
    <>
      <div style={{ height: 120 }} aria-hidden="true" />
      <div className="band">
        <div className="band-top">
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <div
          className={`band-route ${ready ? 'is-ready' : ''}`}
          ref={routeRef}
          onPointerDown={onTrackPointerDown}
        >
          <div className="br-track" />
          <div className="br-fill" style={{ width: fillWidth }} />
          <span className="br-node" style={{ left: '38%', color: 'var(--line-orange-500)' }} />
          <span className="br-node" style={{ left: '68%', color: 'var(--line-green-500)' }} />
          <span className="br-term" />
          <div
            className="br-car"
            style={{ left: carLeft }}
            role="slider"
            aria-label={carAria}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            tabIndex={0}
            onPointerDown={onCarPointerDown}
            onPointerMove={onCarPointerMove}
            onPointerUp={onCarPointerUp}
            onPointerCancel={onCarPointerUp}
            onKeyDown={(event) => {
              if (event.key === 'ArrowLeft') {
                event.preventDefault();
                takeControl();
                setTarget(targetRef.current - 0.05);
              } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                takeControl();
                setTarget(targetRef.current + 0.05);
              }
            }}
          >
            <Image src="/assets/coride-car.png" alt="" width={88} height={42} draggable={false} />
          </div>
        </div>
      </div>
    </>
  );
}

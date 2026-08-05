'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { IDLE_VIEW, Scene } from './Scene';

/**
 * Client boundary for the hero showcase.
 *
 * The static idle frame (schematic SVG + copy) is part of the server-rendered
 * HTML and paints without JS. The interactive layer ships in its own chunk:
 * on desktop it hydrates after first paint (on idle, or as soon as the
 * pointer enters the hero); on mobile it only loads on the first tap, so
 * phones don't pay for animation JS they may never use.
 */

const Interactive = dynamic(
  () => import('./Interactive').then((m) => m.ShowcaseInteractive),
  { ssr: false, loading: () => <StaticFrame /> },
);

function StaticFrame() {
  return (
    <div className="scWrap">
      <Scene view={IDLE_VIEW} />
    </div>
  );
}

export function HeroShowcase() {
  const [ready, setReady] = useState(false);
  const [initialAdd, setInitialAdd] = useState(false);
  // Resolved once on the client; only used after hydration (never rendered
  // into the SSR frame), so the server fallback can't cause a mismatch.
  const [mode] = useState<'desktop' | 'mobile'>(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
      ? 'mobile'
      : 'desktop',
  );
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'mobile') return; // mobile waits for an explicit tap

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const load = () => setReady(true);
    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(load, { timeout: 2500 });
    } else {
      timeoutId = setTimeout(load, 350);
    }
    const hero = mountRef.current?.closest('.hero');
    hero?.addEventListener('pointerenter', load, { once: true });
    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      hero?.removeEventListener('pointerenter', load);
    };
  }, [mode]);

  return (
    <div
      ref={mountRef}
      className="scMount"
      onClickCapture={(e) => {
        if (ready || mode !== 'mobile') return;
        if ((e.target as HTMLElement).closest('.scAdd')) setInitialAdd(true);
        setReady(true);
      }}
    >
      {ready ? <Interactive mode={mode} initialAdd={initialAdd} /> : <StaticFrame />}
    </div>
  );
}

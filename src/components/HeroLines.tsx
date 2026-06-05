'use client';

import { useEffect, useRef, useCallback } from 'react';

const GREEN = '#0CA64A';
const ORANGE = '#F26B1F';
const BLUE = '#1B4FCF';
const INK = '#1f1f1f';
const STROKE = '#1f1f1f';

const PATH_COLORS = [GREEN, ORANGE, BLUE, INK];

const r1 = (n: number) => Math.round(n * 10) / 10;

/**
 * Draws the hero's colored route lines so they always hug the phone mock-up.
 * The phone is a fixed size per breakpoint (see hero.css); the line break-points
 * are computed from the phone's measured box, with the design's gutter/hub
 * offsets applied, while the open ends always run out to the screen edges.
 * Desktop (≥1024px) uses the static SVG in Hero.tsx, so this hides itself.
 *
 * The SVG is updated imperatively (no React state) to mirror RouteOverlay and
 * avoid re-render churn on resize/scroll.
 */
export function HeroLines() {
  const layerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  const build = useCallback(() => {
    const layer = layerRef.current;
    const svg = svgRef.current;
    const hero = layer?.closest('.hero') as HTMLElement | null;
    const phoneEl = hero?.querySelector('.appFrame') as HTMLElement | null;
    if (!layer || !svg || !hero || !phoneEl) return;

    const vw = window.innerWidth;
    if (vw >= 1024) {
      svg.style.display = 'none';
      return;
    }
    svg.style.display = 'block';

    const w = hero.offsetWidth;
    const h = hero.offsetHeight;
    const hr = hero.getBoundingClientRect();
    const pr = phoneEl.getBoundingClientRect();
    const pL = pr.left - hr.left;
    const pR = pr.right - hr.left;
    const pT = pr.top - hr.top;
    const pB = pr.bottom - hr.top;
    const pCx = (pL + pR) / 2;
    const pW = pR - pL;
    const hubX = r1(pCx);
    const jY = r1(pB);

    let ds: string[];
    let dots: { cx: number; cy: number; r: number }[];

    if (vw < 768) {
      // Mobile — centered phone. Offsets derived from the 390×1000 design,
      // scaled by the phone-width ratio (design phone = 190.8).
      const f = pW / 190.8;
      const lg = r1(pL - 42 * f);
      const rg = r1(pR + 43 * f);
      const entryY = r1(pT + 90 * f);
      const hubY = r1(pB + 28 * f);
      const blueY = r1(pB + 52 * f);
      ds = [
        `M-4,${entryY} H${lg} V${hubY} H${hubX}`,
        `M${w + 4},${entryY} H${rg} V${hubY} H${hubX}`,
        `M-4,${blueY} H${hubX} V${hubY}`,
        `M${hubX},${jY} V${hubY}`,
      ];
      dots = [
        { cx: hubX, cy: jY, r: 4.5 },
        { cx: hubX, cy: hubY, r: 6.5 },
      ];
    } else {
      // Tablet — phone on the right. Offsets derived from the 820×1100 design,
      // scaled by the phone-width ratio (design phone = 260.8).
      const f = pW / 260.8;
      const lg = r1(pL - 15 * f);
      const rg = r1(pR + 24 * f);
      const greenDropX = r1(w * 0.22);
      const greenTurnY = r1(Math.max(8, pT - 140 * f));
      const orangeEntryY = r1(pT + 40 * f);
      const hubY = r1(pB + 52 * f);
      const blueY = r1(pB + 150 * f);
      ds = [
        `M${greenDropX},-4 V${greenTurnY} H${lg} V${hubY} H${hubX}`,
        `M${w + 4},${orangeEntryY} H${rg} V${hubY} H${hubX}`,
        `M-4,${blueY} H${hubX} V${hubY}`,
        `M${hubX},${jY} V${hubY}`,
      ];
      dots = [
        { cx: hubX, cy: jY, r: 5.5 },
        { cx: hubX, cy: hubY, r: 8 },
      ];
    }

    svg.setAttribute('width', String(w));
    svg.setAttribute('height', String(h));
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

    ds.forEach((d, i) => {
      const p = pathRefs.current[i];
      if (p) {
        p.setAttribute('d', d);
        p.setAttribute('stroke', PATH_COLORS[i]);
      }
    });
    dotRefs.current.forEach((dot, i) => {
      const data = dots[i];
      if (dot && data) {
        dot.setAttribute('cx', String(data.cx));
        dot.setAttribute('cy', String(data.cy));
        dot.setAttribute('r', String(data.r));
      }
    });
  }, []);

  useEffect(() => {
    build();
    const onResize = () => build();
    window.addEventListener('resize', onResize);

    const hero = layerRef.current?.closest('.hero') as HTMLElement | null;
    const phoneEl = hero?.querySelector('.appFrame') as HTMLElement | null;
    const ro = new ResizeObserver(() => build());
    if (hero) ro.observe(hero);
    if (phoneEl) ro.observe(phoneEl);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => build());
    }

    return () => {
      window.removeEventListener('resize', onResize);
      ro.disconnect();
    };
  }, [build]);

  return (
    <div className="heroLinesDyn" ref={layerRef} aria-hidden="true">
      <svg ref={svgRef} fill="none">
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {[0, 1].map((i) => (
          <circle
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            fill="#fff"
            stroke={STROKE}
            strokeWidth={2.5}
          />
        ))}
      </svg>
    </div>
  );
}

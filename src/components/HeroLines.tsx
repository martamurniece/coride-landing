'use client';

import { useEffect, useRef, useCallback } from 'react';
import { ROUTE_X, VIEW_W } from './showcase/config';

const GREEN = '#0CA64A';
const ORANGE = '#F26B1F';
const BLUE = '#1B4FCF';

/** path 0–1 green, 2 orange, 3 blue */
const PATH_COLORS = [GREEN, GREEN, ORANGE, BLUE];
/** dock dots: green-top, green-bottom, orange, blue */
const DOT_COLORS = [GREEN, GREEN, ORANGE, BLUE];

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Slight overlap into the panel so outer green meets the inner route. */
const ROUTE_OVERLAP = 8;
/** Vertical clearance between the green elbow and the panel's top/bottom edge. */
const EDGE_GAP = 32;

/**
 * Decorative / connector lines around the hero showcase panel.
 *
 * Blue always sits on the traction divider (replacing the old grey rule) and
 * runs to the panel's left edge on desktop/tablet, or full-bleed on mobile.
 *
 * Green + orange: mobile/tablet only (desktop draws those in Hero.tsx's
 * static heroNet SVG). Updated imperatively to avoid resize re-render churn.
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
    const panelEl = hero?.querySelector('.scMount') as HTMLElement | null;
    if (!layer || !svg || !hero || !panelEl) return;

    const vw = window.innerWidth;
    const w = hero.offsetWidth;
    const h = hero.offsetHeight;
    const hr = hero.getBoundingClientRect();
    const pr = panelEl.getBoundingClientRect();
    const pL = r1(pr.left - hr.left);
    const pR = r1(pr.right - hr.left);
    const pT = r1(pr.top - hr.top);
    const pB = r1(pr.bottom - hr.top);
    const routeX = r1(pL + (pR - pL) * (ROUTE_X / VIEW_W));
    const stacked = vw < 768;
    const desktop = vw >= 1024;

    const tractionEl = hero.querySelector('.traction') as HTMLElement | null;
    const tractionY = tractionEl
      ? r1(tractionEl.getBoundingClientRect().top - hr.top)
      : r1(pT + (pB - pT) * 0.72);

    let ds: string[];
    let dots: { cx: number; cy: number; r: number; show: boolean }[];
    let strokeW = 3;

    if (desktop) {
      // Blue only — replaces the traction grey divider, docks into the panel.
      strokeW = 5;
      ds = ['', '', '', `M-4,${tractionY} H${pL}`];
      dots = [
        { cx: 0, cy: 0, r: 0, show: false },
        { cx: 0, cy: 0, r: 0, show: false },
        { cx: 0, cy: 0, r: 0, show: false },
        { cx: pL, cy: tractionY, r: 5, show: true },
      ];
    } else if (stacked) {
      // Side-entry roads; blue is the traction divider (full width).
      const greenTopY = r1(pT - EDGE_GAP);
      const greenBotY = r1(pB + EDGE_GAP);
      const orangeY = r1(pT + (pB - pT) * 0.28);

      ds = [
        `M-4,${greenTopY} H${routeX} V${r1(pT + ROUTE_OVERLAP)}`,
        `M${routeX},${r1(pB - ROUTE_OVERLAP)} V${greenBotY} H${w + 4}`,
        `M${w + 4},${orangeY} H${pR}`,
        `M-4,${tractionY} H${w + 4}`,
      ];
      dots = [
        { cx: routeX, cy: greenTopY, r: 4.5, show: true },
        { cx: routeX, cy: greenBotY, r: 4.5, show: true },
        { cx: pR, cy: orangeY, r: 4.5, show: true },
        { cx: 0, cy: 0, r: 0, show: false },
      ];
    } else {
      // Tablet: green continues the route; blue is the traction divider into
      // the panel (clamped so it still meets the left frame).
      const orangeY = r1(pT + (pB - pT) * 0.25);
      const blueY = r1(Math.min(Math.max(tractionY, pT + 16), pB - 16));
      const greenTopEnd = r1(pT + ROUTE_OVERLAP);
      const greenBotStart = r1(pB - ROUTE_OVERLAP);

      ds = [
        `M${routeX},-4 V${greenTopEnd}`,
        `M${routeX},${greenBotStart} V${r1(pB + 24)} H${w + 4}`,
        `M${w + 4},${orangeY} H${pR}`,
        `M-4,${blueY} H${pL}`,
      ];
      dots = [
        { cx: routeX, cy: greenTopEnd, r: 0, show: false },
        { cx: routeX, cy: r1(pB + 24), r: 4.5, show: true },
        { cx: pR, cy: orangeY, r: 4.5, show: true },
        { cx: pL, cy: blueY, r: 4.5, show: true },
      ];
    }

    svg.style.display = 'block';
    svg.setAttribute('width', String(w));
    svg.setAttribute('height', String(h));
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

    ds.forEach((d, i) => {
      const p = pathRefs.current[i];
      if (!p) return;
      if (!d) {
        p.setAttribute('d', '');
        p.setAttribute('stroke-width', '0');
        return;
      }
      p.setAttribute('d', d);
      p.setAttribute('stroke', PATH_COLORS[i]);
      p.setAttribute('stroke-width', String(strokeW));
    });
    dotRefs.current.forEach((dot, i) => {
      const data = dots[i];
      if (!dot || !data) return;
      if (!data.show) {
        dot.setAttribute('r', '0');
        return;
      }
      dot.setAttribute('cx', String(data.cx));
      dot.setAttribute('cy', String(data.cy));
      dot.setAttribute('r', String(data.r));
      dot.setAttribute('stroke', DOT_COLORS[i]);
      dot.setAttribute('stroke-width', desktop ? '2.5' : '2');
    });
  }, []);

  useEffect(() => {
    build();
    const onResize = () => build();
    window.addEventListener('resize', onResize);

    const hero = layerRef.current?.closest('.hero') as HTMLElement | null;
    const panelEl = hero?.querySelector('.scMount') as HTMLElement | null;
    const copyEl = hero?.querySelector('.heroContent') as HTMLElement | null;
    const tractionEl = hero?.querySelector('.traction') as HTMLElement | null;
    const ro = new ResizeObserver(() => build());
    if (hero) ro.observe(hero);
    if (panelEl) ro.observe(panelEl);
    if (copyEl) ro.observe(copyEl);
    if (tractionEl) ro.observe(tractionEl);

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
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            fill="#fff"
            strokeWidth={2}
          />
        ))}
      </svg>
    </div>
  );
}

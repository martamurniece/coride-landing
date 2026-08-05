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
 * Mobile / tablet line work around the hero showcase panel.
 *
 * Tablet (side-by-side): green continues the functional route above/below the
 * panel and overlaps the edge so it joins the inner route; orange & blue are
 * side roads that dock into the panel frame — blue stays below the copy/CTA.
 *
 * Mobile (stacked): no vertical green through the headline. All roads —
 * including green — enter/exit from the page sides and meet the panel at the
 * route column so the outer stub joins the inner route.
 *
 * Desktop (≥1024px) uses the static SVG in Hero.tsx, so this hides itself.
 * The SVG is updated imperatively (no React state) to mirror RouteOverlay.
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
    if (vw >= 1024) {
      svg.style.display = 'none';
      return;
    }
    svg.style.display = 'block';

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

    // Keep blue clear of the copy / "Kā tas darbojas" CTA on tablet.
    const copyEl = hero.querySelector('.heroContent') as HTMLElement | null;
    const copyBottom = copyEl
      ? r1(copyEl.getBoundingClientRect().bottom - hr.top + 18)
      : 0;

    let ds: string[];
    let dots: { cx: number; cy: number; r: number; show: boolean }[];

    if (stacked) {
      // Side-entry roads only — never a vertical stroke through the headline.
      // Green L-shapes leave EDGE_GAP of air above/below the panel before
      // turning into the route column (with a short overlap so it joins the
      // inner route); orange/blue dock into the side frame.
      const greenTopY = r1(pT - EDGE_GAP);
      const greenBotY = r1(pB + EDGE_GAP);
      const orangeY = r1(pT + (pB - pT) * 0.28);
      const blueY = r1(pT + (pB - pT) * 0.72);

      ds = [
        `M-4,${greenTopY} H${routeX} V${r1(pT + ROUTE_OVERLAP)}`,
        `M${routeX},${r1(pB - ROUTE_OVERLAP)} V${greenBotY} H${w + 4}`,
        `M${w + 4},${orangeY} H${pR}`,
        `M-4,${blueY} H${pL}`,
      ];
      dots = [
        { cx: routeX, cy: greenTopY, r: 4.5, show: true },
        { cx: routeX, cy: greenBotY, r: 4.5, show: true },
        { cx: pR, cy: orangeY, r: 4.5, show: true },
        { cx: pL, cy: blueY, r: 4.5, show: true },
      ];
    } else {
      // Tablet: green continues the route vertically (copy sits left of it)
      // and overlaps the panel edge so it joins the inner route.
      // Blue docks into the panel below the copy / CTA block so it never
      // crosses "Kā tas darbojas" or the traction line.
      const orangeY = r1(pT + (pB - pT) * 0.25);
      const blueY = r1(
        Math.min(Math.max(pT + (pB - pT) * 0.72, copyBottom), pB - 16),
      );
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
      if (!dot || !data) return;
      if (!data.show) {
        dot.setAttribute('r', '0');
        return;
      }
      dot.setAttribute('cx', String(data.cx));
      dot.setAttribute('cy', String(data.cy));
      dot.setAttribute('r', String(data.r));
      dot.setAttribute('stroke', DOT_COLORS[i]);
    });
  }, []);

  useEffect(() => {
    build();
    const onResize = () => build();
    window.addEventListener('resize', onResize);

    const hero = layerRef.current?.closest('.hero') as HTMLElement | null;
    const panelEl = hero?.querySelector('.scMount') as HTMLElement | null;
    const copyEl = hero?.querySelector('.heroContent') as HTMLElement | null;
    const ro = new ResizeObserver(() => build());
    if (hero) ro.observe(hero);
    if (panelEl) ro.observe(panelEl);
    if (copyEl) ro.observe(copyEl);

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

'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const CORNER = 30;

const COLORS: Record<string, { c: string; s: string }> = {
  blue: { c: '#1B4FCF', s: 'rgba(27,79,207,0.14)' },
  orange: { c: '#F26B1F', s: 'rgba(242,107,31,0.16)' },
  green: { c: '#0CA64A', s: 'rgba(12,166,74,0.16)' },
  magenta: { c: '#B5279E', s: 'rgba(181,39,158,0.16)' },
  lime: { c: '#7EC242', s: 'rgba(126,194,66,0.18)' },
  brown: { c: '#8A5A2B', s: 'rgba(138,90,43,0.16)' },
  ink: { c: '#1F1F1F', s: 'rgba(31,31,31,0.12)' },
};

// Below this width the page switches to the single-column layout with a
// straight rail down the left edge.
const DESKTOP_BP = 1024;

interface Point {
  x: number;
  y: number;
  color?: string;
}

function roundedPath(pts: Point[], R: number): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1], p1 = pts[i], p2 = pts[i + 1];
    const v1 = { x: p1.x - p0.x, y: p1.y - p0.y };
    const l1 = Math.hypot(v1.x, v1.y) || 1;
    const v2 = { x: p2.x - p1.x, y: p2.y - p1.y };
    const l2 = Math.hypot(v2.x, v2.y) || 1;
    const r1 = Math.min(R, l1 / 2), r2 = Math.min(R, l2 / 2);
    const a = { x: p1.x - (v1.x / l1) * r1, y: p1.y - (v1.y / l1) * r1 };
    const b = { x: p1.x + (v2.x / l2) * r2, y: p1.y + (v2.y / l2) * r2 };
    d += ` L ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
  return d;
}

export function HomeRoad() {
  const layerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const drawnRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLSpanElement>(null);
  const nodeEls = useRef<HTMLSpanElement[]>([]);
  const state = useRef({
    pathLen: 0,
    nodeLens: [] as number[],
    lit: [] as boolean[],
    samples: [] as { len: number; x: number; y: number }[],
    maxScroll: 1,
    target: 0,
    shown: 0,
    dir: 1,
  });

  const ensureNodes = useCallback((colors: string[]) => {
    const n = colors.length;
    const layer = layerRef.current;
    if (!layer) return;
    while (nodeEls.current.length < n) {
      const el = document.createElement('span');
      el.className = 'routeNode';
      layer.appendChild(el);
      nodeEls.current.push(el);
    }
    nodeEls.current.forEach((el, i) => {
      const col = COLORS[colors[i]];
      el.style.display = i < n ? '' : 'none';
      if (col) {
        el.style.setProperty('--nc', col.c);
        el.style.setProperty('--nc-soft', col.s);
      }
    });
  }, []);

  const build = useCallback(() => {
    const page = layerRef.current?.closest('.page') as HTMLElement | null;
    const svg = svgRef.current;
    const track = trackRef.current;
    const drawn = drawnRef.current;
    const startEl = startRef.current;
    if (!page || !svg || !track || !drawn || !startEl) return;

    const W = page.offsetWidth;
    const H = page.offsetHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', String(W));
    svg.setAttribute('height', String(H));

    const rel = (el: Element) => {
      const b = el.getBoundingClientRect();
      const p = page.getBoundingClientRect();
      return { l: b.left - p.left, t: b.top - p.top, r: b.right - p.left, btm: b.bottom - p.top };
    };
    const cy = (r: ReturnType<typeof rel>) => (r.t + r.btm) / 2;

    const hero = page.querySelector('#hero');
    const problem = page.querySelector('#problem');
    const numbers = page.querySelector('#numbers');
    const proof = page.querySelector('#proof');
    const how = page.querySelector('#how');
    const stations = [...page.querySelectorAll('.hStation')];
    if (!hero || !problem || !numbers || !proof || !how || stations.length !== 5) return;

    const logoEl = page.querySelector('.nav .word');
    const pts: Point[] = [];
    let heroX: number;
    let heroY: number;
    let endDocY = -1;
    const pageTop = page.getBoundingClientRect().top + window.scrollY;

    if (W >= DESKTOP_BP) {
      const xl = 56;
      const xr = W - 56;
      heroX = xl;
      heroY = logoEl ? cy(rel(logoEl)) : 38;
      const he = rel(hero);
      const pr = rel(problem);
      const hw = rel(how);
      const nodeX = xl + (xr - xl) * 0.291;
      const y1 = he.btm - 30;
      const y2 = pr.btm - 40;
      const headC = (sec: Element) => cy(rel(sec.querySelector('h2') ?? sec));
      const st = stations.map((el) => {
        const r = rel(el);
        const lab = el.querySelector('.hStationLabel');
        return {
          x: el.classList.contains('right') ? r.r + 128 : r.l - 128,
          labY: lab ? cy(rel(lab)) : r.t,
          t: r.t,
        };
      });
      const yh = st[0].t - 121;
      const colors = ['blue', 'orange', 'green', 'magenta', 'lime'];

      pts.push({ x: xl, y: heroY });
      pts.push({ x: xl, y: y1 });
      pts.push({ x: nodeX, y: y1, color: 'orange' });
      pts.push({ x: xr, y: y1 });
      pts.push({ x: xr, y: pr.t + (pr.btm - pr.t) * 0.46, color: 'green' });
      pts.push({ x: xr, y: y2 });
      pts.push({ x: nodeX, y: y2, color: 'magenta' });
      pts.push({ x: xl, y: y2 });
      pts.push({ x: xl, y: headC(numbers), color: 'lime' });
      pts.push({ x: xl, y: headC(proof), color: 'brown' });
      pts.push({ x: xl, y: yh });
      st.forEach((s, i) => {
        if (i === 0) pts.push({ x: s.x, y: yh });
        pts.push({ x: s.x, y: s.labY, color: colors[i] });
        const rowY = i < 4 ? st[i + 1].t - 96 : hw.btm - 96;
        pts.push({ x: s.x, y: rowY });
        pts.push({ x: i < 4 ? st[i + 1].x : W / 2, y: rowY });
      });
      const endY = hw.btm - 6;
      pts.push({ x: W / 2, y: endY, color: 'ink' });
      endDocY = endY + pageTop;
    } else {
      // Single column: a straight rail down the left edge with a stop at each
      // section heading and station.
      const x = 19;
      heroX = x;
      heroY = 44;
      pts.push({ x, y: heroY });
      page.querySelectorAll('.hMNode').forEach((m) => {
        const col = (m as HTMLElement).dataset.color ?? 'ink';
        pts.push({ x, y: cy(rel(m)), color: col });
      });
      const endY = rel(how).btm;
      pts.push({ x, y: endY, color: 'ink' });
      endDocY = endY + pageTop;
    }

    const nodePts = pts.filter((p) => p.color);
    ensureNodes(nodePts.map((p) => p.color as string));

    const d = roundedPath(pts, W >= DESKTOP_BP ? CORNER : 0);
    track.setAttribute('d', d);
    drawn.setAttribute('d', d);

    const s = state.current;
    s.pathLen = drawn.getTotalLength();
    const docMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    // Complete the animation when the road's end point is in view (~62% down
    // the viewport), not at the document bottom — otherwise the car only
    // "arrives" once the end has already scrolled off the top of the screen.
    s.maxScroll = endDocY >= 0
      ? Math.min(docMax, Math.max(1, endDocY - window.innerHeight * 0.62))
      : docMax;
    drawn.style.strokeDasharray = String(s.pathLen);
    drawn.style.strokeDashoffset = String(s.pathLen - s.shown);

    s.samples = [];
    for (let l = 0; l <= s.pathLen; l += 4) {
      const pt = drawn.getPointAtLength(l);
      s.samples.push({ len: l, x: pt.x, y: pt.y });
    }

    startEl.style.left = `${heroX}px`;
    startEl.style.top = `${heroY}px`;

    s.nodeLens = nodePts.map((np, i) => {
      const el = nodeEls.current[i];
      let best = 0, bd = Infinity, bx = np.x, by = np.y;
      for (const sample of s.samples) {
        const dd = (sample.x - np.x) ** 2 + (sample.y - np.y) ** 2;
        if (dd < bd) { bd = dd; best = sample.len; bx = sample.x; by = sample.y; }
      }
      if (el) {
        el.style.left = `${bx}px`;
        el.style.top = `${by}px`;
      }
      return best;
    });
    s.lit = s.nodeLens.map(() => false);
  }, [ensureNodes]);

  useEffect(() => {
    const s = state.current;
    const drawn = drawnRef.current;
    const carEl = carRef.current;

    const apply = (snap: boolean) => {
      const progress = Math.min(1, Math.max(0, window.scrollY / s.maxScroll));
      s.target = progress * s.pathLen;
      if (snap) s.shown = s.target;
    };

    // Binary search the pre-computed samples for a given path length
    const sampleAt = (len: number) => {
      const arr = s.samples;
      if (!arr.length) return { x: 0, y: 0 };
      let lo = 0, hi = arr.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (arr[mid].len < len) lo = mid + 1; else hi = mid;
      }
      // Interpolate between the two nearest samples
      const i = Math.max(0, Math.min(arr.length - 2, lo - 1));
      const a = arr[i], b = arr[i + 1];
      const range = b.len - a.len || 1;
      const t = Math.max(0, Math.min(1, (len - a.len) / range));
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    };

    // Paint visuals at the current eased position (s.shown)
    const draw = () => {
      if (!s.pathLen || !drawn || !carEl) return;

      drawn.style.strokeDashoffset = String(s.pathLen - s.shown);
      const len = Math.max(0, Math.min(s.pathLen, s.shown));
      const p = sampleAt(len);
      const p2 = sampleAt(Math.min(s.pathLen, len + 4));
      let ang = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
      if (!isFinite(ang)) ang = 90;
      // Flip the car 180° when travelling back up so it always drives
      // nose-first instead of appearing to reverse.
      if (s.dir < 0) ang += 180;
      carEl.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%,-50%) rotate(${ang}deg)`;

      nodeEls.current.forEach((el, i) => {
        const shouldLight = s.shown >= (s.nodeLens[i] ?? Infinity) - 1;
        if (shouldLight === s.lit[i]) return;
        s.lit[i] = shouldLight;
        el.classList.toggle('lit', shouldLight);
      });
    };

    // Self-terminating easing loop: glides s.shown toward s.target across
    // frames so chunky wheel deltas don't make the car teleport, then idles.
    // Frame-rate-independent: uses a time constant so the feel is identical
    // whether running at 60/120fps or dropping frames. A max-lag clamp keeps
    // the car from ever falling too far behind during fast scrolling.
    let raf = 0;
    let last = 0;
    const TAU = 55;        // ms; lower = snappier, higher = floatier
    const MAX_LAG = 260;   // px of path; car never trails further than this
    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;

      let diff = s.target - s.shown;
      // Remember travel direction; keep last direction while idle so the car
      // doesn't spin when settling.
      if (diff > 0.5) s.dir = 1;
      else if (diff < -0.5) s.dir = -1;
      // Clamp the lag so fast scrolls don't leave the car stranded behind.
      if (Math.abs(diff) > MAX_LAG) {
        s.shown = s.target - Math.sign(diff) * MAX_LAG;
        diff = Math.sign(diff) * MAX_LAG;
      }
      if (Math.abs(diff) < 0.5) {
        s.shown = s.target;
        draw();
        raf = 0;
        last = 0;
        return;
      }
      const k = 1 - Math.exp(-dt / TAU);
      s.shown += diff * k;
      draw();
      raf = requestAnimationFrame(tick);
    };
    const startLoop = () => { if (!raf) { last = 0; raf = requestAnimationFrame(tick); } };

    const onScroll = () => { apply(false); startLoop(); };
    const onResize = () => { try { build(); } catch { /* */ } };

    try { build(); } catch { /* */ }
    apply(true);
    draw();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // Re-build when page height changes (e.g. form branch switch), debounced
    const page = layerRef.current?.closest('.page') as HTMLElement | null;
    let roTimer: ReturnType<typeof setTimeout>;
    const ro = page ? new ResizeObserver(() => {
      clearTimeout(roTimer);
      roTimer = setTimeout(() => { try { build(); apply(false); startLoop(); } catch { /* */ } }, 150);
    }) : null;
    if (page && ro) ro.observe(page);

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => { try { build(); } catch { /* */ } });
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(roTimer);
      ro?.disconnect();
    };
  }, [build]);

  return (
    <div className="routeLayer" ref={layerRef} aria-hidden="true">
      <svg ref={svgRef} preserveAspectRatio="none">
        <path ref={trackRef} className="routeTrack" />
        <path ref={drawnRef} className="routeDrawn" />
      </svg>
      <span ref={startRef} className="routeStart" />
      <div ref={carRef} className="routeCar">
        <Image src="/assets/coride-car.png" alt="" width={347} height={168} priority draggable={false} />
      </div>
    </div>
  );
}

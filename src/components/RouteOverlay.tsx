'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const CORNER = 30;

const NODE_COLORS = [
  { c: '#1B4FCF', s: 'rgba(27,79,207,0.14)' },
  { c: '#F26B1F', s: 'rgba(242,107,31,0.16)' },
  { c: '#B5279E', s: 'rgba(181,39,158,0.16)' },
  { c: '#0CA64A', s: 'rgba(12,166,74,0.16)' },
  { c: '#1B4FCF', s: 'rgba(27,79,207,0.14)' },
  { c: '#F26B1F', s: 'rgba(242,107,31,0.16)' },
  { c: '#0CA64A', s: 'rgba(12,166,74,0.16)' },
  { c: '#B5279E', s: 'rgba(181,39,158,0.16)' },
  { c: '#7EC242', s: 'rgba(126,194,66,0.18)' },
  { c: '#1f1f1f', s: 'rgba(31,31,31,0.12)' },
];

interface Point {
  x: number;
  y: number;
  node?: number;
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

export function RouteOverlay() {
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

  const ensureNodes = useCallback((n: number) => {
    const layer = layerRef.current;
    if (!layer) return;
    while (nodeEls.current.length < n) {
      const el = document.createElement('span');
      el.className = 'routeNode';
      layer.appendChild(el);
      nodeEls.current.push(el);
    }
    nodeEls.current.forEach((el, i) => {
      if (NODE_COLORS[i]) {
        el.style.setProperty('--nc', NODE_COLORS[i].c);
        el.style.setProperty('--nc-soft', NODE_COLORS[i].s);
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
    const cx = (r: ReturnType<typeof rel>) => (r.l + r.r) / 2;
    const cy = (r: ReturnType<typeof rel>) => (r.t + r.btm) / 2;

    const c1El = page.querySelector('#card1');
    const c2El = page.querySelector('#card2');
    const c3El = page.querySelector('#card3');
    const c4El = page.querySelector('#card4');
    const gridEl = page.querySelector('.pgrid');
    const problemEl = page.querySelector('.problem');
    if (!c1El || !c2El || !c3El || !c4El || !gridEl || !problemEl) return;

    // Derive rail & station X positions from actual section padding so the
    // route scales correctly on tablet (768-1023) without hard-coded 1440 values
    const pStyle = getComputedStyle(problemEl);
    const padL = parseFloat(pStyle.paddingLeft) || 56;
    const padR = parseFloat(pStyle.paddingRight) || 56;
    const rl = padL;
    const rr = W - padR;
    // Anchor the route start to the nav logo so the car + spine line up with
    // the wordmark at every breakpoint (nav height/padding change on mobile).
    const logoEl = page.querySelector('.nav .word');
    let heroX = rl;
    let heroY = 38;
    if (logoEl) {
      const lr = rel(logoEl);
      heroX = lr.l;
      heroY = (lr.t + lr.btm) / 2;
    }
    const cw = rr - rl;
    const sxL = Math.round(rl + cw * 0.214);
    const sxR = Math.round(rl + cw * 0.786);
    const sx = [sxL, sxR, sxL, sxR, sxL];

    const c1 = rel(c1El), c2 = rel(c2El), c3 = rel(c3El), c4 = rel(c4El);
    const grid = rel(gridEl);
    const problem = rel(problemEl);
    const topY = problem.t - 30;
    const botY = grid.btm + 52;

    let endDocY = -1;
    const pts: Point[] = [];
    pts.push({ x: heroX, y: heroY });
    pts.push({ x: rl, y: topY });
    pts.push({ x: cx(c1), y: topY, node: 0 });
    pts.push({ x: rr, y: topY });
    pts.push({ x: rr, y: cy(c2), node: 1 });
    pts.push({ x: rr, y: cy(c4), node: 2 });
    pts.push({ x: rr, y: botY });
    pts.push({ x: cx(c3), y: botY, node: 3 });
    pts.push({ x: rl, y: botY });

    const rows = [...page.querySelectorAll('.s3Row')];
    if (rows.length === 5) {
      const lab = rows.map((r) => {
        const lr = rel(r.querySelector('.s3Label')!);
        return (lr.t + lr.btm) / 2;
      });
      const txt = rows.map((r) => rel(r.querySelector('.s3Text')!));
      // Approach the first station with a straight vertical run (like the others)
      // instead of letting the dot sit on the bend: turn in above the station,
      // staying clear of the section subhead, then drop straight into the dot.
      const subEl = page.querySelector('.howSubhead');
      const subBtm = subEl ? rel(subEl).btm : topY;
      const turnY0 = Math.max(lab[0] - 96, subBtm + 36);
      pts.push({ x: rl, y: turnY0 });
      pts.push({ x: sx[0], y: turnY0 });
      pts.push({ x: sx[0], y: lab[0], node: 4 });
      for (let i = 1; i < 5; i++) {
        const gapY = (txt[i - 1].btm + txt[i].t) / 2;
        pts.push({ x: sx[i - 1], y: gapY });
        pts.push({ x: sx[i], y: gapY });
        pts.push({ x: sx[i], y: lab[i], node: 4 + i });
      }

      const signupEl = page.querySelector('.signup');
      if (signupEl) {
        const su = rel(signupEl);
        const fx = (su.l + su.r) / 2;
        // Turn toward the final stop well above the signup so the car settles on
        // a longer straight run rather than right on the horizontal bend.
        const gapY = su.t - 96;
        pts.push({ x: sx[4], y: gapY });
        pts.push({ x: fx, y: gapY });
        pts.push({ x: fx, y: su.t, node: 9 });
        endDocY = signupEl.getBoundingClientRect().top + window.scrollY;
      }
    }

    const nodePts: Point[] = [];
    pts.forEach((p) => { if (p.node != null) nodePts[p.node] = p; });
    ensureNodes(nodePts.length);

    const d = roundedPath(pts, CORNER);
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
        <Image src="/assets/coride-car.png" alt="" width={347} height={168} priority />
      </div>
    </div>
  );
}

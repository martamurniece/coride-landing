'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

const SPINE_X = 28; // fallback when nav logo isn't measurable
const START_Y = 38;
const CORNER = 12;
// How far the spine insets inward to form a station platform in section 3.
// Must stay in sync with the .s3Text indent in how.css (mobile block).
const PLATFORM_INSET = 24;

const SECTIONS = [
  { selector: '.problem', label: '02 · The problem', color: '#1B4FCF', soft: 'rgba(27,79,207,0.14)' },
  { selector: '.how', label: '03 · How it works', color: '#F26B1F', soft: 'rgba(242,107,31,0.16)' },
  { selector: '.signup', label: '04 · Get on board', color: '#0CA64A', soft: 'rgba(12,166,74,0.16)' },
];

// Per-station node colours, matching the .line-* tokens on each .s3Row.
const STATION_COLORS = [
  { c: '#1B4FCF', s: 'rgba(27,79,207,0.14)' },
  { c: '#F26B1F', s: 'rgba(242,107,31,0.16)' },
  { c: '#0CA64A', s: 'rgba(12,166,74,0.16)' },
  { c: '#B5279E', s: 'rgba(181,39,158,0.16)' },
  { c: '#7EC242', s: 'rgba(126,194,66,0.18)' },
];

interface Point { x: number; y: number }
interface NodeDef { x: number; y: number; color: string; soft: string; label: string }

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

export function RouteOverlayMobile() {
  const layerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const drawnRef = useRef<SVGPathElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<HTMLSpanElement>(null);
  const nodeEls = useRef<HTMLSpanElement[]>([]);
  const labelEls = useRef<HTMLSpanElement[]>([]);
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

  const build = useCallback(() => {
    const page = layerRef.current?.closest('.page') as HTMLElement | null;
    const layer = layerRef.current;
    const svg = svgRef.current;
    const track = trackRef.current;
    const drawn = drawnRef.current;
    const startEl = startRef.current;
    if (!page || !layer || !svg || !track || !drawn || !startEl) return;

    const W = page.offsetWidth;
    const H = page.offsetHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', String(W));
    svg.setAttribute('height', String(H));

    const pageRect = page.getBoundingClientRect();
    const rel = (el: Element) => {
      const b = el.getBoundingClientRect();
      return { l: b.left - pageRect.left, t: b.top - pageRect.top, r: b.right - pageRect.left, btm: b.bottom - pageRect.top };
    };
    const problemEl = page.querySelector('.problem');
    const howEl = page.querySelector('.how');
    const signupEl = page.querySelector('.signup');

    const rows = howEl ? [...howEl.querySelectorAll('.s3Row')] : [];
    const platformed = rows.length === 5;

    // Match the nav logo position so the car + start dot sit on the wordmark
    // (nav height/padding differ between mobile and the 768–769 tablet band).
    const logoEl = page.querySelector('.nav .word');
    let spineX = SPINE_X;
    let startY = START_Y;
    if (logoEl) {
      const lr = rel(logoEl);
      spineX = lr.l;
      startY = (lr.t + lr.btm) / 2;
    }

    const pts: Point[] = [{ x: spineX, y: startY }];
    const nodes: NodeDef[] = [];

    if (problemEl) {
      nodes.push({ x: spineX, y: rel(problemEl).t, color: SECTIONS[0].color, soft: SECTIONS[0].soft, label: SECTIONS[0].label });
    }

    if (howEl && platformed) {
      // Section-3 header marker sits on the outer spine line.
      nodes.push({ x: spineX, y: rel(howEl).t, color: SECTIONS[1].color, soft: SECTIONS[1].soft, label: SECTIONS[1].label });

      const txtRects = rows.map((r) => rel(r.querySelector('.s3Text')!));
      const innerX = spineX + PLATFORM_INSET;

      // Platformed spine: the outer line runs straight, and at each station it
      // insets to a platform spanning that station's content block, then
      // returns to the outer line and continues to the next station.
      for (let i = 0; i < 5; i++) {
        const top = txtRects[i].t;
        const btm = txtRects[i].btm;
        pts.push({ x: spineX, y: top });   // arrive at content top on the outer line
        pts.push({ x: innerX, y: top });    // step inward to the platform
        pts.push({ x: innerX, y: btm });    // run the platform down the content block
        pts.push({ x: spineX, y: btm });   // return to the outer line
        // Station marker sits on the inner edge of the platform.
        nodes.push({ x: innerX, y: (top + btm) / 2, color: STATION_COLORS[i].c, soft: STATION_COLORS[i].s, label: '' });
      }

      if (signupEl) {
        const su = rel(signupEl);
        pts.push({ x: spineX, y: su.t });
        nodes.push({ x: spineX, y: su.t, color: SECTIONS[2].color, soft: SECTIONS[2].soft, label: SECTIONS[2].label });
      }
    } else {
      // Fallback (stations not found): a plain straight spine through the page.
      if (howEl) nodes.push({ x: spineX, y: rel(howEl).t, color: SECTIONS[1].color, soft: SECTIONS[1].soft, label: SECTIONS[1].label });
      let endY = startY;
      if (signupEl) {
        endY = rel(signupEl).t;
        nodes.push({ x: spineX, y: endY, color: SECTIONS[2].color, soft: SECTIONS[2].soft, label: SECTIONS[2].label });
      }
      pts.push({ x: spineX, y: endY });
    }

    // Ensure a DOM pool large enough for all nodes (+ paired labels).
    while (nodeEls.current.length < nodes.length) {
      const node = document.createElement('span');
      node.className = 'routeNode';
      layer.appendChild(node);
      nodeEls.current.push(node);
      const label = document.createElement('span');
      label.className = 'routeMobileLabel';
      layer.appendChild(label);
      labelEls.current.push(label);
    }

    const d = roundedPath(pts, CORNER);
    track.setAttribute('d', d);
    drawn.setAttribute('d', d);

    const s = state.current;
    s.pathLen = drawn.getTotalLength();
    const docMax = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const lastEl = signupEl ?? howEl ?? problemEl;
    const endDocY = lastEl ? lastEl.getBoundingClientRect().top + window.scrollY : 0;
    s.maxScroll = endDocY > 0
      ? Math.min(docMax, Math.max(1, endDocY - window.innerHeight * 0.62))
      : docMax;
    drawn.style.strokeDasharray = String(s.pathLen);
    drawn.style.strokeDashoffset = String(s.pathLen - s.shown);

    s.samples = [];
    for (let l = 0; l <= s.pathLen; l += 4) {
      const pt = drawn.getPointAtLength(l);
      s.samples.push({ len: l, x: pt.x, y: pt.y });
    }

    // Place every node at the nearest point on the drawn path, set colour + label.
    s.nodeLens = nodes.map((nd, i) => {
      const el = nodeEls.current[i];
      const lblEl = labelEls.current[i];
      let best = 0, bd = Infinity, bx = nd.x, by = nd.y;
      for (const sample of s.samples) {
        const dd = (sample.x - nd.x) ** 2 + (sample.y - nd.y) ** 2;
        if (dd < bd) { bd = dd; best = sample.len; bx = sample.x; by = sample.y; }
      }
      if (el) {
        el.style.display = 'block';
        el.style.left = `${bx}px`;
        el.style.top = `${by}px`;
        el.style.setProperty('--nc', nd.color);
        el.style.setProperty('--nc-soft', nd.soft);
      }
      if (lblEl) {
        if (nd.label) {
          lblEl.style.display = 'block';
          lblEl.style.left = `${spineX + 18}px`;
          lblEl.style.top = `${nd.y - 7}px`;
          lblEl.textContent = nd.label;
        } else {
          lblEl.style.display = 'none';
        }
      }
      return best;
    });
    // Hide any leftover pooled elements (e.g. after a resize across the breakpoint).
    for (let i = nodes.length; i < nodeEls.current.length; i++) {
      nodeEls.current[i].style.display = 'none';
      labelEls.current[i].style.display = 'none';
    }
    s.lit = s.nodeLens.map(() => false);

    startEl.style.left = `${spineX}px`;
    startEl.style.top = `${startY}px`;
  }, []);

  useEffect(() => {
    const s = state.current;
    const drawn = drawnRef.current;
    const carEl = carRef.current;

    const apply = (snap: boolean) => {
      const progress = Math.min(1, Math.max(0, window.scrollY / s.maxScroll));
      s.target = progress * s.pathLen;
      if (snap) s.shown = s.target;
    };

    const sampleAt = (len: number) => {
      const arr = s.samples;
      if (!arr.length) return { x: SPINE_X, y: START_Y };
      let lo = 0, hi = arr.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (arr[mid].len < len) lo = mid + 1; else hi = mid;
      }
      const i = Math.max(0, Math.min(arr.length - 2, lo - 1));
      const a = arr[i], b = arr[i + 1];
      const range = b.len - a.len || 1;
      const t = Math.max(0, Math.min(1, (len - a.len) / range));
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    };

    const draw = () => {
      if (!s.pathLen || !drawn || !carEl) return;
      drawn.style.strokeDashoffset = String(s.pathLen - s.shown);
      const len = Math.max(0, Math.min(s.pathLen, s.shown));
      const p = sampleAt(len);
      const p2 = sampleAt(Math.min(s.pathLen, len + 4));
      let ang = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
      if (!isFinite(ang)) ang = 90;
      if (s.dir < 0) ang += 180;
      carEl.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%,-50%) rotate(${ang}deg)`;

      nodeEls.current.forEach((el, i) => {
        const shouldLight = s.shown >= (s.nodeLens[i] ?? Infinity) - 1;
        if (shouldLight === s.lit[i]) return;
        s.lit[i] = shouldLight;
        el.classList.toggle('lit', shouldLight);
      });
    };

    let raf = 0;
    let last = 0;
    const TAU = 55;
    const MAX_LAG = 260;
    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16;
      last = now;

      let diff = s.target - s.shown;
      if (diff > 0.5) s.dir = 1;
      else if (diff < -0.5) s.dir = -1;
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
    <div className="routeLayer routeLayerMobile" ref={layerRef} aria-hidden="true">
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

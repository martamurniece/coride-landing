/**
 * Hero showcase demo data — deterministic, precomputed.
 *
 * Everything the scripted demo shows lives here: the two colleagues, their
 * grid-snapped detour geometry, the illustrative figures, and the sequence
 * timings. No routing engine, no live map — tweak values here to retune
 * the demo.
 *
 * Geometry is expressed in the schematic SVG's own coordinate space
 * (VIEW_W × VIEW_H) and scales with the panel. Colours are existing design
 * tokens (tokens.css) referenced as CSS variables — no new brand colours.
 */

export const VIEW_W = 540;
export const VIEW_H = 780;

/** X of the main Home → Office route street. Keep in sync with Hero.tsx's
 *  heroNet continuation line (panel-left + panel-width × ROUTE_X / VIEW_W). */
export const ROUTE_X = 300;

/** Baseline commute the ETA badge starts from ("20 min to office"); each
 *  confirmed pickup adds its detour minutes on top. */
export const BASE_ETA_MIN = 20;

/** Grey street grid the map is drawn from (roads, not blocks). The route and
 *  every detour run on these streets. */
export const STREETS = {
  v: [190, 300, 420],
  h: [240, 380, 440, 560],
};
export const STREET_W = 10;

export type Stop = {
  id: string;
  x: number;
  y: number;
  /** Existing stop-colour token, as a CSS var() expression. */
  color: string;
};

export type Colleague = {
  id: string;
  /** Display name on the pin / cards, e.g. "Anna K." */
  name: string;
  /** First name for prose ("Anna & Toms are on your ride"). */
  shortName: string;
  /** Initials avatar — not a real person's photo. */
  initials: string;
  /** Full pickup address with door number. */
  pickupAddress: string;
  /** Pin bubble position (on the detour street). The bubble itself is the
   *  pickup stop — its ring lights in `stopColor` once confirmed. */
  pin: { x: number; y: number };
  stopColor: string;
  /** Grid-snapped detour: orthogonal street runs with small corner radii.
   *  Starts and ends on the main route. Previews as the route colour at
   *  reduced opacity, solidifies on confirm. */
  detourPath: string;
  /** Straight main-route segment the detour bypasses. Once the detour is
   *  committed this segment is masked back to plain street (the old route
   *  disappears — a new route has formed). */
  bypassPath: string;
  etaDeltaMin: number;
  /** Real euros the driver earns (illustrative). */
  eurEarned: number;
};

export const ROUTE_COLOR = 'var(--line-green-500)';

export const ORIGIN: Stop = { id: 'home', x: ROUTE_X, y: 610, color: 'var(--line-green-500)' };
export const DESTINATION: Stop = { id: 'office', x: ROUTE_X, y: 130, color: 'var(--ink-950)' };

export const COLLEAGUES: [Colleague, Colleague] = [
  {
    id: 'anna',
    name: 'Anna K.',
    shortName: 'Anna',
    initials: 'AK',
    pickupAddress: 'Dzirnavu iela 101',
    pin: { x: 190, y: 318 },
    stopColor: 'var(--line-blue-500)',
    detourPath: 'M300,240 L206,240 Q190,240 190,256 L190,364 Q190,380 206,380 L300,380',
    bypassPath: 'M300,240 L300,380',
    etaDeltaMin: 4,
    eurEarned: 2.1,
  },
  {
    id: 'toms',
    name: 'Toms V.',
    shortName: 'Toms',
    initials: 'TV',
    pickupAddress: 'Čaka iela 48',
    pin: { x: 420, y: 500 },
    stopColor: 'var(--line-blue-500)',
    detourPath: 'M300,440 L404,440 Q420,440 420,456 L420,544 Q420,560 404,560 L300,560',
    bypassPath: 'M300,440 L300,560',
    etaDeltaMin: 3,
    eurEarned: 1.8,
  },
];

/** Sequence timings (ms). The autopilot replays the scripted flow with these
 *  dwell times; hovering / focusing the panel pauses it. */
export const TIMINGS = {
  /** Attention cue on "+ Add" starts this long after the page shows (CSS
   *  animation-delay on the static frame), or as soon as the pointer enters
   *  the hero. Keep in sync with the delay in showcase.css. */
  attentionDelay: 3000,
  /** Idle dwell before the autopilot presses "+ Add" itself. */
  idleDwell: 4200,
  /** How long the autopilot leaves a decision card open before confirming. */
  previewDwell: 3200,
  /** Confirmation toast lifetime (also drives the growing time-border). */
  toastMs: 3400,
  /** Dwell between the toast dismissing and the autopilot adding the next
   *  colleague. */
  betweenDwell: 2400,
  /** How long the summary holds before the demo resets — shown as the same
   *  growing time-border the toasts have. */
  summaryHold: 5200,
  /** Euro figure count-up duration. */
  tickerMs: 1100,
} as const;

export const totalEta = (confirmed: number) =>
  COLLEAGUES.slice(0, confirmed).reduce((s, c) => s + c.etaDeltaMin, 0);

export const totalEur = (confirmed: number) =>
  COLLEAGUES.slice(0, confirmed).reduce((s, c) => s + c.eurEarned, 0);

export const formatEur = (n: number) => `+€${n.toFixed(2)}`;

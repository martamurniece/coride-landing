import type { CSSProperties, Ref } from 'react';
import { useLocale } from '@/i18n/LocaleProvider';
import {
  BASE_ETA_MIN,
  COLLEAGUES,
  DESTINATION,
  FRAME_H,
  ORIGIN,
  ROUTE_X,
  STREETS,
  STREET_W,
  TIMINGS,
  TOP_CROP,
  VIEW_H,
  VIEW_W,
  formatEur,
  totalEta,
  totalEur,
} from './config';

export type CardView =
  | { kind: 'decision'; idx: 0 | 1 }
  | { kind: 'toast'; idx: 0 | 1 }
  | { kind: 'summary' }
  | null;

export type SceneView = {
  /** How many colleagues are committed (0, 1 or 2, in order). */
  committed: number;
  /** Index of the colleague whose detour is previewing, if any. */
  pending: 0 | 1 | null;
  tomsVisible: boolean;
  /** Which colleague's "+ Add" carries the attention cue. */
  cueTarget: 0 | 1 | null;
  /** Whether the interactive layer has promoted the cue to start immediately
   *  (pointer entered the hero / 3s elapsed). The static frame relies on the
   *  CSS animation-delay instead. */
  cueLive: boolean;
  card: CardView;
  /** Total minutes to the office shown on the badge (base + detours). */
  etaShown: number;
  /** Overrides the earned figure while the count-up ticker runs. */
  eurTicker: string | null;
};

export const IDLE_VIEW: SceneView = {
  committed: 0,
  pending: null,
  tomsVisible: false,
  cueTarget: 0,
  cueLive: false,
  card: null,
  etaShown: BASE_ETA_MIN,
  eurTicker: null,
};

export type SceneHandlers = {
  onAdd: (idx: 0 | 1) => void;
  onConfirm: () => void;
  onCancel: () => void;
};

const px = (x: number) => `${((x / VIEW_W) * 100).toFixed(3)}%`;
const py = (y: number) => `${(((y - TOP_CROP) / FRAME_H) * 100).toFixed(3)}%`;

export const fmt = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));

function detourClass(idx: number, view: SceneView): string {
  if (idx < view.committed) return 'scDetour is-committed';
  if (view.pending === idx) return 'scDetour is-pending';
  return 'scDetour';
}

export function Scene({
  view,
  on,
  confirmRef,
}: {
  view: SceneView;
  on?: SceneHandlers;
  confirmRef?: Ref<HTMLButtonElement>;
}) {
  const { t } = useLocale();
  const s = t.hero.showcase;
  const card = view.card;

  return (
    <div className="scPanel">
      <svg
        className="scMap"
        viewBox={`0 ${TOP_CROP} ${VIEW_W} ${FRAME_H}`}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={s.sceneAria}
      >
        <g aria-hidden="true">
          {/* Street grid — grey roads on a plain canvas */}
          {STREETS.v.map((x) => (
            <path key={`v${x}`} className="scStreet" d={`M${x},-4 V${VIEW_H + 4}`} fill="none" strokeWidth={STREET_W} />
          ))}
          {STREETS.h.map((y) => (
            <path key={`h${y}`} className="scStreet" d={`M-4,${y} H${VIEW_W + 4}`} fill="none" strokeWidth={STREET_W} />
          ))}

          {/* Main Home → Office route (one continuous functional line) */}
          <path
            className="scRoute"
            d={`M${ROUTE_X},-4 V${VIEW_H + 4}`}
            fill="none"
            strokeLinecap="round"
          />

          {/* Once a detour is committed, the bypassed straight segment is
              masked back to plain street — the old route disappears */}
          {COLLEAGUES.map((c, i) => (
            <path
              key={c.id}
              className={`scBypass ${i < view.committed ? 'is-active' : ''}`}
              d={c.bypassPath}
              fill="none"
              strokeWidth={STREET_W}
            />
          ))}

          {/* Detours: preview as the route colour at reduced opacity, then
              solidify on confirm */}
          {COLLEAGUES.map((c, i) => (
            <path
              key={c.id}
              className={detourClass(i, view)}
              d={c.detourPath}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
            />
          ))}

          {/* Home (bottom) and Office (top) */}
          <circle className="scStop" cx={ORIGIN.x} cy={ORIGIN.y} r="10" fill="var(--white)" stroke={ORIGIN.color} />
          <circle className="scStop" cx={DESTINATION.x} cy={DESTINATION.y} r="10" fill="var(--white)" stroke={DESTINATION.color} />
        </g>
      </svg>

      {/* Stop labels */}
      <span className="scStopLabel" style={{ left: px(DESTINATION.x + 22), top: py(DESTINATION.y) }}>
        {s.office}
      </span>
      <span className="scStopLabel" style={{ left: px(ORIGIN.x + 22), top: py(ORIGIN.y) }}>
        {s.home}
      </span>

      {/* Time-to-office badge, anchored left of the Office stop; adapts as
          pickups are confirmed */}
      <span
        className="scEta"
        key={view.etaShown}
        style={{ left: px(DESTINATION.x - 24), top: py(DESTINATION.y) }}
        aria-label={fmt(s.etaAria, { n: view.etaShown })}
      >
        {fmt(s.etaBadge, { n: view.etaShown })}
      </span>

      {/* Colleague pins + per-colleague "+ Add" */}
      {COLLEAGUES.map((c, i) => {
        const idx = i as 0 | 1;
        if (idx === 1 && !view.tomsVisible) return null;
        const committed = idx < view.committed;
        const previewing = view.pending === idx;
        const addable = !committed && !previewing;
        const cue = addable && view.cueTarget === idx;
        return (
          <div
            key={c.id}
            className={`scPin ${committed ? 'is-committed' : ''} ${previewing ? 'is-previewing' : ''} ${idx === 1 ? 'is-second is-flip' : ''}`}
            style={{ left: px(c.pin.x), top: py(c.pin.y) }}
          >
            <span className="scBubble" style={{ '--sc-stop': c.stopColor } as CSSProperties}>
              {c.initials}
            </span>
            {addable && (
              <button
                type="button"
                className={`scAdd ${cue ? 'has-cue' : ''} ${cue && view.cueLive ? 'is-live' : ''}`}
                onClick={on ? () => on.onAdd(idx) : undefined}
                aria-label={fmt(s.addAria, { name: c.name })}
              >
                <span aria-hidden="true">+</span> {s.add}
              </button>
            )}
            <span className="scPinName">{c.name}</span>
          </div>
        );
      })}

      {/* Decision card / confirmation toast / resting summary */}
      {card?.kind === 'decision' && (
        <div className="scCard scDecision" key={`decision-${card.idx}`} role="group" aria-label={fmt(s.cardTitle, { name: COLLEAGUES[card.idx].shortName })}>
          <div className="scCardHead">
            <span className="scAvatar">{COLLEAGUES[card.idx].initials}</span>
            <div>
              <p className="scCardTitle">{fmt(s.cardTitle, { name: COLLEAGUES[card.idx].shortName })}</p>
              <p className="scCardSub">{fmt(s.pickup, { address: COLLEAGUES[card.idx].pickupAddress })}</p>
            </div>
          </div>
          <div className="scTiles">
            <div className="scTile">
              <span className="scTileLabel">{s.detourLabel}</span>
              <span className="scTileValue">{fmt(s.min, { n: COLLEAGUES[card.idx].etaDeltaMin })}</span>
            </div>
            <div className="scTile is-earned">
              <span className="scTileLabel">{s.earnedLabel}</span>
              <span className="scTileValue">{formatEur(COLLEAGUES[card.idx].eurEarned)}</span>
            </div>
          </div>
          <div className="scActions">
            <button type="button" className="scBtnCancel" onClick={on?.onCancel}>
              {s.cancel}
            </button>
            <button type="button" className="scBtnConfirm" ref={confirmRef} onClick={on?.onConfirm}>
              {s.confirm}
            </button>
          </div>
        </div>
      )}

      {card?.kind === 'toast' && (
        <div
          className="scCard scToast"
          key={`toast-${card.idx}`}
          style={{ '--sc-toast-ms': `${TIMINGS.toastMs}ms` } as CSSProperties}
        >
          <span className="scToastTimer" aria-hidden="true" />
          <div className="scCardHead">
            <span className="scAvatar">{COLLEAGUES[card.idx].initials}</span>
            <div>
              <p className="scCardTitle">{fmt(s.toastTitle, { name: COLLEAGUES[card.idx].shortName })}</p>
              <p className="scCardSub">{fmt(s.toastSub, { address: COLLEAGUES[card.idx].pickupAddress })}</p>
            </div>
          </div>
          <div className="scTiles">
            <div className="scTile">
              <span className="scTileLabel">{s.detourLabel}</span>
              <span className="scTileValue">{fmt(s.min, { n: totalEta(card.idx + 1) })}</span>
            </div>
            <div className="scTile is-earned">
              <span className="scTileLabel">{s.earnedLabel}</span>
              <span className="scTileValue">{view.eurTicker ?? formatEur(totalEur(card.idx + 1))}</span>
            </div>
          </div>
        </div>
      )}

      {card?.kind === 'summary' && (
        <div
          className="scCard scSummary"
          key="summary"
          style={{ '--sc-toast-ms': `${TIMINGS.summaryHold}ms` } as CSSProperties}
        >
          {/* Same growing time-border as the toasts: when it completes, the
              demo resets itself */}
          <span className="scToastTimer" aria-hidden="true" />
          <div className="scCardHead">
            <span className="scAvatarStack">
              <span className="scAvatar">{COLLEAGUES[0].initials}</span>
              <span className="scAvatar is-alt">{COLLEAGUES[1].initials}</span>
            </span>
            <div>
              <p className="scCardTitle">
                {fmt(s.summaryTitle, { names: `${COLLEAGUES[0].shortName} & ${COLLEAGUES[1].shortName}` })}
              </p>
              <p className="scCardSub">{fmt(s.summarySub, { count: 2 })}</p>
            </div>
          </div>
          <div className="scTiles">
            <div className="scTile">
              <span className="scTileLabel">{s.detourLabel}</span>
              <span className="scTileValue">{fmt(s.min, { n: totalEta(2) })}</span>
            </div>
            <div className="scTile is-earned">
              <span className="scTileLabel">{s.earnedLabel}</span>
              <span className="scTileValue">{view.eurTicker ?? formatEur(totalEur(2))}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

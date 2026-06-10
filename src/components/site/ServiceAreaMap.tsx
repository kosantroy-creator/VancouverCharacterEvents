import { serviceAreas } from "@/lib/site-data";

/** Decorative, stylized Metro Vancouver map. Not geographically exact — a premium
 *  illustrative backdrop with glowing location markers. */
const markers = [
  { x: 26, y: 40 },
  { x: 38, y: 34 },
  { x: 33, y: 50 },
  { x: 48, y: 44 },
  { x: 58, y: 54 },
  { x: 44, y: 62 },
  { x: 22, y: 28 },
  { x: 30, y: 22 },
  { x: 62, y: 38 },
  { x: 70, y: 50 },
  { x: 54, y: 70 },
  { x: 78, y: 62 },
];

export function ServiceAreaMap() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-xl)] border border-gold-500/25 bg-ink-800 shadow-[var(--shadow-ink)]">
      <svg
        viewBox="0 0 100 75"
        className="h-full w-full"
        role="img"
        aria-label="Stylized map of Metro Vancouver service area"
      >
        {/* water */}
        <rect width="100" height="75" fill="var(--ink-900)" />
        {/* landmass shapes */}
        <path
          d="M8 30 Q20 18 40 20 T78 24 Q92 30 90 48 Q86 66 60 66 Q34 70 18 58 Q4 46 8 30 Z"
          fill="var(--ink-700)"
          stroke="var(--gold-500)"
          strokeOpacity="0.3"
          strokeWidth="0.4"
        />
        <path
          d="M58 6 Q72 4 84 12 Q92 20 86 28 Q72 30 62 22 Q54 14 58 6 Z"
          fill="var(--ink-700)"
          stroke="var(--gold-500)"
          strokeOpacity="0.25"
          strokeWidth="0.4"
        />
        {/* markers */}
        {markers.map((m, i) => (
          <g key={i}>
            <circle cx={m.x} cy={m.y} r="2.4" fill="var(--gold-500)" opacity="0.18" />
            <circle cx={m.x} cy={m.y} r="0.9" fill="var(--gold-400)" />
          </g>
        ))}
      </svg>
      <span className="absolute bottom-4 left-5 t-engrave text-[0.62rem] tracking-[0.22em] text-gold-400">
        Metro Vancouver · Lower Mainland
      </span>
    </div>
  );
}

export function ServiceAreaChips() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {serviceAreas.map((area) => (
        <span
          key={area}
          className="rounded-[var(--radius-pill)] border border-border-strong bg-surface px-4 py-1.5 text-sm font-medium text-fg-2"
        >
          {area}
        </span>
      ))}
      <span className="rounded-[var(--radius-pill)] border border-gold-500/50 bg-surface px-4 py-1.5 text-sm font-medium text-fg-gold">
        & surrounding communities
      </span>
    </div>
  );
}

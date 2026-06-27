/**
 * BazaarDivider — a night-market lantern-string garland that sits on the seam between
 * Enchanted Bazaar sections, so the page reads as one continuous lantern-lit market path
 * instead of stacked colour blocks. Transparent background (the two sections' own washes
 * show through), jewel-tone lantern bodies (adds colour at every seam), a swooping gold
 * wire, soft glows. Decorative only (aria-hidden). Gentle sway/flicker is gated by the
 * global prefers-reduced-motion guard. See ".bzd" in styles.css.
 */

// Lantern anchor points along the swooping wire (x in the 0–1200 viewBox, y on the curve),
// each with a jewel hue + a sway phase. Wire dips ~26px at centre; y values follow it.
const LANTERNS: { x: number; y: number; hue: string; glow: string; delay: string; big?: boolean }[] = [
  { x: 150, y: 20, hue: "#1E8A9E", glow: "rgba(34,160,170,0.55)", delay: "0s" },
  { x: 330, y: 24.5, hue: "#C8556E", glow: "rgba(200,85,110,0.55)", delay: "-0.9s" },
  { x: 510, y: 26.5, hue: "#E7B24B", glow: "rgba(231,178,75,0.6)", delay: "-1.8s" },
  { x: 600, y: 27, hue: "#8E2D6E", glow: "rgba(142,45,110,0.55)", delay: "-2.4s", big: true },
  { x: 690, y: 26.5, hue: "#3E6EA8", glow: "rgba(62,110,168,0.55)", delay: "-1.4s" },
  { x: 870, y: 24.5, hue: "#1E8A9E", glow: "rgba(34,160,170,0.55)", delay: "-0.5s" },
  { x: 1050, y: 20, hue: "#E7B24B", glow: "rgba(231,178,75,0.6)", delay: "-2.1s" },
];

export function BazaarDivider() {
  return (
    <div aria-hidden className="bzd">
      <svg className="bzd-svg" viewBox="0 0 1200 72" preserveAspectRatio="none" role="presentation">
        {/* swooping wire */}
        <path className="bzd-wire" d="M0,12 Q600,40 1200,12" fill="none" stroke="#C19A3C" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
        {LANTERNS.map(({ x, y, hue, glow, delay, big }, i) => {
          const w = big ? 16 : 13;
          const h = big ? 22 : 18;
          const top = y + 6; // gap below the wire for the short hang line
          return (
            <g key={i} className="bzd-lantern" style={{ animationDelay: delay, transformOrigin: `${x}px ${y}px` }}>
              {/* hang line */}
              <line x1={x} y1={y} x2={x} y2={top} stroke="#C19A3C" strokeWidth="1" opacity="0.7" />
              {/* glow */}
              <circle className="bzd-glow" cx={x} cy={top + h / 2 + 2} r={big ? 17 : 14} fill={glow} style={{ animationDelay: delay }} />
              {/* cap */}
              <rect x={x - w / 2 + 2} y={top} width={w - 4} height="2.5" rx="1" fill="#B0892E" />
              {/* body */}
              <rect x={x - w / 2} y={top + 2.5} width={w} height={h} rx={w / 2.4} fill={hue} stroke="#F4D98A" strokeWidth="0.8" />
              {/* vertical ribs + highlight */}
              <line x1={x} y1={top + 3.5} x2={x} y2={top + h} stroke="#fff" strokeWidth="0.6" opacity="0.35" />
              <rect x={x - w / 2 + 2} y={top + 4} width="2" height={h - 4} rx="1" fill="#fff" opacity="0.28" />
              {/* finial */}
              <line x1={x} y1={top + h + 2.5} x2={x} y2={top + h + 5} stroke="#B0892E" strokeWidth="1" opacity="0.8" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

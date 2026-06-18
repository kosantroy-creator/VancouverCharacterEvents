import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Footprints, HeartHandshake, Leaf, ShieldCheck, Tent, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ExpeditionCredentials — the trust bridge between the bright gate hero and the
 * suspenseful eye section. It reads as an expedition checkpoint: a strip of
 * stamp-style field badges on a faint map route, with the background flowing from
 * the hero's warm cream/gold (top) through pale moss mist (middle) into the deep
 * jungle green the eye section opens with (bottom). Foliage, footprints and mist
 * live only at the LOWER seam so the hero above stays clean. Badges rise and get
 * "stamped" as the section scrolls in (reduced-motion safe — visible by default).
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const CREDS: { icon: IconType; label: string }[] = [
  { icon: Footprints, label: "13-Foot T-Rex" },
  { icon: Users, label: "Two Trainers On-Site" },
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: Tent, label: "Indoor & Outdoor Encounters" },
  { icon: HeartHandshake, label: "Family-Friendly Safety First" },
];

/** A low, leafy underbrush silhouette spanning the width (NOT tall ferns). */
function leafyEdge(seed: number, baseY: number): string {
  const W = 1440;
  const n = 20;
  let d = `M0 160 L0 ${baseY}`;
  for (let i = 0; i < n; i++) {
    const x1 = ((i + 1) / n) * W;
    const mid = (i / n) * W + W / n / 2;
    const h = 16 + ((i * 7 + seed * 11) % 30); // 16–46px leaf bumps
    d += ` Q ${mid} ${baseY - h} ${x1} ${baseY}`;
  }
  d += " L1440 160 Z";
  return d;
}

export function ExpeditionCredentials() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Expedition credentials"
      className={cn("cred relative isolate overflow-hidden", inView && "is-in")}
      style={{
        background:
          "linear-gradient(180deg, #F7EDD8 0%, #F0EAC8 30%, #DCE6B6 56%, #C8DDA2 80%, #B7D08F 100%)",
      }}
    >
      {/* soft mist drifting behind the badges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[26%] h-40"
        style={{
          background:
            "radial-gradient(50% 100% at 30% 50%, rgba(255,251,240,0.8), transparent 72%), radial-gradient(46% 100% at 72% 46%, rgba(255,251,240,0.62), transparent 74%)",
          filter: "blur(18px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 pb-40 pt-16 text-center sm:px-6 md:pb-48 md:pt-20 lg:px-8">
        {/* Title */}
        <span className="t-engrave inline-flex items-center gap-2 text-[0.66rem] tracking-[0.3em] text-[#9c7406]">
          <Leaf className="h-3 w-3 text-[#6E9A5E]" aria-hidden />
          Field Briefing
          <Leaf className="h-3 w-3 -scale-x-100 text-[#6E9A5E]" aria-hidden />
        </span>
        <h2 className="t-display mt-2 text-3xl font-bold leading-tight text-[#2E4A38] md:text-[2.6rem]">
          Expedition Credentials
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[0.98rem] leading-relaxed text-[#2E4A38]/80">
          Everything is designed to feel exciting, organized, and safe for young explorers.
        </p>

        {/* the map route + checkpoint badges */}
        <div className="relative mt-10">
          {/* dashed map line threading the checkpoints (desktop) */}
          <svg
            aria-hidden
            viewBox="0 0 1000 20"
            preserveAspectRatio="none"
            className="absolute left-0 right-0 top-[34px] -z-0 hidden h-5 w-full md:block"
          >
            <path
              d="M10 10 H990"
              fill="none"
              stroke="#6E9A5E"
              strokeWidth="2"
              strokeDasharray="2 10"
              strokeLinecap="round"
              opacity="0.55"
            />
          </svg>

          <ul className="flex snap-x gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible md:gap-4 [&::-webkit-scrollbar]:hidden">
            {CREDS.map((c, i) => (
              <CredBadge key={c.label} icon={c.icon} label={c.label} index={i} />
            ))}
          </ul>
        </div>
      </div>

      {/* ===================== LOWER SEAM — softly into the deeper jungle ===================== */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-44">
        {/* settle the field to the eye section's green so the boundary is seamless */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(183,208,143,0.55) 50%, #B7D08F 100%)",
          }}
        />
        {/* footprint path marks fading in along the seam (above the foliage) */}
        <svg
          viewBox="0 0 120 110"
          className="cred-print absolute bottom-[92px] left-1/2 h-14 w-auto -translate-x-1/2"
          preserveAspectRatio="xMidYMax meet"
        >
          <g fill="rgba(46,74,56,0.55)">
            {[0, 1, 2].map((i) => {
              const y = 18 + i * 38;
              const x = 60 + (i % 2 ? 15 : -15);
              return (
                <g key={i} transform={`translate(${x} ${y}) scale(${0.85 - i * 0.12})`}>
                  <ellipse cx="0" cy="9" rx="11" ry="13" />
                  <path d="M0 -2 C-6 -11 -8 -20 -5 -25 C-2 -29 2 -29 5 -25 C8 -20 6 -11 0 -2 Z" />
                  <path d="M-10 3 C-17 -2 -20 -10 -17 -15 C-14 -19 -10 -16 -8 -10 C-6 -4 -6 0 -10 3 Z" />
                  <path d="M10 3 C17 -2 20 -10 17 -15 C14 -19 10 -16 8 -10 C6 -4 6 0 10 3 Z" />
                </g>
              );
            })}
          </g>
        </svg>
        {/* two layers of low jungle underbrush — masked so they fade down into the
            green (no hard bottom line) and softly blurred so the seam is smooth */}
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="absolute inset-x-0 bottom-0 h-28 w-full"
          style={{
            WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 46%, transparent 100%)",
            maskImage: "linear-gradient(180deg, #000 0%, #000 46%, transparent 100%)",
            filter: "blur(1.5px)",
          }}
        >
          <path d={leafyEdge(2, 92)} fill="#5C8A4E" opacity="0.7" />
          <path d={leafyEdge(5, 116)} fill="#3E5E3A" opacity="0.88" />
        </svg>
      </div>
    </section>
  );
}

function CredBadge({ icon: Icon, label, index }: { icon: IconType; label: string; index: number }) {
  return (
    <li
      className="cred-badge w-[150px] shrink-0 snap-center sm:w-[168px] md:w-auto md:flex-1 md:max-w-[200px]"
      style={{ animationDelay: `${index * 110}ms` } as Vars}
    >
      <div className="relative flex h-full flex-col items-center gap-3 rounded-[18px] border-2 border-dashed border-[#6E9A5E]/45 bg-[#FBF3DF]/85 px-4 py-5 shadow-[0_16px_34px_-22px_rgba(46,74,56,0.5)] backdrop-blur-sm">
        {/* stamp medallion */}
        <span
          className="relative grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_8px_18px_-8px_rgba(46,74,56,0.6)]"
          style={{ background: "linear-gradient(150deg, #D99A32, #6E9A5E)" }}
        >
          <span
            aria-hidden
            className="absolute inset-1 rounded-full border border-dashed border-white/55"
          />
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <span className="text-[0.78rem] font-semibold leading-tight text-[#2E4A38]">{label}</span>
        {/* the "stamped" check */}
        <span
          aria-hidden
          className="cred-stamp absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border-2 border-[#FBF3DF] bg-[#3FA46A] text-white shadow-[0_4px_10px_-3px_rgba(46,74,56,0.6)]"
          style={{ animationDelay: `${index * 110 + 260}ms` } as Vars}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
      </div>
    </li>
  );
}

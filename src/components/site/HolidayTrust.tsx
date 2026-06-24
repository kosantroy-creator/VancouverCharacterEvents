import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Camera, ClipboardCheck, Egg, Flower2, Ghost, Gift, Moon, School, Snowflake, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HolidayTrust — "Seasonal Magic. Smooth Visits. Photo-Ready Moments." The trust
 * band bridging the Holiday Village hero into the page. Themed as a three-season
 * village: the first three "Holiday Promise" cards ARE the seasons we offer —
 * Easter/Spring (lilac), Spooky Season (pumpkin/plum) and Christmas (cranberry) —
 * each with its own accent, sprig and flourish; the last three are year-round
 * formats in gold. Hung beneath a balanced seasonal garland (greenery + spring
 * blossoms + pumpkins + ornaments + a gold bow), with snow + petals + leaves + a
 * couple of distant bats drifting. Brand-safe seasonal language only. VISIBLE BY
 * DEFAULT (hidden only under `.hvt.anim:not(.is-in)`), reduced-motion safe. See
 * "HOLIDAY VILLAGE TRUST" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string; style?: CSSProperties }>;
type SeasonKey = "spring" | "halloween" | "christmas" | "gold";

const SEASONS: Record<SeasonKey, { accent: string; sprig: "blossom" | "leaf" | "holly" | "laurel"; flake: IconType }> = {
  spring: { accent: "#9B7BB8", sprig: "blossom", flake: Flower2 },
  halloween: { accent: "#E07B39", sprig: "leaf", flake: Moon },
  christmas: { accent: "#B0232A", sprig: "holly", flake: Snowflake },
  gold: { accent: "#C19A3C", sprig: "laurel", flake: Sparkles },
};

const BADGES: { season: SeasonKey; icon: IconType; title: string; desc: string }[] = [
  {
    season: "spring",
    icon: Egg,
    title: "Easter & Spring Visits",
    desc: "Soft, cheerful spring visits for Easter events, egg hunts, daycares, schools, and family photos.",
  },
  {
    season: "halloween",
    icon: Ghost,
    title: "Spooky Season Ready",
    desc: "Fun, quirky, family-friendly Halloween appearances for parties, schools, photos, and themed events.",
  },
  {
    season: "christmas",
    icon: Gift,
    title: "Christmas Event Ready",
    desc: "Our busiest season — built for Santa-style visits, elves, carolers, holiday photos, and festive greetings.",
  },
  {
    season: "gold",
    icon: School,
    title: "School, Mall & Festival Friendly",
    desc: "Designed for group settings, public appearances, walk-bys, photo lines, and community celebrations.",
  },
  {
    season: "gold",
    icon: Camera,
    title: "Photo-Ready Moments",
    desc: "Built for family photos, group shots, seasonal backdrops, and memorable holiday reactions.",
  },
  {
    season: "gold",
    icon: ClipboardCheck,
    title: "Handler Supported",
    desc: "A helper supports timing, positioning, transitions, and smoother character interaction.",
  },
];

/* Subtle drifting seasons — snow + petals + leaves (few, motion-gated). */
const DRIFT = [
  { k: "snow", left: "10%", s: 7, delay: "0s", dur: "18s", dx: "12px", rot: "40deg", op: 0.7, c: "#fff" },
  { k: "petal", left: "28%", s: 8, delay: "3.6s", dur: "22s", dx: "-10px", rot: "200deg", op: 0.55, c: "#DE789B" },
  { k: "leaf", left: "46%", s: 9, delay: "1.8s", dur: "19s", dx: "13px", rot: "150deg", op: 0.55, c: "#E07B39" },
  { k: "snow", left: "64%", s: 6, delay: "5s", dur: "23s", dx: "-12px", rot: "40deg", op: 0.6, c: "#fff" },
  { k: "petal", left: "80%", s: 8, delay: "2.6s", dur: "20s", dx: "11px", rot: "240deg", op: 0.52, c: "#9B7BB8" },
  { k: "leaf", left: "92%", s: 9, delay: "4.2s", dur: "21s", dx: "-9px", rot: "120deg", op: 0.55, c: "#E07B39" },
] as const;

/* A small bat — a faint Halloween hint drifting in the distance. */
function Bat({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 12" aria-hidden="true">
      <path
        d="M12,3 Q11,1 12,0 Q13,1 12,3 Q14,1.5 16,1.2 Q19,0.8 22,3 Q20,2.6 18.5,3.4 Q17,2.6 16,4.2 Q14,3 12,5 Q10,3 8,4.2 Q7,2.6 5.5,3.4 Q4,2.6 2,3 Q5,0.8 8,1.2 Q10,1.5 12,3 Z"
        fill="#4A2E45"
      />
    </svg>
  );
}

/* A small seasonal sprig tucked under each medallion. */
function SeasonSprig({ kind }: { kind: "blossom" | "leaf" | "holly" | "laurel" }) {
  if (kind === "blossom") {
    return (
      <svg className="hvt-sprig" viewBox="0 0 44 16" aria-hidden="true">
        <path d="M22,3 C 14,1 7,4 5,11 C 13,13 19,9 22,3 Z" fill="#7FB98E" />
        <path d="M22,3 C 30,1 37,4 39,11 C 31,13 25,9 22,3 Z" fill="#A6D3B0" />
        <circle cx="22" cy="8" r="3.4" fill="#E79CB8" />
        <circle cx="22" cy="8" r="1.4" fill="#E8C879" />
      </svg>
    );
  }
  if (kind === "leaf") {
    return (
      <svg className="hvt-sprig" viewBox="0 0 44 16" aria-hidden="true">
        <ellipse cx="16" cy="9" rx="8" ry="4.4" transform="rotate(-22 16 9)" fill="#E07B39" />
        <ellipse cx="28" cy="9" rx="8" ry="4.4" transform="rotate(22 28 9)" fill="#C9692C" />
        <circle cx="22" cy="9" r="2.4" fill="#7A4FA3" />
      </svg>
    );
  }
  if (kind === "laurel") {
    return (
      <svg className="hvt-sprig" viewBox="0 0 44 16" aria-hidden="true">
        <path d="M22,3 C 15,1 9,4 7,11 C 14,13 19,9 22,3 Z" fill="#D9B25A" />
        <path d="M22,3 C 29,1 35,4 37,11 C 30,13 25,9 22,3 Z" fill="#E0C271" />
        <circle cx="22" cy="8" r="2.2" fill="#C19A3C" />
      </svg>
    );
  }
  return (
    <svg className="hvt-sprig" viewBox="0 0 44 16" aria-hidden="true">
      <path d="M22,3 C 14,0 6,4 4,11 C 12,13 18,9 22,3 Z" fill="#1E6E4A" />
      <path d="M22,3 C 30,0 38,4 40,11 C 32,13 26,9 22,3 Z" fill="#2E7D4F" />
      <circle cx="19.5" cy="9.5" r="2.4" fill="#B0232A" />
      <circle cx="24.5" cy="9.5" r="2.4" fill="#9B2226" />
    </svg>
  );
}

/* Balanced seasonal garland — greenery base, gold lights, spring blossoms (left),
   pumpkins + moon (centre), ornaments + snow (right), tied with a gold bow. */
function Garland() {
  return (
    <svg className="hvt-garland" viewBox="0 0 1440 130" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d="M-20,2 C 380,120 1060,120 1460,2" fill="none" stroke="#3F6B43" strokeWidth="28" strokeLinecap="round" />
      <path d="M-20,2 C 380,120 1060,120 1460,2" fill="none" stroke="#5E8A55" strokeWidth="16" strokeLinecap="round" opacity="0.9" />
      <path d="M-20,2 C 380,120 1060,120 1460,2" fill="none" stroke="#7CA86E" strokeWidth="28" strokeLinecap="round" opacity="0.4" strokeDasharray="2 12" />
      <path d="M-20,-7 C 380,110 1060,110 1460,-7" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      {/* gold lights along the whole swag */}
      <g className="hvt-lights" fill="#F4D98A">
        <circle cx="150" cy="44" r="4.2" />
        <circle cx="380" cy="92" r="4.2" />
        <circle cx="600" cy="110" r="4.2" />
        <circle cx="840" cy="110" r="4.2" />
        <circle cx="1060" cy="92" r="4.2" />
        <circle cx="1290" cy="44" r="4.2" />
      </g>
      {/* LEFT — spring blossoms */}
      <g>
        <g transform="translate(280,76)"><circle r="6.6" fill="#E79CB8" /><circle r="2.4" fill="#E8C879" /></g>
        <g transform="translate(420,100)"><circle r="6" fill="#C9A7DE" /><circle r="2.2" fill="#E8C879" /></g>
        <ellipse cx="350" cy="90" rx="6" ry="8" fill="#FBE3A6" stroke="#E0C271" strokeWidth="1.4" />
      </g>
      {/* CENTRE — pumpkins + moon */}
      <g>
        <circle cx="660" cy="116" r="7.6" fill="#E07B39" />
        <circle cx="790" cy="116" r="7.6" fill="#C9692C" />
        <circle cx="720" cy="58" r="9" fill="#F3E6C2" opacity="0.92" />
        <circle cx="724" cy="56" r="9" fill="#FBF3E0" opacity="0.55" />
      </g>
      {/* RIGHT — christmas ornaments + berries */}
      <g>
        <circle cx="1010" cy="100" r="7" fill="#B0232A" />
        <circle cx="1120" cy="78" r="6.4" fill="#C99A3C" />
        <g fill="#B0232A"><circle cx="1180" cy="62" r="3.4" /><circle cx="1208" cy="64" r="3.4" /></g>
      </g>
      {/* central gold bow */}
      <g transform="translate(720,92)">
        <path d="M0,0 C -30,-24 -48,-6 -36,10 C -27,21 -7,13 0,0 Z" fill="#D9B25A" />
        <path d="M0,0 C 30,-24 48,-6 36,10 C 27,21 7,13 0,0 Z" fill="#D9B25A" />
        <path d="M-5,5 L -18,44 L -3,36 Z" fill="#C19A3C" />
        <path d="M5,5 L 18,44 L 3,36 Z" fill="#C19A3C" />
        <circle cx="0" cy="3" r="8" fill="#B58A2E" />
        <circle cx="0" cy="3" r="3.4" fill="#FBF3E0" />
      </g>
    </svg>
  );
}

export function HolidayTrust() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    setMotionOK(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="hvt-title"
      className={cn("hvt relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* warm candlelight glow + balanced seasonal garland swag */}
      <span aria-hidden className="hvt-glow" />
      <div aria-hidden className="hvt-garland-wrap pointer-events-none absolute inset-x-0 top-0">
        <Garland />
      </div>

      {/* subtle drifting snow + petals + leaves + distant bats */}
      {motionOK ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {DRIFT.map((d, i) => (
            <span
              key={i}
              className={d.k === "petal" ? "hvt-petal" : d.k === "leaf" ? "hvt-leaf" : "hvt-snow"}
              style={
                {
                  left: d.left,
                  width: d.s,
                  height: d.s,
                  animationDelay: d.delay,
                  animationDuration: d.dur,
                  "--dx": d.dx,
                  "--rot": d.rot,
                  "--op": d.op,
                  "--c": d.c,
                } as Vars
              }
            />
          ))}
          <Bat className="hvt-bat" style={{ left: "16%", top: "30%", width: 18, animationDelay: "0s" } as Vars} />
          <Bat className="hvt-bat" style={{ left: "78%", top: "24%", width: 14, animationDelay: "3.5s" } as Vars} />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-16 pt-28 sm:px-6 md:pt-32 lg:px-8">
        {/* header */}
        <div className="hvt-head mx-auto max-w-2xl text-center">
          <span className="hvt-eyebrow">
            <span aria-hidden className="hvt-eyebrow-flourish" />
            Holiday Promise
            <span aria-hidden className="hvt-eyebrow-flourish hvt-eyebrow-flourish--r" />
          </span>
          <h2 id="hvt-title" className="hvt-title">
            Seasonal magic, smooth visits, and photo-ready moments.
          </h2>
          <p className="hvt-sub">
            From{" "}
            <span className="font-semibold text-[#9B7BB8]">Easter visits</span> and{" "}
            <span className="font-semibold text-[#E07B39]">Halloween parties</span> to{" "}
            <span className="font-semibold text-[#B0232A]">Christmas events</span>, schools, malls,
            festivals, and corporate celebrations, Holiday Village is built around cheerful greetings,
            festive photos, and organized seasonal character experiences.
          </p>
          <span aria-hidden className="hvt-rule">
            <Snowflake className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* badges — the three seasons first, then the year-round formats */}
        <ul className="hvt-grid">
          {BADGES.map(({ season, icon: Icon, title, desc }, i) => {
            const s = SEASONS[season];
            const Flake = s.flake;
            return (
              <li key={title} className="hvt-card" style={{ "--i": i, "--ca": s.accent } as Vars}>
                <span aria-hidden className="hvt-medallion" style={{ borderColor: s.accent, color: s.accent }}>
                  <Icon className="h-6 w-6" />
                </span>
                <SeasonSprig kind={s.sprig} />
                <h3 className="hvt-card-title">{title}</h3>
                <p className="hvt-card-desc">{desc}</p>
                <span aria-hidden className="hvt-card-flake">
                  <Flake className="h-3 w-3" style={{ color: s.accent }} />
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      {/* soft snowdrift fade into the section below */}
      <div aria-hidden className="hvt-seam pointer-events-none absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,40 C 280,12 480,54 720,40 C 1000,22 1220,56 1440,36 L1440,70 L0,70 Z" fill="#FFFFFF" />
        </svg>
      </div>
    </section>
  );
}

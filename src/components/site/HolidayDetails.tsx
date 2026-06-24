import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from "react";
import {
  ArrowRight,
  Camera,
  ClipboardCheck,
  DoorOpen,
  Flower2,
  Gift,
  Hand,
  Heart,
  Leaf,
  Snowflake,
  Sparkles,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HolidayDetails — "More Than a Holiday Appearance". A decorated Holiday Village
 * notice board in the SAME palette as the Holiday hero / trust strip: candlelight
 * cream, berry-plum, antique gold and the seasonal accent trio — NO brown / wood
 * (that read as Mascot Meadows). A warm parchment planning panel (left) + five
 * framed "village notice" detail cards (right, gold/accent medallions on seasonal
 * sprigs) hung beneath a green-and-gold garland, dressed with multi-season florals,
 * a Spring / Spooky Season / Christmas signpost, and drifting snow + petals + leaves,
 * closed by an Arrival → Farewell flow strip. The five cards carry the seasonal
 * accent trio (evergreen · gold · cranberry · spring lilac · pumpkin) via --ca /
 * --cad so it reads for all three seasons. All decoration is CSS/SVG. Brand-safe
 * seasonal language only. VISIBLE BY DEFAULT (hidden only under
 * `.hld.anim:not(.is-in)`), reduced-motion safe. See "HOLIDAY VILLAGE DETAILS".
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string; style?: CSSProperties }>;
type SprigKind = "blossom" | "leaf" | "holly" | "laurel";

const DETAILS: {
  n: number;
  icon: IconType;
  title: string;
  copy: string;
  accent: string;
  accentDeep: string;
  sprig: SprigKind;
  flake: IconType;
}[] = [
  {
    n: 1,
    icon: DoorOpen,
    title: "Festive Entrance",
    copy: "We help create a clear arrival moment so the seasonal character feels exciting, warm, and memorable.",
    accent: "#2C7D4F",
    accentDeep: "#1E6E4A",
    sprig: "holly",
    flake: Snowflake,
  },
  {
    n: 2,
    icon: ClipboardCheck,
    title: "Handler Supported",
    copy: "A helper supports timing, positioning, transitions, visibility, and smoother character interaction.",
    accent: "#C19A3C",
    accentDeep: "#9A6E2B",
    sprig: "laurel",
    flake: Sparkles,
  },
  {
    n: 3,
    icon: Camera,
    title: "Photo-Friendly Flow",
    copy: "We build in time for family photos, group shots, holiday backdrops, and seasonal reaction moments.",
    accent: "#B0232A",
    accentDeep: "#8E1B22",
    sprig: "holly",
    flake: Star,
  },
  {
    n: 4,
    icon: Gift,
    title: "Seasonal Interaction",
    copy: "Visits can include simple themed activities, greetings, music moments, storybook energy, or festive fun depending on the character and event.",
    accent: "#9B7BB8",
    accentDeep: "#6E4F86",
    sprig: "blossom",
    flake: Flower2,
  },
  {
    n: 5,
    icon: Heart,
    title: "Warm Farewell",
    copy: "A planned goodbye helps the visit end smoothly with final waves, photos, and a cheerful seasonal send-off.",
    accent: "#E07B39",
    accentDeep: "#A8531B",
    sprig: "leaf",
    flake: Leaf,
  },
];

const FLOW: { icon: IconType; label: string; copy: string }[] = [
  { icon: DoorOpen, label: "Arrival", copy: "A warm entrance sets the tone for a magical visit." },
  { icon: Hand, label: "Greetings", copy: "Friendly hellos, introductions, and cheerful interaction." },
  { icon: Gift, label: "Seasonal Fun", copy: "Themed activities, stories, music, games, or festive moments." },
  { icon: Camera, label: "Photos", copy: "Time for family photos, group shots, and special memories." },
  { icon: Heart, label: "Farewell", copy: "A cheerful goodbye with final waves and warm holiday wishes." },
];

/* Subtle drifting seasons — snow + petals + leaves (few, motion-gated). */
const DRIFT = [
  { k: "snow", left: "12%", s: 7, delay: "0s", dur: "18s", dx: "12px", rot: "40deg", op: 0.7, c: "#fff" },
  { k: "petal", left: "30%", s: 8, delay: "3.6s", dur: "22s", dx: "-10px", rot: "200deg", op: 0.5, c: "#DE789B" },
  { k: "leaf", left: "52%", s: 9, delay: "1.8s", dur: "19s", dx: "13px", rot: "150deg", op: 0.5, c: "#E07B39" },
  { k: "snow", left: "70%", s: 6, delay: "5s", dur: "23s", dx: "-12px", rot: "40deg", op: 0.6, c: "#fff" },
  { k: "petal", left: "88%", s: 8, delay: "2.6s", dur: "20s", dx: "11px", rot: "240deg", op: 0.5, c: "#9B7BB8" },
] as const;

/* ---- decorative SVG primitives (all aria-hidden) ---- */

/* A small seasonal sprig tucked under each medallion (matches the trust strip). */
function SeasonSprig({ kind }: { kind: SprigKind }) {
  if (kind === "blossom") {
    return (
      <svg className="hld-sprig" viewBox="0 0 44 16" aria-hidden="true">
        <path d="M22,3 C 14,1 7,4 5,11 C 13,13 19,9 22,3 Z" fill="#7FB98E" />
        <path d="M22,3 C 30,1 37,4 39,11 C 31,13 25,9 22,3 Z" fill="#A6D3B0" />
        <circle cx="22" cy="8" r="3.4" fill="#C9A7DE" />
        <circle cx="22" cy="8" r="1.4" fill="#E8C879" />
      </svg>
    );
  }
  if (kind === "leaf") {
    return (
      <svg className="hld-sprig" viewBox="0 0 44 16" aria-hidden="true">
        <ellipse cx="16" cy="9" rx="8" ry="4.4" transform="rotate(-22 16 9)" fill="#E07B39" />
        <ellipse cx="28" cy="9" rx="8" ry="4.4" transform="rotate(22 28 9)" fill="#C9692C" />
        <circle cx="22" cy="9" r="2.4" fill="#C19A3C" />
      </svg>
    );
  }
  if (kind === "laurel") {
    return (
      <svg className="hld-sprig" viewBox="0 0 44 16" aria-hidden="true">
        <path d="M22,3 C 15,1 9,4 7,11 C 14,13 19,9 22,3 Z" fill="#D9B25A" />
        <path d="M22,3 C 29,1 35,4 37,11 C 30,13 25,9 22,3 Z" fill="#E0C271" />
        <circle cx="22" cy="8" r="2.2" fill="#C19A3C" />
      </svg>
    );
  }
  return (
    <svg className="hld-sprig" viewBox="0 0 44 16" aria-hidden="true">
      <path d="M22,3 C 14,0 6,4 4,11 C 12,13 18,9 22,3 Z" fill="#1E6E4A" />
      <path d="M22,3 C 30,0 38,4 40,11 C 32,13 26,9 22,3 Z" fill="#2E7D4F" />
      <circle cx="19.5" cy="9.5" r="2.4" fill="#B0232A" />
      <circle cx="24.5" cy="9.5" r="2.4" fill="#9B2226" />
    </svg>
  );
}

/* Green-and-gold garland swag with lights, seasonal accents and a gold bow. */
function Garland() {
  return (
    <svg className="hld-garland" viewBox="0 0 1440 130" preserveAspectRatio="xMidYMin slice" aria-hidden="true">
      <path d="M-20,2 C 380,120 1060,120 1460,2" fill="none" stroke="#3F6B43" strokeWidth="28" strokeLinecap="round" />
      <path d="M-20,2 C 380,120 1060,120 1460,2" fill="none" stroke="#5E8A55" strokeWidth="16" strokeLinecap="round" opacity="0.9" />
      <path d="M-20,2 C 380,120 1060,120 1460,2" fill="none" stroke="#7CA86E" strokeWidth="28" strokeLinecap="round" opacity="0.4" strokeDasharray="2 12" />
      <path d="M-20,-7 C 380,110 1060,110 1460,-7" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" opacity="0.85" />
      <g className="hld-lights" fill="#F4D98A">
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

function Poinsettia({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse key={`o${a}`} cx="24" cy="11" rx="4.6" ry="10" fill="#B0232A" transform={`rotate(${a} 24 24)`} opacity="0.95" />
      ))}
      {[30, 90, 150, 210, 270, 330].map((a) => (
        <ellipse key={`i${a}`} cx="24" cy="14" rx="3.3" ry="8" fill="#8E1B22" transform={`rotate(${a} 24 24)`} opacity="0.92" />
      ))}
      <circle cx="24" cy="24" r="3.6" fill="#E2C271" />
      <circle cx="24" cy="24" r="1.5" fill="#B5862B" />
    </svg>
  );
}

function Holly({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden>
      <path d="M20 6 C26 10 26 17 20 21 C14 17 14 10 20 6 Z" fill="#1F6E45" transform="rotate(-26 20 14)" />
      <path d="M20 6 C26 10 26 17 20 21 C14 17 14 10 20 6 Z" fill="#2C7D4F" transform="rotate(26 20 14)" />
      <circle cx="18" cy="24" r="3" fill="#C8262C" />
      <circle cx="23" cy="26" r="3" fill="#B0232A" />
      <circle cx="20" cy="29" r="3" fill="#D23A38" />
    </svg>
  );
}

function Blossom({ className, color, center = "#E2C271" }: { className?: string; color: string; center?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" aria-hidden>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="18" cy="8" rx="4.8" ry="7.6" fill={color} transform={`rotate(${a} 18 18)`} />
      ))}
      <circle cx="18" cy="18" r="3.8" fill={center} />
    </svg>
  );
}

function MiniPumpkin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 42 34" aria-hidden>
      <ellipse cx="21" cy="21" rx="14" ry="11" fill="#E07B39" />
      <ellipse cx="14" cy="21" rx="5.4" ry="11" fill="#D9722F" />
      <ellipse cx="28" cy="21" rx="5.4" ry="11" fill="#D9722F" />
      <ellipse cx="21" cy="21" rx="3.4" ry="11" fill="#C9651F" />
      <rect x="19" y="6" width="4" height="7" rx="1.5" fill="#3E6B3A" />
      <path d="M23 8 q4 -3 7 -1" stroke="#3E6B3A" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* Decorated Easter egg (spring). */
function EasterEgg({ className, color, dot = "#FFFDF5" }: { className?: string; color: string; dot?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 42" aria-hidden>
      <path d="M16 2 C24 2 29 16 29 26 C29 35 23 40 16 40 C9 40 3 35 3 26 C3 16 8 2 16 2 Z" fill={color} />
      <path d="M3.6 24 q12.4 6.5 24.8 0 l0 4.6 q-12.4 6.5 -24.8 0 Z" fill={dot} opacity="0.82" />
      <g fill={dot} opacity="0.9">
        <circle cx="10" cy="15" r="1.5" /><circle cx="16" cy="12" r="1.5" /><circle cx="22" cy="15" r="1.5" />
        <circle cx="12" cy="34" r="1.5" /><circle cx="20" cy="34" r="1.5" />
      </g>
      <ellipse cx="12" cy="13" rx="2.3" ry="3.8" fill="#fff" opacity="0.3" />
    </svg>
  );
}

/* Wrapped present with ribbon + bow (Christmas). */
function Present({ className, box, ribbon }: { className?: string; box: string; ribbon: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <rect x="7" y="19" width="34" height="25" rx="2" fill={box} />
      <rect x="4" y="14" width="40" height="8" rx="2" fill={box} />
      <rect x="20" y="14" width="8" height="30" fill={ribbon} />
      <rect x="4" y="16" width="40" height="4" fill={ribbon} />
      <path d="M24 14 C18 5 8 7 12 14 C15 18 21 16 24 14 Z" fill={ribbon} />
      <path d="M24 14 C30 5 40 7 36 14 C33 18 27 16 24 14 Z" fill={ribbon} />
      <circle cx="24" cy="13.5" r="3" fill="#FBF3E0" />
    </svg>
  );
}

/* Festive seasonal still-life — Easter eggs, presents, a pumpkin (replaces the signpost). */
function FestiveTrinkets({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <span className="hld-tk-eggs">
        <EasterEgg color="#9B7BB8" />
        <EasterEgg color="#DE789B" />
        <EasterEgg color="#7FB98E" />
      </span>
      <Present className="hld-tk-gift1" box="#B0232A" ribbon="#E0C271" />
      <MiniPumpkin className="hld-tk-pump" />
      <Present className="hld-tk-gift2" box="#2C7D4F" ribbon="#E0C271" />
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="hld-eyebrow">
      <span aria-hidden className="hld-eyebrow-fl" />
      {children}
      <span aria-hidden className="hld-eyebrow-fl hld-eyebrow-fl--r" />
    </span>
  );
}

export function HolidayDetails() {
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
      { threshold: 0.06, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="hld-title"
      className={cn("hld relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* candlelight glow + green-and-gold garland swag */}
      <span aria-hidden className="hld-glow" />
      <div aria-hidden className="hld-garland-wrap pointer-events-none absolute inset-x-0 top-0">
        <Garland />
      </div>

      {/* drifting snow + petals + leaves */}
      {motionOK ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {DRIFT.map((d, i) => (
            <span
              key={i}
              className={d.k === "petal" ? "hld-petal" : d.k === "leaf" ? "hld-leaf" : "hld-snow"}
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
        </div>
      ) : null}

      {/* bottom corner florals — multi-season */}
      <span aria-hidden className="hld-floral hld-floral-bl">
        <Blossom className="hld-fl hld-fl-a" color="#DE789B" />
        <Blossom className="hld-fl hld-fl-b" color="#9B7BB8" />
        <MiniPumpkin className="hld-fl hld-fl-c" />
        <Holly className="hld-fl hld-fl-d" />
        <EasterEgg className="hld-fl hld-fl-e" color="#7FB98E" />
      </span>
      <span aria-hidden className="hld-floral hld-floral-br">
        <Poinsettia className="hld-fl hld-fl-a" />
        <Holly className="hld-fl hld-fl-b" />
        <Blossom className="hld-fl hld-fl-c" color="#F0C24B" center="#B0232A" />
        <Present className="hld-fl hld-fl-d" box="#B0232A" ribbon="#E0C271" />
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-24 pt-28 sm:px-6 md:pt-32 lg:px-8">
        <div className="hld-grid">
          {/* LEFT — seasonal planning board */}
          <div className="hld-board">
            <span aria-hidden className="hld-board-pattern" />
            <svg aria-hidden className="hld-bow" viewBox="0 0 64 40" fill="none">
              <path d="M32 17 C22 5 7 7 9 19 C11 29 25 23 32 17Z" fill="#D9B25A" />
              <path d="M32 17 C42 5 57 7 55 19 C53 29 39 23 32 17Z" fill="#D9B25A" />
              <path d="M29 17 L19 39 L28 34 Z" fill="#C19A3C" />
              <path d="M35 17 L45 39 L36 34 Z" fill="#C19A3C" />
              <circle cx="32" cy="17" r="5.5" fill="#B58A2E" />
              <circle cx="32" cy="17" r="2.4" fill="#FBF3E0" />
            </svg>
            <Eyebrow>Why Holiday Village Feels Different</Eyebrow>
            <h2 id="hld-title" className="hld-title">
              <span className="hld-title-a">More than a</span>{" "}
              <span className="hld-title-b">holiday appearance.</span>
            </h2>
            <p className="hld-sub">
              A great seasonal visit is not just a character walking into the room. It is the festive
              entrance, the photo flow, the themed interaction, the helper support, and the way the
              moment feels magical without the host having to manage every detail.
            </p>
            <span aria-hidden className="hld-rule">
              <Snowflake className="h-3.5 w-3.5" />
            </span>
            <p className="hld-body">
              Whether you are planning an Easter visit, Halloween party, Christmas celebration, school
              event, mall appearance, corporate gathering, or community festival, Holiday Village
              experiences are designed to feel festive, organized, and easy to enjoy. We help guide the
              visit so the characters can focus on greetings, photos, seasonal fun, and memorable
              reactions.
            </p>
            <a href="#holiday-flow" className="hld-cta group">
              See How Holiday Visits Flow
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>

          {/* RIGHT — the magic is in the details */}
          <div className="hld-right">
            <div className="hld-right-head">
              <Eyebrow>The Magic Is in the Details</Eyebrow>
            </div>
            <ul className="hld-cards">
              {DETAILS.map(({ n, icon: Icon, title, copy, accent, sprig, flake: Flake }, i) => (
                <li
                  key={title}
                  className="hld-card"
                  style={{ "--i": i, "--ca": accent } as Vars}
                >
                  <span aria-hidden className="hld-card-n">{n}</span>
                  <span aria-hidden className="hld-medallion" style={{ borderColor: accent, color: accent }}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <SeasonSprig kind={sprig} />
                  <h3 className="hld-card-title" style={{ color: accent }}>{title}</h3>
                  <p className="hld-card-copy">{copy}</p>
                  <span aria-hidden className="hld-card-flake">
                    <Flake className="h-3 w-3" style={{ color: accent }} />
                  </span>
                </li>
              ))}
            </ul>
            <FestiveTrinkets className="hld-trinkets" />
          </div>
        </div>

        {/* BOTTOM — mini flow strip (previews the full visit flow) */}
        <div id="holiday-flow" className="hld-flow">
          <p className="hld-flow-title">
            <Star className="h-4 w-4" aria-hidden />
            A Smooth, Magical Visit From Start to Finish
          </p>
          <ol className="hld-flow-steps">
            {FLOW.map(({ icon: Icon, label, copy }, i) => (
              <li key={label} className="hld-flow-step" style={{ "--i": i } as Vars}>
                <span aria-hidden className="hld-flow-ic">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="hld-flow-label">{label}</span>
                <span className="hld-flow-copy">{copy}</span>
                {i < FLOW.length - 1 ? <ArrowRight aria-hidden className="hld-flow-arrow h-3.5 w-3.5" /> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { BookOpen, Compass, Gem, Shell, Waves } from "lucide-react";
import { cn } from "@/lib/utils";
import { OceanDecor } from "./OceanDecor";

/**
 * MermaidJourney — "What Happens During a Mermaid Visit": the experience-flow
 * section after Meet the Cove Mermaids. Five pearl-aqua "cove marker" cards,
 * each with an icon medallion, step number, title and a short blurb, strung
 * along a gentle gold-teal tide path with pearls. Step 04 (Swim Moments &
 * Mermaid Rides) is the Pool Highlight — a brighter aqua glow + ribbon, since
 * it's the differentiator. Calm aquatic motion: the water fades in, the heading
 * rises, the tide path draws, the cards surface one by one, medallions shimmer,
 * the highlight pulses once, bubbles drift. VISIBLE BY DEFAULT (hidden only
 * under `.mjr.anim:not(.is-in)`), reduced-motion safe. See "MERMAID COVE
 * JOURNEY" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

const STEPS: { num: string; icon: IconType; title: string; desc: string; highlight?: boolean }[] = [
  {
    num: "01",
    icon: Compass,
    title: "Pirate Welcome",
    desc: "The pirate helper gathers the crew, introduces the ocean adventure, and helps set the poolside flow before the mermaid arrives.",
  },
  {
    num: "02",
    icon: Shell,
    title: "Mermaid Arrival",
    desc: "The mermaid makes her entrance, greets the children, and brings the magic of Mermaid Cove to life.",
  },
  {
    num: "03",
    icon: BookOpen,
    title: "Songs, Stories & Crowning",
    desc: "Storytime, singing, ocean wishes, birthday crowning, and magical photo moments create the heart of the visit.",
  },
  {
    num: "04",
    icon: Waves,
    title: "Swim Moments & Mermaid Rides",
    desc: "Where pool rules and setup allow, the mermaid joins the children in the water for guided swim moments, games, and mermaid rides.",
    highlight: true,
  },
  {
    num: "05",
    icon: Gem,
    title: "Treasure Games & Farewell",
    desc: "The pirate leads treasure games and final activities before photos, goodbyes, and one last splash of Mermaid Cove magic.",
  },
];

const BUBBLES = [
  { left: "11%", s: 9, delay: "0s", dur: "17s", dx: "12px" },
  { left: "29%", s: 6, delay: "3.4s", dur: "20s", dx: "-9px" },
  { left: "48%", s: 11, delay: "1.6s", dur: "18s", dx: "13px" },
  { left: "67%", s: 7, delay: "5s", dur: "21s", dx: "-11px" },
  { left: "85%", s: 9, delay: "2.5s", dur: "18.5s", dx: "11px" },
] as const;

export function MermaidJourney() {
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
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="mjr-title"
      className={cn("mjr relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* foam wave tucking under the section above */}
      <div aria-hidden className="mjr-wavetop pointer-events-none absolute inset-x-0 top-0">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,38 C250,84 520,4 760,30 C1010,58 1230,92 1440,50 L1440,0 L0,0 Z"
            fill="#A4DEEE"
          />
        </svg>
      </div>

      <div aria-hidden className="mjr-bg absolute inset-0" />
      <div aria-hidden className="mjr-caustic pointer-events-none absolute inset-0" />
      <div aria-hidden className="mjr-surface pointer-events-none absolute inset-x-0 top-0" />
      <Coral className="mjr-decor mjr-decor-l" />
      <Coral className="mjr-decor mjr-decor-r" />
      <Shell aria-hidden className="mjr-decor mjr-decor-shell" />
      <OceanDecor variant="b" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="mjr-bubble"
            style={
              {
                left: b.left,
                width: b.s,
                height: b.s,
                animationDelay: b.delay,
                animationDuration: b.dur,
                "--dx": b.dx,
              } as Vars
            }
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mjr-head mx-auto max-w-2xl text-center">
          <span aria-hidden className="mjr-crown">
            <Shell className="h-5 w-5" />
          </span>
          <span className="mjr-eyebrow">
            <span aria-hidden className="mjr-eyebrow-rule" />
            The Cove Experience
            <span aria-hidden className="mjr-eyebrow-rule" />
          </span>
          <h2 id="mjr-title" className="mjr-title">
            From Poolside Welcome to Mermaid Magic
          </h2>
          <p className="mjr-sub">
            Every visit is built around a simple ocean adventure flow — with a swimming mermaid,
            pirate support, songs, stories, games, and magical pool moments.
          </p>
        </div>

        {/* the cove journey */}
        <div className="mjr-flow mt-12 md:mt-16">
          {/* gentle tide path weaving behind the cards (desktop) */}
          <svg aria-hidden className="mjr-path" viewBox="0 0 1000 70" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mjr-tide" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#7FD8CE" />
                <stop offset="0.5" stopColor="#36BEB0" />
                <stop offset="1" stopColor="#7FD8CE" />
              </linearGradient>
            </defs>
            <path
              className="mjr-path-line"
              d="M30,35 C130,4 170,66 270,35 C370,4 410,66 510,35 C610,4 650,66 750,35 C850,8 900,58 970,35"
              fill="none"
              stroke="url(#mjr-tide)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
          {[20, 40, 60, 80].map((p) => (
            <span key={p} aria-hidden className="mjr-pearl" style={{ left: `${p}%` } as Vars} />
          ))}

          <div className="mjr-cards">
            {STEPS.map((s, i) => (
              <article
                key={s.num}
                className={cn("mjr-card", s.highlight && "mjr-card--hi")}
                style={{ "--i": i } as Vars}
              >
                {s.highlight ? <span aria-hidden className="mjr-hi-glow" /> : null}
                {s.highlight ? <span className="mjr-hi-ribbon">Pool Highlight</span> : null}

                <span aria-hidden className="mjr-medallion">
                  {s.highlight ? <span className="mjr-medallion-ripple" /> : null}
                  <s.icon className="h-7 w-7" />
                </span>

                <span aria-hidden className="mjr-num">
                  {s.num}
                </span>
                <h3 className="mjr-card-title">{s.title}</h3>
                <p className="mjr-card-desc">{s.desc}</p>
                <Shell aria-hidden className="mjr-card-shell" />
              </article>
            ))}
          </div>
        </div>

        {/* closing flourish */}
        <div className="mjr-foot" aria-hidden>
          <Shell className="mjr-foot-shell h-4 w-4" />
          <p className="mjr-foot-script">Magical memories. Treasured always.</p>
        </div>

        {/* pool-safety wording — kept general; never implies a lifeguard role */}
        <p className="mjr-note">
          Pirate helpers support the entertainment flow. Pool supervision and lifeguard requirements
          remain the responsibility of the venue or event host according to pool rules.
        </p>
      </div>
    </section>
  );
}

/* A small coral-frond reef accent (decorative, currentColor). */
function Coral({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 32c-.5-5-.7-8.5-.5-11 .3.7.9 1.4 1.8 1.7 1.6.5 2.8-.6 3.2-2 .3-1.2 0-2.6-1-3.7 1.3.3 2.6-.2 3.2-1.4.7-1.4.2-3-1-3.9 1-.2 1.9-1 2.1-2.1.3-1.6-.8-3.2-2.6-3.3-.2-1.6-1.5-2.9-3.2-2.9-.9 0-1.7.4-2.3 1-.6-.6-1.4-1-2.3-1-1.7 0-3 1.3-3.2 2.9C4.6 4.4 3.5 6 3.8 7.6 4 8.7 4.9 9.5 5.9 9.7c-1.2.9-1.7 2.5-1 3.9.6 1.2 1.9 1.7 3.2 1.4-1 1.1-1.3 2.5-1 3.7.4 1.4 1.6 2.5 3.2 2 .9-.3 1.5-1 1.8-1.7.2 2.5 0 6-.5 11h.4z" />
    </svg>
  );
}

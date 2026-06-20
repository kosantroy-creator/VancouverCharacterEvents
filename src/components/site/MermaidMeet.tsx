import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import {
  ArrowRight,
  BookOpen,
  Camera,
  Compass,
  Crown,
  Droplets,
  Fish,
  Gem,
  Music,
  Scroll,
  Shell,
  ShipWheel,
  Sparkles,
  Volleyball,
  Waves,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import marinaImg from "@/assets/mermaid/marina-mermaid.webp";
import coralinaImg from "@/assets/mermaid/coralina-mermaid.webp";
import nerissaImg from "@/assets/mermaid/nerissa-mermaid.webp";

/**
 * MermaidMeet — "Meet the Cove Mermaids" character guide of /mermaid-events.
 * Three ornate pearl-gold character cards (Marina = pearl-aqua · Coralina =
 * coral-sunshine · Nerissa = moonlit-violet) float inside a bright underwater
 * cove (light rays, caustics, drifting bubbles, reef-edge shells). Each card is
 * topped with a shell ornament, a glowing portrait, a curved wave divider, then
 * a short personality blurb, activity medallions, a soft "Pirate Support
 * Included" ribbon, and a gentle "Meet …" discovery link (no hard CTA). The
 * mermaids lead; the pirate help is shown only as iconography, never as named
 * characters. Calm aquatic motion; VISIBLE BY DEFAULT (hidden only under
 * `.mcm.anim:not(.is-in)`), reduced-motion safe. See "MEET THE COVE MERMAIDS"
 * in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;
type Tag = { label: string; icon: IconType };

type Mermaid = {
  slug: string;
  theme: "pearl" | "coral" | "moon";
  img: string;
  alt: string;
  name: string;
  action: string;
  style: string;
  desc: string;
  bestFor: string;
  tags: Tag[];
};

const MERMAIDS: Mermaid[] = [
  {
    slug: "marina",
    theme: "pearl",
    img: marinaImg,
    alt: "Marina Pearlwave, a smiling mermaid performer with a flowing green-and-gold scaled tail, gliding gently through clear turquoise water.",
    name: "Marina Pearlwave",
    action: "Meet Marina",
    style: "Gentle · Graceful · Storybook",
    desc: "Marina creates soft, storybook moments for younger swimmers, shy guests, and calm magical birthdays.",
    bestFor: "Younger swimmers, quieter parties, and first mermaid visits.",
    tags: [
      { label: "Storytime", icon: BookOpen },
      { label: "Crowning", icon: Crown },
      { label: "Gentle Swim", icon: Waves },
      { label: "Mermaid Wishes", icon: Sparkles },
      { label: "Photos", icon: Camera },
    ],
  },
  {
    slug: "coralina",
    theme: "coral",
    img: coralinaImg,
    alt: "Coralina SunSplash, a cheerful mermaid performer with a bright rainbow tail, waving and smiling underwater.",
    name: "Coralina SunSplash",
    action: "Meet Coralina",
    style: "Playful · Bubbly · Energetic",
    desc: "Coralina brings bright summer energy with games, laughs, singing, and splashy poolside fun.",
    bestFor: "Active pool parties, summer birthdays, camps, and kids who love games.",
    tags: [
      { label: "Pool Games", icon: Volleyball },
      { label: "Singing", icon: Music },
      { label: "Treasure Hunt", icon: Gem },
      { label: "Mermaid Rides", icon: Fish },
      { label: "Splash Fun", icon: Droplets },
    ],
  },
  {
    slug: "nerissa",
    theme: "moon",
    img: nerissaImg,
    alt: "Nerissa Moonreef, an elegant mermaid performer with a pink-and-violet tail, reaching gracefully toward sunlit water.",
    name: "Nerissa Moonreef",
    action: "Meet Nerissa",
    style: "Elegant · Musical · Enchanting",
    desc: "Nerissa brings a more theatrical cove magic with songs, sea stories, shell wishes, and graceful ceremony moments.",
    bestFor: "Story-based parties, musical moments, and magical poolside ceremonies.",
    tags: [
      { label: "Singing", icon: Music },
      { label: "Ocean Stories", icon: Scroll },
      { label: "Shell Wishes", icon: Shell },
      { label: "Magical Crowning", icon: Crown },
      { label: "Enchanting Moments", icon: Sparkles },
    ],
  },
];

const SUPPORT: { icon: IconType; title: string }[] = [
  { icon: Waves, title: "Smooth Transitions" },
  { icon: Compass, title: "Guided Games" },
  { icon: Shell, title: "Land-Side Support" },
  { icon: Starfish, title: "Easy Party Flow" },
];

const BUBBLES = [
  { left: "8%", s: 9, delay: "0s", dur: "17s", dx: "12px" },
  { left: "22%", s: 6, delay: "3.6s", dur: "20s", dx: "-10px" },
  { left: "39%", s: 12, delay: "1.5s", dur: "18s", dx: "14px" },
  { left: "57%", s: 7, delay: "5.2s", dur: "21s", dx: "-12px" },
  { left: "73%", s: 10, delay: "2.4s", dur: "18.5s", dx: "12px" },
  { left: "90%", s: 8, delay: "4.1s", dur: "19.5s", dx: "-13px" },
] as const;

export function MermaidMeet() {
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
      aria-labelledby="mcm-title"
      className={cn("mcm relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* soft foam wave tucking the section under the one above */}
      <div aria-hidden className="mcm-wavetop pointer-events-none absolute inset-x-0 top-0">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,40 C240,86 520,2 760,30 C1020,60 1230,96 1440,52 L1440,0 L0,0 Z"
            fill="#ABD7EE"
          />
        </svg>
      </div>

      {/* immersive cove backdrop: depth gradient · light rays · caustics · surface glow */}
      <div aria-hidden className="mcm-bg absolute inset-0" />
      <div aria-hidden className="mcm-rays pointer-events-none absolute inset-0" />
      <div aria-hidden className="mcm-caustic pointer-events-none absolute inset-0" />
      <div aria-hidden className="mcm-surface pointer-events-none absolute inset-x-0 top-0" />
      {/* reef accents anchoring the corners */}
      <Starfish className="mcm-decor mcm-decor-bl" />
      <Shell aria-hidden className="mcm-decor mcm-decor-br" />
      <Shell aria-hidden className="mcm-decor mcm-decor-tr" />
      <span aria-hidden className="mcm-coral mcm-coral-l" />
      <span aria-hidden className="mcm-coral mcm-coral-r" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="mcm-bubble"
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

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mcm-head mx-auto max-w-2xl text-center">
          <span className="mcm-eyebrow">Three Magical Mermaids · Three Unique Kinds of Magic</span>
          <h2 id="mcm-title" className="mcm-title">
            Meet the Cove Mermaids
          </h2>
          <span aria-hidden className="mcm-rule" />
          <p className="mcm-sub">
            Choose the mermaid who brings your celebration to life. Each one is a skilled swimmer
            and storyteller, paired with a pirate helper to guide the adventure from land to water.
          </p>
        </div>

        {/* the three mermaid cards */}
        <div className="mcm-grid mt-12 md:mt-14">
          {MERMAIDS.map((m, i) => (
            <article
              key={m.slug}
              className={cn("mcm-card", `mcm-card--${m.theme}`)}
              style={{ "--i": i } as Vars}
            >
              {/* shell ornament crowning the frame */}
              <span aria-hidden className="mcm-crown">
                <Shell className="h-5 w-5" />
              </span>

              <div className="mcm-card-inner">
                <div className="mcm-portrait">
                  <img
                    className="mcm-img"
                    src={m.img}
                    alt={m.alt}
                    loading="lazy"
                    decoding="async"
                  />
                  <span aria-hidden className="mcm-portrait-glow" />
                  <span aria-hidden className="mcm-portrait-shine" />
                </div>

                <div className="mcm-body">
                  {/* curved wave divider between portrait and copy + a small shell */}
                  <span aria-hidden className="mcm-wave">
                    <svg viewBox="0 0 320 28" preserveAspectRatio="none" aria-hidden="true">
                      <path
                        d="M0,28 V12 C70,0 120,0 160,9 C200,18 250,18 320,9 V28 Z"
                        fill="var(--wave)"
                      />
                      <path
                        d="M0,12 C70,0 120,0 160,9 C200,18 250,18 320,9"
                        fill="none"
                        stroke="rgba(217,178,90,0.8)"
                        strokeWidth="1.6"
                      />
                    </svg>
                  </span>
                  <span aria-hidden className="mcm-wave-shell">
                    <Shell className="h-3.5 w-3.5" />
                  </span>

                  <h3 className="mcm-name">{m.name}</h3>
                  <span className="mcm-style">{m.style}</span>
                  <p className="mcm-desc">{m.desc}</p>

                  <span className="mcm-best-label">Best for</span>
                  <p className="mcm-best-text">{m.bestFor}</p>

                  <ul className="mcm-tags">
                    {m.tags.map(({ label, icon: Icon }, j) => (
                      <li key={label} className="mcm-tag" style={{ "--j": j } as Vars}>
                        <span aria-hidden className="mcm-tag-ic">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="mcm-tag-label">{label}</span>
                      </li>
                    ))}
                  </ul>

                  <span className="mcm-pirate-ribbon">
                    <Compass className="h-4 w-4" aria-hidden />
                    Pirate Support Included
                  </span>

                  <Link to="/contact" className="mcm-meet group">
                    <span aria-hidden className="mcm-meet-gloss" />
                    <span aria-hidden className="mcm-meet-shine" />
                    <Shell className="mcm-meet-shell h-4 w-4" aria-hidden />
                    <span className="mcm-meet-label">{m.action}</span>
                    <ArrowRight className="mcm-meet-arrow h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* pirate support panel */}
        <div className="mcm-support mt-10 md:mt-12">
          <div className="mcm-support-head">
            <span aria-hidden className="mcm-support-crest">
              <ShipWheel className="h-6 w-6" />
            </span>
            <div>
              <h3 className="mcm-support-title">Every Mermaid Arrives with Pirate Support</h3>
              <p className="mcm-support-copy">
                Our pirate helpers support the mermaid on land, guide treasure games, help with
                transitions, and keep the adventure moving between pool moments.
              </p>
            </div>
          </div>
          <ul className="mcm-support-grid">
            {SUPPORT.map(({ icon: Icon, title }, i) => (
              <li key={title} className="mcm-support-item" style={{ "--i": i } as Vars}>
                <span aria-hidden className="mcm-support-ic">
                  <Icon className="h-5 w-5" />
                </span>
                {title}
              </li>
            ))}
          </ul>
        </div>

        {/* pool-safety wording — kept general; never implies a lifeguard role */}
        <p className="mcm-note">
          Pirate helpers support the entertainment flow and help the mermaid on land. Pool
          supervision and lifeguard requirements remain the responsibility of the venue or event
          host according to pool rules.
        </p>
      </div>
    </section>
  );
}

/* A 5-point starfish reef accent (decorative). */
function Starfish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.5c.43 0 .81.27.95.67l1.78 5.02 5.32.09c.95.02 1.34 1.22.58 1.79l-4.26 3.18 1.57 5.09c.28.9-.74 1.65-1.51 1.1L12 17.4l-4 2.83c-.77.55-1.79-.2-1.51-1.1l1.57-5.09-4.26-3.18c-.76-.57-.37-1.77.58-1.79l5.32-.09 1.78-5.02c.14-.4.52-.67.95-.67z" />
    </svg>
  );
}

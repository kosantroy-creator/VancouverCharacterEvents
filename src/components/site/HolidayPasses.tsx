import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Mail, Snowflake, Sparkles, Star, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { Blossom, ChristmasTree, EasterEgg, Holly, MiniPumpkin, Ornament, Present, Wreath } from "./holiday-decor";

/**
 * HolidayPasses — "Choose Your Holiday Visit": the Holiday Village packages section,
 * styled as festive "Holiday Village Invitations" (the holiday sibling of MascotPasses).
 * Three invitation cards — a simple Holiday Character Visit, the featured Holiday Party
 * Experience (Most Popular), and a School, Mall & Festival Appearance — each with an icon
 * medallion, best-for line, an Includes checklist, a note, a Custom Quote label and a CTA,
 * closed by a "Not sure which holiday visit fits?" planning note. Cream / berry / antique-
 * gold theme with seasonal accents (NO brown), dressed with seasonal side decorations
 * (Christmas trees, wreaths, gifts, florals). No invented prices (Custom Quote throughout).
 * Brand-safe seasonal language only. VISIBLE BY DEFAULT (hidden only under
 * `.hlp.anim:not(.is-in)`), reduced-motion safe. See "HOLIDAY VILLAGE PASSES" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Pass = {
  id: string;
  name: string;
  icon: IconType;
  acc: string;
  accDeep: string;
  positioning: string;
  bestFor: string;
  includes: string[];
  note: string;
  cta: string;
  featured?: boolean;
};

const PASSES: Pass[] = [
  {
    id: "visit",
    name: "Holiday Character Visit",
    icon: Mail,
    acc: "#2C7D4F",
    accDeep: "#1E6E4A",
    positioning: "Simple seasonal appearance for smaller events and photo moments.",
    bestFor:
      "Best for Easter visits, Halloween appearances, Christmas greetings, small private parties, quick photo moments, and surprise seasonal visits.",
    includes: [
      "Seasonal character appearance",
      "Warm greetings",
      "Meet-and-greet interaction",
      "Photo moments",
      "Light themed interaction",
      "Cheerful farewell",
    ],
    note: "Great when you want a simple seasonal character moment without a full party structure.",
    cta: "Request Character Visit",
  },
  {
    id: "party",
    name: "Holiday Party Experience",
    icon: Sparkles,
    acc: "#C19A3C",
    accDeep: "#9A6E2B",
    featured: true,
    positioning: "Main recommended option for birthdays, family parties, school celebrations, and private seasonal events.",
    bestFor:
      "Best for events that need a fuller seasonal flow with greetings, themed interaction, photos, and a more memorable holiday moment.",
    includes: [
      "Featured seasonal character appearance",
      "Festive entrance",
      "Warm greetings",
      "Simple themed activity or interaction",
      "Holiday spotlight moment",
      "Photo moment",
      "Handler-supported visit flow",
      "Cheerful farewell",
    ],
    note: "Recommended for families and hosts who want the visit to feel more organized, interactive, and magical.",
    cta: "Request Party Experience",
  },
  {
    id: "event",
    name: "School, Mall & Festival Appearance",
    icon: Store,
    acc: "#3E7CA8",
    accDeep: "#2C5E82",
    positioning: "For schools, daycares, malls, festivals, corporate parties, markets, and community events.",
    bestFor:
      "Best for schools, daycares, malls, festivals, corporate holiday parties, tree lightings, markets, community events, and larger public settings.",
    includes: [
      "Seasonal character appearance for public-event flow",
      "Walk-by greetings",
      "Photo-friendly interaction",
      "Crowd-friendly positioning",
      "Handler support",
      "Flexible appearance windows",
      "Optional repeated photo moments",
      "Event-specific planning",
    ],
    note: "Built for higher-traffic environments where visibility, timing, guest flow, and photo moments matter.",
    cta: "Request Event Appearance",
  },
];

/* Subtle drifting seasons — snow + petals + leaves (few, motion-gated). */
const DRIFT = [
  { k: "snow", left: "14%", s: 7, delay: "0s", dur: "18s", dx: "12px", rot: "40deg", op: 0.7, c: "#fff" },
  { k: "petal", left: "36%", s: 8, delay: "3.6s", dur: "22s", dx: "-10px", rot: "200deg", op: 0.5, c: "#DE789B" },
  { k: "leaf", left: "62%", s: 9, delay: "1.8s", dur: "19s", dx: "13px", rot: "150deg", op: 0.5, c: "#E07B39" },
  { k: "snow", left: "84%", s: 6, delay: "5s", dur: "23s", dx: "-12px", rot: "40deg", op: 0.6, c: "#fff" },
] as const;

export function HolidayPasses() {
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
      { threshold: 0.04, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="hlp-title"
      className={cn("hlp relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* candlelight backdrop + seasonal decorations */}
      <div aria-hidden className="hlp-decor pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="hlp-glow" />

        {/* left + right seasonal side clusters (fill the dead margins) */}
        <span className="hlp-side hlp-side-l">
          <Wreath className="hlp-side-wreath" />
          <ChristmasTree className="hlp-side-tree" />
          <Present className="hlp-side-gift" box="#B0232A" ribbon="#E0C271" />
          <Blossom className="hlp-side-blossom" color="#DE789B" />
        </span>
        <span className="hlp-side hlp-side-r">
          <Wreath className="hlp-side-wreath" />
          <ChristmasTree className="hlp-side-tree" />
          <Present className="hlp-side-gift" box="#2C7D4F" ribbon="#E0C271" />
          <MiniPumpkin className="hlp-side-pumpkin" />
        </span>

        {/* spring (bottom-left) */}
        <span className="hlp-floral hlp-floral-bl">
          <Blossom className="hlp-fl hlp-fl-a" color="#DE789B" />
          <Blossom className="hlp-fl hlp-fl-b" color="#9B7BB8" />
          <EasterEgg className="hlp-fl hlp-fl-c" color="#7FB98E" />
        </span>
        {/* halloween hint (top-right) */}
        <span className="hlp-floral hlp-floral-tr">
          <MiniPumpkin className="hlp-fl hlp-fl-a" />
          <Blossom className="hlp-fl hlp-fl-b" color="#F0C24B" center="#B0232A" />
        </span>
        {/* christmas (bottom-right) */}
        <span className="hlp-floral hlp-floral-br">
          <Holly className="hlp-fl hlp-fl-a" />
          <Ornament className="hlp-fl hlp-fl-b" color="#B0232A" />
          <Ornament className="hlp-fl hlp-fl-c" color="#2C7D4F" />
        </span>
        {motionOK
          ? DRIFT.map((d, i) => (
              <span
                key={i}
                className={d.k === "petal" ? "hlp-petal" : d.k === "leaf" ? "hlp-leaf" : "hlp-snow"}
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
            ))
          : null}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-24 sm:px-6 md:py-28 lg:px-8">
        {/* header */}
        <div className="hlp-head mx-auto max-w-3xl text-center">
          <span className="hlp-eyebrow">
            <span aria-hidden className="hlp-eyebrow-fl" />
            Holiday Village Invitations
            <span aria-hidden className="hlp-eyebrow-fl hlp-eyebrow-fl--r" />
          </span>
          <h2 id="hlp-title" className="hlp-title">
            <Snowflake className="hlp-title-ic" aria-hidden />
            <span className="hlp-title-a">Choose Your</span>{" "}
            <span className="hlp-title-b">Holiday Visit</span>
            <Snowflake className="hlp-title-ic" aria-hidden />
          </h2>
          <p className="hlp-sub">
            Whether you are planning an Easter visit, Halloween appearance, Christmas party, school
            event, mall meet-and-greet, festival, or corporate celebration, we&apos;ll help match the
            right seasonal visit format to your event.
          </p>
          <p className="hlp-helper-line">
            <Sparkles className="h-3 w-3" aria-hidden />
            Every visit can be adjusted for the season, character style, location, group size, age
            range, and event setting.
          </p>
        </div>

        {/* invitation cards */}
        <div className="hlp-grid">
          {PASSES.map((p, i) => {
            const Icon = p.icon;
            return (
              <article
                key={p.id}
                className={cn("hlp-pass", p.featured && "hlp-pass--featured")}
                style={{ "--acc": p.acc, "--acc-deep": p.accDeep, "--i": i } as Vars}
              >
                {p.featured ? <span className="hlp-badge">Most Popular</span> : null}

                <span aria-hidden className="hlp-medal">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="hlp-name">{p.name}</h3>
                <p className="hlp-positioning">{p.positioning}</p>
                <p className="hlp-bestfor">{p.bestFor}</p>

                <span className="hlp-inc-banner">Includes</span>
                <ul className="hlp-inc">
                  {p.includes.map((item, j) => (
                    <li key={item} className="hlp-inc-item" style={{ "--j": j } as Vars}>
                      <span aria-hidden className="hlp-check">
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="hlp-note">{p.note}</p>

                <div className="hlp-foot">
                  <span className="hlp-price">
                    <span className="hlp-price-a">Custom</span>
                    <span className="hlp-price-b">Quote</span>
                  </span>
                  <Link to="/contact" className="hlp-cta group">
                    {p.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* helper note */}
        <div className="hlp-help">
          <span aria-hidden className="hlp-help-clip">
            <Star className="h-4 w-4" aria-hidden />
            Let&apos;s plan your magical moment
          </span>
          <div className="hlp-help-text">
            <h3 className="hlp-help-title">
              <Sparkles className="h-4 w-4" aria-hidden />
              Not sure which holiday visit fits?
            </h3>
            <p className="hlp-help-copy">
              Tell us your season, event type, guest count, age range, location, and the kind of
              seasonal moment you want — we&apos;ll recommend the best format.
            </p>
          </div>
          <Link to="/contact" className="hlp-help-cta group">
            <Sparkles className="h-4 w-4" aria-hidden />
            Help Me Choose
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

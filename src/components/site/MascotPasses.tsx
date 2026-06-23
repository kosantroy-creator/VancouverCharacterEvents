import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Flower2, Hand, PartyPopper, PawPrint, Tent } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MascotPasses — "Choose Your Mascot Visit": the Mascot Meadows packages section,
 * styled as cheerful "Mascot Meadow Passes" (event tickets) rather than a generic
 * pricing table. Three passes — a simple Mascot Visit, the featured Mascot Party
 * Experience (Most Popular), and a Festival & Public Event Mascot — each with an
 * icon medallion, best-for line, an Includes checklist, a note, a Custom Quote
 * label and a CTA, on a sunny meadow ground; closed by a wooden "Not sure which
 * visit fits?" planning note. No invented prices (the mascot chapter has no
 * per-tier pricing — Custom Quote throughout). Brand-safe archetype language
 * only. VISIBLE BY DEFAULT (hidden only under `.mps.anim:not(.is-in)`),
 * reduced-motion safe. See "MASCOT MEADOWS PASSES" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Pass = {
  id: string;
  name: string;
  icon: IconType;
  acc: string;
  accDeep: string;
  accInk: string;
  bestFor: string;
  includes: string[];
  note: string;
  cta: string;
  featured?: boolean;
};

const PASSES: Pass[] = [
  {
    id: "visit",
    name: "Mascot Visit",
    icon: Hand,
    acc: "#4CA45D",
    accDeep: "#2C6E3A",
    accInk: "#ffffff",
    bestFor:
      "Best for birthdays, small private parties, daycares, photo moments, and surprise appearances.",
    includes: [
      "Friendly mascot appearance",
      "Meet-and-greet",
      "Hugs, high-fives, and waves",
      "Photo moments",
      "Light themed interaction",
      "Cheerful farewell",
    ],
    note: "Great when you want a simple mascot moment without a full party structure.",
    cta: "Request Mascot Visit",
  },
  {
    id: "party",
    name: "Mascot Party Experience",
    icon: PartyPopper,
    acc: "#E7B43C",
    accDeep: "#C8902A",
    accInk: "#3A2606",
    featured: true,
    bestFor:
      "Best for birthdays and events that need games, dancing, photos, and a more complete mascot flow.",
    includes: [
      "Featured mascot appearance",
      "Guided entrance",
      "Hugs and hellos",
      "Simple games or dancing",
      "Birthday spotlight moment",
      "Photo garden time",
      "Handler-supported visit flow",
      "Cheerful farewell",
    ],
    note: "Recommended for families who want the visit to feel more organized, interactive, and memorable.",
    cta: "Request Party Experience",
  },
  {
    id: "festival",
    name: "Festival & Public Event Mascot",
    icon: Tent,
    acc: "#5BB7E6",
    accDeep: "#2C7FB8",
    accInk: "#ffffff",
    bestFor:
      "Best for malls, schools, festivals, community events, grand openings, family fun days, and larger public settings.",
    includes: [
      "Mascot appearance for public-event flow",
      "Walk-by greetings",
      "Photo-friendly interaction",
      "Crowd-friendly positioning",
      "Handler support",
      "Flexible appearance windows",
      "Optional repeated photo moments",
      "Event-specific planning",
    ],
    note: "Built for higher-traffic environments where visibility, flow, and guest interaction matter.",
    cta: "Request Public Event Mascot",
  },
];

const PETALS = [
  { left: "14%", s: 9, delay: "0s", dur: "19s", dx: "13px", rot: "180deg", c: "#FFD25A" },
  { left: "40%", s: 7, delay: "4.2s", dur: "22s", dx: "-10px", rot: "240deg", c: "#F2B4CC" },
  { left: "66%", s: 8, delay: "1.8s", dur: "20s", dx: "12px", rot: "120deg", c: "#7CC86A" },
  { left: "86%", s: 7, delay: "5.4s", dur: "23s", dx: "-11px", rot: "300deg", c: "#5BB7E6" },
] as const;

export function MascotPasses() {
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
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="mps-title"
      className={cn("mps relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="mps-decor pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="mps-sun" />
        <span className="mps-bunting" />
        <span className="mps-corner mps-corner-l" />
        <span className="mps-corner mps-corner-r" />
        <span className="mps-signpost">
          <span className="mps-signpost-plank">Fun</span>
          <span className="mps-signpost-plank">Smiles</span>
          <span className="mps-signpost-plank">Memories</span>
        </span>
        {motionOK ? (
          <>
            {PETALS.map((p, i) => (
              <span
                key={i}
                className="mps-petal"
                style={
                  {
                    left: p.left,
                    width: p.s,
                    height: p.s,
                    animationDelay: p.delay,
                    animationDuration: p.dur,
                    "--dx": p.dx,
                    "--rot": p.rot,
                    "--c": p.c,
                  } as Vars
                }
              />
            ))}
          </>
        ) : null}
      </div>
      <div aria-hidden className="mps-grass pointer-events-none absolute inset-x-0 bottom-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mps-head mx-auto max-w-3xl text-center">
          <span className="mps-banner">
            <PawPrint className="h-3.5 w-3.5" aria-hidden />
            Mascot Meadow Passes
            <PawPrint className="h-3.5 w-3.5 -scale-x-100" aria-hidden />
          </span>
          <h2 id="mps-title" className="mps-title">
            <Flower2 className="mps-title-flower" aria-hidden />
            Choose Your Mascot Visit
            <Flower2 className="mps-title-flower -scale-x-100" aria-hidden />
          </h2>
          <p className="mps-sub">
            Whether you need a simple birthday appearance, a fuller party experience, or a
            public-event mascot visit, we&apos;ll help match the right mascot format to your event.
          </p>
          <p className="mps-helper-line">
            <PawPrint className="h-3 w-3" aria-hidden />
            Every visit can be adjusted for age range, location, group size, mascot style, and event
            setting.
          </p>
        </div>

        {/* passes */}
        <div className="mps-grid">
          {PASSES.map((p, i) => {
            const Icon = p.icon;
            return (
              <article
                key={p.id}
                className={cn("mps-pass", p.featured && "mps-pass--featured")}
                style={
                  {
                    "--acc": p.acc,
                    "--acc-deep": p.accDeep,
                    "--acc-ink": p.accInk,
                    "--i": i,
                  } as Vars
                }
              >
                {p.featured ? <span className="mps-badge">Most Popular</span> : null}
                <span aria-hidden className="mps-corner-leaf mps-corner-leaf--tl" />
                <span aria-hidden className="mps-corner-leaf mps-corner-leaf--tr" />

                <span aria-hidden className="mps-medal">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mps-name">{p.name}</h3>
                <p className="mps-bestfor">{p.bestFor}</p>

                <span className="mps-inc-banner">Includes:</span>
                <ul className="mps-inc">
                  {p.includes.map((item, j) => (
                    <li key={item} className="mps-inc-item" style={{ "--j": j } as Vars}>
                      <span aria-hidden className="mps-check">
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mps-note">{p.note}</p>

                <div className="mps-foot">
                  <span className="mps-price">
                    <span className="mps-price-a">Custom</span>
                    <span className="mps-price-b">Quote</span>
                  </span>
                  <Link to="/contact" className="mps-cta group">
                    {p.cta}
                    <PawPrint
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
        <div className="mps-help">
          <span aria-hidden className="mps-help-clip">
            Meadow
            <br />
            Planning
            <br />
            Note
          </span>
          <div className="mps-help-text">
            <h3 className="mps-help-title">
              <Flower2 className="h-4 w-4" aria-hidden />
              Not sure which visit fits?
            </h3>
            <p className="mps-help-copy">
              Tell us your event type, guest count, age range, location, and the kind of mascot
              moment you want — we&apos;ll recommend the best format.
            </p>
          </div>
          <Link to="/contact" className="mps-help-cta group">
            <PawPrint className="h-4 w-4" aria-hidden />
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

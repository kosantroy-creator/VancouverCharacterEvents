import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Camera,
  ClipboardList,
  Sparkles,
  Store,
  Users,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * BazaarFlow — "How Bazaar Add-Ons Fit Your Event": the experience-flow section
 * after More Than Event Extras. Six step cards strung along a glowing lantern
 * market path (gold beaded line, hanging lanterns, numbered medallions) that draws
 * in as the section enters view — choose extras, match the flow, set the space,
 * guests explore, moments are made, smooth wrap-up — closed by a CTA band. Cream
 * parchment base + jewel-tone accents (teal · magenta · turquoise · gold · coral ·
 * plum), amber lantern glow, gold dust. Per-card accent via --ca / --cad. Partner
 * language for inflatables. VISIBLE BY DEFAULT (hidden only under
 * `.bzf.anim:not(.is-in)`), reduced-motion safe. See "ENCHANTED BAZAAR FLOW".
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

const STEPS: { n: number; icon: IconType; title: string; copy: string; acc: string; accDeep: string }[] = [
  {
    n: 1,
    icon: ClipboardList,
    title: "Choose Your Extras",
    copy: "Start with the add-ons that match your event — face painting, balloon twisting, photography, inflatable partners, or a custom mix.",
    acc: "#0F7E8C",
    accDeep: "#0A5A66",
  },
  {
    n: 2,
    icon: CalendarClock,
    title: "Match the Event Flow",
    copy: "We consider how the extras fit around arrivals, character visits, photos, games, speeches, and guest movement.",
    acc: "#B83D7A",
    accDeep: "#8E2D5E",
  },
  {
    n: 3,
    icon: Store,
    title: "Set the Space",
    copy: "Add-ons work best when each station has the right space, visibility, lighting, and guest flow.",
    acc: "#1E8A9E",
    accDeep: "#156B7A",
  },
  {
    n: 4,
    icon: Users,
    title: "Guests Explore",
    copy: "Guests can visit the Bazaar stations throughout the event, creating more activity between the main moments.",
    acc: "#C28A2E",
    accDeep: "#9A6E2B",
  },
  {
    n: 5,
    icon: Camera,
    title: "Moments Are Made",
    copy: "Painted faces, balloon creations, photos, and active play areas help create memories guests can take with them.",
    acc: "#C8556E",
    accDeep: "#A23A54",
  },
  {
    n: 6,
    icon: BadgeCheck,
    title: "Smooth Wrap-Up",
    copy: "We help plan timing, transitions, and partner details so the event ends cleanly and feels complete.",
    acc: "#8E2D6E",
    accDeep: "#6E2356",
  },
];

const DUST = [
  { left: "14%", s: 4, delay: "0s", dur: "18s", dx: "9px", c: "#E2C271" },
  { left: "34%", s: 3, delay: "3.4s", dur: "21s", dx: "-7px", c: "#F0C674" },
  { left: "54%", s: 4, delay: "1.6s", dur: "19s", dx: "10px", c: "#F4A93B" },
  { left: "72%", s: 3, delay: "5s", dur: "22s", dx: "-9px", c: "#E2C271" },
  { left: "88%", s: 4, delay: "2.4s", dur: "20s", dx: "8px", c: "#F0C674" },
] as const;

function Lantern({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 60" aria-hidden>
      <line x1="16" y1="0" x2="16" y2="7" stroke="#9A6E2B" strokeWidth="1.4" />
      <path d="M16 5 a4 4 0 0 1 4 4 h-8 a4 4 0 0 1 4 -4z" fill="#9A6E2B" />
      <rect x="7" y="9" width="18" height="32" rx="5" fill="#B8862E" />
      <rect x="10.5" y="12" width="11" height="26" rx="3" fill="#FFD98E" />
      <path d="M16 19 c-2.3 3 -2.3 7.2 0 10.2 c2.3 -3 2.3 -7.1 0 -10.2z" fill="#F7A93B" />
      <rect x="8" y="39" width="16" height="5" rx="2.5" fill="#9A6E2B" />
      <line x1="16" y1="44" x2="16" y2="53" stroke="#C19A3C" strokeWidth="1.2" />
      <circle cx="16" cy="54.5" r="2.2" fill="#C19A3C" />
    </svg>
  );
}

export function BazaarFlow() {
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
      id="bazaar-flow"
      aria-labelledby="bzf-title"
      className={cn("bzf relative isolate overflow-hidden scroll-mt-20", motionOK && "anim", inView && "is-in")}
    >
      {/* amber glow + distant stall silhouettes + drifting gold dust */}
      <div aria-hidden className="bzf-decor pointer-events-none absolute inset-0 overflow-hidden">
        <span className="bzf-glow" />
        <span className="bzf-stalls bzf-stalls-l" />
        <span className="bzf-stalls bzf-stalls-r" />
        {motionOK ? (
          <>
            {DUST.map((d, i) => (
              <span
                key={`d${i}`}
                className="bzf-dust"
                style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx, "--c": d.c } as Vars}
              />
            ))}
          </>
        ) : null}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="bzf-head mx-auto max-w-3xl text-center">
          <span className="bzf-sign">
            <Sparkles className="h-3 w-3" aria-hidden />
            We Plan. You Celebrate. Magic Happens.
          </span>
          <span className="bzf-eyebrow">
            <span aria-hidden className="bzf-eyebrow-fl" />
            The Bazaar Flow
            <span aria-hidden className="bzf-eyebrow-fl bzf-eyebrow-fl--r" />
          </span>
          <h2 id="bzf-title" className="bzf-title">
            How Bazaar <span className="bzf-title-a">add-ons</span> fit your event.
          </h2>
          <p className="bzf-sub">
            From one simple add-on to a fuller event plan, the Enchanted Bazaar helps match the right
            extras to your guest count, space, schedule, and celebration style.
          </p>
          <p className="bzf-note">
            Every add-on plan can be adjusted for event type, location, timing, guest age range, and
            partner availability.
          </p>
        </div>

        {/* the lantern market path */}
        <div className="bzf-track">
          <div aria-hidden className="bzf-line">
            <svg className="bzf-line-svg" viewBox="0 0 1200 170" preserveAspectRatio="none">
              <path
                className="bzf-line-path"
                d="M20,92 C70,62 82,57 100,57 C200,57 200,112 300,112 C400,112 400,57 500,57 C600,57 600,112 700,112 C800,112 800,57 900,57 C1000,57 1000,112 1100,112 C1160,112 1176,90 1186,80"
                fill="none"
                stroke="#C19A3C"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="2 13"
              />
            </svg>
            <Lantern className="bzf-line-lantern bzf-line-lantern-1" />
            <Lantern className="bzf-line-lantern bzf-line-lantern-2" />
            <Lantern className="bzf-line-lantern bzf-line-lantern-3" />
          </div>

          <ol className="bzf-steps">
            {STEPS.map(({ n, icon: Icon, title, copy, acc, accDeep }, i) => (
              <li
                key={title}
                className="bzf-step"
                style={{ "--ca": acc, "--cad": accDeep, "--i": i } as Vars}
              >
                <span aria-hidden className="bzf-medal">
                  <span className="bzf-medal-n">{n}</span>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="bzf-card">
                  <h3 className="bzf-card-title">{title}</h3>
                  <p className="bzf-card-copy">{copy}</p>
                  <span aria-hidden className="bzf-card-accent">
                    <Sparkles className="h-3 w-3" />
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA band */}
        <div className="bzf-cta">
          <div className="bzf-cta-text">
            <p className="bzf-cta-lead">
              <Sparkles className="h-4 w-4" aria-hidden />
              Not sure what extras fit your event?
            </p>
            <p className="bzf-cta-copy">
              Tell us your guest count, location, schedule, and the kind of energy you want — we&apos;ll
              recommend the best Bazaar options.
            </p>
          </div>
          <div className="bzf-cta-actions">
            <Link to="/contact" className="bzf-cta-primary group">
              <Wand2 className="h-4 w-4" aria-hidden />
              Choose Your Bazaar Add-Ons
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link to="/pricing" className="bzf-cta-ghost">
              Request Add-On Pricing
            </Link>
          </div>
        </div>
        <p className="bzf-fine">
          Inflatable partner add-ons may be available through trusted vendors depending on date,
          location, and event needs.
        </p>
      </div>
    </section>
  );
}

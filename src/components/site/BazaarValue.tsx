import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import {
  ArrowRight,
  ChevronRight,
  Gift,
  Heart,
  LayoutGrid,
  Palette,
  PartyPopper,
  ShoppingBag,
  Shuffle,
  Sparkles,
  Star,
  Tent,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * BazaarValue — "More Than Event Extras": the positioning section after Meet the
 * Bazaar Partners. A warm parchment "bazaar planning card" on the left (why Bazaar
 * add-ons are more than decoration — characters make the headline moment, add-ons
 * fill the rest with colour, activity, photos and engagement) and five lantern-lit
 * "planning token" cards on the right ("The Magic Is in the Mix"), closed by a
 * Choose Extras → Memories Made mini-flow ribbon that previews the next section.
 * Cream parchment base + jewel-tone accents (teal · magenta · turquoise · gold ·
 * plum), amber lantern glow, gold dust + jewel sparkles. Brand-safe, partner
 * language for inflatables. VISIBLE BY DEFAULT (hidden only under
 * `.bzv.anim:not(.is-in)`), reduced-motion safe. See "ENCHANTED BAZAAR VALUE".
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

const CARDS: { icon: IconType; title: string; copy: string; acc: string; accDeep: string }[] = [
  {
    icon: Users,
    title: "Keeps Guests Engaged",
    copy: "Add-ons give guests something fun to do while they wait, mingle, or move between event moments.",
    acc: "#0F7E8C",
    accDeep: "#0A5A66",
  },
  {
    icon: Palette,
    title: "Adds Colour & Energy",
    copy: "Face painting, balloons, and visual extras make the event feel more alive, colourful, and photo-ready.",
    acc: "#B83D7A",
    accDeep: "#8E2D5E",
  },
  {
    icon: Gift,
    title: "Creates Take-Home Moments",
    copy: "Balloon creations, painted designs, and photos give guests a memory they can carry with them.",
    acc: "#1E8A9E",
    accDeep: "#156B7A",
  },
  {
    icon: Tent,
    title: "Supports Bigger Events",
    copy: "For schools, festivals, malls, and community events, add-ons help spread activity across the space.",
    acc: "#C28A2E",
    accDeep: "#9A6E2B",
  },
  {
    icon: Star,
    title: "Completes the Experience",
    copy: "Bazaar extras help round out the event so it feels fuller, smoother, and more memorable.",
    acc: "#8E2D6E",
    accDeep: "#6E2356",
  },
];

const FLOW: { icon: IconType; label: string }[] = [
  { icon: ShoppingBag, label: "Choose Extras" },
  { icon: Shuffle, label: "Match the Flow" },
  { icon: LayoutGrid, label: "Set the Space" },
  { icon: PartyPopper, label: "Guests Enjoy" },
  { icon: Heart, label: "Memories Made" },
];

const DUST = [
  { left: "10%", s: 4, delay: "0s", dur: "17s", dx: "9px", c: "#E2C271" },
  { left: "26%", s: 3, delay: "3.6s", dur: "20s", dx: "-7px", c: "#F0C674" },
  { left: "48%", s: 4, delay: "1.4s", dur: "18s", dx: "10px", c: "#F4A93B" },
  { left: "66%", s: 3, delay: "5.2s", dur: "21s", dx: "-9px", c: "#E2C271" },
  { left: "84%", s: 4, delay: "2.6s", dur: "19s", dx: "8px", c: "#F0C674" },
] as const;
const SPARKS = [
  { left: "20%", top: "26%", s: 9, delay: "0.5s", c: "#4FC4D6" },
  { left: "52%", top: "20%", s: 8, delay: "1.9s", c: "#E08AB0" },
  { left: "74%", top: "30%", s: 9, delay: "2.8s", c: "#F0C674" },
  { left: "88%", top: "60%", s: 8, delay: "1.2s", c: "#7CC8C2" },
] as const;

export function BazaarValue() {
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
      aria-labelledby="bzv-title"
      className={cn("bzv relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      {/* amber glow + drifting gold dust / jewel sparkles */}
      <div aria-hidden className="bzv-decor pointer-events-none absolute inset-0 overflow-hidden">
        <span className="bzv-glow" />
        <span className="bzv-silhouette bzv-silhouette-l" />
        <span className="bzv-silhouette bzv-silhouette-r" />
        {motionOK ? (
          <>
            {DUST.map((d, i) => (
              <span
                key={`d${i}`}
                className="bzv-dust"
                style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx, "--c": d.c } as Vars}
              />
            ))}
            {SPARKS.map((s, i) => (
              <span
                key={`s${i}`}
                className="bzv-spark"
                style={{ left: s.left, top: s.top, width: s.s, height: s.s, animationDelay: s.delay, "--c": s.c } as Vars}
              />
            ))}
          </>
        ) : null}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="bzv-grid">
          {/* LEFT — bazaar planning card */}
          <div className="bzv-board">
            <span aria-hidden className="bzv-board-pattern" />
            <span className="bzv-sign">
              <Sparkles className="h-3 w-3" aria-hidden />
              More Magic Beyond the Headline Moment
            </span>
            <span className="bzv-eyebrow">
              <span aria-hidden className="bzv-eyebrow-fl" />
              Why Bazaar Add-Ons Matter
              <span aria-hidden className="bzv-eyebrow-fl bzv-eyebrow-fl--r" />
            </span>
            <h2 id="bzv-title" className="bzv-title">
              <span className="bzv-title-a">More than</span>{" "}
              <span className="bzv-title-b">event extras.</span>
            </h2>
            <p className="bzv-sub">
              A great event is not only about one big moment. It is the colour around the room, the
              activities guests enjoy between moments, the photos people take home, and the way the
              whole celebration feels full, lively, and easy to enjoy.
            </p>
            <span aria-hidden className="bzv-rule">
              <span className="bzv-rule-line" />
              <Sparkles className="h-3.5 w-3.5" />
              <span className="bzv-rule-line" />
            </span>
            <p className="bzv-body">
              Whether you are planning a birthday party, school event, festival, corporate
              celebration, mall appearance, or community gathering, the Enchanted Bazaar helps add the
              extra layers that keep guests engaged. From face painting and balloon twisting to
              photography and inflatable partner add-ons, we help match the right extras to your event
              style, space, timing, and guest flow.
            </p>
            <a href="#bazaar-flow" className="bzv-cta group">
              <Sparkles className="h-4 w-4" aria-hidden />
              See How Bazaar Add-Ons Fit
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>
          </div>

          {/* RIGHT — "The Magic Is in the Mix" planning tokens */}
          <div className="bzv-right">
            <span className="bzv-sign bzv-sign-right">
              <Sparkles className="h-3 w-3" aria-hidden />
              The Magic Is in the Mix
            </span>
            <ul className="bzv-cards">
              {CARDS.map(({ icon: Icon, title, copy, acc, accDeep }, i) => (
                <li
                  key={title}
                  className="bzv-card"
                  style={{ "--ca": acc, "--cad": accDeep, "--i": i } as Vars}
                >
                  <span aria-hidden className="bzv-card-medal">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="bzv-card-text">
                    <h3 className="bzv-card-title">{title}</h3>
                    <p className="bzv-card-copy">{copy}</p>
                  </div>
                  <span aria-hidden className="bzv-card-spark">
                    <Sparkles className="h-3 w-3" />
                  </span>
                </li>
              ))}
            </ul>
            {/* lantern token — fills the column + nudges to the builder */}
            <div className="bzv-right-cap">
              <span aria-hidden className="bzv-cap-lantern">
                <Sparkles className="h-5 w-5" />
              </span>
              <p className="bzv-cap-text">
                Not sure which extras to mix? Tell us your event and the vibe you want — we&apos;ll
                blend the right add-ons for you.
              </p>
              <a href="#bazaar-builder" className="bzv-cap-link group">
                Build your mix
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM — lantern-lit mini-flow ribbon (previews the full add-on flow) */}
        <div className="bzv-flow">
          <p className="bzv-flow-title">
            <Sparkles className="h-4 w-4" aria-hidden />
            From First Idea to Last Memory
          </p>
          <ol className="bzv-flow-steps">
            {FLOW.map(({ icon: Icon, label }, i) => (
              <li key={label} className="bzv-flow-step" style={{ "--i": i } as Vars}>
                <span aria-hidden className="bzv-flow-ic">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="bzv-flow-label">{label}</span>
                {i < FLOW.length - 1 ? (
                  <ChevronRight aria-hidden className="bzv-flow-arrow h-4 w-4" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <p className="bzv-tagline">
          <span className="bzv-tagline-main">Trusted partners. Magical moments. Events that shine.</span>
          <span className="bzv-tagline-fine">
            Inflatable partner add-ons may be available through trusted vendors depending on date,
            location, and event needs.
          </span>
        </p>
      </div>
    </section>
  );
}

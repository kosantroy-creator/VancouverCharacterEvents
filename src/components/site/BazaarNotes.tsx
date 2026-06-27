import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Palette, PartyPopper, Quote, Sparkles, Store, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * BazaarNotes — "What Bazaar Guests Remember": the social-proof / testimonial
 * section after the Real Bazaar Moments gallery. Glowing Bazaar Thank-You Notes —
 * four parchment guest-memory cards (face painting · balloon twisting · photography ·
 * festival/public event) pinned over a soft night-market board, each with a service
 * stamp, quote, source line and highlight tag. A text reassurance row + CTA close it.
 * Cream parchment base, jewel-tone per-card accent (--ca / --cad), amber glow, gold
 * dust. Placeholder copy, swappable for real reviews. Partner language for
 * inflatables. VISIBLE BY DEFAULT (hidden only under `.bzn.anim:not(.is-in)`),
 * reduced-motion safe. See "ENCHANTED BAZAAR NOTES" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

const NOTES: { id: string; label: string; icon: IconType; acc: string; accDeep: string; quote: string; who: string; tag: string }[] = [
  {
    id: "face",
    label: "Face Painting Moment",
    icon: Palette,
    acc: "#1E8A9E",
    accDeep: "#156B7A",
    quote: "The face painting added so much colour to the party. The kids were excited to show off their designs, and the photos looked adorable.",
    who: "Birthday Party Parent",
    tag: "Colourful Guest Moment",
  },
  {
    id: "balloon",
    label: "Balloon Twisting Fun",
    icon: PartyPopper,
    acc: "#C8556E",
    accDeep: "#A23A54",
    quote: "The balloons kept the kids engaged and gave everyone something fun to take home. It made the party feel more active from start to finish.",
    who: "Family Celebration Host",
    tag: "Take-Home Fun",
  },
  {
    id: "photo",
    label: "Photo Memories",
    icon: Camera,
    acc: "#3E6EA8",
    accDeep: "#2C5282",
    quote: "Having photo support made such a difference. We were able to enjoy the event while still getting the greetings, reactions, and group moments captured.",
    who: "Event Host",
    tag: "Moments Captured",
  },
  {
    id: "festival",
    label: "Festival & Public Event",
    icon: Store,
    acc: "#8E2D6E",
    accDeep: "#6E2356",
    quote: "The add-ons helped spread activity throughout the event. Guests had things to do, places to gather, and more reasons to stay engaged.",
    who: "Community Event Organizer",
    tag: "Better Event Flow",
  },
];

const REASSURE = ["Photo-friendly add-ons", "Guest activity support", "School & festival friendly", "Trusted partner availability"];

const DUST = [
  { left: "14%", s: 4, delay: "0s", dur: "18s", dx: "9px", c: "#E2C271" },
  { left: "40%", s: 3, delay: "3.4s", dur: "21s", dx: "-7px", c: "#F0C674" },
  { left: "63%", s: 4, delay: "1.6s", dur: "19s", dx: "10px", c: "#F4A93B" },
  { left: "87%", s: 3, delay: "4.8s", dur: "22s", dx: "-9px", c: "#E2C271" },
] as const;

export function BazaarNotes() {
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
      aria-labelledby="bzn-title"
      className={cn("bzn relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="bzn-decor pointer-events-none absolute inset-0 overflow-hidden">
        <span className="bzn-glow" />
        <span className="bzn-string" />
        {motionOK
          ? DUST.map((d, i) => (
              <span
                key={i}
                className="bzn-dust"
                style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx, "--c": d.c } as Vars}
              />
            ))
          : null}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1140px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* editorial split — header column (left) beside the notes (right) */}
        <div className="bzn-split">
        {/* header */}
        <div className="bzn-head">
          <span className="bzn-eyebrow">
            <span aria-hidden className="bzn-eyebrow-fl" />
            Bazaar Thank-You Notes
            <span aria-hidden className="bzn-eyebrow-fl bzn-eyebrow-fl--r" />
          </span>
          <h2 id="bzn-title" className="bzn-title">What Bazaar guests remember most.</h2>
          <p className="bzn-sub">
            Bazaar add-ons are built for the moments guests keep talking about — the painted faces,
            balloon creations, photo memories, extra activity, and the feeling that the whole event
            had something magical happening.
          </p>
          <span className="bzn-stamp">
            <Sparkles className="h-3 w-3" aria-hidden />
            Colour · Activity · Photos · Happy Guests
          </span>
        </div>

        {/* thank-you notes */}
        <ul className="bzn-grid">
          {NOTES.map(({ id, label, icon: Icon, acc, accDeep, quote, who, tag }) => (
            <li key={id} className="bzn-card" style={{ "--ca": acc, "--cad": accDeep } as Vars}>
              <span aria-hidden className="bzn-pin" />
              <div className="bzn-card-top">
                <span className="bzn-label">
                  <span aria-hidden className="bzn-stampic"><Icon className="h-3.5 w-3.5" /></span>
                  {label}
                </span>
                <Quote aria-hidden className="bzn-quoteic h-6 w-6" />
              </div>
              <blockquote className="bzn-quote">{quote}</blockquote>
              <div className="bzn-card-foot">
                <cite className="bzn-who">{who}</cite>
                <span className="bzn-tag">{tag}</span>
              </div>
            </li>
          ))}
        </ul>
        </div>

        {/* reassurance row */}
        <ul className="bzn-reassure">
          {REASSURE.map((r) => (
            <li key={r} className="bzn-reassure-item">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {r}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="bzn-cta">
          <p className="bzn-cta-copy">
            Tell us your event type, guest count, location, and the kind of energy you want — we&apos;ll
            recommend the right add-ons and check partner availability where needed.
          </p>
          <div className="bzn-cta-actions">
            <a href="#bazaar-builder" className="bzn-cta-primary group">
              <Wand2 className="h-4 w-4" aria-hidden />
              Build Your Bazaar Mix
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <Link to="/pricing" className="bzn-cta-ghost">Request Add-On Pricing</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  ClipboardCheck,
  Egg,
  Flower2,
  Ghost,
  Gift,
  Moon,
  School,
  Snowflake,
  Sparkles,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChristmasTree, Present, Wreath } from "./holiday-decor";

/**
 * HolidayNotes — "What Holiday Guests Remember": the Holiday Village testimonial /
 * emotional-proof section, styled as cheerful "Happy Holiday Notes" — seasonal
 * thank-you cards pinned to the village calendar (the holiday sibling of
 * MascotNotes). Four note cards across the three real seasons — Spring/Easter,
 * Halloween, Christmas — plus a School/Mall/Festival event note, each with a
 * colored label banner, washi-tape, a quote, a role attribution, a wax-seal stamp
 * and a highlight tag; a small reassurance strip; and a two-CTA close with a
 * thank-you note clip. Attributions are by role, not invented names (honest +
 * brand-safe); seasonal language only. Cream / berry / antique-gold theme (NO
 * brown). VISIBLE BY DEFAULT (hidden only under `.hln.anim:not(.is-in)`),
 * reduced-motion safe. See "HOLIDAY VILLAGE NOTES" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Note = {
  id: string;
  label: string;
  acc: string;
  accDeep: string;
  quote: string;
  role: string;
  roleIcon: IconType;
  tag: string;
  tagIcon: IconType;
  stamp: IconType;
};

const NOTES: Note[] = [
  {
    id: "easter",
    label: "Spring / Easter Visit",
    acc: "#9B7BB8",
    accDeep: "#6E4F86",
    quote:
      "The spring visit felt so cheerful and sweet. The children loved the character interaction, and the photo moments were easy and adorable.",
    role: "Easter Event Host",
    roleIcon: Flower2,
    tag: "Spring Photo Moment",
    tagIcon: Camera,
    stamp: Egg,
  },
  {
    id: "halloween",
    label: "Halloween Party",
    acc: "#E07B39",
    accDeep: "#A8531B",
    quote:
      "The Halloween appearance was quirky, fun, and perfect for our group. It felt themed without being too scary for the kids.",
    role: "Halloween Party Parent",
    roleIcon: Ghost,
    tag: "Spooky But Friendly",
    tagIcon: Moon,
    stamp: Ghost,
  },
  {
    id: "christmas",
    label: "Christmas Celebration",
    acc: "#B0232A",
    accDeep: "#7E1B22",
    quote:
      "The Christmas characters made the whole event feel magical. The greetings, photos, and warm holiday energy were exactly what we wanted.",
    role: "Christmas Party Host",
    roleIcon: Gift,
    tag: "Christmas Magic",
    tagIcon: Sparkles,
    stamp: Snowflake,
  },
  {
    id: "event",
    label: "School, Mall & Festival Event",
    acc: "#C19A3C",
    accDeep: "#9A6E2B",
    quote:
      "The visit was organized, photo-friendly, and easy for guests to enjoy. The support helped the character moments flow smoothly.",
    role: "Event Coordinator",
    roleIcon: CalendarDays,
    tag: "Smooth Guest Flow",
    tagIcon: Camera,
    stamp: CalendarDays,
  },
];

const FEATURES: { icon: IconType; acc: string; label: string }[] = [
  { icon: Camera, acc: "#C19A3C", label: "Photo-friendly visits" },
  { icon: Sparkles, acc: "#2C7D4F", label: "Seasonal character flow" },
  { icon: School, acc: "#3E7CA8", label: "School & festival friendly" },
  { icon: ClipboardCheck, acc: "#B0232A", label: "Handler-supported appearances" },
];

/* Subtle drifting seasons — snow + petals + leaves (few, motion-gated). */
const DRIFT = [
  { k: "snow", left: "12%", s: 7, delay: "0s", dur: "18s", dx: "12px", rot: "40deg", op: 0.7, c: "#fff" },
  { k: "petal", left: "34%", s: 8, delay: "3.6s", dur: "22s", dx: "-10px", rot: "200deg", op: 0.5, c: "#DE789B" },
  { k: "leaf", left: "60%", s: 9, delay: "1.8s", dur: "19s", dx: "13px", rot: "150deg", op: 0.5, c: "#E07B39" },
  { k: "snow", left: "86%", s: 6, delay: "5s", dur: "23s", dx: "-12px", rot: "40deg", op: 0.6, c: "#fff" },
] as const;

/* ---- decorative SVG primitives (all aria-hidden) ---- */
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
function Holly({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden>
      <path d="M20 6 C26 10 26 17 20 21 C14 17 14 10 20 6 Z" fill="#1F6E45" transform="rotate(-26 20 14)" />
      <path d="M20 6 C26 10 26 17 20 21 C14 17 14 10 20 6 Z" fill="#2C7D4F" transform="rotate(26 20 14)" />
      <circle cx="18" cy="24" r="3" fill="#C8262C" /><circle cx="23" cy="26" r="3" fill="#B0232A" /><circle cx="20" cy="29" r="3" fill="#D23A38" />
    </svg>
  );
}
function EasterEgg({ className, color, dot = "#FFFDF5" }: { className?: string; color: string; dot?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 42" aria-hidden>
      <path d="M16 2 C24 2 29 16 29 26 C29 35 23 40 16 40 C9 40 3 35 3 26 C3 16 8 2 16 2 Z" fill={color} />
      <path d="M3.6 24 q12.4 6.5 24.8 0 l0 4.6 q-12.4 6.5 -24.8 0 Z" fill={dot} opacity="0.82" />
      <g fill={dot} opacity="0.9"><circle cx="10" cy="15" r="1.5" /><circle cx="16" cy="12" r="1.5" /><circle cx="22" cy="15" r="1.5" /></g>
    </svg>
  );
}
function MiniPumpkin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 42 34" aria-hidden>
      <ellipse cx="21" cy="21" rx="14" ry="11" fill="#E07B39" />
      <ellipse cx="14" cy="21" rx="5.4" ry="11" fill="#D9722F" /><ellipse cx="28" cy="21" rx="5.4" ry="11" fill="#D9722F" />
      <ellipse cx="21" cy="21" rx="3.4" ry="11" fill="#C9651F" />
      <rect x="19" y="6" width="4" height="7" rx="1.5" fill="#3E6B3A" />
    </svg>
  );
}
function Ornament({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} viewBox="0 0 24 30" aria-hidden>
      <rect x="9.5" y="4" width="5" height="4" rx="1" fill="#C9A24B" />
      <circle cx="12" cy="19" r="9" fill={color} />
      <path d="M4 16 q8 4 16 0" stroke="#E2C271" strokeWidth="1.4" fill="none" opacity="0.7" />
      <ellipse cx="9" cy="15" rx="2.2" ry="3" fill="#fff" opacity="0.35" />
    </svg>
  );
}

export function HolidayNotes() {
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
      aria-labelledby="hln-title"
      className={cn("hln relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="hln-decor pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="hln-glow" />

        {/* left + right seasonal side clusters (fill the dead margins) */}
        <span className="hln-side hln-side-l">
          <Wreath className="hln-side-wreath" />
          <ChristmasTree className="hln-side-tree" />
          <Present className="hln-side-gift" box="#B0232A" ribbon="#E0C271" />
        </span>
        <span className="hln-side hln-side-r">
          <Wreath className="hln-side-wreath" />
          <ChristmasTree className="hln-side-tree" />
          <Present className="hln-side-gift" box="#2C7D4F" ribbon="#E0C271" />
        </span>

        <span className="hln-floral hln-floral-bl">
          <Blossom className="hln-fl hln-fl-a" color="#DE789B" />
          <Blossom className="hln-fl hln-fl-b" color="#9B7BB8" />
          <EasterEgg className="hln-fl hln-fl-c" color="#7FB98E" />
        </span>
        <span className="hln-floral hln-floral-tr">
          <MiniPumpkin className="hln-fl hln-fl-a" />
          <Blossom className="hln-fl hln-fl-b" color="#F0C24B" center="#B0232A" />
        </span>
        <span className="hln-floral hln-floral-br">
          <Holly className="hln-fl hln-fl-a" />
          <Ornament className="hln-fl hln-fl-b" color="#B0232A" />
          <Ornament className="hln-fl hln-fl-c" color="#2C7D4F" />
        </span>
        {motionOK
          ? DRIFT.map((d, i) => (
              <span
                key={i}
                className={d.k === "petal" ? "hln-petal" : d.k === "leaf" ? "hln-leaf" : "hln-snow"}
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
        <div className="hln-head mx-auto max-w-3xl text-center">
          <span className="hln-eyebrow">
            <span aria-hidden className="hln-eyebrow-fl" />
            Happy Holiday Notes
            <span aria-hidden className="hln-eyebrow-fl hln-eyebrow-fl--r" />
          </span>
          <h2 id="hln-title" className="hln-title">
            <span className="hln-title-a">What</span>{" "}
            <span className="hln-title-b">holiday guests</span>{" "}
            <span className="hln-title-a">remember most.</span>
          </h2>
          <p className="hln-sub">
            Seasonal visits are built for the moments guests keep talking about — the first greeting,
            the photos, the themed fun, the festive reactions, and the magic that makes each
            celebration feel special.
          </p>
          <span className="hln-stamp-banner">
            <Star className="h-3 w-3" aria-hidden />
            Easter
            <span aria-hidden className="hln-stamp-dot" />
            Halloween
            <span aria-hidden className="hln-stamp-dot" />
            Christmas
            <span aria-hidden className="hln-stamp-dot" />
            Happy Memories
            <Star className="h-3 w-3" aria-hidden />
          </span>
        </div>

        {/* notes */}
        <ul className="hln-grid">
          {NOTES.map((n, i) => {
            const RoleIcon = n.roleIcon;
            const TagIcon = n.tagIcon;
            const Stamp = n.stamp;
            return (
              <li
                key={n.id}
                className="hln-note"
                style={{ "--acc": n.acc, "--acc-deep": n.accDeep, "--i": i } as Vars}
              >
                <span aria-hidden className="hln-tape hln-tape--l" />
                <span aria-hidden className="hln-tape hln-tape--r" />
                <span className="hln-cat">{n.label}</span>
                <blockquote className="hln-quote">
                  <span aria-hidden className="hln-quote-mark">&ldquo;</span>
                  {n.quote}
                </blockquote>
                <span aria-hidden className="hln-divider" />
                <p className="hln-role">
                  <span aria-hidden className="hln-role-ic">
                    <RoleIcon className="h-4 w-4" />
                  </span>
                  {n.role}
                </p>
                <div className="hln-bottom">
                  <span className="hln-tag">
                    <TagIcon className="h-3.5 w-3.5" aria-hidden />
                    {n.tag}
                  </span>
                  <span aria-hidden className="hln-seal">
                    <Stamp className="h-4 w-4" />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* reassurance strip */}
        <ul className="hln-features">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <li key={f.label} className="hln-feature" style={{ "--acc": f.acc, "--i": i } as Vars}>
                <span aria-hidden className="hln-feature-ic">
                  <Icon className="h-5 w-5" />
                </span>
                {f.label}
              </li>
            );
          })}
        </ul>

        {/* CTA + helper */}
        <div className="hln-foot">
          <span aria-hidden className="hln-foot-clip">
            <Gift className="h-4 w-4" aria-hidden />
            Thank you for making our moments magical
          </span>
          <div className="hln-foot-main">
            <p className="hln-helper">
              Tell us your season, event type, guest count, and setting — we&apos;ll help recommend the
              right Holiday Village format.
            </p>
            <div className="hln-cta-row">
              <Link to="/contact" className="hln-cta hln-cta-primary group">
                <Sparkles className="h-4 w-4" aria-hidden />
                Request Your Holiday Visit
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
              <a href="#hlp-title" className="hln-cta hln-cta-ghost group">
                See Holiday Packages
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

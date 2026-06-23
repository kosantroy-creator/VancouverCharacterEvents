import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cake,
  Camera,
  Heart,
  Music,
  PawPrint,
  School,
  Star,
  User,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * MascotNotes — "What Guests Remember Most": the Mascot Meadows testimonial /
 * emotional-proof section, themed as "Happy Meadow Notes" — illustrative guest
 * notes pinned to a sunny meadow board. Four note cards (each a category with a
 * pushpin, a quote, a role attribution, a paw rating, and an accent moment tag),
 * a small "what every visit is built for" feature strip, and a two-CTA close.
 * Attributions are by role, not invented names (honest + brand-safe); archetype
 * language only. VISIBLE BY DEFAULT (hidden only under `.mhn.anim:not(.is-in)`),
 * reduced-motion safe. See "MASCOT MEADOWS NOTES" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Note = {
  id: string;
  cat: string;
  acc: string;
  accDeep: string;
  accSoft: string;
  quote: string;
  role: string;
  roleIcon: IconType;
  tag: string;
  tagIcon: IconType;
};

const NOTES: Note[] = [
  {
    id: "birthday",
    cat: "Birthday Party",
    acc: "#E2A92E",
    accDeep: "#B5821C",
    accSoft: "#FBEFCF",
    quote:
      "The mascot entrance was the highlight of the party. The kids were so excited, and the photo time felt easy instead of chaotic.",
    role: "Birthday Parent",
    roleIcon: Cake,
    tag: "Big Entrance Moment",
    tagIcon: Star,
  },
  {
    id: "school",
    cat: "School Visit",
    acc: "#5BB7E6",
    accDeep: "#2C7FB8",
    accSoft: "#DCEFFB",
    quote:
      "The visit was gentle, organized, and perfect for our younger group. The kids had time to wave, dance, and take photos without feeling rushed.",
    role: "School / Daycare Organizer",
    roleIcon: School,
    tag: "Gentle Group Flow",
    tagIcon: Heart,
  },
  {
    id: "community",
    cat: "Community Event",
    acc: "#4CA45D",
    accDeep: "#2C6E3A",
    accSoft: "#DCEFD6",
    quote:
      "The mascot was a great draw for families. The handler helped keep the interaction moving, and the photos were a huge hit.",
    role: "Event Coordinator",
    roleIcon: Users,
    tag: "Public Event Friendly",
    tagIcon: Camera,
  },
  {
    id: "party",
    cat: "Party Experience",
    acc: "#E6588F",
    accDeep: "#C8356C",
    accSoft: "#FBDDE8",
    quote:
      "The dancing and games made it feel like more than a quick appearance. It felt like a real party moment.",
    role: "Family Celebration Host",
    roleIcon: User,
    tag: "Dancing & Games",
    tagIcon: Music,
  },
];

const FEATURES: { icon: IconType; acc: string; label: string }[] = [
  { icon: Camera, acc: "#4CA45D", label: "Photo-friendly visits" },
  { icon: Cake, acc: "#E6588F", label: "Birthday-ready flow" },
  { icon: School, acc: "#5BB7E6", label: "School & festival friendly" },
  { icon: Users, acc: "#E2A92E", label: "Handler-supported appearances" },
];

const PETALS = [
  { left: "10%", s: 9, delay: "0s", dur: "20s", dx: "13px", rot: "180deg", c: "#FFD25A" },
  { left: "36%", s: 7, delay: "4.6s", dur: "23s", dx: "-10px", rot: "240deg", c: "#F2B4CC" },
  { left: "62%", s: 8, delay: "1.5s", dur: "21s", dx: "12px", rot: "120deg", c: "#7CC86A" },
  { left: "90%", s: 7, delay: "5.8s", dur: "24s", dx: "-11px", rot: "300deg", c: "#5BB7E6" },
] as const;

export function MascotNotes() {
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
      aria-labelledby="mhn-title"
      className={cn("mhn relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div aria-hidden className="mhn-decor pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="mhn-sun" />
        <span className="mhn-bunting" />
        <span className="mhn-corner mhn-corner-l" />
        <span className="mhn-corner mhn-corner-r" />
        {motionOK
          ? PETALS.map((p, i) => (
              <span
                key={i}
                className="mhn-petal"
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
            ))
          : null}
      </div>
      <div aria-hidden className="mhn-grass pointer-events-none absolute inset-x-0 bottom-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mhn-head mx-auto max-w-3xl text-center">
          <span className="mhn-sign">
            <span aria-hidden className="mhn-sign-chain mhn-sign-chain-l" />
            <span aria-hidden className="mhn-sign-chain mhn-sign-chain-r" />
            <PawPrint className="h-3.5 w-3.5" aria-hidden />
            Happy Meadow Notes
            <PawPrint className="h-3.5 w-3.5 -scale-x-100" aria-hidden />
          </span>
          <h2 id="mhn-title" className="mhn-title">
            What guests remember most
          </h2>
          <p className="mhn-sub">
            Mascot visits are built for reactions — the hugs, the photos, the dancing, the birthday
            spotlight, and the moment guests keep talking about after the party.
          </p>
          <span className="mhn-pill">
            <PawPrint className="mhn-pill-paw h-3.5 w-3.5" aria-hidden />
            Big Smiles
            <span aria-hidden className="mhn-pill-dot" />
            Easy Flow
            <span aria-hidden className="mhn-pill-dot" />
            Happy Memories
            <PawPrint className="mhn-pill-paw h-3.5 w-3.5 -scale-x-100" aria-hidden />
          </span>
        </div>

        {/* notes */}
        <ul className="mhn-grid">
          {NOTES.map((n, i) => {
            const RoleIcon = n.roleIcon;
            const TagIcon = n.tagIcon;
            return (
              <li
                key={n.id}
                className="mhn-note"
                style={
                  {
                    "--acc": n.acc,
                    "--acc-deep": n.accDeep,
                    "--acc-soft": n.accSoft,
                    "--i": i,
                  } as Vars
                }
              >
                <span aria-hidden className="mhn-pin" />
                <span className="mhn-cat">{n.cat}</span>
                <blockquote className="mhn-quote">
                  <span aria-hidden className="mhn-quote-mark">
                    &ldquo;
                  </span>
                  {n.quote}
                </blockquote>
                <span aria-hidden className="mhn-divider" />
                <p className="mhn-role">
                  <span aria-hidden className="mhn-role-ic">
                    <RoleIcon className="h-4 w-4" />
                  </span>
                  {n.role}
                </p>
                <span className="mhn-rating" aria-label="Five out of five paws">
                  {Array.from({ length: 5 }).map((_, p) => (
                    <PawPrint key={p} className="mhn-paw h-3.5 w-3.5" aria-hidden />
                  ))}
                </span>
                <span className="mhn-tag">
                  <TagIcon className="h-3.5 w-3.5" aria-hidden />
                  {n.tag}
                </span>
              </li>
            );
          })}
        </ul>

        {/* feature strip */}
        <ul className="mhn-features">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <li
                key={f.label}
                className="mhn-feature"
                style={{ "--acc": f.acc, "--i": i } as Vars}
              >
                <span aria-hidden className="mhn-feature-ic">
                  <Icon className="h-5 w-5" />
                </span>
                {f.label}
              </li>
            );
          })}
        </ul>

        {/* CTA + helper */}
        <div className="mhn-foot">
          <div className="mhn-cta-row">
            <Link to="/contact" className="mhn-cta mhn-cta-primary group">
              Request Your Mascot Visit
              <PawPrint
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <a href="#mps-title" className="mhn-cta mhn-cta-ghost group">
              See Mascot Packages
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </div>
          <p className="mhn-helper">
            Tell us your event type and we&apos;ll help recommend the right Mascot Meadows format.
            <Heart className="mhn-helper-heart h-3.5 w-3.5" aria-hidden />
          </p>
        </div>
      </div>
    </section>
  );
}

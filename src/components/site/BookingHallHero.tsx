import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  Briefcase,
  CalendarHeart,
  ChevronDown,
  Crown,
  Footprints,
  GraduationCap,
  Map,
  Moon,
  PawPrint,
  Shell,
  Shield,
  Snowflake,
  Sparkles,
  Store,
} from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import hallImg from "@/assets/booking/grand-booking-hall.webp";

/**
 * BookingHallHero — Section 1 of the Booking / Contact page: "The Grand Booking
 * Hall". The selected concierge-hall art plays full-bleed; the copy sits on the
 * bright cream-lit LEFT of the image over a soft cream/gold wash, with the glowing
 * realm doors + central planning desk preserved on the right. Same realm-hero
 * structure used across the site (eyebrow lockup → display heading → italic
 * subtitle → body → booking-path chips → two CTAs → scroll cue). Central VCE
 * palette (royal navy + warm gold + cream), NOT one world's palette. Warm light
 * bloom, drifting gold dust + faint door glints (motion-gated) and a light scroll
 * parallax keep it alive. Brand-safe, reduced-motion safe. See ".bkh" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

/** The six booking paths, mirrored as quick chips — each tinted with a representative world hue. */
const CHIPS = [
  { icon: CalendarHeart, label: "Birthdays", acc: "#C9337E" },
  { icon: GraduationCap, label: "Schools & Daycares", acc: "#4E8E5B" },
  { icon: Briefcase, label: "Corporate Events", acc: "#3E6EA8" },
  { icon: Store, label: "Festivals & Malls", acc: "#2C8A93" },
  { icon: Map, label: "Multi-World Events", acc: "#8E5BC8" },
  { icon: Sparkles, label: "Add-Ons", acc: "#C19A3C" },
] as const;

/** The eight worlds, as a faint "all realms welcome" token strip (completeness anchor). */
const REALMS = [
  { icon: Crown, acc: "#C9337E", name: "Princess Realm" },
  { icon: Shield, acc: "#3E6EA8", name: "Hero Headquarters" },
  { icon: Footprints, acc: "#4E8E5B", name: "Jurassic Expedition" },
  { icon: Shell, acc: "#1E8A9E", name: "Mermaid Cove" },
  { icon: PawPrint, acc: "#6DA63C", name: "Mascot Meadows" },
  { icon: Snowflake, acc: "#B3433F", name: "Holiday Village" },
  { icon: Moon, acc: "#8E5BC8", name: "Wonderverse Realm" },
  { icon: Store, acc: "#2C8A93", name: "Enchanted Bazaar" },
] as const;

/* Drifting gold dust, weighted to the lantern-lit right side (the planning desk). */
const DUST = [
  { left: "52%", s: 4, delay: "0s", dur: "13s", dx: "10px" },
  { left: "60%", s: 3, delay: "3.2s", dur: "15s", dx: "-8px" },
  { left: "68%", s: 5, delay: "1.4s", dur: "12s", dx: "12px" },
  { left: "75%", s: 3, delay: "5s", dur: "16s", dx: "-10px" },
  { left: "82%", s: 4, delay: "2.2s", dur: "14s", dx: "9px" },
  { left: "90%", s: 3, delay: "4.4s", dur: "13.5s", dx: "-11px" },
] as const;

/* Faint warm glints near the glowing realm doors (right arc). */
const GLINTS = [
  { left: "58%", top: "30%", delay: "0.4s" },
  { left: "72%", top: "24%", delay: "1.8s" },
  { left: "86%", top: "32%", delay: "2.7s" },
] as const;

export function BookingHallHero() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOK(true);

    // Light scroll parallax: the warm glow + ambient dust drift behind the static
    // hall art for depth. rAF-throttled, and the scroll listener is only attached
    // while the hero is actually on screen (an IntersectionObserver toggles it) so
    // it does no per-tick work down the other six sections.
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let listening = false;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y < 1000) el.style.setProperty("--bkh-py", `${y}px`);
      });
    };
    const add = () => {
      if (!listening) { window.addEventListener("scroll", onScroll, { passive: true }); listening = true; }
    };
    const remove = () => {
      if (listening) { window.removeEventListener("scroll", onScroll); listening = false; }
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? add() : remove()));
    io.observe(el);
    return () => {
      io.disconnect();
      remove();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-label="The Grand Booking Hall — begin planning your Vancouver Character Events experience"
      className={cn("bkh relative isolate flex min-h-[88svh] items-center overflow-hidden", motionOK && "anim")}
    >
      {/* The Grand Booking Hall — full-bleed background art */}
      <img
        src={hallImg}
        alt="A grand magical booking hall with glowing realm doors and a central event planning desk."
        fetchPriority="high"
        decoding="async"
        className="bkh-img absolute inset-0 -z-30 h-full w-full object-cover object-[66%_center] sm:object-[60%_center]"
      />

      {/* Cream/gold washes — lift the dark copy off the bright left of the hall */}
      <div aria-hidden className="bkh-wash absolute inset-0 -z-20" />
      <div aria-hidden className="bkh-wash-mobile absolute inset-0 -z-20 sm:hidden" />
      <div aria-hidden className="bkh-seam absolute inset-x-0 bottom-0 -z-20 h-40" />

      {/* warm light bloom from the hall (parallax) */}
      <span aria-hidden className="bkh-glow absolute -z-10" />

      {/* ambient gold dust + door glints (motion only) */}
      {motionOK ? (
        <div aria-hidden className="bkh-amb pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {DUST.map((d, i) => (
            <span
              key={`d${i}`}
              className="bkh-dust"
              style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx } as Vars}
            />
          ))}
          {GLINTS.map((g, i) => (
            <span
              key={`g${i}`}
              className="bkh-glint"
              style={{ left: g.left, top: g.top, animationDelay: g.delay } as Vars}
            />
          ))}
        </div>
      ) : null}

      {/* ===================== COPY (left) ===================== */}
      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-5 pb-28 pt-24 sm:px-6 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="max-w-xl">
          {/* eyebrow lockup */}
          <Reveal y={16}>
            <span className="bkh-eyebrow">
              <span aria-hidden className="bkh-eyebrow-fl" />
              Vancouver Character Events · Booking Hall
              <span aria-hidden className="bkh-eyebrow-fl bkh-eyebrow-fl--r" />
            </span>
          </Reveal>

          <Reveal delay={130} y={18}>
            <h1 className="bkh-title mt-4">
              <span className="bkh-title-a">Plan Your VCE</span>
              <span className="bkh-title-b">Experience</span>
            </h1>
          </Reveal>

          <Reveal delay={210} y={16}>
            <p className="bkh-sub mt-3">
              Choose your world, share your event details, and we&apos;ll help guide the magic.
            </p>
          </Reveal>

          <Reveal delay={280} y={16}>
            <p className="bkh-body mt-5 max-w-lg">
              Start your event request inside the Grand Booking Hall. Whether you&apos;re planning a
              birthday party, school visit, festival, mall appearance, corporate celebration, or a
              multi-world event, we&apos;ll help match the right characters, experiences, and add-ons to
              your date, location, guest count, and event style.
            </p>
          </Reveal>

          {/* booking-path chips */}
          <Reveal delay={350} y={14}>
            <ul className="bkh-chips mt-6">
              {CHIPS.map(({ icon: Icon, label, acc }) => (
                <li key={label} className="bkh-chip" style={{ "--acc": acc } as Vars}>
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* CTA — one forward action; the booking path is the single first step */}
          <Reveal delay={430} y={16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="#booking-paths" size="lg" className="bkh-cta-primary group">
                <Map className="h-4 w-4" aria-hidden />
                Choose Your Booking Path
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </CTAButton>
            </div>
          </Reveal>

          {/* 3-step path rail — seeds the guided-flow model + fills the lower-left */}
          <Reveal delay={500} y={14}>
            <ul className="bkh-steps">
              <li className="bkh-step"><span aria-hidden className="bkh-step-n">1</span> Choose Your Path</li>
              <li className="bkh-step"><span aria-hidden className="bkh-step-n">2</span> Choose Your World</li>
              <li className="bkh-step"><span aria-hidden className="bkh-step-n">3</span> Event Details</li>
            </ul>
          </Reveal>

          {/* faint eight-realm token strip — all worlds appear together up front */}
          <Reveal delay={560} y={14}>
            <div>
              <ul className="bkh-realms" aria-label="Eight magical worlds to choose from">
                {REALMS.map(({ icon: Icon, acc, name }) => (
                  <li key={name} className="bkh-realm" style={{ "--acc": acc } as Vars} title={name}>
                    <Icon className="h-4 w-4" aria-hidden />
                  </li>
                ))}
              </ul>
              <p className="bkh-realms-cap">Eight worlds · one booking hall</p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* gentle scroll cue */}
      <a href="#book" aria-label="Scroll to the booking request" className="bkh-chev">
        <ChevronDown className="h-5 w-5" aria-hidden />
      </a>
    </section>
  );
}

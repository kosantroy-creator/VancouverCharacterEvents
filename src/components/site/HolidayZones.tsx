import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
} from "react";
import { Link } from "@tanstack/react-router";
import gsap from "gsap";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Candy,
  Egg,
  Flower2,
  Ghost,
  Gift,
  Heart,
  Moon,
  Music,
  Rabbit,
  Sparkles,
  Star,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import zoneEaster from "@/assets/holiday/zones/zone-easter.webp";
import zoneHalloween from "@/assets/holiday/zones/zone-halloween.webp";
import zoneChristmas from "@/assets/holiday/zones/zone-christmas.webp";

/**
 * HolidayZones — "Open the Village Calendar". The Holiday Village character roster
 * as three scenic seasonal worlds (the holiday sibling of the Mascot Meadows
 * MeadowFriends zones). Each season has its own illustrated village background,
 * a placeholder reel portal on the side OPPOSITE the village entrance, and
 * character cards that magically explode out of the portal (GSAP) as it scrolls
 * in, then drift gently and grow on hover to reveal Book Now. Per-season accent —
 * Easter purple, Halloween orange, Christmas evergreen. Brand-safe public names
 * only. STATIC-FIRST & reduced-motion safe. See "HOLIDAY VILLAGE ZONES" in
 * styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Friend = { name: string; icon: IconType };
type Zone = {
  id: string;
  name: string;
  story: string;
  bg: string;
  icon: IconType;
  accent: string;
  accentDeep: string;
  cta: string;
  /** true = cards on the LEFT (entrance left), portal on the right. */
  flip: boolean;
  friends: Friend[];
};

const ZONES: Zone[] = [
  {
    id: "easter",
    name: "Spring Celebration",
    story:
      "Storybook spring magic for Easter events, egg hunts, daycares, schools, mall photos, and family celebrations.",
    bg: zoneEaster,
    icon: Flower2,
    accent: "#7E5BA0",
    accentDeep: "#553A78",
    cta: "Explore Spring Visits",
    flip: true,
    friends: [
      { name: "Storybook Alice", icon: BookOpen },
      { name: "Easter Bunny", icon: Rabbit },
      { name: "Mad Hatter", icon: Sparkles },
    ],
  },
  {
    id: "halloween",
    name: "Spooky Season",
    story:
      "A quirky, mysterious, family-friendly visit for Halloween parties, themed birthdays, school events, and photo moments.",
    bg: zoneHalloween,
    icon: Ghost,
    accent: "#D9722F",
    accentDeep: "#A8531B",
    cta: "Explore Halloween Visits",
    flip: false,
    friends: [{ name: "Spooky Gothic Guest", icon: Moon }],
  },
  {
    id: "christmas",
    name: "Christmas Square",
    story:
      "Our biggest season — Santa, Mrs. Claus, carolers, sweet helpers, and elegant holiday appearances for parties, malls, schools, corporate events, and community celebrations.",
    bg: zoneChristmas,
    icon: Gift,
    accent: "#2C7D4F",
    accentDeep: "#15543A",
    cta: "Explore Christmas Visits",
    flip: true,
    friends: [
      { name: "Santa", icon: Gift },
      { name: "Mrs. Claus", icon: Heart },
      { name: "Mischievous Green Guest", icon: Sparkles },
      { name: "Sweet Christmas Helper", icon: Candy },
      { name: "Caroler Trio", icon: Music },
      { name: "Christmas Belle", icon: Star },
    ],
  },
];

const SPARK_COUNT = 12;
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function HolidayZones() {
  return (
    <section id="village-calendar" aria-labelledby="hvz-title" className="hvz relative isolate scroll-mt-24 overflow-hidden">
      <span aria-hidden className="hvz-glow" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-6 pt-20 text-center sm:px-6 md:pt-24 lg:px-8">
        <Reveal y={12}>
          <span className="hvz-eyebrow">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            The Village Calendar
          </span>
        </Reveal>
        <Reveal delay={100} y={16}>
          <h2 id="hvz-title" className="hvz-title">
            Step into every season
          </h2>
        </Reveal>
        <Reveal delay={170} y={16}>
          <p className="hvz-sub mx-auto max-w-2xl">
            Holiday Village changes with the celebration. Wander through Easter, Spooky Season, and
            Christmas Square to meet the characters behind each one.
          </p>
        </Reveal>
      </div>

      {ZONES.map((z) => (
        <HolidayZone key={z.id} zone={z} />
      ))}

      <div aria-hidden className="hvz-seam pointer-events-none absolute inset-x-0 bottom-0" />
    </section>
  );
}

function HolidayZone({ zone }: { zone: Zone }) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const burstRef = useRef<HTMLSpanElement>(null);
  const playedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const ZoneIcon = zone.icon;

  /** Magically explode the cards out of the portal: flash → sparkle burst → cards. */
  const explode = () => {
    const tile = tileRef.current;
    const cards = Array.from(cardsRef.current?.querySelectorAll("[data-card]") ?? []);
    if (!tile || !cards.length) return;
    const t = tile.getBoundingClientRect();
    const tl = gsap.timeline();

    if (glowRef.current) {
      tl.fromTo(
        glowRef.current,
        { autoAlpha: 0, scale: 0.5 },
        { autoAlpha: 1, scale: 1.35, duration: 0.22, ease: "power2.out" },
        0,
      ).to(glowRef.current, { autoAlpha: 0, scale: 1.65, duration: 0.65, ease: "power2.in" }, 0.18);
    }

    const sparks = Array.from(burstRef.current?.children ?? []);
    if (sparks.length) {
      tl.fromTo(
        sparks,
        { x: 0, y: 0, scale: 0, autoAlpha: 1 },
        {
          x: () => gsap.utils.random(-105, 105),
          y: () => gsap.utils.random(-95, 95),
          rotation: () => gsap.utils.random(-120, 120),
          scale: () => gsap.utils.random(0.6, 1.5),
          autoAlpha: 0,
          duration: 0.72,
          ease: "power2.out",
          stagger: 0.012,
        },
        0.02,
      );
    }

    tl.fromTo(
      cards,
      {
        x: (_i: number, el: Element) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          return t.left + t.width / 2 - (r.left + r.width / 2);
        },
        y: (_i: number, el: Element) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          return t.top + t.height / 2 - (r.top + r.height / 2);
        },
        rotation: () => gsap.utils.random(-55, 55),
        scale: 0.12,
        autoAlpha: 0,
      },
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.9,
        ease: "back.out(1.8)",
        stagger: { each: 0.07, from: "center" },
      },
      0.05,
    );
  };

  useIsoLayoutEffect(() => {
    const el = zoneRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(el.querySelectorAll("[data-card]"));

    if (reduced || !("IntersectionObserver" in window)) {
      gsap.set(cards, { autoAlpha: 1 });
      setOpen(true);
      playedRef.current = true;
      return;
    }
    gsap.set(cards, { autoAlpha: 0 });
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playedRef.current) {
          playedRef.current = true;
          setOpen(true);
          explode();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={zoneRef}
      aria-label={zone.name}
      className={cn("hvz-zone", zone.flip && "hvz-zone--flip")}
      style={{ "--za": zone.accent, "--za-deep": zone.accentDeep } as Vars}
    >
      <div aria-hidden className="hvz-bg">
        <img src={zone.bg} alt="" loading="lazy" decoding="async" />
        <span className="hvz-bg-grade" />
        <span className="hvz-bg-scrim" />
      </div>

      <div className="hvz-grid">
        <div ref={tileRef} className="hvz-portal">
          <video
            className="hvz-portal-vid"
            poster={zone.bg}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${zone.name} reel`}
          />
          <span aria-hidden className="hvz-portal-shade" />
          <span ref={glowRef} aria-hidden className="hvz-portal-glow" />
          <span ref={burstRef} aria-hidden className="hvz-burst">
            {Array.from({ length: SPARK_COUNT }).map((_, i) => (
              <span key={i} className="hvz-spark" />
            ))}
          </span>
          <span aria-hidden className="hvz-portal-play">
            <Play className="h-5 w-5 translate-x-px fill-current" />
          </span>
          <span className="hvz-portal-label">
            <ZoneIcon className="h-3.5 w-3.5" aria-hidden />
            Featured Reel
          </span>
        </div>

        <div className="hvz-content">
          <div className="hvz-zone-head">
            <span aria-hidden className="hvz-zone-ic">
              <ZoneIcon className="h-5 w-5" />
            </span>
            <h3 className="hvz-zone-title">{zone.name}</h3>
          </div>
          <p className="hvz-zone-story">{zone.story}</p>

          <ul ref={cardsRef} className="hvz-cards" aria-label={`${zone.name} characters`}>
            {zone.friends.map(({ name, icon: Icon }, i) => (
              <li
                key={name}
                data-card
                className="hvz-card"
                style={
                  {
                    "--sway-d": `${6.2 + (i % 3) * 0.8}s`,
                    "--sway-delay": `${1.4 + i * 0.3}s`,
                  } as Vars
                }
              >
                <div className="hvz-sway">
                  <div className="hvz-cardx">
                    <span aria-hidden className="hvz-card-portrait">
                      <Icon className="h-7 w-7" />
                      <span className="hvz-card-badge">
                        <Sparkles className="h-3 w-3" />
                      </span>
                    </span>
                    <p className="hvz-card-name">{name}</p>
                    <div className="hvz-cardx-extra">
                      <Link to="/contact" className="hvz-book" aria-label={`Book ${name}`}>
                        <Sparkles className="h-3.5 w-3.5" aria-hidden />
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="hvz-zone-cta">
            <Link to="/contact" className="hvz-cta group">
              <Sparkles className="h-4 w-4" aria-hidden />
              {zone.cta}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <span className="hvz-zone-count">
              {zone.friends.length} character{zone.friends.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        {open ? `${zone.name} characters revealed` : ""}
      </span>
    </div>
  );
}

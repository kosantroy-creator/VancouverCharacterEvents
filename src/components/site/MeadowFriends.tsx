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
  Compass,
  Heart,
  Leaf,
  PartyPopper,
  PawPrint,
  Play,
  Sparkles,
  Star,
  Tv,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import zoneClassic from "@/assets/mascot/zones/zone-classic.webp";
import zoneCartoon from "@/assets/mascot/zones/zone-cartoon.webp";
import zoneAdventure from "@/assets/mascot/zones/zone-adventure.webp";
import zoneAnimal from "@/assets/mascot/zones/zone-animal.webp";

/**
 * MeadowFriends — "Meet the Meadow Friends": the Mascot Meadows character roster
 * as four scenic "world" zones (the meadow sibling of the Princess KingdomDoors).
 * Each zone has its own illustrated background scene, a placeholder reel portal,
 * and character cards that MAGICALLY EXPLODE out of the portal (GSAP: a portal
 * flash + sparkle burst, then the cards launch from the portal centre with an
 * overshoot, staggered from the middle). Once landed they drift gently forever
 * (CSS sway, like the Princess / Wonderverse cards), and on hover/focus each card
 * grows in place to reveal a Book Now button. Green-themed, brand-safe public
 * names only. STATIC-FIRST & reduced-motion safe — without motion the cards are
 * simply shown. See "MASCOT MEADOWS ZONES" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Zone = {
  id: string;
  name: string;
  story: string;
  bg: string;
  icon: IconType;
  friends: string[];
};

const ZONES: Zone[] = [
  {
    id: "classic",
    name: "Classic Mouse & Snow Friends",
    story: "The instantly recognizable party favourites.",
    bg: zoneClassic,
    icon: Sparkles,
    friends: [
      "Friendly Snowman",
      "Classic Mouse",
      "Dapper Mouse",
      "Sweetheart Mouse",
      "Pretty Bow Mouse",
    ],
  },
  {
    id: "cartoon",
    name: "TV & Cartoon Favourites",
    story: "Bright, fun, colourful characters that younger kids recognize right away.",
    bg: zoneCartoon,
    icon: Tv,
    friends: [
      "Sea Sponge Pal",
      "Little Vampire",
      "Red Furry Friend",
      "Little Piglet",
      "Happy Troll",
      "Little Shark",
      "Blue Pup",
    ],
  },
  {
    id: "adventure",
    name: "Adventure & Hero Pals",
    story: "Great for high-energy parties, games, missions, and interactive visits.",
    bg: zoneAdventure,
    icon: Compass,
    friends: [
      "Electric Mouse",
      "Police Pup",
      "Fire Pup",
      "Cat Hero",
      "Owl Hero",
      "Explorer Girl",
      "Animal Rescuer",
      "Pete the Pirate",
    ],
  },
  {
    id: "animal",
    name: "Animal, Dino & Specialty Mascots",
    story: "Unique mascots that stand out for themed parties, community events, and photo moments.",
    bg: zoneAnimal,
    icon: Leaf,
    friends: [
      "Blue Dino",
      "Pink Dino",
      "Antabella the Ant",
      "Cuddly Koala",
      "Busy Beaver",
      "Spring Bunny",
    ],
  },
];

const CARD_ICONS: IconType[] = [Star, Heart, Sparkles, PawPrint];
const SPARK_COUNT = 12;

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function MeadowFriends() {
  return (
    <section aria-labelledby="mft-title" className="mft relative isolate overflow-hidden">
      <div aria-hidden className="mft-decor pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="mft-sun" />
        <span className="mft-cloud mft-cloud-l" />
        <span className="mft-cloud mft-cloud-r" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-6 pt-20 text-center sm:px-6 md:pt-24 lg:px-8">
        <Reveal y={12}>
          <span className="mft-eyebrow">
            <PawPrint className="h-3.5 w-3.5" aria-hidden />
            Meadow Friend Guide
            <PawPrint className="h-3.5 w-3.5 -scale-x-100" aria-hidden />
          </span>
        </Reveal>
        <Reveal delay={100} y={16}>
          <h2 id="mft-title" className="mft-title">
            Meet the Meadow Friends
          </h2>
        </Reveal>
        <Reveal delay={170} y={16}>
          <p className="mft-sub mx-auto max-w-2xl">
            Wander through four meadow worlds to meet the whole crew — party favourites, cartoon
            friends, adventure pals, and one-of-a-kind animal and dino mascots.
          </p>
        </Reveal>
      </div>

      {ZONES.map((z, i) => (
        <MeadowZone key={z.id} zone={z} index={i} />
      ))}

      <div aria-hidden className="mft-seam pointer-events-none absolute inset-x-0 bottom-0" />
    </section>
  );
}

function MeadowZone({ zone, index }: { zone: Zone; index: number }) {
  const flip = index % 2 === 1;
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
    <div ref={zoneRef} aria-label={zone.name} className={cn("mz-zone", flip && "mz-zone--flip")}>
      <div aria-hidden className="mz-bg">
        <img src={zone.bg} alt="" loading="lazy" decoding="async" />
        <span className="mz-bg-grade" />
        <span className="mz-bg-scrim" />
      </div>

      <div className="mz-grid">
        <div ref={tileRef} className="mz-portal">
          <video
            className="mz-portal-vid"
            poster={zone.bg}
            muted
            loop
            playsInline
            preload="none"
            aria-label={`${zone.name} reel`}
          />
          <span aria-hidden className="mz-portal-shade" />
          <span ref={glowRef} aria-hidden className="mz-portal-glow" />
          <span ref={burstRef} aria-hidden className="mz-burst">
            {Array.from({ length: SPARK_COUNT }).map((_, i) => (
              <span key={i} className="mz-spark" />
            ))}
          </span>
          <span aria-hidden className="mz-portal-play">
            <Play className="h-5 w-5 translate-x-px fill-current" />
          </span>
          <span className="mz-portal-label">
            <ZoneIcon className="h-3.5 w-3.5" aria-hidden />
            Featured Reel
          </span>
        </div>

        <div className="mz-content">
          <div className="mz-zone-head">
            <span aria-hidden className="mz-zone-ic">
              <ZoneIcon className="h-5 w-5" />
            </span>
            <h3 className="mz-zone-title">{zone.name}</h3>
          </div>
          <p className="mz-zone-story">{zone.story}</p>

          <ul ref={cardsRef} className="mz-cards" aria-label={`${zone.name} characters`}>
            {zone.friends.map((name, i) => {
              const Icon = CARD_ICONS[i % CARD_ICONS.length];
              return (
                <li
                  key={name}
                  data-card
                  className="mz-card"
                  style={
                    {
                      "--hue": i % 5,
                      "--sway-d": `${6.2 + (i % 3) * 0.8}s`,
                      "--sway-delay": `${1.4 + i * 0.3}s`,
                    } as Vars
                  }
                >
                  <div className="mz-sway">
                    <div className="mz-cardx">
                      <span aria-hidden className="mz-card-portrait">
                        <Icon className="h-7 w-7" />
                        <span className="mz-card-paw">
                          <PawPrint className="h-3 w-3" />
                        </span>
                      </span>
                      <p className="mz-card-name">{name}</p>
                      <div className="mz-cardx-extra">
                        <Link
                          to="/contact"
                          className="mz-book"
                          aria-label={`Book ${name}`}
                        >
                          <PartyPopper className="h-3.5 w-3.5" aria-hidden />
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mz-zone-cta">
            <Link to="/contact" className="mz-cta group">
              <PawPrint className="h-4 w-4" aria-hidden />
              Request These Friends
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <span className="mz-zone-count">
              {zone.friends.length} friend{zone.friends.length === 1 ? "" : "s"}
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

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
import { ArrowRight, Crown, Flower2, Moon, Snowflake, Sparkles, Waves, X } from "lucide-react";
import type { CourtDoor, WorldCourt } from "@/lib/royal-court";
import { cn } from "@/lib/utils";

import icePoster from "@/assets/princess/doors/ice-kingdom-poster.jpg";
import rosePoster from "@/assets/princess/doors/rose-kingdom-poster.jpg";
import oceanPoster from "@/assets/princess/doors/ocean-kingdom-poster.jpg";
import glassPoster from "@/assets/princess/doors/glass-slipper-kingdom-poster.jpg";
import towerPoster from "@/assets/princess/doors/tower-kingdom-poster.jpg";
import starlightPoster from "@/assets/princess/doors/starlight-kingdom-poster.jpg";

import realmIce from "@/assets/princess/realms/ice-kingdom.webp";
import realmRose from "@/assets/princess/realms/rose-kingdom.webp";
import realmOcean from "@/assets/princess/realms/ocean-kingdom.webp";
import realmGlass from "@/assets/princess/realms/glass-slipper-kingdom.webp";
import realmTower from "@/assets/princess/realms/tower-kingdom.webp";
import realmStarlight from "@/assets/princess/realms/starlight-kingdom.webp";

import cardIceQueen from "@/assets/princess/cards/ice-queen.webp";
import cardSpiritQueen from "@/assets/princess/cards/spirit-queen.webp";
import cardCrystal from "@/assets/princess/cards/crystal-princess.webp";
import cardSnow from "@/assets/princess/cards/snow-princess.webp";
import cardWinter from "@/assets/princess/cards/winter-princess.webp";
import cardCoronation from "@/assets/princess/cards/coronation-queen.webp";
import cardGoldenGown from "@/assets/princess/cards/golden-gown-princess.webp";
import cardVillage from "@/assets/princess/cards/village-beauty.webp";
import cardChristmasRose from "@/assets/princess/cards/christmas-rose-princess.webp";
import cardStorybook from "@/assets/princess/cards/storybook-beauty.webp";
import cardPearl from "@/assets/princess/cards/pearl-princess.webp";
import cardOcean from "@/assets/princess/cards/ocean-princess.webp";
import cardMermaid from "@/assets/princess/cards/mermaid-princess.webp";
import cardIsland from "@/assets/princess/cards/island-princess.webp";
import cardGlassSlipper from "@/assets/princess/cards/glass-slipper-princess.webp";
import cardDreaming from "@/assets/princess/cards/dreaming-princess.webp";
import cardFairest from "@/assets/princess/cards/fairest-princess.webp";
import cardTower from "@/assets/princess/cards/tower-princess.webp";
import cardButterfly from "@/assets/princess/cards/butterfly-princess.webp";
import cardDesert from "@/assets/princess/cards/desert-princess.webp";
import cardFirefly from "@/assets/princess/cards/firefly-princess.webp";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * KingdomDoors v7 — one continuous enchanted journey.
 *
 * The whole court shares a single twilight canvas (painted by the parent
 * section); each kingdom is an open "chapter zone" — no boxes — whose color
 * and atmosphere radiate outward from the door-video portal. Zones blend
 * into each other with soft glows, mist and shared particles.
 *
 * Doors auto-open once as each zone scrolls into view (video plays and
 * holds open; cards fly out of the doorway, then drift gently side to
 * side). Hovering a card expands that card in place into a fuller view —
 * larger portrait, her gown, a welcome line and a Book Now button.
 */
export function KingdomDoors({ court }: { court: WorldCourt }) {
  return (
    <div className="kingdom-doors">
      {court.doors.map((door, i) => (
        <KingdomZone key={door.id} door={door} index={i} />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------------
   Realm theming — portal videos, posters and the atmosphere that radiates
   out of each doorway into its zone.
   ---------------------------------------------------------------------------- */

type Realm = {
  poster: string;
  vid: string;
  /** Wide, immersive environment painting that fills the whole kingdom band. */
  bg: string;
  /** Primary tint radiating from the portal + secondary far-side glow. */
  tint: string;
  tint2: string;
  edge: string;
  icon: ComponentType<{ className?: string; style?: CSSProperties; "aria-hidden"?: boolean }>;
  pcl: "pcl-snow" | "pcl-bubble" | "pcl-petal" | "pcl-spark";
  pclColor: string;
};

const REALMS: Record<string, Realm> = {
  "ice-kingdom": {
    poster: icePoster,
    vid: "/video/doors/ice-kingdom.mp4",
    bg: realmIce,
    tint: "rgba(118, 178, 240, 0.32)",
    tint2: "rgba(170, 225, 255, 0.16)",
    edge: "#9CC8EE",
    icon: Snowflake,
    pcl: "pcl-snow",
    pclColor: "rgba(255,255,255,0.9)",
  },
  "rose-kingdom": {
    poster: rosePoster,
    vid: "/video/doors/rose-kingdom.mp4",
    bg: realmRose,
    tint: "rgba(228, 132, 165, 0.30)",
    tint2: "rgba(255, 196, 150, 0.14)",
    edge: "#E7A8B4",
    icon: Flower2,
    pcl: "pcl-petal",
    pclColor: "rgba(244,178,198,0.9)",
  },
  "ocean-kingdom": {
    poster: oceanPoster,
    vid: "/video/doors/ocean-kingdom.mp4",
    bg: realmOcean,
    tint: "rgba(86, 208, 198, 0.28)",
    tint2: "rgba(180, 235, 255, 0.14)",
    edge: "#7FD6CE",
    icon: Waves,
    pcl: "pcl-bubble",
    pclColor: "rgba(190,240,236,0.85)",
  },
  "glass-slipper-kingdom": {
    poster: glassPoster,
    vid: "/video/doors/glass-slipper-kingdom.mp4",
    bg: realmGlass,
    tint: "rgba(148, 178, 245, 0.30)",
    tint2: "rgba(220, 230, 255, 0.15)",
    edge: "#AFC5F0",
    icon: Sparkles,
    pcl: "pcl-spark",
    pclColor: "rgba(214,226,255,0.9)",
  },
  "tower-kingdom": {
    poster: towerPoster,
    vid: "/video/doors/tower-kingdom.mp4",
    bg: realmTower,
    tint: "rgba(168, 122, 230, 0.30)",
    tint2: "rgba(255, 200, 112, 0.16)",
    edge: "#C9A8F0",
    icon: Crown,
    pcl: "pcl-spark",
    pclColor: "rgba(255,214,140,0.9)",
  },
  "starlight-kingdom": {
    poster: starlightPoster,
    vid: "/video/doors/starlight-kingdom.mp4",
    bg: realmStarlight,
    tint: "rgba(138, 100, 220, 0.30)",
    tint2: "rgba(255, 206, 122, 0.18)",
    edge: "#D7B8F5",
    icon: Moon,
    pcl: "pcl-spark",
    pclColor: "rgba(244,206,132,0.9)",
  },
};

const DEFAULT_REALM = REALMS["glass-slipper-kingdom"];

/** Card portraits keyed by character id (swap to real photos any time). */
export const CARD_ART: Record<string, string> = {
  "ice-queen": cardIceQueen,
  "spirit-queen": cardSpiritQueen,
  "crystal-princess": cardCrystal,
  "snow-princess": cardSnow,
  "winter-princess": cardWinter,
  "coronation-queen": cardCoronation,
  "golden-gown-princess": cardGoldenGown,
  "village-beauty": cardVillage,
  "christmas-rose-princess": cardChristmasRose,
  "storybook-beauty": cardStorybook,
  "pearl-princess": cardPearl,
  "ocean-princess": cardOcean,
  "mermaid-princess": cardMermaid,
  "island-princess": cardIsland,
  "glass-slipper-princess": cardGlassSlipper,
  "dreaming-princess": cardDreaming,
  "fairest-princess": cardFairest,
  "tower-princess": cardTower,
  "butterfly-princess": cardButterfly,
  "desert-princess": cardDesert,
  "firefly-princess": cardFirefly,
};

/** Deterministic particles + scatter rotations (SSR-safe). */
const SPOTS = [
  { left: "5%", top: "14%", delay: "0s", duration: "7s", dx: "12px", s: 4 },
  { left: "28%", top: "76%", delay: "2.1s", duration: "8.5s", dx: "-9px", s: 3 },
  { left: "52%", top: "10%", delay: "0.9s", duration: "7.8s", dx: "7px", s: 5 },
  { left: "76%", top: "68%", delay: "3.2s", duration: "9s", dx: "-11px", s: 4 },
  { left: "94%", top: "22%", delay: "1.6s", duration: "8s", dx: "9px", s: 4 },
] as const;
const SCATTER = [-12, 8, -6, 11, -9, 6];

/* ----------------------------------------------------------------------------
   One kingdom chapter zone.
   ---------------------------------------------------------------------------- */

function KingdomZone({ door, index }: { door: CourtDoor; index: number }) {
  const realm = REALMS[door.id] ?? DEFAULT_REALM;
  const RealmIcon = realm.icon;
  const guests = door.characters;
  const flip = index % 2 === 1; // alternate portal side for flow

  const zoneRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLUListElement>(null);
  const playedRef = useRef(false);
  const [open, setOpen] = useState(false);
  // Which guest is expanded to a centred lightbox (null = none).
  const [active, setActive] = useState<string | null>(null);
  const [closing, setClosing] = useState(false); // reverse-animation flag

  /** Fan the cards out of the doorway into their slots. */
  const flyCards = () => {
    const tile = tileRef.current;
    const cards = Array.from(cardsRef.current?.querySelectorAll("[data-card]") ?? []);
    if (!tile || !cards.length) return;
    const t = tile.getBoundingClientRect();
    gsap.fromTo(
      cards,
      {
        x: (i: number, el: Element) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          return t.left + t.width / 2 - (r.left + r.width / 2);
        },
        y: (i: number, el: Element) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          return t.top + t.height * 0.55 - (r.top + r.height / 2);
        },
        rotation: (i: number) => SCATTER[i % SCATTER.length] * 2,
        autoAlpha: 0,
        scale: 0.45,
      },
      {
        x: 0,
        y: 0,
        rotation: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.85,
        ease: "back.out(1.4)",
        stagger: 0.09,
        delay: 0.9, // doors are parting in the video by now
        overwrite: true,
      },
    );
  };

  useIsoLayoutEffect(() => {
    const el = zoneRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cards = Array.from(el.querySelectorAll("[data-card]"));

    if (reduced) {
      gsap.set(cards, { autoAlpha: 1 });
      setOpen(true);
      playedRef.current = true;
      return;
    }
    gsap.set(cards, { autoAlpha: 0 });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !playedRef.current) {
          playedRef.current = true;
          setOpen(true);
          const vid = videoRef.current;
          if (vid) {
            vid.src = realm.vid;
            void vid.play().catch(() => undefined);
          }
          flyCards();
          io.disconnect();
        }
      },
      // Fire well before the zone is centred so the doors have opened and the
      // cards have flown in by the time a fast scroll arrives (no late pop-in).
      { threshold: 0, rootMargin: "300px 0px 300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Open: mount the lightbox (the portrait spin-in + panel open are CSS mount
  // animations — no timing dependency).
  const openCard = (id: string) => {
    setClosing(false);
    setActive(id);
  };

  // Close: play the reverse animations (CSS), then unmount.
  const closeCard = () => {
    if (reducedMotion()) {
      setClosing(false);
      setActive(null);
      return;
    }
    setClosing(true);
    window.setTimeout(() => {
      setActive(null);
      setClosing(false);
    }, 470);
  };

  // Lock scroll + Escape (spins back) while a guest lightbox is open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCard();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <section
      ref={zoneRef}
      data-gate
      aria-label={door.name}
      className="relative scroll-mt-24 py-16 md:py-24"
    >
      {/* Themed kingdom environment — an immersive painting that fills the
          whole band and feathers at top & bottom so each realm melts into
          the next along the shared twilight canvas. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, #000 15%, #000 85%, transparent 100%)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, #000 15%, #000 85%, transparent 100%)",
        }}
      >
        <img src={realm.bg} alt="" loading="lazy" className="h-full w-full object-cover" />
        {/* recede + grade for depth and seam blending */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,11,28,0.52) 0%, rgba(14,11,28,0.22) 36%, rgba(14,11,28,0.32) 70%, rgba(14,11,28,0.62) 100%)",
          }}
        />
        {/* darker behind the heading + cards so light copy stays legible */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${flip ? "to left" : "to right"}, transparent 40%, rgba(11,9,24,0.6) 100%)`,
          }}
        />
      </div>

      {/* Local atmosphere — the kingdom's light radiating from its portal */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(860px 580px at ${flip ? "84%" : "16%"} 44%, ${realm.tint}, transparent 72%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(520px 400px at ${flip ? "12%" : "88%"} 72%, ${realm.tint2}, transparent 76%)`,
          }}
        />
        {/* drifting mist near the zone's foot, easing into the next kingdom */}
        <span className="g3-mist bottom-0 left-[18%] h-20 w-3/5 opacity-25" />
        {/* zone particles */}
        {SPOTS.map((p, i) => (
          <span
            key={i}
            className={cn("pcl", realm.pcl)}
            style={{
              left: p.left,
              top: p.top,
              width: p.s,
              height: p.s,
              background: realm.pclColor,
              boxShadow: `0 0 ${p.s * 2}px ${door.glow}`,
              animationDelay: p.delay,
              animationDuration: p.duration,
              ["--dx" as string]: p.dx,
            }}
          />
        ))}
      </div>

      <div
        className={cn(
          "relative mx-auto grid w-full max-w-[1200px] items-center gap-8 px-5 sm:px-8 lg:gap-10",
          flip
            ? "lg:grid-cols-[1fr_minmax(300px,380px)]"
            : "lg:grid-cols-[minmax(300px,380px)_1fr]",
        )}
      >
        {/* DOOR PORTAL — the anchor the kingdom radiates from */}
        <div ref={tileRef} className={cn("mx-auto w-full max-w-[380px]", flip && "lg:order-2")}>
          <div
            className="relative overflow-hidden rounded-[var(--radius-xl)] border-2"
            style={{
              borderColor: "color-mix(in oklab, var(--gold-500) 70%, transparent)",
              boxShadow: `0 0 60px ${door.glow}, 0 24px 50px -20px rgba(0,0,0,0.55)`,
            }}
          >
            {/* Poster still lives behind the video so a fast scroll never shows a
                blank tile — the video fades over it once it loads & plays. */}
            <img
              src={realm.poster}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <video
              ref={videoRef}
              muted
              playsInline
              preload="none"
              poster={realm.poster}
              className="relative aspect-square w-full object-cover"
            />
            {/* soft inner vignette melts the tile into the zone */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: `inset 0 0 46px 10px ${realm.tint}`,
              }}
            />
          </div>
        </div>

        {/* KINGDOM + CARDS */}
        <div className={cn("min-w-0", flip && "lg:order-1")}>
          <div className={cn("flex items-center gap-2.5", flip && "lg:justify-end")}>
            <RealmIcon className="h-5 w-5 shrink-0 text-gold-400" aria-hidden />
            <h3 className="t-display text-3xl text-star-white sm:text-4xl">{door.name}</h3>
          </div>
          <p className={cn("mt-1 text-sm italic text-fg-on-ink/75", flip && "lg:text-right")}>
            {door.story}
          </p>

          <ul
            ref={cardsRef}
            className={cn("mt-6 flex flex-wrap gap-3.5", flip && "lg:justify-end")}
            aria-label={`${door.name} royal guests`}
          >
            {guests.map((c, i) => (
              <li
                key={c.id}
                data-card
                className="group/card relative h-[176px] w-[116px] sm:h-[188px] sm:w-[124px]"
              >
                {/* gentle drift once landed; pauses while the card is expanded */}
                <div
                  className="card-sway absolute inset-0"
                  style={
                    {
                      "--sway-d": `${6.4 + (i % 3) * 0.9}s`,
                      "--sway-delay": `${2 + i * 0.35}s`,
                    } as CSSProperties
                  }
                >
                  {/* Click/tap lifts this portrait to a centred view (KingdomLightbox);
                      tap again to return. Only the Book button there navigates. */}
                  <div
                    className="cardx absolute left-1/2 top-0 w-[116px] -translate-x-1/2 overflow-hidden rounded-[12px] border bg-gradient-to-b from-[#FBF3E2] to-[#F1E1C4] p-1.5 shadow-[0_8px_18px_-8px_rgba(0,0,0,0.55)] sm:w-[124px]"
                    style={{ borderColor: "color-mix(in oklab, var(--gold-500) 65%, transparent)" }}
                  >
                    <Link
                      to="/princess-events"
                      search={{ guest: c.name }}
                      hash="book"
                      aria-label={`Meet ${c.name}`}
                      aria-expanded={active === c.id}
                      onClick={(e) => {
                        e.preventDefault();
                        openCard(c.id);
                      }}
                      className="block overflow-hidden rounded-[8px] border border-[#C9A45C]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                    >
                      <img
                        src={c.photo ?? CARD_ART[c.id]}
                        alt={`${c.name} — ${c.gown}`}
                        loading="lazy"
                        width={124}
                        height={159}
                        className="aspect-[7/9] w-full object-cover object-top"
                      />
                    </Link>
                    <p className="mt-1.5 px-0.5 text-center font-display text-[0.74rem] font-semibold leading-tight text-[#4A3413]">
                      {c.name}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* zone CTA */}
          <div className={cn("mt-6 flex items-center gap-4", flip && "lg:justify-end")}>
            <a
              href="#book"
              className="btn-magic relative inline-flex items-center gap-2 rounded-[var(--radius-pill)] border px-6 py-2.5 text-sm font-semibold tracking-wide text-star-white transition-all duration-200 hover:shadow-[0_0_28px_rgba(207,168,98,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400"
              style={{
                borderColor: "color-mix(in oklab, var(--gold-500) 75%, transparent)",
                background:
                  "linear-gradient(120deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
              }}
            >
              Book This Kingdom
              <ArrowRight className="h-4 w-4 text-gold-400" aria-hidden />
            </a>
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-fg-on-ink/55">
              ✦ {guests.length} royal guest{guests.length === 1 ? "" : "s"} ✦
            </span>
          </div>
        </div>
      </div>

      {/* keep the open state for assistive tech */}
      <span className="sr-only" aria-live="polite">
        {open ? `${door.name} doors are open` : ""}
      </span>

      {/* Lightbox — the tapped portrait spins into the centre, then the detail
          panel opens to its right (card left, text + Book on right). Tap the
          portrait, the ✕, the backdrop, or Esc to spin back. Scrim is a soft
          neutral dim (no blue) so the kingdom behind keeps its look. Only the
          gold Book Now button leaves for the booking form. */}
      {active
        ? (() => {
            const c = guests.find((g) => g.id === active);
            if (!c) return null;
            return (
              <div
                className={cn(
                  "kd-lb-dialog fixed inset-0 z-[110] flex items-center justify-center p-5",
                  closing && "is-closing",
                )}
                style={{
                  background: "rgba(6,6,12,0.42)",
                  WebkitBackdropFilter: "blur(2px)",
                  backdropFilter: "blur(2px)",
                }}
                role="dialog"
                aria-modal="true"
                aria-label={c.name}
                onClick={closeCard}
              >
                <div
                  className={cn(
                    "kd-lb-box relative flex items-start rounded-[var(--radius-xl)] border-2 bg-gradient-to-b from-[#FBF3E2] to-[#F1E1C4] p-2.5 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)]",
                    closing && "is-closing",
                  )}
                  style={{ borderColor: "color-mix(in oklab, var(--gold-500) 70%, transparent)" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-label={`Close ${c.name}`}
                    onClick={closeCard}
                    className="absolute -right-3 -top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-ink-900/70 text-white shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>

                  {/* PORTRAIT — left, spins in/out; tap to close */}
                  <button
                    type="button"
                    aria-label={`Collapse ${c.name}`}
                    onClick={closeCard}
                    className="kd-lb-card block w-[132px] shrink-0 overflow-hidden rounded-[10px] border border-[#C9A45C]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 sm:w-[152px]"
                  >
                    <img
                      src={c.photo ?? CARD_ART[c.id]}
                      alt={`${c.name} — ${c.gown}`}
                      className="aspect-[7/9] w-full object-cover object-top"
                    />
                  </button>

                  {/* DETAIL PANEL — right, expands open via CSS max-width */}
                  <div className="kd-lb-panel">
                    <div className="flex w-[188px] flex-col px-3 py-1 text-left sm:w-[224px]">
                      <p className="font-display text-lg font-semibold leading-tight text-[#4A3413] sm:text-xl">
                        {c.name}
                      </p>
                      <p className="t-engrave mt-1 text-[0.58rem] tracking-[0.18em] text-gold-700">
                        {c.gown}
                      </p>
                      <p className="mt-2 text-[0.84rem] italic leading-snug text-[#5C4A28]">
                        &ldquo;{c.welcome}&rdquo;
                      </p>
                      <Link
                        to="/princess-events"
                        search={{ guest: c.name }}
                        hash="book"
                        onClick={() => setActive(null)}
                        className="btn-magic relative mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-[var(--radius-pill)] bg-gold-500 px-3 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
                      >
                        <Crown className="h-4 w-4" aria-hidden />
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()
        : null}
    </section>
  );
}

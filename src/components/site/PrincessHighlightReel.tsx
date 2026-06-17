import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Crown,
  MapPin,
  Play,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type ReelIcon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

export type RoyalFeatured = { title: string; subtitle: string; src: string };
export type RoyalMoment = { id: string; label: string; src: string; icon: ReelIcon };

const TRUST: { icon: ReelIcon; label: string }[] = [
  { icon: BadgeCheck, label: "Real Performers" },
  { icon: Crown, label: "Premium Gowns" },
  { icon: Sparkles, label: "Magical Moments" },
  { icon: MapPin, label: "Metro Vancouver Events" },
];

/* Placeholder reel source until final princess footage lands. */
const REEL_SRC = "/video/doors/glass-slipper-kingdom.mp4";

/**
 * PrincessHighlightReel — the princess page's "Real Fairytale Moments" gallery,
 * styled as a royal highlight reel (the royal twin of HeroHighlightReel: pink /
 * gold / navy, elegant — never hero red/blue). Desktop shows a tall featured
 * "Watch the Magic Reel" card beside a 3×2 grid of moments; below `lg` it becomes
 * a swipeable scroll-snap reel with gold arrows + a gold rail / magenta indicator.
 * The featured card opens a lazy video modal (nothing loads on page load).
 */
export function PrincessHighlightReel({
  featured,
  moments,
}: {
  featured: RoyalFeatured;
  moments: RoyalMoment[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const total = moments.length + 1;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const node = c as HTMLElement;
      const cc = node.offsetLeft + node.offsetWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    const node = el?.children[i] as HTMLElement | undefined;
    if (!el || !node) return;
    el.scrollTo({
      left: node.offsetLeft - (el.clientWidth - node.offsetWidth) / 2,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {/* Trust chips */}
      <Reveal y={14}>
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {TRUST.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-gold-500/30 bg-white/75 px-4 py-2 text-sm font-semibold text-fg shadow-[var(--shadow-sm)] backdrop-blur-sm"
            >
              <Icon className="h-4 w-4 text-gold-600" aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Desktop — featured card + 3×2 grid */}
      <div className="mt-9 hidden gap-4 lg:grid lg:grid-cols-[1.25fr_repeat(3,minmax(0,1fr))] lg:grid-rows-2">
        <Reveal as="div" className="col-start-1 row-span-2" y={26} scaleFrom={0.985}>
          <FeaturedCard featured={featured} onPlay={() => setOpen(true)} />
        </Reveal>
        {moments.map((m, i) => (
          <Reveal key={m.id} as="div" className="aspect-[16/10]" delay={120 + i * 80} y={22}>
            <MomentCard moment={m} />
          </Reveal>
        ))}
      </div>

      {/* Mobile / tablet — swipeable reel */}
      <Reveal className="mt-9 lg:hidden" y={20}>
        <div className="relative">
          <ul
            ref={trackRef}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Royal fairytale highlight reel"
          >
            <li className="w-[86%] shrink-0 snap-center sm:w-[62%]">
              <div className="aspect-[16/10]">
                <FeaturedCard featured={featured} onPlay={() => setOpen(true)} />
              </div>
            </li>
            {moments.map((m) => (
              <li key={m.id} className="w-[74%] shrink-0 snap-center sm:w-[48%]">
                <div className="aspect-[16/11]">
                  <MomentCard moment={m} />
                </div>
              </li>
            ))}
          </ul>

          {/* edge fades */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#FCEFF5] to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#FCEFF5] to-transparent"
          />

          {/* royal circular arrows */}
          <button
            type="button"
            aria-label="Previous moment"
            onClick={() => nudge(-1)}
            className="absolute left-0 top-[42%] z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-gold-500/55 bg-white/95 text-[var(--pp-magenta-deep)] shadow-[0_8px_20px_-8px_rgba(162,27,97,0.45)] backdrop-blur transition-all hover:border-[var(--pp-magenta)] hover:text-[var(--pp-magenta)] hover:shadow-[0_0_18px_-2px_rgba(162,27,97,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next moment"
            onClick={() => nudge(1)}
            className="absolute right-0 top-[42%] z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-gold-500/55 bg-white/95 text-[var(--pp-magenta-deep)] shadow-[0_8px_20px_-8px_rgba(162,27,97,0.45)] backdrop-blur transition-all hover:border-[var(--pp-magenta)] hover:text-[var(--pp-magenta)] hover:shadow-[0_0_18px_-2px_rgba(162,27,97,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {/* gold rail + magenta active indicator */}
        <div className="relative mt-4 flex items-center justify-center gap-2.5">
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[2px] w-[min(420px,88%)] -translate-x-1/2 -translate-y-1/2 rounded bg-gold-500/30"
          />
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to moment ${i + 1}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={cn(
                "relative h-2 rounded-full transition-all duration-300",
                i === active
                  ? "w-6 bg-[var(--pp-magenta)] shadow-[0_0_10px_-1px_rgba(162,27,97,0.6)]"
                  : "w-2 bg-gold-500/45 hover:bg-gold-500/75",
              )}
            />
          ))}
        </div>
      </Reveal>

      {/* lazy video modal */}
      {open ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink-900/90 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="The magic reel"
        >
          <video
            src={REEL_SRC}
            autoPlay
            controls
            playsInline
            preload="none"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88svh] w-auto max-w-[96vw] rounded-[var(--radius-lg)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
          />
          <button
            type="button"
            aria-label="Close video"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* The featured "Watch the Magic Reel" tile — gold/magenta royal styling. */
function FeaturedCard({ featured, onPlay }: { featured: RoyalFeatured; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group relative block h-full w-full overflow-hidden rounded-[22px] border-2 border-[var(--pp-magenta)]/40 text-left shadow-[0_28px_60px_-30px_rgba(162,27,97,0.45)] transition-all duration-300 hover:border-[var(--pp-magenta)]/65 hover:shadow-[0_30px_64px_-26px_rgba(162,27,97,0.55)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pp-magenta)]"
    >
      <img
        src={featured.src}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-[var(--ease-out)] group-hover:scale-105"
      />
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(56,18,42,0.3) 0%, rgba(56,18,42,0.08) 36%, rgba(56,18,42,0.58) 78%, rgba(40,12,32,0.92) 100%)",
        }}
      />
      {/* gold corner brackets */}
      {[
        "left-3 top-3 rounded-tl-[14px] border-l-2 border-t-2",
        "right-3 top-3 rounded-tr-[14px] border-r-2 border-t-2",
        "bottom-3 left-3 rounded-bl-[14px] border-b-2 border-l-2",
        "bottom-3 right-3 rounded-br-[14px] border-b-2 border-r-2",
      ].map((c) => (
        <span
          key={c}
          aria-hidden
          className={cn(
            "pointer-events-none absolute h-7 w-7 border-gold-400/85 transition-colors duration-300 group-hover:border-gold-300",
            c,
          )}
        />
      ))}
      {/* FEATURED badge */}
      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-gradient-to-r from-[var(--pp-magenta)] to-[var(--pp-magenta-deep)] px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_-8px_rgba(162,27,97,0.7)]">
        Featured
      </span>
      {/* play affordance */}
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/85 bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-[var(--pp-magenta)]">
          <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" aria-hidden />
        </span>
      </span>
      {/* caption */}
      <span className="absolute inset-x-0 bottom-0 block p-5">
        <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[#F6C9DC]">
          <Wand2 className="h-3.5 w-3.5" aria-hidden />
          Highlight Reel
        </span>
        <span className="mt-1.5 block font-display text-2xl leading-tight text-white">
          {featured.title}
        </span>
        <span className="mt-1 block text-sm leading-snug text-white/80">{featured.subtitle}</span>
      </span>
    </button>
  );
}

/* A supporting fairytale-moment tile — gold/magenta accents + a MAGICAL MOMENT badge. */
function MomentCard({ moment }: { moment: RoyalMoment }) {
  const Icon = moment.icon;
  return (
    <figure className="group relative h-full w-full overflow-hidden rounded-[16px] border border-gold-500/35 shadow-[0_18px_40px_-24px_rgba(162,27,97,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--pp-magenta)]/55 hover:shadow-[0_24px_48px_-22px_rgba(162,27,97,0.4)]">
      <img
        src={moment.src}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-[var(--ease-out)] group-hover:scale-[1.07]"
      />
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(56,18,42,0.04) 0%, rgba(56,18,42,0.04) 38%, rgba(56,18,42,0.55) 76%, rgba(40,12,32,0.9) 100%)",
        }}
      />
      {/* corner accents */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-2.5 top-2.5 h-5 w-5 rounded-tl-[10px] border-l-2 border-t-2 border-gold-400/60 transition-colors duration-300 group-hover:border-gold-300"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-2.5 right-2.5 h-5 w-5 rounded-br-[10px] border-b-2 border-r-2 border-[var(--pp-magenta)]/55 transition-colors duration-300 group-hover:border-[var(--pp-magenta)]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-3.5">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-500 to-gold-600 text-ink-900 shadow-[0_4px_10px_-4px_rgba(162,27,97,0.7)]">
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.5rem] font-bold uppercase tracking-[0.2em] text-[#F6C9DC]">
            Magical Moment
          </span>
          <span className="block truncate font-display text-base leading-tight text-white">
            {moment.label}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

import { useRef, useState, type ComponentType } from "react";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Drama,
  MapPin,
  Play,
  ShieldCheck,
} from "lucide-react";
import { useCinema } from "@/lib/cinema";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

type ReelIcon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

export type ReelFeatured = { title: string; subtitle: string; src: string };
export type ReelMoment = { id: string; label: string; src: string; icon: ReelIcon };

const TRUST: { icon: ReelIcon; label: string }[] = [
  { icon: ShieldCheck, label: "Real Performers" },
  { icon: Drama, label: "Premium Costumes" },
  { icon: MapPin, label: "Metro Vancouver Events" },
  { icon: Camera, label: "No Stock Photos" },
];

/**
 * HeroHighlightReel — the hero page's "Real Hero Moments" gallery, styled as a
 * premium mission highlight reel (sibling-in-spirit to the shared GalleryScroller
 * but hero-themed: light blue + navy + bold-red accents, never gold/comic-book).
 *
 * Desktop shows a tall featured "Watch the Mission Reel" card beside a 3×2 grid
 * of supporting moments. Below `lg` it becomes a swipeable scroll-snap reel with
 * command-style circular arrows and a blue rail / red active indicator. Cards are
 * image-driven placeholders, trivial to swap for final photography later.
 */
export function HeroHighlightReel({
  featured,
  moments,
}: {
  featured: ReelFeatured;
  moments: ReelMoment[];
}) {
  const { setCinema } = useCinema();
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const total = moments.length + 1; // featured + supporting

  const openReel = () => setCinema(true);

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
              className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--hero-blue)]/30 bg-white/70 px-4 py-2 text-sm font-semibold text-[var(--hero-navy)] shadow-[var(--shadow-sm)] backdrop-blur-sm"
            >
              <Icon className="h-4 w-4 text-[var(--hero-blue)]" aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </Reveal>

      {/* Desktop — featured card + 3×2 supporting grid */}
      <div className="mt-9 hidden gap-4 lg:grid lg:grid-cols-[1.25fr_repeat(3,minmax(0,1fr))] lg:grid-rows-2">
        <Reveal as="div" className="col-start-1 row-span-2" y={26} scaleFrom={0.985}>
          <FeaturedCard featured={featured} onPlay={openReel} />
        </Reveal>
        {moments.map((m, i) => (
          <Reveal key={m.id} as="div" className="aspect-[16/10]" delay={120 + i * 80} y={22}>
            <MomentCard moment={m} />
          </Reveal>
        ))}
      </div>

      {/* Mobile / tablet — swipeable reel with command controls */}
      <Reveal className="mt-9 lg:hidden" y={20}>
        <div className="relative">
          <ul
            ref={trackRef}
            onScroll={onScroll}
            className="flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Hero mission highlight reel"
          >
            <li className="w-[86%] shrink-0 snap-center sm:w-[62%]">
              <div className="aspect-[16/10]">
                <FeaturedCard featured={featured} onPlay={openReel} />
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
            className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[var(--hero-ice)] to-transparent"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[var(--hero-ice)] to-transparent"
          />

          {/* command-style circular arrows */}
          <button
            type="button"
            aria-label="Previous moment"
            onClick={() => nudge(-1)}
            className="absolute left-0 top-[42%] z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-[var(--hero-blue)]/50 bg-white/95 text-[var(--hero-blue-deep)] shadow-[0_8px_20px_-8px_rgba(23,54,93,0.5)] backdrop-blur transition-all hover:border-[var(--hero-red)] hover:text-[var(--hero-red)] hover:shadow-[0_0_18px_-2px_rgba(216,58,74,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-blue)]"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next moment"
            onClick={() => nudge(1)}
            className="absolute right-0 top-[42%] z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-2 border-[var(--hero-blue)]/50 bg-white/95 text-[var(--hero-blue-deep)] shadow-[0_8px_20px_-8px_rgba(23,54,93,0.5)] backdrop-blur transition-all hover:border-[var(--hero-red)] hover:text-[var(--hero-red)] hover:shadow-[0_0_18px_-2px_rgba(216,58,74,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-blue)]"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {/* blue rail + red active indicator */}
        <div className="relative mt-4 flex items-center justify-center gap-2.5">
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[2px] w-[min(420px,88%)] -translate-x-1/2 -translate-y-1/2 rounded bg-[var(--hero-blue)]/25"
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
                  ? "w-6 bg-[var(--hero-red)] shadow-[0_0_10px_-1px_rgba(216,58,74,0.7)]"
                  : "w-2 bg-[var(--hero-blue)]/45 hover:bg-[var(--hero-blue)]/75",
              )}
            />
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/* The featured "Watch the Mission Reel" tile — fills its wrapper (tall on the
   desktop grid, fixed-aspect in the mobile reel). Opens the shared cinema reel. */
function FeaturedCard({ featured, onPlay }: { featured: ReelFeatured; onPlay: () => void }) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group relative block h-full w-full overflow-hidden rounded-[22px] border-2 border-[var(--hero-red)]/45 text-left shadow-[0_28px_60px_-30px_rgba(216,58,74,0.5)] transition-all duration-300 hover:border-[var(--hero-red)]/70 hover:shadow-[0_30px_64px_-26px_rgba(216,58,74,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-red)]"
    >
      <img
        src={featured.src}
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-[var(--ease-out)] group-hover:scale-105"
      />
      {/* navy gradient for caption legibility */}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,23,51,0.34) 0%, rgba(11,23,51,0.1) 36%, rgba(11,23,51,0.6) 78%, rgba(11,23,51,0.92) 100%)",
        }}
      />
      {/* red corner brackets */}
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
            "pointer-events-none absolute h-7 w-7 border-[var(--hero-red)]/80 transition-colors duration-300 group-hover:border-[var(--hero-red)]",
            c,
          )}
        />
      ))}
      {/* FEATURED badge */}
      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-gradient-to-r from-[var(--hero-red)] to-[var(--hero-red-deep)] px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_-8px_rgba(216,58,74,0.7)]">
        Featured
      </span>
      {/* play affordance */}
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-white/85 bg-white/15 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white group-hover:bg-[var(--hero-red)]">
          <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" aria-hidden />
        </span>
      </span>
      {/* caption */}
      <span className="absolute inset-x-0 bottom-0 block p-5">
        <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-[var(--hero-red-soft)]">
          <Clapperboard className="h-3.5 w-3.5" aria-hidden />
          Highlight Reel
        </span>
        <span className="mt-1.5 block font-display text-2xl font-bold leading-tight text-white">
          {featured.title}
        </span>
        <span className="mt-1 block text-sm leading-snug text-white/80">{featured.subtitle}</span>
      </span>
    </button>
  );
}

/* A supporting mission-moment tile — fills its wrapper, with a MISSION MOMENT
   badge, navy caption gradient and red corner accents that warm on hover. */
function MomentCard({ moment }: { moment: ReelMoment }) {
  const Icon = moment.icon;
  return (
    <figure className="group relative h-full w-full overflow-hidden rounded-[16px] border border-[var(--hero-blue)]/35 shadow-[0_18px_40px_-24px_rgba(23,54,93,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--hero-red)]/55 hover:shadow-[0_24px_48px_-22px_rgba(216,58,74,0.45)]">
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
            "linear-gradient(180deg, rgba(11,23,51,0.05) 0%, rgba(11,23,51,0.05) 38%, rgba(11,23,51,0.58) 76%, rgba(11,23,51,0.9) 100%)",
        }}
      />
      {/* red corner accents */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-2.5 top-2.5 h-5 w-5 rounded-tl-[10px] border-l-2 border-t-2 border-[var(--hero-red)]/55 transition-colors duration-300 group-hover:border-[var(--hero-red)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-2.5 right-2.5 h-5 w-5 rounded-br-[10px] border-b-2 border-r-2 border-[var(--hero-blue)]/55 transition-colors duration-300 group-hover:border-[var(--hero-blue)]"
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2.5 p-3.5">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--hero-blue)] text-white shadow-[0_4px_10px_-4px_rgba(23,54,93,0.7)]">
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.5rem] font-bold uppercase tracking-[0.2em] text-[var(--hero-sky)]">
            Mission Moment
          </span>
          <span className="block truncate font-display text-base font-bold leading-tight text-white">
            {moment.label}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

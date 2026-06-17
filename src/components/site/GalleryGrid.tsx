import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type GalleryItem = {
  label: string;
  category: string;
  /** css color value for the accent wash / frame */
  accent: string;
  /** optional real image; when present it's shown instead of a gradient */
  src?: string;
};

function Tile({ item }: { item: GalleryItem }) {
  return (
    <figure className="group relative aspect-square overflow-hidden rounded-[var(--radius-lg)] border border-gold-500/25 bg-ink-900 shadow-[var(--shadow-sm)]">
      {item.src ? (
        <img
          src={item.src}
          alt={`${item.label} — ${item.category} character entertainment in Metro Vancouver`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          style={{
            background: `linear-gradient(155deg, var(--ink-800) 0%, var(--ink-700) 55%, ${item.accent} 165%)`,
          }}
        />
      )}
      {/* legibility scrim */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/10 to-transparent"
      />
      {/* accent top hairline */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ background: `linear-gradient(90deg, transparent, ${item.accent}, transparent)` }}
      />
      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
        <span className="t-engrave text-[0.6rem] tracking-[0.22em]" style={{ color: item.accent }}>
          {item.category}
        </span>
        <span className="font-display text-lg leading-tight text-star-white">{item.label}</span>
      </figcaption>
      <span className="absolute right-3 top-3 text-gold-400/70" aria-hidden>
        ✦
      </span>
    </figure>
  );
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, i) => (
        <Tile key={`${item.label}-${i}`} item={item} />
      ))}
    </div>
  );
}

/**
 * GalleryScroller — four tiles in view, the rest a sideways glide away.
 * Snap scrolling with arrow nudges; the thin gold scrollbar hints at more.
 */
export function GalleryScroller({ items }: { items: GalleryItem[] }) {
  const trackRef = useRef<HTMLUListElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <ul
        ref={trackRef}
        className="scroll-gold -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3"
        aria-label="Event photo gallery"
      >
        {items.map((item, i) => (
          <li
            key={`${item.label}-${i}`}
            className="w-[78%] shrink-0 snap-start sm:w-[42%] lg:w-[calc((100%-3rem)/4)]"
          >
            <Tile item={item} />
          </li>
        ))}
      </ul>

      {/* edge fades */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[rgba(255,250,252,0.9)] to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[rgba(255,250,252,0.9)] to-transparent"
      />

      {/* arrows */}
      <button
        type="button"
        aria-label="Scroll gallery left"
        onClick={() => nudge(-1)}
        className="btn-magic absolute -left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/60 bg-white/95 text-fg shadow-[var(--shadow-md)] transition-all hover:text-fg-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Scroll gallery right"
        onClick={() => nudge(1)}
        className="btn-magic absolute -right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/60 bg-white/95 text-fg shadow-[var(--shadow-md)] transition-all hover:text-fg-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}

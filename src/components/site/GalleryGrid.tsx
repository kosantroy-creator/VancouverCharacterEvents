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

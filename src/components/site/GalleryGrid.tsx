export type GalleryItem = {
  label: string;
  category: string;
  /** css color value for the accent wash */
  accent: string;
};

function PlaceholderTile({ item }: { item: GalleryItem }) {
  return (
    <figure className="group relative aspect-square overflow-hidden rounded-[var(--radius-lg)] border border-ink-600/40">
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{
          background: `linear-gradient(155deg, var(--ink-800) 0%, var(--ink-700) 55%, ${item.accent} 160%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_45%)]" />
      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
        <span className="t-engrave text-[0.6rem] tracking-[0.22em]" style={{ color: item.accent }}>
          {item.category}
        </span>
        <span className="font-display text-lg leading-tight text-star-white">{item.label}</span>
      </figcaption>
      <span className="absolute right-3 top-3 text-gold-500/60" aria-hidden>
        ✦
      </span>
    </figure>
  );
}

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, i) => (
        <PlaceholderTile key={`${item.label}-${i}`} item={item} />
      ))}
    </div>
  );
}

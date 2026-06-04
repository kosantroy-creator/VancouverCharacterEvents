type TrustBarProps = {
  items: string[];
  onInk?: boolean;
};

export function TrustBar({ items, onInk = false }: TrustBarProps) {
  return (
    <ul
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-5"
      aria-label="Event types we serve"
    >
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-3">
          {i > 0 ? (
            <span className="text-gold-500/70" aria-hidden>
              ✦
            </span>
          ) : null}
          <span
            className={`t-engrave text-[0.72rem] tracking-[0.2em] sm:text-[0.8rem] ${
              onInk ? "text-fg-on-ink/80" : "text-fg-2"
            }`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

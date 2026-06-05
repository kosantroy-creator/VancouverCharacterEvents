import { useEffect, useRef, useState } from "react";

type TrustBarProps = {
  items: string[];
  onInk?: boolean;
  animate?: boolean;
};

export function TrustBar({ items, onInk = false, animate = false }: TrustBarProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [shown, setShown] = useState(!animate);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <ul
      ref={ref}
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 sm:gap-x-5"
      aria-label="Event types we serve"
    >
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-center gap-3 transition-all duration-700 ease-out"
          style={
            animate
              ? {
                  opacity: shown ? 1 : 0,
                  transform: shown ? "translateY(0)" : "translateY(12px)",
                  transitionDelay: `${i * 120}ms`,
                }
              : undefined
          }
        >
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

import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { storybookWorlds } from "@/lib/site-data";

function WorldCard({ world, index }: { world: (typeof storybookWorlds)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [risen, setRisen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRisen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRisen(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <li
      ref={ref}
      className="group [perspective:1200px]"
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <Link
        to={`/${world.slug}`}
        className="block h-full origin-bottom rounded-[var(--radius-xl)] border border-gold-500/25 bg-ink-700/55 p-6 text-center shadow-[var(--shadow-md)] transition-all duration-700 ease-out hover:-translate-y-2 hover:border-gold-500/60 hover:shadow-[var(--shadow-ink)]"
        style={{
          transform: risen
            ? "translateY(0) rotateX(0deg)"
            : "translateY(28px) rotateX(28deg)",
          opacity: risen ? 1 : 0,
        }}
      >
        <div className="relative mx-auto h-24 w-24">
          <span
            className="absolute inset-0 rounded-full opacity-50 blur-xl transition-opacity duration-300 group-hover:opacity-90"
            style={{ background: `var(--chapter-${world.accent})` }}
            aria-hidden
          />
          <img
            src={world.medallion}
            alt={`${world.name} medallion`}
            className="relative h-24 w-24 object-contain transition-transform duration-500 group-hover:scale-110"
            width={96}
            height={96}
            loading="lazy"
          />
        </div>
        <h3 className="mt-4 font-display text-2xl text-star-white">{world.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-on-ink/75">{world.blurb}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400">
          Explore
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </li>
  );
}

export function StorybookWorlds() {
  return (
    <div className="relative">
      {/* open-book base */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-24 -z-0 mx-auto max-w-5xl rounded-[var(--radius-2xl)] border border-gold-500/15 bg-ink-800/40 shadow-[var(--shadow-ink)]">
        <div className="absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 bg-gold-500/20" aria-hidden />
      </div>
      <ul className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {storybookWorlds.map((world, i) => (
          <WorldCard key={world.slug} world={world} index={i} />
        ))}
      </ul>
    </div>
  );
}

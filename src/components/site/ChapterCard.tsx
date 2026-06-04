import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Chapter } from "@/lib/site-data";

export function ChapterCard({ chapter }: { chapter: Chapter }) {
  const accent = `var(--chapter-${chapter.accent})`;
  return (
    <Link
      to={`/${chapter.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-ink-600/40 bg-ink-700/60 p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-[var(--glow-gold)]"
      style={{ ["--c" as string]: accent }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 opacity-80"
        style={{ background: accent }}
      />
      <div
        className="relative mb-5 h-24 w-24 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-ink-700 transition-transform duration-300 group-hover:scale-105"
        style={{ ["--tw-ring-color" as string]: accent }}
      >
        <img
          src={chapter.medallion}
          alt={`${chapter.name} emblem`}
          className="h-full w-full object-cover"
          width={96}
          height={96}
          loading="lazy"
        />
      </div>
      <h3 className="font-display text-2xl text-star-white">{chapter.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-on-ink/70">{chapter.shortDescription}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: accent }}>
        Explore this chapter
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

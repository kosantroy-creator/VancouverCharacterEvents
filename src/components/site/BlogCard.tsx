import { Link } from "@tanstack/react-router";
import { BookOpen, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${d}, ${y}`;
}

/**
 * BlogCard — a storybook "journal" entry. No stock photos; a themed accent
 * header keeps it premium and trust-safe while real imagery is added later.
 */
export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border-soft bg-surface shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[var(--shadow-md)]"
    >
      <div
        className="relative h-36 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, color-mix(in oklab, ${post.accent} 34%, var(--ivory)) 0%, var(--warm-white) 100%)`,
        }}
      >
        <div aria-hidden className="tx-filigree absolute inset-0" style={{ opacity: 0.5 }} />
        <BookOpen
          aria-hidden
          className="absolute -right-3 -top-3 h-24 w-24 opacity-15"
          style={{ color: post.accent }}
        />
        <span
          className="absolute left-4 top-4 rounded-pill bg-surface/90 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] shadow-[var(--shadow-sm)]"
          style={{ color: `color-mix(in oklab, ${post.accent} 70%, var(--ink-800))` }}
        >
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl leading-tight text-fg transition-colors duration-200 group-hover:text-fg-gold">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-2">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between border-t border-[var(--hairline)] pt-3 text-xs text-fg-3">
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-fg-gold">
            {post.readMinutes} min read
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

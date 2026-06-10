import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { BlogPost } from "@/lib/blog-data";
import { chapterBySlug } from "@/lib/site-data";
import { CTAButton } from "./CTAButton";
import { Sparkles } from "./Scenery";
import { formatDate } from "./BlogCard";

function relatedLabel(slug: string) {
  return chapterBySlug(slug)?.name ?? "Learn more";
}

/** Reusable, readable article page — warm editorial layout + internal links. */
export function BlogPostTemplate({ post }: { post: BlogPost }) {
  return (
    <article>
      {/* Header */}
      <header
        className="relative isolate overflow-hidden"
        style={{
          background: `linear-gradient(165deg, color-mix(in oklab, ${post.accent} 22%, var(--ivory)) 0%, var(--warm-white) 70%, var(--parchment) 100%)`,
        }}
      >
        <div aria-hidden className="tx-filigree absolute inset-0" style={{ opacity: 0.06 }} />
        <Sparkles className="-z-0" color={post.accent} count={4} />
        <div className="relative mx-auto max-w-3xl px-5 pb-12 pt-28 sm:px-6 md:pt-32">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg-gold transition-colors hover:text-gold-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            The Journal
          </Link>
          <span
            className="mt-5 inline-block rounded-pill bg-surface/85 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] shadow-[var(--shadow-sm)]"
            style={{ color: `color-mix(in oklab, ${post.accent} 70%, var(--ink-800))` }}
          >
            {post.category}
          </span>
          <h1 className="t-display mt-4 text-4xl leading-[1.08] text-fg md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-fg-2">{post.description}</p>
          <p className="mt-5 text-sm text-fg-3">
            {formatDate(post.date)} · {post.readMinutes} min read
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="bg-ivory">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6">
          {post.body.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2 key={i} className="t-display mb-3 mt-10 text-2xl text-fg md:text-3xl">
                  {block.text}
                </h2>
              );
            }
            if (block.type === "ul") {
              return (
                <ul key={i} className="my-5 space-y-2.5">
                  {block.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-fg-2">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                      <span className="leading-relaxed">{it}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="my-4 text-lg leading-relaxed text-fg-2">
                {block.text}
              </p>
            );
          })}

          {/* Internal links */}
          {post.related.length ? (
            <div className="mt-12 rounded-[var(--radius-xl)] border border-border-soft bg-surface p-6 shadow-[var(--shadow-sm)]">
              <p className="t-eyebrow text-fg-gold">Keep exploring</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {post.related.map((slug) => (
                  <li key={slug}>
                    <Link
                      to={`/${slug}`}
                      className="inline-flex items-center gap-1.5 rounded-pill border border-border-strong px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-gold-500 hover:text-fg-gold"
                    >
                      {relatedLabel(slug)}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/gallery"
                    className="inline-flex items-center gap-1.5 rounded-pill border border-border-strong px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-gold-500 hover:text-fg-gold"
                  >
                    See the gallery
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {/* CTA */}
      <section
        className="relative isolate overflow-hidden"
        style={{ background: "var(--grad-champagne)" }}
      >
        <div aria-hidden className="tx-filigree absolute inset-0" />
        <div className="relative mx-auto max-w-2xl px-5 py-14 text-center sm:px-6">
          <h2 className="t-display text-3xl text-fg md:text-4xl">
            Planning an event in Vancouver?
          </h2>
          <p className="mt-3 text-fg-2">
            Tell us your date and details and we&apos;ll match you with the perfect experience
            across Metro Vancouver and the Lower Mainland.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton to="/contact" size="lg">
              Book an Experience
            </CTAButton>
            <CTAButton to="/contact" variant="ghost" size="lg">
              Talk to our team
            </CTAButton>
          </div>
        </div>
      </section>
    </article>
  );
}

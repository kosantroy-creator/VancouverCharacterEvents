import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import type { Chapter } from "@/lib/site-data";
import { storybookWorlds } from "@/lib/site-data";
import { blogPosts } from "@/lib/blog-data";
import { Section, SectionHeading, GoldRule } from "./Section";
import { CTAButton } from "./CTAButton";
import { GalleryGrid, type GalleryItem } from "./GalleryGrid";
import { FaqAccordion } from "./FaqAccordion";
import { BlogCard } from "./BlogCard";
import { Sparkles } from "./Scenery";

export function ServicePageTemplate({
  chapter,
  hideHero = false,
}: {
  chapter: Chapter;
  /** Skip the generic service hero — used when a page supplies its own (e.g. HarveyHero). */
  hideHero?: boolean;
}) {
  const accent = `var(--chapter-${chapter.accent})`;
  const scene = storybookWorlds.find((w) => w.slug === chapter.slug)?.scene;

  const galleryItems: GalleryItem[] = [
    "Entrance moment",
    "Group photo",
    "Interactive activity",
    "Candid reaction",
  ].map((label) => ({ label, category: chapter.navLabel, accent, src: scene }));

  // Related journal posts (internal links), topped up to three.
  const related = [
    ...blogPosts.filter((p) => p.related.includes(chapter.slug)),
    ...blogPosts.filter((p) => !p.related.includes(chapter.slug)),
  ].slice(0, 3);

  return (
    <>
      {/* Service hero — light, accent-washed. Skipped when the page brings its own. */}
      {!hideHero && (
        <section
          className="relative isolate overflow-hidden"
          style={{
            background: `linear-gradient(165deg, color-mix(in oklab, ${accent} 20%, var(--ivory)) 0%, var(--warm-white) 68%, var(--parchment) 100%)`,
          }}
        >
          <div aria-hidden className="tx-filigree absolute inset-0" style={{ opacity: 0.06 }} />
          <Sparkles color={accent} count={4} />
          <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-16 pt-28 sm:px-6 md:pt-32 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p
                  className="t-eyebrow"
                  style={{ color: `color-mix(in oklab, ${accent} 72%, var(--ink-800))` }}
                >
                  {chapter.tagline}
                </p>
                <h1 className="mt-4 font-display text-4xl leading-tight text-fg md:text-6xl">
                  {chapter.name}
                </h1>
                <p className="mt-4 font-display text-2xl italic text-fg-2 md:text-3xl">
                  {chapter.emotionalHeadline}
                </p>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-2">{chapter.intro}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <CTAButton to="/contact" size="lg">
                    Book this experience
                  </CTAButton>
                  <Link
                    to="/"
                    hash="choose-your-chapter"
                    className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-border-strong px-8 py-3.5 text-base font-semibold text-fg transition-colors hover:border-gold-500 hover:text-fg-gold"
                  >
                    <ArrowLeft className="h-4 w-4" /> All chapters
                  </Link>
                </div>
              </div>
              <div className="hidden justify-self-center lg:block">
                <div
                  className="overflow-hidden rounded-full bg-surface p-2 shadow-[var(--shadow-lg)]"
                  style={{ outline: `2px solid ${accent}`, outlineOffset: "6px" }}
                >
                  <img
                    src={scene ?? chapter.medallion}
                    alt={`${chapter.name} in Metro Vancouver`}
                    className="h-56 w-56 rounded-full object-cover"
                    width={224}
                    height={224}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What this experience is */}
      <Section tone="ivory">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              align="left"
              eyebrow="What this experience is"
              title="Magic with a plan behind it"
            />
            <p className="mt-5 text-lg leading-relaxed text-fg-2">{chapter.whatItIs}</p>
          </div>
          <div className="rounded-[var(--radius-xl)] border border-border-soft bg-surface p-7 shadow-[var(--shadow-sm)]">
            <h3
              className="t-engrave text-xs tracking-[0.22em]"
              style={{ color: chapter.accent === "corporate" ? "var(--gold-700)" : accent }}
            >
              Best for
            </h3>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {chapter.bestFor.map((b) => (
                <span
                  key={b}
                  className="rounded-[var(--radius-pill)] border px-4 py-1.5 text-sm font-medium text-fg"
                  style={{ borderColor: accent, background: "var(--warm-white)" }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* What's included */}
      <Section tone="parchment">
        <SectionHeading eyebrow="What's included" title="Every visit, thoughtfully prepared" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapter.included.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-border-soft bg-surface p-5 shadow-[var(--shadow-sm)]"
            >
              <span
                className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: `color-mix(in oklab, ${accent} 16%, transparent)`,
                  color: accent,
                }}
              >
                <Check className="h-4 w-4" />
              </span>
              <span className="text-base text-fg">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience options */}
      <Section tone="sky">
        <SectionHeading
          eyebrow="Experience options"
          title="Choose the right format"
          description="Three polished formats to match the scale of your event. Pricing is tailored to each booking."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {chapter.packages.map((pkg, i) => (
            <div
              key={pkg.name}
              className={`relative flex flex-col rounded-[var(--radius-xl)] border bg-surface p-7 shadow-[var(--shadow-sm)] ${
                i === 1 ? "md:-translate-y-2" : ""
              }`}
              style={i === 1 ? { borderColor: accent } : { borderColor: "var(--border-soft)" }}
            >
              {i === 1 ? (
                <span
                  className="absolute right-5 top-5 rounded-[var(--radius-pill)] px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em]"
                  style={{ background: accent, color: "var(--ink-900)" }}
                >
                  Most popular
                </span>
              ) : null}
              <h3 className="font-display text-2xl text-fg">{pkg.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{pkg.blurb}</p>
              <ul className="mt-5 flex-1 space-y-2.5">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-fg-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} /> {h}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <CTAButton to="/contact" variant="ghost" className="w-full">
                  Inquire for Availability
                </CTAButton>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Gallery preview */}
      <Section tone="ivory">
        <SectionHeading
          eyebrow="Real moments"
          title="A glimpse of the experience"
          description="Sample moments — real event photos are added as each chapter grows."
        />
        <div className="mt-10">
          <GalleryGrid items={galleryItems} />
        </div>
        <div className="mt-8 text-center">
          <CTAButton to="/gallery" variant="ghost">
            View the full gallery
          </CTAButton>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="parchment">
        <SectionHeading eyebrow="Good to know" title="Frequently asked" />
        <div className="mx-auto mt-8 max-w-3xl">
          <FaqAccordion faqs={chapter.faqs} />
        </div>
      </Section>

      {/* From the journal — internal links */}
      <Section tone="ivory">
        <SectionHeading
          eyebrow="From the journal"
          title="Planning ideas & guides"
          description="Helpful, brand-safe planning tips for events across Metro Vancouver."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {related.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="champagne" className="text-center">
        <GoldRule className="mx-auto max-w-xs" />
        <h2 className="font-display text-3xl text-fg md:text-4xl">
          Ready to bring this chapter to life?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-fg-2">
          Tell us about your event and we&apos;ll help craft an unforgettable{" "}
          {chapter.name.toLowerCase()} experience across Metro Vancouver.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton to="/contact" size="lg">
            Start your booking
          </CTAButton>
          <CTAButton to="/" variant="ghost" size="lg">
            Explore more chapters
          </CTAButton>
        </div>
      </Section>
    </>
  );
}

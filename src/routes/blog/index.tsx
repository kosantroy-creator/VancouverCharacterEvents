import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { BlogCard } from "@/components/site/BlogCard";
import { Reveal } from "@/components/site/Reveal";
import { sortedPosts, blogCategories } from "@/lib/blog-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "The Journal | Vancouver Character Events Planning Guides" },
      {
        name: "description",
        content:
          "Helpful, brand-safe event-planning guides from Vancouver Character Events — birthday party ideas, character tips, school and corporate event inspiration across Metro Vancouver.",
      },
      { property: "og:title", content: "The Journal | Vancouver Character Events" },
      {
        property: "og:description",
        content:
          "Event-planning ideas and guides for parties, schools, malls, and corporate events across Metro Vancouver.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [active, setActive] = useState<string>("All");
  const tabs = useMemo(() => ["All", ...blogCategories], []);
  const filtered = useMemo(
    () => (active === "All" ? sortedPosts : sortedPosts.filter((p) => p.category === active)),
    [active],
  );

  return (
    <>
      <Section tone="parchment" sparkle className="!pb-10">
        <SectionHeading
          eyebrow="The Journal"
          title="Vancouver event planning guides"
          description="A branded planning journal for parents and event planners — practical, brand-safe ideas for unforgettable parties, school visits, and city events across Metro Vancouver."
        />
      </Section>

      <Section tone="ivory" className="!pt-2">
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={cn(
                "rounded-[var(--radius-pill)] border px-4 py-2 text-sm font-semibold transition-colors",
                active === tab
                  ? "border-gold-500 bg-gold-500 text-ink-900"
                  : "border-border-strong text-fg-2 hover:border-gold-500/60 hover:text-fg-gold",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 80}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

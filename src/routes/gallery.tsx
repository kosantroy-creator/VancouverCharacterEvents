import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { GalleryGrid, type GalleryItem } from "@/components/site/GalleryGrid";
import { CTAButton } from "@/components/site/CTAButton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Vancouver Character Events" },
      {
        name: "description",
        content:
          "A preview gallery of premium character experiences across Metro Vancouver — princesses, heroes, dinosaurs, mermaids, mascots, holiday, and corporate events.",
      },
      { property: "og:title", content: "Gallery | Vancouver Character Events" },
      { property: "og:description", content: "A glimpse of the magical moments we create across Metro Vancouver." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const tabs = ["All", "Princesses", "Heroes", "Dinosaurs", "Mermaids", "Mascots", "Holidays", "Corporate"];

const items: GalleryItem[] = [
  { label: "Royal entrance", category: "Princesses", accent: "var(--chapter-princess)" },
  { label: "Tea party magic", category: "Princesses", accent: "var(--chapter-princess)" },
  { label: "Hero training mission", category: "Heroes", accent: "var(--chapter-hero)" },
  { label: "Team challenge", category: "Heroes", accent: "var(--chapter-hero)" },
  { label: "Dino meet & greet", category: "Dinosaurs", accent: "var(--chapter-dinosaur)" },
  { label: "Trainer Q&A", category: "Dinosaurs", accent: "var(--chapter-dinosaur)" },
  { label: "Under-the-sea photos", category: "Mermaids", accent: "var(--chapter-mermaid)" },
  { label: "Poolside wonder", category: "Mermaids", accent: "var(--chapter-mermaid)" },
  { label: "Mall appearance", category: "Mascots", accent: "var(--chapter-mascot)" },
  { label: "Crowd favourite", category: "Mascots", accent: "var(--chapter-mascot)" },
  { label: "Winter celebration", category: "Holidays", accent: "var(--chapter-holiday)" },
  { label: "Seasonal greeting", category: "Holidays", accent: "var(--chapter-holiday)" },
  { label: "City festival", category: "Corporate", accent: "var(--chapter-corporate)" },
  { label: "Brand activation", category: "Corporate", accent: "var(--chapter-corporate)" },
  { label: "Group photo moment", category: "Corporate", accent: "var(--chapter-festival)" },
  { label: "Birthday reactions", category: "Princesses", accent: "var(--chapter-princess)" },
];

function GalleryPage() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [active],
  );

  return (
    <>
      <Section tone="ink" className="!pb-10">
        <SectionHeading
          onInk
          eyebrow="Real moments"
          title="The Gallery"
          description="A preview of the experiences we create across Metro Vancouver. This space is built so real event photos and videos drop right in."
        />
      </Section>

      <Section tone="ink" className="!pt-0">
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={cn(
                "rounded-[var(--radius-pill)] border px-5 py-2 text-sm font-semibold transition-colors",
                active === tab
                  ? "border-gold-500 bg-gold-500 text-ink-900"
                  : "border-ink-600 text-fg-on-ink/75 hover:border-gold-500/60 hover:text-gold-400",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <GalleryGrid items={filtered} />
        <div className="mt-14 text-center">
          <p className="mx-auto max-w-xl text-fg-on-ink/75">
            Have an event in mind? Let's create moments worth photographing.
          </p>
          <div className="mt-6">
            <CTAButton to="/contact" size="lg">Book an Experience</CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}

import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { GalleryGrid, type GalleryItem } from "@/components/site/GalleryGrid";
import { CTAButton } from "@/components/site/CTAButton";
import { cn } from "@/lib/utils";
import princessScene from "@/assets/worlds/princess.jpg";
import heroScene from "@/assets/worlds/hero.jpg";
import dinosaurScene from "@/assets/worlds/dinosaur.jpg";
import mermaidScene from "@/assets/worlds/mermaid.jpg";
import mascotScene from "@/assets/worlds/mascot.jpg";
import holidayScene from "@/assets/worlds/holiday.jpg";
import corporateScene from "@/assets/worlds/corporate.jpg";

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
      {
        property: "og:description",
        content: "A glimpse of the magical moments we create across Metro Vancouver.",
      },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const tabs = [
  "All",
  "Princesses",
  "Heroes",
  "Dinosaurs",
  "Mermaids",
  "Mascots",
  "Holidays",
  "Corporate",
];

const items: GalleryItem[] = [
  {
    src: princessScene,
    label: "Royal entrance",
    category: "Princesses",
    accent: "var(--chapter-princess)",
  },
  {
    src: princessScene,
    label: "Tea party magic",
    category: "Princesses",
    accent: "var(--chapter-princess)",
  },
  {
    src: heroScene,
    label: "Hero training mission",
    category: "Heroes",
    accent: "var(--chapter-hero)",
  },
  { src: heroScene, label: "Team challenge", category: "Heroes", accent: "var(--chapter-hero)" },
  {
    src: dinosaurScene,
    label: "Dino meet & greet",
    category: "Dinosaurs",
    accent: "var(--chapter-dinosaur)",
  },
  {
    src: dinosaurScene,
    label: "Trainer Q&A",
    category: "Dinosaurs",
    accent: "var(--chapter-dinosaur)",
  },
  {
    src: mermaidScene,
    label: "Under-the-sea photos",
    category: "Mermaids",
    accent: "var(--chapter-mermaid)",
  },
  {
    src: mermaidScene,
    label: "Poolside wonder",
    category: "Mermaids",
    accent: "var(--chapter-mermaid)",
  },
  {
    src: mascotScene,
    label: "Mall appearance",
    category: "Mascots",
    accent: "var(--chapter-mascot)",
  },
  {
    src: mascotScene,
    label: "Crowd favourite",
    category: "Mascots",
    accent: "var(--chapter-mascot)",
  },
  {
    src: holidayScene,
    label: "Winter celebration",
    category: "Holidays",
    accent: "var(--chapter-holiday)",
  },
  {
    src: holidayScene,
    label: "Seasonal greeting",
    category: "Holidays",
    accent: "var(--chapter-holiday)",
  },
  {
    src: corporateScene,
    label: "City festival",
    category: "Corporate",
    accent: "var(--chapter-corporate)",
  },
  {
    src: corporateScene,
    label: "Brand activation",
    category: "Corporate",
    accent: "var(--chapter-corporate)",
  },
];

function GalleryPage() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? items : items.filter((i) => i.category === active)),
    [active],
  );

  return (
    <>
      <Section tone="parchment" sparkle className="!pb-10">
        <SectionHeading
          eyebrow="A glimpse of the magic"
          title="The Gallery"
          description="A preview of the experiences we create across Metro Vancouver. This space is built so real event photos and videos drop right in."
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
                "rounded-[var(--radius-pill)] border px-5 py-2 text-sm font-semibold transition-colors",
                active === tab
                  ? "border-gold-500 bg-gold-500 text-ink-900"
                  : "border-border-strong text-fg-2 hover:border-gold-500/60 hover:text-fg-gold",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <GalleryGrid items={filtered} />
        <div className="mt-14 text-center">
          <p className="mx-auto max-w-xl text-fg-2">
            Have an event in mind? Let&apos;s create moments worth photographing.
          </p>
          <div className="mt-6">
            <CTAButton to="/contact" size="lg">
              Book an Experience
            </CTAButton>
          </div>
        </div>
      </Section>
    </>
  );
}

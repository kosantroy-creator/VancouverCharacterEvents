import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/ServicePageTemplate";
import { WonderverseHero } from "@/components/site/WonderverseHero";
import { WonderverseTrust } from "@/components/site/WonderverseTrust";
import { WonderverseCast } from "@/components/site/WonderverseCast";
import { chapterBySlug } from "@/lib/site-data";

const chapter = chapterBySlug("specialty-events")!;

export const Route = createFileRoute("/specialty-events")({
  head: () => ({
    meta: [
      { title: `${chapter.name} | Vancouver Character Events` },
      { name: "description", content: chapter.shortDescription },
      { property: "og:title", content: `${chapter.name} | Vancouver Character Events` },
      { property: "og:description", content: chapter.shortDescription },
      { property: "og:url", content: `/${chapter.slug}` },
      { property: "og:image", content: chapter.medallion },
    ],
    links: [{ rel: "canonical", href: `/${chapter.slug}` }],
  }),
  component: WonderversePage,
});

function WonderversePage() {
  return (
    <>
      {/* Bespoke celestial-gateway hero — the page brings its own above the
          generic template (whose service hero is dropped). */}
      <WonderverseHero />
      {/* Small trust strip — sibling of the Mermaid / Jurassic trust bands. */}
      <WonderverseTrust />
      {/* "Summon the Cast" — the character-reveal stage (energy-burst cards). */}
      <WonderverseCast />
      <ServicePageTemplate chapter={chapter} hideHero />
    </>
  );
}

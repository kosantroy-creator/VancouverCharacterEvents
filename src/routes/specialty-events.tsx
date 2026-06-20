import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/ServicePageTemplate";
import { WonderverseHero } from "@/components/site/WonderverseHero";
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
      <ServicePageTemplate chapter={chapter} hideHero />
    </>
  );
}

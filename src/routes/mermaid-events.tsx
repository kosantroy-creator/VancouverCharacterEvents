import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/ServicePageTemplate";
import { MermaidHero } from "@/components/site/MermaidHero";
import { MermaidTrustStrip } from "@/components/site/MermaidTrustStrip";
import { chapterBySlug } from "@/lib/site-data";

const chapter = chapterBySlug("mermaid-events")!;

export const Route = createFileRoute("/mermaid-events")({
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
  component: MermaidPage,
});

function MermaidPage() {
  return (
    <>
      {/* 1 · Mermaid Cove hero — the looping cove video + premium lockup. */}
      <MermaidHero />
      {/* 2 · Trust strip — poolside magic, properly guided. */}
      <MermaidTrustStrip />
      {/* The remaining sections still come from the generic template for now
          (its hero is dropped — the page brings its own above). */}
      <ServicePageTemplate chapter={chapter} hideHero />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/ServicePageTemplate";
import { MermaidHero } from "@/components/site/MermaidHero";
import { MermaidTrustStrip } from "@/components/site/MermaidTrustStrip";
import { MermaidDifference } from "@/components/site/MermaidDifference";
import { MermaidMeet } from "@/components/site/MermaidMeet";
import { MermaidJourney } from "@/components/site/MermaidJourney";
import { MermaidPricing } from "@/components/site/MermaidPricing";
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
      {/* 3 · Meet the Cove Mermaids — three mermaid character cards + pirate support. */}
      <MermaidMeet />
      {/* 4 · What Makes Mermaid Cove Different — story panel + duo comparison. */}
      <MermaidDifference />
      {/* 5 · What Happens During a Mermaid Visit — the five-step cove journey. */}
      <MermaidJourney />
      {/* 6 · Choose Your Cove Adventure — the three-package pricing passes. */}
      <MermaidPricing />
      {/* The remaining sections still come from the generic template for now
          (its hero is dropped — the page brings its own above). The page tells its
          own story / pricing, so the generic "what it is", "what's included",
          "experience options", and "from the journal" blocks are turned off. */}
      <ServicePageTemplate
        chapter={chapter}
        hideHero
        hideWhatItIs
        hideIncluded
        hidePackages
        hideJournal
      />
    </>
  );
}

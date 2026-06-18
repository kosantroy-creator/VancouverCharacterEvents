import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/ServicePageTemplate";
import { JurassicGateHero } from "@/components/site/JurassicGateHero";
import { ExpeditionCredentials } from "@/components/site/ExpeditionCredentials";
import { HarveyHero } from "@/components/site/HarveyHero";
import { chapterBySlug } from "@/lib/site-data";

const chapter = chapterBySlug("dinosaur-events")!;

export const Route = createFileRoute("/dinosaur-events")({
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
  component: DinosaurPage,
});

function DinosaurPage() {
  return (
    <>
      {/* 1 · Enter the expedition — the bright gate flagship hero. */}
      <JurassicGateHero />
      {/* 2 · Expedition Credentials — the trust-badge checkpoint bridge that
          blends the bright gate down into the misty jungle. */}
      <ExpeditionCredentials />
      {/* 3 · Move deeper / something is watching — the suspenseful eye section. */}
      <HarveyHero />
      {/* 4 · The reveal & details. The CTAs above scroll here. */}
      <div id="expedition" className="scroll-mt-24">
        <ServicePageTemplate chapter={chapter} hideHero />
      </div>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/ServicePageTemplate";
import { JurassicGateHero } from "@/components/site/JurassicGateHero";
import { ExpeditionCredentials } from "@/components/site/ExpeditionCredentials";
import { HarveyHero } from "@/components/site/HarveyHero";
import { HarveyReveal } from "@/components/site/HarveyReveal";
import { TrainerAcademy } from "@/components/site/TrainerAcademy";
import { DinoComparison } from "@/components/site/DinoComparison";
import { ExpeditionPackages } from "@/components/site/ExpeditionPackages";
import { ExpeditionGallery } from "@/components/site/ExpeditionGallery";
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
      {/* 4 · The cinematic reveal — trail signs → massive shadow → Meet Harvey
          (carries the #meet-harvey anchor the hero CTAs scroll to). */}
      <HarveyReveal />
      {/* 5 · How the event works — the Junior Dinosaur Trainer Academy trail. */}
      <TrainerAcademy />
      {/* 6 · Positioning — why Harvey is more than a mascot appearance. */}
      <DinoComparison />
      {/* 7 · Pricing — choose your expedition (carries the #expedition anchor). */}
      <ExpeditionPackages />
      {/* 8 · Proof — the "See Harvey in Action" field-journal gallery. */}
      <ExpeditionGallery />
      {/* 9 · The remaining details — FAQ, journal, final CTA. The intro, included,
          generic packages and generic gallery are dropped here; the page tells its
          own story above. */}
      <ServicePageTemplate
        chapter={chapter}
        hideHero
        hideWhatItIs
        hideIncluded
        hidePackages
        hideGallery
      />
    </>
  );
}

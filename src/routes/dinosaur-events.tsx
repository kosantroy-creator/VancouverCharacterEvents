import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { JurassicGateHero } from "@/components/site/JurassicGateHero";
import { ExpeditionCredentials } from "@/components/site/ExpeditionCredentials";
import { HarveyHero } from "@/components/site/HarveyHero";
import { HarveyReveal } from "@/components/site/HarveyReveal";
import { TrainerAcademy } from "@/components/site/TrainerAcademy";
import { DinoComparison } from "@/components/site/DinoComparison";
import { ExpeditionPackages } from "@/components/site/ExpeditionPackages";
import { ExpeditionGallery } from "@/components/site/ExpeditionGallery";
import { ExpeditionDetails } from "@/components/site/ExpeditionDetails";
import { ExpeditionBookingForm } from "@/components/site/ExpeditionBookingForm";
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
  validateSearch: (search: Record<string, unknown>): { package?: string } => ({
    package: typeof search.package === "string" ? search.package : undefined,
  }),
  component: DinosaurPage,
});

function DinosaurPage() {
  const { package: requestedPackage } = Route.useSearch();

  // A package set on the URL means someone tapped a "Choose Your Expedition" CTA —
  // glide them down to the booking form with it pre-filled. Defer past layout /
  // scroll-restoration so a cold load lands accurately.
  useEffect(() => {
    if (!requestedPackage) return;
    let raf = 0;
    const t = window.setTimeout(() => {
      raf = requestAnimationFrame(() => {
        document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 250);
    return () => {
      window.clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [requestedPackage]);

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
      {/* 9 · Remove objections — the "Expedition Details" field-guide FAQ. */}
      <ExpeditionDetails />
      {/* 10 · Convert — the themed "Begin Your Expedition" booking form (carries the
          #book anchor the package CTAs scroll to). This is the page's closer; the
          generic journal + final CTA are intentionally dropped. */}
      <ExpeditionBookingForm requestedPackage={requestedPackage} />
    </>
  );
}

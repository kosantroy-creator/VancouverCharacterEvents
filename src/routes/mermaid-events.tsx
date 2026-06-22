import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MermaidHero } from "@/components/site/MermaidHero";
import { MermaidTrustStrip } from "@/components/site/MermaidTrustStrip";
import { MermaidDifference } from "@/components/site/MermaidDifference";
import { MermaidMeet } from "@/components/site/MermaidMeet";
import { MermaidJourney } from "@/components/site/MermaidJourney";
import { MermaidTestimonials } from "@/components/site/MermaidTestimonials";
import { MermaidPricing } from "@/components/site/MermaidPricing";
import { MermaidGallery } from "@/components/site/MermaidGallery";
import { MermaidFaq } from "@/components/site/MermaidFaq";
import { MermaidBookingForm } from "@/components/site/MermaidBookingForm";
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
  validateSearch: (search: Record<string, unknown>): { mermaid?: string } => ({
    mermaid: typeof search.mermaid === "string" ? search.mermaid : undefined,
  }),
  component: MermaidPage,
});

function MermaidPage() {
  const { mermaid } = Route.useSearch();

  // A mermaid set on the URL means someone tapped a "Meet …" CTA for a specific
  // mermaid — glide them down to the booking form with her pre-filled. Defer past
  // layout / scroll-restoration so a cold load lands accurately.
  useEffect(() => {
    if (!mermaid) return;
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
  }, [mermaid]);

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
      {/* 5b · What the Cove Crew Says — testimonials before the packages. */}
      <MermaidTestimonials />
      {/* 6 · Choose Your Cove Adventure — the three-package pricing passes. */}
      <MermaidPricing />
      {/* 7 · Real Mermaid Cove Moments — the Cove Journal gallery. */}
      <MermaidGallery />
      {/* 8 · Cove Details — the practical FAQ before the final CTA. */}
      <MermaidFaq />
      {/* 9 · Book Your Mermaid Cove Visit — the 3-step cove request wizard (#book). */}
      <MermaidBookingForm requestedMermaid={mermaid} />
    </>
  );
}

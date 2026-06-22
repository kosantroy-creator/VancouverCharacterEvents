import { createFileRoute } from "@tanstack/react-router";
import { WonderverseHero } from "@/components/site/WonderverseHero";
import { WonderverseTrust } from "@/components/site/WonderverseTrust";
import { WonderverseWhere } from "@/components/site/WonderverseWhere";
import { WonderverseCast } from "@/components/site/WonderverseCast";
import { WonderversePricing } from "@/components/site/WonderversePricing";
import { WonderverseGallery } from "@/components/site/WonderverseGallery";
import { WonderverseTestimonials } from "@/components/site/WonderverseTestimonials";
import { WonderverseFaq } from "@/components/site/WonderverseFaq";
import { WonderverseBookingForm } from "@/components/site/WonderverseBookingForm";
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
      {/* "Where the Rare Characters Appear" — the moonlit explainer + realm cards. */}
      <WonderverseWhere />
      {/* "Summon the Cast" — the character-reveal stage (energy-burst cards). */}
      <WonderverseCast />
      {/* "Choose Your Wonderverse Experience" — the celestial packages section. */}
      <WonderversePricing />
      {/* "Real Wonderverse Moments" — the moonlit memory-archive gallery. */}
      <WonderverseGallery />
      {/* "Loved Across the Wonderverse" — moonlit testimonials. */}
      <WonderverseTestimonials />
      {/* "Wonderverse Details" — the moonlit planning-guide FAQ. */}
      <WonderverseFaq />
      {/* "Request Your Wonderverse Visit" — the 3-step request wizard (#book). */}
      <WonderverseBookingForm />
    </>
  );
}

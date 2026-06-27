import { createFileRoute } from "@tanstack/react-router";
import { worldBySlug } from "@/lib/site-data";
import { EnchantedBazaarHero } from "@/components/site/EnchantedBazaarHero";
import { BazaarTrust } from "@/components/site/BazaarTrust";
import { BazaarPartners } from "@/components/site/BazaarPartners";
import { BazaarValue } from "@/components/site/BazaarValue";
import { BazaarFlow } from "@/components/site/BazaarFlow";
import { BazaarBuilder } from "@/components/site/BazaarBuilder";
import { BazaarGallery } from "@/components/site/BazaarGallery";
import { BazaarNotes } from "@/components/site/BazaarNotes";
import { BazaarBooking } from "@/components/site/BazaarBooking";

const world = worldBySlug("character-extras")!;

export const Route = createFileRoute("/character-extras")({
  head: () => ({
    meta: [
      { title: `${world.name} | Vancouver Character Events` },
      { name: "description", content: world.blurb },
      { property: "og:title", content: `${world.name} | Vancouver Character Events` },
      { property: "og:description", content: world.blurb },
      { property: "og:url", content: `/${world.slug}` },
      { property: "og:image", content: world.medallion },
    ],
    links: [{ rel: "canonical", href: `/${world.slug}` }],
  }),
  component: EnchantedBazaarPage,
});

function EnchantedBazaarPage() {
  return (
    <>
      {/* Bespoke "Enchanted Night Market" realm hero — the page brings its own. */}
      <EnchantedBazaarHero />

      {/* "More Colour. More Activity. More Moments." — the bazaar trust strip. */}
      <BazaarTrust />

      {/* "Meet the Bazaar Partners" — interactive partner-portrait reveal. */}
      <BazaarPartners />

      {/* "More Than Event Extras" — why Bazaar add-ons shape the guest experience. */}
      <BazaarValue />

      {/* "How Bazaar Add-Ons Fit Your Event" — the lantern market-path flow. */}
      <BazaarFlow />

      {/* "Build Your Bazaar Mix" — interactive add-on selector + custom-quote slip. */}
      <BazaarBuilder />

      {/* "Real Bazaar Moments" — the night-market memory-wall gallery / proof. */}
      <BazaarGallery />

      {/* "What Bazaar Guests Remember" — thank-you-note testimonials / social proof. */}
      <BazaarNotes />

      {/* "Plan Your Enchanted Bazaar Add-Ons" — final FAQ accordion + request form. */}
      <BazaarBooking />
    </>
  );
}

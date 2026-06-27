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
import { BazaarDivider } from "@/components/site/BazaarDivider";
import { BazaarFloat } from "@/components/site/BazaarFloat";

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
      {/* Scroll-progress bar + sticky "Request a Quote" pill for the long page. */}
      <BazaarFloat />

      {/* Bespoke "Enchanted Night Market" realm hero — the page brings its own. */}
      <EnchantedBazaarHero />

      {/* "More Colour. More Activity. More Moments." — the bazaar trust strip. */}
      <BazaarTrust />

      <BazaarDivider />

      {/* "Meet the Bazaar Partners" — interactive partner-portrait reveal. */}
      <BazaarPartners />

      <BazaarDivider />

      {/* "More Than Event Extras" — why Bazaar add-ons shape the guest experience. */}
      <BazaarValue />

      <BazaarDivider />

      {/* "How Bazaar Add-Ons Fit Your Event" — the lantern market-path flow. */}
      <BazaarFlow />

      <BazaarDivider />

      {/* "Build Your Bazaar Mix" — interactive add-on selector + custom-quote slip. */}
      <BazaarBuilder />

      <BazaarDivider />

      {/* "Real Bazaar Moments" — the night-market memory-wall gallery / proof. */}
      <BazaarGallery />

      <BazaarDivider />

      {/* "What Bazaar Guests Remember" — thank-you-note testimonials / social proof. */}
      <BazaarNotes />

      <BazaarDivider />

      {/* "Plan Your Enchanted Bazaar Add-Ons" — final FAQ accordion + request form. */}
      <BazaarBooking />
    </>
  );
}

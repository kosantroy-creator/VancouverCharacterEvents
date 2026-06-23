import { createFileRoute } from "@tanstack/react-router";
import { MascotHero } from "@/components/site/MascotHero";
import { MascotTrust } from "@/components/site/MascotTrust";
import { MeadowFriends } from "@/components/site/MeadowFriends";
import { MascotDetails } from "@/components/site/MascotDetails";
import { MascotPasses } from "@/components/site/MascotPasses";
import { MascotGallery } from "@/components/site/MascotGallery";
import { MascotNotes } from "@/components/site/MascotNotes";
import { MascotFaq } from "@/components/site/MascotFaq";
import { MascotBooking } from "@/components/site/MascotBooking";
import { chapterBySlug } from "@/lib/site-data";

const chapter = chapterBySlug("mascot-events")!;

export const Route = createFileRoute("/mascot-events")({
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
  component: MascotPage,
});

function MascotPage() {
  return (
    <>
      {/* Bespoke "Meadow Parade" hero — the page brings its own above the
          generic template (whose service hero is dropped). */}
      <MascotHero />
      <div id="mascot-trail">
        {/* Compact trust band bridging the hero into the page. */}
        <MascotTrust />
        {/* "Meet the Meadow Friends" — the interactive meadow-trail mechanic. */}
        <MeadowFriends />
        {/* "More Than a Mascot Appearance" — the reassurance / positioning band. */}
        <MascotDetails />
        {/* "Choose Your Mascot Visit" — the meadow-pass packages section. */}
        <MascotPasses />
        {/* "Real Mascot Meadow Moments" — the emotional-proof memory gallery. */}
        <MascotGallery />
        {/* "What Guests Remember Most" — the Happy Meadow Notes testimonials. */}
        <MascotNotes />
        {/* "Good to Know" — the meadow FAQ. */}
        <MascotFaq />
        {/* "Plan Your Mascot Visit" — the booking wizard with mascot card select. */}
        <MascotBooking />
      </div>
    </>
  );
}

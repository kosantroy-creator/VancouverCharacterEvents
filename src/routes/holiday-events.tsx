import { createFileRoute } from "@tanstack/react-router";
import { HolidayHero } from "@/components/site/HolidayHero";
import { HolidayTrust } from "@/components/site/HolidayTrust";
import { HolidayZones } from "@/components/site/HolidayZones";
import { HolidayDetails } from "@/components/site/HolidayDetails";
import { HolidayPasses } from "@/components/site/HolidayPasses";
import { HolidayNotes } from "@/components/site/HolidayNotes";
import { HolidayFaq } from "@/components/site/HolidayFaq";
import { HolidayBooking } from "@/components/site/HolidayBooking";
import { chapterBySlug } from "@/lib/site-data";

const chapter = chapterBySlug("holiday-events")!;

export const Route = createFileRoute("/holiday-events")({
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
  component: HolidayPage,
});

function HolidayPage() {
  return (
    <>
      {/* Bespoke Holiday Village realm hero — the page brings its own above the
          generic template (whose service hero is dropped). */}
      <HolidayHero />
      <div id="holiday-explore">
        {/* Compact "Holiday Promise" trust band bridging the hero into the page. */}
        <HolidayTrust />
        {/* "Step into every season" — Easter / Spooky / Christmas character zones. */}
        <HolidayZones />
        {/* "More Than a Holiday Appearance" — the reassurance / positioning band. */}
        <HolidayDetails />
        {/* "Choose Your Holiday Visit" — seasonal invitation packages. */}
        <HolidayPasses />
        {/* "What Holiday Guests Remember" — seasonal thank-you note testimonials. */}
        <HolidayNotes />
        {/* "Holiday Village Details" — the final FAQ accordion. */}
        <HolidayFaq />
        {/* "Request Your Holiday Village Visit" — the final Holiday Request Card. */}
        <HolidayBooking />
      </div>
    </>
  );
}

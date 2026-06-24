import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/ServicePageTemplate";
import { HolidayHero } from "@/components/site/HolidayHero";
import { HolidayTrust } from "@/components/site/HolidayTrust";
import { HolidaySeasons } from "@/components/site/HolidaySeasons";
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
        {/* "Three Seasons. One Village." — the Spring / Spooky / Christmas band. */}
        <HolidaySeasons />
        <ServicePageTemplate chapter={chapter} hideHero />
      </div>
    </>
  );
}

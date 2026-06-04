import { createFileRoute } from "@tanstack/react-router";
import { ServicePageTemplate } from "@/components/site/ServicePageTemplate";
import { chapterBySlug } from "@/lib/site-data";

const chapter = chapterBySlug("princess-events")!;

export const Route = createFileRoute("/princess-events")({
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
  component: () => <ServicePageTemplate chapter={chapter} />,
});

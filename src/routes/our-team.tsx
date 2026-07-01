import { createFileRoute } from "@tanstack/react-router";
import { CastHallHero } from "@/components/site/CastHallHero";
import { CastHallTrust } from "@/components/site/CastHallTrust";
import { CastGallery } from "@/components/site/CastGallery";
import { PerformerPromise } from "@/components/site/PerformerPromise";
import { BehindScenes } from "@/components/site/BehindScenes";
import { JoinCast } from "@/components/site/JoinCast";
import { TeamClose } from "@/components/site/TeamClose";

export const Route = createFileRoute("/our-team")({
  head: () => ({
    meta: [
      { title: "Our Team · The Cast Hall | Vancouver Character Events" },
      {
        name: "description",
        content:
          "Meet the Cast Hall — the real performers, hosts, assistants, and creative team behind Vancouver Character Events. Costumes create the first impression; performers create the memory.",
      },
      { property: "og:title", content: "Meet the Cast Behind the Magic | Vancouver Character Events" },
      {
        property: "og:description",
        content: "The caring performers and creative team who bring our eight worlds to life.",
      },
      { property: "og:url", content: "/our-team" },
    ],
    links: [{ rel: "canonical", href: "/our-team" }],
  }),
  component: OurTeamPage,
});

function OurTeamPage() {
  return (
    <>
      <CastHallHero />
      <CastHallTrust />
      <CastGallery />
      <PerformerPromise />
      <BehindScenes />
      <JoinCast />
      <TeamClose />
    </>
  );
}

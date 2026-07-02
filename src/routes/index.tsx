import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { HomeFloat } from "@/components/site/HomeFloat";
import { TrustStrip } from "@/components/site/TrustStrip";
import { StorybookWorlds } from "@/components/site/StorybookWorlds";
import { Storykeeper } from "@/components/site/Storykeeper";
import { GuestBook } from "@/components/site/GuestBook";
import { HowStoryBegins } from "@/components/site/HowStoryBegins";
import { GalleryGrid, type GalleryItem } from "@/components/site/GalleryGrid";
import { GrandInvitation } from "@/components/site/GrandInvitation";
import { CTAButton } from "@/components/site/CTAButton";
import { Section, SectionHeading } from "@/components/site/Section";
import { worldBySlug } from "@/lib/site-data";
import realPrincessMoment from "@/assets/princess/real-frog-entrance.jpg";
import realMermaidMoment from "@/assets/princess/real-mermaid-portrait.jpg";
import actStorykeeperBg from "@/assets/home/act-storykeeper.webp";
import actGuestbookBg from "@/assets/home/act-guestbook.webp";
import actMomentsBg from "@/assets/home/act-moments.webp";
import actBeginsBg from "@/assets/home/act-begins.webp";

/** A whisper-bright painted backdrop behind an act — high-key art that adds light,
 *  masked at both edges so it dissolves into the day-arc canvas. */
function ActBackdrop({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover opacity-45"
      style={{
        maskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, black 18%, black 82%, transparent 100%)",
      }}
    />
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vancouver Character Events | Step Into a Story" },
      {
        name: "description",
        content:
          "Premium character entertainment across Metro Vancouver — princesses, heroes, dinosaurs, mermaids, mascots, holiday characters, and specialty performers for birthdays, schools, festivals, and corporate events.",
      },
      { property: "og:title", content: "Vancouver Character Events" },
      {
        property: "og:description",
        content:
          "Character events that feel like stepping into a story. Premium performers across Metro Vancouver.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

/** Real-moments gallery — real event photography first, world scenes filling in. */
const realMoments: GalleryItem[] = (
  [
    ["princess-events", "Royal welcomes", realPrincessMoment],
    ["hero-events", "Heroic missions", undefined],
    ["dinosaur-events", "Prehistoric encounters", undefined],
    ["mermaid-events", "Under-the-sea magic", realMermaidMoment],
    ["mascot-events", "Crowd favourites", undefined],
    ["holiday-events", "Seasonal magic", undefined],
  ] as const
).map(([slug, label, photo]) => {
  const w = worldBySlug(slug);
  return {
    src: photo ?? w?.scene,
    label,
    category: w?.navLabel ?? "",
    accent: `var(--chapter-${w?.accent ?? "princess"})`,
  };
});

function Home() {
  return (
    <>
      <HomeFloat />

      {/* 1 · Hero (video) */}
      <Hero />

      {/* 2 · Trust bar */}
      <TrustStrip />

      {/* 3 · Choose Your Chapter — eight worlds */}
      <StorybookWorlds />

      {/* Acts II–V ride one continuous bright day-arc canvas. Proof runs unbroken
          (notes → photos), then the path cards hand straight to the envelope. */}
      <div className="day-arc relative">
        {/* Act II · The Storykeeper — a sunlit library wash behind the matcher */}
        <div className="relative">
          <ActBackdrop src={actStorykeeperBg} />
          <Section tone="transparent" id="find-your-event" compact className="act-halo">
            <SectionHeading
              folio
              eyebrow="Act II · Ask the Storykeeper"
              title={
                <>
                  Not sure which world? Ask the <em className="act-em">Storykeeper</em>.
                </>
              }
              description="Two quick questions and we'll point you to the right worlds — or take planners straight to the booking desk."
            />
            <div className="mt-8">
              <Storykeeper />
            </div>
          </Section>
        </div>

        {/* Act III · The Guest Book — drifting letters and seals behind the notes */}
        <div className="relative">
          <ActBackdrop src={actGuestbookBg} />
          <Section tone="transparent" compact className="act-halo">
          <SectionHeading
            folio
            eyebrow="Act III · The Guest Book"
            title={
              <>
                Stories our hosts <em className="act-em">wrote back</em>
              </>
            }
            description="Every note below is themed to the world it came from — and behind every one is a real, prepared performer."
          />
          <div className="mt-8">
            <GuestBook />
          </div>
          </Section>
        </div>

        {/* Act IV · Real Event Moments — balloons and golden bokeh behind the photos */}
        <div className="relative">
          <ActBackdrop src={actMomentsBg} />
          <Section tone="transparent" compact className="act-halo">
            <SectionHeading
              folio
              eyebrow="Act IV · Real event moments"
              title={
                <>
                  A glimpse of <em className="act-em">the magic</em>
                </>
              }
              description="Real performers, real reactions — and a gallery that grows every season."
            />
            <div className="mt-8">
              <GalleryGrid items={realMoments} />
            </div>
            <div className="mt-8 text-center">
              <CTAButton to="/gallery" variant="ghost" size="lg">
                View the Gallery
              </CTAButton>
            </div>
          </Section>
        </div>

        {/* Act V · How Every Story Begins — a winding golden path behind the beats,
            rising straight into the finale */}
        <div className="relative">
          <ActBackdrop src={actBeginsBg} />
          <Section tone="transparent" compact className="act-halo">
            <SectionHeading
              folio
              eyebrow="Act V · Simple from the start"
              title={
                <>
                  How every story <em className="act-em">begins</em>
                </>
              }
              description="Booking premium character entertainment should feel as easy as it is exciting."
            />
            <div className="mt-8">
              <HowStoryBegins />
            </div>
          </Section>
        </div>
      </div>

      {/* 8 · The Grand Invitation at Dusk — service area + final CTA, one crescendo */}
      <GrandInvitation />
    </>
  );
}

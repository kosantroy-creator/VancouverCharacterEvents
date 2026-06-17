import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { StorybookWorlds } from "@/components/site/StorybookWorlds";
import { FindYourEvent } from "@/components/site/FindYourEvent";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { Testimonials } from "@/components/site/Testimonials";
import { JourneyPath } from "@/components/site/JourneyPath";
import { GalleryGrid, type GalleryItem } from "@/components/site/GalleryGrid";
import { ServiceAreaChips } from "@/components/site/ServiceAreaMap";
import { Mountains } from "@/components/site/Scenery";
import { CTAButton } from "@/components/site/CTAButton";
import { Section, SectionHeading, GoldRule } from "@/components/site/Section";
import { worldBySlug } from "@/lib/site-data";
import realPrincessMoment from "@/assets/princess/real-frog-entrance.jpg";
import realMermaidMoment from "@/assets/princess/real-mermaid-portrait.jpg";

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
      {/* 1 · Hero (video) */}
      <Hero />

      {/* 2 · Trust bar */}
      <TrustStrip />

      {/* 3 · Choose Your Chapter — eight worlds */}
      <StorybookWorlds />

      {/* 4 · Find Your Event */}
      <Section tone="ivory" id="find-your-event">
        <SectionHeading
          eyebrow="Find your event"
          title="Tell us what you're planning"
          description="Character experiences for the moments that matter — we'll help you bring yours to life across Metro Vancouver."
        />
        <div className="mt-12">
          <FindYourEvent />
        </div>
      </Section>

      {/* 5 · Why Choose Us */}
      <Section tone="sky">
        <SectionHeading
          eyebrow="What separates us"
          title="Why families & planners choose us"
          description="A character experience should feel premium and run flawlessly. Here's what's behind every booking."
        />
        <div className="mt-12">
          <WhyChooseUs />
        </div>
      </Section>

      {/* 6 · Testimonials */}
      <Section tone="ivory">
        <SectionHeading
          eyebrow="Loved across Metro Vancouver"
          title="Stories from real events"
          description="From birthdays to brand activations — here's what hosts remember."
        />
        <div className="mt-12">
          <Testimonials />
        </div>
      </Section>

      {/* 7 · Planning CTA */}
      <Section tone="champagne" compact>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <GoldRule className="w-24" />
          <h2 className="t-display text-3xl text-fg md:text-4xl">
            Tell us what you&apos;re planning.
          </h2>
          <p className="max-w-xl text-fg-2">
            Share the date, location, character world, and event type — we&apos;ll help you find the
            right experience and make booking effortless.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CTAButton to="/contact" size="lg">
              Tell Us About Your Event
            </CTAButton>
            <CTAButton to="/pricing" variant="ghost" size="lg">
              View Pricing
            </CTAButton>
          </div>
        </div>
      </Section>

      {/* 8 · How It Works */}
      <Section tone="parchment">
        <SectionHeading
          eyebrow="Simple from the start"
          title="How it works"
          description="Booking premium character entertainment should feel as easy as it is exciting."
        />
        <div className="mt-12">
          <JourneyPath />
        </div>
      </Section>

      {/* 9 · Real Event Moments */}
      <Section tone="ivory">
        <SectionHeading
          eyebrow="Real event moments"
          title="A glimpse of the magic"
          description="Real performers, real reactions — and a gallery that grows every season."
        />
        <div className="mt-10">
          <GalleryGrid items={realMoments} />
        </div>
        <div className="mt-10 text-center">
          <CTAButton to="/gallery" variant="ghost" size="lg">
            View the Gallery
          </CTAButton>
        </div>
      </Section>

      {/* 10 · Where We Serve */}
      <Section tone="sky" compact className="!pb-0">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading
            eyebrow="Serving Metro Vancouver"
            title="A local team, across the Lower Mainland"
            description="Vancouver, Coquitlam, Burnaby, Surrey, Richmond, Langley, the North Shore, New Westminster, the Tri-Cities, Delta, Maple Ridge, and surrounding communities."
          />
          <div className="mt-8">
            <ServiceAreaChips />
          </div>
        </div>
        <Mountains className="mt-12 block h-[80px] w-full sm:h-[110px]" />
      </Section>

      {/* 11 · Final CTA — Begin Your Story */}
      <Section tone="champagne" className="text-center">
        <GoldRule className="mx-auto max-w-xs" />
        <h2 className="t-display text-3xl text-fg md:text-5xl">Begin your story</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-fg-2">
          The date is yours and the characters are ready. Tell us what you&apos;re dreaming up, and
          we&apos;ll help you create a day your guests will never forget.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton to="/contact" size="lg">
            Book an Experience
          </CTAButton>
          <CTAButton to="/pricing" variant="ghost" size="lg">
            View Pricing
          </CTAButton>
        </div>
      </Section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHeading, GoldRule } from "@/components/site/Section";
import { ChapterCard } from "@/components/site/ChapterCard";
import { EventTypeCard } from "@/components/site/EventTypeCard";
import { FeatureCard } from "@/components/site/FeatureCard";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { GalleryGrid, type GalleryItem } from "@/components/site/GalleryGrid";
import { CTAButton } from "@/components/site/CTAButton";
import { BookingForm } from "@/components/site/BookingForm";
import { chapters, eventTypes, whyPoints, bookingSteps, serviceAreas } from "@/lib/site-data";
import fairytaleImg from "@/assets/scenes/featured-fairytale.jpg";
import dinosaurImg from "@/assets/scenes/featured-dinosaur.jpg";
import corporateImg from "@/assets/scenes/featured-corporate.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vancouver Character Events | Premium Character Entertainment" },
      {
        name: "description",
        content:
          "Premium character entertainment across Metro Vancouver. Birthdays, schools, malls, festivals, holidays, and corporate events with professional performers and premium costumes.",
      },
      { property: "og:title", content: "Vancouver Character Events" },
      {
        property: "og:description",
        content: "Choose your chapter. Bring the story to life. Premium character events across Metro Vancouver.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const galleryPreview: GalleryItem[] = [
  { label: "Birthday reactions", category: "Princesses", accent: "var(--chapter-princess)" },
  { label: "Character entrances", category: "Heroes", accent: "var(--chapter-hero)" },
  { label: "Group photos", category: "Dinosaurs", accent: "var(--chapter-dinosaur)" },
  { label: "Festival moments", category: "Mermaids", accent: "var(--chapter-mermaid)" },
  { label: "Corporate activations", category: "Corporate", accent: "var(--chapter-corporate)" },
  { label: "Mall appearances", category: "Mascots", accent: "var(--chapter-mascot)" },
  { label: "Holiday events", category: "Holidays", accent: "var(--chapter-holiday)" },
  { label: "City celebrations", category: "Festivals", accent: "var(--chapter-festival)" },
];

function Home() {
  return (
    <>
      <Hero />

      {/* Choose your chapter */}
      <Section id="chapters" tone="ink">
        <SectionHeading
          onInk
          eyebrow="Choose your chapter"
          title="One mothership. Many adventures."
          description="Every service category is a chapter in the same magical Vancouver storybook. Turn the page and find the experience that fits your event."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c) => (
            <ChapterCard key={c.slug} chapter={c} />
          ))}
        </div>
      </Section>

      {/* Why VCE */}
      <Section tone="page">
        <SectionHeading
          eyebrow="Why Vancouver Character Events"
          title="More Than a Character Visit"
          description="Every experience is designed to feel polished, organized, and magical — from the first inquiry to the final photo."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((p) => (
            <div key={p.title} className="rounded-[var(--radius-lg)] border border-border-soft bg-surface p-6 shadow-[var(--shadow-sm)]">
              <span className="text-gold-500" aria-hidden>✦</span>
              <h3 className="mt-2 font-display text-xl text-fg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Event types */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Built for every occasion"
          title="Events we bring to life"
          description="One trusted local team for families, schools, retail, cities, and brands."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map((e) => (
            <EventTypeCard key={e.title} event={e} />
          ))}
        </div>
      </Section>

      {/* Featured experiences */}
      <Section tone="page">
        <SectionHeading
          eyebrow="Featured experiences"
          title="Signature moments, beautifully delivered"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            image={fairytaleImg}
            title="Fairytale Celebrations"
            body="Elegant princess and mermaid experiences that turn birthdays and special days into something truly enchanting."
            to="/princess-events"
            ctaLabel="Explore fairytales"
          />
          <FeatureCard
            image={dinosaurImg}
            title="Prehistoric Dinosaur Encounters"
            body="Larger-than-life, trainer-led dinosaur appearances that bring awe and adventure to parties, schools, and festivals."
            to="/dinosaur-events"
            ctaLabel="Meet the dinosaurs"
          />
          <FeatureCard
            image={corporateImg}
            title="Corporate & Holiday Events"
            body="Reliable, premium character entertainment for malls, city festivals, seasonal programs, and company celebrations."
            to="/corporate-events"
            ctaLabel="See corporate events"
          />
        </div>
      </Section>

      {/* Gallery preview */}
      <Section tone="ink">
        <SectionHeading
          onInk
          eyebrow="Real moments"
          title="A glimpse of the magic"
          description="A preview of the moments we create — built so real event photos and videos slot right in."
        />
        <div className="mt-10">
          <GalleryGrid items={galleryPreview} />
        </div>
        <div className="mt-10 text-center">
          <CTAButton to="/gallery" variant="ghost-ink" size="lg">View the Gallery</CTAButton>
        </div>
      </Section>

      {/* Booking process */}
      <Section tone="page">
        <SectionHeading
          eyebrow="Simple booking process"
          title="Three steps to your story"
          description="Booking premium character entertainment should feel as easy as it is exciting."
        />
        <div className="mt-12">
          <ProcessSteps steps={bookingSteps} />
        </div>
      </Section>

      {/* Service area */}
      <Section tone="cream">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            align="left"
            eyebrow="Serving Metro Vancouver"
            title="A local team, across the Lower Mainland"
            description="Proudly bringing premium character experiences to communities throughout Metro Vancouver."
          />
          <div className="flex flex-wrap gap-2.5">
            {serviceAreas.map((area) => (
              <span key={area} className="rounded-[var(--radius-pill)] border border-border-strong bg-surface px-4 py-1.5 text-sm font-medium text-fg-2">
                {area}
              </span>
            ))}
            <span className="rounded-[var(--radius-pill)] border border-gold-500/50 bg-surface px-4 py-1.5 text-sm font-medium text-fg-gold">
              & surrounding communities
            </span>
          </div>
        </div>
      </Section>

      {/* Final CTA + booking form */}
      <Section tone="ink" id="book">
        <SectionHeading
          onInk
          eyebrow="Start your story"
          title="Bring the story to life"
          description="Tell us about your event and we'll match you with the perfect chapter. Two clear paths — choose what fits."
        />
        <div className="mx-auto mt-10 grid max-w-3xl gap-5 sm:grid-cols-2">
          <div className="rounded-[var(--radius-xl)] border border-ink-600/50 bg-ink-700/55 p-7 text-center">
            <h3 className="font-display text-2xl text-star-white">Parties & Family Events</h3>
            <p className="mt-2 text-sm text-fg-on-ink/70">Birthdays, home parties, and family celebrations.</p>
          </div>
          <div className="rounded-[var(--radius-xl)] border border-ink-600/50 bg-ink-700/55 p-7 text-center">
            <h3 className="font-display text-2xl text-star-white">Corporate, School, Mall & Festival</h3>
            <p className="mt-2 text-sm text-fg-on-ink/70">Public, professional, and large-scale events.</p>
          </div>
        </div>
        <GoldRule className="mx-auto mt-12 max-w-xs" />
        <div className="mx-auto mt-8 max-w-3xl">
          <BookingForm />
        </div>
      </Section>
    </>
  );
}

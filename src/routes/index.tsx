import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHeading, GoldRule } from "@/components/site/Section";
import { FeatureCard } from "@/components/site/FeatureCard";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { GalleryGrid, type GalleryItem } from "@/components/site/GalleryGrid";
import { CTAButton } from "@/components/site/CTAButton";
import { BookingForm } from "@/components/site/BookingForm";
import { StorybookWorlds } from "@/components/site/StorybookWorlds";
import { Testimonials } from "@/components/site/Testimonials";
import { ServiceAreaMap, ServiceAreaChips } from "@/components/site/ServiceAreaMap";
import { bookingSteps } from "@/lib/site-data";
import fairytaleImg from "@/assets/scenes/featured-fairytale.jpg";
import dinosaurImg from "@/assets/scenes/featured-dinosaur.jpg";
import corporateImg from "@/assets/scenes/featured-corporate.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vancouver Character Events | One Company. Endless Adventures." },
      {
        name: "description",
        content:
          "Premium character entertainment across Metro Vancouver. Princesses, heroes, dinosaurs, mermaids, mascots, holiday characters, and corporate events with professional performers.",
      },
      { property: "og:title", content: "Vancouver Character Events" },
      {
        property: "og:description",
        content: "One company. Endless adventures. Premium character events across Metro Vancouver.",
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

      {/* Storybook worlds */}
      <Section id="worlds" tone="ink">
        <SectionHeading
          onInk
          eyebrow="Explore our worlds"
          title="Step into the storybook"
          description="Every experience is its own world, waiting to rise from the page. Turn the page and discover the adventure that fits your event."
        />
        <div className="mt-14">
          <StorybookWorlds />
        </div>
      </Section>

      {/* Featured adventures */}
      <Section tone="page">
        <SectionHeading
          eyebrow="Featured adventures"
          title="Signature moments, beautifully delivered"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <FeatureCard
            image={dinosaurImg}
            title="Harvey the Dinosaur"
            body="Our larger-than-life, trainer-led dinosaur brings awe and adventure to parties, schools, and festivals."
            to="/dinosaur-events"
            ctaLabel="Meet Harvey"
          />
          <FeatureCard
            image={fairytaleImg}
            title="Princess Experiences"
            body="Elegant princess visits that turn birthdays and special days into something truly enchanting."
            to="/princess-events"
            ctaLabel="Explore princesses"
          />
          <FeatureCard
            image={corporateImg}
            title="Hero Training Academy"
            body="High-energy, mission-led hero adventures that channel big imaginations into unforgettable fun."
            to="/hero-events"
            ctaLabel="Join the academy"
          />
        </div>
      </Section>

      {/* Real event moments */}
      <Section tone="ink">
        <SectionHeading
          onInk
          eyebrow="Real moments"
          title="Real event moments"
          description="A glimpse of the magic we create — built so your real event photos and videos slot right in."
        />
        <div className="mt-10">
          <GalleryGrid items={galleryPreview} />
        </div>
        <div className="mt-10 text-center">
          <CTAButton to="/gallery" variant="ghost-ink" size="lg">View the Gallery</CTAButton>
        </div>
      </Section>

      {/* Reviews & testimonials */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Loved by families & planners"
          title="What our clients say"
          description="Trusted by parents, schools, festivals, and corporate clients across Metro Vancouver."
        />
        <div className="mt-12">
          <Testimonials />
        </div>
      </Section>

      {/* How it works */}
      <Section tone="page">
        <SectionHeading
          eyebrow="Simple booking process"
          title="How it works"
          description="Booking premium character entertainment should feel as easy as it is exciting."
        />
        <div className="mt-12">
          <ProcessSteps steps={bookingSteps} />
        </div>
      </Section>

      {/* Service area */}
      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <ServiceAreaMap />
          <div>
            <SectionHeading
              align="left"
              eyebrow="Serving Metro Vancouver"
              title="A local team, across the Lower Mainland"
              description="Proudly bringing premium character experiences to communities throughout Metro Vancouver."
            />
            <div className="mt-8">
              <ServiceAreaChips />
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA + booking form */}
      <Section tone="ink" id="book">
        <SectionHeading
          onInk
          eyebrow="Begin your story"
          title="What Story Will You Create?"
          description="Tell us about your event and we'll match you with the perfect adventure."
        />
        <div className="mx-auto mt-9 flex max-w-md flex-col justify-center gap-3 sm:flex-row">
          <CTAButton to="/contact" size="lg" className="w-full sm:w-auto">
            Book Your Adventure
          </CTAButton>
          <CTAButton href="#booking-form" variant="ghost-ink" size="lg" className="w-full sm:w-auto">
            Request a Quote
          </CTAButton>
        </div>
        <GoldRule className="mx-auto mt-12 max-w-xs" />
        <div id="booking-form" className="mx-auto mt-8 max-w-3xl scroll-mt-24">
          <BookingForm />
        </div>
      </Section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading, GoldRule } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";
import { whyPoints } from "@/lib/site-data";
import brandFamily from "@/assets/brand/brand-family-chapters.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Vancouver Character Events" },
      {
        name: "description",
        content:
          "Vancouver Character Events is a local Metro Vancouver entertainment company delivering premium character experiences with professional performers and high-quality costumes.",
      },
      { property: "og:title", content: "About | Vancouver Character Events" },
      {
        property: "og:description",
        content: "A local Metro Vancouver team crafting premium, magical character experiences.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <Section tone="ink">
        <SectionHeading
          onInk
          eyebrow="Our story"
          title="One story, endless memories"
          description="Vancouver Character Events is a local Metro Vancouver entertainment company built on a simple belief: a character visit should feel premium, organized, and genuinely magical."
        />
      </Section>

      <Section tone="page">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-3xl text-fg md:text-4xl">More than a costume</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-fg-2">
              <p>
                We're a team of professional performers and event specialists who treat every
                booking as a story worth telling well. From an intimate backyard birthday to a busy
                mall activation, we bring the same standard of presentation, preparation, and care.
              </p>
              <p>
                Each of our service categories is a chapter in one magical Vancouver storybook —
                princesses, heroes, dinosaurs, mermaids, mascots, holiday characters, and corporate
                experiences — all delivered by one trusted local team.
              </p>
              <p>
                The result is entertainment that feels effortless for you and unforgettable for your
                guests: structured, audience-aware, beautifully costumed, and reliably on time.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border-soft shadow-[var(--shadow-md)]">
            <img
              src={brandFamily}
              alt="The Vancouver Character Events family of chapters"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading
          eyebrow="What sets us apart"
          title="Premium experiences, organized execution"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyPoints.map((p) => (
            <div
              key={p.title}
              className="rounded-[var(--radius-lg)] border border-border-soft bg-surface p-6 shadow-[var(--shadow-sm)]"
            >
              <span className="text-gold-500" aria-hidden>
                ✦
              </span>
              <h3 className="mt-2 font-display text-xl text-fg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="page" className="text-center">
        <GoldRule className="mx-auto max-w-xs" />
        <h2 className="font-display text-3xl text-fg md:text-4xl">
          Let's create something magical
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-fg-2">
          Whether it's a birthday, a classroom, or a city festival, we'd love to help bring your
          story to life.
        </p>
        <div className="mt-7">
          <CTAButton to="/contact" size="lg">
            Book an Experience
          </CTAButton>
        </div>
      </Section>
    </>
  );
}

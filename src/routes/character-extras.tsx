import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Camera,
  Check,
  Dices,
  Palette,
  PartyPopper,
  Sparkles as SparkleIcon,
  Wand2,
} from "lucide-react";
import { worldBySlug } from "@/lib/site-data";
import { Section, SectionHeading } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";
import { WorldDecor } from "@/components/site/Scenery";
import { EnchantedBazaarHero } from "@/components/site/EnchantedBazaarHero";
import { BazaarTrust } from "@/components/site/BazaarTrust";

const world = worldBySlug("character-extras")!;

const FEST = "var(--chapter-festival)";
const FEST_DEEP = "var(--chapter-festival-deep)";
const GOLD = "#E7B24B";
const BG = "linear-gradient(165deg, #FCEFF4 0%, #FBF1E6 52%, #F7F0FB 100%)";

const OFFERINGS: { icon: typeof Palette; title: string; desc: string }[] = [
  {
    icon: Palette,
    title: "Face Painting",
    desc: "Vibrant, skin-safe designs — from butterflies and superheroes to full fantasy looks, painted by friendly artists.",
  },
  {
    icon: PartyPopper,
    title: "Balloon Twisting",
    desc: "Swords, crowns, puppies, and one-of-a-kind balloon creations twisted to delight every guest in line.",
  },
  {
    icon: Camera,
    title: "Event Photography",
    desc: "A roaming photographer captures the candid magic so you can stay in the moment and treasure it later.",
  },
  {
    icon: SparkleIcon,
    title: "Glitter & Shimmer Bar",
    desc: "A sparkle station with cosmetic-grade glitter, gems, and temporary tattoos for a little extra dazzle.",
  },
  {
    icon: Dices,
    title: "Games & Prizes",
    desc: "Interactive party games, treasure hunts, and small prizes that keep the energy high between the big moments.",
  },
  {
    icon: Wand2,
    title: "Surprise Add-Ons",
    desc: "Pop-in characters, themed props, and custom touches — tell us your vision and we'll conjure the extras.",
  },
];

export const Route = createFileRoute("/character-extras")({
  head: () => ({
    meta: [
      { title: `${world.name} | Vancouver Character Events` },
      { name: "description", content: world.blurb },
      { property: "og:title", content: `${world.name} | Vancouver Character Events` },
      { property: "og:description", content: world.blurb },
      { property: "og:url", content: `/${world.slug}` },
      { property: "og:image", content: world.medallion },
    ],
    links: [{ rel: "canonical", href: `/${world.slug}` }],
  }),
  component: EnchantedBazaarPage,
});

function EnchantedBazaarPage() {
  return (
    <>
      {/* Bespoke "Enchanted Night Market" realm hero — the page brings its own. */}
      <EnchantedBazaarHero />

      {/* "More Colour. More Activity. More Moments." — the bazaar trust strip. */}
      <BazaarTrust />

      {/* The add-on offerings */}
      <Section tone="parchment" id="bazaar-explore" className="scroll-mt-20">
        <SectionHeading
          eyebrow="Magical Add-Ons"
          title="Everything that makes an event bigger"
          description="Mix and match the extras that fit your celebration. Every add-on is run by friendly, professional performers and tailored to your event."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative flex flex-col rounded-[var(--radius-xl)] border border-border-soft bg-surface p-7 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
              style={{ borderColor: "var(--border-soft)" }}
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  background: `color-mix(in oklab, ${FEST} 16%, transparent)`,
                  color: FEST_DEEP,
                }}
              >
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-xl text-fg">{title}</h3>
              <p className="mt-2 text-base leading-relaxed text-fg-2">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pairs with any world */}
      <Section tone="ivory">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="How it works"
              title="Add the bazaar to any character world"
            />
            <p className="mt-5 text-lg leading-relaxed text-fg-2">
              Booking a princess, a hero, a mermaid, or a mascot? Bring the Enchanted Bazaar along to
              keep every guest delighted from arrival to farewell. Or book the bazaar on its own for
              festivals, school events, and community celebrations.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Mix any combination of add-ons",
                "Scaled to your guest count and venue",
                "Friendly, professional, brand-safe performers",
                "Custom pricing built around your event",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-fg">
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: `color-mix(in oklab, ${FEST} 16%, transparent)`,
                      color: FEST_DEEP,
                    }}
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="relative overflow-hidden rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-md)]"
            style={{ background: BG, outline: `1px solid color-mix(in oklab, ${FEST} 30%, transparent)` }}
          >
            <WorldDecor kind="bazaar" accent={FEST} secondary={GOLD} />
            <div className="relative">
              <p className="t-engrave text-xs tracking-[0.22em]" style={{ color: FEST_DEEP }}>
                Enchanted night market · lantern glow
              </p>
              <p className="mt-4 font-display text-2xl italic text-fg">
                “The little extras are what guests remember most.”
              </p>
              <p className="mt-4 text-base text-fg-2">
                Tell us about your celebration and we’ll recommend the perfect mix of magical
                add-ons — with pricing tailored to your event.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section tone="champagne" className="text-center">
        <h2 className="font-display text-3xl text-fg md:text-4xl">Ready to open the Bazaar?</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-fg-2">
          Share your event details and we’ll build a magical line-up of add-ons across Metro
          Vancouver.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton to="/contact" size="lg">
            Request the Bazaar
            <ArrowRight className="h-4 w-4" aria-hidden />
          </CTAButton>
          <CTAButton to="/" variant="ghost" size="lg">
            Explore more chapters
          </CTAButton>
        </div>
      </Section>
    </>
  );
}

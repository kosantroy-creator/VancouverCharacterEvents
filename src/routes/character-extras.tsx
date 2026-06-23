import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
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
import { WorldDecor, Sparkles } from "@/components/site/Scenery";
import scene from "@/assets/worlds/enchanted-bazaar.webp";

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
      {/* Festival hero — the enchanted night-market gateway. */}
      <section className="relative isolate overflow-hidden" style={{ background: BG }}>
        <WorldDecor kind="bazaar" accent={FEST} secondary={GOLD} />
        <Sparkles color={FEST} count={5} />
        <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-16 pt-28 sm:px-6 md:pt-32 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <p
                className="t-eyebrow inline-flex items-center gap-2"
                style={{ color: FEST_DEEP }}
              >
                <SparkleIcon className="h-3.5 w-3.5" aria-hidden />
                {world.navLabel}
                <SparkleIcon className="h-3.5 w-3.5 -scale-x-100" aria-hidden />
              </p>
              <h1 className="mt-4 font-display text-4xl leading-tight text-fg md:text-6xl">
                {world.name}
              </h1>
              <p className="mt-4 font-display text-2xl italic text-fg-2 md:text-3xl">
                Where every event becomes a little more magical.
              </p>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-2">
                The Enchanted Bazaar is our marketplace of magical add-ons — face painting, balloon
                twisting, photography, games, and surprise characters that turn a great event into
                an unforgettable one. Pair them with any character world, or build a bazaar all your
                own.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CTAButton to="/contact" size="lg">
                  Request the Bazaar
                </CTAButton>
                <Link
                  to="/"
                  hash="choose-your-chapter"
                  className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border border-border-strong px-8 py-3.5 text-base font-semibold text-fg transition-colors hover:border-gold-500 hover:text-fg-gold"
                >
                  <ArrowLeft className="h-4 w-4" /> All chapters
                </Link>
              </div>
            </div>
            <div className="hidden justify-self-center lg:block">
              <div
                className="overflow-hidden rounded-full bg-surface p-2 shadow-[var(--shadow-lg)]"
                style={{ outline: `2px solid ${FEST}`, outlineOffset: "6px" }}
              >
                <img
                  src={scene}
                  alt="The Enchanted Bazaar — a festive night market of magical add-ons"
                  className="h-56 w-56 rounded-full object-cover"
                  width={224}
                  height={224}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The add-on offerings */}
      <Section tone="parchment">
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

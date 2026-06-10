import { createFileRoute } from "@tanstack/react-router";
import { Check, MapPin, Sparkles as SparkleIcon } from "lucide-react";
import { Section, SectionHeading, GoldRule } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";
import { worldPricing, pricingPromise, type WorldPricing } from "@/lib/site-data";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing | Vancouver Character Events" },
      {
        name: "description",
        content:
          "Transparent character entertainment pricing by world — princesses, heroes, dinosaurs, mermaids, mascots, and more. Travel included within our standard Metro Vancouver service area.",
      },
      { property: "og:title", content: "Pricing | Vancouver Character Events" },
      {
        property: "og:description",
        content:
          "Clear, by-the-world pricing with travel included across our standard Metro Vancouver service area.",
      },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function WorldPriceCard({ world }: { world: WorldPricing }) {
  const accent = `var(--chapter-${world.accent})`;
  return (
    <div
      id={world.slug}
      className="flex scroll-mt-28 flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border-soft bg-surface shadow-[var(--shadow-sm)]"
    >
      <div
        className="flex items-center gap-3 px-6 py-4"
        style={{ background: `color-mix(in oklab, ${accent} 16%, var(--surface))` }}
      >
        <span
          className="inline-flex h-3 w-3 shrink-0 rounded-full"
          style={{ background: accent }}
          aria-hidden
        />
        <h3 className="font-display text-2xl text-fg">{world.world}</h3>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6">
        {world.requestOnly ? (
          <>
            <p className="flex-1 text-base leading-relaxed text-fg-2">{world.note}</p>
            <CTAButton to="/contact" variant="ghost" className="w-full">
              {world.requestLabel ?? "Request Pricing"}
            </CTAButton>
          </>
        ) : (
          <>
            <div className="flex-1 space-y-5">
              {world.options.map((opt) => (
                <div key={opt.name}>
                  <h4 className="t-engrave text-[0.72rem] tracking-[0.16em] text-fg-gold">
                    {opt.name}
                  </h4>
                  <ul className="mt-2.5 space-y-2">
                    {opt.rates.map((r) => (
                      <li
                        key={r.label}
                        className="flex items-baseline justify-between gap-4 border-b border-dashed border-border-soft pb-2 last:border-0"
                      >
                        <span className="text-sm text-fg-2">{r.label}</span>
                        <span className="font-display text-xl leading-none text-fg">{r.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <CTAButton to="/contact" className="w-full">
              Book {world.world}
            </CTAButton>
          </>
        )}
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden"
        style={{
          background:
            "linear-gradient(165deg, var(--soft-sky) 0%, var(--ivory) 55%, var(--parchment) 100%)",
        }}
      >
        <div aria-hidden className="tx-filigree absolute inset-0" style={{ opacity: 0.06 }} />
        <div className="relative mx-auto w-full max-w-[1100px] px-5 pb-14 pt-28 text-center sm:px-6 md:pt-32 lg:px-8">
          <p className="t-eyebrow text-fg-gold">Pricing</p>
          <h1 className="t-display mx-auto mt-4 max-w-3xl text-4xl leading-tight text-fg md:text-6xl">
            Clear pricing, by character world
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-fg-2">
            Every world has its own structure — costumes, performers, and equipment differ. Here's
            what each experience costs, with travel included across our standard Metro Vancouver
            service area.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton to="/contact" size="lg">
              Tell Us About Your Event
            </CTAButton>
            <CTAButton to="/" variant="ghost" size="lg">
              Explore Characters
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Travel promise */}
      <Section tone="sky" compact>
        <div className="mx-auto max-w-4xl rounded-[var(--radius-xl)] border border-border-soft bg-surface p-7 shadow-[var(--shadow-sm)] md:p-9">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gold-600" aria-hidden />
            <h2 className="font-display text-2xl text-fg">Travel is included</h2>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {pricingPromise.included.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-base text-fg-2">
                <Check className="mt-1 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-border-soft pt-5 text-sm leading-relaxed text-fg-3">
            {pricingPromise.confirmFirst}
          </p>
        </div>
      </Section>

      {/* By the world */}
      <Section tone="ivory">
        <SectionHeading
          eyebrow="By the world"
          title="Find your character world"
          description="Specialty and holiday characters are priced individually — just ask and we'll send a tailored quote."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {worldPricing.map((world) => (
            <WorldPriceCard key={world.slug} world={world} />
          ))}
        </div>
      </Section>

      {/* Why prices vary */}
      <Section tone="parchment">
        <SectionHeading
          eyebrow="Honest & transparent"
          title="Why prices vary"
          description="A character experience is more than an appearance. Pricing reflects everything that makes it premium."
        />
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {pricingPromise.whyVaries.map((reason) => (
            <span
              key={reason}
              className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-border-strong bg-surface px-4 py-2 text-sm font-medium text-fg shadow-[var(--shadow-sm)]"
            >
              <SparkleIcon className="h-3.5 w-3.5 text-gold-500" aria-hidden />
              {reason}
            </span>
          ))}
        </div>
      </Section>

      {/* Not sure CTA */}
      <Section tone="champagne" className="text-center">
        <GoldRule className="mx-auto max-w-xs" />
        <h2 className="font-display text-3xl text-fg md:text-4xl">Not sure what fits?</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-fg-2">
          Tell us your date, location, and event type. We'll recommend the right world and format —
          and give you a clear, all-in price.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CTAButton to="/contact" size="lg">
            Tell Us About Your Event
          </CTAButton>
          <CTAButton to="/our-team" variant="ghost" size="lg">
            Meet the performers
          </CTAButton>
        </div>
      </Section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { User, GraduationCap, Sparkles as SparkleIcon, Mic } from "lucide-react";
import { Section, SectionHeading, GoldRule } from "@/components/site/Section";
import { CTAButton } from "@/components/site/CTAButton";
import { teamMembers, type TeamMember } from "@/lib/site-data";

export const Route = createFileRoute("/our-team")({
  head: () => ({
    meta: [
      { title: "Our Team | Vancouver Character Events" },
      {
        name: "description",
        content:
          "Meet the performers behind Vancouver Character Events — trained in-house, vocally coached, and dedicated to premium, audience-aware character experiences across Metro Vancouver.",
      },
      { property: "og:title", content: "Our Team | Vancouver Character Events" },
      {
        property: "og:description",
        content: "The trained, in-house performers behind the magic.",
      },
      { property: "og:url", content: "/our-team" },
    ],
    links: [{ rel: "canonical", href: "/our-team" }],
  }),
  component: OurTeamPage,
});

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-border-soft bg-surface shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]">
      {/* Photo placeholder — drop in a real performer photo */}
      <div
        className="relative flex aspect-[4/3] items-center justify-center"
        style={{ background: "var(--grad-sky-soft)" }}
      >
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-fg-3">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-border-strong bg-surface">
              <User className="h-7 w-7 text-gold-500" aria-hidden />
            </span>
            <span className="t-engrave text-[0.58rem] tracking-[0.2em]">Photo to be added</span>
          </div>
        )}
        {member.placeholder ? (
          <span className="absolute right-3 top-3 rounded-[var(--radius-pill)] bg-ink-900/85 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-gold-300">
            Sample · editable
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl text-fg">{member.name}</h3>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {member.specialties.map((s) => (
            <span
              key={s}
              className="rounded-[var(--radius-pill)] border border-border-soft bg-warm-white px-3 py-1 text-xs font-medium text-fg-2"
            >
              {s}
            </span>
          ))}
        </div>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-fg-2">{member.bio}</p>

        <dl className="mt-5 space-y-3 border-t border-border-soft pt-5 text-sm">
          <div className="flex items-start gap-2.5">
            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
            <div>
              <dt className="sr-only">Training highlights</dt>
              <dd className="text-fg-2">{member.training.join(" · ")}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <SparkleIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
            <div>
              <dt className="sr-only">Performance strengths</dt>
              <dd className="text-fg-2">{member.strengths.join(" · ")}</dd>
            </div>
          </div>
        </dl>
      </div>
    </article>
  );
}

function OurTeamPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="ink" className="!pb-12">
        <SectionHeading
          onInk
          eyebrow="Our team"
          title="The performers behind the magic"
          description="Every character is brought to life by a trained, in-house performer. We cast for warmth and skill, coach for the role, and test before anyone steps into your event."
        />
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {[
            { icon: GraduationCap, label: "Trained & tested in-house" },
            { icon: Mic, label: "Award-winning vocal coaching" },
            { icon: SparkleIcon, label: "Audience-aware performance" },
          ].map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-gold-500/40 bg-ink-900/40 px-4 py-2 text-sm font-medium text-fg-on-ink/90"
            >
              <Icon className="h-4 w-4 text-gold-400" aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </Section>

      {/* Team grid */}
      <Section tone="page">
        <div className="mx-auto mb-8 max-w-2xl rounded-[var(--radius-lg)] border border-dashed border-border-strong bg-surface-warm/60 px-5 py-4 text-center text-sm text-fg-3">
          These are sample profiles — replace the names, photos, and bios with your real cast in{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 text-fg-2">teamMembers</code> (
          src/lib/site-data.ts).
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, i) => (
            <TeamCard key={`${member.name}-${i}`} member={member} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section tone="cream" className="text-center">
        <GoldRule className="mx-auto max-w-xs" />
        <h2 className="font-display text-3xl text-fg md:text-4xl">Bring our team to your event</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-fg-2">
          Tell us what you're planning and we'll match the right performer to your audience, space,
          and story.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
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

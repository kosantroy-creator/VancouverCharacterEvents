import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { BookingForm } from "@/components/site/BookingForm";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { serviceAreas } from "@/lib/site-data";

/** Optional prefill params — used by "Request This Guest" CTAs on world pages. */
const WORLD_TO_INTEREST: Record<string, string> = {
  "princess-events": "Princesses",
  "hero-events": "Heroes",
  "dinosaur-events": "Dinosaurs",
  "mermaid-events": "Mermaids",
  "mascot-events": "Mascots",
  "holiday-events": "Holiday Characters",
  "specialty-events": "Specialty Characters",
  "corporate-events": "Corporate / City Entertainment",
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    guest: typeof search.guest === "string" ? search.guest : undefined,
    world: typeof search.world === "string" ? search.world : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book Now | Vancouver Character Events" },
      {
        name: "description",
        content:
          "Request a booking for premium character entertainment in Metro Vancouver. Birthdays, schools, malls, festivals, holidays, and corporate events.",
      },
      { property: "og:title", content: "Book Now | Vancouver Character Events" },
      {
        property: "og:description",
        content: "Start your booking request and bring the story to life.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const nextSteps = [
  {
    step: "01",
    title: "We review your request",
    body: "Our team reads your details and checks availability for your date and location.",
  },
  {
    step: "02",
    title: "We help you choose",
    body: "We'll recommend the right chapter, format, and package for your event and audience.",
  },
  {
    step: "03",
    title: "We confirm the magic",
    body: "Once details are locked in, your character team prepares to deliver an unforgettable experience.",
  },
];

function ContactPage() {
  const { guest, world } = Route.useSearch();
  const interest = world ? WORLD_TO_INTEREST[world] : undefined;

  return (
    <>
      <Section tone="ink" className="!pb-10">
        <SectionHeading
          onInk
          eyebrow="Begin your story"
          title={guest ? `${guest} would be delighted` : "Start your booking request"}
          description={
            guest
              ? `You're requesting ${guest} for your celebration. Tell us a little about the big day and we'll take care of the rest.`
              : "Tell us about your event and we'll be in touch to craft the perfect experience. The more you share, the better we can match your story."
          }
        />
      </Section>

      <Section tone="page" className="!pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.85fr] lg:items-start">
          <BookingForm
            key={`${guest ?? ""}|${interest ?? ""}`}
            defaultInterest={interest}
            requestedGuest={guest}
          />

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-xl)] border border-border-soft bg-surface-warm p-7 shadow-[var(--shadow-sm)]">
              <h3 className="t-engrave text-xs tracking-[0.22em] text-gold-700">Get in touch</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-gold-600" />
                  <a
                    href="mailto:info@vancouvercharacterevents.com"
                    className="text-sm text-fg transition-colors hover:text-fg-gold"
                  >
                    info@vancouvercharacterevents.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-gold-600" />
                  <a
                    href="tel:+17788006940"
                    className="text-sm text-fg transition-colors hover:text-fg-gold"
                  >
                    (778) 800-6940
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-gold-600" />
                  <span className="text-sm text-fg-2">
                    Serving all of Metro Vancouver & the Lower Mainland
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-border-soft bg-surface p-7 shadow-[var(--shadow-sm)]">
              <h3 className="t-engrave text-xs tracking-[0.22em] text-gold-700">Service area</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-2">
                {serviceAreas.join(" · ")} and surrounding communities.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="cream">
        <SectionHeading eyebrow="What happens next" title="From inquiry to magic" />
        <div className="mt-12">
          <ProcessSteps steps={nextSteps} />
        </div>
      </Section>
    </>
  );
}

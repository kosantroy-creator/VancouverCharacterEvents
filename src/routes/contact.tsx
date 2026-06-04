import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { BookingForm } from "@/components/site/BookingForm";
import { ProcessSteps } from "@/components/site/ProcessSteps";
import { serviceAreas } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book Now | Vancouver Character Events" },
      {
        name: "description",
        content:
          "Request a booking for premium character entertainment in Metro Vancouver. Birthdays, schools, malls, festivals, holidays, and corporate events.",
      },
      { property: "og:title", content: "Book Now | Vancouver Character Events" },
      { property: "og:description", content: "Start your booking request and bring the story to life." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const nextSteps = [
  { step: "01", title: "We review your request", body: "Our team reads your details and checks availability for your date and location." },
  { step: "02", title: "We help you choose", body: "We'll recommend the right chapter, format, and package for your event and audience." },
  { step: "03", title: "We confirm the magic", body: "Once details are locked in, your character team prepares to deliver an unforgettable experience." },
];

function ContactPage() {
  return (
    <>
      <Section tone="ink" className="!pb-10">
        <SectionHeading
          onInk
          eyebrow="Book now"
          title="Start your booking request"
          description="Tell us about your event and we'll be in touch to craft the perfect experience. The more you share, the better we can match your story."
        />
      </Section>

      <Section tone="page" className="!pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.85fr] lg:items-start">
          <BookingForm />

          <aside className="space-y-6">
            <div className="rounded-[var(--radius-xl)] border border-border-soft bg-surface-warm p-7 shadow-[var(--shadow-sm)]">
              <h3 className="t-engrave text-xs tracking-[0.22em] text-gold-700">Get in touch</h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-gold-600" />
                  <a href="mailto:hello@vancouvercharacterevents.ca" className="text-sm text-fg transition-colors hover:text-fg-gold">
                    hello@vancouvercharacterevents.ca
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-gold-600" />
                  <a href="tel:+16040000000" className="text-sm text-fg transition-colors hover:text-fg-gold">
                    (604) 000-0000
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-gold-600" />
                  <span className="text-sm text-fg-2">Serving all of Metro Vancouver & the Lower Mainland</span>
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

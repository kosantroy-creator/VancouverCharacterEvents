import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookingHallHero } from "@/components/site/BookingHallHero";
import { BookingPaths, type BookingPathId } from "@/components/site/BookingPaths";
import { BookingWorlds, WORLD_NAMES } from "@/components/site/BookingWorlds";
import { EventDetailsForm } from "@/components/site/EventDetailsForm";
import { BookingFaq } from "@/components/site/BookingFaq";
import { WhatHappensNext } from "@/components/site/WhatHappensNext";
import { BookingClose } from "@/components/site/BookingClose";

const PATH_LABEL: Record<BookingPathId, string> = {
  single: "Single World Experience",
  multi: "Multi-World Event",
  larger: "Schools, Corporate & Festivals",
};

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
    inflatable: typeof search.inflatable === "string" ? search.inflatable : undefined,
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

function ContactPage() {
  const { guest, world, inflatable } = Route.useSearch();
  const interest = world ? WORLD_TO_INTEREST[world] : undefined;
  const [path, setPath] = useState<BookingPathId | null>(null);
  const [worlds, setWorlds] = useState<string[]>([]);

  const choosePath = (p: BookingPathId) => {
    setPath(p);
    // Single World is one main world — keep at most one selection when switching to it.
    if (p === "single") setWorlds((w) => w.slice(0, 1));
  };

  const selectedWorlds = worlds.length
    ? worlds.map((id) => WORLD_NAMES[id]).join(", ")
    : undefined;

  // Selection-driven progress spine: a felt sense of place across the 3 stages
  // (path → world → details). Never 0 width, so reduced-motion users see it too.
  const filled = (path ? 1 : 0) + (worlds.length ? 1 : 0);
  const progressScale = 0.1 + filled * 0.28;

  return (
    <>
      <div aria-hidden className="bkh-progress" style={{ transform: `scaleX(${progressScale})` }} />

      <BookingHallHero />

      <BookingPaths selected={path} onSelect={choosePath} />

      <BookingWorlds path={path} selected={worlds} onChange={setWorlds} />

      <EventDetailsForm
        bookingPath={path ? PATH_LABEL[path] : undefined}
        selectedWorlds={selectedWorlds}
        requestedGuest={guest}
        requestedInflatable={inflatable}
        defaultInterest={interest}
      />

      <BookingFaq />

      <WhatHappensNext />

      <BookingClose />
    </>
  );
}

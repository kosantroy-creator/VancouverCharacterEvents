import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookingHallHero } from "@/components/site/BookingHallHero";
import { BookingIntro } from "@/components/site/BookingIntro";
import { BookingPaths, type BookingPathId } from "@/components/site/BookingPaths";
import { BookingWorlds } from "@/components/site/BookingWorlds";
import { EventDetailsForm } from "@/components/site/EventDetailsForm";
import { BookingFaq } from "@/components/site/BookingFaq";
import { BookingClose } from "@/components/site/BookingClose";

const PATH_LABEL: Record<BookingPathId, string> = {
  single: "Single World Experience",
  multi: "Multi-World Event",
  larger: "Schools, Corporate & Festivals",
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
  const { guest, inflatable } = Route.useSearch();
  const [path, setPath] = useState<BookingPathId | null>(null);
  // Step 2: per-world character picks. Step 3 stays locked until step2Done.
  const [worldChars, setWorldChars] = useState<Record<string, string[]>>({});
  const [step2Done, setStep2Done] = useState(false);

  const scrollTo = (id: string) =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      ),
    );

  const choosePath = (p: BookingPathId) => {
    const firstChoice = path === null;
    if (p !== path) {
      // Changing the path resets the world/character step.
      setWorldChars({});
      setStep2Done(false);
    }
    setPath(p);
    if (firstChoice) scrollTo("choose-world-intro");
  };

  const finishStep2 = () => {
    setStep2Done(true);
    scrollTo("event-details-intro");
  };

  // Progress spine across the 3 stages (path → world → details).
  const filled = (path ? 1 : 0) + (step2Done ? 1 : 0);
  const progressScale = 0.1 + filled * 0.28;

  return (
    <>
      <div aria-hidden className="bkh-progress" style={{ transform: `scaleX(${progressScale})` }} />

      <BookingHallHero />

      <BookingIntro
        id="booking-intro"
        eyebrow="Step One · Choose Your Path"
        title="How would you like to begin?"
        sub="Pick the booking path that best matches your event — that's all we need to begin. If you're not sure, choose the closest option and we'll guide the rest."
      />

      <BookingPaths selected={path} onSelect={choosePath} />

      {/* Step 2 stays hidden until a path is chosen — one decision at a time. */}
      {path && (
        <>
          <BookingIntro
            id="choose-world-intro"
            eyebrow="Step Two · Choose Your World"
            title="Pick your world, then your characters."
            sub={
              path === "single"
                ? "Open your main world and choose the characters you'd like for your event."
                : "Open any world to choose its characters. You can combine more than one world for a multi-world event."
            }
          />

          <BookingWorlds
            path={path}
            value={worldChars}
            onChange={setWorldChars}
            onContinue={finishStep2}
          />
        </>
      )}

      {/* Step 3 (and the rest) stay locked until Step 2 is confirmed. */}
      {path && step2Done && (
        <>
          <BookingIntro
            id="event-details-intro"
            eyebrow="Step Three · Event Details"
            title="Tell us about your event."
            sub="Just the details we need to check availability and follow up with the right options for your celebration."
          />

          <EventDetailsForm
            bookingPath={PATH_LABEL[path]}
            worldChars={worldChars}
            requestedGuest={guest}
            requestedInflatable={inflatable}
          />

          <BookingFaq />

          <BookingClose />
        </>
      )}
    </>
  );
}

import { Reveal } from "./Reveal";

/**
 * BookingIntro — a slim blend section that bridges one booking section's image into
 * the next (hero → Step 1 panorama, and Step 1 panorama → Step 2 vista). Holds the
 * step heading on a cream→sky gradient so the two images meet softly instead of with
 * a hard cut. Reduced-motion safe via Reveal + the global guard. See ".bki" in
 * styles.css.
 */
export function BookingIntro({
  id,
  eyebrow,
  title,
  sub,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  sub: string;
}) {
  return (
    <section id={id} className="bki relative isolate overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-2xl px-5 py-12 text-center sm:px-6 md:py-16 lg:px-8">
        <Reveal y={16}>
          <span className="bki-eyebrow">
            <span aria-hidden className="bki-eyebrow-fl" />
            {eyebrow}
            <span aria-hidden className="bki-eyebrow-fl bki-eyebrow-fl--r" />
          </span>
        </Reveal>
        <Reveal delay={90} y={16}>
          <h2 className="bki-title">{title}</h2>
        </Reveal>
        <Reveal delay={160} y={14}>
          <p className="bki-sub">{sub}</p>
        </Reveal>
      </div>
    </section>
  );
}

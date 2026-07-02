import { Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, HeartHandshake, ListChecks, Mic, Quote } from "lucide-react";
import { whyChooseUs, worldTestimonials } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import castAgnes from "@/assets/team/cast-agnes.webp";
import castTroy from "@/assets/team/cast-troy.webp";
import castMimi from "@/assets/team/cast-mimi.webp";
import castKiefer from "@/assets/team/cast-kiefer.webp";

/**
 * GuestBook — the homepage's trust heart: one act merging proof + testimonials.
 * A compact credentials strip up top (from whyChooseUs), then the guest-book spread —
 * every quote styled as a note in its world's own dialect (Royal Note, Mission
 * Report, Meadow Note…), and a cast strip of real performer portraits linking to the
 * Cast Hall. Quotes/names remain editable placeholders (see worldTestimonials) until
 * real stories arrive. Replaces the separate WhyChooseUs + Testimonials sections.
 * See ".gb" in styles.css.
 */
const CRED_ICONS = [GraduationCap, Mic, ListChecks, HeartHandshake];

/** World accent → the dialect label its note is written in. */
const NOTE_LABEL: Record<string, string> = {
  princess: "A Royal Note",
  hero: "Mission Report",
  dinosaur: "Expedition Log",
  mermaid: "From the Cove",
  mascot: "Meadow Note",
  holiday: "Holiday Post",
  specialty: "From the Wonderverse",
  bazaar: "Bazaar Stall Tag",
  corporate: "Event Report",
};

const CAST = [
  { name: "Agnes", photo: castAgnes },
  { name: "Troy", photo: castTroy },
  { name: "Mimi", photo: castMimi },
  { name: "Kiefer", photo: castKiefer },
];

export function GuestBook() {
  return (
    <div className="gb">
      {/* credentials strip — the four strongest proof points, compact */}
      <ul className="gb-creds">
        {whyChooseUs.slice(0, 4).map((p, i) => {
          const Icon = CRED_ICONS[i % CRED_ICONS.length];
          return (
            <Reveal key={p.title} as="li" delay={i * 80} y={14} className="gb-cred-cell">
              <div className="gb-cred">
                <Icon className="h-5 w-5" aria-hidden />
                <strong>{p.title}</strong>
              </div>
            </Reveal>
          );
        })}
      </ul>

      {/* the guest-book spread — notes in each world's dialect */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {worldTestimonials.map((t, i) => {
          const accent = `var(--chapter-${t.accent})`;
          return (
            <Reveal key={`${t.name}-${i}`} delay={(i % 3) * 80} y={22} className="gb-note-cell h-full">
              <figure className="gb-note" style={{ "--acc": accent } as React.CSSProperties}>
                <figcaption className="gb-note-label">
                  <Quote className="h-3.5 w-3.5" aria-hidden />
                  {NOTE_LABEL[t.accent] ?? "Guest Note"}
                </figcaption>
                <blockquote className="gb-note-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="gb-note-foot">
                  <span className="gb-note-name">{t.name}</span>
                  <span className="gb-note-meta">
                    {t.eventType} · {t.city}
                  </span>
                </div>
              </figure>
            </Reveal>
          );
        })}
      </div>

      {/* the people behind the notes — cast strip → Cast Hall */}
      <Reveal delay={120} y={16}>
        <div className="gb-cast">
          <ul className="gb-cast-row" aria-hidden>
            {CAST.map((c) => (
              <li key={c.name} className="gb-cast-face">
                <img src={c.photo} alt="" loading="lazy" decoding="async" width={64} height={64} />
              </li>
            ))}
          </ul>
          <p className="gb-cast-line">
            Real performers, real people — meet the cast behind every note.
          </p>
          <Link to="/our-team" className="gb-cast-cta group">
            Meet the Cast
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

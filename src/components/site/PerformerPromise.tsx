import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Camera, Compass, Drama, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * PerformerPromise — Section 4 of the Our Team page: "Our Performer Promise". The
 * company standard behind the cast — a warm backstage promise (safe, aware, flexible,
 * memories-first) rendered as four gold-trimmed plaques with a centred theatre-note
 * quote. CSS-only cream/parchment + gold + faint theatre-purple edges (no image), warm
 * spotlight + gold dust motion-gated under .ppr.anim, reduced-motion safe. Central VCE
 * palette. See ".ppr" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

const PROMISES = [
  {
    icon: ShieldCheck,
    title: "Safe & Professional",
    copy: "We prioritize respectful, child-friendly interaction, clear boundaries, thoughtful communication, and professional event behaviour.",
  },
  {
    icon: Drama,
    title: "In Character, But Aware",
    copy: "Our performers create magical character moments while staying attentive to the real needs of the room — timing, photos, guest energy, shy children, and event flow.",
  },
  {
    icon: Compass,
    title: "Flexible With Families",
    copy: "Every event is different, so we adapt to age range, space, timing, venue rules, group size, weather, and the energy of the celebration.",
  },
  {
    icon: Camera,
    title: "Memories First",
    copy: "The goal is not just to arrive in costume. It is to create the greeting, laugh, photo, dance, story, or magical moment guests remember after the event is over.",
  },
] as const;

const DUST = [
  { left: "14%", s: 3, delay: "0s", dur: "15s", dx: "8px" },
  { left: "36%", s: 4, delay: "3.6s", dur: "17s", dx: "-7px" },
  { left: "58%", s: 3, delay: "1.8s", dur: "14s", dx: "10px" },
  { left: "82%", s: 4, delay: "5.2s", dur: "16.5s", dx: "-9px" },
] as const;

export function PerformerPromise() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOK(true);
  }, []);

  return (
    <section
      ref={ref}
      id="performer-promise"
      aria-labelledby="ppr-title"
      className={cn("ppr relative isolate overflow-hidden", motionOK && "anim")}
    >
      <span aria-hidden className="ppr-spot absolute -z-10" />
      {motionOK ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {DUST.map((d, i) => (
            <span
              key={`d${i}`}
              className="ppr-dust"
              style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx } as Vars}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal y={16}>
            <span className="ppr-eyebrow">
              <span aria-hidden className="ppr-eyebrow-fl" />
              The Performer Promise
              <span aria-hidden className="ppr-eyebrow-fl ppr-eyebrow-fl--r" />
            </span>
          </Reveal>
          <Reveal delay={110} y={16}>
            <h2 id="ppr-title" className="ppr-title">More than costumes. Real people creating real moments.</h2>
          </Reveal>
          <Reveal delay={180} y={14}>
            <p className="ppr-sub">
              Every Vancouver Character Events performer brings their own warmth, energy, and
              personality — but the promise is the same: arrive prepared, read the room, support the
              host, and help create memories guests can feel.
            </p>
          </Reveal>
        </div>

        {/* theatre-note quote plaque */}
        <Reveal delay={230} y={16} className="block">
          <figure className="ppr-quote">
            <span aria-hidden className="ppr-quote-fl" />
            <blockquote className="ppr-quote-text">
              &ldquo;The best performer does not just play the part — they notice the room.&rdquo;
            </blockquote>
            <span aria-hidden className="ppr-quote-fl ppr-quote-fl--b" />
          </figure>
        </Reveal>

        {/* promise plaques — 2 x 2 */}
        <ul className="ppr-grid">
          {PROMISES.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} as="li" delay={300 + i * 90} y={18} className="ppr-cell">
              <article className="ppr-card">
                <span aria-hidden className="ppr-medallion">
                  <Icon className="h-6 w-6" aria-hidden />
                  <span aria-hidden className="ppr-medallion-ribbon" />
                </span>
                <div className="ppr-card-body">
                  <h3 className="ppr-card-title">{title}</h3>
                  <p className="ppr-card-copy">{copy}</p>
                </div>
                <span aria-hidden className="ppr-seal"><Star className="h-3 w-3" /></span>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* closing line */}
        <Reveal delay={520} y={12}>
          <p className="ppr-foot">
            <Sparkles className="h-4 w-4" aria-hidden />
            The magic is not only what guests see. It is how they are welcomed, included, guided, and
            remembered.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

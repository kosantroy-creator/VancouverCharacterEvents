import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * BehindScenes — Section 5 of the Our Team page: "How we prepare for the magic". A
 * gentle backstage look at the preparation behind every visit, drawn as a CALL-SHEET
 * PATH: a gold spine down the centre (drawn in on first view), five numbered steps
 * alternating left/right (review details → prepare the moment → presentation → flow →
 * adapt), each led by a large gilt Cormorant numeral. CSS-only cream/parchment
 * backstage wall; motion under .bts.anim (+ .is-drawn for the spine), reduced-motion
 * safe. Central VCE palette. See ".bts" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

const STEPS = [
  {
    title: "We Review the Event Details",
    copy: "We look at the event type, age range, guest count, location, timing, selected world, and any notes from the host so the performer understands the room before arriving.",
  },
  {
    title: "We Prepare the Character Moment",
    copy: "Performers consider greetings, photos, activities, games, songs, stories, or interactions that fit the event style and guest energy.",
  },
  {
    title: "We Care for Presentation",
    copy: "Costumes, wigs, accessories, makeup, props, and overall presentation are part of helping the character feel polished and photo-ready.",
  },
  {
    title: "We Think About Flow",
    copy: "Good events need more than a dramatic entrance. We think about timing, shy children, group photos, transitions, host needs, and keeping the room engaged.",
  },
  {
    title: "We Arrive Ready to Adapt",
    copy: "Every event is different, so performers stay aware of the space, weather, venue rules, guest energy, and what the host needs in the moment.",
  },
] as const;

const DUST = [
  { left: "16%", s: 3, delay: "0s", dur: "15s", dx: "8px" },
  { left: "40%", s: 4, delay: "3.6s", dur: "17s", dx: "-7px" },
  { left: "62%", s: 3, delay: "1.8s", dur: "14s", dx: "10px" },
  { left: "84%", s: 4, delay: "5.2s", dur: "16.5s", dx: "-9px" },
] as const;

export function BehindScenes() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOK(true);

    // Draw the call-sheet spine once the section takes the stage.
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="behind-the-scenes"
      aria-labelledby="bts-title"
      className={cn("bts relative isolate overflow-hidden", motionOK && "anim", drawn && "is-drawn")}
    >
      <span aria-hidden className="bts-spot absolute -z-10" />
      {motionOK ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {DUST.map((d, i) => (
            <span
              key={`d${i}`}
              className="bts-dust"
              style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx } as Vars}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal y={16}>
            <span className="bts-eyebrow">
              <span aria-hidden className="bts-eyebrow-fl" />
              Behind the Scenes
              <span aria-hidden className="bts-eyebrow-fl bts-eyebrow-fl--r" />
            </span>
          </Reveal>
          <Reveal delay={110} y={16}>
            <h2 id="bts-title" className="bts-title">How we prepare for <em className="act-em">the magic</em>.</h2>
          </Reveal>
          <Reveal delay={180} y={14}>
            <p className="bts-sub">
              Before the first greeting, photo, game, dance, or story moment, our team reviews the
              event details and prepares the experience so the visit feels smooth, polished, and
              memorable.
            </p>
          </Reveal>
        </div>

        {/* the call-sheet path — five steps around a drawn gold spine */}
        <div className="bts-path">
          <span aria-hidden className="bts-spine" />
          <ol className="bts-steps">
            {STEPS.map(({ title, copy }, i) => (
              <Reveal key={title} as="li" delay={260 + i * 110} y={18} className="bts-step">
                <span aria-hidden className="bts-dot" />
                <div className="bts-step-body">
                  <span aria-hidden className="bts-step-num">{i + 1}</span>
                  <h3 className="bts-step-title">{title}</h3>
                  <p className="bts-step-copy">{copy}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* closing line */}
        <Reveal delay={520} y={12}>
          <p className="bts-foot">
            <Sparkles className="h-4 w-4" aria-hidden />
            The magic guests see at the event starts before the performer walks through the door.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ClipboardList, Compass, Drama, Route, Shirt, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * BehindScenes — Section 5 of the Our Team page: "How we prepare for the magic". A
 * gentle backstage look at the preparation behind every visit, as five numbered
 * Cast-Hall preparation plaques (review details → prepare the moment → presentation →
 * flow → adapt). CSS-only cream/parchment backstage wall + gold + faint theatre-purple
 * edges, warm spotlight + gold dust (motion-gated under .bts.anim), reduced-motion
 * safe. Central VCE palette. See ".bts" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;

const STEPS = [
  {
    icon: ClipboardList,
    title: "We Review the Event Details",
    copy: "We look at the event type, age range, guest count, location, timing, selected world, and any notes from the host so the performer understands the room before arriving.",
  },
  {
    icon: Drama,
    title: "We Prepare the Character Moment",
    copy: "Performers consider greetings, photos, activities, games, songs, stories, or interactions that fit the event style and guest energy.",
  },
  {
    icon: Shirt,
    title: "We Care for Presentation",
    copy: "Costumes, wigs, accessories, makeup, props, and overall presentation are part of helping the character feel polished and photo-ready.",
  },
  {
    icon: Route,
    title: "We Think About Flow",
    copy: "Good events need more than a dramatic entrance. We think about timing, shy children, group photos, transitions, host needs, and keeping the room engaged.",
  },
  {
    icon: Compass,
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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOK(true);
  }, []);

  return (
    <section
      ref={ref}
      id="behind-the-scenes"
      aria-labelledby="bts-title"
      className={cn("bts relative isolate overflow-hidden", motionOK && "anim")}
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

      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
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
            <h2 id="bts-title" className="bts-title">How we prepare for the magic.</h2>
          </Reveal>
          <Reveal delay={180} y={14}>
            <p className="bts-sub">
              Before the first greeting, photo, game, dance, or story moment, our team reviews the
              event details and prepares the experience so the visit feels smooth, polished, and
              memorable.
            </p>
          </Reveal>
          <Reveal delay={240} y={12}>
            <p className="bts-note">
              A magical event is not only about the entrance. It is about everything that happens
              before, during, and after that first hello.
            </p>
          </Reveal>
        </div>

        {/* numbered preparation path */}
        <ul className="bts-grid">
          {STEPS.map(({ icon: Icon, title, copy }, i) => (
            <Reveal key={title} as="li" delay={300 + i * 90} y={18} className="bts-cell">
              <article className="bts-card">
                <span aria-hidden className="bts-medallion">
                  <Icon className="h-6 w-6" aria-hidden />
                  <span className="bts-num">{i + 1}</span>
                </span>
                <h3 className="bts-card-title">{title}</h3>
                <p className="bts-card-copy">{copy}</p>
              </article>
            </Reveal>
          ))}
        </ul>

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

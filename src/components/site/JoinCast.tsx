import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, ClipboardList, Drama, Music, Palette, PawPrint, Sparkles, Users } from "lucide-react";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * JoinCast — Section 6 of the Our Team page: "Want to Join the Cast?". A warm backstage
 * invitation for potential performers, hosts, assistants, and event support — invitation
 * copy + CTA on the left, six role opportunity cards on the right, a values ribbon below.
 * A light casting-desk beat, not a full hiring page. CSS-only cream/parchment + gold +
 * faint theatre-purple edges; motion under .jtc.anim, reduced-motion safe. See ".jtc".
 */
type Vars = CSSProperties & Record<string, string | number>;

const ROLES = [
  {
    icon: Drama,
    title: "Character Performers",
    copy: "Bring storybook, hero, holiday, fantasy, or specialty characters to life through greetings, games, photos, and guest interaction.",
  },
  {
    icon: ClipboardList,
    title: "Party Hosts & Assistants",
    copy: "Support event flow, help performers, guide activities, manage transitions, and keep the experience running smoothly.",
  },
  {
    icon: PawPrint,
    title: "Mascot Helpers",
    copy: "Assist with mascot visits, visibility, safety awareness, photos, entrances, exits, and guest interaction.",
  },
  {
    icon: Palette,
    title: "Face Painters & Balloon Artists",
    copy: "Add colour, creativity, guest activity, and take-home memories through Enchanted Bazaar-style add-ons.",
  },
  {
    icon: Music,
    title: "Singers, Carollers & Specialty Talent",
    copy: "Support seasonal events, holiday moments, music-based visits, themed experiences, and unique entertainment requests.",
  },
  {
    icon: Users,
    title: "Event Support Team",
    copy: "Help with setup, guest flow, props, photos, public events, school visits, festivals, and larger activations.",
  },
] as const;

const VALUES = ["Guest-focused", "Event-ready", "Reliable", "Kind", "Expressive", "Professional"] as const;

const DUST = [
  { left: "20%", s: 3, delay: "0s", dur: "15s", dx: "8px" },
  { left: "48%", s: 4, delay: "3.6s", dur: "17s", dx: "-7px" },
  { left: "76%", s: 3, delay: "1.8s", dur: "14s", dx: "10px" },
] as const;

export function JoinCast() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOK(true);
  }, []);

  return (
    <section
      ref={ref}
      id="join-the-cast"
      aria-labelledby="jtc-title"
      className={cn("jtc relative isolate overflow-hidden", motionOK && "anim")}
    >
      <span aria-hidden className="jtc-spot absolute -z-10" />
      {motionOK ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {DUST.map((d, i) => (
            <span
              key={`d${i}`}
              className="jtc-dust"
              style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx } as Vars}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        <div className="jtc-layout">
          {/* invitation copy + CTA */}
          <div className="jtc-intro">
            <Reveal y={16}>
              <span className="jtc-eyebrow">
                <span aria-hidden className="jtc-eyebrow-fl" />
                Join the Cast
              </span>
            </Reveal>
            <Reveal delay={110} y={16}>
              <h2 id="jtc-title" className="jtc-title">
                Love creating <em className="jtc-title-em">magical</em> moments?
              </h2>
            </Reveal>
            <Reveal delay={180} y={14}>
              <p className="jtc-sub">
                We are always interested in kind, reliable, expressive people who enjoy working with
                families, children, schools, community events, and celebrations.
              </p>
            </Reveal>
            <Reveal delay={240} y={14}>
              <p className="jtc-copy">
                Whether you are a performer, host, assistant, mascot helper, face painter, balloon
                artist, photographer, singer, caroller, or event support person, we would love to hear
                how you might fit into the Vancouver Character Events world.
              </p>
            </Reveal>
            <Reveal delay={310} y={14}>
              <div className="jtc-cta-row">
                {/* Placeholder CTA — points to the contact/booking page for now. Repoint to a
                    dedicated careers / application form or page once one exists. */}
                <CTAButton to="/contact" size="lg" variant="ghost-ink" className="jtc-cta group">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Apply to Join the Team
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </CTAButton>
                <a href="#cast-roles" className="jtc-link">
                  See Performer Roles
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </Reveal>
            <Reveal delay={370} y={14}>
              <p className="jtc-note">
                Experience is helpful, but warmth, reliability, professionalism, and the ability to
                read the room matter just as much.
              </p>
            </Reveal>
          </div>

          {/* role opportunity cards */}
          <ul id="cast-roles" className="jtc-roles">
            {ROLES.map(({ icon: Icon, title, copy }, i) => (
              <Reveal key={title} as="li" delay={260 + i * 80} y={18} className="jtc-cell">
                <article className="jtc-card">
                  <span aria-hidden className="jtc-medallion"><Icon className="h-5 w-5" aria-hidden /></span>
                  <div className="jtc-card-body">
                    <h3 className="jtc-card-title">{title}</h3>
                    <p className="jtc-card-copy">{copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* values ribbon */}
        <Reveal delay={200} y={14} className="block">
          <div className="jtc-banner">
            <span className="jtc-banner-lead">
              <Sparkles className="h-4 w-4" aria-hidden />
              We are building a team of good humans and great performers.
            </span>
            <ul className="jtc-banner-values">
              {VALUES.map((v) => (
                <li key={v} className="jtc-banner-value">{v}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

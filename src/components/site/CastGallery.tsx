import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Sparkles, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import castAgnes from "@/assets/team/cast-agnes.webp";
import castAsh from "@/assets/team/cast-ash.webp";
import castJaira from "@/assets/team/cast-jaira.webp";
import castJess from "@/assets/team/cast-jess.webp";
import castJosy from "@/assets/team/cast-josy.webp";
import castKiefer from "@/assets/team/cast-kiefer.webp";
import castMimi from "@/assets/team/cast-mimi.webp";
import castRandy from "@/assets/team/cast-randy.webp";
import castShantei from "@/assets/team/cast-shantei.webp";
import castZeph from "@/assets/team/cast-zeph.webp";
import castTroy from "@/assets/team/cast-troy.webp";

/**
 * CastGallery — Section 3 of the Our Team page: "The Cast Hall". A theatre portrait
 * gallery where each performer appears as a premium cast card (portrait photo +
 * name + role + short bio + skill chips + realm badges + magic-style line). A calm
 * cream/parchment + velvet-curtain continuation of the hero & trust strip. Central
 * VCE palette. Staged reveals + faint gold dust (motion-gated under .cg.anim),
 * reduced-motion safe. See ".cg" in styles.css.
 *
 * EDITING: the `CAST` roster below is a template. Names + photos come from the team
 * Drive folder; role / bio / skills / realms / magicStyle are editable placeholders —
 * replace them with each performer's real details. Add `photo` imports as portraits
 * land in src/assets/team/ (cast-<slug>.webp). Missing photos show a portrait frame.
 */
type Vars = CSSProperties & Record<string, string | number>;

/** One-shot count-up for the framing line — runs once the curtains open. */
function CountUp({ to, go }: { to: number; go: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, to]);
  return <>{n}</>;
}

type CastMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  skills: string[];
  realms: string[];
  magicStyle: string;
};

/** World accent hues for the realm badges (matches the eight worlds). */
const REALM_ACC: Record<string, string> = {
  "Princess Realm": "#C9337E",
  "Hero Headquarters": "#3E6EA8",
  "Jurassic Expedition": "#4E8E5B",
  "Mermaid Cove": "#1E8A9E",
  "Mascot Meadows": "#6DA63C",
  "Holiday Village": "#B3433F",
  "Wonderverse": "#8E5BC8",
  "Enchanted Bazaar": "#2C8A93",
};

// Placeholder bio + magic line reused until real ones are provided.
const BIO = "A warm, expressive performer who helps guests feel welcomed, included, and excited from the first hello.";
const MAGIC = "Warm, storybook, and guest-focused.";

export const CAST: CastMember[] = [
  { id: "agnes", name: "Agnes", photo: castAgnes, role: "Performer · Party Host", bio: BIO, skills: ["Storytelling", "Games", "Photos", "Hosting"], realms: ["Princess Realm", "Holiday Village"], magicStyle: MAGIC },
  { id: "ash", name: "Ash", photo: castAsh, role: "Performer · Character Actor", bio: BIO, skills: ["Character Detail", "Movement", "Photos", "Hosting"], realms: ["Hero Headquarters", "Wonderverse"], magicStyle: MAGIC },
  { id: "jaira", name: "Jaira", photo: castJaira, role: "Performer · Singer", bio: BIO, skills: ["Singing", "Storytelling", "Games", "Photos"], realms: ["Princess Realm", "Mermaid Cove"], magicStyle: MAGIC },
  { id: "jess", name: "Jess", photo: castJess, role: "Performer · Party Host", bio: BIO, skills: ["Hosting", "Games", "Dance", "Photos"], realms: ["Mascot Meadows", "Enchanted Bazaar"], magicStyle: MAGIC },
  { id: "josy", name: "Josy", photo: castJosy, role: "Performer · Character Actor", bio: BIO, skills: ["Storytelling", "Character Detail", "Photos", "Hosting"], realms: ["Holiday Village", "Wonderverse"], magicStyle: MAGIC },
  { id: "kiefer", name: "Kiefer", photo: castKiefer, role: "Performer · Host & Assistant", bio: BIO, skills: ["Hosting", "Event Support", "Games", "Photos"], realms: ["Hero Headquarters", "Jurassic Expedition"], magicStyle: MAGIC },
  { id: "mimi", name: "Mimi", photo: castMimi, role: "Performer · Singer", bio: BIO, skills: ["Singing", "Storytelling", "Games", "Photos"], realms: ["Princess Realm", "Mermaid Cove"], magicStyle: MAGIC },
  { id: "randy", name: "Randy", photo: castRandy, role: "Performer · Character Actor", bio: BIO, skills: ["Character Detail", "Movement", "Mascot", "Photos"], realms: ["Jurassic Expedition", "Mascot Meadows"], magicStyle: MAGIC },
  { id: "shantei", name: "Shantei", photo: castShantei, role: "Performer · Party Host", bio: BIO, skills: ["Hosting", "Storytelling", "Games", "Photos"], realms: ["Princess Realm", "Enchanted Bazaar"], magicStyle: MAGIC },
  { id: "zeph", name: "Zeph", photo: castZeph, role: "Performer · Host & Assistant", bio: BIO, skills: ["Hosting", "Event Support", "Movement", "Photos"], realms: ["Hero Headquarters", "Wonderverse"], magicStyle: MAGIC },
  { id: "troy", name: "Troy", photo: castTroy, role: "Performer · Character Actor", bio: BIO, skills: ["Character Detail", "Movement", "Mascot", "Hosting"], realms: ["Jurassic Expedition", "Holiday Village"], magicStyle: MAGIC },
];

/* Faint gold dust drifting over the parchment (motion only). */
const DUST = [
  { left: "12%", s: 3, delay: "0s", dur: "16s", dx: "8px" },
  { left: "30%", s: 4, delay: "4s", dur: "18s", dx: "-7px" },
  { left: "50%", s: 3, delay: "1.8s", dur: "15s", dx: "10px" },
  { left: "70%", s: 4, delay: "5.4s", dur: "17s", dx: "-9px" },
  { left: "88%", s: 3, delay: "2.8s", dur: "16.5s", dx: "8px" },
] as const;

export function CastGallery() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotionOK(true);

    // The show starts: part the velvet curtains once the gallery takes the stage.
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCurtainOpen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Magnetic tilt + sheen: write CSS vars straight onto the card (no React state,
  // fine-pointer devices only — coarse pointers never fire pointermove hovers).
  const tiltMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((py - 0.5) * -4).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * 4).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };
  const tiltLeave = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <section
      ref={ref}
      id="cast"
      aria-labelledby="cg-title"
      className={cn("cg relative isolate overflow-hidden", motionOK && "anim")}
    >
      {/* soft warm spotlight glow at the top (CSS-only cream/parchment section) */}
      <span aria-hidden className="cg-spot absolute -z-10" />

      {/* the show starts: velvet curtains part on first view (motion only) */}
      {motionOK ? (
        <div aria-hidden className={cn("cg-curtains", curtainOpen && "is-open")}>
          <span className="cg-curtain cg-curtain--l" />
          <span className="cg-curtain cg-curtain--r" />
        </div>
      ) : null}

      {motionOK ? (
        <div aria-hidden className="cg-amb pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {DUST.map((d, i) => (
            <span
              key={`d${i}`}
              className="cg-dust"
              style={{ left: d.left, width: d.s, height: d.s, animationDelay: d.delay, animationDuration: d.dur, "--dx": d.dx } as Vars}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <Reveal y={16}>
            <span className="cg-eyebrow">
              <span aria-hidden className="cg-eyebrow-fl" />
              Meet the Cast
              <span aria-hidden className="cg-eyebrow-fl cg-eyebrow-fl--r" />
            </span>
          </Reveal>
          <Reveal delay={110} y={16}>
            <h2 id="cg-title" className="cg-title">The people behind the <em className="act-em">magic</em>.</h2>
          </Reveal>
          <Reveal delay={180} y={14}>
            <p className="cg-sub">
              Our performers, hosts, assistants, and creative team help bring each Vancouver Character
              Events world to life through storytelling, games, photos, movement, character detail, and
              thoughtful guest interaction.
            </p>
          </Reveal>
          <Reveal delay={240} y={12}>
            <p className="cg-quote">Costumes create the first impression. Performers create the memory.</p>
          </Reveal>
          <Reveal delay={300} y={10}>
            <p className="cg-count">
              <strong>{motionOK ? <CountUp to={11} go={curtainOpen} /> : 11}</strong> performers.{" "}
              <strong>{motionOK ? <CountUp to={8} go={curtainOpen} /> : 8}</strong> worlds. One standard
              of care.
            </p>
          </Reveal>
        </div>

        {/* cast cards */}
        <ul className="cg-grid">
          {CAST.map((m, i) => (
            <Reveal key={m.id} as="li" delay={280 + i * 70} y={18} className={cn("cg-cell", i === 0 && "cg-cell--featured")}>
              {/* the performer's first realm tints the frame — colour-of-light per world */}
              <article
                className="cg-card"
                style={{ "--acc": REALM_ACC[m.realms[0]] ?? "#C19A3C" } as Vars}
                onPointerMove={motionOK ? tiltMove : undefined}
                onPointerLeave={motionOK ? tiltLeave : undefined}
              >
                <span aria-hidden className="cg-sheen" />
                <div className="cg-photo">
                  {m.photo ? (
                    <img src={m.photo} alt={`Portrait of ${m.name}, Vancouver Character Events performer.`} loading="lazy" decoding="async" className="cg-photo-img" />
                  ) : (
                    <span aria-hidden className="cg-photo-ph">
                      <span className="cg-photo-ini">{m.name.charAt(0)}</span>
                      <span className="cg-photo-cap">Portrait</span>
                    </span>
                  )}
                  <span aria-hidden className="cg-photo-veil" />
                  <span aria-hidden className="cg-corner cg-corner--tl" />
                  <span aria-hidden className="cg-corner cg-corner--br" />
                </div>

                <div className="cg-info">
                  <h3 className="cg-name">{m.name}</h3>
                  <p className="cg-role">{m.role}</p>
                  <p className="cg-bio">{m.bio}</p>

                  <ul className="cg-skills">
                    {m.skills.map((s) => (
                      <li key={s} className="cg-skill">{s}</li>
                    ))}
                  </ul>

                  {m.realms.length ? (
                    <ul className="cg-realms">
                      {m.realms.map((r) => (
                        <li key={r} className="cg-realm" style={{ "--acc": REALM_ACC[r] ?? "#C19A3C" } as Vars}>
                          <span aria-hidden className="cg-realm-dot" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <p className="cg-magic">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    {m.magicStyle}
                  </p>
                </div>

                <span aria-hidden className="cg-seal"><Star className="h-3.5 w-3.5" /></span>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

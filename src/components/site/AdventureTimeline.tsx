import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, MapPin, Sparkles, Users } from "lucide-react";
import type { Adventure } from "@/lib/adventures";
import { STATUS_META } from "@/lib/adventures";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/**
 * AdventureTimeline — the year-long roadmap as a stack of full-width bands, one
 * per month. Each band's background is themed to that adventure's colours (so the
 * page flows through the event palettes instead of flat parchment), the poster
 * spans the screen width, and the write-up sits underneath. An animated month
 * marker pops, spins and rings as each band scrolls into view. Reduced-motion
 * safe (styles.css + IO).
 */
type Vars = CSSProperties & Record<string, string>;

export function AdventureTimeline({
  adventures,
  onRequest,
}: {
  adventures: Adventure[];
  onRequest: (a: Adventure) => void;
}) {
  return (
    <div className="adv-roadmap">
      {adventures.map((a) => (
        <AdventureBand key={a.id} adventure={a} onRequest={onRequest} />
      ))}
    </div>
  );
}

function AdventureBand({
  adventure,
  onRequest,
}: {
  adventure: Adventure;
  onRequest: (a: Adventure) => void;
}) {
  const { theme } = adventure;
  const bandRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = bandRef.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={bandRef}
      id={adventure.id}
      className="adv-band relative scroll-mt-24 overflow-hidden"
      style={
        {
          "--adv-accent": theme.accent,
          "--adv-deep": theme.deep,
          "--adv-glow": theme.glow,
          background: `linear-gradient(180deg, color-mix(in oklab, ${theme.accent} 6%, #FFFDF8) 0%, color-mix(in oklab, ${theme.glow} 44%, #FFFFFF) 46%, color-mix(in oklab, ${theme.accent} 15%, #FFFBF4) 100%)`,
        } as Vars
      }
    >
      {/* themed corner glow for depth */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full opacity-60 blur-3xl"
        style={{ background: `radial-gradient(circle, ${theme.accent}40, transparent 70%)` }}
      />

      {/* animated month marker */}
      <div className="relative z-10 flex justify-center pt-14 md:pt-20">
        <MonthNode adventure={adventure} inView={inView} />
      </div>

      {/* full-bleed 16:9 poster (capped height) */}
      <Reveal y={26} scaleFrom={0.99} duration={760}>
        <div
          className="adv-poster group relative mt-8 w-full overflow-hidden"
          style={{ height: "min(56.25vw, 64svh)" }}
        >
          <img
            src={adventure.image}
            alt={`${adventure.name} — a Vancouver Character Events adventure`}
            loading="lazy"
            className="adv-poster-img absolute inset-0 h-full w-full object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${theme.deep}22 0%, transparent 26%, ${theme.deep}26 60%, ${theme.deep}f0 100%)`,
            }}
          />
          {/* month badge */}
          <span
            className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white shadow-[0_8px_18px_-8px_rgba(8,17,31,0.7)] sm:left-6 sm:top-6"
            style={{ background: `linear-gradient(120deg, ${theme.accent}, ${theme.deep})` }}
          >
            {adventure.month} 2027
          </span>
          {/* status pill */}
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-white/92 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-ink-800 shadow-[0_6px_14px_-8px_rgba(8,17,31,0.5)] sm:right-6 sm:top-6">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: STATUS_META[adventure.status].tone }}
            />
            {STATUS_META[adventure.status].label}
          </span>
          {/* poster title lockup */}
          <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1200px] items-end gap-3 px-5 pb-6 sm:px-8 sm:pb-8">
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white shadow-[0_8px_18px_-8px_rgba(8,17,31,0.7)] sm:h-14 sm:w-14"
              style={{ background: `color-mix(in oklab, ${theme.accent} 82%, ${theme.deep})` }}
            >
              <adventure.icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden />
            </span>
            <h3 className="t-display text-3xl font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(8,17,31,0.75)] sm:text-5xl">
              {adventure.name}
            </h3>
          </div>
        </div>
      </Reveal>

      {/* write-up underneath */}
      <div className="relative z-10 mx-auto max-w-[940px] px-5 pb-16 pt-8 text-center sm:px-6 md:pb-24">
        <Reveal y={20}>
          <p
            className="font-display text-[1.3rem] italic leading-snug sm:text-[1.5rem]"
            style={{ color: theme.deep }}
          >
            {adventure.tagline}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.84rem] font-semibold text-ink-800/75">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" style={{ color: theme.accent }} aria-hidden />
              {adventure.venue}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-4 w-4" style={{ color: theme.accent }} aria-hidden />
              Hosted by {adventure.hosts.join(", ")}
            </span>
          </div>

          <p className="mx-auto mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-800/85">
            {adventure.description}
          </p>

          <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Character hosts">
            {adventure.hosts.map((h) => (
              <li
                key={h}
                className="rounded-[var(--radius-pill)] px-3 py-1 text-[0.72rem] font-semibold"
                style={{
                  background: `color-mix(in oklab, ${theme.accent} 16%, white)`,
                  color: theme.deep,
                }}
              >
                {h}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => onRequest(adventure)}
            className="btn-magic mt-7 inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-8 py-3.5 text-sm font-bold text-white shadow-[0_16px_34px_-16px_rgba(8,17,31,0.6)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              background: `linear-gradient(120deg, ${theme.accent}, ${theme.deep})`,
              outlineColor: theme.accent,
            }}
          >
            <Sparkles className="h-4 w-4" aria-hidden />
            Request An Invitation
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

function MonthNode({ adventure, inView }: { adventure: Adventure; inView: boolean }) {
  const Icon = adventure.icon;
  return (
    <div
      className={cn("adv-node flex flex-col items-center", inView && "is-in")}
      style={{ "--adv-accent": adventure.theme.accent } as Vars}
    >
      <div className="relative grid place-items-center">
        <span
          aria-hidden
          className="adv-node-ring absolute inset-0 rounded-full"
          style={{ boxShadow: `0 0 0 2px ${adventure.theme.accent}` }}
        />
        <span
          className="adv-node-badge grid h-16 w-16 place-items-center rounded-full border-2 border-white text-white"
          style={{
            background: `linear-gradient(150deg, ${adventure.theme.accent}, ${adventure.theme.deep})`,
            boxShadow: `0 0 0 5px color-mix(in oklab, ${adventure.theme.accent} 18%, transparent), 0 14px 30px -12px ${adventure.theme.deep}`,
          }}
        >
          <Icon className="adv-node-icon h-7 w-7" aria-hidden />
        </span>
      </div>
      <span
        className="adv-node-month t-engrave mt-2.5 text-[0.68rem] tracking-[0.24em]"
        style={{ color: adventure.theme.deep }}
      >
        {adventure.month} 2027
      </span>
    </div>
  );
}

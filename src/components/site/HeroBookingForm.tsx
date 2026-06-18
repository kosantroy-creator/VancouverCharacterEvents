import { useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  Loader2,
  Lock,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { heroSquad } from "@/lib/hero-roster";
import { submitInquiry } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

import cutWebSlinger from "@/assets/hero/cutouts/web-slinger.webp";
import cutWebDancer from "@/assets/hero/cutouts/web-dancer.webp";
import cutCaptainValor from "@/assets/hero/cutouts/captain-valor.webp";
import cutStarCaptain from "@/assets/hero/cutouts/star-captain.webp";
import cutMidnightAgent from "@/assets/hero/cutouts/midnight-agent.webp";
import cutFrostAgent from "@/assets/hero/cutouts/frost-agent.webp";
import cutSteelSentinel from "@/assets/hero/cutouts/steel-sentinel.webp";
import cutNightGuardian from "@/assets/hero/cutouts/night-guardian.webp";
import cutWarriorPrincess from "@/assets/hero/cutouts/warrior-princess.webp";

/**
 * HeroBookingForm — a guided 3-step "mission request" wizard (Mission → Location
 * → Contact). Front-end only (no endpoint / no payment): it captures the request
 * and shows a warm confirmation. The centerpiece is the visual character chooser:
 * selecting the first hero plays an "Hero Activated" energy burst; selecting a
 * second escalates to a synchronized "Squad Ready" pulse. Brand-safe names only;
 * energy effects + reduced-motion guards live in styles.css "HERO BOOKING WIZARD".
 */

const CUTOUT: Record<string, string> = {
  "web-slinger": cutWebSlinger,
  "web-dancer": cutWebDancer,
  "captain-valor": cutCaptainValor,
  "star-captain": cutStarCaptain,
  "midnight-agent": cutMidnightAgent,
  "frost-agent": cutFrostAgent,
  "steel-sentinel": cutSteelSentinel,
  "night-guardian": cutNightGuardian,
  "warrior-princess": cutWarriorPrincess,
};

const CATEGORY_ACCENT: Record<string, string> = {
  "web-heroes": "var(--hero-red)",
  "star-shield-heroes": "var(--hero-blue)",
  "legends-guardians": "var(--hero-gold)",
};

type HeroChar = { id: string; name: string; suit: string; category: string; accent: string };
type HeroGroup = { id: string; label: string; chars: HeroChar[] };

const GROUPS: HeroGroup[] = heroSquad.doors.map((d) => ({
  id: d.id,
  label: d.name,
  chars: d.characters.map((c) => ({
    id: c.id,
    name: c.name,
    suit: c.gown,
    category: d.name,
    accent: CATEGORY_ACCENT[d.id] ?? "var(--hero-blue)",
  })),
}));
const CHAR_BY_ID: Record<string, HeroChar> = {};
const NAME_TO_ID: Record<string, string> = {};
GROUPS.forEach((g) =>
  g.chars.forEach((c) => {
    CHAR_BY_ID[c.id] = c;
    NAME_TO_ID[c.name] = c.id;
  }),
);

const PACKAGES = ["Hero Visit + Sidekick Support", "Duo Hero Adventure", "Not sure yet"] as const;
const EVENT_TYPES = [
  "Birthday Party",
  "School Event",
  "Community Event",
  "Festival",
  "Corporate Event",
  "Other",
] as const;

const STEPS = [
  { label: "Mission", sub: "Choose Your Mission" },
  { label: "Location", sub: "Mission Location" },
  { label: "Contact", sub: "Contact & Launch" },
] as const;

const labelCls = "mb-1.5 block text-sm font-semibold text-[var(--hero-navy)]";
const fieldCls =
  "w-full rounded-[var(--radius-md)] border border-[var(--hero-blue)]/30 bg-[var(--hero-ice)]/60 px-4 py-2.5 text-base text-[var(--hero-navy)] placeholder:text-[var(--hero-navy)]/40 transition-colors focus:border-[var(--hero-blue)] focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--hero-blue)]";

type WizardData = {
  eventDate: string;
  eventTime: string;
  eventType: string;
  pkg: string;
  char1: string | null;
  char2: string | null;
  venueName: string;
  street: string;
  city: string;
  guestCount: string;
  clientName: string;
  childName: string;
  email: string;
  phone: string;
  specialNotes: string;
};

const EMPTY: WizardData = {
  eventDate: "",
  eventTime: "",
  eventType: "",
  pkg: "",
  char1: null,
  char2: null,
  venueName: "",
  street: "",
  city: "",
  guestCount: "",
  clientName: "",
  childName: "",
  email: "",
  phone: "",
  specialNotes: "",
};

export function HeroBookingForm({ requestedHero }: { requestedHero?: string }) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<WizardData>(() => ({
    ...EMPTY,
    char1: requestedHero ? (NAME_TO_ID[requestedHero] ?? null) : null,
  }));
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hp, setHp] = useState(""); // honeypot
  /** bumped on every character ADD — re-keys activation overlays so selecting a
   *  second hero replays both bursts together (the "squad linked" beat). */
  const [selToken, setSelToken] = useState(0);
  const [squadToken, setSquadToken] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof WizardData>(k: K, v: WizardData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const isDuo = data.pkg === "Duo Hero Adventure";
  const notSure = data.pkg === "Not sure yet";
  const selected = [data.char1, data.char2].filter(Boolean) as string[];
  const squadReady = selected.length === 2;

  const toggleChar = (id: string) => {
    const sel = [data.char1, data.char2].filter(Boolean) as string[];
    if (sel.includes(id)) {
      const next = sel.filter((x) => x !== id);
      setData((d) => ({ ...d, char1: next[0] ?? null, char2: next[1] ?? null }));
      return;
    }
    if (sel.length >= 2) return;
    const next = [...sel, id];
    setData((d) => ({ ...d, char1: next[0] ?? null, char2: next[1] ?? null }));
    setSelToken((t) => t + 1);
    if (next.length === 2) setSquadToken((t) => t + 1);
  };

  const step1Hint = (): string | null => {
    if (!data.eventDate) return "Choose an event date to continue.";
    if (!data.eventTime) return "Add an event time to continue.";
    if (!data.eventType) return "Select an event type.";
    if (!data.pkg) return "Select a package, or choose “Not sure yet.”";
    if (!notSure && !data.char1) return "Pick your main hero to continue.";
    if (isDuo && !data.char2)
      return "Choose a second hero for the Duo Hero Adventure package, or change your package.";
    return null;
  };
  const step2Hint = (): string | null => {
    if (!data.street.trim()) return "Add the event street address.";
    if (!data.city.trim()) return "Add the event city.";
    if (!data.guestCount.trim()) return "Add an approximate guest count.";
    return null;
  };
  const step3Hint = (): string | null => {
    if (!data.clientName.trim()) return "Add your name.";
    if (!data.email.trim()) return "Add an email so we can reach you.";
    if (!data.phone.trim()) return "Add a phone number.";
    return null;
  };

  const canStep1 = step1Hint() === null;
  const canStep2 = step2Hint() === null;
  const canSubmit = step3Hint() === null;

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
    requestAnimationFrame(() =>
      cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hp) return; // honeypot
    if (!canSubmit) return;
    const c1 = data.char1 ? CHAR_BY_ID[data.char1] : null;
    const c2 = data.char2 ? CHAR_BY_ID[data.char2] : null;
    const fields: Record<string, string> = {
      name: data.clientName,
      email: data.email,
      phone: data.phone,
      childName: data.childName,
      eventType: data.eventType,
      package: data.pkg,
      heroes: [c1?.name, c2?.name].filter(Boolean).join(" + "),
      date: data.eventDate,
      time: data.eventTime,
      venue: data.venueName,
      address: [data.street, data.city].filter(Boolean).join(", "),
      guests: data.guestCount,
      specialNotes: data.specialNotes,
    };
    setSubmitting(true);
    setError(null);
    const res = await submitInquiry("Hero Headquarters", fields);
    setSubmitting(false);
    if (res.ok) setSent(true);
    else setError(res.error || "Something went wrong. Please try again.");
  };

  if (sent)
    return (
      <MissionSent
        onReset={() => {
          setSent(false);
          setStep(1);
          setData(EMPTY);
        }}
      />
    );

  return (
    <div
      ref={cardRef}
      className="hwz relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--hero-blue)]/30 bg-white/85 p-5 shadow-[0_28px_64px_-32px_rgba(36,66,104,0.45)] backdrop-blur sm:p-7"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 text-[var(--hero-blue)]/8"
      >
        <Shield className="h-full w-full" />
      </span>

      <p className="text-center text-[0.62rem] font-bold uppercase tracking-[0.22em] text-[var(--hero-red-deep)]">
        3-Step Booking Wizard
      </p>

      <Stepper step={step} />

      <form onSubmit={handleSubmit} noValidate className="mt-7">
        {/* Honeypot */}
        <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="hh-company">Company (leave blank)</label>
          <input
            id="hh-company"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>

        <div key={step} className={cn("hwz-step", dir >= 0 ? "hwz-step--fwd" : "hwz-step--back")}>
          {step === 1 ? (
            <StepMission
              data={data}
              set={set}
              isDuo={isDuo}
              notSure={notSure}
              selected={selected}
              squadReady={squadReady}
              selToken={selToken}
              squadToken={squadToken}
              toggleChar={toggleChar}
            />
          ) : step === 2 ? (
            <StepLocation data={data} set={set} />
          ) : (
            <StepContact data={data} set={set} />
          )}
        </div>

        {/* Controls */}
        <div className="mt-7 border-t border-[var(--hero-blue)]/15 pt-5">
          {step === 1 ? (
            <StepHint hint={step1Hint()} />
          ) : step === 2 ? (
            <StepHint hint={step2Hint()} />
          ) : (
            <StepHint hint={step3Hint()} />
          )}

          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-[var(--radius-md)] border border-[var(--hero-red)]/40 bg-[var(--hero-red)]/10 px-4 py-2.5 text-sm text-[var(--hero-navy)]"
            >
              {error} You can also email us directly at info@vancouvercharacterevents.com.
            </p>
          ) : null}

          <div className="mt-3 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => go(step - 1)}
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border-2 border-[var(--hero-blue)]/40 bg-white px-5 py-3 text-sm font-bold text-[var(--hero-blue-deep)] transition-colors hover:border-[var(--hero-blue)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-blue)]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden /> Back
              </button>
            ) : (
              <span className="hidden sm:block" />
            )}

            {step < 3 ? (
              <button
                key={squadToken}
                type="button"
                disabled={step === 1 ? !canStep1 : !canStep2}
                onClick={() => go(step + 1)}
                className={cn(
                  "hwz-go btn-magic relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-7 py-3.5 text-sm font-bold text-white transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-blue)] sm:min-w-[15rem]",
                  (step === 1 ? canStep1 : canStep2) ? "is-ready" : "is-idle",
                  step === 1 && squadReady && "is-charged",
                )}
              >
                {step === 1 ? "Continue to Location" : "Continue to Contact"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className={cn(
                  "hwz-go btn-magic relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-7 py-3.5 text-sm font-bold text-white transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-red)] sm:min-w-[15rem]",
                  canSubmit ? "is-ready is-send" : "is-idle",
                )}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                  </>
                ) : (
                  <>
                    Send Mission Request <Send className="h-4 w-4" aria-hidden />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

/* ----------------------------------------------------------------------------- */

function Stepper({ step }: { step: number }) {
  return (
    <div className="relative mx-auto mt-4 max-w-md px-3">
      {/* rail */}
      <div className="absolute left-[26px] right-[26px] top-[18px] h-[3px] rounded bg-[var(--hero-blue)]/25">
        <div
          className="h-full rounded bg-gradient-to-r from-[var(--hero-blue)] to-[var(--hero-red)] transition-[width] duration-[350ms] ease-[var(--ease-out)]"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
      </div>
      <ol className="relative flex items-start justify-between">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const state = n < step ? "done" : n === step ? "active" : "todo";
          return (
            <li key={s.label} className="flex flex-1 flex-col items-center text-center">
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full border-2 text-sm font-bold transition-all duration-300",
                  state === "active" &&
                    "border-[var(--hero-red)] bg-[var(--hero-red)] text-white shadow-[0_0_0_4px_rgba(216,58,74,0.16),0_8px_18px_-6px_rgba(216,58,74,0.6)]",
                  state === "done" && "border-[var(--hero-blue)] bg-[var(--hero-blue)] text-white",
                  state === "todo" &&
                    "border-[var(--hero-blue)]/35 bg-white text-[var(--hero-blue-deep)]/55",
                )}
              >
                {state === "done" ? <Check className="h-4 w-4" aria-hidden /> : n}
              </span>
              <span
                className={cn(
                  "mt-2 text-[0.62rem] font-bold uppercase tracking-[0.16em]",
                  state === "todo" ? "text-[var(--hero-navy)]/45" : "text-[var(--hero-navy)]",
                )}
              >
                {s.label}
              </span>
              <span className="mt-0.5 hidden text-[0.6rem] text-fg-3 sm:block">{s.sub}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StepHint({ hint }: { hint: string | null }) {
  if (!hint) {
    return (
      <p className="flex items-center justify-center gap-1.5 text-[0.8rem] font-semibold text-[var(--hero-blue-deep)] sm:justify-start">
        <Check className="h-4 w-4 text-[var(--hero-blue)]" aria-hidden /> Looks good — ready to
        continue.
      </p>
    );
  }
  return (
    <p className="flex items-center justify-center gap-1.5 text-[0.8rem] font-medium text-[var(--hero-red-deep)] sm:justify-start">
      <Sparkles className="h-4 w-4" aria-hidden /> {hint}
    </p>
  );
}

/* ------------------------------------------------------------------ Step 1 --- */

function StepMission({
  data,
  set,
  isDuo,
  notSure,
  selected,
  squadReady,
  selToken,
  squadToken,
  toggleChar,
}: {
  data: WizardData;
  set: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
  isDuo: boolean;
  notSure: boolean;
  selected: string[];
  squadReady: boolean;
  selToken: number;
  squadToken: number;
  toggleChar: (id: string) => void;
}) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="hh-date">
            Event Date
          </label>
          <input
            id="hh-date"
            type="date"
            className={fieldCls}
            value={data.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="hh-time">
            Event Time
          </label>
          <input
            id="hh-time"
            type="time"
            className={fieldCls}
            value={data.eventTime}
            onChange={(e) => set("eventTime", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="hh-type">
            Event Type
          </label>
          <select
            id="hh-type"
            className={fieldCls}
            value={data.eventType}
            onChange={(e) => set("eventType", e.target.value)}
          >
            <option value="" disabled>
              Select event type
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <label className={labelCls} htmlFor="hh-package">
            Package
          </label>
          <select
            id="hh-package"
            className={fieldCls}
            value={data.pkg}
            onChange={(e) => set("pkg", e.target.value)}
          >
            <option value="" disabled>
              Select a package
            </option>
            {PACKAGES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <a
          href="#mission-control"
          className="inline-flex items-center gap-1.5 self-end pb-2.5 text-sm font-semibold text-[var(--hero-blue-deep)] underline-offset-4 hover:underline"
        >
          <Sparkles className="h-4 w-4" aria-hidden /> Not sure? Help me choose
        </a>
      </div>

      {/* Character chooser */}
      <div className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--hero-blue-deep)]">
            Choose Your Heroes
          </p>
          <p className="text-xs text-fg-3">
            Pick your main hero{isDuo ? " and a second hero" : " (add a second hero if you like)"}.
          </p>
        </div>

        <div className="relative mt-3">
          {GROUPS.map((g) => (
            <div key={g.id} className="mt-3 first:mt-0">
              <p
                className="mb-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em]"
                style={{ color: g.chars[0]?.accent }}
              >
                {g.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {g.chars.map((c) => {
                  const isOn = selected.includes(c.id);
                  const slot = data.char1 === c.id ? 1 : data.char2 === c.id ? 2 : null;
                  const full = selected.length >= 2 && !isOn;
                  return (
                    <CharacterCard
                      key={c.id}
                      char={c}
                      isOn={isOn}
                      slot={slot}
                      full={full}
                      selToken={selToken}
                      onToggle={() => toggleChar(c.id)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
          {/* one-shot connecting flash when the squad links up */}
          {squadReady ? <span key={squadToken} aria-hidden className="hwz-squadflash" /> : null}
        </div>
      </div>

      {/* Selected squad tray */}
      <SquadTray
        data={data}
        isDuo={isDuo}
        notSure={notSure}
        squadReady={squadReady}
        squadToken={squadToken}
      />
    </div>
  );
}

function CharacterCard({
  char,
  isOn,
  slot,
  full,
  selToken,
  onToggle,
}: {
  char: HeroChar;
  isOn: boolean;
  slot: number | null;
  full: boolean;
  selToken: number;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={isOn}
      onClick={onToggle}
      className={cn(
        "hwz-char group relative flex w-[100px] flex-col overflow-hidden rounded-xl border-2 bg-white/85 p-1 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-blue)] sm:w-[108px]",
        isOn
          ? "is-on"
          : "border-[var(--hero-blue)]/25 hover:-translate-y-0.5 hover:border-[var(--hero-blue)]/60 hover:shadow-[0_14px_30px_-16px_rgba(79,143,220,0.6)]",
        full && "pointer-events-none opacity-45",
      )}
    >
      <span
        className="relative block aspect-[5/6] overflow-hidden rounded-lg"
        style={{ background: "linear-gradient(180deg, #EAF2FF 0%, #CBDDF3 100%)" }}
      >
        <img
          src={CUTOUT[char.id]}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_6px_10px_rgba(8,17,31,0.35)] transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {isOn ? (
          <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--hero-blue)] text-white shadow-[0_0_0_2px_#fff]">
            <Check className="h-3 w-3" aria-hidden />
          </span>
        ) : null}
        {isOn && slot ? (
          <span className="absolute left-1 top-1 rounded-full bg-[var(--hero-red)] px-1 py-0.5 text-[0.44rem] font-bold uppercase tracking-wide text-white">
            Hero {slot}
          </span>
        ) : null}
        {/* hover corner accents */}
        <span className="pointer-events-none absolute left-1 top-1 h-3 w-3 rounded-tl-[6px] border-l-2 border-t-2 border-[var(--hero-red)]/0 transition-colors duration-300 group-hover:border-[var(--hero-red)]/70" />
        <span className="pointer-events-none absolute bottom-1 right-1 h-3 w-3 rounded-br-[6px] border-b-2 border-r-2 border-[var(--hero-blue)]/0 transition-colors duration-300 group-hover:border-[var(--hero-blue)]/70" />
        {/* one-shot activation burst */}
        {isOn ? (
          <span key={`act-${selToken}`} aria-hidden className="hwz-activate">
            <span className="hwz-pulse" />
            <span className="hwz-spark hwz-spark--tl" />
            <span className="hwz-spark hwz-spark--tr" />
            <span className="hwz-spark hwz-spark--bl" />
            <span className="hwz-spark hwz-spark--br" />
          </span>
        ) : null}
      </span>
      <span className="mt-1 px-0.5 pb-0.5">
        <span className="block truncate font-display text-[0.72rem] font-bold leading-tight text-[var(--hero-navy)]">
          {char.name}
        </span>
        <span className="block truncate text-[0.5rem] leading-tight text-[var(--hero-blue-deep)]/75">
          {char.suit}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[0.52rem] font-bold uppercase tracking-wide",
            isOn ? "text-[var(--hero-red)]" : "text-[var(--hero-blue-deep)]",
          )}
        >
          {isOn ? "Hero Activated" : "Select Hero"}
        </span>
      </span>
    </button>
  );
}

function SquadTray({
  data,
  isDuo,
  notSure,
  squadReady,
  squadToken,
}: {
  data: WizardData;
  isDuo: boolean;
  notSure: boolean;
  squadReady: boolean;
  squadToken: number;
}) {
  const status = squadReady
    ? "Squad Ready"
    : data.char1
      ? "Hero Activated"
      : "Awaiting hero selection";
  const slot2Label = isDuo ? "Second hero required" : notSure ? "Optional" : "Add a second hero";

  return (
    <div
      className={cn(
        "hwz-tray mt-6 rounded-2xl border bg-[var(--hero-ice)]/70 p-4 backdrop-blur-sm transition-all duration-300",
        squadReady
          ? "border-[var(--hero-red)]/40 shadow-[0_0_24px_-6px_rgba(216,58,74,0.4)]"
          : "border-[var(--hero-blue)]/25",
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--hero-blue-deep)]">
          Selected Squad
        </p>
        <span
          key={squadToken}
          className={cn(
            "hwz-status inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wide",
            squadReady
              ? "bg-[var(--hero-red)] text-white"
              : data.char1
                ? "bg-[var(--hero-blue)] text-white"
                : "bg-[var(--hero-blue)]/12 text-[var(--hero-blue-deep)]",
          )}
        >
          {squadReady ? <ShieldCheck className="h-3 w-3" aria-hidden /> : null}
          {status}
        </span>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <SquadSlot id={data.char1} placeholder="Awaiting hero" label="Slot 1" />
        <SquadSlot id={data.char2} placeholder={slot2Label} label="Slot 2" />
      </div>
    </div>
  );
}

function SquadSlot({
  id,
  placeholder,
  label,
}: {
  id: string | null;
  placeholder: string;
  label: string;
}) {
  const c = id ? CHAR_BY_ID[id] : null;
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2 transition-all duration-300",
        c
          ? "border-[var(--hero-blue)]/40 bg-white"
          : "border-dashed border-[var(--hero-blue)]/30 bg-white/40",
      )}
    >
      <span
        className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg"
        style={{ background: "linear-gradient(180deg,#EAF2FF,#CBDDF3)" }}
      >
        {c ? (
          <img
            src={CUTOUT[c.id]}
            alt=""
            aria-hidden
            className="h-full w-full object-contain object-bottom"
          />
        ) : (
          <Users className="h-4 w-4 text-[var(--hero-blue)]/50" aria-hidden />
        )}
      </span>
      <div className="min-w-0">
        <p className="text-[0.55rem] font-bold uppercase tracking-wide text-fg-3">{label}</p>
        {c ? (
          <p className="truncate text-sm font-bold text-[var(--hero-navy)]">{c.name}</p>
        ) : (
          <p className="truncate text-sm text-[var(--hero-navy)]/45">{placeholder}</p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Step 2 --- */

function StepLocation({
  data,
  set,
}: {
  data: WizardData;
  set: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
}) {
  return (
    <div className="grid gap-4">
      <div>
        <label className={labelCls} htmlFor="hh-venue">
          Event Name / Venue Name{" "}
          <span className="font-normal text-[var(--hero-navy)]/45">(optional)</span>
        </label>
        <input
          id="hh-venue"
          type="text"
          className={fieldCls}
          placeholder="Restaurant, school, community centre, or home party"
          value={data.venueName}
          onChange={(e) => set("venueName", e.target.value)}
        />
      </div>
      <div>
        <label className={labelCls} htmlFor="hh-street">
          Street Address
        </label>
        <input
          id="hh-street"
          type="text"
          autoComplete="street-address"
          className={fieldCls}
          placeholder="123 Hero Way"
          value={data.street}
          onChange={(e) => set("street", e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="hh-city">
            City
          </label>
          <input
            id="hh-city"
            type="text"
            autoComplete="address-level2"
            className={fieldCls}
            placeholder="Coquitlam"
            value={data.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </div>
        <div>
          <span className={labelCls}>Province</span>
          <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--hero-blue)]/30 bg-[var(--hero-blue)]/8 px-4 py-2.5 text-base font-semibold text-[var(--hero-navy)]">
            BC
            <Lock className="h-3.5 w-3.5 text-[var(--hero-blue)]/60" aria-hidden />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="hh-guests">
            Guest Count
          </label>
          <input
            id="hh-guests"
            type="number"
            min={1}
            inputMode="numeric"
            className={fieldCls}
            placeholder="e.g. 20"
            value={data.guestCount}
            onChange={(e) => set("guestCount", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Step 3 --- */

function StepContact({
  data,
  set,
}: {
  data: WizardData;
  set: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,17rem)]">
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="hh-client">
              Client Name
            </label>
            <input
              id="hh-client"
              type="text"
              autoComplete="name"
              className={fieldCls}
              placeholder="Your full name"
              value={data.clientName}
              onChange={(e) => set("clientName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="hh-child">
              Child Name <span className="font-normal text-[var(--hero-navy)]/45">(optional)</span>
            </label>
            <input
              id="hh-child"
              type="text"
              className={fieldCls}
              placeholder="Birthday child’s name"
              value={data.childName}
              onChange={(e) => set("childName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="hh-email">
              Email
            </label>
            <input
              id="hh-email"
              type="email"
              autoComplete="email"
              className={fieldCls}
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="hh-phone">
              Phone
            </label>
            <input
              id="hh-phone"
              type="tel"
              autoComplete="tel"
              className={fieldCls}
              placeholder="(604) 123-4567"
              value={data.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="hh-notes">
            Special Notes <span className="font-normal text-[var(--hero-navy)]/45">(optional)</span>
          </label>
          <textarea
            id="hh-notes"
            rows={4}
            className={fieldCls}
            placeholder="Theme, favourite hero, timing, any special wishes…"
            value={data.specialNotes}
            onChange={(e) => set("specialNotes", e.target.value)}
          />
        </div>
      </div>

      <MissionSummary data={data} />
    </div>
  );
}

function MissionSummary({ data }: { data: WizardData }) {
  const c1 = data.char1 ? CHAR_BY_ID[data.char1] : null;
  const c2 = data.char2 ? CHAR_BY_ID[data.char2] : null;
  const rows: { label: string; value: string }[] = [
    { label: "Date", value: data.eventDate || "—" },
    { label: "Time", value: data.eventTime || "—" },
    { label: "Event Type", value: data.eventType || "—" },
    { label: "Package", value: data.pkg || "—" },
    { label: "Venue", value: data.venueName || "—" },
    { label: "City", value: data.city || "—" },
    { label: "Guests", value: data.guestCount || "—" },
  ];
  return (
    <aside className="h-fit rounded-2xl border border-[var(--hero-blue)]/30 bg-[var(--hero-ice)]/60 p-4 backdrop-blur-sm">
      <p className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[var(--hero-blue-deep)]">
        <Shield className="h-3.5 w-3.5" aria-hidden /> Mission Summary
      </p>
      <dl className="mt-3 space-y-2 text-sm">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-baseline justify-between gap-3 border-b border-[var(--hero-blue)]/12 pb-2 last:border-0"
          >
            <dt className="text-fg-3">{r.label}</dt>
            <dd className="text-right font-semibold text-[var(--hero-navy)]">{r.value}</dd>
          </div>
        ))}
        <div className="pt-1">
          <dt className="text-fg-3">Characters</dt>
          <dd className="mt-1.5 space-y-1.5">
            {c1 || c2 ? (
              [c1, c2].filter(Boolean).map((c) => (
                <span
                  key={c!.id}
                  className="flex items-center gap-2 rounded-lg bg-white/70 px-2 py-1"
                >
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-md"
                    style={{ background: "linear-gradient(180deg,#EAF2FF,#CBDDF3)" }}
                  >
                    <img
                      src={CUTOUT[c!.id]}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-contain object-bottom"
                    />
                  </span>
                  <span className="truncate text-[0.8rem] font-semibold text-[var(--hero-navy)]">
                    {c!.name}
                  </span>
                </span>
              ))
            ) : (
              <span className="text-[0.82rem] text-[var(--hero-navy)]/45">
                We&apos;ll help you choose
              </span>
            )}
          </dd>
        </div>
      </dl>
    </aside>
  );
}

/* ----------------------------------------------------------------- Success --- */

function MissionSent({ onReset }: { onReset: () => void }) {
  return (
    <div className="hwz-sent relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--hero-blue)]/40 bg-white/90 p-10 text-center shadow-[0_24px_60px_-30px_rgba(36,66,104,0.45)] backdrop-blur">
      <span aria-hidden className="hwz-sent-rays pointer-events-none absolute inset-0" />
      <span
        aria-hidden
        className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--hero-blue)] to-[var(--hero-blue-deep)] text-white shadow-[0_14px_30px_-10px_rgba(36,66,104,0.6)]"
      >
        <ShieldCheck className="h-10 w-10" />
      </span>
      <h3 className="t-display relative mt-6 text-3xl text-[var(--hero-navy)] md:text-4xl">
        Mission Request Sent
      </h3>
      <p className="relative mx-auto mt-3 max-w-md text-fg-2">
        Thanks! We&apos;ll review your mission details and follow up to confirm availability.
      </p>
      <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/"
          className="btn-magic inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-gradient-to-r from-[var(--hero-blue)] to-[var(--hero-blue-deep)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_14px_30px_-12px_rgba(36,66,104,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--hero-blue)]"
        >
          <Home className="h-4 w-4" aria-hidden /> Back to Home
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-[var(--hero-blue-deep)] underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    </div>
  );
}

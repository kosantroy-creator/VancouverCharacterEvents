import { useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Crown,
  Home,
  Loader2,
  Lock,
  MapPin,
  Send,
  Sparkles,
  Wand2,
} from "lucide-react";
import { princessCourt } from "@/lib/royal-court";
import { CARD_ART } from "./KingdomDoors";
import { cn } from "@/lib/utils";

/**
 * PrincessBookingForm — a gentle 3-step "royal visit" wizard (Choose the Magic →
 * Royal Location → Contact & Wishes). The royal sibling of HeroBookingForm:
 * front-end only (no endpoint / no payment), with a visual princess chooser whose
 * selection plays a soft sparkle "Princess Chosen" glow, escalating to "Royal Duo
 * Ready" when a second is added. Pink/gold/navy + magical motion (no hero energy);
 * effects + reduced-motion guards live in styles.css "PRINCESS BOOKING WIZARD".
 */

type Royal = { id: string; name: string; gown: string; kingdom: string };
type Kingdom = { id: string; label: string; royals: Royal[] };

const KINGDOMS: Kingdom[] = princessCourt.doors.map((d) => ({
  id: d.id,
  label: d.name,
  royals: d.characters.map((c) => ({ id: c.id, name: c.name, gown: c.gown, kingdom: d.name })),
}));
const ROYAL_BY_ID: Record<string, Royal> = {};
const NAME_TO_ID: Record<string, string> = {};
KINGDOMS.forEach((k) =>
  k.royals.forEach((r) => {
    ROYAL_BY_ID[r.id] = r;
    NAME_TO_ID[r.name] = r.id;
  }),
);

const PACKAGES = ["Single Princess", "Duo · Princess + Prince", "Not sure yet"] as const;
const EVENT_TYPES = [
  "Birthday Party",
  "Tea Party",
  "School Event",
  "Community Event",
  "Festival",
  "Other",
] as const;

const STEPS = [
  { label: "The Magic", sub: "Choose the Magic" },
  { label: "Location", sub: "Royal Location" },
  { label: "Wishes", sub: "Contact & Wishes" },
] as const;

const labelCls = "mb-1.5 block text-sm font-semibold text-ink-800";
const fieldCls =
  "w-full rounded-[var(--radius-md)] border border-[#EBC6D8] bg-[#FFF8FB] px-4 py-2.5 text-base text-ink-800 placeholder:text-ink-700/45 transition-colors focus:border-[var(--pp-magenta)] focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--pp-magenta)]";

type WizardData = {
  eventDate: string;
  eventTime: string;
  eventType: string;
  pkg: string;
  royal1: string | null;
  royal2: string | null;
  venueName: string;
  street: string;
  city: string;
  guestCount: string;
  clientName: string;
  childName: string;
  email: string;
  phone: string;
  wishes: string;
};

const EMPTY: WizardData = {
  eventDate: "",
  eventTime: "",
  eventType: "",
  pkg: "",
  royal1: null,
  royal2: null,
  venueName: "",
  street: "",
  city: "",
  guestCount: "",
  clientName: "",
  childName: "",
  email: "",
  phone: "",
  wishes: "",
};

export function PrincessBookingForm({ requestedGuest }: { requestedGuest?: string }) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<WizardData>(() => ({
    ...EMPTY,
    royal1: requestedGuest ? (NAME_TO_ID[requestedGuest] ?? null) : null,
  }));
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hp, setHp] = useState("");
  const [selToken, setSelToken] = useState(0);
  const [duoToken, setDuoToken] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof WizardData>(k: K, v: WizardData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const isDuo = data.pkg === "Duo · Princess + Prince";
  const notSure = data.pkg === "Not sure yet";
  const selected = [data.royal1, data.royal2].filter(Boolean) as string[];
  const duoReady = selected.length === 2;

  const toggleRoyal = (id: string) => {
    const sel = [data.royal1, data.royal2].filter(Boolean) as string[];
    if (sel.includes(id)) {
      const next = sel.filter((x) => x !== id);
      setData((d) => ({ ...d, royal1: next[0] ?? null, royal2: next[1] ?? null }));
      return;
    }
    if (sel.length >= 2) return;
    const next = [...sel, id];
    setData((d) => ({ ...d, royal1: next[0] ?? null, royal2: next[1] ?? null }));
    setSelToken((t) => t + 1);
    if (next.length === 2) setDuoToken((t) => t + 1);
  };

  const step1Hint = (): string | null => {
    if (!data.eventDate) return "Choose an event date to continue.";
    if (!data.eventTime) return "Add an event time to continue.";
    if (!data.eventType) return "Tell us what kind of celebration this is.";
    if (!data.pkg) return "Choose a package, or pick “Not sure yet.”";
    if (!notSure && !data.royal1) return "Choose your guest of honour to continue.";
    if (isDuo && !data.royal2)
      return "Choose a second royal for the Princess + Prince package, or change your package.";
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hp) return;
    if (!canSubmit) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 700);
  };

  if (sent) {
    return (
      <RoyalSent
        onReset={() => {
          setSent(false);
          setStep(1);
          setData(EMPTY);
        }}
      />
    );
  }

  return (
    <div
      ref={cardRef}
      className="pwz relative overflow-hidden rounded-[var(--radius-xl)] border border-gold-500/40 bg-white/85 p-5 shadow-[0_28px_64px_-32px_rgba(162,27,97,0.4)] backdrop-blur sm:p-7"
    >
      <Sparkles
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 text-[var(--pp-magenta)]/8"
      />

      <p className="text-center text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold-600">
        ✦ A Three-Step Royal Request ✦
      </p>

      <Stepper step={step} />

      <form onSubmit={handleSubmit} noValidate className="mt-7">
        <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="pp-company">Company (leave blank)</label>
          <input
            id="pp-company"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>

        <div key={step} className={cn("pwz-step", dir >= 0 ? "pwz-step--fwd" : "pwz-step--back")}>
          {step === 1 ? (
            <StepMagic
              data={data}
              set={set}
              isDuo={isDuo}
              notSure={notSure}
              selected={selected}
              duoReady={duoReady}
              selToken={selToken}
              duoToken={duoToken}
              toggleRoyal={toggleRoyal}
            />
          ) : step === 2 ? (
            <StepLocation data={data} set={set} />
          ) : (
            <StepWishes data={data} set={set} />
          )}
        </div>

        <div className="mt-7 border-t border-gold-500/20 pt-5">
          {step === 1 ? (
            <StepHint hint={step1Hint()} />
          ) : step === 2 ? (
            <StepHint hint={step2Hint()} />
          ) : (
            <StepHint hint={step3Hint()} />
          )}

          <div className="mt-3 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => go(step - 1)}
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] border-2 border-gold-500/40 bg-white px-5 py-3 text-sm font-semibold text-[var(--pp-magenta-deep)] transition-colors hover:border-gold-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden /> Back
              </button>
            ) : (
              <span className="hidden sm:block" />
            )}

            {step < 3 ? (
              <button
                key={duoToken}
                type="button"
                disabled={step === 1 ? !canStep1 : !canStep2}
                onClick={() => go(step + 1)}
                className={cn(
                  "pwz-go btn-magic relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-7 py-3.5 text-sm font-semibold text-white transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 sm:min-w-[15rem]",
                  (step === 1 ? canStep1 : canStep2) ? "is-ready" : "is-idle",
                  step === 1 && duoReady && "is-charged",
                )}
              >
                {step === 1 ? "Continue to Location" : "Continue to Wishes"}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className={cn(
                  "pwz-go btn-magic relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-7 py-3.5 text-sm font-semibold text-white transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 sm:min-w-[15rem]",
                  canSubmit ? "is-ready" : "is-idle",
                )}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
                  </>
                ) : (
                  <>
                    Send Royal Request <Send className="h-4 w-4" aria-hidden />
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
      <div className="absolute left-[26px] right-[26px] top-[18px] h-[3px] rounded bg-gold-500/25">
        <div
          className="h-full rounded bg-gradient-to-r from-gold-500 to-[var(--pp-magenta)] transition-[width] duration-[350ms] ease-[var(--ease-out)]"
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
                    "border-[var(--pp-magenta)] bg-[var(--pp-magenta)] text-white shadow-[0_0_0_4px_rgba(194,24,106,0.14),0_8px_18px_-6px_rgba(162,27,97,0.55)]",
                  state === "done" && "border-gold-500 bg-gold-500 text-ink-900",
                  state === "todo" &&
                    "border-gold-500/35 bg-white text-[var(--pp-magenta-deep)]/55",
                )}
              >
                {state === "done" ? <Check className="h-4 w-4" aria-hidden /> : n}
              </span>
              <span
                className={cn(
                  "mt-2 text-[0.62rem] font-bold uppercase tracking-[0.16em]",
                  state === "todo" ? "text-ink-700/45" : "text-ink-800",
                )}
              >
                {s.label}
              </span>
              <span className="mt-0.5 hidden text-[0.6rem] text-ink-700/55 sm:block">{s.sub}</span>
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
      <p className="flex items-center justify-center gap-1.5 text-[0.8rem] font-semibold text-[var(--pp-magenta-deep)] sm:justify-start">
        <Check className="h-4 w-4 text-gold-600" aria-hidden /> Lovely — ready to continue.
      </p>
    );
  }
  return (
    <p className="flex items-center justify-center gap-1.5 text-[0.8rem] font-medium text-[var(--pp-magenta-deep)] sm:justify-start">
      <Sparkles className="h-4 w-4 text-gold-600" aria-hidden /> {hint}
    </p>
  );
}

/* ------------------------------------------------------------------ Step 1 --- */

function StepMagic({
  data,
  set,
  isDuo,
  notSure,
  selected,
  duoReady,
  selToken,
  duoToken,
  toggleRoyal,
}: {
  data: WizardData;
  set: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
  isDuo: boolean;
  notSure: boolean;
  selected: string[];
  duoReady: boolean;
  selToken: number;
  duoToken: number;
  toggleRoyal: (id: string) => void;
}) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="pp-date">
            Event Date
          </label>
          <input
            id="pp-date"
            type="date"
            className={fieldCls}
            value={data.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="pp-time">
            Event Time
          </label>
          <input
            id="pp-time"
            type="time"
            className={fieldCls}
            value={data.eventTime}
            onChange={(e) => set("eventTime", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="pp-type">
            Event Type
          </label>
          <select
            id="pp-type"
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
          <label className={labelCls} htmlFor="pp-package">
            Package
          </label>
          <select
            id="pp-package"
            className={fieldCls}
            value={data.pkg}
            onChange={(e) => set("pkg", e.target.value)}
          >
            <option value="" disabled>
              Choose a package
            </option>
            {PACKAGES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <a
          href="#matchmaker"
          className="inline-flex items-center gap-1.5 self-end pb-2.5 text-sm font-semibold text-[var(--pp-magenta-deep)] underline-offset-4 hover:underline"
        >
          <Wand2 className="h-4 w-4" aria-hidden /> Not sure? Ask the Fairy Godmother
        </a>
      </div>

      {/* Royal chooser */}
      <div className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="t-engrave text-[0.7rem] tracking-[0.18em] text-[var(--pp-magenta-deep)]">
            Choose Your Royal Guest{isDuo ? "s" : ""}
          </p>
          <p className="text-xs text-fg-3">
            Pick your guest of honour{isDuo ? " and a second royal" : " (add a second if you like)"}
            .
          </p>
        </div>

        <div className="relative mt-3">
          {KINGDOMS.map((k) => (
            <div key={k.id} className="mt-3 first:mt-0">
              <p className="mb-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-gold-600">
                {k.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {k.royals.map((r) => {
                  const isOn = selected.includes(r.id);
                  const slot = data.royal1 === r.id ? 1 : data.royal2 === r.id ? 2 : null;
                  const full = selected.length >= 2 && !isOn;
                  return (
                    <RoyalCard
                      key={r.id}
                      royal={r}
                      isOn={isOn}
                      slot={slot}
                      full={full}
                      selToken={selToken}
                      onToggle={() => toggleRoyal(r.id)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
          {duoReady ? <span key={duoToken} aria-hidden className="pwz-duoflash" /> : null}
        </div>
      </div>

      <CourtTray
        data={data}
        isDuo={isDuo}
        notSure={notSure}
        duoReady={duoReady}
        duoToken={duoToken}
      />
    </div>
  );
}

function RoyalCard({
  royal,
  isOn,
  slot,
  full,
  selToken,
  onToggle,
}: {
  royal: Royal;
  isOn: boolean;
  slot: number | null;
  full: boolean;
  selToken: number;
  onToggle: () => void;
}) {
  const art = CARD_ART[royal.id];
  return (
    <button
      type="button"
      aria-pressed={isOn}
      onClick={onToggle}
      className={cn(
        "pwz-char group relative flex w-[100px] flex-col overflow-hidden rounded-xl border-2 bg-white/85 p-1 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 sm:w-[108px]",
        isOn
          ? "is-on"
          : "border-gold-500/30 hover:-translate-y-0.5 hover:border-gold-500/70 hover:shadow-[0_14px_30px_-16px_rgba(207,168,98,0.7)]",
        full && "pointer-events-none opacity-45",
      )}
    >
      <span className="relative block aspect-[5/6] overflow-hidden rounded-lg bg-[#FBE9F1]">
        {art ? (
          <img
            src={art}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.05]"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center">
            <Crown className="h-7 w-7 text-gold-500/70" aria-hidden />
          </span>
        )}
        {isOn ? (
          <span className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--pp-magenta)] text-white shadow-[0_0_0_2px_#fff]">
            <Check className="h-3 w-3" aria-hidden />
          </span>
        ) : null}
        {isOn && slot ? (
          <span className="absolute left-1 top-1 rounded-full bg-gold-500 px-1 py-0.5 text-[0.44rem] font-bold uppercase tracking-wide text-ink-900">
            Royal {slot}
          </span>
        ) : null}
        {isOn ? (
          <span key={`pwz-${selToken}`} aria-hidden className="pwz-burst">
            <span className="pwz-burst-ring" />
            <span className="pwz-twinkle pwz-twinkle--tl" />
            <span className="pwz-twinkle pwz-twinkle--tr" />
            <span className="pwz-twinkle pwz-twinkle--bl" />
            <span className="pwz-twinkle pwz-twinkle--br" />
          </span>
        ) : null}
      </span>
      <span className="mt-1 px-0.5 pb-0.5">
        <span className="block truncate font-display text-[0.72rem] font-semibold leading-tight text-fg">
          {royal.name}
        </span>
        <span className="block truncate text-[0.5rem] leading-tight text-[var(--pp-magenta-deep)]/70">
          {royal.gown}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-[0.52rem] font-bold uppercase tracking-wide",
            isOn ? "text-[var(--pp-magenta)]" : "text-[var(--pp-magenta-deep)]/80",
          )}
        >
          {isOn ? "Princess Chosen" : "Choose"}
        </span>
      </span>
    </button>
  );
}

function CourtTray({
  data,
  isDuo,
  notSure,
  duoReady,
  duoToken,
}: {
  data: WizardData;
  isDuo: boolean;
  notSure: boolean;
  duoReady: boolean;
  duoToken: number;
}) {
  const status = duoReady
    ? "Royal Duo Ready"
    : data.royal1
      ? "Princess Chosen"
      : "Awaiting your royal guest";
  const slot2 = isDuo ? "Second royal required" : notSure ? "Optional" : "Add a second royal";

  return (
    <div
      className={cn(
        "pwz-tray mt-6 rounded-2xl border bg-[#FCEFF5]/70 p-4 backdrop-blur-sm transition-all duration-300",
        duoReady
          ? "border-[var(--pp-magenta)]/40 shadow-[0_0_24px_-6px_rgba(162,27,97,0.35)]"
          : "border-gold-500/25",
      )}
    >
      <div className="flex items-center justify-between">
        <p className="t-engrave text-[0.62rem] tracking-[0.18em] text-[var(--pp-magenta-deep)]">
          Your Royal Court
        </p>
        <span
          key={duoToken}
          className={cn(
            "pwz-status inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-wide",
            duoReady
              ? "bg-[var(--pp-magenta)] text-white"
              : data.royal1
                ? "bg-gold-500 text-ink-900"
                : "bg-gold-500/15 text-[var(--pp-magenta-deep)]",
          )}
        >
          {duoReady ? <Sparkles className="h-3 w-3" aria-hidden /> : null}
          {status}
        </span>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <CourtSlot id={data.royal1} placeholder="Awaiting royal guest" label="Slot 1" />
        <CourtSlot id={data.royal2} placeholder={slot2} label="Slot 2" />
      </div>
    </div>
  );
}

function CourtSlot({
  id,
  placeholder,
  label,
}: {
  id: string | null;
  placeholder: string;
  label: string;
}) {
  const r = id ? ROYAL_BY_ID[id] : null;
  const art = id ? CARD_ART[id] : null;
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2 transition-all duration-300",
        r ? "border-gold-500/45 bg-white" : "border-dashed border-gold-500/30 bg-white/40",
      )}
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#FBE9F1]">
        {art ? (
          <img src={art} alt="" aria-hidden className="h-full w-full object-cover object-top" />
        ) : (
          <Crown className="h-4 w-4 text-gold-500/50" aria-hidden />
        )}
      </span>
      <div className="min-w-0">
        <p className="text-[0.55rem] font-bold uppercase tracking-wide text-fg-3">{label}</p>
        {r ? (
          <p className="truncate text-sm font-semibold text-fg">{r.name}</p>
        ) : (
          <p className="truncate text-sm text-ink-700/45">{placeholder}</p>
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
        <label className={labelCls} htmlFor="pp-venue">
          Event Name / Venue Name <span className="font-normal text-ink-700/50">(optional)</span>
        </label>
        <input
          id="pp-venue"
          type="text"
          className={fieldCls}
          placeholder="Restaurant, hall, community centre, or home party"
          value={data.venueName}
          onChange={(e) => set("venueName", e.target.value)}
        />
      </div>
      <div>
        <label className={labelCls} htmlFor="pp-street">
          Street Address
        </label>
        <input
          id="pp-street"
          type="text"
          autoComplete="street-address"
          className={fieldCls}
          placeholder="123 Fairytale Lane"
          value={data.street}
          onChange={(e) => set("street", e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="pp-city">
            City
          </label>
          <input
            id="pp-city"
            type="text"
            autoComplete="address-level2"
            className={fieldCls}
            placeholder="Burnaby"
            value={data.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </div>
        <div>
          <span className={labelCls}>Province</span>
          <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[#EBC6D8] bg-[var(--pp-magenta)]/8 px-4 py-2.5 text-base font-semibold text-ink-800">
            BC
            <Lock className="h-3.5 w-3.5 text-[var(--pp-magenta)]/55" aria-hidden />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="pp-guests">
            Guest Count
          </label>
          <input
            id="pp-guests"
            type="number"
            min={1}
            inputMode="numeric"
            className={fieldCls}
            placeholder="e.g. 15"
            value={data.guestCount}
            onChange={(e) => set("guestCount", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Step 3 --- */

function StepWishes({
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
            <label className={labelCls} htmlFor="pp-client">
              Your Name
            </label>
            <input
              id="pp-client"
              type="text"
              autoComplete="name"
              className={fieldCls}
              placeholder="Your full name"
              value={data.clientName}
              onChange={(e) => set("clientName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="pp-child">
              Child&apos;s Name <span className="font-normal text-ink-700/50">(optional)</span>
            </label>
            <input
              id="pp-child"
              type="text"
              className={fieldCls}
              placeholder="Who are we celebrating?"
              value={data.childName}
              onChange={(e) => set("childName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="pp-email">
              Email
            </label>
            <input
              id="pp-email"
              type="email"
              autoComplete="email"
              className={fieldCls}
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="pp-phone">
              Phone
            </label>
            <input
              id="pp-phone"
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
          <label className={labelCls} htmlFor="pp-wishes">
            Special Wishes <span className="font-normal text-ink-700/50">(optional)</span>
          </label>
          <textarea
            id="pp-wishes"
            rows={4}
            className={fieldCls}
            placeholder="Theme, favourite princess, timing, any special wishes…"
            value={data.wishes}
            onChange={(e) => set("wishes", e.target.value)}
          />
        </div>
      </div>

      <RoyalSummary data={data} />
    </div>
  );
}

function RoyalSummary({ data }: { data: WizardData }) {
  const r1 = data.royal1 ? ROYAL_BY_ID[data.royal1] : null;
  const r2 = data.royal2 ? ROYAL_BY_ID[data.royal2] : null;
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
    <aside className="h-fit rounded-2xl border border-gold-500/30 bg-[#FCEFF5]/60 p-4 backdrop-blur-sm">
      <p className="flex items-center gap-2 t-engrave text-[0.62rem] tracking-[0.18em] text-[var(--pp-magenta-deep)]">
        <Crown className="h-3.5 w-3.5 text-gold-600" aria-hidden /> Royal Summary
      </p>
      <dl className="mt-3 space-y-2 text-sm">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-baseline justify-between gap-3 border-b border-gold-500/15 pb-2 last:border-0"
          >
            <dt className="text-fg-3">{r.label}</dt>
            <dd className="text-right font-semibold text-fg">{r.value}</dd>
          </div>
        ))}
        <div className="pt-1">
          <dt className="text-fg-3">Royal Guest(s)</dt>
          <dd className="mt-1.5 space-y-1.5">
            {r1 || r2 ? (
              [r1, r2].filter(Boolean).map((r) => (
                <span
                  key={r!.id}
                  className="flex items-center gap-2 rounded-lg bg-white/70 px-2 py-1"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center overflow-hidden rounded-md bg-[#FBE9F1]">
                    {CARD_ART[r!.id] ? (
                      <img
                        src={CARD_ART[r!.id]}
                        alt=""
                        aria-hidden
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <Crown className="h-3 w-3 text-gold-500/60" aria-hidden />
                    )}
                  </span>
                  <span className="truncate text-[0.8rem] font-semibold text-fg">{r!.name}</span>
                </span>
              ))
            ) : (
              <span className="text-[0.82rem] text-ink-700/45">
                The Fairy Godmother will help you choose
              </span>
            )}
          </dd>
        </div>
      </dl>
    </aside>
  );
}

/* ----------------------------------------------------------------- Success --- */

function RoyalSent({ onReset }: { onReset: () => void }) {
  return (
    <div className="pwz-sent relative overflow-hidden rounded-[var(--radius-xl)] border border-gold-500/45 bg-white/90 p-10 text-center shadow-[0_24px_60px_-30px_rgba(162,27,97,0.45)] backdrop-blur">
      <span aria-hidden className="pwz-sent-rays pointer-events-none absolute inset-0" />
      <span
        aria-hidden
        className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--pp-magenta)] to-gold-500 text-white shadow-[0_14px_30px_-10px_rgba(162,27,97,0.6)]"
      >
        <Crown className="h-10 w-10" />
      </span>
      <h3 className="t-display relative mt-6 text-3xl text-ink-800 md:text-4xl">
        Your Royal Visit is Requested
      </h3>
      <p className="relative mx-auto mt-3 max-w-md text-ink-700/80">
        Thank you! We&apos;ll review your details and follow up to confirm availability and bring
        the magic to life.
      </p>
      <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/"
          className="btn-magic inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-gradient-to-r from-[var(--pp-magenta)] to-gold-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(162,27,97,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
        >
          <Home className="h-4 w-4" aria-hidden /> Back to Home
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-semibold text-[var(--pp-magenta-deep)] underline-offset-4 hover:underline"
        >
          Send another request
        </button>
      </div>
    </div>
  );
}

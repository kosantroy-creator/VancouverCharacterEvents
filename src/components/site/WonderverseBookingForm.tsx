import {
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type FormEvent,
} from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Drama,
  Feather,
  Home,
  Loader2,
  Lock,
  Mic2,
  Moon,
  MoonStar,
  Orbit,
  Rocket,
  Sparkles,
  Star,
  Wand2,
} from "lucide-react";
import { submitInquiry } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

/**
 * WonderverseBookingForm — "Request Your Wonderverse Visit": the Wonderverse
 * Realm page's final step. A moonlit celestial-stage section holding a translucent
 * purple-glass 3-step request wizard — the Wonderverse sibling of
 * PrincessBookingForm / MermaidBookingForm. SAME front-end-only logic, required-
 * field gating, honeypot, and `submitInquiry(...)` submission; only the styling,
 * copy, format cards, character-style picker, and motion are retheme. Choose a
 * format (solo / signature duo / custom), optionally pick 1–2 brand-safe character
 * STYLES (a soft "Style Chosen" glow escalates to "Wonderverse Duo Ready"), then
 * event + contact details. Brand-safe archetype language only — no franchise names,
 * likenesses, logos, or exact costumes. VISIBLE BY DEFAULT (hidden only under
 * `.wvb.anim:not(.is-in)`), reduced-motion safe. See "WONDERVERSE REALM BOOKING
 * WIZARD" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Style = { id: string; name: string; blurb: string; icon: IconType; accent: string };

const STYLES: Style[] = [
  { id: "fairy", name: "Fairy Magic", blurb: "Wings & wonder", icon: Sparkles, accent: "#F4A8D8" },
  {
    id: "spellcaster",
    name: "Friendly Spellcaster",
    blurb: "Spells & charm",
    icon: Wand2,
    accent: "#B79BF0",
  },
  {
    id: "galaxy",
    name: "Galaxy Adventure",
    blurb: "Cosmic heroes",
    icon: Rocket,
    accent: "#7FB2FF",
  },
  {
    id: "villain",
    name: "Storybook Villains",
    blurb: "Playful mischief",
    icon: Drama,
    accent: "#C98BEA",
  },
  { id: "pop", name: "Pop Performance", blurb: "Stage & sparkle", icon: Mic2, accent: "#F6B45A" },
  { id: "custom", name: "Custom Persona", blurb: "Your idea", icon: Feather, accent: "#8FE0C8" },
];
const STYLE_BY_ID: Record<string, Style> = {};
const NAME_TO_ID: Record<string, string> = {};
STYLES.forEach((s) => {
  STYLE_BY_ID[s.id] = s;
  NAME_TO_ID[s.name] = s.id;
});

type Format = { value: string; name: string; blurb: string; icon: IconType };
const FORMATS: Format[] = [
  {
    value: "Wonderverse Visit",
    name: "Wonderverse Visit",
    blurb: "Perfect for simple appearances, meet-and-greets, and photo moments.",
    icon: Moon,
  },
  {
    value: "Signature Wonderverse Experience",
    name: "Signature Experience",
    blurb: "Ideal for duos, themed pairings, activities, and fuller experiences.",
    icon: MoonStar,
  },
  {
    value: "Custom Realm Booking",
    name: "Custom Realm Booking",
    blurb: "For custom personas, unique themes, larger events, and one-of-a-kind requests.",
    icon: Orbit,
  },
];
const NOT_SURE = "Not sure yet";

const EVENT_TYPES = [
  "Birthday Party",
  "School Event",
  "Corporate Event",
  "Festival",
  "Community Event",
  "Other",
] as const;

const STEPS = [
  { label: "Format", sub: "Choose Your Format" },
  { label: "Details", sub: "Event Details" },
  { label: "Contact", sub: "Contact & Requests" },
] as const;

const labelCls = "mb-1.5 block text-sm font-semibold text-[#E7D8FB]";
const fieldCls =
  "wvb-field w-full rounded-xl border border-[rgba(226,194,118,0.4)] bg-[rgba(40,24,78,0.55)] px-4 py-2.5 text-base text-[#F4ECFF] placeholder:text-[#C8B6EC]/45 transition-colors focus:border-[#F2D38C] focus:outline-none focus-visible:outline-none";

type WizardData = {
  eventDate: string;
  eventTime: string;
  eventType: string;
  format: string;
  style1: string | null;
  style2: string | null;
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
  format: "",
  style1: null,
  style2: null,
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

const STARS = [
  { left: "7%", top: "16%", s: 3, delay: "0s", dur: "5s" },
  { left: "18%", top: "68%", s: 2, delay: "1.6s", dur: "6s" },
  { left: "32%", top: "10%", s: 3, delay: "0.7s", dur: "5.4s" },
  { left: "46%", top: "82%", s: 2, delay: "2.2s", dur: "6.4s" },
  { left: "61%", top: "14%", s: 3, delay: "1s", dur: "5s" },
  { left: "74%", top: "72%", s: 2, delay: "2.7s", dur: "6.1s" },
  { left: "86%", top: "24%", s: 3, delay: "0.4s", dur: "5.7s" },
  { left: "94%", top: "58%", s: 2, delay: "1.9s", dur: "6.3s" },
] as const;

export function WonderverseBookingForm({ requestedStyle }: { requestedStyle?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    setMotionOK(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="book"
      aria-labelledby="wvb-title"
      className={cn(
        "wvb relative isolate scroll-mt-24 overflow-hidden",
        motionOK && "anim",
        inView && "is-in",
      )}
    >
      <div aria-hidden className="wvb-bg absolute inset-0" />
      <div aria-hidden className="wvb-stars pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="wvb-star-dot"
            style={{
              left: s.left,
              top: s.top,
              width: s.s,
              height: s.s,
              animationDelay: s.delay,
              animationDuration: s.dur,
            }}
          />
        ))}
      </div>
      <span aria-hidden className="wvb-glow wvb-glow-l" />
      <span aria-hidden className="wvb-glow wvb-glow-r" />
      <span aria-hidden className="wvb-moon" />
      <div aria-hidden className="wvb-mist pointer-events-none absolute inset-x-0 bottom-0" />
      <div aria-hidden className="wvb-floor pointer-events-none absolute inset-x-0 bottom-0" />
      <div aria-hidden className="wvb-seam-top pointer-events-none absolute inset-x-0 top-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="wvb-head mx-auto max-w-2xl text-center">
          <span className="wvb-eyebrow">
            <Sparkles className="h-3 w-3" aria-hidden />
            Start Your Wonderverse Request
            <Sparkles className="h-3 w-3 -scale-x-100" aria-hidden />
          </span>
          <h2 id="wvb-title" className="wvb-title">
            Request Your Wonderverse Visit
            <Moon className="wvb-title-moon" aria-hidden />
          </h2>
          <p className="wvb-sub">
            Tell us about your event, the character style you&apos;re imagining, and whether
            you&apos;re interested in a solo visit, signature duo, or custom cast experience.
          </p>
          <p className="wvb-helper">
            <Moon className="h-3.5 w-3.5" aria-hidden />
            We&apos;ll review your request and recommend the best Wonderverse format based on your
            date, location, theme, and availability.
          </p>
        </div>

        <div className="wvb-panel-wrap mx-auto mt-10 max-w-4xl">
          <Wizard requestedStyle={requestedStyle} />
        </div>

        <p className="wvb-foot mx-auto mt-6 max-w-xl text-center">
          <Star className="mr-1.5 inline h-3.5 w-3.5 align-[-2px] text-[#E7C977]" aria-hidden />
          Rare characters · Signature duos · Custom magic — we can&apos;t wait to help create
          something unforgettable.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- the wizard panel */

function Wizard({ requestedStyle }: { requestedStyle?: string }) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<WizardData>(() => ({
    ...EMPTY,
    style1: requestedStyle ? (NAME_TO_ID[requestedStyle] ?? null) : null,
  }));
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hp, setHp] = useState("");
  const [selToken, setSelToken] = useState(0);
  const [duoToken, setDuoToken] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof WizardData>(k: K, v: WizardData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const selected = [data.style1, data.style2].filter(Boolean) as string[];
  const duoReady = selected.length === 2;

  const toggleStyle = (id: string) => {
    const sel = [data.style1, data.style2].filter(Boolean) as string[];
    if (sel.includes(id)) {
      const next = sel.filter((x) => x !== id);
      setData((d) => ({ ...d, style1: next[0] ?? null, style2: next[1] ?? null }));
      return;
    }
    if (sel.length >= 2) return;
    const next = [...sel, id];
    setData((d) => ({ ...d, style1: next[0] ?? null, style2: next[1] ?? null }));
    setSelToken((t) => t + 1);
    if (next.length === 2) setDuoToken((t) => t + 1);
  };

  // Character style is intentionally OPTIONAL (per the reference) — only the
  // event basics + a chosen format gate Step 1.
  const step1Hint = (): string | null => {
    if (!data.eventDate) return "Choose an event date to continue.";
    if (!data.eventTime) return "Add a start time to continue.";
    if (!data.eventType) return "Tell us what kind of event this is.";
    if (!data.format) return "Choose a Wonderverse format, or pick “Not sure yet.”";
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
    if (hp) return;
    if (!canSubmit) return;
    const s1 = data.style1 ? STYLE_BY_ID[data.style1] : null;
    const s2 = data.style2 ? STYLE_BY_ID[data.style2] : null;
    const fields: Record<string, string> = {
      name: data.clientName,
      email: data.email,
      phone: data.phone,
      childName: data.childName,
      eventType: data.eventType,
      format: data.format,
      characterStyle: [s1?.name, s2?.name].filter(Boolean).join(" + "),
      date: data.eventDate,
      time: data.eventTime,
      venue: data.venueName,
      address: [data.street, data.city].filter(Boolean).join(", "),
      guests: data.guestCount,
      wishes: data.wishes,
    };
    setSubmitting(true);
    setError(null);
    const res = await submitInquiry("Wonderverse Realm", fields);
    setSubmitting(false);
    if (res.ok) setSent(true);
    else setError(res.error || "Something went wrong. Please try again.");
  };

  if (sent) {
    return (
      <WonderverseSent
        onReset={() => {
          setSent(false);
          setStep(1);
          setData(EMPTY);
        }}
      />
    );
  }

  return (
    <div ref={cardRef} className="wvb-panel relative overflow-hidden">
      <span aria-hidden className="wvb-corner wvb-corner--tl" />
      <span aria-hidden className="wvb-corner wvb-corner--tr" />
      <span aria-hidden className="wvb-corner wvb-corner--bl" />
      <span aria-hidden className="wvb-corner wvb-corner--br" />

      <p className="wvb-panel-eyebrow">
        <Moon className="h-3 w-3" aria-hidden /> A Three-Step Wonderverse Request{" "}
        <Moon className="h-3 w-3 -scale-x-100" aria-hidden />
      </p>

      <Stepper step={step} />

      <form onSubmit={handleSubmit} noValidate className="mt-7">
        <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="wvb-company">Company (leave blank)</label>
          <input
            id="wvb-company"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>

        <div key={step} className={cn("wvb-step", dir >= 0 ? "wvb-step--fwd" : "wvb-step--back")}>
          {step === 1 ? (
            <StepFormat
              data={data}
              set={set}
              selected={selected}
              duoReady={duoReady}
              selToken={selToken}
              duoToken={duoToken}
              toggleStyle={toggleStyle}
            />
          ) : step === 2 ? (
            <StepDetails data={data} set={set} />
          ) : (
            <StepContact data={data} set={set} />
          )}
        </div>

        <div className="wvb-actions mt-7 pt-5">
          {step === 1 ? (
            <StepHint hint={step1Hint()} />
          ) : step === 2 ? (
            <StepHint hint={step2Hint()} />
          ) : (
            <StepHint hint={step3Hint()} />
          )}

          {error ? (
            <p role="alert" className="wvb-error mt-3">
              {error} You can also email us directly at info@vancouvercharacterevents.com.
            </p>
          ) : null}

          <div className="mt-3 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            {step > 1 ? (
              <button type="button" onClick={() => go(step - 1)} className="wvb-back">
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
                  "wvb-go",
                  (step === 1 ? canStep1 : canStep2) ? "is-ready" : "is-idle",
                  step === 1 && duoReady && "is-charged",
                )}
              >
                <span className="wvb-go-shine" aria-hidden />
                {step === 1 ? "Continue to Details" : "Continue to Contact"}
                <ArrowRight className="wvb-go-arrow h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className={cn("wvb-go", canSubmit ? "is-ready" : "is-idle")}
              >
                <span className="wvb-go-shine" aria-hidden />
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending Request…
                  </>
                ) : (
                  <>
                    <MoonStar className="h-4 w-4" aria-hidden /> Request My Wonderverse Visit
                    <ArrowRight className="wvb-go-arrow h-4 w-4" aria-hidden />
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

/* --------------------------------------------------------------- the stepper */

function Stepper({ step }: { step: number }) {
  return (
    <div className="wvb-stepper relative mx-auto mt-4 max-w-md px-3">
      <div className="wvb-stepper-track">
        <div className="wvb-stepper-fill" style={{ width: `${((step - 1) / 2) * 100}%` }} />
      </div>
      <ol className="relative flex items-start justify-between">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const state = n < step ? "done" : n === step ? "active" : "todo";
          return (
            <li key={s.label} className="flex flex-1 flex-col items-center text-center">
              <span className={cn("wvb-dot", `is-${state}`)}>
                {state === "done" ? <Check className="h-4 w-4" aria-hidden /> : n}
              </span>
              <span className={cn("wvb-dot-label", state === "todo" && "is-todo")}>{s.label}</span>
              <span className="wvb-dot-sub">{s.sub}</span>
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
      <p className="wvb-hint is-ok">
        <Check className="h-4 w-4 text-[#7BE0B4]" aria-hidden /> Wonderful — ready to continue.
      </p>
    );
  }
  return (
    <p className="wvb-hint">
      <Moon className="h-4 w-4 text-[#E7C977]" aria-hidden /> {hint}
    </p>
  );
}

/* ----------------------------------------------------------------- Step 1 --- */

function StepFormat({
  data,
  set,
  selected,
  duoReady,
  selToken,
  duoToken,
  toggleStyle,
}: {
  data: WizardData;
  set: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
  selected: string[];
  duoReady: boolean;
  selToken: number;
  duoToken: number;
  toggleStyle: (id: string) => void;
}) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="wvb-date">
            Event Date
          </label>
          <input
            id="wvb-date"
            type="date"
            className={fieldCls}
            value={data.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="wvb-time">
            Start Time
          </label>
          <input
            id="wvb-time"
            type="time"
            className={fieldCls}
            value={data.eventTime}
            onChange={(e) => set("eventTime", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="wvb-type">
            Event Type
          </label>
          <select
            id="wvb-type"
            className={fieldCls}
            value={data.eventType}
            onChange={(e) => set("eventType", e.target.value)}
          >
            <option value="" disabled>
              Select an event type
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* format cards */}
      <div className="mt-6">
        <p className="wvb-chooser-label">Choose Your Wonderverse Format</p>
        <p className="wvb-chooser-help">Select the format that fits your event vision.</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {FORMATS.map((f) => {
            const on = data.format === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={on}
                onClick={() => set("format", f.value)}
                className={cn("wvb-format", on ? "is-on" : "is-off")}
              >
                {on ? (
                  <span aria-hidden className="wvb-format-check">
                    <Check className="h-3 w-3" />
                  </span>
                ) : null}
                <span aria-hidden className="wvb-format-ic">
                  <f.icon className="h-5 w-5" />
                </span>
                <span className="wvb-format-name">{f.name}</span>
                <span className="wvb-format-blurb">{f.blurb}</span>
              </button>
            );
          })}
        </div>
        {/* not sure yet — wide row */}
        <button
          type="button"
          aria-pressed={data.format === NOT_SURE}
          onClick={() => set("format", NOT_SURE)}
          className={cn("wvb-notsure mt-3", data.format === NOT_SURE ? "is-on" : "is-off")}
        >
          <span aria-hidden className="wvb-notsure-ic">
            <Star className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="wvb-notsure-name">Not Sure Yet</span>
            <span className="wvb-notsure-blurb">
              Help me recommend the best format for my event.
            </span>
          </span>
          <span
            aria-hidden
            className={cn("wvb-notsure-radio", data.format === NOT_SURE && "is-on")}
          >
            {data.format === NOT_SURE ? <Check className="h-3 w-3" /> : null}
          </span>
        </button>
      </div>

      {/* character style picker (optional) */}
      <div className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="wvb-chooser-label">
            Character Style <span className="wvb-optional">(Optional)</span>
          </p>
          <p className="wvb-chooser-help">
            Choose the style you&apos;re imagining{duoReady ? "" : ", or add a second for a duo"}.
          </p>
        </div>

        <div className="relative mt-3">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {STYLES.map((s) => {
              const isOn = selected.includes(s.id);
              const slot = data.style1 === s.id ? 1 : data.style2 === s.id ? 2 : null;
              const full = selected.length >= 2 && !isOn;
              return (
                <StyleCard
                  key={s.id}
                  style={s}
                  isOn={isOn}
                  slot={slot}
                  full={full}
                  selToken={selToken}
                  onToggle={() => toggleStyle(s.id)}
                />
              );
            })}
          </div>
          {duoReady ? <span key={duoToken} aria-hidden className="wvb-duoflash" /> : null}
        </div>
      </div>

      <CastTray data={data} duoReady={duoReady} duoToken={duoToken} />
    </div>
  );
}

function StyleCard({
  style,
  isOn,
  slot,
  full,
  selToken,
  onToggle,
}: {
  style: Style;
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
      className={cn("wvb-style group", isOn ? "is-on" : "is-off", full && "is-full")}
      style={{ "--acc": style.accent } as Vars}
    >
      <span className="wvb-style-disc">
        <style.icon className="h-5 w-5" aria-hidden />
        {isOn ? (
          <span className="wvb-style-check">
            <Check className="h-3 w-3" aria-hidden />
          </span>
        ) : null}
        {isOn ? (
          <span key={`wvb-${selToken}`} aria-hidden className="wvb-burst">
            <span className="wvb-burst-ring" />
            <span className="wvb-twinkle wvb-twinkle--tl" />
            <span className="wvb-twinkle wvb-twinkle--tr" />
            <span className="wvb-twinkle wvb-twinkle--bl" />
            <span className="wvb-twinkle wvb-twinkle--br" />
          </span>
        ) : null}
      </span>
      <span className="wvb-style-meta">
        <span className="wvb-style-name">{style.name}</span>
        <span className="wvb-style-blurb">{isOn && slot ? `Style ${slot}` : style.blurb}</span>
      </span>
    </button>
  );
}

function CastTray({
  data,
  duoReady,
  duoToken,
}: {
  data: WizardData;
  duoReady: boolean;
  duoToken: number;
}) {
  const status = duoReady
    ? "Wonderverse Duo Ready"
    : data.style1
      ? "Style Chosen"
      : "Styles optional";

  return (
    <div className={cn("wvb-tray mt-6", duoReady && "is-duo")}>
      <div className="flex items-center justify-between">
        <p className="wvb-tray-label">Your Wonderverse Cast</p>
        <span
          key={duoToken}
          className={cn("wvb-status", duoReady ? "is-duo" : data.style1 && "is-one")}
        >
          {duoReady ? <Sparkles className="h-3 w-3" aria-hidden /> : null}
          {status}
        </span>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <CastSlot id={data.style1} placeholder="Awaiting a character style" label="Style 1" />
        <CastSlot id={data.style2} placeholder="Add a second for a duo" label="Style 2" />
      </div>
      <p className="wvb-tray-note">
        <Moon className="h-3.5 w-3.5 text-[#E7C977]" aria-hidden /> Some Wonderverse characters are
        available solo, while others are recommended or required as duos for the best experience —
        we&apos;ll help recommend the right format.
      </p>
    </div>
  );
}

function CastSlot({
  id,
  placeholder,
  label,
}: {
  id: string | null;
  placeholder: string;
  label: string;
}) {
  const s = id ? STYLE_BY_ID[id] : null;
  return (
    <div
      className={cn("wvb-slot", s ? "is-filled" : "is-empty")}
      style={s ? ({ "--acc": s.accent } as Vars) : undefined}
    >
      <span className="wvb-slot-thumb">
        {s ? <s.icon className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
      </span>
      <div className="min-w-0">
        <p className="wvb-slot-label">{label}</p>
        {s ? (
          <p className="wvb-slot-name">{s.name}</p>
        ) : (
          <p className="wvb-slot-empty">{placeholder}</p>
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Step 2 --- */

function StepDetails({
  data,
  set,
}: {
  data: WizardData;
  set: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
}) {
  return (
    <div className="grid gap-4">
      <div>
        <label className={labelCls} htmlFor="wvb-venue">
          Event / Venue Name <span className="font-normal text-[#C8B6EC]/45">(optional)</span>
        </label>
        <input
          id="wvb-venue"
          type="text"
          className={fieldCls}
          placeholder="Home, community centre, hotel, school, or venue"
          value={data.venueName}
          onChange={(e) => set("venueName", e.target.value)}
        />
      </div>
      <div>
        <label className={labelCls} htmlFor="wvb-street">
          Street Address
        </label>
        <input
          id="wvb-street"
          type="text"
          autoComplete="street-address"
          className={fieldCls}
          placeholder="123 Moonlight Avenue"
          value={data.street}
          onChange={(e) => set("street", e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="wvb-city">
            City
          </label>
          <input
            id="wvb-city"
            type="text"
            autoComplete="address-level2"
            className={fieldCls}
            placeholder="Vancouver"
            value={data.city}
            onChange={(e) => set("city", e.target.value)}
          />
        </div>
        <div>
          <span className={labelCls}>Province</span>
          <div className="wvb-locked">
            BC
            <Lock className="h-3.5 w-3.5 text-[#E7C977]/55" aria-hidden />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="wvb-guests">
            Guest Count
          </label>
          <input
            id="wvb-guests"
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
      <p className="wvb-safety">
        <Moon className="mr-1.5 inline h-3.5 w-3.5 align-[-2px] text-[#E7C977]" aria-hidden />
        Share as much as you can — we&apos;ll confirm timing, space, and setup details together once
        we review availability.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- Step 3 --- */

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
            <label className={labelCls} htmlFor="wvb-client">
              Your Name
            </label>
            <input
              id="wvb-client"
              type="text"
              autoComplete="name"
              className={fieldCls}
              placeholder="Your full name"
              value={data.clientName}
              onChange={(e) => set("clientName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="wvb-child">
              Guest of Honour <span className="font-normal text-[#C8B6EC]/45">(optional)</span>
            </label>
            <input
              id="wvb-child"
              type="text"
              className={fieldCls}
              placeholder="Who are we celebrating?"
              value={data.childName}
              onChange={(e) => set("childName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="wvb-email">
              Email
            </label>
            <input
              id="wvb-email"
              type="email"
              autoComplete="email"
              className={fieldCls}
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="wvb-phone">
              Phone
            </label>
            <input
              id="wvb-phone"
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
          <label className={labelCls} htmlFor="wvb-wishes">
            Tell Us About Your Event &amp; Vision{" "}
            <span className="font-normal text-[#C8B6EC]/45">(optional)</span>
          </label>
          <textarea
            id="wvb-wishes"
            rows={4}
            className={fieldCls}
            placeholder="Share details about your theme, character ideas, special moments, or anything else you'd like us to know…"
            value={data.wishes}
            onChange={(e) => set("wishes", e.target.value)}
          />
        </div>
      </div>

      <CastSummary data={data} />
    </div>
  );
}

function CastSummary({ data }: { data: WizardData }) {
  const s1 = data.style1 ? STYLE_BY_ID[data.style1] : null;
  const s2 = data.style2 ? STYLE_BY_ID[data.style2] : null;
  const rows: { label: string; value: string }[] = [
    { label: "Date", value: data.eventDate || "—" },
    { label: "Time", value: data.eventTime || "—" },
    { label: "Event Type", value: data.eventType || "—" },
    { label: "Format", value: data.format || "—" },
    { label: "Venue", value: data.venueName || "—" },
    { label: "City", value: data.city || "—" },
    { label: "Guests", value: data.guestCount || "—" },
  ];
  return (
    <aside className="wvb-summary">
      <p className="wvb-summary-label">
        <MoonStar className="h-3.5 w-3.5 text-[#E7C977]" aria-hidden /> Request Summary
      </p>
      <dl className="mt-3 space-y-2 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="wvb-summary-row">
            <dt className="text-[#BCA9E4]">{r.label}</dt>
            <dd className="text-right font-semibold text-[#F4ECFF]">{r.value}</dd>
          </div>
        ))}
        <div className="pt-1">
          <dt className="text-[#BCA9E4]">Character Style(s)</dt>
          <dd className="mt-1.5 space-y-1.5">
            {s1 || s2 ? (
              ([s1, s2].filter(Boolean) as Style[]).map((s) => (
                <span
                  key={s.id}
                  className="wvb-summary-style"
                  style={{ "--acc": s.accent } as Vars}
                >
                  <span className="wvb-summary-thumb">
                    <s.icon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="truncate text-[0.8rem] font-semibold text-[#F4ECFF]">
                    {s.name}
                  </span>
                </span>
              ))
            ) : (
              <span className="text-[0.82rem] text-[#C8B6EC]/55">
                We&apos;ll help recommend the perfect character style
              </span>
            )}
          </dd>
        </div>
      </dl>
    </aside>
  );
}

/* ----------------------------------------------------------------- Success --- */

function WonderverseSent({ onReset }: { onReset: () => void }) {
  return (
    <div className="wvb-sent relative overflow-hidden text-center">
      <span aria-hidden className="wvb-sent-rays pointer-events-none absolute inset-0" />
      <span aria-hidden className="wvb-sent-badge">
        <MoonStar className="h-10 w-10" />
        <Check className="wvb-sent-check h-5 w-5" />
      </span>
      <h3 className="wvb-sent-title">Wonderverse Request Received</h3>
      <p className="wvb-sent-copy">
        Thank you! We&apos;ve received your Wonderverse details and will follow up soon to confirm
        availability, character format, and the best experience for your event.
      </p>
      <div className="wvb-sent-actions">
        <Link to="/" className="wvb-go is-ready">
          <span className="wvb-go-shine" aria-hidden />
          <Home className="h-4 w-4" aria-hidden /> Back to Home
        </Link>
        <button type="button" onClick={onReset} className="wvb-sent-again">
          Send another request
        </button>
      </div>
    </div>
  );
}

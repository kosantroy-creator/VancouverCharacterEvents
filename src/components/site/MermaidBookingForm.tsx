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
  Compass,
  Home,
  Loader2,
  Lock,
  Shell,
  Sparkles,
  Waves,
} from "lucide-react";
import { submitInquiry } from "@/lib/inquiry";
import { cn } from "@/lib/utils";
import { OceanDecor } from "./OceanDecor";
import marinaImg from "@/assets/mermaid/marina-mermaid.webp";
import coralinaImg from "@/assets/mermaid/coralina-mermaid.webp";
import nerissaImg from "@/assets/mermaid/nerissa-mermaid.webp";

/**
 * MermaidBookingForm — "Book Your Mermaid Cove Visit": the page's final step. A
 * self-contained cove section (bright aqua ground, caustics, bubbles, reef decor)
 * holding a translucent pearl-glass 3-step request wizard — the aquatic sibling of
 * PrincessBookingForm. Same front-end-only logic, fields, validation, honeypot,
 * and `submitInquiry("Mermaid Events", …)` submission; only the styling, copy,
 * roster (Marina / Coralina / Nerissa), packages, and motion are retheme. Pick a
 * mermaid (optionally a duo); a soft pearl "Mermaid Chosen" glow escalates to
 * "Mermaid Duo Ready". Careful pool-safety wording. VISIBLE BY DEFAULT (hidden
 * only under `.mwz.anim:not(.is-in)`), reduced-motion safe. See "MERMAID COVE
 * BOOKING WIZARD" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Mermaid = { id: string; name: string; style: string; img: string };

const MERMAIDS: Mermaid[] = [
  { id: "marina", name: "Marina Pearlwave", style: "Gentle · Storybook", img: marinaImg },
  { id: "coralina", name: "Coralina SunSplash", style: "Playful · Bubbly", img: coralinaImg },
  { id: "nerissa", name: "Nerissa Moonreef", style: "Elegant · Musical", img: nerissaImg },
];
const MERMAID_BY_ID: Record<string, Mermaid> = {};
const NAME_TO_ID: Record<string, string> = {};
MERMAIDS.forEach((m) => {
  MERMAID_BY_ID[m.id] = m;
  NAME_TO_ID[m.name] = m.id;
});

const PACKAGES = ["Splash Visit", "Mermaid Cove Party", "Ocean Takeover", "Not sure yet"] as const;
const EVENT_TYPES = [
  "Birthday Party",
  "Pool Party",
  "Summer Party",
  "Community Event",
  "Festival",
  "Other",
] as const;

const STEPS = [
  { label: "Cove Visit", sub: "Choose Your Cove Visit" },
  { label: "Details", sub: "Event Details" },
  { label: "Contact", sub: "Contact & Notes" },
] as const;

const labelCls = "mb-1.5 block text-sm font-semibold text-[#114E5A]";
const fieldCls =
  "mwz-field w-full rounded-xl border border-[#BFE7E0] bg-[#F5FCFB] px-4 py-2.5 text-base text-[#114E5A] placeholder:text-[#114E5A]/40 transition-colors focus:border-[#1AA89E] focus:bg-white focus:outline-none focus-visible:outline-none";

type WizardData = {
  eventDate: string;
  eventTime: string;
  eventType: string;
  pkg: string;
  mermaid1: string | null;
  mermaid2: string | null;
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
  mermaid1: null,
  mermaid2: null,
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

const BUBBLES = [
  { left: "9%", s: 9, delay: "0s", dur: "17s", dx: "12px" },
  { left: "27%", s: 6, delay: "3.6s", dur: "20s", dx: "-9px" },
  { left: "49%", s: 11, delay: "1.6s", dur: "18s", dx: "13px" },
  { left: "71%", s: 7, delay: "5s", dur: "21s", dx: "-11px" },
  { left: "88%", s: 9, delay: "2.5s", dur: "18.5s", dx: "11px" },
] as const;

export function MermaidBookingForm({ requestedMermaid }: { requestedMermaid?: string }) {
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
      aria-labelledby="mwz-title"
      className={cn(
        "mwz relative isolate scroll-mt-24 overflow-hidden",
        motionOK && "anim",
        inView && "is-in",
      )}
    >
      <div aria-hidden className="mwz-wavetop pointer-events-none absolute inset-x-0 top-0">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0,40 C250,84 520,6 760,32 C1010,58 1230,92 1440,52 L1440,0 L0,0 Z"
            fill="#97D6E7"
          />
        </svg>
      </div>

      <div aria-hidden className="mwz-bg absolute inset-0" />
      <div aria-hidden className="mwz-caustic pointer-events-none absolute inset-0" />
      <div aria-hidden className="mwz-surface pointer-events-none absolute inset-x-0 top-0" />
      <OceanDecor variant="a" />
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="mwz-bubble"
            style={
              {
                left: b.left,
                width: b.s,
                height: b.s,
                animationDelay: b.delay,
                animationDuration: b.dur,
                "--dx": b.dx,
              } as Vars
            }
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="mwz-head mx-auto max-w-2xl text-center">
          <span className="mwz-eyebrow">
            <span aria-hidden className="mwz-eyebrow-rule" />
            Start Your Cove Adventure
            <span aria-hidden className="mwz-eyebrow-rule" />
          </span>
          <h2 id="mwz-title" className="mwz-title">
            Book Your Mermaid Cove Visit
            <Sparkles className="mwz-title-spark" aria-hidden />
          </h2>
          <p className="mwz-sub">
            Tell us about your celebration and we&apos;ll help match you with the right mermaid,
            package, and poolside experience.
          </p>
        </div>

        <div className="mwz-panel-wrap mx-auto mt-10 max-w-4xl">
          <Wizard requestedMermaid={requestedMermaid} />
        </div>

        <p className="mwz-foot mx-auto mt-6 max-w-xl text-center">
          <Shell className="mr-1.5 inline h-3.5 w-3.5 align-[-2px] text-[#C99A38]" aria-hidden />
          We reply to all inquiries as quickly as possible with availability, package guidance, and
          next steps.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- the wizard panel */

function Wizard({ requestedMermaid }: { requestedMermaid?: string }) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<WizardData>(() => ({
    ...EMPTY,
    mermaid1: requestedMermaid ? (NAME_TO_ID[requestedMermaid] ?? null) : null,
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

  const notSure = data.pkg === "Not sure yet";
  const selected = [data.mermaid1, data.mermaid2].filter(Boolean) as string[];
  const duoReady = selected.length === 2;

  const toggleMermaid = (id: string) => {
    const sel = [data.mermaid1, data.mermaid2].filter(Boolean) as string[];
    if (sel.includes(id)) {
      const next = sel.filter((x) => x !== id);
      setData((d) => ({ ...d, mermaid1: next[0] ?? null, mermaid2: next[1] ?? null }));
      return;
    }
    if (sel.length >= 2) return;
    const next = [...sel, id];
    setData((d) => ({ ...d, mermaid1: next[0] ?? null, mermaid2: next[1] ?? null }));
    setSelToken((t) => t + 1);
    if (next.length === 2) setDuoToken((t) => t + 1);
  };

  const step1Hint = (): string | null => {
    if (!data.eventDate) return "Choose an event date to continue.";
    if (!data.eventTime) return "Add an event time to continue.";
    if (!data.eventType) return "Tell us what kind of celebration this is.";
    if (!data.pkg) return "Choose a cove pass, or pick “Not sure yet.”";
    if (!notSure && !data.mermaid1) return "Choose your mermaid, or pick “Not sure yet.”";
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
    const m1 = data.mermaid1 ? MERMAID_BY_ID[data.mermaid1] : null;
    const m2 = data.mermaid2 ? MERMAID_BY_ID[data.mermaid2] : null;
    const fields: Record<string, string> = {
      name: data.clientName,
      email: data.email,
      phone: data.phone,
      childName: data.childName,
      eventType: data.eventType,
      package: data.pkg,
      mermaid: [m1?.name, m2?.name].filter(Boolean).join(" + "),
      date: data.eventDate,
      time: data.eventTime,
      venue: data.venueName,
      address: [data.street, data.city].filter(Boolean).join(", "),
      guests: data.guestCount,
      wishes: data.wishes,
    };
    setSubmitting(true);
    setError(null);
    const res = await submitInquiry("Mermaid Events", fields);
    setSubmitting(false);
    if (res.ok) setSent(true);
    else setError(res.error || "Something went wrong. Please try again.");
  };

  if (sent) {
    return (
      <CoveSent
        onReset={() => {
          setSent(false);
          setStep(1);
          setData(EMPTY);
        }}
      />
    );
  }

  return (
    <div ref={cardRef} className="mwz-panel relative overflow-hidden">
      <Shell aria-hidden className="mwz-panel-shell pointer-events-none absolute -right-3 -top-3" />

      <p className="mwz-panel-eyebrow">
        <Shell className="h-3 w-3" aria-hidden /> A Three-Step Cove Request{" "}
        <Shell className="h-3 w-3 -scale-x-100" aria-hidden />
      </p>

      <Stepper step={step} />

      <form onSubmit={handleSubmit} noValidate className="mt-7">
        <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="mwz-company">Company (leave blank)</label>
          <input
            id="mwz-company"
            tabIndex={-1}
            autoComplete="off"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
          />
        </div>

        <div key={step} className={cn("mwz-step", dir >= 0 ? "mwz-step--fwd" : "mwz-step--back")}>
          {step === 1 ? (
            <StepVisit
              data={data}
              set={set}
              notSure={notSure}
              selected={selected}
              duoReady={duoReady}
              selToken={selToken}
              duoToken={duoToken}
              toggleMermaid={toggleMermaid}
            />
          ) : step === 2 ? (
            <StepDetails data={data} set={set} />
          ) : (
            <StepContact data={data} set={set} />
          )}
        </div>

        <div className="mwz-actions mt-7 pt-5">
          {step === 1 ? (
            <StepHint hint={step1Hint()} />
          ) : step === 2 ? (
            <StepHint hint={step2Hint()} />
          ) : (
            <StepHint hint={step3Hint()} />
          )}

          {error ? (
            <p role="alert" className="mwz-error mt-3">
              {error} You can also email us directly at info@vancouvercharacterevents.com.
            </p>
          ) : null}

          <div className="mt-3 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            {step > 1 ? (
              <button type="button" onClick={() => go(step - 1)} className="mwz-back">
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
                  "mwz-go",
                  (step === 1 ? canStep1 : canStep2) ? "is-ready" : "is-idle",
                  step === 1 && duoReady && "is-charged",
                )}
              >
                <span className="mwz-go-shine" aria-hidden />
                {step === 1 ? "Continue to Details" : "Continue to Contact"}
                <ArrowRight className="mwz-go-arrow h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className={cn("mwz-go", canSubmit ? "is-ready" : "is-idle")}
              >
                <span className="mwz-go-shine" aria-hidden />
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending Request…
                  </>
                ) : (
                  <>
                    <Shell className="h-4 w-4" aria-hidden /> Request My Cove Visit
                    <ArrowRight className="mwz-go-arrow h-4 w-4" aria-hidden />
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
    <div className="mwz-stepper relative mx-auto mt-4 max-w-md px-3">
      <div className="mwz-stepper-track">
        <div className="mwz-stepper-fill" style={{ width: `${((step - 1) / 2) * 100}%` }} />
      </div>
      <ol className="relative flex items-start justify-between">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const state = n < step ? "done" : n === step ? "active" : "todo";
          return (
            <li key={s.label} className="flex flex-1 flex-col items-center text-center">
              <span className={cn("mwz-dot", `is-${state}`)}>
                {state === "done" ? <Check className="h-4 w-4" aria-hidden /> : n}
              </span>
              <span className={cn("mwz-dot-label", state === "todo" && "is-todo")}>{s.label}</span>
              <span className="mwz-dot-sub">{s.sub}</span>
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
      <p className="mwz-hint is-ok">
        <Check className="h-4 w-4 text-[#16A085]" aria-hidden /> Lovely — ready to continue.
      </p>
    );
  }
  return (
    <p className="mwz-hint">
      <Waves className="h-4 w-4 text-[#C99A38]" aria-hidden /> {hint}
    </p>
  );
}

/* ----------------------------------------------------------------- Step 1 --- */

function StepVisit({
  data,
  set,
  notSure,
  selected,
  duoReady,
  selToken,
  duoToken,
  toggleMermaid,
}: {
  data: WizardData;
  set: <K extends keyof WizardData>(k: K, v: WizardData[K]) => void;
  notSure: boolean;
  selected: string[];
  duoReady: boolean;
  selToken: number;
  duoToken: number;
  toggleMermaid: (id: string) => void;
}) {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="mwz-date">
            Event Date
          </label>
          <input
            id="mwz-date"
            type="date"
            className={fieldCls}
            value={data.eventDate}
            onChange={(e) => set("eventDate", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="mwz-time">
            Event Time
          </label>
          <input
            id="mwz-time"
            type="time"
            className={fieldCls}
            value={data.eventTime}
            onChange={(e) => set("eventTime", e.target.value)}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="mwz-type">
            Event Type
          </label>
          <select
            id="mwz-type"
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

      <div className="mt-4">
        <label className={labelCls} htmlFor="mwz-package">
          Cove Pass
        </label>
        <select
          id="mwz-package"
          className={fieldCls}
          value={data.pkg}
          onChange={(e) => set("pkg", e.target.value)}
        >
          <option value="" disabled>
            Choose a cove pass
          </option>
          {PACKAGES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* mermaid chooser */}
      <div className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="mwz-chooser-label">Choose Your Mermaid{duoReady ? "s" : ""}</p>
          <p className="mwz-chooser-help">
            Pick your mermaid{notSure ? "" : ", or add a second for a duo"}.
          </p>
        </div>

        <div className="relative mt-3">
          <div className="flex flex-wrap gap-2.5">
            {MERMAIDS.map((m) => {
              const isOn = selected.includes(m.id);
              const slot = data.mermaid1 === m.id ? 1 : data.mermaid2 === m.id ? 2 : null;
              const full = selected.length >= 2 && !isOn;
              return (
                <MermaidCard
                  key={m.id}
                  mermaid={m}
                  isOn={isOn}
                  slot={slot}
                  full={full}
                  selToken={selToken}
                  onToggle={() => toggleMermaid(m.id)}
                />
              );
            })}
          </div>
          {duoReady ? <span key={duoToken} aria-hidden className="mwz-duoflash" /> : null}
        </div>
      </div>

      <CoveTray data={data} notSure={notSure} duoReady={duoReady} duoToken={duoToken} />
    </div>
  );
}

function MermaidCard({
  mermaid,
  isOn,
  slot,
  full,
  selToken,
  onToggle,
}: {
  mermaid: Mermaid;
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
      className={cn("mwz-char group", isOn ? "is-on" : "is-off", full && "is-full")}
    >
      <span className="mwz-char-portrait">
        <img src={mermaid.img} alt="" aria-hidden loading="lazy" className="mwz-char-img" />
        {isOn ? (
          <span className="mwz-char-check">
            <Check className="h-3 w-3" aria-hidden />
          </span>
        ) : null}
        {isOn && slot ? <span className="mwz-char-slot">Mermaid {slot}</span> : null}
        {isOn ? (
          <span key={`mwz-${selToken}`} aria-hidden className="mwz-burst">
            <span className="mwz-burst-ring" />
            <span className="mwz-twinkle mwz-twinkle--tl" />
            <span className="mwz-twinkle mwz-twinkle--tr" />
            <span className="mwz-twinkle mwz-twinkle--bl" />
            <span className="mwz-twinkle mwz-twinkle--br" />
          </span>
        ) : null}
      </span>
      <span className="mwz-char-meta">
        <span className="mwz-char-name">{mermaid.name}</span>
        <span className="mwz-char-style">{mermaid.style}</span>
        <span className={cn("mwz-char-cta", isOn && "is-on")}>
          {isOn ? "Mermaid Chosen" : "Choose"}
        </span>
      </span>
    </button>
  );
}

function CoveTray({
  data,
  notSure,
  duoReady,
  duoToken,
}: {
  data: WizardData;
  notSure: boolean;
  duoReady: boolean;
  duoToken: number;
}) {
  const status = duoReady
    ? "Mermaid Duo Ready"
    : data.mermaid1
      ? "Mermaid Chosen"
      : "Awaiting your mermaid";
  const slot2 = notSure ? "Optional" : "Add a second for a duo";

  return (
    <div className={cn("mwz-tray mt-6", duoReady && "is-duo")}>
      <div className="flex items-center justify-between">
        <p className="mwz-tray-label">Your Cove Cast</p>
        <span
          key={duoToken}
          className={cn("mwz-status", duoReady ? "is-duo" : data.mermaid1 && "is-one")}
        >
          {duoReady ? <Sparkles className="h-3 w-3" aria-hidden /> : null}
          {status}
        </span>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <CoveSlot id={data.mermaid1} placeholder="Awaiting your mermaid" label="Mermaid 1" />
        <CoveSlot id={data.mermaid2} placeholder={slot2} label="Mermaid 2" />
      </div>
      <p className="mwz-tray-note">
        <Compass className="h-3.5 w-3.5 text-[#C99A38]" aria-hidden /> Pirate helper included with
        every Mermaid Cove visit.
      </p>
    </div>
  );
}

function CoveSlot({
  id,
  placeholder,
  label,
}: {
  id: string | null;
  placeholder: string;
  label: string;
}) {
  const m = id ? MERMAID_BY_ID[id] : null;
  return (
    <div className={cn("mwz-slot", m ? "is-filled" : "is-empty")}>
      <span className="mwz-slot-thumb">
        {m ? (
          <img src={m.img} alt="" aria-hidden className="h-full w-full object-cover object-top" />
        ) : (
          <Shell className="h-4 w-4 text-[#36BEB0]/60" aria-hidden />
        )}
      </span>
      <div className="min-w-0">
        <p className="mwz-slot-label">{label}</p>
        {m ? (
          <p className="mwz-slot-name">{m.name}</p>
        ) : (
          <p className="mwz-slot-empty">{placeholder}</p>
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
        <label className={labelCls} htmlFor="mwz-venue">
          Event / Venue Name <span className="font-normal text-[#114E5A]/45">(optional)</span>
        </label>
        <input
          id="mwz-venue"
          type="text"
          className={fieldCls}
          placeholder="Backyard pool, community centre, hotel, or club"
          value={data.venueName}
          onChange={(e) => set("venueName", e.target.value)}
        />
      </div>
      <div>
        <label className={labelCls} htmlFor="mwz-street">
          Street Address
        </label>
        <input
          id="mwz-street"
          type="text"
          autoComplete="street-address"
          className={fieldCls}
          placeholder="123 Seashell Lane"
          value={data.street}
          onChange={(e) => set("street", e.target.value)}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={labelCls} htmlFor="mwz-city">
            City
          </label>
          <input
            id="mwz-city"
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
          <div className="mwz-locked">
            BC
            <Lock className="h-3.5 w-3.5 text-[#1AA89E]/55" aria-hidden />
          </div>
        </div>
        <div>
          <label className={labelCls} htmlFor="mwz-guests">
            Guest Count
          </label>
          <input
            id="mwz-guests"
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
      <p className="mwz-safety">
        Pool supervision and lifeguard requirements remain the responsibility of the venue or event
        host according to pool rules. Mermaid rides where pool rules and setup allow.
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
            <label className={labelCls} htmlFor="mwz-client">
              Your Name
            </label>
            <input
              id="mwz-client"
              type="text"
              autoComplete="name"
              className={fieldCls}
              placeholder="Your full name"
              value={data.clientName}
              onChange={(e) => set("clientName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="mwz-child">
              Child&apos;s Name <span className="font-normal text-[#114E5A]/45">(optional)</span>
            </label>
            <input
              id="mwz-child"
              type="text"
              className={fieldCls}
              placeholder="Who are we celebrating?"
              value={data.childName}
              onChange={(e) => set("childName", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="mwz-email">
              Email
            </label>
            <input
              id="mwz-email"
              type="email"
              autoComplete="email"
              className={fieldCls}
              placeholder="you@example.com"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div>
            <label className={labelCls} htmlFor="mwz-phone">
              Phone
            </label>
            <input
              id="mwz-phone"
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
          <label className={labelCls} htmlFor="mwz-wishes">
            Special Requests <span className="font-normal text-[#114E5A]/45">(optional)</span>
          </label>
          <textarea
            id="mwz-wishes"
            rows={4}
            className={fieldCls}
            placeholder="Theme, favourite mermaid, pool details, timing, any special requests…"
            value={data.wishes}
            onChange={(e) => set("wishes", e.target.value)}
          />
        </div>
      </div>

      <CoveSummary data={data} />
    </div>
  );
}

function CoveSummary({ data }: { data: WizardData }) {
  const m1 = data.mermaid1 ? MERMAID_BY_ID[data.mermaid1] : null;
  const m2 = data.mermaid2 ? MERMAID_BY_ID[data.mermaid2] : null;
  const rows: { label: string; value: string }[] = [
    { label: "Date", value: data.eventDate || "—" },
    { label: "Time", value: data.eventTime || "—" },
    { label: "Event Type", value: data.eventType || "—" },
    { label: "Cove Pass", value: data.pkg || "—" },
    { label: "Venue", value: data.venueName || "—" },
    { label: "City", value: data.city || "—" },
    { label: "Guests", value: data.guestCount || "—" },
  ];
  return (
    <aside className="mwz-summary">
      <p className="mwz-summary-label">
        <Shell className="h-3.5 w-3.5 text-[#C99A38]" aria-hidden /> Cove Summary
      </p>
      <dl className="mt-3 space-y-2 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="mwz-summary-row">
            <dt className="text-[#3A6E73]">{r.label}</dt>
            <dd className="text-right font-semibold text-[#114E5A]">{r.value}</dd>
          </div>
        ))}
        <div className="pt-1">
          <dt className="text-[#3A6E73]">Mermaid(s)</dt>
          <dd className="mt-1.5 space-y-1.5">
            {m1 || m2 ? (
              [m1, m2].filter(Boolean).map((m) => (
                <span key={m!.id} className="mwz-summary-mermaid">
                  <span className="mwz-summary-thumb">
                    <img
                      src={m!.img}
                      alt=""
                      aria-hidden
                      className="h-full w-full object-cover object-top"
                    />
                  </span>
                  <span className="truncate text-[0.8rem] font-semibold text-[#114E5A]">
                    {m!.name}
                  </span>
                </span>
              ))
            ) : (
              <span className="text-[0.82rem] text-[#114E5A]/45">
                We&apos;ll help you choose the perfect mermaid
              </span>
            )}
          </dd>
        </div>
      </dl>
    </aside>
  );
}

/* ----------------------------------------------------------------- Success --- */

function CoveSent({ onReset }: { onReset: () => void }) {
  return (
    <div className="mwz-sent relative overflow-hidden text-center">
      <span aria-hidden className="mwz-sent-rays pointer-events-none absolute inset-0" />
      <span aria-hidden className="mwz-sent-badge">
        <Shell className="h-10 w-10" />
        <Check className="mwz-sent-check h-5 w-5" />
      </span>
      <h3 className="mwz-sent-title">Cove Request Received</h3>
      <p className="mwz-sent-copy">
        Thank you! We&apos;ve received your Mermaid Cove details and will follow up soon to confirm
        availability, pool setup, and the best experience for your celebration.
      </p>
      <div className="mwz-sent-actions">
        <Link to="/" className="mwz-go is-ready">
          <span className="mwz-go-shine" aria-hidden />
          <Home className="h-4 w-4" aria-hidden /> Back to Home
        </Link>
        <button type="button" onClick={onReset} className="mwz-sent-again">
          Send another request
        </button>
      </div>
    </div>
  );
}

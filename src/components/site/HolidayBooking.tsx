import { useState, type ComponentType, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  Candy,
  Check,
  Egg,
  Ghost,
  Gift,
  Heart,
  HelpCircle,
  Lightbulb,
  Loader2,
  Lock,
  Mail,
  Moon,
  Music,
  Rabbit,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Store,
  X,
} from "lucide-react";
import { submitInquiry } from "@/lib/inquiry";
import { cn } from "@/lib/utils";
import { Holly, Ornament } from "./holiday-decor";

/**
 * HolidayBooking — Part 2 of the final "Plan Your Holiday Village Visit" desk: the
 * single-page "Holiday Request Card" (the holiday sibling of MascotBooking, restyled
 * cream / berry / antique-gold — no brown). A two-column form — a required Package
 * selector and clickable seasonal Character cards on the left, contact + event fields
 * on the right. The form MECHANICS mirror the other realm forms exactly (same state/
 * validation/required fields, shared Resend pipeline via submitInquiry, accessible
 * inline errors, loading + success states). Brand-safe seasonal character names only.
 * Reduced-motion safe.
 */
type IconType = ComponentType<{ className?: string }>;
type Option = { id: string; label: string; icon: IconType; acc: string; accDeep: string };

const PACKAGES: Option[] = [
  { id: "Holiday Character Visit", label: "Holiday Character Visit", icon: Mail, acc: "#2C7D4F", accDeep: "#1E6E4A" },
  { id: "Holiday Party Experience", label: "Holiday Party Experience", icon: Sparkles, acc: "#C19A3C", accDeep: "#9A6E2B" },
  { id: "School, Mall & Festival Appearance", label: "School, Mall & Festival Appearance", icon: Store, acc: "#3E7CA8", accDeep: "#2C5E82" },
  { id: "Not Sure Yet", label: "Not Sure Yet", icon: HelpCircle, acc: "#6E2A48", accDeep: "#4E1D34" },
];

/* The seasonal cast — brand-safe public names, grouped by season (mirrors the
   "Step into every season" character zones). Clickable multi-select for the form. */
const CHAR_GROUPS: { id: string; label: string; icon: IconType; acc: string; accDeep: string; chars: { name: string; icon: IconType }[] }[] = [
  {
    id: "easter",
    label: "Spring / Easter",
    icon: Egg,
    acc: "#9B7BB8",
    accDeep: "#6E4F86",
    chars: [
      { name: "Storybook Alice", icon: BookOpen },
      { name: "Easter Bunny", icon: Rabbit },
      { name: "Mad Hatter", icon: Sparkles },
    ],
  },
  {
    id: "halloween",
    label: "Halloween",
    icon: Ghost,
    acc: "#E07B39",
    accDeep: "#A8531B",
    chars: [{ name: "Spooky Gothic Guest", icon: Moon }],
  },
  {
    id: "christmas",
    label: "Christmas",
    icon: Snowflake,
    acc: "#B0232A",
    accDeep: "#7E1B22",
    chars: [
      { name: "Santa", icon: Gift },
      { name: "Mrs. Claus", icon: Heart },
      { name: "Mischievous Green Guest", icon: Sparkles },
      { name: "Sweet Christmas Helper", icon: Candy },
      { name: "Caroler Trio", icon: Music },
      { name: "Christmas Belle", icon: Star },
    ],
  },
];

const EVENT_TYPES = [
  "Birthday Party",
  "School / Daycare",
  "Community Event",
  "Festival",
  "Mall / Grand Opening",
  "Corporate Event",
  "Other",
] as const;

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const CHARACTER_BY_ID: Record<string, string> = Object.fromEntries(
  CHAR_GROUPS.flatMap((g) => g.chars).map((c) => [slugify(c.name), c.name]),
);

type Data = {
  package: string;
  characters: string[];
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  city: string;
  guests: string;
  notes: string;
};

const EMPTY: Data = {
  package: "",
  characters: [],
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  eventTime: "",
  city: "",
  guests: "",
  notes: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED: { key: keyof Data; msg: string }[] = [
  { key: "package", msg: "Please choose a package." },
  { key: "name", msg: "Please add your name." },
  { key: "email", msg: "Please add your email." },
  { key: "phone", msg: "Please add a phone number." },
  { key: "eventType", msg: "Please select an event type." },
  { key: "eventDate", msg: "Please add an event date." },
  { key: "eventTime", msg: "Please add an event time." },
  { key: "city", msg: "Please add a location / city." },
  { key: "guests", msg: "Please add an approximate guest count." },
];

const labelCls = "mb-1.5 block text-sm font-semibold text-[#4A3A30]";
const reqStar = <span className="text-[#B0232A]"> *</span>;

export function HolidayBooking() {
  const [data, setData] = useState<Data>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Data, string>>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hp, setHp] = useState("");

  const set = <K extends keyof Data>(k: K, v: Data[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((e) => (e[k] ? { ...e, [k]: undefined } : e));
  };

  const toggleChar = (id: string) =>
    setData((d) => ({
      ...d,
      characters: d.characters.includes(id) ? d.characters.filter((x) => x !== id) : [...d.characters, id],
    }));

  const validate = (): Partial<Record<keyof Data, string>> => {
    const e: Partial<Record<keyof Data, string>> = {};
    for (const { key, msg } of REQUIRED) if (!String(data[key]).trim()) e[key] = msg;
    if (data.email.trim() && !EMAIL_RE.test(data.email.trim()))
      e.email = "Please enter a valid email address.";
    return e;
  };

  const fieldCls = (key: keyof Data) =>
    cn(
      "w-full rounded-xl border bg-[#FFFCF4] px-4 py-2.5 text-base text-[#4A3A30] placeholder:text-[#B8A98E] transition-colors focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1",
      errors[key]
        ? "border-[#B0232A] focus:border-[#B0232A] focus-visible:outline-[#B0232A]"
        : "border-[#D9C8A4] focus:border-[#1E6E4A] focus-visible:outline-[#1E6E4A]",
    );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hp) return;
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const first = REQUIRED.find(({ key }) => errs[key])?.key;
      if (first) document.getElementById(`hbk-${first}`)?.focus();
      return;
    }
    const fields: Record<string, string> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      eventType: data.eventType,
      package: data.package,
      characters: data.characters.map((id) => CHARACTER_BY_ID[id]).filter(Boolean).join(", "),
      date: data.eventDate,
      time: data.eventTime,
      city: data.city,
      guests: data.guests,
      notes: data.notes,
    };
    setSubmitting(true);
    setSubmitError(null);
    const res = await submitInquiry("Holiday Events", fields);
    setSubmitting(false);
    if (res.ok) setSent(true);
    else setSubmitError(res.error || "Something went wrong. Please try again.");
  };

  return (
    <section
      id="holiday-book"
      aria-labelledby="hbk-title"
      className="relative isolate scroll-mt-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #FBF3E0 0%, #FCF6EB 42%, #FFFBF1 100%)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span
          className="absolute left-1/2 top-[-6rem] h-[20rem] w-[36rem] -translate-x-1/2 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle at 50% 44%, rgba(255,238,196,0.55), transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1080px] px-5 pb-24 pt-8 sm:px-6 lg:px-8">
        {sent ? (
          <HolidaySent onReset={() => { setSent(false); setData(EMPTY); setErrors({}); }} />
        ) : (
          <div className="relative rounded-[30px] border-[3px] border-[#C19A3C] bg-[rgba(255,253,247,0.95)] p-5 shadow-[0_30px_64px_-34px_rgba(74,42,20,0.5)] backdrop-blur-sm sm:p-7 md:p-8">
            {/* decorated border — inset gold frame + corner holly/ornaments */}
            <span aria-hidden className="pointer-events-none absolute inset-[7px] rounded-[24px] border border-[rgba(193,154,60,0.45)]" />
            <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[3px] w-[60%] rounded-b bg-gradient-to-r from-transparent via-[#B0232A] to-transparent opacity-70" />
            <Holly className="pointer-events-none absolute -left-3 -top-3 h-10 w-10 -rotate-[18deg] drop-shadow-[0_3px_4px_rgba(110,42,72,0.25)]" />
            <Holly className="pointer-events-none absolute -right-3 -top-3 h-10 w-10 -scale-x-100 rotate-[18deg] drop-shadow-[0_3px_4px_rgba(110,42,72,0.25)]" />
            <Ornament color="#B0232A" className="pointer-events-none absolute -bottom-3 left-5 h-8 w-7 drop-shadow-[0_3px_4px_rgba(110,42,72,0.25)]" />
            <Ornament color="#2C7D4F" className="pointer-events-none absolute -bottom-3 right-5 h-8 w-7 drop-shadow-[0_3px_4px_rgba(110,42,72,0.25)]" />

            {/* ribbon header */}
            <div className="relative text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(193,154,60,0.6)] bg-gradient-to-b from-[#2C7D4F] to-[#1E6E4A] px-4 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_8px_16px_-8px_rgba(30,46,33,0.6),inset_0_1px_0_rgba(255,255,255,0.25)]">
                <Snowflake className="h-3.5 w-3.5 text-[#FFE6A8]" aria-hidden />
                Start Your Holiday Request
              </span>
            </div>

            <div className="relative mt-5 grid gap-8 lg:grid-cols-2">
              {/* LEFT — intro + package + character cards */}
              <div>
                <h2 id="hbk-title" className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05]">
                  <span className="text-[#6E2A48]">Request Your</span>{" "}
                  <span className="text-[#B0232A]">Holiday Village Visit</span>
                </h2>
                <p className="mt-3 text-[0.96rem] leading-relaxed text-[#4A3A30]">
                  Tell us your event type, the package and characters you are imagining, your location,
                  and the kind of holiday moment you want. We&apos;ll help recommend the best format.
                </p>

                <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-[rgba(193,154,60,0.5)] bg-[#FFF6DD] px-3.5 py-3 text-[0.84rem] leading-snug text-[#6B5326]">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#C19A3C]" aria-hidden />
                  Not sure which holiday visit fits? Tell us your season, event type, guest count, age
                  range, and setting — we&apos;ll recommend the right option.
                </p>

                {/* Package */}
                <p className="mt-6 mb-2 flex items-center gap-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#1E6E4A]">
                  <CalendarDays className="h-3.5 w-3.5 text-[#C19A3C]" aria-hidden /> Choose Your Package
                  {reqStar}
                </p>
                <div role="radiogroup" aria-label="Package" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {PACKAGES.map((o) => (
                    <ChoiceCard key={o.id} option={o} selected={data.package === o.id} onSelect={() => set("package", o.id)} big />
                  ))}
                </div>
                {errors.package ? <FieldError id="hbk-package-err">{errors.package}</FieldError> : null}

                {/* Characters */}
                <p className="mt-5 mb-1 flex items-center gap-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#1E6E4A]">
                  <CalendarDays className="h-3.5 w-3.5 text-[#C19A3C]" aria-hidden /> Choose Your Characters
                  <span className="font-semibold lowercase tracking-normal text-[#8A7A6E]">(optional)</span>
                </p>
                <p className="mb-3 text-[0.78rem] text-[#5A4A3E]">
                  Click any holiday characters you&apos;d love at your event — add as many as you like.
                </p>
                <div className="space-y-3">
                  {CHAR_GROUPS.map((g) => {
                    const GroupIcon = g.icon;
                    return (
                      <div key={g.id}>
                        <p className="mb-1.5 inline-flex items-center gap-1.5 text-[0.58rem] font-bold uppercase tracking-[0.14em]" style={{ color: g.accDeep }}>
                          <GroupIcon className="h-3.5 w-3.5" style={{ color: g.acc }} aria-hidden />
                          {g.label}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {g.chars.map((c) => {
                            const id = slugify(c.name);
                            return (
                              <CharCard
                                key={id}
                                name={c.name}
                                icon={c.icon}
                                acc={g.acc}
                                accDeep={g.accDeep}
                                on={data.characters.includes(id)}
                                onToggle={() => toggleChar(id)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {data.characters.length ? (
                  <div className="mt-3 rounded-xl border border-[#C19A3C]/40 bg-[#FFF8EC]/80 p-3">
                    <p className="flex items-center justify-between text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[#6E2A48]">
                      <span className="inline-flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-[#C19A3C]" aria-hidden /> Your Holiday Cast
                      </span>
                      <span className="rounded-full bg-[#1E6E4A] px-2 py-0.5 text-white">{data.characters.length}</span>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {data.characters.map((id) => (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1 rounded-full border border-[#C19A3C]/40 bg-white px-2.5 py-1 text-[0.74rem] font-semibold text-[#6E2A48]"
                        >
                          {CHARACTER_BY_ID[id]}
                          <button
                            type="button"
                            aria-label={`Remove ${CHARACTER_BY_ID[id]}`}
                            onClick={() => toggleChar(id)}
                            className="grid h-4 w-4 place-items-center rounded-full text-[#B0232A] transition-colors hover:bg-[#B0232A] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#B0232A]"
                          >
                            <X className="h-3 w-3" aria-hidden />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-[rgba(62,124,168,0.45)] bg-[#EAF2F9] px-3.5 py-3 text-[0.82rem] leading-snug text-[#27557A]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#3E7CA8]" aria-hidden />
                  All Holiday Village visits are handler-supported and designed for safe, friendly, and
                  memorable seasonal experiences.
                </p>
              </div>

              {/* RIGHT — contact + event fields */}
              <div>
                <p className="mb-3 flex items-center gap-2 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#1E6E4A]">
                  <CalendarDays className="h-4 w-4 text-[#C19A3C]" aria-hidden /> Tell Us About Your Event
                </p>
                <form onSubmit={handleSubmit} noValidate className="grid gap-4">
                  <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
                    <label htmlFor="hbk-company">Company (leave blank)</label>
                    <input id="hbk-company" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                  </div>

                  <Field id="hbk-name" label={<>Your Name{reqStar}</>} error={errors.name}>
                    <input id="hbk-name" type="text" autoComplete="name" placeholder="First and last name" className={fieldCls("name")} value={data.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} />
                  </Field>
                  <Field id="hbk-email" label={<>Email Address{reqStar}</>} error={errors.email}>
                    <input id="hbk-email" type="email" autoComplete="email" placeholder="name@email.com" className={fieldCls("email")} value={data.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} />
                  </Field>
                  <Field id="hbk-phone" label={<>Phone Number{reqStar}</>} error={errors.phone}>
                    <input id="hbk-phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" className={fieldCls("phone")} value={data.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} />
                  </Field>
                  <Field id="hbk-eventType" label={<>Event Type{reqStar}</>} error={errors.eventType}>
                    <select id="hbk-eventType" className={fieldCls("eventType")} value={data.eventType} onChange={(e) => set("eventType", e.target.value)} aria-invalid={!!errors.eventType}>
                      <option value="" disabled>Select event type</option>
                      {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="hbk-eventDate" label={<>Event Date{reqStar}</>} error={errors.eventDate}>
                      <input id="hbk-eventDate" type="date" className={fieldCls("eventDate")} value={data.eventDate} onChange={(e) => set("eventDate", e.target.value)} aria-invalid={!!errors.eventDate} />
                    </Field>
                    <Field id="hbk-eventTime" label={<>Event Time{reqStar}</>} error={errors.eventTime}>
                      <input id="hbk-eventTime" type="time" className={fieldCls("eventTime")} value={data.eventTime} onChange={(e) => set("eventTime", e.target.value)} aria-invalid={!!errors.eventTime} />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="hbk-city" label={<>Location / City{reqStar}</>} error={errors.city}>
                      <input id="hbk-city" type="text" autoComplete="address-level2" placeholder="City, State / Province" className={fieldCls("city")} value={data.city} onChange={(e) => set("city", e.target.value)} aria-invalid={!!errors.city} />
                    </Field>
                    <Field id="hbk-guests" label={<>Guest Count (Approx.){reqStar}</>} error={errors.guests}>
                      <input id="hbk-guests" type="number" min={1} inputMode="numeric" placeholder="Number of guests" className={fieldCls("guests")} value={data.guests} onChange={(e) => set("guests", e.target.value)} aria-invalid={!!errors.guests} />
                    </Field>
                  </div>
                  <Field id="hbk-notes" label="Tell Us More About Your Event">
                    <textarea id="hbk-notes" rows={3} placeholder="Share details about your event, season, age range, what you're looking for, and any special requests." className={fieldCls("notes")} value={data.notes} onChange={(e) => set("notes", e.target.value)} />
                  </Field>

                  {submitError ? (
                    <p role="alert" className="rounded-xl border border-[#B0232A]/40 bg-[#B0232A]/8 px-4 py-2.5 text-sm text-[#8E1B22]">
                      {submitError} You can also email us directly at info@vancouvercharacterevents.com.
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mt-1 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-[rgba(226,194,113,0.75)] bg-gradient-to-r from-[#2C7D4F] to-[#1E6E4A] px-7 py-4 text-base font-bold text-white shadow-[0_18px_38px_-16px_rgba(30,46,33,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-16px_rgba(30,46,33,0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C19A3C] disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending Request…
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 text-[#FFE6A8]" aria-hidden />
                        Request My Holiday Visit
                        <Snowflake className="h-5 w-5 text-[#FFE6A8] transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                      </>
                    )}
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-[0.78rem] text-[#5A4A3E]">
                    <Lock className="h-3.5 w-3.5 text-[#C19A3C]" aria-hidden />
                    We respect your privacy. Your details are safe with us.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* bottom banner */}
        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2.5 rounded-2xl border-2 border-[rgba(193,154,60,0.45)] bg-gradient-to-b from-[#FFFDF8] to-[#FBF1D6] px-5 py-3.5 text-center shadow-[0_14px_28px_-16px_rgba(74,42,20,0.4)]">
          <Gift className="h-4 w-4 shrink-0 text-[#B0232A]" aria-hidden />
          <p className="font-display text-[0.98rem] font-bold leading-snug text-[#6E2A48]">
            We can&apos;t wait to bring holiday magic to your event!
          </p>
          <Snowflake className="h-4 w-4 shrink-0 text-[#1E6E4A]" aria-hidden />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------- */

function ChoiceCard({
  option,
  selected,
  onSelect,
  big = false,
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
  big?: boolean;
}) {
  const Icon = option.icon;
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      style={
        selected
          ? {
              borderColor: option.acc,
              background: `color-mix(in oklab, ${option.acc} 9%, #fff)`,
              boxShadow: `0 12px 26px -14px rgba(74,42,20,0.4), 0 0 0 3px color-mix(in oklab, ${option.acc} 18%, transparent)`,
            }
          : undefined
      }
      className={cn(
        "group relative flex flex-col items-center justify-start gap-1.5 rounded-2xl border-2 px-1.5 text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6E4A]",
        big ? "py-3" : "py-2.5",
        selected
          ? ""
          : "border-[rgba(193,154,60,0.35)] bg-white/85 hover:-translate-y-0.5 hover:border-[#1E6E4A]/55 hover:shadow-[0_12px_26px_-16px_rgba(74,42,20,0.4)]",
      )}
    >
      {selected ? (
        <span style={{ background: option.acc }} className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full text-white shadow-[0_0_0_2px_#fff]">
          <Check className="h-2.5 w-2.5" aria-hidden />
        </span>
      ) : null}
      <span
        style={selected ? { background: `linear-gradient(135deg, ${option.acc}, ${option.accDeep})`, color: "#fff" } : undefined}
        className={cn(
          "grid place-items-center rounded-full border-2 border-white transition-colors duration-200",
          big ? "h-9 w-9" : "h-8 w-8",
          selected ? "" : "bg-gradient-to-br from-[#FBEFD2] to-[#F3E2B6] text-[#9A6E2B]",
        )}
      >
        <Icon className={big ? "h-5 w-5" : "h-4 w-4"} aria-hidden />
      </span>
      <span className="block text-[0.64rem] font-bold leading-tight text-[#3A2A28]">{option.label}</span>
    </button>
  );
}

function CharCard({
  name,
  icon: Icon,
  acc,
  accDeep,
  on,
  onToggle,
}: {
  name: string;
  icon: IconType;
  acc: string;
  accDeep: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      aria-label={name}
      title={name}
      onClick={onToggle}
      style={
        on
          ? {
              borderColor: acc,
              background: `color-mix(in oklab, ${acc} 9%, #fff)`,
              boxShadow: `0 10px 22px -12px rgba(74,42,20,0.4), 0 0 0 3px color-mix(in oklab, ${acc} 18%, transparent)`,
            }
          : undefined
      }
      className={cn(
        "group relative flex w-[84px] flex-col items-center gap-1 rounded-xl border-2 p-1.5 text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E6E4A] sm:w-[88px]",
        on
          ? ""
          : "border-[rgba(193,154,60,0.3)] bg-white/85 hover:-translate-y-0.5 hover:border-[#1E6E4A]/55 hover:shadow-[0_10px_22px_-14px_rgba(74,42,20,0.4)]",
      )}
    >
      <span
        style={on ? { background: `linear-gradient(135deg, ${acc}, ${accDeep})`, color: "#fff" } : undefined}
        className={cn(
          "relative grid h-9 w-9 place-items-center rounded-full border-2 border-white transition-colors duration-200",
          on ? "" : "bg-gradient-to-br from-[#FBEFD2] to-[#F3E2B6] text-[#9A6E2B]",
        )}
      >
        <Icon className="h-4 w-4" aria-hidden />
        {on ? (
          <span style={{ background: acc }} className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full text-white shadow-[0_0_0_2px_#fff]">
            <Check className="h-2.5 w-2.5" aria-hidden />
          </span>
        ) : null}
      </span>
      <span className="block w-full truncate text-[0.6rem] font-semibold leading-tight text-[#3A2A28]">
        {name}
      </span>
    </button>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className={labelCls} htmlFor={id}>{label}</label>
      {children}
      {error ? <FieldError id={`${id}-err`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-[0.78rem] font-medium text-[#B0232A]">
      {children}
    </p>
  );
}

/* ----------------------------------------------------------------- Success --- */

function HolidaySent({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border-2 border-[rgba(193,154,60,0.5)] bg-[rgba(255,253,247,0.96)] p-10 text-center shadow-[0_30px_64px_-34px_rgba(74,42,20,0.45)] backdrop-blur-sm">
      <span aria-hidden className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#2C7D4F] to-[#C19A3C] text-white shadow-[0_16px_32px_-12px_rgba(30,46,33,0.6)]">
        <Check className="h-10 w-10" />
        <Snowflake className="absolute -right-1 -top-1 h-6 w-6 text-[#FFE6A8]" />
      </span>
      <h3 className="mt-6 font-display text-3xl font-bold text-[#6E2A48] md:text-4xl">
        Holiday Village Request Received
      </h3>
      <p className="mx-auto mt-3 max-w-lg text-[#4A3A30]">
        Thank you! We&apos;ve received your Holiday Village details and will follow up soon with
        availability, recommendations, and the best seasonal visit format for your event.
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2C7D4F] to-[#1E6E4A] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(30,46,33,0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C19A3C]"
        >
          Back to Home
        </Link>
        <button type="button" onClick={onReset} className="text-sm font-semibold text-[#1E6E4A] underline-offset-4 hover:underline">
          Send another request
        </button>
      </div>
    </div>
  );
}

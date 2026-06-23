import { useState, type ComponentType, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Cake,
  Camera,
  Check,
  Compass,
  Flag,
  Flower2,
  Heart,
  HelpCircle,
  Leaf,
  Lightbulb,
  Loader2,
  Lock,
  PartyPopper,
  PawPrint,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Tent,
  Tv,
  X,
} from "lucide-react";
import { submitInquiry } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

/**
 * MascotBooking — Part 2 of the final "Plan Your Mascot Meadows Visit" station:
 * the single-page "Meadow Request Card". A two-column form — selectable Visit Type
 * cards (4) and optional Mascot Style cards (7) on the left, contact + event fields
 * on the right — that closes the page on a clear conversion point. Front-end only;
 * submits through the shared Resend inquiry pipeline (submitInquiry). Meadow
 * green/gold/cream, brand-safe archetype language only. Validates on submit with
 * accessible inline errors; reduced-motion safe (global guard). No new keyframes.
 */
type IconType = ComponentType<{ className?: string }>;
type Option = { id: string; label: string; icon: IconType };

const VISIT_TYPES: Option[] = [
  { id: "Mascot Visit", label: "Mascot Visit", icon: PartyPopper },
  { id: "Mascot Party Experience", label: "Mascot Party Experience", icon: Cake },
  { id: "Festival & Public Event Mascot", label: "Festival & Public Event Mascot", icon: Tent },
  { id: "Not Sure Yet", label: "Not Sure Yet", icon: HelpCircle },
];

const MASCOT_STYLES: Option[] = [
  { id: "Cuddly Animal Friends", label: "Cuddly Animal Friends", icon: PawPrint },
  { id: "Party Pals", label: "Party Pals", icon: Sparkles },
  { id: "Photo Friends", label: "Photo Friends", icon: Camera },
  { id: "Festival Friends", label: "Festival Friends", icon: Flag },
  { id: "Holiday Mascots", label: "Holiday Mascots", icon: Snowflake },
  { id: "Custom Mascot Moments", label: "Custom Mascot Moments", icon: Star },
  { id: "Not Sure Yet", label: "Not Sure Yet", icon: HelpCircle },
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

/* The meadow crew — brand-safe archetype names, grouped by zone (mirrors the
   "Meet the Meadow Friends" map). Optional specific-mascot picks for the form. */
const ZONES: { id: string; label: string; icon: IconType; friends: string[] }[] = [
  {
    id: "classic",
    label: "Party Favourites",
    icon: Sparkles,
    friends: ["Friendly Snowman", "Classic Mouse", "Dapper Mouse", "Sweetheart Mouse", "Pretty Bow Mouse"],
  },
  {
    id: "cartoon",
    label: "Cartoon Friends",
    icon: Tv,
    friends: ["Sea Sponge Pal", "Little Vampire", "Red Furry Friend", "Little Piglet", "Happy Troll", "Little Shark", "Blue Pup"],
  },
  {
    id: "adventure",
    label: "Adventure & Hero Pals",
    icon: Compass,
    friends: ["Electric Mouse", "Police Pup", "Fire Pup", "Cat Hero", "Owl Hero", "Explorer Girl", "Animal Rescuer", "Pete the Pirate"],
  },
  {
    id: "animal",
    label: "Animal & Dino Mascots",
    icon: Leaf,
    friends: ["Blue Dino", "Pink Dino", "Antabella the Ant", "Cuddly Koala", "Busy Beaver", "Spring Bunny"],
  },
];
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const MASCOT_BY_ID: Record<string, string> = Object.fromEntries(
  ZONES.flatMap((z) => z.friends).map((name) => [slugify(name), name]),
);
const CARD_ICONS: IconType[] = [Star, Heart, Sparkles, PawPrint];

type Data = {
  visitType: string;
  mascotStyle: string;
  mascots: string[];
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
  visitType: "",
  mascotStyle: "",
  mascots: [],
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
  { key: "visitType", msg: "Please choose a visit type." },
  { key: "name", msg: "Please add your name." },
  { key: "email", msg: "Please add your email." },
  { key: "phone", msg: "Please add a phone number." },
  { key: "eventType", msg: "Please select an event type." },
  { key: "eventDate", msg: "Please add an event date." },
  { key: "eventTime", msg: "Please add an event time." },
  { key: "city", msg: "Please add a location / city." },
  { key: "guests", msg: "Please add an approximate guest count." },
];

const labelCls = "mb-1.5 block text-sm font-semibold text-[#2C4A30]";
const reqStar = <span className="text-[#E6588F]"> *</span>;

export function MascotBooking() {
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

  const toggleMascot = (id: string) =>
    setData((d) => ({
      ...d,
      mascots: d.mascots.includes(id) ? d.mascots.filter((x) => x !== id) : [...d.mascots, id],
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
      "w-full rounded-xl border bg-[#FFFDF6] px-4 py-2.5 text-base text-[#2C4A30] placeholder:text-[#9AA890] transition-colors focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1",
      errors[key]
        ? "border-[#E6588F] focus:border-[#E6588F] focus-visible:outline-[#E6588F]"
        : "border-[#D9C8A4] focus:border-[#4CA45D] focus-visible:outline-[#4CA45D]",
    );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hp) return;
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const first = REQUIRED.find(({ key }) => errs[key])?.key;
      if (first) document.getElementById(`mbk-${first}`)?.focus();
      return;
    }
    const fields: Record<string, string> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      eventType: data.eventType,
      visitType: data.visitType,
      mascotStyle: data.mascotStyle,
      mascots: data.mascots.map((id) => MASCOT_BY_ID[id]).filter(Boolean).join(", "),
      date: data.eventDate,
      time: data.eventTime,
      city: data.city,
      guests: data.guests,
      notes: data.notes,
    };
    setSubmitting(true);
    setSubmitError(null);
    const res = await submitInquiry("Mascot Events", fields);
    setSubmitting(false);
    if (res.ok) setSent(true);
    else setSubmitError(res.error || "Something went wrong. Please try again.");
  };

  return (
    <section
      id="mascot-book"
      aria-labelledby="mbk-title"
      className="relative isolate scroll-mt-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #EAF5D8 0%, #FBF7EC 40%, #F0F8E2 100%)" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span
          className="absolute left-1/2 top-[-7rem] h-[20rem] w-[34rem] -translate-x-1/2 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle at 50% 44%, rgba(255,244,200,0.6), transparent 70%)" }}
        />
        <span
          className="absolute inset-x-0 bottom-0 h-24"
          style={{ background: "linear-gradient(180deg, transparent, rgba(170,214,120,0.5) 50%, #BCE08C)" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1080px] px-5 pb-24 pt-8 sm:px-6 lg:px-8">
        {sent ? (
          <MeadowSent onReset={() => { setSent(false); setData(EMPTY); setErrors({}); }} />
        ) : (
          <div className="relative rounded-[28px] border-2 border-[rgba(226,169,46,0.5)] bg-[rgba(255,252,242,0.94)] p-5 shadow-[0_30px_64px_-34px_rgba(46,74,40,0.5)] backdrop-blur-sm sm:p-7 md:p-8">
            {/* ribbon header */}
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(34,90,140,0.4)] bg-gradient-to-b from-[#5BB7E6] to-[#2C7FB8] px-4 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_8px_16px_-8px_rgba(20,60,90,0.6),inset_0_1px_0_rgba(255,255,255,0.25)]">
                <PawPrint className="h-3.5 w-3.5 text-white/90" aria-hidden />
                Start Your Meadow Request
                <PawPrint className="h-3.5 w-3.5 -scale-x-100 text-white/90" aria-hidden />
              </span>
            </div>

            <div className="mt-5 grid gap-8 lg:grid-cols-2">
              {/* LEFT — intro + selectable cards */}
              <div>
                <h2 id="mbk-title" className="inline-flex flex-wrap items-center gap-x-2 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05] text-[#2C6E3A]">
                  Request Your Mascot Meadows Visit
                  <Flower2 className="h-5 w-5 text-[#F2A0C0]" aria-hidden />
                </h2>
                <p className="mt-3 text-[0.96rem] leading-relaxed text-[#2F5638]">
                  Tell us about your event, the mascot style you are imagining, and whether you need a
                  birthday visit, party experience, or public-event appearance. We&apos;ll help
                  recommend the best format.
                </p>

                <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-[rgba(226,169,46,0.5)] bg-[#FFF6DD] px-3.5 py-3 text-[0.84rem] leading-snug text-[#6B5326]">
                  <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#E2A92E]" aria-hidden />
                  Not sure which mascot visit fits? Tell us your event type, guest count, age range,
                  and setting — we&apos;ll recommend the right option.
                </p>

                {/* Visit type */}
                <p className="mt-6 mb-2 flex items-center gap-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#2C6E3A]">
                  <PawPrint className="h-3.5 w-3.5 text-[#4CA45D]" aria-hidden /> Choose Your Visit Type
                  {reqStar}
                </p>
                <div role="radiogroup" aria-label="Visit type" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {VISIT_TYPES.map((o) => (
                    <ChoiceCard key={o.id} option={o} selected={data.visitType === o.id} onSelect={() => set("visitType", o.id)} big />
                  ))}
                </div>
                {errors.visitType ? <FieldError id="mbk-visitType-err">{errors.visitType}</FieldError> : null}

                {/* Mascot style */}
                <p className="mt-5 mb-2 flex items-center gap-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#2C6E3A]">
                  <PawPrint className="h-3.5 w-3.5 text-[#4CA45D]" aria-hidden /> Choose Mascot Style
                  <span className="font-semibold lowercase tracking-normal text-[#7E8A74]">(optional)</span>
                </p>
                <div role="radiogroup" aria-label="Mascot style" className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                  {MASCOT_STYLES.map((o, i) => (
                    <ChoiceCard
                      key={`${o.id}-${i}`}
                      option={o}
                      selected={data.mascotStyle === o.id}
                      onSelect={() => set("mascotStyle", data.mascotStyle === o.id ? "" : o.id)}
                    />
                  ))}
                </div>

                {/* Pick specific mascots — the clickable meadow-crew character cards */}
                <p className="mt-5 mb-1 flex items-center gap-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#2C6E3A]">
                  <PawPrint className="h-3.5 w-3.5 text-[#4CA45D]" aria-hidden /> Pick Your Mascots
                  <span className="font-semibold lowercase tracking-normal text-[#7E8A74]">(optional)</span>
                </p>
                <p className="mb-3 text-[0.78rem] text-[#5A6B50]">
                  Click any meadow friends you&apos;d love at your event — add as many as you like.
                </p>
                <div className="space-y-3">
                  {ZONES.map((z) => {
                    const ZoneIcon = z.icon;
                    return (
                      <div key={z.id}>
                        <p className="mb-1.5 inline-flex items-center gap-1.5 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-[#B5821C]">
                          <ZoneIcon className="h-3.5 w-3.5 text-[#4CA45D]" aria-hidden />
                          {z.label}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {z.friends.map((name, i) => {
                            const id = slugify(name);
                            return (
                              <CharCard
                                key={id}
                                name={name}
                                icon={CARD_ICONS[i % CARD_ICONS.length]}
                                on={data.mascots.includes(id)}
                                onToggle={() => toggleMascot(id)}
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {data.mascots.length ? (
                  <div className="mt-3 rounded-xl border border-[#4CA45D]/40 bg-[#F0F8E2]/70 p-3">
                    <p className="flex items-center justify-between text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[#2C6E3A]">
                      <span className="inline-flex items-center gap-1.5">
                        <PawPrint className="h-3.5 w-3.5 text-[#E2A92E]" aria-hidden /> Your Meadow Crew
                      </span>
                      <span className="rounded-full bg-[#4CA45D] px-2 py-0.5 text-white">{data.mascots.length}</span>
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {data.mascots.map((id) => (
                        <span
                          key={id}
                          className="inline-flex items-center gap-1 rounded-full border border-[#4CA45D]/40 bg-white px-2.5 py-1 text-[0.74rem] font-semibold text-[#20532C]"
                        >
                          {MASCOT_BY_ID[id]}
                          <button
                            type="button"
                            aria-label={`Remove ${MASCOT_BY_ID[id]}`}
                            onClick={() => toggleMascot(id)}
                            className="grid h-4 w-4 place-items-center rounded-full text-[#4CA45D] transition-colors hover:bg-[#4CA45D] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#4CA45D]"
                          >
                            <X className="h-3 w-3" aria-hidden />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-[rgba(91,183,230,0.45)] bg-[#E7F4FC] px-3.5 py-3 text-[0.82rem] leading-snug text-[#23597D]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#2C7FB8]" aria-hidden />
                  All Mascot Meadows visits are handler-supported and designed for safe, friendly, and
                  memorable experiences.
                </p>
              </div>

              {/* RIGHT — contact + event fields */}
              <div>
                <p className="mb-3 flex items-center gap-2 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#2C6E3A]">
                  <PawPrint className="h-4 w-4 text-[#4CA45D]" aria-hidden /> Tell Us About Your Event
                </p>
                <form onSubmit={handleSubmit} noValidate className="grid gap-4">
                  <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
                    <label htmlFor="mbk-company">Company (leave blank)</label>
                    <input id="mbk-company" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                  </div>

                  <Field id="mbk-name" label={<>Your Name{reqStar}</>} error={errors.name}>
                    <input id="mbk-name" type="text" autoComplete="name" placeholder="First and last name" className={fieldCls("name")} value={data.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} />
                  </Field>
                  <Field id="mbk-email" label={<>Email Address{reqStar}</>} error={errors.email}>
                    <input id="mbk-email" type="email" autoComplete="email" placeholder="name@email.com" className={fieldCls("email")} value={data.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} />
                  </Field>
                  <Field id="mbk-phone" label={<>Phone Number{reqStar}</>} error={errors.phone}>
                    <input id="mbk-phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" className={fieldCls("phone")} value={data.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} />
                  </Field>
                  <Field id="mbk-eventType" label={<>Event Type{reqStar}</>} error={errors.eventType}>
                    <select id="mbk-eventType" className={fieldCls("eventType")} value={data.eventType} onChange={(e) => set("eventType", e.target.value)} aria-invalid={!!errors.eventType}>
                      <option value="" disabled>Select event type</option>
                      {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="mbk-eventDate" label={<>Event Date{reqStar}</>} error={errors.eventDate}>
                      <input id="mbk-eventDate" type="date" className={fieldCls("eventDate")} value={data.eventDate} onChange={(e) => set("eventDate", e.target.value)} aria-invalid={!!errors.eventDate} />
                    </Field>
                    <Field id="mbk-eventTime" label={<>Event Time{reqStar}</>} error={errors.eventTime}>
                      <input id="mbk-eventTime" type="time" className={fieldCls("eventTime")} value={data.eventTime} onChange={(e) => set("eventTime", e.target.value)} aria-invalid={!!errors.eventTime} />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field id="mbk-city" label={<>Location / City{reqStar}</>} error={errors.city}>
                      <input id="mbk-city" type="text" autoComplete="address-level2" placeholder="City, State / Province" className={fieldCls("city")} value={data.city} onChange={(e) => set("city", e.target.value)} aria-invalid={!!errors.city} />
                    </Field>
                    <Field id="mbk-guests" label={<>Guest Count (Approx.){reqStar}</>} error={errors.guests}>
                      <input id="mbk-guests" type="number" min={1} inputMode="numeric" placeholder="Number of guests" className={fieldCls("guests")} value={data.guests} onChange={(e) => set("guests", e.target.value)} aria-invalid={!!errors.guests} />
                    </Field>
                  </div>
                  <Field id="mbk-notes" label="Tell Us More About Your Event">
                    <textarea id="mbk-notes" rows={3} placeholder="Share details about your event, age range, what you're looking for, and any special requests." className={fieldCls("notes")} value={data.notes} onChange={(e) => set("notes", e.target.value)} />
                  </Field>

                  {submitError ? (
                    <p role="alert" className="rounded-xl border border-[#E6588F]/40 bg-[#E6588F]/8 px-4 py-2.5 text-sm text-[#9E2A56]">
                      {submitError} You can also email us directly at info@vancouvercharacterevents.com.
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="group mt-1 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-[rgba(226,169,46,0.7)] bg-gradient-to-r from-[#4CA45D] to-[#2C6E3A] px-7 py-4 text-base font-bold text-white shadow-[0_18px_38px_-16px_rgba(20,50,24,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-16px_rgba(20,50,24,0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2A92E] disabled:cursor-not-allowed disabled:opacity-80"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending Request…
                      </>
                    ) : (
                      <>
                        Request My Mascot Visit
                        <PawPrint className="h-5 w-5 text-[#FFE6A8] transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                      </>
                    )}
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-[0.78rem] text-[#5A6B50]">
                    <Lock className="h-3.5 w-3.5 text-[#9A7445]" aria-hidden />
                    We respect your privacy. Your details are safe with us.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* bottom banner */}
        <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2.5 rounded-2xl border-2 border-[rgba(155,118,60,0.4)] bg-gradient-to-b from-[#E8D6A8] to-[#D8BE84] px-5 py-3.5 text-center shadow-[0_14px_28px_-16px_rgba(60,42,20,0.5)]">
          <PawPrint className="h-4 w-4 shrink-0 text-[#9A7445]" aria-hidden />
          <p className="font-display text-[0.98rem] font-bold leading-snug text-[#5A3F1E]">
            Let&apos;s create big smiles, fun moments, and unforgettable memories together!
          </p>
          <Flower2 className="h-4 w-4 shrink-0 text-[#E6588F]" aria-hidden />
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
      className={cn(
        "group relative flex flex-col items-center justify-start gap-1.5 rounded-2xl border-2 px-1.5 text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4CA45D]",
        big ? "py-3" : "py-2.5",
        selected
          ? "border-[#4CA45D] bg-[#EDF7DE] shadow-[0_12px_26px_-14px_rgba(20,50,24,0.45),0_0_0_3px_rgba(76,164,93,0.16)]"
          : "border-[rgba(226,169,46,0.35)] bg-white/85 hover:-translate-y-0.5 hover:border-[#4CA45D]/55 hover:shadow-[0_12px_26px_-16px_rgba(46,74,40,0.5)]",
      )}
    >
      {selected ? (
        <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-[#4CA45D] text-white shadow-[0_0_0_2px_#fff]">
          <Check className="h-2.5 w-2.5" aria-hidden />
        </span>
      ) : null}
      <span
        className={cn(
          "grid place-items-center rounded-full border-2 border-white transition-colors duration-200",
          big ? "h-9 w-9" : "h-8 w-8",
          selected ? "bg-gradient-to-br from-[#7CB85A] to-[#4CA45D] text-white" : "bg-gradient-to-br from-[#EAFBD9] to-[#BCE3A0] text-[#2C6E3A]",
        )}
      >
        <Icon className={big ? "h-5 w-5" : "h-4 w-4"} aria-hidden />
      </span>
      <span className="block text-[0.66rem] font-bold leading-tight text-[#20532C]">{option.label}</span>
    </button>
  );
}

function CharCard({
  name,
  icon: Icon,
  on,
  onToggle,
}: {
  name: string;
  icon: IconType;
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
      className={cn(
        "group relative flex w-[84px] flex-col items-center gap-1 rounded-xl border-2 p-1.5 text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4CA45D] sm:w-[88px]",
        on
          ? "border-[#4CA45D] bg-[#EDF7DE] shadow-[0_10px_22px_-12px_rgba(20,50,24,0.45),0_0_0_3px_rgba(76,164,93,0.16)]"
          : "border-[rgba(226,169,46,0.3)] bg-white/85 hover:-translate-y-0.5 hover:border-[#4CA45D]/55 hover:shadow-[0_10px_22px_-14px_rgba(46,74,40,0.5)]",
      )}
    >
      <span
        className={cn(
          "relative grid h-9 w-9 place-items-center rounded-full border-2 border-white transition-colors duration-200",
          on
            ? "bg-gradient-to-br from-[#7CB85A] to-[#4CA45D] text-white"
            : "bg-gradient-to-br from-[#EAFBD9] to-[#BCE3A0] text-[#2C6E3A]",
        )}
      >
        <Icon className="h-4 w-4" aria-hidden />
        {on ? (
          <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-[#4CA45D] text-white shadow-[0_0_0_2px_#fff]">
            <Check className="h-2.5 w-2.5" aria-hidden />
          </span>
        ) : null}
      </span>
      <span className="block w-full truncate text-[0.6rem] font-semibold leading-tight text-[#20532C]">
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
    <p id={id} className="mt-1.5 text-[0.78rem] font-medium text-[#C8356C]">
      {children}
    </p>
  );
}

/* ----------------------------------------------------------------- Success --- */

function MeadowSent({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border-2 border-[rgba(226,169,46,0.5)] bg-[rgba(255,252,242,0.95)] p-10 text-center shadow-[0_30px_64px_-34px_rgba(46,74,40,0.5)] backdrop-blur-sm">
      <span aria-hidden className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#4CA45D] to-[#E2A92E] text-white shadow-[0_16px_32px_-12px_rgba(20,50,24,0.6)]">
        <Check className="h-10 w-10" />
        <PawPrint className="absolute -right-1 -top-1 h-6 w-6 text-[#FFE6A8]" />
      </span>
      <h3 className="mt-6 font-display text-3xl font-bold text-[#20532C] md:text-4xl">
        Mascot Meadows Request Received
      </h3>
      <p className="mx-auto mt-3 max-w-lg text-[#3C5840]">
        Thank you! We&apos;ve received your Mascot Meadows details and will follow up soon with
        availability, recommendations, and the best visit format for your event.
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4CA45D] to-[#2C6E3A] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(20,50,24,0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E2A92E]"
        >
          Back to Home
        </Link>
        <button type="button" onClick={onReset} className="text-sm font-semibold text-[#2C6E3A] underline-offset-4 hover:underline">
          Send another request
        </button>
      </div>
    </div>
  );
}

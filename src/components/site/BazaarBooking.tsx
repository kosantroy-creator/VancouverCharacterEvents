import { useState, type ComponentType, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  CalendarDays,
  Camera,
  Check,
  ChevronDown,
  HelpCircle,
  Layers,
  Lightbulb,
  Loader2,
  Lock,
  Palette,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Store,
  Tent,
  Wand2,
  X,
} from "lucide-react";
import { submitInquiry } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

/**
 * BazaarBooking — final "Plan Your Enchanted Bazaar Add-Ons" desk: an accordion FAQ
 * ("Enchanted Bazaar Details") + the "Request Your Bazaar Mix" request card. The form
 * MECHANICS mirror the other realm forms exactly (same state / validation / required
 * fields, shared Resend pipeline via submitInquiry, accessible inline errors, loading +
 * success). Custom-quote framing — add-on / event-type / mix / character-pairing
 * selectors instead of fixed packages. Cream / teal / plum / gold. Partner language for
 * inflatables. Reduced-motion safe. See "ENCHANTED BAZAAR BOOKING" in styles.css.
 */
type IconType = ComponentType<{ className?: string }>;
type Option = { id: string; label: string; icon: IconType; acc: string; accDeep: string };

const TEAL = "#0F7E8C";
const TEAL_DEEP = "#0A5A66";
const PLUM = "#8E2D6E";
const CORAL = "#C8556E";

const FAQ: { q: string; a: string }[] = [
  { q: "What is the Enchanted Bazaar?", a: "The Enchanted Bazaar is our add-on marketplace for event extras like face painting, balloon twisting, photography, and inflatable partner add-ons. These services help make an event feel fuller, more colourful, more active, and more memorable." },
  { q: "Can I book just one add-on?", a: "Yes. You can request one add-on, such as face painting, balloon twisting, photography, or an inflatable partner inquiry. We'll review your event details and recommend the best fit based on timing, guest count, setup needs, and availability." },
  { q: "Can I combine multiple Bazaar add-ons?", a: "Yes. Many events work well with a mix of add-ons, such as face painting and balloon twisting, photography with a character visit, or a larger public-event add-on plan. We can help recommend the right combination." },
  { q: "Why is Bazaar pricing custom?", a: "Each add-on prices differently. Face painting, balloon twisting, photography, and inflatable partner add-ons all depend on different factors, including event length, guest count, location, setup needs, service type, and partner availability." },
  { q: "Do you own the inflatables?", a: "Inflatable add-ons may be available through trusted partner vendors where applicable. Availability, pricing, setup requirements, insurance requirements, and service terms may vary depending on the partner, event date, location, and event type." },
  { q: "Are Bazaar add-ons good for schools, malls, festivals, and public events?", a: "Yes. Bazaar add-ons can be a great fit for schools, daycares, malls, festivals, corporate family events, community celebrations, and public appearances. Larger events may require additional planning around timing, line flow, space, and partner availability." },
  { q: "How much space do add-ons need?", a: "Space needs depend on the service. Face painting and balloon twisting usually need a clear station area, photography may need photo space or backdrop consideration, and inflatable partner add-ons require more detailed space, surface, and access requirements." },
  { q: "Can Bazaar add-ons be booked with character visits?", a: "Yes. Bazaar add-ons can be paired with character visits to create a fuller event experience. For example, face painting, balloons, or photography can help keep guests engaged before, during, or after the main character moment." },
  { q: "How far in advance should I request add-ons?", a: "The earlier the better, especially for weekends, holidays, festivals, corporate events, and partner-based services. Availability can depend on performer / vendor schedules, location, event timing, and setup needs." },
  { q: "How do I request a Bazaar quote?", a: "Use the form below with your event date, city, guest count, event type, and the add-ons you are interested in. We'll review your details, check availability where needed, and recommend the best Bazaar mix." },
];

const ADDONS: Option[] = [
  { id: "Face Painting", label: "Face Painting", icon: Palette, acc: "#1E8A9E", accDeep: "#156B7A" },
  { id: "Balloon Twisting", label: "Balloon Twisting", icon: PartyPopper, acc: CORAL, accDeep: "#A23A54" },
  { id: "Photography", label: "Photography", icon: Camera, acc: "#3E6EA8", accDeep: "#2C5282" },
  { id: "Inflatable Partners", label: "Inflatable Partners", icon: Tent, acc: "#C28A2E", accDeep: "#9A6E2B" },
  { id: "Multiple Add-Ons", label: "Multiple Add-Ons", icon: Layers, acc: PLUM, accDeep: "#6E2356" },
  { id: "Not Sure Yet", label: "Not Sure Yet", icon: HelpCircle, acc: TEAL, accDeep: TEAL_DEEP },
];

const MIXES: Option[] = [
  { id: "Single Add-On", label: "Single Add-On", icon: Sparkles, acc: "#1E8A9E", accDeep: "#156B7A" },
  { id: "Multiple Add-Ons", label: "Multiple Add-Ons", icon: Layers, acc: CORAL, accDeep: "#A23A54" },
  { id: "Festival / Corporate Add-On Plan", label: "Festival / Corporate Plan", icon: Store, acc: PLUM, accDeep: "#6E2356" },
  { id: "Not Sure Yet", label: "Not Sure Yet", icon: HelpCircle, acc: TEAL, accDeep: TEAL_DEEP },
];

const EVENT_TYPES = [
  "Birthday Party",
  "School / Daycare Event",
  "Festival / Community Event",
  "Mall Appearance",
  "Corporate Event",
  "Family Fun Day",
  "Other / Custom Event",
] as const;

const PAIRING = ["Yes", "No", "Not sure yet"] as const;

type Data = {
  package: string;
  addons: string[];
  pairing: string;
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

const EMPTY: Data = { package: "", addons: [], pairing: "", name: "", email: "", phone: "", eventType: "", eventDate: "", eventTime: "", city: "", guests: "", notes: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED: { key: keyof Data; msg: string }[] = [
  { key: "package", msg: "Please choose a request type." },
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
const reqStar = <span className="text-[#C8556E]"> *</span>;

export function BazaarBooking() {
  const [open, setOpen] = useState<number | null>(0);
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
  const toggleAddon = (id: string) =>
    setData((d) => ({ ...d, addons: d.addons.includes(id) ? d.addons.filter((x) => x !== id) : [...d.addons, id] }));

  const validate = (): Partial<Record<keyof Data, string>> => {
    const e: Partial<Record<keyof Data, string>> = {};
    for (const { key, msg } of REQUIRED) if (!String(data[key]).trim()) e[key] = msg;
    if (data.email.trim() && !EMAIL_RE.test(data.email.trim())) e.email = "Please enter a valid email address.";
    return e;
  };

  const fieldCls = (key: keyof Data) =>
    cn(
      "w-full rounded-xl border bg-[#FFFCF4] px-4 py-2.5 text-base text-[#4A3A30] placeholder:text-[#B8A98E] transition-colors focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1",
      errors[key]
        ? "border-[#C8556E] focus:border-[#C8556E] focus-visible:outline-[#C8556E]"
        : "border-[#D9C8A4] focus:border-[#0F7E8C] focus-visible:outline-[#0F7E8C]",
    );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hp) return;
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      const first = REQUIRED.find(({ key }) => errs[key])?.key;
      if (first) document.getElementById(`bzk-${first}`)?.focus();
      return;
    }
    const fields: Record<string, string> = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      eventType: data.eventType,
      package: data.package,
      addons: data.addons.join(", "),
      characterPairing: data.pairing,
      date: data.eventDate,
      time: data.eventTime,
      city: data.city,
      guests: data.guests,
      notes: data.notes,
    };
    setSubmitting(true);
    setSubmitError(null);
    const res = await submitInquiry("Bazaar Events", fields);
    setSubmitting(false);
    if (res.ok) setSent(true);
    else setSubmitError(res.error || "Something went wrong. Please try again.");
  };

  return (
    <section
      id="bazaar-book"
      aria-labelledby="bzk-faq-title"
      className="bzk relative isolate scroll-mt-24 overflow-hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <span className="bzk-glow" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1080px] px-5 pb-24 pt-20 sm:px-6 md:pt-24 lg:px-8">
        {/* ===== Part 1: FAQ ===== */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="bzk-eyebrow">
            <span aria-hidden className="bzk-eyebrow-fl" />
            Before You Build Your Mix
            <span aria-hidden className="bzk-eyebrow-fl bzk-eyebrow-fl--r" />
          </span>
          <h2 id="bzk-faq-title" className="bzk-title">A few helpful details before choosing your add-ons.</h2>
          <p className="bzk-sub">
            Here are the most common questions about face painting, balloon twisting, photography,
            inflatable partners, pricing, availability, setup needs, and choosing the right Bazaar mix.
          </p>
        </div>

        <ul className="mx-auto mt-9 max-w-3xl space-y-2.5">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className={cn("bzk-faq", isOpen && "is-open")}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`bzk-faq-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="bzk-faq-q"
                  >
                    <span aria-hidden className="bzk-faq-tok">{i + 1}</span>
                    <span className="bzk-faq-qtext">{f.q}</span>
                    <ChevronDown aria-hidden className="bzk-faq-chev h-5 w-5" />
                  </button>
                </h3>
                <div id={`bzk-faq-${i}`} role="region" className="bzk-faq-panel">
                  <div className="bzk-faq-inner"><p>{f.a}</p></div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* ===== Part 2: Booking form ===== */}
        <div className="mt-16">
          {sent ? (
            <BazaarSent onReset={() => { setSent(false); setData(EMPTY); setErrors({}); }} />
          ) : (
            <div className="bzk-card relative p-5 sm:p-7 md:p-8">
              <span aria-hidden className="pointer-events-none absolute inset-[7px] rounded-[24px] border border-[rgba(193,154,60,0.45)]" />
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[3px] w-[60%] rounded-b bg-gradient-to-r from-transparent via-[#0F7E8C] to-transparent opacity-70" />

              <div className="relative text-center">
                <span className="bzk-ribbon">
                  <Sparkles className="h-3.5 w-3.5 text-[#FFE6A8]" aria-hidden />
                  Start Your Add-On Request
                </span>
              </div>

              <div className="relative mt-5 grid gap-8 lg:grid-cols-2">
                {/* LEFT — intro + selectors */}
                <div>
                  <h2 className="font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-bold leading-[1.05]">
                    <span className="text-[#0A5A66]">Request Your</span>{" "}
                    <span className="text-[#8E2D6E]">Bazaar Mix</span>
                  </h2>
                  <p className="mt-3 text-[0.96rem] leading-relaxed text-[#4A3A30]">
                    Tell us your event details and the add-ons you are interested in. We&apos;ll help
                    recommend the right mix and prepare a custom quote based on timing, guest count,
                    setup needs, location, and partner availability.
                  </p>

                  <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-[rgba(193,154,60,0.5)] bg-[#FFF6DD] px-3.5 py-3 text-[0.84rem] leading-snug text-[#6B5326]">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#C19A3C]" aria-hidden />
                    Not sure which add-ons fit? Tell us your guest count, location, schedule, and the
                    kind of energy you want — we&apos;ll recommend the best Bazaar mix.
                  </p>

                  {/* Request type (mix) */}
                  <p className="mt-6 mb-2 flex items-center gap-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#0A5A66]">
                    <CalendarDays className="h-3.5 w-3.5 text-[#C19A3C]" aria-hidden /> Choose Your Request Type{reqStar}
                  </p>
                  <div role="radiogroup" aria-label="Request type" className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {MIXES.map((o) => (
                      <ChoiceCard key={o.id} option={o} selected={data.package === o.id} onSelect={() => set("package", o.id)} />
                    ))}
                  </div>
                  {errors.package ? <FieldError id="bzk-package-err">{errors.package}</FieldError> : null}

                  {/* Add-ons (multi) */}
                  <p className="mt-5 mb-2 flex items-center gap-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#0A5A66]">
                    <Sparkles className="h-3.5 w-3.5 text-[#C19A3C]" aria-hidden /> Which Add-Ons Interest You?
                    <span className="font-semibold lowercase tracking-normal text-[#8A7A6E]">(optional)</span>
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {ADDONS.map((o) => (
                      <ChoiceCard key={o.id} option={o} selected={data.addons.includes(o.id)} onSelect={() => toggleAddon(o.id)} multi />
                    ))}
                  </div>
                  {data.addons.length ? (
                    <div className="mt-3 rounded-xl border border-[#C19A3C]/40 bg-[#FFF8EC]/80 p-3">
                      <p className="flex items-center justify-between text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-[#8E2D6E]">
                        <span className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5 text-[#C19A3C]" aria-hidden /> Your Bazaar Mix</span>
                        <span className="rounded-full bg-[#0F7E8C] px-2 py-0.5 text-white">{data.addons.length}</span>
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {data.addons.map((id) => (
                          <span key={id} className="inline-flex items-center gap-1 rounded-full border border-[#C19A3C]/40 bg-white px-2.5 py-1 text-[0.74rem] font-semibold text-[#8E2D6E]">
                            {id}
                            <button type="button" aria-label={`Remove ${id}`} onClick={() => toggleAddon(id)} className="grid h-4 w-4 place-items-center rounded-full text-[#C8556E] transition-colors hover:bg-[#C8556E] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#C8556E]">
                              <X className="h-3 w-3" aria-hidden />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {/* Character pairing */}
                  <p className="mt-5 mb-2 flex items-center gap-1.5 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#0A5A66]">
                    <Wand2 className="h-3.5 w-3.5 text-[#C19A3C]" aria-hidden /> Pairing With a Character Visit?
                    <span className="font-semibold lowercase tracking-normal text-[#8A7A6E]">(optional)</span>
                  </p>
                  <div role="radiogroup" aria-label="Pairing with a character visit" className="flex flex-wrap gap-2">
                    {PAIRING.map((p) => (
                      <button
                        key={p}
                        type="button"
                        role="radio"
                        aria-checked={data.pairing === p}
                        onClick={() => set("pairing", data.pairing === p ? "" : p)}
                        className={cn(
                          "rounded-full border-2 px-4 py-1.5 text-[0.8rem] font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F7E8C]",
                          data.pairing === p
                            ? "border-[#0F7E8C] bg-[color-mix(in_oklab,#0F7E8C_10%,#fff)] text-[#0A5A66] shadow-[0_0_0_3px_color-mix(in_oklab,#0F7E8C_18%,transparent)]"
                            : "border-[rgba(193,154,60,0.35)] bg-white/85 text-[#3A2A28] hover:-translate-y-0.5 hover:border-[#0F7E8C]/55",
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-[rgba(142,45,110,0.35)] bg-[#F7ECF3] px-3.5 py-3 text-[0.82rem] leading-snug text-[#6E2356]">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#8E2D6E]" aria-hidden />
                    Inflatable partner add-ons may be available through trusted vendors depending on date,
                    location, setup needs, and event type.
                  </p>
                </div>

                {/* RIGHT — contact + event fields */}
                <div>
                  <p className="mb-3 flex items-center gap-2 text-[0.78rem] font-extrabold uppercase tracking-[0.1em] text-[#0A5A66]">
                    <CalendarDays className="h-4 w-4 text-[#C19A3C]" aria-hidden /> Tell Us About Your Event
                  </p>
                  <form onSubmit={handleSubmit} noValidate className="grid gap-4">
                    <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
                      <label htmlFor="bzk-company">Company (leave blank)</label>
                      <input id="bzk-company" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                    </div>

                    <Field id="bzk-name" label={<>Your Name{reqStar}</>} error={errors.name}>
                      <input id="bzk-name" type="text" autoComplete="name" placeholder="First and last name" className={fieldCls("name")} value={data.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} />
                    </Field>
                    <Field id="bzk-email" label={<>Email Address{reqStar}</>} error={errors.email}>
                      <input id="bzk-email" type="email" autoComplete="email" placeholder="name@email.com" className={fieldCls("email")} value={data.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} />
                    </Field>
                    <Field id="bzk-phone" label={<>Phone Number{reqStar}</>} error={errors.phone}>
                      <input id="bzk-phone" type="tel" autoComplete="tel" placeholder="(555) 123-4567" className={fieldCls("phone")} value={data.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} />
                    </Field>
                    <Field id="bzk-eventType" label={<>Event Type{reqStar}</>} error={errors.eventType}>
                      <select id="bzk-eventType" className={fieldCls("eventType")} value={data.eventType} onChange={(e) => set("eventType", e.target.value)} aria-invalid={!!errors.eventType}>
                        <option value="" disabled>Select event type</option>
                        {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="bzk-eventDate" label={<>Event Date{reqStar}</>} error={errors.eventDate}>
                        <input id="bzk-eventDate" type="date" className={fieldCls("eventDate")} value={data.eventDate} onChange={(e) => set("eventDate", e.target.value)} aria-invalid={!!errors.eventDate} />
                      </Field>
                      <Field id="bzk-eventTime" label={<>Event Time{reqStar}</>} error={errors.eventTime}>
                        <input id="bzk-eventTime" type="time" className={fieldCls("eventTime")} value={data.eventTime} onChange={(e) => set("eventTime", e.target.value)} aria-invalid={!!errors.eventTime} />
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="bzk-city" label={<>Location / City{reqStar}</>} error={errors.city}>
                        <input id="bzk-city" type="text" autoComplete="address-level2" placeholder="City, State / Province" className={fieldCls("city")} value={data.city} onChange={(e) => set("city", e.target.value)} aria-invalid={!!errors.city} />
                      </Field>
                      <Field id="bzk-guests" label={<>Guest Count (Approx.){reqStar}</>} error={errors.guests}>
                        <input id="bzk-guests" type="number" min={1} inputMode="numeric" placeholder="Number of guests" className={fieldCls("guests")} value={data.guests} onChange={(e) => set("guests", e.target.value)} aria-invalid={!!errors.guests} />
                      </Field>
                    </div>
                    <Field id="bzk-notes" label="Tell Us More About Your Event">
                      <textarea id="bzk-notes" rows={3} placeholder="Share details about your event, setup space, timing, and anything special you have in mind." className={fieldCls("notes")} value={data.notes} onChange={(e) => set("notes", e.target.value)} />
                    </Field>

                    {submitError ? (
                      <p role="alert" className="rounded-xl border border-[#C8556E]/40 bg-[#C8556E]/8 px-4 py-2.5 text-sm text-[#A23A54]">
                        {submitError} You can also email us directly at info@vancouvercharacterevents.com.
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group mt-1 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl border-[1.5px] border-[rgba(226,194,113,0.75)] bg-gradient-to-r from-[#0F7E8C] to-[#0A5A66] px-7 py-4 text-base font-bold text-white shadow-[0_18px_38px_-16px_rgba(10,60,68,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_46px_-16px_rgba(10,60,68,0.8)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C19A3C] disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      {submitting ? (
                        <><Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending Request…</>
                      ) : (
                        <>
                          <Sparkles className="h-5 w-5 text-[#FFE6A8]" aria-hidden />
                          Request My Bazaar Quote
                          <Wand2 className="h-5 w-5 text-[#FFE6A8] transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
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
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------------- */

function ChoiceCard({ option, selected, onSelect, multi = false }: { option: Option; selected: boolean; onSelect: () => void; multi?: boolean }) {
  const Icon = option.icon;
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
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
        "group relative flex flex-col items-center justify-start gap-1.5 rounded-2xl border-2 px-1.5 py-3 text-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F7E8C]",
        selected ? "" : "border-[rgba(193,154,60,0.35)] bg-white/85 hover:-translate-y-0.5 hover:border-[#0F7E8C]/55 hover:shadow-[0_12px_26px_-16px_rgba(74,42,20,0.4)]",
      )}
    >
      {selected ? (
        <span style={{ background: option.acc }} className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full text-white shadow-[0_0_0_2px_#fff]">
          <Check className="h-2.5 w-2.5" aria-hidden />
        </span>
      ) : null}
      <span
        style={selected ? { background: `linear-gradient(135deg, ${option.acc}, ${option.accDeep})`, color: "#fff" } : undefined}
        className={cn("grid h-9 w-9 place-items-center rounded-full border-2 border-white transition-colors duration-200", selected ? "" : "bg-gradient-to-br from-[#FBEFD2] to-[#F3E2B6] text-[#9A6E2B]")}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="block text-[0.64rem] font-bold leading-tight text-[#3A2A28]">{option.label}</span>
    </button>
  );
}

function Field({ id, label, error, children }: { id: string; label: ReactNode; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className={labelCls} htmlFor={id}>{label}</label>
      {children}
      {error ? <FieldError id={`${id}-err`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return <p id={id} className="mt-1.5 text-[0.78rem] font-medium text-[#C8556E]">{children}</p>;
}

function BazaarSent({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border-2 border-[rgba(193,154,60,0.5)] bg-[rgba(255,253,247,0.96)] p-10 text-center shadow-[0_30px_64px_-34px_rgba(74,42,20,0.45)] backdrop-blur-sm">
      <span aria-hidden className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#0F7E8C] to-[#C19A3C] text-white shadow-[0_16px_32px_-12px_rgba(10,60,68,0.6)]">
        <Check className="h-10 w-10" />
        <Sparkles className="absolute -right-1 -top-1 h-6 w-6 text-[#FFE6A8]" />
      </span>
      <h3 className="mt-6 font-display text-3xl font-bold text-[#8E2D6E] md:text-4xl">Bazaar Request Received</h3>
      <p className="mx-auto mt-3 max-w-lg text-[#4A3A30]">
        Thank you! We&apos;ve received your Enchanted Bazaar details and will follow up soon with
        availability, recommendations, and a custom quote for your event add-ons.
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0F7E8C] to-[#0A5A66] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_30px_-12px_rgba(10,60,68,0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C19A3C]">
          Back to Home
        </Link>
        <button type="button" onClick={onReset} className="text-sm font-semibold text-[#0A5A66] underline-offset-4 hover:underline">Send another request</button>
      </div>
    </div>
  );
}

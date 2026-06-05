import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { chapters, eventTypes } from "@/lib/site-data";
import { CTAButton } from "./CTAButton";

const fieldClass =
  "w-full rounded-[var(--radius-md)] border border-border-strong bg-cream-50 px-4 py-2.5 text-base text-fg placeholder:text-fg-3/70 transition-colors focus:border-gold-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-gold-500";
const labelClass = "mb-1.5 block text-sm font-semibold text-fg";

export function BookingForm({ defaultInterest }: { defaultInterest?: string }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-[var(--radius-xl)] border border-gold-500/40 bg-cream-100 p-10 text-center shadow-[var(--shadow-md)]">
        <CheckCircle2 className="h-12 w-12 text-[var(--success)]" />
        <h3 className="mt-4 font-display text-3xl text-fg">Your request is on its way</h3>
        <p className="mt-3 max-w-md text-fg-2">
          Thank you — we've received your booking request. Our team will be in touch shortly to help match your event
          with the perfect chapter. Keep an eye on your inbox.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-fg-gold underline-offset-4 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-xl)] border border-gold-500/30 bg-cream-100 p-6 shadow-[var(--shadow-md)] sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} placeholder="Your full name" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} placeholder="you@example.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Phone number</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} placeholder="(604) 000-0000" />
        </div>
        <div>
          <label className={labelClass} htmlFor="eventType">Event type</label>
          <select id="eventType" name="eventType" className={fieldClass} defaultValue="">
            <option value="" disabled>Select event type</option>
            {eventTypes.map((e) => (
              <option key={e.title} value={e.title}>{e.title}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="date">Event date</label>
          <input id="date" name="date" type="date" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="time">Event time</label>
          <input id="time" name="time" type="time" className={fieldClass} />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="address">Event address</label>
          <input id="address" name="address" type="text" autoComplete="street-address" className={fieldClass} placeholder="Venue or street address, city" />
        </div>
        <div>
          <label className={labelClass} htmlFor="eventName">Event name <span className="font-normal text-fg-3">(if applicable)</span></label>
          <input id="eventName" name="eventName" type="text" className={fieldClass} placeholder="e.g. Summer Festival" />
        </div>
        <div>
          <label className={labelClass} htmlFor="childName">Child's name</label>
          <input id="childName" name="childName" type="text" className={fieldClass} placeholder="If it's a birthday" />
        </div>
        <div>
          <label className={labelClass} htmlFor="interest">Character(s) wanted</label>
          <select id="interest" name="interest" className={fieldClass} defaultValue={defaultInterest ?? ""}>
            <option value="" disabled>Select a character</option>
            {characterOptions.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </optgroup>
            ))}
            <option value="multiple">Multiple characters</option>
            <option value="not-sure">Not sure yet — help me choose</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="package">Package</label>
          <select id="package" name="package" className={fieldClass} defaultValue="">
            <option value="" disabled>Select a package</option>
            <option value="60-minute">60 minute package</option>
            <option value="90-minute">90 minute package</option>
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="guests">Guest count</label>
          <input id="guests" name="guests" type="number" min={1} className={fieldClass} placeholder="e.g. 20" />
        </div>
      </div>


      <div className="mt-5">
        <label className={labelClass} htmlFor="message">Message / details</label>
        <textarea id="message" name="message" rows={4} className={fieldClass} placeholder="Tell us about your event, venue, timing, and anything special you have in mind." />
      </div>

      <div className="mt-7">
        <CTAButton type="submit" size="lg" className="w-full sm:w-auto">
          Start My Booking Request
        </CTAButton>
      </div>
    </form>
  );
}

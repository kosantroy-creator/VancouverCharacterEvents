import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { Check, Send, Sparkles, Stamp, X } from "lucide-react";
import type { Adventure } from "@/lib/adventures";
import { cn } from "@/lib/utils";

/**
 * InvitationModal — the interest-collection "letter".
 *
 * Instead of a contact form, requesting an invitation feels like sending a
 * sealed letter: a parchment card themed to the chosen adventure (or the whole
 * programme, when opened from the hero), a wax seal that presses in, and a
 * "stamped & sent" confirmation. Front-end only — no endpoint, no payment (per
 * the site's standing rule); it captures interest and shows a warm confirmation.
 * The letter/seal choreography lives in styles.css "CHARACTER ADVENTURES".
 */

type Vars = CSSProperties & Record<string, string>;

const PROGRAM_THEME = {
  accent: "#C9A24B",
  deep: "#23305C",
  glow: "#F2E2B0",
  field: "linear-gradient(160deg, #FFFBF0 0%, #F6ECCF 55%, #EAE6D8 100%)",
  seal: "#A8842F",
};

const CHILD_COUNTS = ["1", "2", "3", "4", "5", "6+"] as const;
const AGE_RANGES = ["Under 3", "3–5 years", "6–8 years", "9–12 years", "Mixed ages"] as const;

type FormData = {
  parentName: string;
  email: string;
  phone: string;
  children: string;
  ageRange: string;
};

const EMPTY: FormData = { parentName: "", email: "", phone: "", children: "", ageRange: "" };

export function InvitationModal({
  open,
  adventure,
  onClose,
}: {
  open: boolean;
  /** null = whole-programme interest list (opened from the hero) */
  adventure: Adventure | null;
  onClose: () => void;
}) {
  const [data, setData] = useState<FormData>(EMPTY);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hp, setHp] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = "inv-title";

  const theme = adventure?.theme ?? PROGRAM_THEME;
  const Icon = adventure?.icon ?? Sparkles;
  const heading = adventure ? "Request an Invitation" : "Join the Interest List";
  const subject = adventure ? adventure.name : "Character Adventures";

  // Reset to a blank letter each time the modal opens.
  useEffect(() => {
    if (!open) return;
    setData(EMPTY);
    setSent(false);
    setSubmitting(false);
    setHp("");
    const id = window.setTimeout(() => firstFieldRef.current?.focus(), 80);
    return () => window.clearTimeout(id);
  }, [open, adventure]);

  // Lock background scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const valid =
    data.parentName.trim() &&
    data.email.trim() &&
    data.phone.trim() &&
    data.children &&
    data.ageRange;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hp || !valid) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 800);
  };

  const labelCls = "mb-1.5 block text-[0.82rem] font-semibold";
  const fieldCls =
    "w-full rounded-[var(--radius-md)] border bg-white/70 px-4 py-2.5 text-base text-ink-800 placeholder:text-ink-800/35 transition-colors focus:bg-white focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1";

  return (
    <div
      className="inv-overlay fixed inset-0 z-[140] flex items-center justify-center overflow-y-auto bg-ink-900/60 p-4 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="inv-letter relative my-auto w-full max-w-lg overflow-hidden rounded-[var(--radius-xl)] border shadow-[0_40px_90px_-30px_rgba(8,17,31,0.7)]"
        style={
          {
            "--adv-accent": theme.accent,
            "--adv-deep": theme.deep,
            "--adv-seal": theme.seal,
            background: theme.field,
            borderColor: `color-mix(in oklab, ${theme.accent} 55%, transparent)`,
          } as Vars
        }
      >
        {/* paper grain + a soft accent wash */}
        <div aria-hidden className="tx-paper pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(120% 80% at 50% -10%, ${theme.glow}66 0%, transparent 60%)`,
          }}
        />
        {/* deckled accent edge */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
          }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/70 text-ink-800/70 transition-colors hover:bg-white hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: theme.accent }}
        >
          <X className="h-4 w-4" aria-hidden />
        </button>

        {sent ? (
          <InvitationSent theme={theme} subject={subject} Icon={Icon} onClose={onClose} />
        ) : (
          <div className="relative px-6 pb-7 pt-8 sm:px-9">
            {/* Wax seal + letterhead */}
            <div className="flex flex-col items-center text-center">
              <span
                className="inv-seal grid h-16 w-16 place-items-center rounded-full text-white shadow-[inset_0_2px_6px_rgba(255,255,255,0.4),0_10px_22px_-8px_rgba(8,17,31,0.6)]"
                style={{
                  background: `radial-gradient(circle at 38% 32%, color-mix(in oklab, ${theme.seal} 60%, #fff) 0%, ${theme.seal} 46%, color-mix(in oklab, ${theme.seal} 70%, #000) 100%)`,
                }}
                aria-hidden
              >
                <Icon className="h-7 w-7" aria-hidden />
              </span>
              <p
                className="t-engrave mt-4 text-[0.6rem] tracking-[0.3em]"
                style={{ color: theme.deep }}
              >
                {adventure ? adventure.month : "A Year of Adventures"}
              </p>
              <h2
                id={titleId}
                className="t-display mt-1 text-2xl font-bold leading-tight sm:text-3xl"
                style={{ color: theme.deep }}
              >
                {heading}
              </h2>
              <p className="mt-1 text-sm font-semibold" style={{ color: theme.accent }}>
                {subject}
              </p>
              <p className="mt-2 max-w-sm text-[0.86rem] leading-relaxed text-ink-800/75">
                Leave your details and we&apos;ll send word the moment tickets open — no payment
                today, just first dibs on the adventure.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-6">
              {/* honeypot */}
              <div
                aria-hidden
                className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
              >
                <label htmlFor="inv-company">Company (leave blank)</label>
                <input
                  id="inv-company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </div>

              <div className="grid gap-4">
                <div>
                  <label className={labelCls} htmlFor="inv-parent" style={{ color: theme.deep }}>
                    Parent Name
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="inv-parent"
                    type="text"
                    autoComplete="name"
                    className={fieldCls}
                    style={{ borderColor: `${theme.accent}66`, outlineColor: theme.accent }}
                    placeholder="Your full name"
                    value={data.parentName}
                    onChange={(e) => set("parentName", e.target.value)}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls} htmlFor="inv-email" style={{ color: theme.deep }}>
                      Email
                    </label>
                    <input
                      id="inv-email"
                      type="email"
                      autoComplete="email"
                      className={fieldCls}
                      style={{ borderColor: `${theme.accent}66`, outlineColor: theme.accent }}
                      placeholder="you@example.com"
                      value={data.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="inv-phone" style={{ color: theme.deep }}>
                      Phone Number
                    </label>
                    <input
                      id="inv-phone"
                      type="tel"
                      autoComplete="tel"
                      className={fieldCls}
                      style={{ borderColor: `${theme.accent}66`, outlineColor: theme.accent }}
                      placeholder="(604) 123-4567"
                      value={data.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      className={labelCls}
                      htmlFor="inv-children"
                      style={{ color: theme.deep }}
                    >
                      Number of Children
                    </label>
                    <select
                      id="inv-children"
                      className={fieldCls}
                      style={{ borderColor: `${theme.accent}66`, outlineColor: theme.accent }}
                      value={data.children}
                      onChange={(e) => set("children", e.target.value)}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {CHILD_COUNTS.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls} htmlFor="inv-age" style={{ color: theme.deep }}>
                      Child Age Range
                    </label>
                    <select
                      id="inv-age"
                      className={fieldCls}
                      style={{ borderColor: `${theme.accent}66`, outlineColor: theme.accent }}
                      value={data.ageRange}
                      onChange={(e) => set("ageRange", e.target.value)}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {AGE_RANGES.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!valid || submitting}
                className="btn-magic mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_34px_-14px_rgba(8,17,31,0.6)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-55"
                style={{
                  background: `linear-gradient(120deg, ${theme.accent}, ${theme.deep})`,
                  outlineColor: theme.accent,
                }}
              >
                {submitting ? (
                  <>
                    <Stamp className="h-4 w-4 animate-pulse" aria-hidden /> Sealing…
                  </>
                ) : (
                  <>
                    Send My Invitation Request <Send className="h-4 w-4" aria-hidden />
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-[0.72rem] text-ink-800/55">
                We&apos;ll only use this to tell you when {subject} tickets open.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function InvitationSent({
  theme,
  subject,
  Icon,
  onClose,
}: {
  theme: typeof PROGRAM_THEME;
  subject: string;
  Icon: Adventure["icon"];
  onClose: () => void;
}) {
  return (
    <div className="relative px-6 py-12 text-center sm:px-10">
      <span
        className="inv-stamp relative mx-auto grid h-24 w-24 place-items-center rounded-full text-white shadow-[inset_0_2px_8px_rgba(255,255,255,0.4),0_16px_34px_-12px_rgba(8,17,31,0.65)]"
        style={{
          background: `radial-gradient(circle at 38% 32%, color-mix(in oklab, ${theme.seal} 60%, #fff) 0%, ${theme.seal} 46%, color-mix(in oklab, ${theme.seal} 72%, #000) 100%)`,
        }}
        aria-hidden
      >
        <Icon className="h-10 w-10" aria-hidden />
        <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-white text-[var(--success)] shadow-[var(--shadow-sm)]">
          <Check className="h-4 w-4" aria-hidden />
        </span>
      </span>
      <h2 className="inv-rise t-display mt-6 text-3xl font-bold" style={{ color: theme.deep }}>
        Your Request Is Sealed
      </h2>
      <p className="inv-rise mx-auto mt-3 max-w-sm text-[0.92rem] leading-relaxed text-ink-800/75">
        Your invitation request for <strong>{subject}</strong> is on its way. We&apos;ll reach out
        the moment tickets open so your family is first in line.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="btn-magic mt-7 inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-7 py-3 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          background: `linear-gradient(120deg, ${theme.accent}, ${theme.deep})`,
          outlineColor: theme.accent,
        }}
      >
        Back to the Adventures
      </button>
    </div>
  );
}

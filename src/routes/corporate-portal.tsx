import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/corporate-portal")({
  head: () => ({
    meta: [
      { title: "Corporate Portal | Vancouver Character Events" },
      {
        name: "description",
        content:
          "Secure portal for Vancouver Character Events corporate and agency clients. Sign in to manage bookings, programs, and event logistics.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Corporate Portal | Vancouver Character Events" },
      { property: "og:url", content: "/corporate-portal" },
    ],
    links: [{ rel: "canonical", href: "/corporate-portal" }],
  }),
  component: CorporatePortalPage,
});

function CorporatePortalPage() {
  const [notice, setNotice] = useState(false);

  return (
    <section className="navy-section relative isolate flex min-h-[calc(100vh-68px)] items-center overflow-hidden">
      <div aria-hidden className="tx-stars absolute inset-0" style={{ opacity: 0.3 }} />
      <div aria-hidden className="tx-grain absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-md px-5 py-16 sm:px-6">
        <div className="text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/40 bg-ink-900/50">
            <Lock className="h-6 w-6 text-gold-400" aria-hidden />
          </span>
          <p className="t-eyebrow mt-5 text-gold-400">Corporate Portal</p>
          <h1 className="t-display mt-2 text-3xl text-star-white md:text-4xl">Client sign in</h1>
          <p className="mt-3 text-sm leading-relaxed text-fg-on-ink/75">
            For corporate, agency, and recurring-program clients. Manage bookings, schedules, and
            event logistics in one place.
          </p>
        </div>

        <form
          className="mt-8 space-y-4 rounded-[var(--radius-xl)] border border-ink-600/60 bg-ink-900/55 p-6 shadow-[var(--shadow-ink)] backdrop-blur-md"
          onSubmit={(e) => {
            e.preventDefault();
            setNotice(true);
          }}
        >
          <label className="block">
            <span className="t-engrave text-[0.62rem] tracking-[0.18em] text-fg-on-ink/70">
              Work email
            </span>
            <div className="mt-1.5 flex items-center gap-2 rounded-[var(--radius-md)] border border-ink-600/70 bg-ink-900/60 px-3 py-2.5 focus-within:border-gold-500/70">
              <Mail className="h-4 w-4 shrink-0 text-fg-on-ink/50" aria-hidden />
              <input
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                className="w-full bg-transparent text-sm text-star-white placeholder:text-fg-on-ink/40 focus:outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="t-engrave text-[0.62rem] tracking-[0.18em] text-fg-on-ink/70">
              Password
            </span>
            <div className="mt-1.5 flex items-center gap-2 rounded-[var(--radius-md)] border border-ink-600/70 bg-ink-900/60 px-3 py-2.5 focus-within:border-gold-500/70">
              <Lock className="h-4 w-4 shrink-0 text-fg-on-ink/50" aria-hidden />
              <input
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full bg-transparent text-sm text-star-white placeholder:text-fg-on-ink/40 focus:outline-none"
              />
            </div>
          </label>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-pill)] bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-900 transition-all duration-200 hover:bg-gold-400 hover:shadow-[var(--glow-gold)]"
          >
            Sign in <ArrowRight className="h-4 w-4" aria-hidden />
          </button>

          {notice ? (
            <p
              role="status"
              className="rounded-[var(--radius-md)] border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-center text-xs leading-relaxed text-gold-200"
            >
              The corporate portal isn't live yet. Existing clients — please reach your account
              manager at{" "}
              <a href="mailto:hello@vancouvercharacterevents.ca" className="underline">
                hello@vancouvercharacterevents.ca
              </a>
              .
            </p>
          ) : null}
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-fg-on-ink/55">
          <ShieldCheck className="h-3.5 w-3.5 text-gold-500/80" aria-hidden />
          Placeholder portal — secure login coming soon.
        </div>

        <div className="mt-5 text-center text-sm">
          <Link to="/contact" className="text-gold-300 transition-colors hover:text-gold-200">
            New corporate client? Start an inquiry →
          </Link>
        </div>
      </div>
    </section>
  );
}

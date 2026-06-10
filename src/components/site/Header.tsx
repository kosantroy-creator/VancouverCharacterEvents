import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Lock } from "lucide-react";
import logo from "@/assets/brand/logo-primary.png";
import { characterWorlds } from "@/lib/site-data";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

/** Trailing simple links (Our Team, Characters, Pricing, Event Types are rendered explicitly). */
const navLinks = [
  { label: "Gallery", to: "/gallery" as const },
  { label: "Blog", to: "/blog" as const },
  { label: "Contact Us", to: "/contact" as const },
];

const linkClass =
  "nav-link rounded-md px-2.5 py-2 text-[0.82rem] font-medium leading-none text-fg-on-ink/85 transition-colors hover:text-gold-300";

const tileStyle = (accent: string) => ({ ["--tile"]: `var(--chapter-${accent})` }) as CSSProperties;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [charsOpen, setCharsOpen] = useState(false);
  const charsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes mobile menu + characters mega-menu.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setCharsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openChars = () => {
    window.clearTimeout(closeTimer.current);
    setCharsOpen(true);
  };
  const closeCharsSoon = () => {
    closeTimer.current = window.setTimeout(() => setCharsOpen(false), 140);
  };
  // Keyboard: close when focus leaves the Characters group entirely.
  const onCharsBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!charsRef.current?.contains(e.relatedTarget as Node)) setCharsOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ink-900/92 shadow-[0_8px_30px_-12px_rgba(8,17,31,0.6)] backdrop-blur-md"
          : "bg-ink-900/80 backdrop-blur-sm",
      )}
    >
      <div className="relative mx-auto flex h-[68px] w-full max-w-[1360px] items-center justify-between gap-2 px-5 sm:px-6 lg:px-8">
        {/* Brand — left on desktop, centered & prominent on mobile/tablet */}
        <Link
          to="/"
          aria-label="Vancouver Character Events — home"
          className="group flex shrink-0 items-center gap-2.5 max-[1139px]:absolute max-[1139px]:left-1/2 max-[1139px]:-translate-x-1/2"
          onClick={() => setOpen(false)}
        >
          <img
            src={logo}
            alt=""
            aria-hidden
            className="h-11 w-11 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            width={44}
            height={44}
          />
          <span className="flex flex-col whitespace-nowrap leading-tight">
            <span className="t-engrave text-[1rem] leading-none text-gold-400">Vancouver</span>
            <span className="t-engrave mt-0.5 text-[0.64rem] tracking-[0.26em] text-fg-on-ink/75">
              Character Events
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 min-[1140px]:flex" aria-label="Primary">
          <Link
            to="/our-team"
            className={linkClass}
            activeProps={{ className: "is-active text-gold-300" }}
          >
            Our Team
          </Link>

          {/* Characters — premium mega-menu */}
          <div
            ref={charsRef}
            className="relative"
            onMouseEnter={openChars}
            onMouseLeave={closeCharsSoon}
            onFocus={openChars}
            onBlur={onCharsBlur}
          >
            <button
              type="button"
              className={cn(linkClass, "inline-flex items-center gap-1")}
              aria-haspopup="true"
              aria-expanded={charsOpen}
              onClick={() => setCharsOpen((v) => !v)}
            >
              Characters
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform", charsOpen && "rotate-180")}
                aria-hidden
              />
            </button>

            <div
              className={cn(
                "absolute left-0 top-full z-50 w-[min(680px,calc(100vw-2rem))] pt-3 transition-all duration-200",
                charsOpen
                  ? "visible opacity-100"
                  : "pointer-events-none invisible -translate-y-1 opacity-0",
              )}
            >
              <div className="overflow-hidden rounded-[var(--radius-xl)] border border-border-soft bg-surface p-4 shadow-[var(--shadow-lg)]">
                <p className="t-engrave px-2 pb-2 text-[0.6rem] tracking-[0.22em] text-fg-gold">
                  Choose a character world
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {characterWorlds.map((w) => (
                    <Link
                      key={w.slug}
                      to={w.exploreTo}
                      onClick={() => setCharsOpen(false)}
                      className="world-tile group flex items-start gap-3 rounded-[var(--radius-lg)] bg-surface p-2.5"
                      style={tileStyle(w.accent)}
                    >
                      <img
                        src={w.medallion}
                        alt=""
                        aria-hidden
                        className="h-10 w-10 shrink-0 rounded-full bg-warm-white object-contain p-0.5"
                        width={40}
                        height={40}
                      />
                      <span className="flex flex-col">
                        <span className="text-sm font-semibold text-fg">{w.name}</span>
                        <span className="mt-0.5 text-[0.72rem] leading-snug text-fg-3">
                          {w.sampleCharacters.slice(0, 3).join(" · ")}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-border-soft pt-3">
                  <span className="pl-2 text-xs text-fg-3">Not sure which world?</span>
                  <Link
                    to="/contact"
                    onClick={() => setCharsOpen(false)}
                    className="rounded-[var(--radius-pill)] bg-ink-800 px-4 py-2 text-xs font-semibold text-fg-on-ink transition-colors hover:bg-ink-700"
                  >
                    Tell us about your event
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Link
            to="/pricing"
            className={linkClass}
            activeProps={{ className: "is-active text-gold-300" }}
          >
            Pricing
          </Link>
          <Link to="/" hash="find-your-event" className={linkClass}>
            Event Types
          </Link>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={linkClass}
              activeProps={{ className: "is-active text-gold-300" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 min-[1140px]:flex">
          <Link
            to="/corporate-portal"
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-gold-500/35 px-3.5 py-2 text-[0.78rem] font-medium text-fg-on-ink/80 transition-colors hover:border-gold-400 hover:text-gold-300"
            activeProps={{ className: "text-gold-300 border-gold-400" }}
          >
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Corporate Portal
          </Link>
          <CTAButton to="/contact" size="md" className="cta-pulse">
            Book Now
          </CTAButton>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-md text-fg-on-ink transition-colors hover:text-gold-400 min-[1140px]:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "ink-section overflow-hidden border-t border-ink-600/50 transition-all duration-300 ease-[var(--ease-out)] min-[1140px]:hidden",
          open
            ? "max-h-[88vh] overflow-y-auto opacity-100"
            : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          <p className="t-engrave px-3 pb-1 pt-2 text-[0.6rem] tracking-[0.24em] text-gold-400/80">
            Characters
          </p>
          {characterWorlds.map((w) => (
            <Link
              key={w.slug}
              to={w.exploreTo}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-fg-on-ink/85 transition-colors hover:bg-ink-700 hover:text-gold-400"
            >
              <img
                src={w.medallion}
                alt=""
                aria-hidden
                className="h-8 w-8 shrink-0 rounded-full bg-ink-800/60 object-contain p-0.5"
                width={32}
                height={32}
              />
              <span className="flex flex-col">
                <span className="text-base font-medium leading-tight">{w.name}</span>
                <span className="text-[0.7rem] text-fg-on-ink/55">
                  {w.sampleCharacters.slice(0, 3).join(" · ")}
                </span>
              </span>
            </Link>
          ))}

          <p className="t-engrave px-3 pb-1 pt-4 text-[0.6rem] tracking-[0.24em] text-gold-400/80">
            Explore
          </p>
          {[
            { label: "Our Team", to: "/our-team" as const },
            { label: "Pricing", to: "/pricing" as const },
            { label: "Event Types", to: "/" as const, hash: "find-your-event" },
            { label: "Gallery", to: "/gallery" as const },
            { label: "Blog", to: "/blog" as const },
            { label: "Contact Us", to: "/contact" as const },
            { label: "Corporate Portal", to: "/corporate-portal" as const },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-base font-medium text-fg-on-ink/85 transition-colors hover:bg-ink-700 hover:text-gold-400"
              activeProps={{ className: "text-gold-400" }}
            >
              {item.label}
            </Link>
          ))}
          <CTAButton to="/contact" size="lg" className="mt-3 w-full">
            Book Now
          </CTAButton>
        </nav>
      </div>
    </header>
  );
}

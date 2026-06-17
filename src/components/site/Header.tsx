import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Lock, Crown, Shield, Star } from "lucide-react";
import logo from "@/assets/brand/logo-primary.png";
import { characterWorlds } from "@/lib/site-data";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";
import { useCinema } from "@/lib/cinema";

/** Trailing simple links (Our Team, Characters, Pricing are rendered explicitly). */
const navLinks = [
  { label: "Blog", to: "/blog" as const },
  { label: "Contact Us", to: "/contact" as const },
];

const baseLinkClass =
  "nav-link whitespace-nowrap rounded-md px-2.5 py-2 text-[0.82rem] font-medium leading-none transition-colors";

const tileStyle = (accent: string) => ({ ["--tile"]: `var(--chapter-${accent})` }) as CSSProperties;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [charsOpen, setCharsOpen] = useState(false);
  const charsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>(0);

  // World co-branding — the Princess Kingdom gets a navy × pink header.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const royal = pathname.startsWith("/princess-events");
  // Hero Headquarters keeps the standard header but books on-page (#book).
  const hero = pathname.startsWith("/hero-events");
  // Cinema mode (hero "Watch Us In Action" reel) glides the header out of view.
  const { isCinema } = useCinema();

  const linkClass = cn(
    baseLinkClass,
    royal
      ? "text-ink-800/85 hover:text-[var(--pp-magenta-deep)]"
      : hero
        ? "text-[var(--hero-navy)]/85 hover:text-[var(--hero-red-deep)]"
        : "text-fg-on-ink/85 hover:text-gold-300",
  );
  const activeLink = royal
    ? "is-active text-[var(--pp-magenta-deep)]"
    : hero
      ? "is-active text-[var(--hero-red-deep)]"
      : "is-active text-gold-300";

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
        "sticky top-0 z-50 transition-all duration-500 ease-[var(--ease-out)]",
        royal
          ? scrolled
            ? "shadow-[0_8px_30px_-14px_rgba(162,27,97,0.45)]"
            : ""
          : hero
            ? scrolled
              ? "shadow-[0_10px_30px_-14px_rgba(36,66,104,0.35)] backdrop-blur-md"
              : "backdrop-blur-sm"
            : scrolled
              ? "bg-ink-900/92 shadow-[0_8px_30px_-12px_rgba(8,17,31,0.6)] backdrop-blur-md"
              : "bg-ink-900/80 backdrop-blur-sm",
        isCinema && "pointer-events-none -translate-y-full opacity-0",
      )}
      style={
        royal
          ? { background: "var(--pp-header-pink)" }
          : hero
            ? { background: scrolled ? "rgba(220,238,255,0.96)" : "rgba(220,238,255,0.82)" }
            : undefined
      }
    >
      {royal ? <span aria-hidden className="pp-hairline absolute inset-x-0 top-0" /> : null}
      {hero ? (
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--hero-red) 28%, var(--hero-gold) 50%, var(--hero-blue) 72%, transparent)",
          }}
        />
      ) : null}
      <div className="relative mx-auto flex h-[68px] w-full max-w-[1360px] items-center justify-between gap-2 px-5 sm:px-6 lg:px-8">
        {/* Left cluster — brand + co-brand seam lockup kept snug together as a
            single unit so justify-between only separates this group from the nav
            and CTAs (not the brand from the lockup). The cluster spans the full
            bar height so the brand's h-full navy panel reaches top and bottom. */}
        <div className="flex h-full min-w-0 items-center">
          {/* Brand — left on desktop, centered & prominent on mobile/tablet.
            On royal pages the mothership brand sits in its own navy block. */}
          <Link
            to="/"
            aria-label="Vancouver Character Events — home"
            className={cn(
              "group flex shrink-0 items-center gap-2.5 max-[1139px]:absolute max-[1139px]:left-1/2 max-[1139px]:-translate-x-1/2",
              (royal || hero) &&
                "h-[52px] rounded-[var(--radius-pill)] border border-gold-500/45 px-4 min-[1140px]:h-full min-[1140px]:rounded-none min-[1140px]:rounded-r-[26px] min-[1140px]:border-0 min-[1140px]:-ml-5 min-[1140px]:pl-5 min-[1140px]:pr-6 sm:min-[1140px]:-ml-6 sm:min-[1140px]:pl-6 lg:min-[1140px]:-ml-8 lg:min-[1140px]:pl-8",
            )}
            style={royal || hero ? { background: "var(--grad-navy-panel)" } : undefined}
            onClick={() => setOpen(false)}
          >
            <img
              src={logo}
              alt=""
              aria-hidden
              className="h-11 w-11 rounded-full object-cover transition-transform duration-300 group-hover:scale-105 max-[1139px]:h-9 max-[1139px]:w-9"
              width={44}
              height={44}
            />
            <span className="flex flex-col whitespace-nowrap leading-tight">
              <span className="t-engrave text-[1rem] leading-none text-gold-400 max-[1139px]:text-[0.85rem]">
                Vancouver
              </span>
              <span className="t-engrave mt-0.5 text-[0.64rem] tracking-[0.26em] text-fg-on-ink/75 max-[1139px]:text-[0.55rem] max-[1139px]:tracking-[0.16em]">
                Character Events
              </span>
            </span>
          </Link>

          {/* Royal seam ✕ + Princess lockup (wide desktop only) */}
          {royal ? (
            <>
              <span
                aria-hidden
                className="z-10 -ml-6 hidden h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-500/60 bg-ink-900 text-[0.6rem] font-bold text-gold-400 min-[1180px]:flex"
              >
                ✕
              </span>
              <Link
                to="/princess-events"
                className="ml-2.5 hidden shrink-0 flex-col items-center leading-none transition-transform hover:scale-[1.03] min-[1180px]:flex"
                aria-label="Vancouver Princess Events"
              >
                <span className="inline-flex items-center gap-1">
                  <Crown className="h-3 w-3 text-gold-600" aria-hidden />
                  <span className="t-engrave text-[0.6rem] tracking-[0.2em] text-[var(--pp-magenta-deep)]">
                    Vancouver
                  </span>
                </span>
                <span className="t-script mt-0.5 text-[1.45rem] text-[var(--pp-magenta)]">
                  Princess
                </span>
                <span className="t-engrave mt-0.5 text-[0.5rem] tracking-[0.32em] text-ink-700/80">
                  ✦ Events ✦
                </span>
              </Link>
            </>
          ) : null}

          {/* Hero seam ✕ + Vancouver Hero Events lockup (wide desktop only) */}
          {hero ? (
            <>
              <span
                aria-hidden
                className="z-10 -ml-6 hidden h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--hero-gold)]/60 bg-[var(--hero-navy)] text-[0.6rem] font-bold text-[var(--hero-gold)] min-[1180px]:flex"
              >
                ✕
              </span>
              <Link
                to="/hero-events"
                className="ml-2.5 hidden shrink-0 flex-col items-center leading-none transition-transform hover:scale-[1.03] min-[1180px]:flex"
                aria-label="Vancouver Hero Events"
              >
                <span className="inline-flex items-center gap-1">
                  <Shield className="h-3 w-3 text-[var(--hero-red)]" aria-hidden />
                  <span className="t-engrave text-[0.6rem] tracking-[0.2em] text-[var(--hero-navy)]">
                    Vancouver
                  </span>
                </span>
                <span className="t-script-hero mt-0.5 text-[1.5rem] leading-none text-[var(--hero-red)]">
                  Hero
                </span>
                <span className="t-engrave mt-1 inline-flex items-center gap-1.5 text-[0.5rem] tracking-[0.32em] text-[var(--hero-navy)]/85">
                  <Star
                    className="h-2 w-2 fill-[var(--hero-red)] text-[var(--hero-red)]"
                    aria-hidden
                  />
                  Events
                  <Star
                    className="h-2 w-2 fill-[var(--hero-red)] text-[var(--hero-red)]"
                    aria-hidden
                  />
                </span>
              </Link>
            </>
          ) : null}
        </div>

        <nav className="hidden items-center gap-0.5 min-[1140px]:flex" aria-label="Primary">
          <Link to="/our-team" className={linkClass} activeProps={{ className: activeLink }}>
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

          <Link to="/pricing" className={linkClass} activeProps={{ className: activeLink }}>
            Pricing
          </Link>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={linkClass}
              activeProps={{ className: activeLink }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 min-[1140px]:flex">
          <Link
            to="/corporate-portal"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-3.5 py-2 text-[0.78rem] font-medium transition-colors",
              royal
                ? "border-ink-800/35 bg-white/40 text-ink-800/90 hover:border-[var(--pp-magenta)] hover:text-[var(--pp-magenta-deep)]"
                : hero
                  ? "border-[var(--hero-navy)]/30 bg-white/55 text-[var(--hero-navy)]/90 hover:border-[var(--hero-blue)] hover:text-[var(--hero-blue-deep)]"
                  : "border-gold-500/35 text-fg-on-ink/80 hover:border-gold-400 hover:text-gold-300",
            )}
            activeProps={{
              className: royal
                ? "text-[var(--pp-magenta-deep)] border-[var(--pp-magenta)]"
                : hero
                  ? "text-[var(--hero-blue-deep)] border-[var(--hero-blue)]"
                  : "text-gold-300 border-gold-400",
            }}
          >
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Corporate Portal
          </Link>
          {royal ? (
            <CTAButton
              href="#book"
              size="md"
              className="cta-pulse !bg-ink-800 !text-gold-300 hover:!bg-ink-700 hover:!shadow-[0_0_24px_rgba(207,168,98,0.35)]"
            >
              <Crown className="h-4 w-4" aria-hidden />
              Book Now
            </CTAButton>
          ) : hero ? (
            <CTAButton
              href="#book"
              size="md"
              className="cta-pulse-hero !bg-gradient-to-r !from-[var(--hero-red)] !to-[var(--hero-red-deep)] !text-white hover:!shadow-[0_0_24px_rgba(216,58,74,0.45)]"
            >
              Book Now
            </CTAButton>
          ) : (
            <CTAButton to="/contact" size="md" className="cta-pulse">
              Book Now
            </CTAButton>
          )}
        </div>

        <button
          type="button"
          className={cn(
            "ml-auto inline-flex h-11 w-11 items-center justify-center rounded-md transition-colors min-[1140px]:hidden",
            royal
              ? "text-ink-800 hover:text-[var(--pp-magenta-deep)]"
              : hero
                ? "text-[var(--hero-navy)] hover:text-[var(--hero-red-deep)]"
                : "text-fg-on-ink hover:text-gold-400",
          )}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {royal ? <span aria-hidden className="pp-hairline absolute inset-x-0 bottom-0" /> : null}
      {hero ? (
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--hero-red) 28%, var(--hero-gold) 50%, var(--hero-blue) 72%, transparent)",
          }}
        />
      ) : null}

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
            { label: "Blog", to: "/blog" as const },
            { label: "Contact Us", to: "/contact" as const },
            { label: "Corporate Portal", to: "/corporate-portal" as const },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-base font-medium text-fg-on-ink/85 transition-colors hover:bg-ink-700 hover:text-gold-400"
              activeProps={{ className: "text-gold-400" }}
            >
              {item.label}
            </Link>
          ))}
          {royal ? (
            <CTAButton
              href="#book"
              size="lg"
              className="mt-3 w-full"
              onClick={() => setOpen(false)}
            >
              Book Now
            </CTAButton>
          ) : hero ? (
            <CTAButton
              href="#book"
              size="lg"
              className="mt-3 w-full !bg-gradient-to-r !from-[var(--hero-red)] !to-[var(--hero-red-deep)] !text-white"
              onClick={() => setOpen(false)}
            >
              Book Now
            </CTAButton>
          ) : (
            <CTAButton to="/contact" size="lg" className="mt-3 w-full">
              Book Now
            </CTAButton>
          )}
        </nav>
      </div>
    </header>
  );
}

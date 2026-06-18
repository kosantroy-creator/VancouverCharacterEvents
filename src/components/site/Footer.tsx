import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, Mail, Phone } from "lucide-react";
import logo from "@/assets/brand/logo-primary.png";
import { navChapters, serviceAreas } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="ink-section border-t border-ink-600/50">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logo}
                alt="Vancouver Character Events"
                className="h-12 w-12 rounded-full object-cover"
                width={48}
                height={48}
                loading="lazy"
              />
              <span className="flex flex-col leading-tight">
                <span className="t-engrave text-base text-gold-400">Vancouver</span>
                <span className="t-engrave text-[0.62rem] tracking-[0.28em] text-fg-on-ink/70">
                  Character Events
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-on-ink/70">
              Premium character entertainment across Metro Vancouver. One mothership, many
              adventures — choose your chapter and bring the story to life.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social media"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-fg-on-ink/70 transition-colors hover:border-gold-500 hover:text-gold-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="t-engrave text-xs tracking-[0.22em] text-gold-400">Event Categories</h3>
            <ul className="mt-4 space-y-2.5">
              {navChapters.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/${c.slug}`}
                    className="text-sm text-fg-on-ink/75 transition-colors hover:text-gold-400"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="t-engrave text-xs tracking-[0.22em] text-gold-400">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Our Team", to: "/our-team" },
                { label: "Pricing", to: "/pricing" },
                { label: "Gallery", to: "/gallery" },
                { label: "The Journal", to: "/blog" },
                { label: "About", to: "/about" },
                { label: "Corporate Portal", to: "/corporate-portal" },
                { label: "Book Now", to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-fg-on-ink/75 transition-colors hover:text-gold-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="t-engrave text-xs tracking-[0.22em] text-gold-400">Service Areas</h3>
            <p className="mt-4 text-sm leading-relaxed text-fg-on-ink/70">
              {serviceAreas.slice(0, 10).join(" · ")} and surrounding Lower Mainland communities.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href="mailto:info@vancouvercharacterevents.com"
                className="flex items-center gap-2 text-sm text-fg-on-ink/80 transition-colors hover:text-gold-400"
              >
                <Mail className="h-4 w-4 text-gold-500" />
                <span>info@vancouvercharacterevents.com</span>
              </a>
              <a
                href="tel:+17788006940"
                className="flex items-center gap-2 text-sm text-fg-on-ink/80 transition-colors hover:text-gold-400"
              >
                <Phone className="h-4 w-4 text-gold-500" />
                <span>(778) 800-6940</span>
              </a>
            </div>
          </div>
        </div>

        <div className="rule-gold my-10" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-fg-on-ink/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Vancouver Character Events. All rights reserved.</p>
          <p className="t-engrave text-[0.62rem] tracking-[0.28em] text-gold-500/80">
            Choose your chapter. Bring the story to life.
          </p>
        </div>
      </div>
    </footer>
  );
}

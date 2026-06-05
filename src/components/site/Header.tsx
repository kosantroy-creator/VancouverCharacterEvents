import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/brand/logo-primary.png";
import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

type NavItem = { label: string; to: string };

const navItems: NavItem[] = [
  { label: "Princess Events", to: "/princess-events" },
  { label: "Hero Events", to: "/hero-events" },
  { label: "Dinosaur Events", to: "/dinosaur-events" },
  { label: "Mermaid Events", to: "/mermaid-events" },
  { label: "Specialty Characters", to: "/holiday-events" },
  { label: "Mascot Events", to: "/mascot-events" },
  { label: "Corporate Events", to: "/corporate-events" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  const linkClass =
    "rounded-md px-2.5 py-2 text-sm font-medium text-fg-on-ink/80 transition-colors hover:text-gold-400";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ink-900/90 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(8,17,31,0.6)]"
          : "bg-ink-900/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1360px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="Vancouver Character Events" className="h-11 w-11 rounded-full object-cover" width={44} height={44} />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="t-engrave text-[0.95rem] text-gold-400">Vancouver</span>
            <span className="t-engrave text-[0.62rem] tracking-[0.28em] text-fg-on-ink/70">Character Events</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {navItems.map((item) =>
            item.children ? (
              <DropdownMenu key={item.label}>
                <DropdownMenuTrigger
                  className={cn(linkClass, "inline-flex items-center gap-1 outline-none data-[state=open]:text-gold-400")}
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="border-ink-600/50 bg-ink-800">
                  {item.children.map((child) => (
                    <DropdownMenuItem key={child.to} asChild className="cursor-pointer text-fg-on-ink/85 focus:bg-ink-700 focus:text-gold-400">
                      <Link to={child.to}>{child.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.to}
                to={item.to!}
                className={linkClass}
                activeProps={{ className: "text-gold-400" }}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <CTAButton to="/contact" size="md">
            Book Now
          </CTAButton>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-fg-on-ink xl:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "ink-section overflow-hidden border-t border-ink-600/50 transition-[max-height] duration-300 xl:hidden",
          open ? "max-h-[85vh]" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="flex flex-col">
                <span className="px-3 pb-1 pt-3 text-base font-medium text-fg-on-ink/85">{item.label}</span>
                {item.children.map((child) => (
                  <Link
                    key={child.to}
                    to={child.to}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-6 py-2.5 text-[0.95rem] font-medium text-fg-on-ink/75 transition-colors hover:bg-ink-700 hover:text-gold-400"
                    activeProps={{ className: "text-gold-400" }}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to!}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-fg-on-ink/85 transition-colors hover:bg-ink-700 hover:text-gold-400"
                activeProps={{ className: "text-gold-400" }}
              >
                {item.label}
              </Link>
            ),
          )}
          <Link
            to="/gallery"
            onClick={() => setOpen(false)}
            className="rounded-md px-3 py-3 text-base font-medium text-fg-on-ink/85 transition-colors hover:bg-ink-700 hover:text-gold-400"
            activeProps={{ className: "text-gold-400" }}
          >
            Gallery
          </Link>
          <CTAButton to="/contact" size="lg" className="mt-3 w-full">
            Book Now
          </CTAButton>
        </nav>
      </div>
    </header>
  );
}

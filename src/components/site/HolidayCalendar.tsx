import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Candy,
  CalendarDays,
  Check,
  Flower2,
  Ghost,
  Gift,
  Heart,
  Mail,
  Moon,
  Music,
  Rabbit,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HolidayCalendar — "Open the Village Calendar". The Holiday Village character
 * reveal, built as an interactive seasonal calendar rather than six equal
 * categories (we don't have six rosters). Four calendar pages — Spring
 * Celebration, Spooky Season, Christmas Square (featured, biggest roster) and
 * Custom Seasonal Requests — each in its own accent. On first view the calendar
 * auto-flips Spring → Spooky → Christmas (stamping "Season Unlocked" each time)
 * then settles on Christmas; after that it's tab-driven. The open page shows that
 * season's real, brand-safe roster as character cards (or a request prompt for
 * Custom), with the background accent shifting per season. Reduced-motion safe —
 * no auto-flip, just the featured page. See "HOLIDAY VILLAGE CALENDAR" in
 * styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Season = {
  key: string;
  tab: string;
  icon: IconType;
  title: string;
  subtitle: string;
  copy: string;
  tags: string[];
  cta: string;
  accent: string;
  accentDeep: string;
  header: string;
  cast: { name: string; icon: IconType }[];
  custom?: boolean;
  featured?: boolean;
};

const SEASONS: Season[] = [
  {
    key: "spring",
    tab: "Spring",
    icon: Flower2,
    title: "Spring Celebration",
    subtitle: "Spring Storybook Guest & Easter Bunny",
    copy: "Soft, whimsical visits for Easter events, egg hunts, daycares, schools, mall photos, and family celebrations.",
    tags: ["Easter Visits", "Egg Hunts", "Spring Photos", "Daycares"],
    cta: "Explore Spring Visits",
    accent: "#9B7BB8",
    accentDeep: "#6E4F90",
    header: "linear-gradient(120deg, #B98FD6 0%, #E48FB0 55%, #84CBA0 100%)",
    cast: [
      { name: "Spring Storybook Guest", icon: BookOpen },
      { name: "Easter Bunny", icon: Rabbit },
    ],
  },
  {
    key: "halloween",
    tab: "Spooky",
    icon: Ghost,
    title: "Spooky Season",
    subtitle: "Spooky Gothic Guest",
    copy: "A quirky, mysterious, family-friendly visit for Halloween parties, themed birthdays, school events, and photo moments.",
    tags: ["Halloween Parties", "Photo Moments", "Themed Events", "Spooky Fun"],
    cta: "Explore Halloween Visits",
    accent: "#E07B39",
    accentDeep: "#7A4FA3",
    header: "linear-gradient(120deg, #E8924C 0%, #B5547F 55%, #6B3FA0 100%)",
    cast: [{ name: "Spooky Gothic Guest", icon: Moon }],
  },
  {
    key: "christmas",
    tab: "Christmas",
    icon: Gift,
    title: "Christmas Square",
    subtitle: "Christmas Characters & Carolers",
    copy: "Our biggest seasonal offering — Santa, Mrs. Claus, elves, carolers, mischievous holiday guests, sweet Christmas helpers, and elegant holiday appearances for parties, malls, schools, corporate events, and community celebrations.",
    tags: ["Santa Visits", "Elves", "Carolers", "Mall Photos", "Corporate Events"],
    cta: "Explore Christmas Visits",
    accent: "#B0232A",
    accentDeep: "#1E6E4A",
    header: "linear-gradient(120deg, #2E7D4F 0%, #1E6E4A 44%, #B0232A 100%)",
    featured: true,
    cast: [
      { name: "Santa", icon: Gift },
      { name: "Mrs. Claus", icon: Heart },
      { name: "Holiday Elves", icon: Users },
      { name: "Caroler Trio", icon: Music },
      { name: "Sweet Christmas Helper", icon: Candy },
      { name: "Mischievous Green Guest", icon: Sparkles },
      { name: "Holiday Belle", icon: Star },
    ],
  },
  {
    key: "custom",
    tab: "Custom",
    icon: Mail,
    title: "Custom Seasonal Requests",
    subtitle: "Need something unique?",
    copy: "Tell us the seasonal theme, event type, and character style you're imagining. Custom requests may be available depending on timing, performers, and costume readiness.",
    tags: ["Custom Ideas", "Brand Events", "Schools", "Community Events"],
    cta: "Ask About Custom Seasonal Magic",
    accent: "#C19A3C",
    accentDeep: "#6E2A48",
    header: "linear-gradient(120deg, #E2C271 0%, #C19A3C 50%, #6E2A48 100%)",
    custom: true,
    cast: [],
  },
];

const DEFAULT = 2; // Christmas — featured / busiest

export function HolidayCalendar() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(DEFAULT);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);
  const playedRef = useRef(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    setMotionOK(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Flip through the seasons once, then settle on the featured page.
          if (!playedRef.current) {
            playedRef.current = true;
            setActive(0);
            timersRef.current.push(window.setTimeout(() => setActive(1), 950));
            timersRef.current.push(window.setTimeout(() => setActive(2), 1900));
          }
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      clearTimers();
    };
  }, []);

  const pick = (i: number) => {
    clearTimers(); // user takes over from any auto-flip
    setActive(i);
  };

  const s = SEASONS[active];
  const CalIcon = s.icon;

  return (
    <section
      ref={ref}
      id="village-calendar"
      aria-labelledby="hvc-title"
      className={cn("hvc relative isolate scroll-mt-24 overflow-hidden", motionOK && "anim", inView && "is-in")}
      style={{ "--pa": s.accent, "--pad": s.accentDeep } as Vars}
    >
      <span aria-hidden className="hvc-glow" />

      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-5 py-20 sm:px-6 md:py-24 lg:px-8">
        {/* header */}
        <div className="hvc-head mx-auto max-w-2xl text-center">
          <span className="hvc-eyebrow">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            The Village Calendar
          </span>
          <h2 id="hvc-title" className="hvc-title">
            Open the Village Calendar
          </h2>
          <p className="hvc-sub">
            Turn the page on every season. Holiday Village flips from spring to spooky to Christmas —
            pick a page to meet the characters behind each celebration.
          </p>
        </div>

        {/* season tabs */}
        <div className="hvc-tabs" role="tablist" aria-label="Seasons">
          {SEASONS.map((season, i) => {
            const TabIcon = season.icon;
            const on = i === active;
            return (
              <button
                key={season.key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => pick(i)}
                className={cn("hvc-tab", on && "is-on")}
                style={{ "--ta": season.accent } as Vars}
              >
                <TabIcon className="h-4 w-4" aria-hidden />
                <span>{season.tab}</span>
                {season.featured ? <span className="hvc-tab-dot" aria-hidden /> : null}
              </button>
            );
          })}
        </div>

        {/* the open calendar page */}
        <div className="hvc-panel" style={{ "--pa": s.accent, "--pad": s.accentDeep } as Vars}>
          <div className="hvc-panel-head" style={{ background: s.header }}>
            <span aria-hidden className="hvc-page-ic">
              <CalIcon className="h-6 w-6" />
            </span>
            <span className="hvc-page-label">{s.tab}</span>
            <span key={active} aria-hidden className="hvc-stamp">
              <Check className="h-3 w-3" />
              Season Unlocked
            </span>
          </div>

          <div key={active} className="hvc-panel-body motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300">
            <div className="hvc-panel-grid">
              <div className="hvc-panel-left">
                <h3 className="hvc-page-title">{s.title}</h3>
                <p className="hvc-page-sub">{s.subtitle}</p>
                <p className="hvc-page-copy">{s.copy}</p>
                <ul className="hvc-tags">
                  {s.tags.map((t) => (
                    <li key={t} className="hvc-tag">{t}</li>
                  ))}
                </ul>
                <Link to="/contact" className="hvc-cta group">
                  {s.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>

              <div className="hvc-panel-right">
                {s.custom ? (
                  <div className="hvc-custom">
                    <span aria-hidden className="hvc-custom-ic">
                      <Mail className="h-7 w-7" />
                    </span>
                    <p className="hvc-custom-title">Tell us your seasonal idea</p>
                    <p className="hvc-custom-line">
                      Themes, event types, and character styles — we&apos;ll let you know what we can
                      bring to life.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="hvc-cast-label">
                      {s.tab === "Christmas" ? "Meet the Christmas cast" : `Meet the ${s.tab.toLowerCase()} guests`}
                    </p>
                    <ul className="hvc-cast">
                      {s.cast.map(({ name, icon: Icon }) => (
                        <li key={name} className="hvc-char">
                          <span aria-hidden className="hvc-char-ic">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="hvc-char-name">{name}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import { ArrowRight, Flower2, Ghost, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HolidaySeasons — "Three Seasons. One Village." A compact band, right under the
 * trust strip, that makes the real Holiday Village structure unmistakable: three
 * seasonal worlds we actually offer — Spring Celebration, Spooky Season and
 * Christmas Square (featured, our busiest) — each a season-coded card with its
 * roster label and an explore link. Spring = lilac/blush/mint, Halloween =
 * pumpkin/plum, Christmas = evergreen/cranberry/gold. Brand-safe seasonal language
 * only. VISIBLE BY DEFAULT (hidden only under `.hvs.anim:not(.is-in)`),
 * reduced-motion safe. See "HOLIDAY VILLAGE SEASONS" in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string }>;

type Season = {
  key: string;
  icon: IconType;
  title: string;
  subtitle: string;
  line: string;
  cta: string;
  header: string;
  accent: string;
  featured?: boolean;
  tag?: string;
};

const SEASONS: Season[] = [
  {
    key: "spring",
    icon: Flower2,
    title: "Spring Celebration",
    subtitle: "Spring Storybook Guest & Easter Bunny",
    line: "Soft, whimsical visits for Easter events, egg hunts, daycares, schools, and family photos.",
    cta: "Explore Spring Visits",
    header: "linear-gradient(135deg, #B98FD6 0%, #E48FB0 52%, #84CBA0 100%)",
    accent: "#7E5BA0",
  },
  {
    key: "halloween",
    icon: Ghost,
    title: "Spooky Season",
    subtitle: "Spooky Gothic Guest",
    line: "A quirky, mysterious, family-friendly visit for Halloween parties, themed birthdays, and photo moments.",
    cta: "Explore Halloween Visits",
    header: "linear-gradient(135deg, #E8924C 0%, #B5547F 52%, #6B3FA0 100%)",
    accent: "#9A5520",
  },
  {
    key: "christmas",
    icon: Gift,
    title: "Christmas Square",
    subtitle: "Christmas Characters & Carolers",
    line: "Our biggest season — Santa, Mrs. Claus, elves, carolers, sweet helpers, and elegant holiday appearances.",
    cta: "Explore Christmas Visits",
    header: "linear-gradient(135deg, #2E7D4F 0%, #1E6E4A 46%, #B0232A 100%)",
    accent: "#B0232A",
    featured: true,
    tag: "Busiest Season",
  },
];

export function HolidaySeasons() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setInView(true);
      return;
    }
    setMotionOK(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="hvs-title"
      className={cn("hvs relative isolate overflow-hidden", motionOK && "anim", inView && "is-in")}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1160px] px-5 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="hvs-head mx-auto max-w-2xl text-center">
          <span className="hvs-eyebrow">The Village Calendar</span>
          <h2 id="hvs-title" className="hvs-title">
            Three seasons. One magical village.
          </h2>
          <p className="hvs-sub">
            Holiday Village changes its decorations with the celebration. These are the three seasonal
            worlds we bring to life — choose the one you&apos;re planning for.
          </p>
        </div>

        <ul className="hvs-grid">
          {SEASONS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li
                key={s.key}
                className={cn("hvs-card", s.featured && "hvs-card--featured")}
                style={{ "--i": i, "--sa": s.accent } as Vars}
              >
                <div className="hvs-card-head" style={{ background: s.header }}>
                  {s.tag ? <span className="hvs-tag">{s.tag}</span> : null}
                  <span aria-hidden className="hvs-medal">
                    <Icon className="h-7 w-7" />
                  </span>
                </div>
                <div className="hvs-card-body">
                  <h3 className="hvs-card-title">{s.title}</h3>
                  <p className="hvs-card-sub">{s.subtitle}</p>
                  <p className="hvs-card-line">{s.line}</p>
                  <a href="#village-calendar" className="hvs-card-cta group">
                    {s.cta}
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

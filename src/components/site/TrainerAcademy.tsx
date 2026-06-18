import { useEffect, useRef, useState, type ComponentType, type CSSProperties } from "react";
import {
  Crown,
  Drumstick,
  Egg,
  Footprints,
  GraduationCap,
  HelpCircle,
  Leaf,
  Megaphone,
  ScrollText,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * TrainerAcademy — the field-guide section directly after the Harvey reveal. It
 * shows parents the event is structured, safe and story-driven: the party becomes
 * a Junior Dinosaur Trainer Academy that BUILDS toward Harvey. Eleven steps run
 * down a winding expedition trail (alternating cards on desktop, a stacked path on
 * mobile) with badge-stamp checkpoints. Trainer-led adventure — NOT an obstacle
 * course. Scroll reveals are IntersectionObserver-driven and visible-by-default,
 * so reduced-motion users and pre-JS render get the whole trail composed and still.
 * See the "TRAINER ACADEMY" block in styles.css.
 */
type Vars = CSSProperties & Record<string, string | number>;
type IconType = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
type Step = { icon: IconType; title: string; desc: string; tags?: string[] };

const STEPS: Step[] = [
  {
    icon: Users,
    title: "Trainer Recruitment",
    desc: "Our safari trainers gather the kids — something very large has been spotted nearby. Before Harvey can safely come out, everyone trains up as Junior Dinosaur Trainers.",
  },
  {
    icon: ScrollText,
    title: "Trainer Oath & Safety Rules",
    desc: "Kids take the trainer oath and learn the golden rules — story-first and fun, never strict.",
    tags: [
      "Stay behind the trainer line",
      "Listen for trainer commands",
      "Calm voices around Harvey",
      "No running toward Harvey",
      "Touch & feed only when invited",
    ],
  },
  {
    icon: HelpCircle,
    title: "Dino Knowledge Warm-Up",
    desc: "A playful Q&A about fossils, tracks, carnivores and herbivores — and how trainers work safely around dinosaurs.",
  },
  {
    icon: Search,
    title: "Fossil Discovery",
    desc: "Young explorers hunt for clues with fossils, bones, brushes and footprint cards — the first real sign that Harvey is close.",
  },
  {
    icon: Egg,
    title: "Egg Rescue Mission",
    desc: "A simple teamwork mission to protect and return the dinosaur eggs. Everyone has a job, and every job matters.",
  },
  {
    icon: Megaphone,
    title: "Command Training",
    desc: "Kids rehearse the exact commands they'll use the moment Harvey appears.",
    tags: ["Easy, Harvey!", "Freeze!", "Back up!", "Good dino!", "Trainer pose!"],
  },
  {
    icon: Drumstick,
    title: "Feeding Certification",
    desc: "Trainers show how a certified handler safely feeds Harvey — and the birthday star can earn the special feeding badge.",
  },
  {
    icon: Footprints,
    title: "Signs Harvey Is Close",
    desc: "The energy shifts: fresh tracks, moving leaves, a radio crackle, a distant roar. Trainers ready the group for the big reveal.",
  },
  {
    icon: Sparkles,
    title: "Harvey's Big Entrance",
    desc: "Harvey steps into view with the trainers, and the kids put every command to work — the payoff to the whole Academy.",
  },
  {
    icon: Crown,
    title: "Birthday Child Feature Moment",
    desc: "The birthday child becomes Lead Junior Trainer, with a special Harvey moment, photo, badge and certificate.",
  },
  {
    icon: GraduationCap,
    title: "Photos & Graduation",
    desc: "We finish with organized photos and a Junior Dinosaur Trainer graduation — badges earned, mission complete.",
  },
];

export function TrainerAcademy() {
  const ref = useRef<HTMLElement>(null);
  const [motionOK, setMotionOK] = useState(false);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      root.querySelectorAll(".aca-step, .aca-list").forEach((el) => el.classList.add("is-in"));
      return;
    }
    setMotionOK(true);
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );
    root.querySelectorAll(".aca-step").forEach((el) => io.observe(el));
    const list = root.querySelector(".aca-list");
    if (list) io.observe(list);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-labelledby="academy-title"
      className={cn("aca relative isolate overflow-hidden", motionOK && "anim")}
      style={{
        background:
          "linear-gradient(180deg, #FFFCF6 0%, #FBF4E4 24%, #F6EDD9 58%, #F8F1E1 82%, #FFFCF6 100%)",
      }}
    >
      {/* faint fossil-dot texture, masked so it fades at the seams */}
      <div aria-hidden className="aca-tex pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-[1100px] px-5 pb-24 pt-20 sm:px-6 md:pb-28 md:pt-24 lg:px-8">
        {/* heading */}
        <div className="text-center">
          <span className="t-engrave inline-flex items-center gap-2 text-[0.66rem] tracking-[0.3em] text-[#9c7406]">
            <Leaf className="h-3 w-3 text-[#6E9A5E]" aria-hidden />
            What Happens During the Expedition
            <Leaf className="h-3 w-3 -scale-x-100 text-[#6E9A5E]" aria-hidden />
          </span>
          <h2
            id="academy-title"
            className="t-display mt-2 text-3xl font-bold leading-tight text-[#2E4A38] md:text-[2.7rem]"
          >
            Junior Dinosaur Trainer Academy
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-[#2E4A38]/85">
            Before Harvey arrives, our safari trainers turn the party into a Junior Dinosaur Trainer
            Academy. Kids learn the rules, discover clues, practice commands, protect dinosaur eggs,
            and prepare for the moment Harvey steps into view.
          </p>
        </div>

        {/* the expedition trail */}
        <ol className="aca-list relative mt-14 md:mt-16">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="aca-step"
              data-side={i % 2 === 0 ? "l" : "r"}
              style={{ "--i": i } as Vars}
            >
              <div className="aca-card">
                <div className="flex items-center gap-3">
                  <span className="aca-ic">
                    <s.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="t-engrave text-[0.6rem] font-bold tracking-[0.22em] text-[#9c7406]">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="t-display mt-3 text-[1.18rem] font-bold leading-snug text-[#2E4A38]">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[#2E4A38]/80">{s.desc}</p>
                {s.tags ? (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <li key={t} className="aca-tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <span aria-hidden className="aca-node">
                {i + 1}
              </span>
            </li>
          ))}
        </ol>

        {/* trailhead close */}
        <p className="mt-12 text-center text-[0.82rem] italic text-[#2E4A38]/70">
          Every Academy ends the same way — badges earned, a graduation cheer, and a birthday nobody
          forgets.
        </p>
      </div>
    </section>
  );
}

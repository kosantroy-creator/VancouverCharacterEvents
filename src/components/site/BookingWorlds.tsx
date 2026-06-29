import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Check, ListChecks, Sparkles, X } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import type { BookingPathId } from "./BookingPaths";
import { BOOKING_WORLDS, WORLD_BY_ID } from "@/lib/world-characters";
import { PRINCESS_ART } from "@/lib/princess-portraits";
import worldsBg from "@/assets/booking/step2-worlds-bg.webp";

/**
 * BookingWorlds — "Step Two: Choose Your World". Eight small themed cards (each a
 * world's own hero art) sit on the all-worlds vista — all on one row on desktop.
 * Clicking a card animates that world's image into the centre of the screen, then
 * accordion-expands to reveal the world's characters as portrait cards (princess
 * shows real portraits; other worlds show themed portraits). The visitor picks the
 * ones they want and confirms; a Continue button then unlocks Step 3 (route-gated).
 * The heading lives in the BookingIntro blend section just above. Pure-CSS expand /
 * accordion (no gsap); reduced-motion safe via the global guard. See ".cw" in
 * styles.css.
 */
type Selection = Record<string, string[]>;

export { WORLD_NAMES } from "@/lib/world-characters";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function BookingWorlds({
  path,
  value,
  onChange,
  onContinue,
}: {
  path: BookingPathId | null;
  value: Selection;
  onChange: (v: Selection) => void;
  onContinue: () => void;
}) {
  const single = path === "single";
  const [open, setOpen] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const [draft, setDraft] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const cardRectRef = useRef<DOMRect | null>(null);

  const world = open ? WORLD_BY_ID[open] : null;

  const openWorld = (id: string, e: MouseEvent<HTMLButtonElement>) => {
    cardRectRef.current = e.currentTarget.getBoundingClientRect();
    setDraft(value[id] ?? []);
    setOpen(id);
    setClosing(false);
  };

  // FLIP: on open, start the box at the clicked card's position/size, then animate to
  // its centred resting place (so it flies into the middle instead of just appearing).
  useIso(() => {
    if (!open) return;
    const box = boxRef.current;
    const cr = cardRectRef.current;
    if (!box || !cr || reduced()) return;
    const fr = box.getBoundingClientRect();
    const sx = cr.width / fr.width;
    const sy = cr.height / fr.height;
    box.style.transformOrigin = "top left";
    box.style.transform = `translate(${cr.left - fr.left}px, ${cr.top - fr.top}px) scale(${sx}, ${sy})`;
    box.style.opacity = "0.55";
    void box.offsetWidth; // reflow
    box.style.transition = "transform 460ms var(--ease-out), opacity 260ms ease";
    box.style.transform = "none";
    box.style.opacity = "1";
  }, [open]);

  const close = () => {
    setClosing(true);
    const box = boxRef.current;
    const cr = cardRectRef.current;
    if (box && cr && !reduced()) {
      const fr = box.getBoundingClientRect();
      box.style.transformOrigin = "top left";
      box.style.transition = "transform 320ms var(--ease-out), opacity 300ms ease";
      box.style.transform = `translate(${cr.left - fr.left}px, ${cr.top - fr.top}px) scale(${cr.width / fr.width}, ${cr.height / fr.height})`;
      box.style.opacity = "0";
    }
    window.setTimeout(() => {
      setOpen(null);
      setClosing(false);
    }, 340);
  };
  const confirm = () => {
    if (!world) return;
    const next = { ...value };
    if (draft.length) next[world.id] = draft;
    else delete next[world.id];
    onChange(single ? (draft.length ? { [world.id]: draft } : {}) : next);
    close();
  };
  const toggle = (cid: string) =>
    setDraft((d) => (d.includes(cid) ? d.filter((x) => x !== cid) : [...d, cid]));

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const confirmedWorlds = Object.keys(value).filter((id) => value[id]?.length);
  const totalChars = confirmedWorlds.reduce((n, id) => n + value[id].length, 0);
  const canContinue = confirmedWorlds.length > 0;
  const allOn = world ? draft.length === world.characters.length : false;

  return (
    <section id="choose-world" aria-label="Choose your world" className="bkw cw relative isolate scroll-mt-20 overflow-hidden">
      <img src={worldsBg} alt="" aria-hidden decoding="async" loading="lazy" className="cw-bg absolute inset-0 -z-20 h-full w-full object-cover" />
      <span aria-hidden className="cw-bg-veil absolute inset-0 -z-10" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 py-14 sm:px-6 md:py-16 lg:px-8">
        {/* world cards — all 8 in a row on desktop */}
        <div className="cw-grid">
          {BOOKING_WORLDS.map((w, i) => {
            const count = value[w.id]?.length ?? 0;
            return (
              <Reveal key={w.id} delay={100 + i * 60} y={20} className="cw-cell">
                <button
                  type="button"
                  onClick={(e) => openWorld(w.id, e)}
                  aria-haspopup="dialog"
                  className={cn("cw-card", count > 0 && "is-chosen")}
                  style={{ "--acc": w.acc } as CSSProperties}
                >
                  <img src={w.hero} alt="" aria-hidden className="cw-card-bg" />
                  <img
                    src={w.hero}
                    alt=""
                    aria-hidden
                    className="cw-card-img"
                    style={{ objectPosition: w.cardPos, ["--cz" as string]: w.cardScale ?? 1 } as CSSProperties}
                  />
                  <span aria-hidden className="cw-card-veil" />
                  {count > 0 ? (
                    <span className="cw-card-badge"><Check className="h-3 w-3" aria-hidden /> {count}</span>
                  ) : null}
                  <span className="cw-card-body">
                    <span className="cw-card-name">{w.name}</span>
                    <span className="cw-card-cta">{count > 0 ? "Edit" : "Choose"}</span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* continue bar */}
        <Reveal delay={220} y={16} className="block">
          <div className="cw-continue">
            <p className="cw-continue-note">
              {canContinue ? (
                <>
                  <Sparkles className="h-4 w-4" aria-hidden />
                  <strong>{totalChars}</strong> character{totalChars === 1 ? "" : "s"} selected across{" "}
                  <strong>{confirmedWorlds.length}</strong> world{confirmedWorlds.length === 1 ? "" : "s"}.
                </>
              ) : (
                <>
                  <ListChecks className="h-4 w-4" aria-hidden />
                  Open a world above and pick your characters to continue.
                </>
              )}
            </p>
            <button type="button" disabled={!canContinue} onClick={onContinue} className="cw-continue-btn group">
              Continue to Step 3
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </button>
          </div>
        </Reveal>
      </div>

      {/* ===== expand-to-centre, accordion character lightbox (portalled to body so
              the contained section can't clip it) ===== */}
      {world && typeof document !== "undefined"
        ? createPortal(
        <div
          className={cn("cw-lb", closing && "is-closing")}
          role="dialog"
          aria-modal="true"
          aria-label={`Choose ${world.name} characters`}
          onClick={close}
        >
          <div ref={boxRef} className="cw-lb-box" style={{ "--acc": world.acc } as CSSProperties} onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Close" onClick={close} className="cw-lb-x"><X className="h-5 w-5" /></button>

            {/* world image animates in + takes centre */}
            <div className="cw-lb-hero">
              <img src={world.hero} alt="" aria-hidden className="cw-lb-hero-img" />
              <span aria-hidden className="cw-lb-hero-veil" />
              <div className="cw-lb-hero-copy">
                <h3 className="cw-lb-title">{world.name}</h3>
                <p className="cw-lb-tag">{world.tagline}</p>
              </div>
            </div>

            {/* accordion-expanding character roster */}
            <div className="cw-lb-acc">
              <div className="cw-lb-acc-in">
                <div className="cw-lb-label">
                  <span>{world.rosterLabel} — tap the ones you'd like</span>
                  <button
                    type="button"
                    className="cw-lb-all"
                    onClick={() => setDraft(allOn ? [] : world.characters.map((c) => c.id))}
                  >
                    {allOn ? "Clear all" : "Select all"}
                  </button>
                </div>

                <div className="cw-pc-grid">
                  {world.characters.map((c) => {
                    const on = draft.includes(c.id);
                    const art = world.id === "princess" ? PRINCESS_ART[c.id] : undefined;
                    const Icon = world.icon;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(c.id)}
                        className={cn("cw-pc", on && "is-on")}
                      >
                        <span className="cw-pc-frame">
                          {art ? (
                            <img src={art} alt="" aria-hidden className="cw-pc-art" />
                          ) : (
                            <span aria-hidden className="cw-pc-art cw-pc-deco"><Icon className="h-7 w-7" /></span>
                          )}
                          <span aria-hidden className="cw-pc-check"><Check className="h-4 w-4" /></span>
                        </span>
                        <span className="cw-pc-name">{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="cw-lb-actions">
              <span className="cw-lb-count">{draft.length} selected</span>
              <button type="button" disabled={!draft.length} onClick={confirm} className="cw-lb-confirm group">
                <Check className="h-4 w-4" aria-hidden />
                Confirm Selection
              </button>
            </div>
          </div>
        </div>,
            document.body,
          )
        : null}
    </section>
  );
}

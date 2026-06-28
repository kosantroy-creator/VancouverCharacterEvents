# Princess Page — Design Audit & Enhancement Plan

**Scope:** `/princess-events` top to bottom. Booking *form* excluded (its lead-in is in scope).
**Method:** multi-agent senior-designer audit — 11 lenses (hero, hierarchy/type, color/depth, layout/spacing, animation, interactive, scroll/pacing, conversion, storytelling/trust, mobile, clutter/polish) grounded in the real source, synthesized by a design director, then a completeness critic pass.
**Goal:** magical, premium, trustworthy, emotionally engaging, easy to book from.

---

## 1. Design Diagnosis

### What's genuinely working — protect these
- **Hero wordmark is couture.** Cinzel "Vancouver" → oversized Parisienne "Princess" → spaced gold-fleuron "Events" → gold hairline (princess-events.tsx:273-300). Three type voices in a real hierarchy — reads as a brand lockup, not a SaaS hero.
- **Accessibility architecture is strong and centralized.** Decorative lockup `aria-hidden` with a real `sr-only <h1>`; castle `alt` + `fetchPriority="high"`; ONE reduced-motion guard (styles.css:9018) plus JS `matchMedia` guards in ScrollTimeline/KingdomDoors. Do **not** fragment this.
- **Both video modals are exemplary.** `preload="none"`, mount-on-open, Escape, scroll-lock, backdrop close, `role="dialog"`, 44px close button. Zero video bytes on first paint.
- **The Royal Court night band is the right single dark jewel** on an all-light page, with fixed-820px seams that keep the cream→indigo blend consistent at any height. The KingdomDoors auto-open-on-scroll (GSAP `back.out`, cards flying from the portal) is the page's signature high-craft moment.
- **Token discipline.** blush/pearl/rose/gold/magenta with magenta/gold-tinted shadows — no accent drift.
- **The proven conversion loop exists:** sticky Header "Book Now" → #book, and KingdomDoors `?guest=<name>#book` prefill + smooth-scroll (565-577). Excellent craft — everything else should mirror it.
- **Copy is the team's strength.** The timeline beats ("the room goes quiet, and a real princess steps into your celebration"), the "parents book experiences, not appearances" thesis, named/local reviews, and honest "travel included" line.

### What's not working — the real problems
**Three verified criticals (these actively hurt trust/conversion now):**
1. **Navy-on-navy trust line.** The Royal Court closing line (princess-events.tsx:758) is `text-ink-800/90` (#244268) on the #101B32 night section. The 0.6 white shadow is a glow halo, not a fill — the line doing the legal/trust reframe is near-invisible.
2. **Placeholder reel under a "no stock photos" promise.** Both "Watch the Magic" CTAs — hero (`/video/doors/glass-slipper-kingdom.mp4`) and Real-Moments featured (PrincessHighlightReel.tsx:29) — play the **same silent kingdom-door ambiance clip**, sitting directly under a "genuine reactions, no stock photos" claim. The two biggest emotional-proof moments pay off with a placeholder.
3. **Mobile can't see per-princess detail or book a princess.** Each Royal Court card's gown, welcome line, and prefilling "Book Now" live in `.cardx-extra`, gated behind hover/`:focus-within` (styles.css:1247-1259). On touch — the dominant booking device — phones never see the richest merchandising or the best per-character CTA.

**High-impact problems:**
- **Two off-page conversion leaks at peak intent.** FairyGodmother match cards (FairyGodmother.tsx:326) and the RoyalInvitation CTA (RoyalInvitation.tsx:165) route to a cold `/contact` instead of the on-page `#book` prefill — abandoning warm leads.
- **Hero focal point + legibility both fail in the first 3 seconds.** The castle (the brand's hero subject) is pushed off-frame right (`object-[68%_38%]`) while the bleached left third holds only blossom; subhead/body/trust sit where the wash thins to 0.22 (line 237) with no text-shadow fallback. The magenta "Step Off the Page" span over pink blossom is the single weakest text. Far worse on 390px portrait, where the castle nearly vanishes.
- **Desktop card discoverability.** The Royal Court cards have no rest-state lift or cursor cue (KingdomDoors.tsx:413-449) — parents may read the page's signature interaction as a static gallery and never open it.
- **`--fg-3` (#6B7E94) fails AA** (~3.9:1 on white, styles.css:132) and carries the reassurance captions parents scan ("no checkout today", "travel included", timeline bodies, card cities) at 0.8rem.
- **Trust gaps:** no aggregate proof (count/rating/years), no child-safety/vetting signal, and "no stock photos" imagery is reused (momentEntrance appears 3×).
- **The ✦…✦ eyebrow wraps all 7 headings identically** — a template tell that flattens hierarchy into wallpaper.

**Medium / polish:** 3-way hero CTA split with no booking path; off-palette **cream #F2ECE2** at both Court seams (parchment-olive, not rose-gold); abrupt dark→light Court *exit*; pacing sag after the Court (5 light sections, two proof beats back-to-back); daytime auroras (0.5) out-glow the night centerpiece (0.10-0.16); duplicate "Begin Your Story" creates a false bottom; mobile compositor cost (6× `blur(64px)` auroras + ~17 petals + 6 autoplay videos); 20+ infinite card-sways with permanent `will-change` that never pause off-screen; the Coronation climax is a still-life of a prop; ad-hoc card radii (10/14/16/20/22).

---

## 2. Prioritized Improvements (highest → lowest impact)

> Impact/Effort. **[C]** = content-blocked, **[D]** = data-blocked (needs real claims from you — do not fabricate).

| # | Impact | Eff | Item |
|---|--------|-----|------|
| 1 | High | S | **Fix the navy-on-navy trust line** — 758 `text-ink-800/90`→ a light ink token (#EAF0F7)/85, drop white glow. |
| 2 | High | S | **Stop the two off-page leaks** → `#book` prefill (FairyGodmother.tsx:326, RoyalInvitation.tsx:165). |
| 3 | High | M | **Reveal Royal Court card detail on touch** (`@media (hover:none)`) **+ pair with zone bottom-padding** so the now-taller bottom-row cards don't expand into the dark seam. |
| 4 | High | S | **Stop the placeholder reel paying off two "Watch the Magic" promises** — relabel/hide until real footage; never the same clip under two promises. |
| 5 | High | S | **Repair the hero** — reframe castle `object-[68%_38%]`→`~[52%_42%]`, deepen wash floor, add text-shadow to subhead/body/Events/trust **and the magenta "Step Off the Page" span**. |
| 6 | High | S | **Darken `--fg-3`** #6B7E94→~#586A80 (AA) — one token fixes every caption. |
| 7 | High | S | **Add desktop card discoverability** — rest-state lift/scale + a persistent "tap to meet" micro-cue on the doors. |
| 8 | High | S **[D]** | **Add aggregate social proof + a "Vetted & Insured" signal** — only with real numbers; mark the five gold stars as decorative or tie them to the rating (don't pair a new "4.9/5" beside meaningless stars). |
| 9 | Med | S | **Booking on-ramps** — Pricing & Real-Moments get a primary "Begin Your Story"→#book (browse links demote to ghost); quiet hero "Ready now? Begin your story →". |
| 10 | Med | S | **De-ornament** — reserve ✦…✦ for 2-3 emotional peaks at the Eyebrow source (Section.tsx:109). |
| 11 | Med | S | **Fix both Court seams** #F2ECE2 → blush-white #FDF4F8/#FBEDF3. |
| 12 | Med | S | **Crescendo into #book** — GoldRule + a small scale/rhythm step above the #book h2 so the page visibly *arrives* at the form (the brief's "lead into it"). |
| 13 | Med | S | **De-conflict hero pulses** — keep `cta-pulse`; make `.watch-ring` hover/focus-only. |
| 14 | Med | S | **Rebalance auroras** — halve daytime alphas, warm the cold-blue to lavender-pink so the night Court out-glows. |
| 15 | Med | S | **Resolve duplicate "Begin Your Story"** — reviews CTA becomes a forward bridge; #book h2 owns the phrase; standardize on `CTAButton`. |
| 16 | Med | M | **Pause off-screen card-sway + drop permanent `will-change`** (biggest battery/perf win). |
| 17 | Med | S | **Cut mobile cost** — hide `.aurora` <640px, thin petals to 3, gate the 6 portal videos to desktop (poster carries mobile). One coherent rule with #14. |
| 18 | Med | S | **Mobile hero** — `object-[50%_32%]` <640px + lighter portrait wash; lower "Princess" script floor to 2.9rem for above-fold density. |
| 19 | Med | S **[C]** | **The Coronation climax** — swap momentCrown (tiara-on-cushion still-life, 386-390) for a real child being crowned. Its own item: the narrative climax landing on merchandise undercuts the thesis. |
| 20 | Med | S | **Rewrite the boilerplate hero subhead** (310) into a concrete child-centered promise. |
| 21 | Low | S | Strengthen mobile heading tier (h2 ~2.05rem/weight 700); chip tap targets py-3; hero ghost bg-white/80 so it doesn't read disabled. |
| 22 | Low | S | Matchmaker a11y (aria-live + focus/scroll to "Royal Match Found!"); align Court gutters (`sm:px-8`); trust-strip `max-w` →1200px; restore timeline heading gap (`lg:mt-8`). |
| 23 | Low | S | "Royal Favourite" ribbon implies an unexplained ranking — give it meaning ("Most-booked gown") or drop the flag. |
| 24 | Med | L **[C]** | Diversify proof imagery — 6 distinct child-facing REAL_MOMENTS, own reel still (stop reusing momentEntrance 3×). |
| 25 | Low | M | Tokenize card radii (→ `--radius-lg/-xl`), unify the corner-bracket snippet, consolidate redundant trust chips down to hero + WorldTrustStrip. |

---

## 3. Section-by-Section Recommendations

**Hero.** Reframe castle to ~`52%/42%`; deepen wash floor `linear-gradient(100deg, rgba(255,248,251,0.94) 0%, 0.8 34%, 0.42 56%, transparent 80%)`; text-shadow on subhead/body/"Events"/trust **and the magenta span**; one infinite pulse only (kill the watch-ring drone); add quiet "Ready now? Begin your story →" #book link; rewrite subhead to a concrete promise ("A real princess walks through your door, sings just for your child, and crowns them royalty — anywhere in Metro Vancouver."); lower script floor to 2.9rem; mobile object-position fix.

**Trust strip.** Replace the vague "Thousands of Smiles Created" chip with a real metric **[D]**; add one "Vetted & Insured" item (ShieldCheck) to PRINCESS_TRUST + REVIEW_TRUST; match `max-w`→1200px.

**What Happens (timeline).** Halve aurora alphas + warm the cold-blue; restore desktop heading gap (`mt-12 lg:mt-4`→`lg:mt-8`); drop the duplicated manual ✦ spans/petals (Section texture + auroras suffice); repoint RoyalInvitation CTA → #book; swap the Coronation still-life for a real child **[C]**.

**Royal Court (Kingdom Doors).** Fix the navy-on-navy line (#1); reveal `.cardx-extra` on touch **+** add bottom-zone padding so taller cards don't clip into the seam (#3); add desktop rest-state affordance + "tap to meet" cue (#7); fix both seam 0% stops to blush-white; warm the cold-violet photo overlays so the court reads as one indigo world; smooth the dark→light *exit* (on-palette bottom seam + faint lavender top-glow on the Matchmaker); pause off-screen sway; gate portal videos to desktop; align gutters `sm:px-8`. Give the zone-level "Book This Kingdom" a guest prefill or relabel it "Book a Princess."

**Fairy Godmother.** Re-route match cards → `?guest=<name>#book` (#2); wrap reveal in `aria-live` + focus/scroll to "Royal Match Found!"; soften that headline when the top match is pure backfill (score 0); chips py-3/gap-3 for thumb reach.

**Pricing.** Make "Begin Your Story"→#book the primary, demote "Explore Princess Packages"→/pricing to ghost; push lg flank royals fully off-canvas (`-translate-x-[42%]`) so framing never reads as clipping on laptops; bump package-name h3 above the price size for clear name→rate reading order.

**Real Moments.** Swap/relabel the placeholder reel + give the featured card its own source/label (#4); populate REAL_MOMENTS with 6 distinct child-facing photos **[C]**; add a primary "Begin Your Story"→#book beside the /gallery ghost; focus-visible play-disc for keyboard parity.

**Reviews → booking.** Reword the reviews CTA to a forward bridge ("See the details"→#faq or "Start your booking") so the full-display "Begin Your Story" is unique to the #book h2; standardize on shared `CTAButton`; clarify or drop the "Royal Favourite" ribbon; decide stars-vs-aggregate (#8).

**FAQ.** Light section — mainly inherits the global fixes (✦ de-ornament, `--fg-3` AA). It's the last reassurance beat before the form; keep it tight and let it hand off into the booking crescendo.

**Lead-in to booking (form untouched).** Add the **crescendo** above the #book h2: GoldRule + a small scale/spacing step so the page visibly *steps down into* the form as its arrival point — not a flat landing. Every primary CTA on the page should already be pointing here.

---

## 4. Specific UI/UX Fixes (concrete)

- **758:** `text-ink-800/90 [text-shadow:0_1px_10px_rgba(255,255,255,0.6)]` → a light-on-ink token at /85, shadow `0 1px 8px rgba(8,12,24,0.5)`.
- **228:** `object-[68%_38%]` → `object-[52%_42%]` (desktop), `object-[50%_32%]` <640px.
- **236-238:** wash → `linear-gradient(100deg, rgba(255,248,251,0.94) 0%, rgba(255,248,251,0.8) 34%, rgba(255,248,251,0.42) 56%, transparent 80%)`.
- **291 / 303 / 304(magenta span) / 309 / 337:** add `textShadow:'0 1px 14px rgba(255,255,255,0.85)'`.
- **132:** `--fg-3` #6B7E94 → ~#586A80.
- **697 / 706:** seam 0% stop #F2ECE2 → #FDF4F8 (keep 8% #E3DBE9).
- **177 / styles.css:744:** `.watch-ring` → hover/focus-only or finite iterations.
- **603/613/623:** aurora alphas 0.5/0.42/0.4 → ~0.26/0.22/0.20; `rgba(168,196,235,0.4)` → `rgba(208,178,214,0.22)`.
- **FairyGodmother.tsx:325-327:** `Link to="/princess-events" search={{guest:m.name}} hash="book"`.
- **RoyalInvitation.tsx:164-165:** `CTAButton href="#book"`.
- **styles.css:1247-1259:** `@media (hover:none){ .cardx-extra{max-height:240px;opacity:1} .cardx{width:124px} }`; wrap the width-grow magic in `@media (hover:hover)`; add bottom padding to the last door zone.
- **Section.tsx:109:** strip ✦…✦ from the Eyebrow default; pass a prop only for peak sections.
- **838 / 855:** primary CTA → `href="#book"`; existing /pricing,/gallery → ghost.
- **968 (above):** insert GoldRule + scale step (booking crescendo).

---

## 5. Animation & Interaction Improvements
- **Pause Royal Court `.card-sway` off-screen + drop permanent `will-change:transform`** on 20+ nodes (styles.css:1210-1215) — reuse KingdomDoors' per-zone IntersectionObserver with a ~200px rootMargin. Biggest battery win; most of the sway is never seen.
- **One infinite pulse in the hero:** `cta-pulse` on the gold primary; `.watch-ring` on hover/focus.
- **Card expand animates non-composited `width`** (1227-1244) — move to `transform:scale()` if the portrait aspect allows, else leave a `// ponytail:` note explaining width preserves aspect.
- **Thin the #what-happens ambient layer** (2 auroras not 3, drop duplicated petals/manual sparkles) so the functional scroll-timeline motion leads.
- **Add per-section PETAL variety** (a second positions array) so the same choreography doesn't visibly repeat hero→timeline→booking. Deterministic / SSR-safe.
- **Add a rest-state door affordance** (subtle lift + cursor + "tap to meet" cue) so the signature interaction is discoverable.
- **Preserve the architecture:** single reduced-motion guard + JS matchMedia guards + lazy mount-on-open video. Do not fragment.

## 6. Mobile-Specific Improvements
- **Reveal `.cardx-extra` on `@media (hover:none)`** — restores gown/welcome/per-card Book Now on the device most parents use. Pair with bottom-zone padding (taller cards mustn't clip the seam).
- **Rescue the castle on portrait** — `object-[50%_32%]` + a lighter vertical-biased wash <640px so the hero subject is actually visible.
- **Cut compositor cost** — `@media (max-width:640px){ .aurora{display:none} }` (verify the section background gradients carry the color alone — reconcile with the desktop alpha-halving so there's ONE coherent aurora rule), thin petals to 3, gate the 6 portal videos to `(hover:hover) and (min-width:1024px)` (poster still renders the doorway).
- **Above-fold density** — lower "Princess" script floor to 2.9rem; bump SectionHeading h2 to ~2.05rem/weight 700 so titles dominate descriptions.
- **Tap ergonomics** — FairyGodmother chips py-3/gap-3 (~44px); hero ghost `bg-white/80` + gold border so it doesn't read disabled over the pale wash.
- Optionally `h-[820px]` seams → `h-[560px] md:h-[820px]` so kingdoms arrive sooner on a 390px scroll.

## 7. Conversion Improvements
- **One rule:** every PRIMARY CTA targets the on-page `#book` form with guest prefill; every browse link (/pricing, /gallery) stays a quieter ghost.
- **Fix the two off-page leaks first** (FairyGodmother, RoyalInvitation) — they abandon warm leads at peak intent; mirror the proven KingdomDoors prefill+glide.
- **Give high-intent sections a booking exit, not only a browse exit** — Pricing and Real-Moments each get a primary "Begin Your Story"→#book.
- **Quiet hero on-ramp** ("Ready now? Begin your story →" #book) without flattening the primary/ghost hierarchy.
- **Capture video-end intent** — a small gold "Begin Your Story →" (closes modal, → #book) inside both reel modals.
- **Resolve the duplicate "Begin Your Story" false bottom** — reviews CTA becomes a forward bridge; #book h2 owns the canonical phrase; standardize on `CTAButton` so the booking signature is recognizable everywhere.
- **Build the visual crescendo into #book** (GoldRule + scale step) so the page's arrival point is unmistakable.
- **Do NOT add a floating sticky book-bar** — the sticky Header already provides a persistent #book path; just verify it stays visible over the dark Royal Court.

---

## 8. Implementation Plan — Phases

**Phase 1 — Trust & conversion repairs (highest impact-per-effort, mostly 1-few-line edits).**
Stop the page hurting trust / leaking conversions.
- Fix the navy-on-navy trust line (#1).
- Re-route both off-page CTAs → #book prefill (#2).
- Repair hero focal point + legibility incl. the magenta span (#5).
- Darken `--fg-3` to AA (#6).
- Booking on-ramps on Pricing/Real-Moments/hero (#9).
- Relabel/hide the duplicate placeholder reel (#4, code/copy part).
- Build the crescendo into #book (#12).

**Phase 2 — Premium polish & palette (S/M).** Make it feel couture, not templated.
- De-ornament ✦…✦ to 2-3 peaks (#10).
- Fix both Court seams to blush-white (#11).
- De-conflict hero pulses; rebalance/warm auroras (#13, #14).
- Resolve duplicate "Begin Your Story" + standardize CTAButton (#15).
- Reveal Royal Court detail on touch + bottom-padding (#3).
- Desktop card discoverability cue (#7).
- Aggregate social proof + "Vetted & Insured" — **[D] real claims only** (#8).
- Edge/gutter/width/heading-gap alignment (#22); "Royal Favourite" meaning (#23).

**Phase 3 — Performance, mobile & a11y (S/M).** Protect scroll/battery on the dominant device.
- Pause off-screen card-sway + drop permanent will-change (#16).
- Cut mobile compositor/media cost — one coherent aurora rule, thin petals, gate videos (#17).
- Mobile hero object-position + portrait wash + script floor (#18).
- Mobile heading tier + tap targets (#21).
- Matchmaker a11y; video-end booking CTA.

**Phase 4 — Content & systemic (M/L, partly content/data-blocked).** Make "real / no stock photos" literally true.
- Replace the Coronation prop with a real child being crowned — **[C]**, highest *emotional* item (#19).
- Diversify proof imagery: 6 distinct child-facing photos, own reel still — **[C]** (#24).
- Rewrite the hero subhead in the storybook voice (#20).
- Tokenize card radii, unify corner brackets, consolidate redundant trust chips (#25).

---

### Two things that need *you*, not code
- **[D] Social proof numbers** — give me a real rating / family count / "since 20XX" and whether performers are vetted/insured. I won't invent these.
- **[C] Real photography + party-footage reel** — the single biggest emotional upgrade (especially the Coronation). Everything else ships without it; this makes the "no stock photos" promise true.

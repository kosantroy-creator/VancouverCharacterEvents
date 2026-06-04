# Vancouver Character Events — Website Build Plan

A premium "storybook" website built directly on your Drive design system. Ink (midnight navy) + champagne gold is the constant umbrella identity; each service category is a "chapter" with one jewel accent. Clear first, magical second. Tagline: **"Choose your chapter. Bring the story to life."**

## Foundation: design system

- Port `colors_and_type.css` tokens into `src/styles.css` as the source of truth: ink/gold/cream palettes, the 7 chapter jewel accents, semantic roles, spacing (8px rhythm), radii, shadows, the signature gold glow, gradients, and motion easings — all in oklch/hex per the file.
- Load fonts: **Cinzel** (engraved caps/eyebrows/chapter names), **Cormorant Garamond** (magical display headlines), **Mulish** (body & UI).
- Map tokens to Tailwind v4 theme so semantic classes (`bg-ink`, `text-gold`, chapter accents, etc.) are available — no hardcoded colors in components.
- Import brand assets from Drive into `src/assets/`: `logo-primary.png`, the 6 per-chapter medallions (princess, hero, dinosaur, mermaid/mascot, holiday, corporate) + `main.png`. These are used as-is, never redrawn.
- Global rules from the system: gold used sparingly, gold focus rings on all interactive elements, `prefers-reduced-motion` respected, no emoji, no copyrighted/Disney references.

## Imagery

AI-generated magical visuals (per your choice): a cinematic Vancouver night-sky hero scene (mountains, Lions Gate bridge, stars, glowing storybook), and atmospheric placeholders for chapter heroes, featured experiences, and gallery cards. All wired so real event photos can be swapped in later by replacing the image file.

## Reusable components

`SectionWrapper`, `Eyebrow`, `GoldRule` (divider with central star), `CTAButton` (primary gold / ghost variants), `Header` (sticky, logo + nav + Book Now + mobile menu), `Footer`, `Hero`, `ChapterCard`, `EventTypeCard`, `FeatureCard`, `TrustBar`, `GalleryGrid`, `ProcessSteps`, `FaqAccordion`, `BookingForm`, and a `ServicePageTemplate` that drives all 7 chapter pages.

## Routes (TanStack file-based, each with own SEO head)

```
/                  Home (umbrella brand)
/princess-events   /hero-events     /dinosaur-events
/mermaid-events    /mascot-events   /holiday-events
/corporate-events  (planner-focused variant)
/gallery           /about           /contact (Book Now)
```

Header nav: Princesses · Heroes · Dinosaurs · Mermaids · Mascots · Holidays · Corporate · Gallery + **Book Now** button. Each chapter gets its jewel accent while keeping ink+gold identity.

## Homepage sections

1. **Hero** (ink night sky) — "Premium Character Events Across Metro Vancouver", sub, primary "Book an Experience" + ghost "Explore Characters", service-area trust line.
2. **Trust strip** — Birthdays · Schools · Malls & Festivals · Corporate · Holiday.
3. **Choose Your Chapter** — 7 jewel-accented chapter cards (medallion + title + description + CTA).
4. **Why Vancouver Character Events** — "More Than a Character Visit" + proof points.
5. **Event Types** — 6 audience cards (birthdays, schools/daycares, malls, festivals, corporate, holiday).
6. **Featured Experiences** — 3 rich cards (Fairytale, Dinosaur, Corporate & Holiday).
7. **Gallery Preview** — placeholder grid + "View the Gallery".
8. **Simple Booking Process** — 3 steps.
9. **Service Area** — Metro Vancouver cities, SEO-friendly.
10. **Final CTA + Booking Form** — two paths (Family vs Corporate/School/Mall) + inquiry form.

## Service page template (all 7 chapters)

Service hero (title, emotional headline, description, CTA + back-to-chapters) → What This Experience Is → Best For (badges) → What's Included → Experience Options (Classic / Deluxe / Premium — "Inquire for Availability", no prices) → Gallery preview → 4 FAQs → Final CTA. Each page carries its chapter jewel accent. **Corporate** gets a more planner/professional tone and the line "For event planners who cannot afford a bad event."

## Other pages

- **Gallery** — filter tabs (All + 7 categories) over a placeholder image grid.
- **About** — concise local/premium brand story.
- **Contact / Book Now** — headline, booking form, contact placeholders, service-area reminder, "what happens next".

## Booking form

Fields: name, email, phone, event date, event city, event type, character/experience interest, guest count, message. Submit → **front-end success message only** (no backend yet), accessible labels and gold focus states. Easy to wire to Cloud later.

## Content & quality

Polished real placeholder copy (no lorem), warm + premium voice, semantic headings, mobile-first responsive layout, subtle motion only, alternating parchment/ink section bands for the storybook rhythm.

---

### Technical notes
- Tokens live in `src/styles.css` via `@theme` (Tailwind v4, oklch where applicable); shadcn token mapping preserved.
- Brand PNGs copied from Drive into `src/assets/` and imported as ES modules.
- AI hero/section images generated into `src/assets/` (jpg for scenes).
- Routes under `src/routes/` with per-route `head()` metadata (title/description/og); chapter & gallery leaf routes get og:image.
- No backend in this build; form is presentational with local success state.

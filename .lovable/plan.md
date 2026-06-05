## Homepage & header refinements

### 1. Header navigation (`src/components/site/Header.tsx`)
Replace the current flat nav (which uses short labels like "Princesses") with the explicit set, placed between the logo (left) and the "Book Now" button (right):

- Princess Events → `/princess-events`
- Hero Events → `/hero-events`
- Dinosaur Events → `/dinosaur-events`
- Specialty Events → **dropdown** containing:
  - Mermaid Events → `/mermaid-events`
  - Specialty Characters → `/holiday-events`
- Mascot Events → `/mascot-events`
- Corporate Events → `/corporate-events`

Implementation: build a small dropdown for "Specialty Events" using the existing `DropdownMenu` UI component (desktop hover/click). In the mobile menu, render Specialty's two children as indented sub-items. Gallery link can move into the mobile menu / stay as a secondary item so the primary 6 read cleanly. Nav data will be defined locally in the header rather than driven by `navChapters` short labels.

### 2. Hero intro + animated medallion marquee (`src/components/site/Hero.tsx`)
- Remove the "One Company. Endless Adventures." headline block.
- Keep "Premium Character Entertainment · Metro Vancouver" eyebrow and move it a bit higher (reduce top padding).
- Directly beneath it, add a **continuous marquee** of the 7 round chapter medallions (from `storybookWorlds`/`chapters`) sliding horizontally across, looping seamlessly. Respects `prefers-reduced-motion` (falls back to a static centered row).
- Add the marquee keyframes to `src/styles.css` (a `marquee-x` animation; duplicate the medallion list for a seamless loop).

### 3. Storybook chapters — slower open, accent background, glow (`src/components/site/StorybookWorlds.tsx`)
- **Open later/slower:** widen the scroll range that drives `progress` (e.g. start opening when the book top is near ~70% of viewport and finish near ~15%), so each book opens more gradually as the user scrolls.
- **Accent background behind each book:** the area revealed behind/around the opening cover becomes that chapter's main color (its blue/jewel accent via `var(--chapter-...)`), not cream. The inner spread can keep its parchment pages, but the surrounding panel/backing uses the chapter accent.
- **Glow on open:** as a book reaches its opened state, intensify the ambient aura (stronger blur + opacity + a soft `box-shadow` glow tinted with the chapter accent), so it visibly glows when fully open.

### 4. Replace "Featured Adventures" with 3-tier pricing (`src/routes/index.tsx`, new pricing data)
Remove the entire Featured Adventures `Section` (and the now-unused `FeatureCard` + featured image imports). Add a new pricing section with three cards:

```text
Single Character — 1 hour          $288   (+$148 per additional character)
Premium — 1.5 hours                $388   (+$198 per additional character)
Custom Package — 3+ characters     Custom
```

- Each card has a "Book this" button linking to the booking form (`#booking-form`) / contact.
- Pricing data added to `src/lib/site-data.ts` (a `pricingTiers` array). Styled with the storybook design tokens; middle tier marked as the featured/most-popular tier.

### 5. Trim Real Event Moments to 8 (`src/routes/index.tsx`)
Remove one item from `galleryPreview` so the grid shows 8 instead of 9 (drop "School assemblies").

### 6. Animate "How It Works" (`src/components/site/ProcessSteps.tsx`)
Add a scroll-triggered staggered reveal (fade + slide up) to the four step cards using an `IntersectionObserver` (same pattern as `TrustBar`), with a `prefers-reduced-motion` fallback that shows them immediately.

---

### Technical notes
- New CSS: `@keyframes marquee-x` for the medallion strip; chapter-accent glow handled inline via `var(--chapter-{accent})`.
- Header dropdown reuses `src/components/ui/dropdown-menu.tsx` (already in project).
- No backend/data-model changes; all work is frontend/presentation plus two small additions to `site-data.ts` (`pricingTiers`).
- Files touched: `Header.tsx`, `Hero.tsx`, `StorybookWorlds.tsx`, `ProcessSteps.tsx`, `routes/index.tsx`, `lib/site-data.ts`, `styles.css`.

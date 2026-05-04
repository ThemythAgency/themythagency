## Goal

Finish the polish pass so every button across the site has the gold-invert hover, every remaining static element gets subtle motion, and route transitions feel intentional and smooth.

## 1. Hover coverage — every button uses an invert utility

Audit shows a few interactive elements still missing the standard hover treatment:

- **`src/components/Navbar.tsx`** — mobile menu toggle (`<button>` for Menu/X) and the typewriter logo wrap: add `btn-hover-invert`-style classes (icon-only) and a `whileHover` scale.
- **`src/pages/Index.tsx`** (line ~279) — overlay project button: confirm it uses `btn-hover-invert`; add `btn-arrow` to its icon if missing.
- **`src/pages/Portfolio.tsx`** (line ~139) — project card overlay button: same treatment.
- **`src/components/ProjectDetailModal.tsx`** (line ~34) — close button: apply `btn-hover-invert` so it swaps to gold/navy on hover.
- **`src/pages/Blog.tsx`** — category filter pills: extend the active/inactive states so inactive pills hover into gold bg + navy text (still using `motion.button`).
- **`src/pages/BlogPost.tsx`** — "Back to Blog" links (top + bottom): keep the underline-free style but add `hover:text-accent hover:-translate-x-0.5` motion; also retarget the in-content `.blog-cta-button` so it inverts to gold/navy on hover (currently goes to `navy-light`).
- **`src/components/Footer.tsx`** — confirm nav/social already lift; no change needed.

All CSS hover swaps remain gated by the existing `@media (hover: hover) and (pointer: fine)` block so touch devices stay clean.

## 2. Motion on remaining static elements

Add `whileInView` reveals + light hover micro-interactions where sections currently render statically:

- **`src/components/PortfolioFAQ.tsx`** — stagger accordion items in on scroll; on hover, nudge the trigger row right by 2px and tint the chevron gold.
- **`src/components/Testimonials.tsx`** — already lifts on hover; add a staggered `whileInView` container so cards rise in sequence.
- **`src/components/WhyWorkWithUs.tsx`** — stagger the rows in; on hover shift the icon 4px right.
- **`src/components/AreasOfExpertise.tsx`** — stagger cards in; rotate the icon container 6° on group hover.
- **`src/pages/Services.tsx`** — animate the dark "package" card (line ~151) with a `whileInView` fade-up and a subtle gold ring on hover.
- **`src/pages/Audit.tsx`** — animate the deliverables list rows (lines 178, 268) with staggered slide-in; tint border gold on hover.
- **`src/pages/About.tsx`** — animate the value rows (line 139) the same way.
- **`src/pages/Contact.tsx`** — focus state on inputs already pulses border; add a soft `bg-card → bg-secondary/40` shift on focus and a `whileInView` fade-up on the info card (line 291).
- **`src/pages/CaseStudies.tsx`** — confirm CTA section (line 144) has the standard `whileInView` headline + button stagger.

All animations use the project's standard easing `[0.22, 1, 0.36, 1]`, ~0.6s duration, `viewport={{ once: true, margin: "-60px" }}`, with `staggerChildren: 0.08–0.12`. Respect `prefers-reduced-motion` (already handled globally in `index.css`).

## 3. Smoother route transitions

Refine `src/components/PageTransition.tsx` and `src/components/RouteProgress.tsx` so navigation feels like one continuous motion:

- **PageTransition**: shorten exit to `duration: 0.32`, soften enter blur to `4px`, and shift `y` from `24 → 16` so content settles faster without feeling abrupt.
- **RouteProgress**: hold the gold bar at 90% during navigation, then snap to 100% + fade out on the new route mount (currently it can finish before the new page paints).
- **Scroll**: keep `ScrollToTop` but switch to `behavior: "instant"` so the new page appears at the top in sync with the fade-in (no double-motion).
- **Reduced motion**: keep the existing simple opacity-only branch.

## 4. End-to-end QA (after edits)

Walk every route at desktop (1440) and mobile (390) viewports using the browser tools:
- `/`, `/about`, `/services`, `/portfolio`, `/case-studies`, `/audit`, `/contact`, `/blog`, `/blog/:slug`, `/404`.
- For each: confirm hero animates, scroll reveals fire once, every primary/outline/gold/ghost button inverts to gold-on-navy (or navy-on-gold) on hover, cards lift, and the route progress bar appears on navigation.
- Capture screenshots of any visual regression and fix before reporting done.

## Technical details

- No schema or backend changes.
- Files touched: `Navbar.tsx`, `PageTransition.tsx`, `RouteProgress.tsx`, `ScrollToTop.tsx`, `BlogSection.tsx` (verify), `ProjectDetailModal.tsx`, `PortfolioFAQ.tsx`, `Testimonials.tsx`, `WhyWorkWithUs.tsx`, `AreasOfExpertise.tsx`, and pages `Index.tsx`, `Portfolio.tsx`, `Blog.tsx`, `BlogPost.tsx`, `Services.tsx`, `Audit.tsx`, `About.tsx`, `Contact.tsx`, `CaseStudies.tsx`.
- No new dependencies — uses existing `framer-motion` + Tailwind utilities + the `btn-hover-invert` / `card-hover` classes already defined in `index.css`.

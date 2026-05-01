## Goal

Polish the entire site's interaction layer: every button has a clear hover, solid buttons invert to gold background + navy text on hover, hover effects don't fight touch on mobile, page transitions feel more premium, and any remaining static element gets subtle motion.

## 1. Button hover color inversion (global, in `src/index.css`)

Rework the four button utilities so solid buttons "swap" colors on hover (gold bg + navy text), matching the landing page accent.

- `.btn-primary` (currently navy bg / white text)
  - Hover: `background: hsl(var(--gold))`, `color: hsl(var(--navy))`, keep lift + shadow.
- `.btn-gold` (currently gold bg / navy text)
  - Hover: `background: hsl(var(--navy))`, `color: hsl(var(--warm-white))` (vice-versa), keep lift + shadow.
- `.btn-outline` (light-bg outline)
  - Hover: fill with gold (`background: hsl(var(--gold))`), text becomes navy, border becomes gold. Lift + shadow.
- `.btn-ghost-light` (used on dark sections like footer/CTA)
  - Hover: gold fill, navy text, gold border. Lift + shadow.
- Add `transition: background-color, color, border-color, transform, box-shadow 300ms ease`.
- Add `:focus-visible` ring using `--ring` so keyboard users see the same affordance.

Also add a generic `.btn-hover-invert` utility that any one-off `<button>` (e.g. form submits, modal close) can use to get the same gold-invert behaviour without duplicating styles.

## 2. Gate hover effects to devices that actually hover

Wrap all hover-only visual effects (lift, shadow, scale, gold fills, gradient overlays, "slide on hover" arrows, card-hover, image zoom, etc.) in:

```css
@media (hover: hover) and (pointer: fine) { ... }
```

Apply this in `src/index.css` for: `.btn-primary:hover`, `.btn-outline:hover`, `.btn-gold:hover`, `.btn-ghost-light:hover`, `.card-hover:hover`, `.btn-arrow` translate rule, and the new `.btn-hover-invert:hover`.

For Framer Motion `whileHover` props, this is already a no-op on touch (touch never fires hover), but to be safe add a small `useHasHover()` hook in `src/hooks/use-has-hover.ts` and use it to conditionally pass `whileHover` on the most prominent interactive elements (project cards on `Index`, `Portfolio`, blog cards). On touch devices we instead apply `whileTap={{ scale: 0.98 }}` so taps still feel responsive.

## 3. Cover every button with a hover

Audit each page and ensure every `<button>` / `<Link>` styled as a button has one of the four utility classes (or `.btn-hover-invert`):

- `src/pages/Index.tsx` — hero CTAs, "View All Projects", final CTA, project overlay "Details" / "Preview" buttons (add `.btn-hover-invert`).
- `src/pages/About.tsx`, `Services.tsx`, `Portfolio.tsx`, `CaseStudies.tsx`, `Audit.tsx`, `Contact.tsx`, `Blog.tsx`, `BlogPost.tsx`, `NotFound.tsx` — all CTAs, filter chips, "Load more", form submit, "Back to blog".
- `src/components/Navbar.tsx` — "Book an Audit" CTA (already `.btn-primary`, will inherit invert), mobile menu toggle gets `hover:text-accent`.
- `src/components/Footer.tsx` — newsletter submit, social icons.
- `src/components/PortfolioFAQ.tsx` — accordion triggers get `hover:text-accent`.
- `src/components/WhatsAppButton.tsx` — already custom, add `.btn-hover-invert` style hover (gold→navy swap not appropriate here; instead `hover:scale-110 hover:shadow-2xl`).
- `src/components/ProjectDetailModal.tsx` — close button + any CTA inside.

## 4. Smoother, more polished page transitions

Upgrade `src/components/PageTransition.tsx`:

- Replace single fade+slide with a layered transition:
  - Container: `opacity 0 → 1`, `y: 24 → 0`, `filter: blur(6px) → blur(0)`.
  - Duration `0.55s`, ease `[0.22, 1, 0.36, 1]`.
  - `exit`: `opacity: 0`, `y: -12`, `filter: blur(4px)`, duration `0.35s`.
- Add a thin gold progress bar overlay (`fixed top-0`, `h-[2px]`, `bg-accent`) that animates `scaleX 0 → 1 → 0` on each route change using `useLocation()` + a small state in `App.tsx`. Gives a clear "page is changing" cue.
- Respect `prefers-reduced-motion`: if reduced, skip blur and use a simple 200ms fade.

## 5. Animate remaining static elements

Sweep components that still render statically and add motion:

- `src/components/Footer.tsx` — fade-up the columns with stagger on scroll into view; gold underline grow on link hover.
- `src/components/CountingNumbers.tsx` — confirm in-view trigger; add a soft `scale 0.95 → 1` reveal on each stat block.
- `src/components/PortfolioFAQ.tsx` — stagger fade-up on accordion items; chevron rotate already comes from Radix, leave alone.
- `src/components/ProjectDetailModal.tsx` — overlay fade + content `scale 0.96 → 1` enter/exit.
- `src/components/MonogramLogo.tsx` (header + footer) — subtle continuous `rotate [-2, 2]` micro-animation, paused on hover; respects reduced motion.
- `src/pages/Index.tsx` — the philosophy quote block already lifts on hover; add a one-time `opacity` fade-in for the quote characters using `whileInView`.
- `src/pages/About.tsx`, `Services.tsx`, `Audit.tsx`, `CaseStudies.tsx`, `Contact.tsx`, `Blog.tsx`, `BlogPost.tsx` — wrap remaining static `<section>` children in `motion.div` with the shared `fadeUp` helper so every block reveals on scroll. Keep stagger small (`0.08s`) to avoid feeling slow.

## 6. Manual end-to-end QA pass (after changes)

Using browser tools at desktop (1366×768) and mobile (390×844):
1. Navigate `/`, `/about`, `/services`, `/portfolio`, `/case-studies`, `/audit`, `/blog`, `/blog/:slug`, `/contact`, `/404`.
2. On desktop: hover every button, card, nav link, social icon — confirm gold-invert, lift, and arrow-slide all fire.
3. On mobile viewport: tap the same elements — confirm no lingering hover styles, tap feedback (`whileTap` scale) is visible, no layout shift.
4. Verify blog section on `/` shows 3 cards on top + 2 editorial below.
5. Verify route changes show the gold progress bar and blur fade.
6. Capture a screenshot of `/` desktop + mobile after the work to confirm visually.

## Technical notes

- All button color inversion happens via CSS custom-properties already in `:root` (`--gold`, `--navy`, `--warm-white`), so no Tailwind config change is required.
- `useHasHover()` will use `window.matchMedia('(hover: hover) and (pointer: fine)')` with an effect + listener.
- The progress-bar element is rendered once at the `App` level so it survives route changes.
- No new dependencies; framer-motion + tailwindcss-animate already installed.

## Out of scope

- No content changes to copy, blog data, or portfolio data.
- No backend / Supabase changes.
- No restructuring of the blog section layout (already 3 + 2 as required).

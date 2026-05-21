
This is a large multi-feature request. Here's the plan, grouped by area. I'll execute it in this order after you approve.

## 1. Email notifications to official.themythagency@gmail.com

Set up Lovable's built-in email system (your own sender subdomain, e.g. `notify.themythagency.com`) and create a transactional email function that fires on every new `contact_inquiries` and `chat_messages` row, sending a branded notification to `official.themythagency@gmail.com`.

- Requires: setting up an email sender domain (one-click dialog, you'll need DNS access to themythagency.com).
- Then: scaffold transactional emails + add two database triggers that enqueue an email on insert.
- If you'd rather not set up a domain right now, fallback: use the Gmail connector (sends from your Gmail directly). Let me know.

## 2. Admin Inbox page (`/admin/inbox`)

- Protected route (requires login; first signup = admin).
- Two tabs: **Live Chat** and **Contact Inquiries**.
- Search, filter, sort by date, mark-as-read.
- Reply box for chat messages (replies stored in a new `chat_replies` table, shown to the visitor in their chat window in realtime).
- New tables: `profiles`, `user_roles` (with `has_role` security-definer fn), `chat_conversations`, `chat_replies`, `inquiry_status`.

## 3. Live chat: real chat-room experience (Shopify-style)

- Convert `chat_messages` into a conversation model: `chat_conversations` (visitor session) + `chat_messages` (both sides, with `sender` = visitor/admin).
- Visitor identified by a localStorage `visitor_id` so they see history on return.
- Realtime via Supabase Realtime: visitor sees admin replies live; admin sees new messages live.
- Typing indicators via Realtime Presence/broadcast (both directions).
- Read receipts (last-seen timestamp per side).
- Widget redesigned as a scrollable chat thread with input pinned at bottom, header showing online status.

## 4. Push notifications for new messages/inquiries

- Browser Web Push (works on desktop + Android; iOS Safari supported when site is added to home screen).
- Service worker + VAPID keys, subscriptions stored in `push_subscriptions`.
- Edge function triggered by DB webhook (or invoked by trigger) sends push to all admin subscriptions on new chat message / inquiry.
- Admin enables notifications from the inbox page.

## 5. Hero section overhaul

- Replace the 3D dashboard with an **interactive shuffleable card stack**: 6–8 draggable cards (KPIs, mini-charts, brand logos) the user can drag, throw, and re-stack. Double-tap/double-click = auto-shuffle animation. Works with mouse AND touch (Framer Motion `drag` + pointer events).
- Mobile-friendly spotlight/tilt: use device orientation API on touch (with permission prompt) + touch-move fallback for the spotlight glow, so the magic works on phones.

## 6. Scroll button → smooth scroll to next section

Click on the hero "Scroll" indicator scrolls smoothly to the section immediately after the hero.

## 7. Section overlay/stacking scroll effect (appart.agency style)

Each major section on the homepage becomes `position: sticky` with its own scroll-driven scale/opacity, so sections stack and reveal as you scroll (the classic "cards stacking" effect).

## 8. Tech Stack section fixes

- Add: n8n, Google, Pinterest, Semrush.
- Replace Klaviyo icon with correct one (current simple-icons slug is wrong/missing on some CDNs — will use the official SVG).
- Remove the entrance blur (kill `filter: blur(8px)` on the marquee fade-in).

## 9. WhatsApp icon on WhatsApp button

Swap the current generic icon for the official WhatsApp glyph so it's visually distinct from the chat bubble (which stays on the live chat FAB on the left).

## 10. Loading speed improvements

- Convert hero + section background JPGs to AVIF/WebP via `vite-imagetools` and add `<link rel="preload">` for the LCP image.
- Lazy-load below-the-fold sections (`React.lazy` + `Suspense`) — Portfolio, Testimonials, TechStack, Blog, CTA.
- Defer Framer Motion variants for off-screen components.
- Drop unused Radix UI components from the bundle.
- Add `loading="lazy"` + explicit width/height to every `<img>` to fix CLS.
- Replace external simple-icons CDN with locally bundled SVGs (removes 12+ network requests on the homepage).

---

### Heads up — scope & dependencies

This is roughly 2–3 normal task batches combined. I'll execute in this order and check in after each major group, but a few items need you:

1. **Email domain** — you'll need DNS access to `themythagency.com` (or whichever domain). Setup is a one-click dialog when we get there.
2. **Push notifications on iPhone** — only work when users add the site to their home screen (Apple limitation).
3. **Admin login** — I'll create the auth pages; first signup becomes admin automatically.

Approve the plan and I'll start with #1 (email setup dialog) and proceed top-to-bottom. If you'd rather skip or reorder anything, tell me now.

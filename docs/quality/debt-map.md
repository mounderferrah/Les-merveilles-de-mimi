# Debt Map

Append-only. Add findings here instead of fixing-by-the-way. Each entry: date, area, description, risk level (Low / Medium / High).

---

## Known Issues — 2026-06-20 (initial audit)

### HIGH — Placeholder contact data live in production
- `wa.me/213000000000` — fake phone number in `Footer.tsx`, `CreationLightbox.tsx`, `collection/page.tsx`
- `contact@lesmerveillesdmimi.dz` — unverified email in `Footer.tsx`
- Facebook `href="#"` — no URL in `Footer.tsx`
- **Risk:** Customers clicking WhatsApp reach a non-existent number. Must be updated before real launch.

### HIGH — `/contact` route linked but does not exist
- `Hero.tsx:205` links to `/contact` — this is a 404 in production.
- **Risk:** CTA click on the hero goes nowhere.

### MEDIUM — No test coverage
- Playwright installed, zero test files. No unit tests.
- **Risk:** Any refactor could break a critical user journey silently.
- **Mitigation path:** Add E2E smoke tests for the two CUJs (home load, collection browse).

### MEDIUM — Product catalog hardcoded in components
- `CREATIONS` array defined separately in `collection/page.tsx` and `RibbonGallery.tsx` — two sources of truth that can drift.
- Two creations (Cornes de Gazelle, Makroud aux Dattes) have `images: []` — shown as color-gradient placeholders.
- **Risk:** Inconsistent catalog; missing images hurt conversions.

### MEDIUM — `'use client'` on home page root
- `src/app/page.tsx` is fully client-rendered due to `useState` gate for Preloader.
- **Risk:** No RSC benefits; slightly larger JS bundle; harder to add per-section metadata.

### MEDIUM — Dead dependencies
- `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three`, `@gsap/react`, `gsap` — installed, zero import sites.
- **Risk:** Adds ~450 kB to `node_modules`; could accidentally be imported; version drift.

### LOW — Hero video RAF loop is fragile
- Custom forward-reverse loop using `requestAnimationFrame` + `currentTime` seeking in `Hero.tsx`.
- Hardcoded 150 ms lookahead (`duration - 0.15`). Different video lengths or codec behavior could cause a black-frame flash.
- **Risk:** Visual glitch on video change. Do not modify `Hero.tsx` video logic casually.

### LOW — No `next/font` usage
- Fonts loaded via raw `<link>` tags in `layout.tsx`. No font optimization or preloading via `next/font`.
- **Risk:** Minor FOUT (flash of unstyled text), slightly slower LCP.

### LOW — `clsx` / `tailwind-merge` installed but unused
- Neither utility is imported anywhere. Dead code in `package.json`.

### LOW — `CalligraphyVortex.tsx` is untracked
- `src/components/CalligraphyVortex.tsx` exists on disk but is not imported anywhere and not committed.
- Either commit and use it, or delete it to keep the tree clean.

---

*Add new findings below this line with date prefix.*

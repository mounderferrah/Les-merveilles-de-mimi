<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Les Merveilles de Mimi — Operating Manual

This is a luxury artisan pastry showcase (Next.js 16.2.9 / React 19 / TypeScript strict / Tailwind CSS 4 / Framer Motion 12). Two public routes, no backend, no database — product data is hardcoded in components. The site's purpose is **brand awareness** for a domestic Algerian pastry atelier; the conversion action is a WhatsApp or Instagram DM. See `docs/` for the full picture.

---

## The Loop

Every task — no matter how small — follows this sequence:

1. **Ground** — read `AGENTS.md`, the relevant `docs/` files, and neighboring source files *before* writing anything.
2. **Plan** — for anything beyond a trivial one-liner, state the plan first. Touch `docs/quality/debt-map.md` if the task is near a listed risk zone.
3. **Implement** — small steps; keep the build green after each change.
4. **Verify** — run the real check commands below and prove the change works. Never claim done without evidence.
5. **Encode** — if a mistake could repeat, write the fix into a doc, test, or rule in the same session (use `/encode-lesson`).

---

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server on `localhost:3000` |
| `npm run build` | Production build — **required before every push** |
| `npm run lint` | ESLint (next config) |
| `npx tsc --noEmit` | Type-check (no standalone typecheck script) |

**"Green" = `npm run build` exits 0 AND `npx tsc --noEmit` exits 0.**  
There is no test suite yet; Playwright is installed but unused.

---

## Docs Map

| Task type | Read first |
|---|---|
| Adding a new section / component | `docs/architecture/overview.md`, `docs/conventions/code-style.md` |
| Editing product catalog | `docs/product/prd.md`, `docs/product/critical-user-journeys.md` |
| Anything near a risky area | `docs/quality/debt-map.md` |
| New architectural decision | `docs/architecture/decisions/` |
| Requirements / scope questions | `docs/product/prd.md` |

---

## Architecture As It Is

```
src/
  app/
    layout.tsx          — root layout, Google Fonts, SmoothScroll wrapper
    page.tsx            — home page ('use client' — Preloader gate + section stack)
    globals.css         — Tailwind base + custom utilities
    collection/
      page.tsx          — gallery page: category filter + CreationCard grid + lightbox
  components/
    Preloader.tsx       — entrance animation (AnimatePresence gate)
    Navbar.tsx          — site nav
    Hero.tsx            — full-screen video hero (forward-reverse loop, mouse parallax)
    Story.tsx           — brand story "13 Ans de Douce Tradition"
    Numbers.tsx         — animated counters (13+yr, 1000+clients, 3000+boxes, 100% handmade)
    RibbonGallery.tsx   — 3 infinite-scroll ribbon strips + lightbox
    Signature.tsx       — quote section with circular CSS ornament
    Testimonials.tsx    — auto-rotating testimonial carousel (5 reviews)
    Instagram.tsx       — Instagram CTA section
    Footer.tsx          — contact info, nav, social links
    CreationLightbox.tsx — shared modal: image carousel, keyboard nav, swipe, WhatsApp/IG CTAs
    SmoothScroll.tsx    — Lenis smooth scroll wrapper
public/
  herovid3.mp4          — hero video (~40 MB)
  *.jpg                 — 6 product photos (2 products still missing images)
```

**Data model** (inline, no DB): `Creation { id, name, category, color, description, price, images[] }`. All 8 creations defined in `collection/page.tsx`; 6 of those reused in `RibbonGallery.tsx`.

---

## Rules for New Code

- Follow `docs/conventions/code-style.md` section (b) in **new** files. Match existing patterns only when editing inside a legacy module.
- Inventory existing code before adding anything — reuse, never recreate.
- No new `any`. No new `@ts-ignore` (use `@ts-expect-error` with a comment if truly necessary).
- New user-visible features must extend `docs/product/critical-user-journeys.md`.
- Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.
- Never weaken a gate (lint rule, tsconfig, build step) to make work pass.
- Boy-scout cleanup is **opt-in** — only when explicitly requested.

---

## Legacy Zones — Handle with Care

| Zone | Risk | Safe approach |
|---|---|---|
| `Hero.tsx` video loop | Custom RAF-based forward/reverse — fragile timing around `duration - 0.15s`. | Touch nothing unless the bug is specifically about video playback. |
| `page.tsx` `'use client'` root | Disables RSC for the entire home page. | Accept it; do not try to split into server/client without a deliberate plan. |
| `public/herovid3.mp4` | ~40 MB — do not re-add or duplicate in git. | Keep in `.gitignore`-exempt public; never commit a second copy. |
| Three.js / R3F / GSAP | Installed, fully unused. | Do not add new uses without a feature spec; do not remove without confirming nothing imports them. |
| Placeholder contact data | Phone, email, Facebook URL are placeholders. | Never display them as real; update when real data is provided. |

---

## When Unsure

Stop after **two failed attempts** at the same fix. Ask one concrete question instead of pushing a hack. If a doc conflicts with the code, the doc is likely stale — flag it and propose a doc fix in the same session.

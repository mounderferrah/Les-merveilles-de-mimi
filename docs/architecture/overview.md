# Architecture Overview

## Rendering Model

Next.js 16.2.9 App Router. Static export — all routes prerender at build time (`○ Static` in build output). No API routes. No server-side data fetching.

The entire home page (`src/app/page.tsx`) is `'use client'` because of the `useState`-gated Preloader. This disables React Server Components for every section rendered inside it. The collection page (`src/app/collection/page.tsx`) is also fully client-side.

Smooth scrolling is provided by Lenis (`@studio-freight/lenis`) via `SmoothScroll.tsx` wrapping the root layout body.

## Directory Roles

```
src/app/                 Next.js App Router root
  layout.tsx             HTML shell, Google Fonts (4 families), SmoothScroll, metadata
  page.tsx               Home: Preloader gate → Navbar + 8 sections
  globals.css            Tailwind v4 base + bg-ivory / text-brown utilities
  collection/page.tsx    Gallery: category filter, 8 creations, lightbox

src/components/          All UI — no sub-folders, flat list
  Preloader.tsx          Entrance animation; controlled by `entered` state in page.tsx
  Navbar.tsx             Site navigation
  Hero.tsx               Full-screen video hero (forward+reverse RAF loop, mouse parallax)
  Story.tsx              Brand story copy, parallax background
  Numbers.tsx            Animated counters (setInterval-based)
  RibbonGallery.tsx      3 infinite-scroll strips (Framer Motion x animate), shared lightbox
  Signature.tsx          Quote section, CSS circular ornament
  Testimonials.tsx       Auto-rotating carousel (setInterval, 4.5 s)
  Instagram.tsx          Instagram CTA / feed teaser
  Footer.tsx             Contact, nav, socials
  CreationLightbox.tsx   Shared modal — exports `Creation` interface + `CreationLightbox`
  SmoothScroll.tsx       Lenis wrapper ('use client')

public/
  herovid3.mp4           Hero background video (~40 MB)
  *.jpg                  6 product images (Mkhabez, Thouma, Lamina Lawz, 24 pièces, finesse, Ktayef)
```

## External Services

| Service | How used |
|---|---|
| Google Fonts | Loaded in `layout.tsx` `<head>` via CDN link tags |
| WhatsApp | `wa.me/` deep-link in `CreationLightbox`, `Footer`, `collection/page.tsx`. Number is placeholder. |
| Instagram | Direct link to `@les_merveilles_de_mimi_`. Real handle. |
| Facebook | Footer link — `href="#"` placeholder, no real URL yet. |
| Email | `contact@lesmerveillesdmimi.dz` in Footer — unverified. |

## Entry Points

- `/` → `src/app/page.tsx`
- `/collection` → `src/app/collection/page.tsx`
- `/contact` → linked from Hero CTA but **route does not exist** (404). [inferred — confirm]

## Known Deviations from Target Architecture

| Deviation | Location | Notes |
|---|---|---|
| Business data (product catalog) inside page/component files | `collection/page.tsx`, `RibbonGallery.tsx` | `CREATIONS` array defined inline. Target: separate `src/data/` or CMS. |
| `'use client'` at page root | `page.tsx` | Prevents RSC; caused by Preloader's `useState`. |
| No separation of concerns in components | All components | State, logic, and JSX co-located. No custom hooks extracted. |
| Three.js / R3F / GSAP installed and unused | `package.json` | Dead dependencies. |
| No test suite | — | Playwright installed, zero test files. |
| No environment variables | — | No `.env` files; contact links are hardcoded. |

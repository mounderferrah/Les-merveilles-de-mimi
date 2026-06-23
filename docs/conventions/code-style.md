# Code Style

## (a) Detected Conventions — as the codebase exists today

**File naming:** PascalCase for components (`Hero.tsx`, `RibbonGallery.tsx`). No sub-folders under `src/components/`.

**Component structure:** All components are default exports (except `CreationLightbox` which also named-exports the `Creation` interface and `CreationLightbox` function). Every component is `'use client'`.

**Styling:** Tailwind CSS v4 utility classes exclusively. No CSS Modules, no styled-components, no `className` string builders (no `clsx` or `cn` used in practice despite `clsx` and `tailwind-merge` being installed). Inline `style` props used for dynamic values that Tailwind cannot express (e.g. `fontSize: 'clamp(...)'`, scroll-driven transform values, brand hex colors not in the Tailwind config).

**Animation:** Framer Motion for all motion — `motion.*` elements, `useInView`, `useScroll`, `useTransform`, `useMotionValue`, `useSpring`, `AnimatePresence`. No CSS `@keyframes`. GSAP is installed but unused.

**State:** `useState` + `useEffect` inside components. No global state manager, no context, no Zustand/Redux.

**Data:** Product catalog (`Creation[]`) hardcoded as `const CREATIONS` inside page and component files. No API calls, no CMS.

**Fonts:** Loaded via `<link>` in `layout.tsx` `<head>`. Used through Tailwind `font-serif` / `font-sans` which map to the Google Fonts families. No `next/font`.

**Images:** `next/image` with `fill` + `object-cover`. Aspect ratio set on the wrapper div. Alt text present.

**TypeScript:** Strict mode. Interfaces defined inline or co-located. No barrel files (`index.ts`).

**Commits:** No established Conventional Commits discipline yet (initial commit was freeform).

---

## (b) Target Conventions — for all new code

Follow these in new files. When editing inside an existing legacy module, match pattern (a) to avoid a mixed style in one file.

**TypeScript:** No new `any`. No new `@ts-ignore`. Use `@ts-expect-error // reason` if truly needed. Prefer explicit return types on exported functions.

**Validation at trust boundaries:** Any future user input (form fields, URL params, webhook payloads) must be validated with Zod or equivalent before use — never trust raw `event.target.value` or `searchParams` directly.

**Components:** Keep components presentational where possible. Extract non-trivial logic (data fetching, complex state machines, event orchestration) into a custom hook in the same file or a `hooks/` folder.

**No new module-level singletons for state.** Use React state, context, or a store. Module-level `let` that mutates across renders is forbidden in new files.

**Accessible and designed empty/error states** are part of scope for any new user-facing feature. A loading skeleton or error message is not optional.

**`next/font`** for any new font loading (not raw `<link>` tags).

**Environment variables** for any new external URLs, API keys, or contact data. No hardcoded secrets or contact links in new code. Use `NEXT_PUBLIC_*` for client-visible values and document them in a `.env.example`.

**Conventional Commits** for all new commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.

Where (a) and (b) conflict: **follow (b) in new files; match (a) only when editing inside an existing legacy module.**

'use client';

import { useEffect } from 'react';

// Client-only module flag. It is false during the initial document load (fresh
// visit or refresh) and is flipped true once that first render has committed.
// It resets on every full page load (the module re-evaluates) but survives
// client-side route changes (the module stays in memory). Never touched on the
// server, so SSR is never polluted by it.
let clientNavigated = false;

/**
 * True only during the initial document load.
 *
 * - On the server every render is a full document load, so this returns true.
 * - On the client it returns true during the first (hydration) render, then
 *   false for any page mounted via client-side navigation afterwards.
 *
 * Read it inside a `useState` initializer so the value is captured once at mount.
 */
export function isInitialDocumentLoad(): boolean {
  if (typeof window === 'undefined') return true; // SSR == full document load
  return !clientNavigated;
}

/**
 * Call once from a component that mounts a single time per document load and
 * persists across client navigation (e.g. the i18n provider in the layout).
 * After the initial render commits, every subsequent page mount is a client nav.
 */
export function useMarkInitialLoadComplete(): void {
  useEffect(() => {
    clientNavigated = true;
  }, []);
}

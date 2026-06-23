'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from '@studio-freight/lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null);
  const pathname  = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration:    1.4,
      easing:      (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    // Same-page hash navigation (e.g. already on /, clicking Histoire → /#histoire)
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash) lenis.scrollTo(hash, { duration: 1.2 });
    };
    window.addEventListener('hashchange', handleHash);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  // Runs on every pathname change (cross-page navigations only)
  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      // Cross-page hash navigation (e.g. /collection → /#histoire)
      // Capture the hash now and re-verify at fire time: if the user navigates again
      // before the 350ms window elapses, both /#histoire and / share pathname='/', so
      // the cleanup below never runs. The re-check prevents a stale timer from scrolling.
      const captured = hash;
      const id = setTimeout(() => {
        if (window.location.hash === captured && lenisRef.current) {
          lenisRef.current.scrollTo(captured, { duration: 1.2 });
        }
      }, 350);
      return () => clearTimeout(id);
    } else {
      // No hash — hard-reset Lenis to the top.
      // Lenis is never unmounted (it lives in the root layout), so it can retain a
      // non-zero targetScroll from a previous page visit. Without this reset,
      // navigating back to / after having scrolled to #histoire causes Lenis to
      // animate back to that position the moment the page content mounts.
      const id = setTimeout(() => {
        lenisRef.current?.scrollTo(0, { immediate: true });
      }, 50);
      return () => clearTimeout(id);
    }
  }, [pathname]);

  return <>{children}</>;
}

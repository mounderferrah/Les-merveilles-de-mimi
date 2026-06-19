'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 18, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 18, damping: 28 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId: number;
    let lastTs: number | null = null;
    let reversing = false;

    // ── Reverse phase ────────────────────────────────────────────────────────
    // Only runs after a full forward pass so the entire clip is in the buffer,
    // which makes every currentTime seek effectively instant.
    const reverseStep = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const delta = (ts - lastTs) / 1000;
      lastTs = ts;

      // Tab was hidden — reset clock so we don't jump
      if (delta > 0.1) {
        lastTs = ts;
        rafId = requestAnimationFrame(reverseStep);
        return;
      }

      const next = video.currentTime - delta;

      if (next <= 0.05) {
        // Reverse complete — hand back to native forward playback
        reversing = false;
        video.currentTime = 0;
        lastTs = null;
        video.play().catch((e) =>
          console.error('[Hero] play() after reverse failed:', e)
        );
        return; // RAF stops; play() is now driving
      }

      video.currentTime = next;
      rafId = requestAnimationFrame(reverseStep);
    };

    // ── Forward phase monitor ────────────────────────────────────────────────
    // Intercept 150 ms before the clip ends so we never enter the "ended"
    // state (which can produce a brief black frame on some browsers).
    const onTimeUpdate = () => {
      if (reversing || !video.duration) return;
      if (video.currentTime >= video.duration - 0.15) {
        reversing = true;
        video.pause();
        video.currentTime = video.duration - 0.15;
        lastTs = null;
        rafId = requestAnimationFrame(reverseStep);
      }
    };

    // ── Error & visibility helpers ───────────────────────────────────────────
    const onError = () =>
      console.error(
        '[Hero] Video error — code:',
        video.error?.code,
        'message:',
        video.error?.message
      );

    const onVisibility = () => {
      if (document.visibilityState === 'visible') lastTs = null;
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('error', onError);
    document.addEventListener('visibilitychange', onVisibility);

    // ── Kick off forward playback ────────────────────────────────────────────
    const startForward = () =>
      video.play().catch((e) =>
        console.error('[Hero] Initial play() failed:', e)
      );

    if (video.readyState >= 2) {
      startForward();
    } else {
      video.addEventListener('loadeddata', startForward, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafId);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('error', onError);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden flex items-center justify-center">

      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/herovid3.mp4"
        muted
        playsInline
        preload="auto"
      />

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.15)', backdropFilter: 'blur(1px)' }}
      />

      <motion.div
        className="relative z-10 text-center px-6 select-none"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="w-10 h-px bg-[#FDC921]/60" />
          <span className="font-sans text-[10px] tracking-[0.5em] text-white/50 uppercase">
            Atelier · Depuis 2012
          </span>
          <div className="w-10 h-px bg-[#FDC921]/60" />
        </motion.div>

        <div className="overflow-hidden mb-1">
          <motion.h1
            className="font-serif text-white font-light leading-[0.88] tracking-[0.04em]"
            style={{ fontSize: 'clamp(4rem, 12vw, 13rem)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          >
            Les Merveilles
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-10">
          <motion.h1
            className="font-serif text-white italic font-light leading-[0.88] tracking-[0.08em]"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 9rem)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.56 }}
          >
            de Mimi
          </motion.h1>
        </div>

        <motion.p
          className="font-sans text-white/55 text-sm tracking-[0.22em] uppercase mb-1"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.85 }}
        >
          Traditional Cakes &amp; Fine Pastries
        </motion.p>
        <motion.p
          className="font-sans text-white/35 text-xs tracking-[0.18em] uppercase mb-14"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.95 }}
        >
          Crafted with Passion Since 2012
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 1.1 }}
        >
          <Link
            href="/collection"
            className="group relative inline-flex items-center justify-center px-10 py-[14px] border border-[#FDC921] font-sans text-[11px] tracking-[0.4em] text-white uppercase overflow-hidden hover:shadow-[0_0_28px_rgba(253,201,33,0.35)] transition-shadow duration-500"
          >
            <span className="relative z-10 group-hover:text-[#2E2118] transition-colors duration-500">
              Découvrir la Collection
            </span>
            <span className="absolute inset-0 bg-[#FDC921] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-[14px] border border-white/25 font-sans text-[11px] tracking-[0.4em] text-white/60 uppercase hover:border-white/60 hover:text-white transition-all duration-500"
          >
            Nous Contacter
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 1.8 }}
      >
        <span className="font-sans text-[9px] tracking-[0.5em] text-white/30 uppercase">
          Scroll
        </span>
        <div className="relative w-px h-12 overflow-hidden bg-white/10">
          <motion.div
            className="absolute inset-x-0 bg-white/50"
            style={{ height: '50%', top: 0 }}
            animate={{ top: ['-50%', '150%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
          />
        </div>
      </motion.div>
    </section>
  );
}

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export interface Creation {
  id: number;
  name: string;
  category: string;
  color: string;
  description: string;
  price: string;
  images: string[];
}

function ImageSlot({ src, alt, color }: { src?: string; alt: string; color: string }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, 576px"
        priority
      />
    );
  }
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: `linear-gradient(145deg, ${color}, ${color}88)` }}
    >
      <span className="font-serif text-white/20 text-[4rem]">✦</span>
    </div>
  );
}

const slideVariants = {
  enter: (d: number) => ({ x: d >= 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (d: number) => ({ x: d >= 0 ? '-100%' : '100%', opacity: 0 }),
};

export function CreationLightbox({
  creation,
  onClose,
}: {
  creation: Creation;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const touchX = useRef<number | null>(null);
  const total = creation.images.length;
  const hasImages = total > 0;
  const hasMultiple = total > 1;

  const go = useCallback(
    (next: number) => {
      setDir(next >= idx ? 1 : -1);
      setIdx(next);
    },
    [idx],
  );

  const prev = useCallback(() => go((idx - 1 + total) % total), [go, idx, total]);
  const next = useCallback(() => go((idx + 1) % total), [go, idx, total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && hasMultiple) next();
      if (e.key === 'ArrowLeft'  && hasMultiple) prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, next, prev, hasMultiple]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 44) (dx > 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-[#1A110B]/95 backdrop-blur-2xl" />

      <motion.div
        className="relative z-10 w-full max-w-xl overflow-y-auto"
        style={{ maxHeight: 'calc(100dvh - 5rem)' }}
        initial={{ scale: 0.94, y: 28, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 28, opacity: 0 }}
        transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Carousel ── */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '4/3' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {hasImages ? (
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={idx}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={creation.images[idx]}
                  alt={`${creation.name} — photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 576px"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <ImageSlot src={undefined} alt={creation.name} color={creation.color} />
          )}

          {/* Category */}
          <div className="absolute top-4 left-4 z-10">
            <span className="font-sans text-[9px] tracking-[0.35em] text-white/65 uppercase bg-black/30 backdrop-blur-sm px-3 py-1.5">
              {creation.category}
            </span>
          </div>

          {/* Arrows */}
          {hasMultiple && (
            <>
              <button
                aria-label="Image précédente"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/35 backdrop-blur-sm text-white/65 hover:text-white hover:bg-black/55 transition-all duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 1L3 6l5 5" /></svg>
              </button>
              <button
                aria-label="Image suivante"
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/35 backdrop-blur-sm text-white/65 hover:text-white hover:bg-black/55 transition-all duration-300"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 1l5 5-5 5" /></svg>
              </button>
              <div className="absolute bottom-3 right-4 z-10">
                <span className="font-sans text-[10px] tracking-wider text-white/38">
                  {idx + 1}&thinsp;/&thinsp;{total}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {hasMultiple && (
          <div className="flex gap-2 mt-2">
            {creation.images.map((img, i) => (
              <button
                key={i}
                aria-label={`Photo ${i + 1}`}
                onClick={(e) => { e.stopPropagation(); go(i); }}
                className={`relative flex-shrink-0 w-14 h-14 overflow-hidden transition-all duration-300 ${
                  i === idx ? 'ring-1 ring-[#FDC921] opacity-100' : 'opacity-40 hover:opacity-65'
                }`}
              >
                <Image src={img} alt="" fill className="object-cover" sizes="56px" />
              </button>
            ))}
          </div>
        )}

        {/* ── Details ── */}
        <div className="pt-7 pb-2 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-light text-white mb-3 leading-tight">
            {creation.name}
          </h2>

          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="w-8 h-px bg-[#FDC921]/40" />
            <span className="text-[#FDC921] text-xs">✦</span>
            <div className="w-8 h-px bg-[#FDC921]/40" />
          </div>

          <p className="font-sans text-[13px] text-white/40 leading-[1.95] mb-3 max-w-xs mx-auto">
            {creation.description}
          </p>

          <p className="font-serif italic text-[#C4956A] text-[15px] mb-8">
            Prix indicatif — {creation.price}
          </p>

          <p className="font-sans text-[10px] tracking-[0.4em] text-white/22 uppercase mb-4">
            Cette création vous plaît ?
          </p>

          <div className="flex gap-3">
            <a
              href="https://wa.me/213000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#FDC921] px-5 py-3.5 font-sans text-[10px] tracking-[0.35em] text-[#2E2118] uppercase hover:bg-[#FDD85D] transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/les_merveilles_de_mimi_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 border border-white/18 px-5 py-3.5 font-sans text-[10px] tracking-[0.35em] text-white/50 uppercase hover:border-white/40 hover:text-white/80 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </motion.div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-5 right-5 z-20 w-10 h-10 flex items-center justify-center text-white/35 hover:text-white transition-colors duration-300 border border-white/10 hover:border-white/30"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>
    </motion.div>
  );
}

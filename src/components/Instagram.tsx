'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// 12 placeholder instagram tiles with varied sizes for masonry
const TILES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  tall: i % 3 === 1,
  color: [
    '#C4956A', '#D4A47A', '#B8815A', '#E0B88A',
    '#A87050', '#8B5A3C', '#9B6A4C', '#7A4A2C',
    '#AA7A5C', '#C4956A', '#D4A47A', '#B8815A',
  ][i],
}));

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Instagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 bg-[#FFFDF7] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            className="flex items-center gap-4 justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="w-8 h-px bg-[#FDC921]" />
            <span className="font-sans text-[10px] tracking-[0.5em] text-[#2E2118]/40 uppercase">
              Instagram
            </span>
            <div className="w-8 h-px bg-[#FDC921]" />
          </motion.div>
          <motion.h2
            className="font-serif font-light"
            style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            Nos <span className="italic text-[#FDC921]">Dernières</span> Créations
          </motion.h2>
        </div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {TILES.map((tile, i) => (
            <motion.a
              key={tile.id}
              href="https://www.instagram.com/les_merveilles_de_mimi_"
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="block break-inside-avoid mb-3 group relative overflow-hidden"
              style={{ borderRadius: 2 }}
            >
              {/* Placeholder image */}
              <div
                className="w-full transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${tile.color}, ${tile.color}88)`,
                  height: tile.tall ? '320px' : '200px',
                }}
              >
                {/* Pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      -45deg,
                      transparent,
                      transparent 6px,
                      rgba(255,255,255,0.1) 6px,
                      rgba(255,255,255,0.1) 7px
                    )`,
                  }}
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#2E2118]/0 group-hover:bg-[#2E2118]/50 transition-colors duration-400 flex items-center justify-center">
                <motion.div
                  className="text-white font-serif italic text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                >
                  ✦ Voir sur Instagram
                </motion.div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Instagram CTA */}
        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="https://www.instagram.com/les_merveilles_de_mimi_"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 border border-[#2E2118]/20 px-10 py-4 font-sans text-[11px] tracking-[0.4em] text-[#2E2118] uppercase hover:border-[#FDC921] hover:bg-[#FDC921] transition-all duration-500"
          >
            <span>Nous Suivre sur Instagram</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform duration-300">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

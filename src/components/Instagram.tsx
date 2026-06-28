'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useT } from '@/i18n';

// ── Data ──────────────────────────────────────────────────────────────────────

interface Painting {
  src:     string;
  link:    string;
  isReel?: boolean;
  rotate:  number;
  rotateFrom: number;
  floatDelay: number;
  floatDuration: number;
  delay:   number;
}

const PAINTINGS: Painting[] = [
  {
    src:          '/assets/upper left.jpg',
    link:         'https://www.instagram.com/p/DIWhsuKInDN/',
    rotate:       -2,
    rotateFrom:   -8,
    floatDelay:   0,
    floatDuration: 8,
    delay:        0,
  },
  {
    src:          '/assets/upper center.jpg',
    link:         'https://www.instagram.com/p/DH5YhCxoh9d/',
    rotate:       1,
    rotateFrom:   6,
    floatDelay:   1.4,
    floatDuration: 9.2,
    delay:        0.14,
  },
  {
    src:          '/assets/upper right.jpg',
    link:         'https://www.instagram.com/reel/DGNdA07IgS9/',
    isReel:       true,
    rotate:       -1,
    rotateFrom:   -7,
    floatDelay:   0.7,
    floatDuration: 8.6,
    delay:        0.26,
  },
  {
    src:          '/assets/lower left center.jpg',
    link:         'https://www.instagram.com/reel/DGpRNzLI5uU/',
    isReel:       true,
    rotate:       2,
    rotateFrom:   8,
    floatDelay:   2.1,
    floatDuration: 9.8,
    delay:        0.38,
  },
  {
    src:          '/assets/lower right.jpg',
    link:         'https://www.instagram.com/reel/DWgGGm-iMdQ/',
    isReel:       true,
    rotate:       -1,
    rotateFrom:   -5,
    floatDelay:   0.4,
    floatDuration: 8.3,
    delay:        0.50,
  },
];

const DESKTOP: { top: number; left: string; width: number; height: number; z: number }[] = [
  { top: 40,  left: '2%',  width: 318, height: 384, z: 2 },
  { top: 0,   left: '33%', width: 236, height: 284, z: 1 },
  { top: 28,  left: '59%', width: 346, height: 414, z: 2 },
  { top: 410, left: '18%', width: 308, height: 370, z: 3 },
  { top: 395, left: '57%', width: 310, height: 372, z: 2 },
];

// Mobile collage — percentage positions inside a portrait container so all five
// posts are visible at once (the desktop scatter, scaled down to fit one screen).
const MOBILE: { top: string; left: string; width: string; z: number }[] = [
  { top: '0%',  left: '1%',  width: '46%', z: 2 },
  { top: '5%',  left: '55%', width: '40%', z: 1 },
  { top: '32%', left: '50%', width: '48%', z: 3 },
  { top: '42%', left: '2%',  width: '45%', z: 2 },
  { top: '64%', left: '28%', width: '47%', z: 2 },
];

const SPARKLES = [
  { top: '9%',  left: '6%',  size: 9,  delay: 0    },
  { top: '44%', left: '94%', size: 7,  delay: 0.9  },
  { top: '78%', left: '4%',  size: 11, delay: 1.5  },
  { top: '61%', left: '97%', size: 6,  delay: 0.5  },
  { top: '19%', left: '52%', size: 5,  delay: 1.2  },
  { top: '35%', left: '8%',  size: 7,  delay: 0.3  },
] as const;

// ── Reel play button ───────────────────────────────────────────────────────────

function PlayButton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="flex items-center justify-center rounded-full"
        style={{
          width:           64,
          height:          64,
          background:      'rgba(255,255,255,0.18)',
          backdropFilter:  'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border:          '1px solid rgba(255,255,255,0.25)',
          boxShadow:       '0 15px 40px rgba(0,0,0,0.18)',
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{
          scale:     1.15,
          boxShadow: '0 15px 40px rgba(0,0,0,0.22), 0 0 40px rgba(253,201,33,0.35)',
          transition: { duration: 0.5 },
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true" style={{ marginLeft: 3 }}>
          <path d="M8 5v14l11-7z" />
        </svg>
      </motion.div>
    </div>
  );
}

// ── Single gallery card ────────────────────────────────────────────────────────

function GalleryCard({
  painting,
  pos,
  inView,
}: {
  painting: Painting;
  pos:      { top: number | string; left: string; width: number | string; height?: number; z: number };
  inView:   boolean;
}) {
  const [imgFailed, setImgFailed] = useState(false);

  const positionStyle: React.CSSProperties = {
    position: 'absolute',
    top:      pos.top,
    left:     pos.left,
    width:    pos.width,
    zIndex:   pos.z,
  };

  const shadowBase  = '0 25px 80px rgba(0,0,0,.12)';
  const shadowHover = '0 40px 100px rgba(0,0,0,.22), 0 0 40px rgba(253,201,33,.25)';

  return (
    <motion.div style={positionStyle}>
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: painting.rotateFrom }}
        animate={inView ? { opacity: 1, y: 0, rotate: painting.rotate } : {}}
        transition={{ type: 'spring', stiffness: 90, damping: 18, delay: painting.delay }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: painting.floatDuration, delay: painting.floatDelay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.a
            href={painting.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative group"
            style={{ borderRadius: 28, overflow: 'hidden', boxShadow: shadowBase, display: 'block' }}
            whileHover={{ scale: 1.04, rotate: 0, boxShadow: shadowHover, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          >
            <div
              style={{
                position:    'relative',
                width:       '100%',
                height:      pos.height,
                aspectRatio: pos.height ? undefined : '4 / 5',
              }}
            >
              {!imgFailed ? (
                <Image
                  src={painting.src}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="(max-width: 1024px) 88vw, 360px"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #C4956A28, #C4956A10)' }}
                >
                  <span className="font-serif text-[#C4956A]/25 text-7xl select-none">✦</span>
                </div>
              )}

              {painting.isReel && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,.25), transparent)' }}
                />
              )}

              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 28px rgba(0,0,0,0.09)', borderRadius: 28 }}
              />
              <div className="absolute inset-0 pointer-events-none bg-[#1A110B]/0 group-hover:bg-[#1A110B]/12 transition-colors duration-700" />
            </div>

            {painting.isReel && <PlayButton />}
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function Instagram() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8%' });

  const titleBefore = t('instagram.title.before');
  const titleItalic = t('instagram.title.italic');
  const titleAfter  = t('instagram.title.after');

  return (
    <section ref={ref} className="py-24 md:py-36 bg-[#FFFDF7] overflow-hidden relative">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg,  #2E2118 0, #2E2118 1px, transparent 0, transparent 90px),
              repeating-linear-gradient(90deg, #2E2118 0, #2E2118 1px, transparent 0, transparent 90px)
            `,
          }}
        />
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #FDC921 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #C4956A 0%, transparent 70%)' }}
        />
        {SPARKLES.map((s, i) => (
          <motion.span
            key={i}
            className="absolute font-serif text-[#FDC921] select-none"
            style={{ top: s.top, left: s.left, fontSize: s.size, opacity: 0 }}
            animate={inView ? { opacity: [0, 0.12, 0.05], rotate: [0, 14, 0] } : {}}
            transition={{ duration: 7, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✦
          </motion.span>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            className="flex items-center gap-4 justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="w-8 h-px bg-[#FDC921]" />
            <span className="font-sans text-[10px] tracking-[0.5em] text-[#2E2118]/40 uppercase">
              {t('instagram.label')}
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
            {titleBefore}{titleBefore ? ' ' : ''}
            <span className="italic text-[#FDC921]">{titleItalic}</span>
            {titleAfter ? ` ${titleAfter}` : ''}
          </motion.h2>
        </div>

        {/* Mobile — scaled collage, all five posts visible on one screen */}
        <div className="relative lg:hidden mx-auto w-full max-w-[440px]" style={{ aspectRatio: '10 / 16' }}>
          {PAINTINGS.map((painting, i) => (
            <GalleryCard key={i} painting={painting} pos={MOBILE[i]} inView={inView} />
          ))}
        </div>

        {/* Desktop */}
        <div className="hidden lg:block relative" style={{ height: 856 }}>
          {PAINTINGS.map((painting, i) => (
            <GalleryCard key={i} painting={painting} pos={DESKTOP[i]} inView={inView} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          <a
            href="https://www.instagram.com/les_merveilles_de_mimi_"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 border border-[#2E2118]/20 px-10 py-4 font-sans text-[11px] tracking-[0.4em] text-[#2E2118] uppercase hover:border-[#FDC921] hover:bg-[#FDC921] transition-all duration-500"
          >
            <span>{t('instagram.cta')}</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

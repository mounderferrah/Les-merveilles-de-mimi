'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useT } from '@/i18n';

// Reviews kept in French — authentic customer voices
const reviews = [
  {
    name: 'Amira B.',
    location: 'Alger',
    text: 'Les pâtisseries sont absolument divines. La qualité et le soin apportés à chaque pièce sont incomparables. C\'est un vrai art.',
    stars: 5,
  },
  {
    name: 'Yasmine K.',
    location: 'Oran',
    text: 'J\'ai commandé pour mon mariage et tous mes invités étaient émerveillés. Les gâteaux étaient aussi beaux que délicieux.',
    stars: 5,
  },
  {
    name: 'Nadia M.',
    location: 'Constantine',
    text: 'Un savoir-faire exceptionnel, des saveurs authentiques. Les Merveilles de Mimi est ma référence pour toutes les occasions.',
    stars: 5,
  },
  {
    name: 'Soraya T.',
    location: 'Annaba',
    text: 'La présentation est somptueuse et le goût est à la hauteur. Des pâtisseries qui honorent notre tradition avec raffinement.',
    stars: 5,
  },
  {
    name: 'Fatima R.',
    location: 'Tlemcen',
    text: 'Chaque bouchée est un voyage dans le temps. Un travail artisanal magnifique qui perpétue notre héritage culinaire.',
    stars: 5,
  },
];

export default function Testimonials() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="py-28 md:py-40 px-6 bg-[#FFFDF7] overflow-hidden relative">
      {/* Background text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[#2E2118]/[0.02] select-none pointer-events-none leading-none text-center whitespace-nowrap"
        style={{ fontSize: 'clamp(6rem, 18vw, 18rem)' }}
      >
        {t('testimonials.bg')}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="w-8 h-px bg-[#FDC921]" />
            <span className="font-sans text-[10px] tracking-[0.5em] text-[#2E2118]/40 uppercase">
              {t('testimonials.label')}
            </span>
            <div className="w-8 h-px bg-[#FDC921]" />
          </div>
          <h2
            className="font-serif font-light"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 5rem)' }}
          >
            {t('testimonials.heading.main')}{' '}
            <span className="italic text-[#FDC921]">{t('testimonials.heading.italic')}</span>
          </h2>
        </motion.div>

        {/* Main testimonial card */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="max-w-3xl text-center">
                <div className="font-serif text-[#FDC921] mb-6 leading-none" style={{ fontSize: '5rem' }}>
                  &ldquo;
                </div>

                <p
                  className="font-serif italic text-[#2E2118] leading-relaxed mb-8"
                  style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}
                >
                  {reviews[current].text}
                </p>

                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: reviews[current].stars }).map((_, i) => (
                    <span key={i} className="text-[#FDC921] text-lg">★</span>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-px bg-[#FDC921]/50" />
                  <span className="font-sans text-sm tracking-[0.2em] text-[#2E2118]/60">
                    {reviews[current].name}
                  </span>
                  <span className="text-[#FDC921]/40">·</span>
                  <span className="font-sans text-xs tracking-[0.15em] text-[#2E2118]/40">
                    {reviews[current].location}
                  </span>
                  <div className="w-6 h-px bg-[#FDC921]/50" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots navigation */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              aria-label={`${t('testimonials.dot')} ${i + 1}`}
            >
              <div
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 24 : 6,
                  height: 6,
                  background: i === current ? '#FDC921' : 'rgba(46,33,24,0.15)',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

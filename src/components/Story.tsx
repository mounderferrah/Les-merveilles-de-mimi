'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useT } from '@/i18n';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function Story() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const patternY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      id="histoire"
      ref={ref}
      className="relative py-32 md:py-48 px-6 overflow-hidden bg-[#FFFDF7]"
    >
      {/* Ornamental background pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: patternY }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif font-light text-[#2E2118]/[0.025] select-none text-center leading-none"
          style={{ fontSize: 'clamp(8rem, 20vw, 22rem)' }}
        >
          Mimi
        </div>

        {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map((pos, i) => (
          <div
            key={i}
            className={`absolute ${pos} w-12 h-12 border-[#FDC921]/30`}
            style={{
              borderTop: i < 2 ? '1px solid' : 'none',
              borderBottom: i >= 2 ? '1px solid' : 'none',
              borderLeft: i % 2 === 0 ? '1px solid' : 'none',
              borderRight: i % 2 === 1 ? '1px solid' : 'none',
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ duration: 0.8 }}
        >
          <div className="w-8 h-px bg-[#FDC921]" />
          <span className="font-sans text-[10px] tracking-[0.5em] text-[#2E2118]/40 uppercase">
            {t('story.label')}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          className="mb-20"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ duration: 1, delay: 0.1 }}
        >
          <h2 className="font-serif font-light leading-[0.92]" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
            {t('story.title_prefix')}{' '}
            <span className="italic text-[#FDC921]">{t('story.title_italic')}</span>
            <br />
            {t('story.title_suffix')}
          </h2>
        </motion.div>

        {/* Two-column content */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            <p className="font-sans text-base md:text-lg leading-[2] text-[#2E2118]/60">
              {t('story.body1')}
            </p>

            <div className="mt-10 flex items-center gap-6">
              <div className="w-16 h-px bg-[#FDC921]" />
              <span className="font-serif italic text-base md:text-lg text-[#2E2118]/70">
                {t('story.founded')}
              </span>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ duration: 0.9, delay: 0.4 }}
          >
            <p className="font-sans text-base md:text-lg leading-[2] text-[#2E2118]/60">
              {t('story.body2')}
            </p>

            {/* Decorative quote — rtl-border-flip class flips border side for Arabic */}
            <blockquote className="mt-10 border-l-2 border-[#FDC921] pl-6 rtl-border-flip">
              <p className="font-serif italic text-xl md:text-2xl text-[#2E2118] leading-relaxed">
                &ldquo;{t('story.quote')}&rdquo;
              </p>
            </blockquote>
          </motion.div>
        </div>

        {/* Bottom decorative line */}
        <motion.div
          className="flex items-center gap-4 mt-20"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1 h-px bg-[#2E2118]/10" />
          <span className="text-[#FDC921] text-xl">✦</span>
          <div className="flex-1 h-px bg-[#2E2118]/10" />
        </motion.div>
      </div>
    </section>
  );
}

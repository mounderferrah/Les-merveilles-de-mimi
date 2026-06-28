'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useT } from '@/i18n';

type StatKey = 'years' | 'clients' | 'boxes' | 'handmade';

const STATS: { value: number; suffix: string; key: StatKey }[] = [
  { value: 16,   suffix: '+', key: 'years'    },
  { value: 1000, suffix: '+', key: 'clients'  },
  { value: 3000, suffix: '+', key: 'boxes'    },
  { value: 100,  suffix: '%', key: 'handmade' },
];

function Counter({ to, suffix, inView }: { to: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let startTs = 0;
    const duration = 1800;

    // Time-based with requestAnimationFrame — reliable on mobile even under load
    // or when frames drop (it derives the value from elapsed time, never stalls).
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.round(to * eased));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(to);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span>{count}{suffix}</span>;
}

const card = {
  hidden: { opacity: 0, y: 50 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Numbers() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 bg-[#2E2118] overflow-hidden relative">
      {/* Background ornament */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #FDC921 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-[#FDC921]/20" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#FDC921]/20" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="w-8 h-px bg-[#FDC921]/40" />
          <span className="font-sans text-[10px] tracking-[0.5em] text-[#FDC921]/60 uppercase">
            {t('numbers.label')}
          </span>
          <div className="w-8 h-px bg-[#FDC921]/40" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.key}
              custom={i}
              variants={card}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              className="relative flex flex-col items-center justify-center py-14 px-6 text-center group"
            >
              {/* Border lines — luxury card style */}
              <div className="absolute inset-0 border border-[#FDC921]/10 group-hover:border-[#FDC921]/40 transition-colors duration-500" />
              <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#FDC921]/40" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#FDC921]/40" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#FDC921]/40" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#FDC921]/40" />

              {/* Number */}
              <div
                className="font-serif font-light text-[#FDC921] leading-none mb-4"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              >
                <Counter to={stat.value} suffix={stat.suffix} inView={inView} />
              </div>

              {/* Divider */}
              <div className="w-8 h-px bg-[#FDC921]/40 mb-4" />

              {/* Label */}
              <p className="font-sans text-xs tracking-[0.25em] text-white/40 uppercase leading-relaxed">
                {t(`stat.${stat.key}`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

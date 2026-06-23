'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useT } from '@/i18n';

// ── Golden floating dust ─────────────────────────────────────────────────────
// Saturated warm golds so they read as glowing motes against the bright cream.
const DUST_COLORS = ['#DDA15E', '#E0A030', '#C98A2E', '#EAC878', '#D9B36A'];
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

interface Dust {
  id: number;
  left: number;
  top: number;
  size: number;
  color: string;
  glow: number;      // box-shadow blur radius — the firefly halo
  riseDur: number;   // slow drift duration
  twinkle: number;   // fast brightness pulse duration
  delay: number;
  driftX: number;
  rise: number;
  maxOpacity: number;
  shimmer: boolean;
}

function generateDust(count: number): Dust[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: rnd(0, 100),
    top: rnd(0, 100),
    size: rnd(3, 8),
    color: DUST_COLORS[Math.floor(Math.random() * DUST_COLORS.length)],
    glow: rnd(10, 22),
    riseDur: rnd(8, 18),
    twinkle: rnd(1.8, 4.5),
    delay: rnd(0, 8),
    driftX: rnd(-30, 30),
    rise: rnd(30, 90),
    maxOpacity: rnd(0.55, 1),
    shimmer: Math.random() < 0.5,
  }));
}

export default function Signature() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Generate dust on the client only — Math.random would mismatch SSR hydration.
  const [dust, setDust] = useState<Dust[]>([]);
  useEffect(() => {
    setDust(generateDust(75));
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-6 py-28 md:py-0 md:min-h-[60vw] flex items-center justify-center"
      style={{ background: '#F5EDD9' }}
    >
      {/* Layer 2 — Ramadan background image, fitted to the section, kept clear */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden="true">
        <Image
          src="/ramadan.png"
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="object-cover"
          style={{
            objectPosition: 'center right',
            opacity: 0.95,
          }}
        />
      </div>

      {/* Soft radial light glow behind the text — subtle, just enough for legibility */}
      <div
        className="absolute left-[38%] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '55%',
          height: '60%',
          background: 'radial-gradient(circle, rgba(246,241,232,0.55), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Layer 3 — golden floating dust (above image, behind content) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {dust.map((d) => (
          <motion.span
            key={d.id}
            className="absolute rounded-full"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              background: d.color,
              // double halo — tight bright core + wider soft glow = firefly shine
              boxShadow: `0 0 ${d.glow * 0.5}px ${d.size * 0.4}px ${d.color}, 0 0 ${d.glow}px ${d.size}px ${d.color}`,
              willChange: 'transform, opacity',
            }}
            initial={{ opacity: 0 }}
            animate={{
              y: [0, -d.rise],
              x: [0, d.driftX],
              // fast brightness pulse = firefly twinkle
              opacity: [d.maxOpacity * 0.12, d.maxOpacity, d.maxOpacity * 0.12],
              scale: d.shimmer ? [1, 1.35, 1] : [1, 1.12, 1],
            }}
            transition={{
              // slow floating drift (reverses so it never teleports back)
              y: { duration: d.riseDur, delay: d.delay, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
              x: { duration: d.riseDur, delay: d.delay, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
              // independent quick shimmer
              opacity: { duration: d.twinkle, delay: d.delay, repeat: Infinity, ease: 'easeInOut' },
              scale: { duration: d.twinkle, delay: d.delay, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}
      </div>

      {/* Decorative orbiting elements */}
      <motion.div
        className="absolute top-[15%] left-[8%] font-serif text-[#C4956A]/30 select-none pointer-events-none"
        style={{ fontSize: '5rem', rotate: rotate1, y: y1 }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute bottom-[20%] right-[6%] font-serif text-[#FDC921]/25 select-none pointer-events-none"
        style={{ fontSize: '7rem', rotate: rotate2, y: y2 }}
      >
        ✦
      </motion.div>
      <motion.div
        className="absolute top-[50%] right-[15%] font-serif text-[#C4956A]/20 select-none pointer-events-none"
        style={{ fontSize: '3rem', rotate: rotate1 }}
      >
        ❋
      </motion.div>
      <motion.div
        className="absolute top-[30%] left-[20%] font-serif text-[#FDC921]/15 select-none pointer-events-none"
        style={{ fontSize: '2rem', rotate: rotate2 }}
      >
        ◆
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* CSS ornament ring */}
        <motion.div
          className="relative w-56 h-56 md:w-72 md:h-72 mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 rounded-full border-2 border-[#C4956A]/40"
            style={{ boxShadow: '0 0 40px rgba(196,149,106,0.15)' }}
          />
          <div className="absolute inset-4 rounded-full border border-[#C4956A]/25" />
          <div className="absolute inset-8 rounded-full border border-[#FDC921]/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-[#C4956A] font-serif"
              style={{ fontSize: '3rem' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              ✦
            </motion.div>
          </div>

          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                background: i % 2 === 0 ? '#FDC921' : '#C4956A',
                transformOrigin: '0 0',
              }}
              animate={{ rotate: [deg, deg + 360] }}
              transition={{ duration: 20 + i, repeat: Infinity, ease: 'linear' }}
            >
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'inherit',
                  transform: `rotate(-${deg}deg) translateY(-${95 + i * 3}px)`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Text */}
        <motion.p
          className="font-serif italic text-[#2E2118] leading-[1.3]"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 4rem)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {t('signature.text')}
          <br />
          <span className="text-[#C4956A]">{t('signature.accent')}</span>
        </motion.p>

        <motion.div
          className="flex items-center gap-4 justify-center mt-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-12 h-px bg-[#C4956A]/40" />
          <span className="font-sans text-[10px] tracking-[0.5em] text-[#2E2118]/40 uppercase">
            Les Merveilles de Mimi
          </span>
          <div className="w-12 h-px bg-[#C4956A]/40" />
        </motion.div>
      </div>
    </section>
  );
}

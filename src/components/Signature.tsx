'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function Signature() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section
      ref={ref}
      className="py-32 md:py-48 px-6 overflow-hidden relative"
      style={{ background: '#F5EDD9' }}
    >
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
        {/* Tray visualisation — CSS art */}
        <motion.div
          className="relative w-56 h-56 md:w-72 md:h-72 mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Outer tray ring */}
          <div
            className="absolute inset-0 rounded-full border-2 border-[#C4956A]/40"
            style={{ boxShadow: '0 0 40px rgba(196,149,106,0.15)' }}
          />
          {/* Inner ring */}
          <div className="absolute inset-4 rounded-full border border-[#C4956A]/25" />
          <div className="absolute inset-8 rounded-full border border-[#FDC921]/30" />

          {/* Center ornament */}
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

          {/* Orbiting elements */}
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
              animate={{
                rotate: [deg, deg + 360],
              }}
              transition={{
                duration: 20 + i,
                repeat: Infinity,
                ease: 'linear',
              }}
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
          Façonné avec élégance,
          <br />
          <span className="text-[#C4956A]">inspiré par la tradition.</span>
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

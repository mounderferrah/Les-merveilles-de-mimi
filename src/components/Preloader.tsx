'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INGREDIENTS = [
  { emoji: '🌰', label: 'pistachio' },
  { emoji: '🥜', label: 'walnut' },
  { emoji: '🫘', label: 'almond' },
  { emoji: '🌰', label: 'hazelnut' },
  { emoji: '🌹', label: 'rose petal' },
  { emoji: '🍂', label: 'cinnamon' },
  { emoji: '🫒', label: 'date' },
  { emoji: '⭐', label: 'sesame' },
];

const SVG_INGREDIENTS = [
  // Pistachio
  { char: '✦', color: '#7B9E5A', size: 14 },
  // Walnut (circle)
  { char: '●', color: '#8B6355', size: 10 },
  // Almond (oval using text)
  { char: '◉', color: '#C9A97A', size: 12 },
  // Rose petal
  { char: '❋', color: '#E8A0A0', size: 16 },
  // Cinnamon stick
  { char: '│', color: '#8B4513', size: 18 },
  // Date
  { char: '◆', color: '#6B3A2A', size: 11 },
  // Sesame seed
  { char: '·', color: '#D4C28A', size: 8 },
  // Small flower
  { char: '✿', color: '#E8A0A0', size: 13 },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  ingredient: typeof SVG_INGREDIENTS[0];
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
  drift: number;
}

interface DustParticle {
  id: number;
  width: number;
  height: number;
  left: number;
  top: number;
  color: string;
  duration: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -20 - Math.random() * 80,
    ingredient: SVG_INGREDIENTS[i % SVG_INGREDIENTS.length],
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 6,
    rotation: Math.random() * 360,
    opacity: 0.25 + Math.random() * 0.5,
    drift: (Math.random() - 0.5) * 60,
  }));
}

function generateDustParticles(count: number): DustParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    width: 2 + Math.random() * 3,
    height: 2 + Math.random() * 3,
    left: Math.random() * 100,
    top: Math.random() * 100,
    color: i % 2 === 0 ? '#FDC921' : '#C9A97A',
    duration: 4 + Math.random() * 4,
    delay: Math.random() * 5,
  }));
}

export default function Preloader({ onEnter }: { onEnter: () => void }) {
  const [visible, setVisible] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [dustParticles, setDustParticles] = useState<DustParticle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(40));
    setDustParticles(generateDustParticles(20));
  }, []);

  const handleEnter = () => {
    setVisible(false);
    setTimeout(onEnter, 800);
  };

  if (!visible) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] bg-[#FFFDF7] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center"
      style={{ background: '#FFFDF7' }}
      initial={{ opacity: 1 }}
    >
      {/* Falling Ingredients */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.ingredient.size}px`,
            color: p.ingredient.color,
            opacity: 0,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, p.drift],
            rotate: [p.rotation, p.rotation + 180],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {p.ingredient.char}
        </motion.div>
      ))}

      {/* Floating dust particles */}
      {dustParticles.map((p) => (
        <motion.div
          key={`dust-${p.id}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.width,
            height: p.height,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.color,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -10, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Center Content */}
      <div className="relative z-10 text-center flex flex-col items-center gap-8">
        {/* Ornamental top line */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <div className="w-16 h-px bg-[#FDC921]" />
          <span className="text-[#FDC921] text-xs tracking-[0.4em] font-sans uppercase">
            Atelier
          </span>
          <div className="w-16 h-px bg-[#FDC921]" />
        </motion.div>

        {/* Logo / Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-serif text-[clamp(2.8rem,8vw,7rem)] font-light leading-[0.95] tracking-[0.06em] text-[#2E2118]">
            Les Merveilles
          </h1>
          <div className="flex items-center gap-3 mt-2 justify-center">
            <div className="w-8 h-px bg-[#FDC921]" />
            <h2 className="font-serif text-[clamp(1.8rem,5vw,4.5rem)] font-light tracking-[0.12em] text-[#2E2118] italic">
              de Mimi
            </h2>
            <div className="w-8 h-px bg-[#FDC921]" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-sans text-xs tracking-[0.5em] text-[#2E2118]/50 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Tradition&nbsp;•&nbsp;Passion&nbsp;•&nbsp;Raffinement
        </motion.p>

        {/* Ornamental divider */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="w-20 h-px bg-[#FDC921]/40" />
          <span className="text-[#FDC921] text-lg">✦</span>
          <div className="w-20 h-px bg-[#FDC921]/40" />
        </motion.div>

        {/* Enter Button */}
        <motion.button
          onClick={handleEnter}
          className="relative group mt-2 px-12 py-4 border border-[#2E2118]/20 font-sans text-xs tracking-[0.4em] text-[#2E2118] uppercase overflow-hidden transition-colors duration-500 hover:text-[#FFFDF7]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ borderColor: '#FDC921' }}
        >
          <span className="relative z-10">Enter</span>
          <motion.div
            className="absolute inset-0 bg-[#FDC921]"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            style={{ originX: 0 }}
          />
          {/* Glow */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ boxShadow: '0 0 20px rgba(253,201,33,0.3)' }} />
        </motion.button>
      </div>
    </motion.div>
  );
}

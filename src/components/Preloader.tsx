'use client';

import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useT } from '@/i18n';

// Independent transparent-PNG ingredients — each rendered as its own element.
// Files live in /public/elements/. Weighted so the single pistachio, almond and
// date appear less often — occasional premium accents.
const INGREDIENT_IMAGES: { src: string; weight: number }[] = [
  { src: '/elements/nut.webp', weight: 10 },
  { src: '/elements/rosebud.webp', weight: 10 },
  { src: '/elements/jasmine.webp', weight: 8 },
  { src: '/elements/rose-petal.webp', weight: 8 },
  { src: '/elements/star-anise.webp', weight: 8 },
  { src: '/elements/cinnamon-stick.webp', weight: 7 },
  { src: '/elements/pistachio-single.webp', weight: 4 }, // premium accent
  { src: '/elements/almond-single.webp', weight: 4 }, // premium accent
  { src: '/elements/date-single.webp', weight: 3 }, // premium accent
];

const TOTAL_WEIGHT = INGREDIENT_IMAGES.reduce((sum, x) => sum + x.weight, 0);

function pickImage(): string {
  let r = Math.random() * TOTAL_WEIGHT;
  for (const item of INGREDIENT_IMAGES) {
    r -= item.weight;
    if (r <= 0) return item.src;
  }
  return INGREDIENT_IMAGES[0].src;
}

// Per-ingredient size character — large: dates / cinnamon / walnuts,
// medium: single pistachio / almond / star anise, small: buds & flowers.
const SIZE_MULTIPLIER: Record<string, number> = {
  '/elements/date-single.webp': 1.3, // large
  '/elements/cinnamon-stick.webp': 1.25, // large
  '/elements/nut.webp': 1.15, // large
  '/elements/star-anise.webp': 0.95, // medium
  '/elements/pistachio-single.webp': 0.9, // medium
  '/elements/almond-single.webp': 0.9, // medium
  '/elements/jasmine.webp': 0.7, // small
  '/elements/rosebud.webp': 0.65, // small
  '/elements/rose-petal.webp': 0.5, // small
};

type Layer = 'background' | 'middle' | 'foreground';

// Three depth layers — opacity, blur, scale band and float speed per layer.
// Fewer, larger ingredients for a cinematic depth-of-field feel.
const LAYER_CONFIG: Record<
  Layer,
  { count: number; opacity: number; blur: number; scale: [number, number]; duration: [number, number]; z: number; shadow: boolean }
> = {
  background: { count: 12, opacity: 0.15, blur: 2, scale: [0.8, 1.2], duration: [30, 40], z: 1, shadow: false },
  middle:     { count: 14, opacity: 0.5,  blur: 0, scale: [1.1, 1.6], duration: [25, 35], z: 4, shadow: false },
  foreground: { count: 14, opacity: 0.9,  blur: 0, scale: [1.8, 2.5], duration: [20, 30], z: 8, shadow: true },
};

const BASE_SIZE = 155; // px, before per-ingredient scale (~2.2x larger ingredients)

interface Ingredient {
  id: number;
  src: string;
  left: number; // vw %
  size: number; // px (already scaled)
  rotation: number; // initial rotation
  rotateKeyframes: number[];
  drift: number[]; // x drift keyframes (px)
  opacity: number;
  duration: number;
  delay: number;
  blur: number;
  z: number;
  shadow: boolean;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

function generateIngredients(): Ingredient[] {
  const out: Ingredient[] = [];
  let id = 0;

  (Object.keys(LAYER_CONFIG) as Layer[]).forEach((layerName) => {
    const layer = LAYER_CONFIG[layerName];
    for (let i = 0; i < layer.count; i++) {
      const src = pickImage();
      const rawScale = rand(layer.scale[0], layer.scale[1]) * (SIZE_MULTIPLIER[src] ?? 0.9);
      const scale = Math.min(4.0, Math.max(0.3, rawScale));

      // Natural, non-straight horizontal drift — varied amplitude per element.
      const amp = rand(8, 28);
      const drift = [0, -amp, amp * 0.7, -amp * 0.4, 0];

      // Some spin fully, some barely — keeps motion organic, not mechanical.
      const span = pick([120, 240, 360]);
      const rotation = rand(0, 360);
      const rotateKeyframes = [rotation, rotation + span * 0.25, rotation + span * 0.5, rotation + span];

      const duration = rand(layer.duration[0], layer.duration[1]);

      out.push({
        id: id++,
        src,
        left: rand(-2, 100),
        size: BASE_SIZE * scale,
        rotation,
        rotateKeyframes,
        drift,
        opacity: layer.opacity,
        duration,
        // Negative delay seeks each element into a random point of its loop, so
        // the scene is already mid-fall on the first frame — no waiting period.
        delay: -rand(0, duration),
        blur: layer.blur,
        z: layer.z,
        shadow: layer.shadow,
      });
    }
  });

  return out;
}

// Each ingredient is its own memoized component — independent PNG, independent animation.
const FloatingIngredient = memo(function FloatingIngredient({ data }: { data: Ingredient }) {
  const [broken, setBroken] = useState(false);
  if (broken) return null;

  const filter = data.blur
    ? `blur(${data.blur}px)`
    : data.shadow
    ? 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))'
    : undefined;

  return (
    <motion.img
      src={data.src}
      alt=""
      aria-hidden="true"
      draggable={false}
      onError={() => setBroken(true)}
      className="absolute top-[-200px] select-none pointer-events-none"
      style={{
        left: `${data.left}%`,
        width: data.size,
        height: 'auto',
        zIndex: data.z,
        filter,
        willChange: 'transform, opacity',
        transform: 'translate3d(0,0,0)',
      }}
      initial={{ y: 0, x: 0, rotate: data.rotation, opacity: 0 }}
      animate={{
        y: ['0px', '110vh'],
        x: data.drift,
        rotate: data.rotateKeyframes,
        opacity: [0, data.opacity, data.opacity, 0],
      }}
      transition={{
        duration: data.duration,
        delay: data.delay,
        repeat: Infinity,
        ease: 'linear',
        opacity: {
          duration: data.duration,
          delay: data.delay,
          repeat: Infinity,
          ease: 'linear',
          times: [0, 0.12, 0.85, 1],
        },
      }}
    />
  );
});

export default function Preloader({ onEnter }: { onEnter: () => void }) {
  const t = useT();
  const [visible, setVisible] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  // Generate on the client only — Math.random would mismatch SSR hydration.
  useEffect(() => {
    setIngredients(generateIngredients());
  }, []);

  const handleEnter = () => {
    setVisible(false);
    setTimeout(onEnter, 1200);
  };

  if (!visible) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] bg-[#DDA15E] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center"
      style={{ background: '#DDA15E' }}
      initial={{ opacity: 1 }}
    >
      {/* Floating ingredients — 3 depth layers, cinematic slow drift */}
      {ingredients.map((ing) => (
        <FloatingIngredient key={ing.id} data={ing} />
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
          <span className="text-[#2E2118] text-xs tracking-[0.4em] font-sans uppercase">
            {t('preloader.atelier')}
          </span>
          <div className="w-16 h-px bg-[#FDC921]" />
        </motion.div>

        {/* Logo / Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="brand-latin font-serif text-[clamp(2.8rem,8vw,7rem)] font-light leading-[0.95] tracking-[0.06em] text-[#2E2118]">
            Les Merveilles
          </h1>
          <div className="flex items-center gap-3 mt-2 justify-center">
            <div className="w-8 h-px bg-[#FDC921]" />
            <h2 className="brand-latin font-serif text-[clamp(1.8rem,5vw,4.5rem)] font-light tracking-[0.12em] text-[#2E2118] italic">
              de Mimi
            </h2>
            <div className="w-8 h-px bg-[#FDC921]" />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-sans text-xs tracking-[0.72em] font-medium text-[#2E2118]/75 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {t('preloader.tagline')}
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

        {/* Enter Button — solid yellow box, no hover fill */}
        <motion.button
          onClick={handleEnter}
          className="mt-2 px-12 py-4 border border-[#FDC921] font-serif text-xs tracking-[0.25em] uppercase"
          style={{ background: '#FDC921', color: '#2E2118' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 0 25px rgba(253,201,33,0.35)',
            transition: { duration: 0.15 },
          }}
          whileTap={{ scale: 0.98, transition: { duration: 0.15 } }}
        >
          {t('preloader.enter')}
        </motion.button>
      </div>
    </motion.div>
  );
}

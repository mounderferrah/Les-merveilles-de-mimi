'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Creation, CreationLightbox } from '@/components/CreationLightbox';

// Real creations — ordered by visual priority
const CREATIONS: Creation[] = [
  {
    id: 7,
    name: 'Assortiment Premium',
    category: 'Prestige',
    color: '#D4A050',
    description: 'Un assortiment d\'exception pour les amateurs de finesse.',
    price: '5 000 DA',
    images: ['/finesse.jpg'],
  },
  {
    id: 6,
    name: 'Boîte de 24 pièces',
    category: 'Assortiment',
    color: '#8B7A5A',
    description: 'Assortiment raffiné de créations traditionnelles.',
    price: '3 600 DA',
    images: ['/24 pieces.jpg'],
  },
  {
    id: 3,
    name: 'Mkhabez Amandes',
    category: 'Prestige',
    color: '#C4956A',
    description: 'Fines créations à base d\'amandes, décorées avec délicatesse.',
    price: '170 DA',
    images: ['/Mkhabez amandes.jpg'],
  },
  {
    id: 4,
    name: 'Thouma',
    category: 'Prestige',
    color: '#D4A47A',
    description: 'Parfum d\'amande et texture fondante pour un pur moment de plaisir.',
    price: '170 DA',
    images: ['/thouma.jpg'],
  },
  {
    id: 5,
    name: 'Lamina Lawz',
    category: 'Prestige',
    color: '#C8A878',
    description: 'Délicate fleur d\'amande façonnée à la main.',
    price: '160 DA',
    images: ['/tamina lawz.jpg'],
  },
  {
    id: 8,
    name: 'Ktayef',
    category: 'Ramadan',
    color: '#C49060',
    description: 'Voyage au cœur des traditions gourmandes.',
    price: '180 DA',
    images: ['/ktayef.jpg'],
  },
];

// Three strips with different orderings
const STRIP_A = [0, 1, 2, 3, 4, 5].map((i) => CREATIONS[i]);
const STRIP_B = [3, 5, 1, 4, 0, 2].map((i) => CREATIONS[i]);
const STRIP_C = [2, 4, 0, 5, 3, 1].map((i) => CREATIONS[i]);

// ── Individual ribbon card ─────────────────────────────────────────────────────
function RibbonCard({
  creation,
  onClick,
}: {
  creation: Creation;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-[260px] md:w-[340px] h-[195px] md:h-[255px] overflow-hidden rounded-[2px] cursor-pointer group"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
      whileHover={{
        scale: 1.04,
        boxShadow: '0 8px 40px rgba(0,0,0,0.22), 0 0 0 1px rgba(253,201,33,0.5)',
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      onClick={onClick}
    >
      {/* Photo */}
      <Image
        src={creation.images[0]}
        alt={creation.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        sizes="(max-width: 768px) 260px, 340px"
      />

      {/* Warm gradient — bottom-heavy for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/80 via-[#1A110B]/20 to-transparent" />

      {/* Gold inner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 40px rgba(253,201,33,0.1)' }}
      />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <p className="font-serif text-white font-light text-[15px] md:text-base leading-tight mb-1.5 group-hover:text-white transition-colors duration-300">
          {creation.name}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-sans text-[9px] tracking-[0.3em] text-white/40 uppercase">
            {creation.category}
          </span>
          <span className="text-[#FDC921]/40 text-[8px]">·</span>
          <span className="font-serif italic text-[#FDC921]/75 text-[12px]">
            {creation.price}
          </span>
        </div>
      </div>

      {/* Corner ornament on hover */}
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
        <span className="text-[#FDC921]/70 text-[10px]">✦</span>
      </div>
    </motion.div>
  );
}

// ── One scrolling strip ────────────────────────────────────────────────────────
function RibbonStrip({
  items,
  duration,
  direction = 1,
  onSelect,
}: {
  items: Creation[];
  duration: number;
  direction?: 1 | -1;
  onSelect: (c: Creation) => void;
}) {
  // Double the array for seamless infinite loop
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-x-hidden overflow-y-visible py-3">
      <motion.div
        className="flex gap-4 md:gap-5"
        animate={{ x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((creation, i) => (
          <RibbonCard
            key={`${creation.id}-${i}`}
            creation={creation}
            onClick={() => onSelect(creation)}
          />
        ))}
      </motion.div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────
export default function RibbonGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  const [selected, setSelected] = useState<Creation | null>(null);

  return (
    <section ref={ref} className="py-20 md:py-32 overflow-hidden bg-[#FFFDF7] relative">
      {/* Subtle grid motif */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg,   #2E2118 0, #2E2118 1px, transparent 0, transparent 60px),
              repeating-linear-gradient(90deg,  #2E2118 0, #2E2118 1px, transparent 0, transparent 60px)
            `,
          }}
        />
      </motion.div>

      <div className="relative z-10">
        {/* Header */}
        <div className="px-6 mb-12 max-w-6xl mx-auto">
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="w-8 h-px bg-[#FDC921]" />
            <span className="font-sans text-[10px] tracking-[0.5em] text-[#2E2118]/40 uppercase">
              Nos Créations
            </span>
          </motion.div>

          <div className="flex items-end justify-between flex-wrap gap-6">
            <motion.h2
              className="font-serif font-light"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 7rem)' }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 }}
            >
              L&apos;Art de{' '}
              <span className="italic text-[#FDC921]">la Douceur</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href="/collection"
                className="group inline-flex items-center gap-3 border border-[#2E2118]/20 px-8 py-3.5 font-sans text-[10px] tracking-[0.35em] text-[#2E2118] uppercase hover:border-[#FDC921] hover:bg-[#FDC921] transition-all duration-400"
              >
                Voir la Galerie
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Ribbons — three rows, alternating direction, each with a different speed */}
        <div className="space-y-3">
          <RibbonStrip items={STRIP_A} duration={88}  direction={1}  onSelect={setSelected} />
          <RibbonStrip items={STRIP_B} duration={110} direction={-1} onSelect={setSelected} />
          <RibbonStrip items={STRIP_C} duration={96}  direction={1}  onSelect={setSelected} />
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <CreationLightbox creation={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Creation, CreationLightbox } from '@/components/CreationLightbox';

const CREATIONS: Creation[] = [
  {
    id: 1,
    name: 'Cornes de Gazelle',
    category: 'Classique',
    color: '#C4956A',
    description: 'Délicats croissants aux amandes et fleur d\'oranger, délicatement voilés de sucre glace.',
    price: '170 DA',
    images: [],
  },
  {
    id: 2,
    name: 'Makroud aux Dattes',
    category: 'Tradition',
    color: '#B8815A',
    description: 'Losanges traditionnels de semoule généreusement garnis de pâte de dattes parfumée.',
    price: '180 DA',
    images: [],
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
    id: 6,
    name: 'Boîte de 24 pièces',
    category: 'Assortiment',
    color: '#8B7A5A',
    description: 'Assortiment raffiné de créations traditionnelles.',
    price: '3 600 DA',
    images: ['/24 pieces.jpg'],
  },
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
    id: 8,
    name: 'Ktayef',
    category: 'Ramadan',
    color: '#C49060',
    description: 'Voyage au cœur des traditions gourmandes.',
    price: '180 DA',
    images: ['/ktayef.jpg'],
  },
];

const CATEGORIES = ['Tous', 'Classique', 'Tradition', 'Prestige', 'Assortiment', 'Ramadan'];

// ── Image/placeholder helper ────────────────────────────────────────────────────
function ImageSlot({
  src,
  alt,
  color,
  imgClassName = '',
}: {
  src?: string;
  alt: string;
  color: string;
  imgClassName?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${imgClassName}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 576px"
      />
    );
  }
  return (
    <div
      className="absolute inset-0"
      style={{ background: `linear-gradient(145deg, ${color}, ${color}88)` }}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg, transparent, transparent 8px,
            rgba(255,255,255,0.25) 8px, rgba(255,255,255,0.25) 9px
          )`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-white/20 text-[4rem]">✦</span>
      </div>
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────────
function CreationCard({
  creation,
  index,
  onClick,
}: {
  creation: Creation;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <motion.div
      ref={ref}
      className="group relative cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (index % 6) * 0.09, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-[4/3] mb-5">
        <ImageSlot
          src={creation.images[0]}
          alt={creation.name}
          color={creation.color}
          imgClassName="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="font-sans text-[9px] tracking-[0.3em] text-white/75 uppercase bg-black/25 backdrop-blur-sm px-2.5 py-1">
            {creation.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-[#2E2118]/0 group-hover:bg-[#2E2118]/30 transition-colors duration-500 z-10 flex items-end justify-center pb-5">
          <span className="font-sans text-[10px] tracking-[0.4em] text-transparent group-hover:text-white/85 uppercase transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            Voir la Création
          </span>
        </div>
        <div className="absolute inset-0 border border-transparent group-hover:border-[#FDC921]/55 transition-all duration-500 z-20 pointer-events-none" />
      </div>

      <div className="px-1 space-y-2">
        <h3 className="font-serif text-xl font-light text-[#2E2118] group-hover:text-[#C4956A] transition-colors duration-300 leading-tight">
          {creation.name}
        </h3>
        <p className="font-sans text-[11px] text-[#2E2118]/40 leading-relaxed">
          {creation.description}
        </p>
        <p className="font-serif italic text-sm text-[#C4956A]/60 pt-0.5">
          Prix indicatif — {creation.price}
        </p>
      </div>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selected, setSelected] = useState<Creation | null>(null);

  const filtered =
    activeCategory === 'Tous'
      ? CREATIONS
      : CREATIONS.filter((c) => c.category === activeCategory);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFFDF7]">
        {/* Page hero */}
        <section className="pt-40 pb-16 px-6 text-center relative overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[#2E2118]/[0.02] select-none pointer-events-none leading-none"
            style={{ fontSize: 'clamp(6rem, 20vw, 20rem)' }}
          >
            Galerie
          </div>
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 justify-center mb-8">
              <div className="w-8 h-px bg-[#FDC921]" />
              <span className="font-sans text-[10px] tracking-[0.5em] text-[#2E2118]/40 uppercase">
                Galerie des Créations
              </span>
              <div className="w-8 h-px bg-[#FDC921]" />
            </div>
            <h1
              className="font-serif font-light leading-[0.9] text-[#2E2118]"
              style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
            >
              Collection
            </h1>
            <p className="mt-6 font-sans text-sm text-[#2E2118]/40 tracking-[0.12em] max-w-lg mx-auto leading-relaxed">
              Chaque pièce est façonnée à la main avec passion et tradition.<br />
              Cliquez sur une création pour en découvrir l&apos;histoire.
            </p>
          </motion.div>
        </section>

        {/* Category filter */}
        <div className="sticky top-[68px] z-30 bg-[#FFFDF7]/96 backdrop-blur-sm border-b border-[#2E2118]/6">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative font-sans text-[11px] tracking-[0.35em] uppercase pb-2.5 transition-colors duration-300"
                  style={{ color: activeCategory === cat ? '#2E2118' : 'rgba(46,33,24,0.32)' }}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="cat-line"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#FDC921]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery grid */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.map((creation, i) => (
                <CreationCard
                  key={creation.id}
                  creation={creation}
                  index={i}
                  onClick={() => setSelected(creation)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Contact CTA */}
        <motion.section
          className="py-24 px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex flex-col items-center gap-6 p-14 border border-[#2E2118]/8 max-w-md mx-auto w-full">
            <span className="text-[#FDC921] text-2xl">✦</span>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-[#2E2118] leading-tight">
              Une création<br />vous plaît ?
            </h3>
            <p className="font-sans text-sm text-[#2E2118]/40 text-center leading-relaxed max-w-xs">
              Contactez-nous directement sur WhatsApp ou Instagram pour toute demande personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <a
                href="https://wa.me/213000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#FDC921] px-8 py-4 font-sans text-[10px] tracking-[0.4em] text-[#2E2118] uppercase hover:bg-[#FDD85D] transition-colors duration-300"
              >
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/les_merveilles_de_mimi_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 border border-[#2E2118]/15 px-8 py-4 font-sans text-[10px] tracking-[0.4em] text-[#2E2118] uppercase hover:border-[#2E2118]/35 transition-all duration-300"
              >
                Instagram
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />

      <AnimatePresence>
        {selected && (
          <CreationLightbox creation={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

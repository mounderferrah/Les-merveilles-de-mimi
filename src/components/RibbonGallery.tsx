'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, EXTS, type Product } from '@/data/products';
import { useT, useLocale } from '@/i18n';

// Divide 21 products evenly across three ribbons
const STRIP_A = PRODUCTS.slice(0, 7);
const STRIP_B = PRODUCTS.slice(7, 14);
const STRIP_C = PRODUCTS.slice(14);

// Deterministic sparkle positions (no Math.random — SSR safe)
const SPARKLES = [
  { top: '8%',  left: '6%',  size: 10, delay: 0 },
  { top: '35%', left: '91%', size: 7,  delay: 0.8 },
  { top: '68%', left: '3%',  size: 12, delay: 1.4 },
  { top: '52%', left: '95%', size: 8,  delay: 0.3 },
  { top: '85%', left: '42%', size: 6,  delay: 1.1 },
  { top: '18%', left: '54%', size: 9,  delay: 0.6 },
] as const;

// ── Ribbon card ────────────────────────────────────────────────────────────────

function RibbonCard({ product, collectionHref }: { product: Product; collectionHref: string }) {
  const router = useRouter();
  const [extIdx, setExtIdx] = useState(0);
  const [failed, setFailed]  = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-[320px] h-[190px] overflow-hidden rounded-[24px] cursor-pointer group"
      style={{ boxShadow: 'inset 0 0 0 0px rgba(253,201,33,0), 0 4px 20px rgba(0,0,0,0.08)' }}
      whileHover={{
        scale: 1.05,
        boxShadow: 'inset 0 0 0 1px rgba(253,201,33,0.3), 0 20px 60px rgba(180,120,55,0.25)',
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }}
      onClick={() => router.push(collectionHref)}
    >
      {!failed ? (
        <Image
          key={`${product.image}-${extIdx}`}
          src={`/${product.image}.${EXTS[extIdx]}`}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="320px"
          onError={() => {
            if (extIdx < EXTS.length - 1) {
              setExtIdx((i) => i + 1);
            } else {
              setFailed(true);
            }
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#EDE0CC] to-[#D9C8AD] flex items-center justify-center">
          <span className="font-serif text-[#B8895A]/20 text-5xl select-none">✦</span>
        </div>
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent)' }}
      />

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 40px rgba(253,201,33,0.08)' }}
      />

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10" dir="ltr">
        <h3 className="font-serif text-white font-light text-[15px] leading-tight mb-1">
          {product.name}
        </h3>
        <p className="font-serif italic text-[#FDC921] text-[13px]">
          {product.price}
        </p>
      </div>

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
  collectionHref,
}: {
  items: Product[];
  duration: number;
  direction?: 1 | -1;
  collectionHref: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-x-hidden py-2" dir="ltr">
      <motion.div
        className="flex gap-4"
        animate={{ x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((product, i) => (
          <RibbonCard key={`${product.name}-${i}`} product={product} collectionHref={collectionHref} />
        ))}
      </motion.div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────────────

export default function RibbonGallery() {
  const t = useT();
  const locale = useLocale();
  const collectionHref = `/${locale}/collection`;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section ref={ref} className="py-20 md:py-32 overflow-hidden bg-[#FFFDF7] relative">

      {/* Decorative background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg,   #2E2118 0, #2E2118 1px, transparent 0, transparent 80px),
              repeating-linear-gradient(90deg,  #2E2118 0, #2E2118 1px, transparent 0, transparent 80px)
            `,
          }}
        />
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #FDC921 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #C4956A 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background: 'linear-gradient(180deg, transparent 20%, rgba(212,160,80,0.3) 50%, transparent 80%)',
          }}
        />
        {SPARKLES.map((s, i) => (
          <motion.span
            key={i}
            className="absolute font-serif text-[#FDC921] select-none"
            style={{ top: s.top, left: s.left, fontSize: s.size, opacity: 0 }}
            animate={inView ? { opacity: [0, 0.15, 0.06], rotate: [0, 12, 0] } : {}}
            transition={{ duration: 7, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✦
          </motion.span>
        ))}
      </motion.div>

      {/* Content */}
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
              {t('ribbon.label')}
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
              {t('ribbon.title.before')}{' '}
              <span className="italic text-[#FDC921]">{t('ribbon.title.italic')}</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href={collectionHref}
                className="group inline-flex items-center gap-3 border border-[#2E2118]/20 px-8 py-3.5 font-sans text-[10px] tracking-[0.35em] text-[#2E2118] uppercase hover:border-[#FDC921] hover:bg-[#FDC921] transition-all duration-500"
              >
                {t('ribbon.cta')}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Three ribbons */}
        <div className="space-y-3">
          <RibbonStrip items={STRIP_A} duration={50} direction={1}  collectionHref={collectionHref} />
          <RibbonStrip items={STRIP_B} duration={60} direction={-1} collectionHref={collectionHref} />
          <RibbonStrip items={STRIP_C} duration={55} direction={1}  collectionHref={collectionHref} />
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useT, useLocale } from '@/i18n';
import {
  PRODUCTS,
  EXTS,
  type Product,
  type ProductCategory,
  type FilterCategory,
} from '@/data/products';

const WA_NUMBER = '213559315935';

const FILTER_KEYS: FilterCategory[] = ['all', 'traditional', 'pistachio', 'giftbox'];

// ── ProductImage — tries jpg then falls back through webp / png / jpeg ────────

function ProductImage({ image, name }: { image: string; name: string }) {
  const [extIdx, setExtIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#EDE0CC] to-[#D9C8AD]">
        <span className="font-serif text-[#B8895A]/20 text-6xl leading-none select-none">✦</span>
      </div>
    );
  }

  return (
    <Image
      key={`${image}-${extIdx}`}
      src={`/${image}.${EXTS[extIdx]}`}
      alt={name}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      onError={() => {
        if (extIdx < EXTS.length - 1) {
          setExtIdx((i) => i + 1);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

// ── ProductCard ───────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const t = useT();
  const waText = encodeURIComponent(`${t('product.order_prefix')} ${product.name}`);

  return (
    <motion.article
      className="group flex flex-col bg-[#FFFDF7] rounded-[24px] overflow-hidden"
      style={{ border: '1px solid rgba(221,161,94,.15)' }}
      initial={{ opacity: 0, y: 48 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{
        duration: 0.7,
        delay: (index % 8) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        boxShadow: '0 32px 80px rgba(180,120,55,0.14), 0 0 0 1.5px rgba(221,161,94,0.38)',
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] flex-shrink-0 overflow-hidden rounded-t-[24px]">
        <ProductImage image={product.image} name={product.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A110B]/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-6 pt-5 pb-6">
        <div className="mb-3">
          <h3 className="font-serif text-[1.05rem] font-light text-[#2E2118] leading-snug group-hover:text-[#7A4F2E] transition-colors duration-500">
            {product.name}
          </h3>
          <div className="mt-2 h-px bg-gradient-to-r from-[#FDC921] to-[#FDD85D] w-0 group-hover:w-full transition-all duration-700" />
        </div>

        <p className="font-sans text-[11px] leading-[1.9] text-[#2E2118]/42 flex-1 mb-4">
          {t(`product.${product.key}.desc`)}
        </p>

        <p className="font-serif italic text-[#C4956A] text-[13px] tracking-wide mb-4">
          {product.price}
        </p>

        <a
          href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-[#FDC921] hover:bg-[#FDD85D] active:bg-[#E8B312] text-[#2E2118] font-sans text-[8px] tracking-[0.4em] uppercase py-[13px] transition-colors duration-300"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {t('product.order_cta')}
        </a>
      </div>
    </motion.article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CollectionPage() {
  const t = useT();
  const locale = useLocale();
  const [active, setActive] = useState<FilterCategory>('all');

  const filtered =
    active === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === (active as ProductCategory));

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FFFDF7]">

        {/* ── Page hero ── */}
        <section className="relative pt-44 pb-20 px-6 text-center overflow-hidden">
          <div
            className="absolute inset-0 flex items-center justify-center font-serif text-[#2E2118]/[0.022] select-none pointer-events-none leading-none"
            style={{ fontSize: 'clamp(8rem, 22vw, 24rem)' }}
            aria-hidden="true"
          >
            Mimi
          </div>

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-5 mb-9">
              <div className="w-8 h-px bg-[#FDC921]" />
              <span className="font-sans text-[9px] tracking-[0.55em] text-[#2E2118]/35 uppercase">
                {t('collection.badge')}
              </span>
              <div className="w-8 h-px bg-[#FDC921]" />
            </div>

            <h1
              className="font-serif font-light text-[#2E2118] leading-[0.88] tracking-[0.02em]"
              style={{ fontSize: 'clamp(5rem, 15vw, 13rem)' }}
            >
              {t('collection.title')}
            </h1>

            <p className="mt-7 font-sans text-[10px] tracking-[0.22em] text-[#2E2118]/32 uppercase leading-loose">
              {t('collection.subtitle')}
            </p>
          </motion.div>
        </section>

        {/* ── Filter bar ── */}
        <div className="sticky top-[68px] z-30 bg-[#FFFDF7]/96 backdrop-blur-sm border-b border-[#2E2118]/6">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
              {FILTER_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className="relative font-sans text-[10px] tracking-[0.35em] uppercase pb-2.5 transition-colors duration-300"
                  style={{
                    color: active === key ? '#2E2118' : 'rgba(46,33,24,0.30)',
                  }}
                >
                  {t(`filter.${key}`)}
                  {active === key && (
                    <motion.span
                      layoutId="filter-line"
                      className="absolute bottom-0 left-0 right-0 h-px bg-[#FDC921]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Product grid ── */}
        <section className="px-6 md:px-10 py-16 max-w-[1540px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {filtered.map((product, i) => (
                <ProductCard key={product.key} product={product} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ── Contact CTA ── */}
        <motion.section
          className="py-28 px-6 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex flex-col items-center gap-7 py-16 px-14 border border-[#2E2118]/8 max-w-md mx-auto w-full">
            <span className="text-[#FDC921] text-2xl">✦</span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-[#2E2118] leading-tight">
              {t('collection.cta.title')}
            </h2>
            <p className="font-sans text-[11px] text-[#2E2118]/38 text-center leading-loose max-w-xs tracking-[0.06em]">
              {t('collection.cta.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#FDC921] hover:bg-[#FDD85D] px-8 py-4 font-sans text-[9px] tracking-[0.4em] text-[#2E2118] uppercase transition-colors duration-300"
              >
                {t('collection.cta.wa')}
              </a>
              <a
                href="https://www.instagram.com/les_merveilles_de_mimi_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 border border-[#2E2118]/15 px-8 py-4 font-sans text-[9px] tracking-[0.4em] text-[#2E2118] uppercase hover:border-[#2E2118]/35 transition-all duration-300"
              >
                {t('collection.cta.ig')}
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </>
  );
}

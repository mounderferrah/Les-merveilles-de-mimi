'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useT, useLocale } from '@/i18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Strip locale prefix so '/fr/collection' → '/collection', '/fr' → '/'
function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(fr|en|ar)/, '') || '/';
}

type NavLink = {
  href: string;
  label: string;
  section: string | null; // null = Collection (external page), '' = Accueil, 'histoire'/'contact' = anchors
};

export default function Navbar() {
  const t = useT();
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const links: NavLink[] = [
    { href: `/${locale}`,             label: t('nav.home'),       section: ''        },
    { href: `/${locale}/collection`,  label: t('nav.collection'), section: null      },
    { href: `/${locale}#histoire`,    label: t('nav.history'),    section: 'histoire' },
    { href: `/${locale}#contact`,     label: t('nav.contact'),    section: 'contact'  },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which homepage section is in view
  useEffect(() => {
    const localePath = stripLocale(pathname);
    if (localePath !== '/') { setActiveSection(''); return; }

    const visible = new Set<string>();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        if (visible.has('contact')) setActiveSection('contact');
        else if (visible.has('histoire')) setActiveSection('histoire');
        else setActiveSection('');
      },
      { threshold: 0.3 },
    );

    ['histoire', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [pathname]);

  const localePath = stripLocale(pathname);
  const onHero = localePath === '/' && !scrolled;

  function isActive(link: NavLink): boolean {
    if (link.section === null) return localePath === '/collection';
    if (localePath !== '/') return false;
    if (link.section === '') return activeSection === '';
    return activeSection === link.section;
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-5 flex items-center justify-between transition-all duration-700"
        style={{
          background:     scrolled ? 'rgba(255,253,247,0.93)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)'             : 'none',
          borderBottom:   scrolled ? '1px solid rgba(253,201,33,0.15)' : 'none',
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <Link href={`/${locale}`} className="flex flex-col leading-none group">
          <span
            className="brand-latin font-serif text-[1.05rem] font-light tracking-[0.08em] transition-all duration-500 group-hover:opacity-70"
            style={{
              color:      onHero ? '#FFFFFF' : '#2E2118',
              textShadow: onHero ? '0 1px 12px rgba(0,0,0,0.5)' : 'none',
              transition: 'color 300ms ease-out, text-shadow 300ms ease-out',
            }}
          >
            Les Merveilles
          </span>
          <span
            className="brand-latin font-serif text-xs italic tracking-[0.2em]"
            style={{
              color:      '#FDC921',
              textShadow: onHero ? '0 1px 12px rgba(0,0,0,0.4)' : 'none',
              transition: 'text-shadow 300ms ease-out',
            }}
          >
            de Mimi
          </span>
        </Link>

        {/* Desktop nav links — centered in the middle of the bar on wide screens;
            distributed in normal flow below 1380px to avoid overlap with the CTA */}
        <div className="hidden md:flex items-center gap-8 min-[1380px]:gap-12 min-[1380px]:absolute min-[1380px]:left-1/2 min-[1380px]:top-1/2 min-[1380px]:-translate-x-1/2 min-[1380px]:-translate-y-1/2">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.label}
                href={link.href}
                className="relative group font-serif text-[13px] font-medium tracking-[0.28em] uppercase"
              >
                <span
                  style={{
                    color: active
                      ? '#FDC921'
                      : onHero ? '#FFFFFF' : '#2E2118',
                    transition: 'color 300ms ease-out',
                  }}
                >
                  {link.label}
                </span>
                {/* Underline — always visible when active, reveals on hover otherwise */}
                <span
                  className={`absolute -bottom-[3px] left-0 h-px bg-[#FDC921] transition-all duration-[400ms] ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right group — language switcher + Voir la Galerie CTA (unchanged position) */}
        <div className="hidden md:flex items-center gap-8">
          {/* Language switcher */}
          <LanguageSwitcher onHero={onHero} />

          {/* Voir la Galerie CTA */}
          <a
            href={`/${locale}/collection`}
            className="group relative inline-flex items-center justify-center px-7 py-[10px] border border-[#FDC921] font-serif text-[12px] font-medium tracking-[0.3em] uppercase overflow-hidden hover:shadow-[0_0_22px_rgba(253,201,33,0.4)] transition-shadow duration-500"
            style={{
              color:      onHero ? '#FFFFFF' : '#2E2118',
              textShadow: onHero ? '0 1px 10px rgba(0,0,0,0.4)' : 'none',
              transition: 'color 300ms ease-out, text-shadow 300ms ease-out, box-shadow 500ms',
            }}
          >
            <span className="relative z-10 group-hover:text-[#2E2118] transition-colors duration-500">
              {t('nav.gallery_cta')}
            </span>
            <span className="absolute inset-0 bg-[#FDC921] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px] p-2"
          aria-label="Menu"
        >
          {(['top', 'mid', 'bot'] as const).map((pos, idx) => (
            <motion.span
              key={pos}
              className="w-6 h-px block"
              style={{ background: onHero ? '#FFFFFF' : '#2E2118' }}
              animate={
                idx === 0 ? (open ? { rotate: 45,  y: 6  } : { rotate: 0, y: 0 }) :
                idx === 1 ? (open ? { opacity: 0 } : { opacity: 1 }) :
                            (open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 })
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-[#FFFDF7] flex flex-col items-center justify-center gap-8 md:hidden"
        initial={{ opacity: 0, y: '-100%' }}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: '-100%' }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {links.map((link, i) => {
          const active = isActive(link);
          return (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 20 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-serif text-4xl font-light transition-colors duration-300"
                style={{ color: active ? '#FDC921' : '#2E2118' }}
              >
                {link.label}
              </Link>
            </motion.div>
          );
        })}

        <div className="w-12 h-px bg-[#FDC921] mt-2" />

        {/* Language switcher in mobile menu */}
        <LanguageSwitcher mobile />

        <a
          href="https://wa.me/213559315935"
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-sm tracking-[0.3em] text-[#2E2118]/60 uppercase hover:text-[#FDC921] transition-colors duration-300"
        >
          Commander
        </a>
      </motion.div>
    </>
  );
}

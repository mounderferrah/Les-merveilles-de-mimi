'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

const links = [
  { href: '/', label: 'Accueil' },
  { href: '/collection', label: 'Collection' },
  { href: '#story', label: 'Histoire' },
  { href: '/collection', label: 'Galerie' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Hero mode only on the home page while the video is still in view.
  // Every other page (Collection, Histoire, Contact…) starts in dark mode
  // immediately — no scroll required.
  const onHero = pathname === '/' && !scrolled;

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
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className="font-serif text-[1.05rem] font-light tracking-[0.08em] transition-all duration-500 group-hover:opacity-70"
            style={{
              color:      onHero ? '#FFFFFF' : '#2E2118',
              textShadow: onHero ? '0 1px 12px rgba(0,0,0,0.5)' : 'none',
              transition: 'color 300ms ease-out, text-shadow 300ms ease-out',
            }}
          >
            Les Merveilles
          </span>
          <span
            className="font-serif text-xs italic tracking-[0.2em]"
            style={{
              color:      '#FDC921',
              textShadow: onHero ? '0 1px 12px rgba(0,0,0,0.4)' : 'none',
              transition: 'text-shadow 300ms ease-out',
            }}
          >
            de Mimi
          </span>
        </Link>

        {/* Desktop nav links — Cormorant Garamond, white over hero */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative group font-serif text-[13px] font-medium tracking-[0.28em] uppercase"
              style={{
                color:      onHero ? 'rgba(255,255,255,0.78)' : 'rgba(46,33,24,0.65)',
                textShadow: onHero ? '0 1px 10px rgba(0,0,0,0.45)' : 'none',
                transition: 'color 300ms ease-out, text-shadow 300ms ease-out',
              }}
            >
              <span
                style={{
                  color: onHero ? '#FFFFFF' : '#2E2118',
                  transition: 'color 300ms ease-out',
                }}
              >
                {link.label}
              </span>
              {/* Gold underline reveal */}
              <span className="absolute -bottom-[3px] left-0 w-0 h-px bg-[#FDC921] group-hover:w-full transition-all duration-400" />
            </Link>
          ))}

          {/* Commander button */}
          <a
            href="/collection"
            className="group relative inline-flex items-center justify-center px-7 py-[10px] border border-[#FDC921] font-serif text-[12px] font-medium tracking-[0.3em] uppercase overflow-hidden hover:shadow-[0_0_22px_rgba(253,201,33,0.4)] transition-shadow duration-500"
            style={{
              color:      onHero ? '#FFFFFF' : '#2E2118',
              textShadow: onHero ? '0 1px 10px rgba(0,0,0,0.4)' : 'none',
              transition: 'color 300ms ease-out, text-shadow 300ms ease-out, box-shadow 500ms',
            }}
          >
            <span className="relative z-10 group-hover:text-[#2E2118] transition-colors duration-500">
              Voir la Galerie
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
        className="fixed inset-0 z-40 bg-[#FFFDF7] flex flex-col items-center justify-center gap-10 md:hidden"
        initial={{ opacity: 0, y: '-100%' }}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: '-100%' }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {links.map((link, i) => (
          <motion.div
            key={link.label}
            initial={{ opacity: 0, y: 20 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <Link
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-serif text-4xl font-light text-[#2E2118] hover:text-[#FDC921] transition-colors duration-300"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
        <div className="w-12 h-px bg-[#FDC921] mt-4" />
        <a
          href="https://wa.me/213000000000"
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

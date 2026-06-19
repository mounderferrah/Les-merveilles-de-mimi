'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/les_merveilles_de_mimi_',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/213000000000',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#1A110B] py-20 px-6 relative overflow-hidden">
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#FDC921]/20" />

      {/* Background ornament */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #FDC921 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-16 md:gap-8 mb-16">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-light text-white tracking-wide">
                Les Merveilles
              </h3>
              <p className="font-serif italic text-[#FDC921] text-sm">de Mimi</p>
            </div>
            <p className="font-sans text-xs leading-[2] text-white/30 tracking-wide">
              Chaque création est réalisée avec passion, tradition<br />
              et raffinement depuis plus de 13 ans.
            </p>
            <div className="flex items-center gap-4 mt-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/30 hover:text-[#FDC921] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(253,201,33,0.6)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.4em] text-white/30 uppercase mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/collection', label: 'Collection' },
                { href: '#story', label: 'Notre Histoire' },
                { href: '/collection', label: 'Galerie' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-sans text-sm text-white/40 hover:text-[#FDC921] transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.4em] text-white/30 uppercase mb-6">
              Nous Contacter
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/213000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
              >
                <span className="text-[#FDC921]/50 group-hover:text-[#FDC921] transition-colors duration-300">📱</span>
                <span className="font-sans text-sm text-white/40 group-hover:text-white/70 transition-colors duration-300">+213 000 000 000</span>
              </a>
              <a
                href="mailto:contact@lesmerveillesdmimi.dz"
                className="flex items-center gap-3 group"
              >
                <span className="text-[#FDC921]/50 group-hover:text-[#FDC921] transition-colors duration-300">✉</span>
                <span className="font-sans text-sm text-white/40 group-hover:text-white/70 transition-colors duration-300">contact@lesmerveillesdmimi.dz</span>
              </a>
              <div className="flex items-start gap-3">
                <span className="text-[#FDC921]/50 mt-0.5">📍</span>
                <span className="font-sans text-sm text-white/40 leading-relaxed">Algérie</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/213000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 border border-[#FDC921]/20 px-6 py-3 font-sans text-[10px] tracking-[0.35em] text-[#FDC921] uppercase hover:bg-[#FDC921] hover:text-[#2E2118] hover:border-[#FDC921] transition-all duration-400"
            >
              Nous Contacter sur WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-[#FDC921]/30" />
            <span className="text-[#FDC921] text-sm">✦</span>
            <div className="w-6 h-px bg-[#FDC921]/30" />
          </div>
          <p className="font-sans text-[10px] tracking-[0.3em] text-white/15 uppercase">
            © {new Date().getFullYear()} Les Merveilles de Mimi — Tous droits réservés
          </p>
          <p className="font-sans text-[10px] text-white/10">
            Tradition · Passion · Raffinement
          </p>
        </div>
      </div>
    </footer>
  );
}

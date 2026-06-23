'use client';

import Link from 'next/link';
import { useT, useLocale } from '@/i18n';

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href:  'https://www.instagram.com/les_merveilles_de_mimi_',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href:  'https://www.facebook.com/profile.php?id=100032452882424&locale=fr_FR',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href:  'https://wa.me/213559315935',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
];

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

export default function Footer() {
  const t = useT();
  const locale = useLocale();

  return (
    <footer id="contact" className="bg-[#1E0E07] py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#FDC921]/20" />

      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #FDC921 1px, transparent 1px)`,
          backgroundSize:  '40px 40px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-16 md:gap-8 mb-16">

          {/* Brand */}
          <div>
            <div className="mb-6">
              <h3 className="brand-latin font-serif text-2xl font-light text-[#FFFDF7] tracking-wide">
                Les Merveilles
              </h3>
              <p className="brand-latin font-serif italic text-[#FDC921] text-sm">de Mimi</p>
            </div>
            <p className="font-sans text-xs leading-[2] text-[#FFFDF7]/30 tracking-wide">
              {t('footer.tagline')}
            </p>

            <div className="flex items-center gap-3 mt-8">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-[#FFFDF7]/10 text-[#FFFDF7]/35 cursor-pointer transition-all duration-[600ms] hover:text-[#FDC921] hover:border-[#FDC921]/50 hover:scale-110 hover:shadow-[0_0_16px_rgba(253,201,33,0.30)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.4em] text-[#FFFDF7]/30 uppercase mb-6">
              {t('footer.nav.label')}
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: `/${locale}`,              labelKey: 'nav.home'       },
                { href: `/${locale}/collection`,   labelKey: 'nav.collection' },
                { href: `/${locale}#histoire`,     labelKey: 'nav.history'    },
                { href: `/${locale}#contact`,      labelKey: 'nav.contact'    },
              ].map((link) => (
                <Link
                  key={link.labelKey}
                  href={link.href}
                  className="font-sans text-sm text-[#FFFDF7]/40 hover:text-[#FDC921] transition-colors duration-300 tracking-wide"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[10px] tracking-[0.4em] text-[#FFFDF7]/30 uppercase mb-6">
              {t('footer.contact.label')}
            </h4>

            <div className="flex flex-col gap-4">
              <a href="tel:+213559315935" className="flex items-center gap-3 group">
                <span className="text-[#FDC921]/50 group-hover:text-[#FDC921] transition-colors duration-300">
                  <PhoneIcon />
                </span>
                <span className="font-sans text-sm text-[#FFFDF7]/40 group-hover:text-[#FFFDF7]/70 transition-colors duration-300">
                  +213 559 31 59 35
                </span>
              </a>

              <div className="flex items-center gap-3">
                <span className="text-[#FDC921]/50">
                  <LocationIcon />
                </span>
                <span className="font-sans text-sm text-[#FFFDF7]/40">{t('footer.location.label')}</span>
              </div>
            </div>

            <a
              href="https://wa.me/213559315935"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 border border-[#FDC921]/20 px-6 py-3 font-sans text-[10px] tracking-[0.35em] text-[#FDC921] uppercase hover:bg-[#FDC921] hover:text-[#2E2118] hover:border-[#FDC921] transition-all duration-500"
            >
              {t('footer.whatsapp.cta')}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#FFFDF7]/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-px bg-[#FDC921]/30" />
            <span className="text-[#FDC921] text-sm">✦</span>
            <div className="w-6 h-px bg-[#FDC921]/30" />
          </div>
          <p className="font-sans text-[10px] tracking-[0.3em] text-[#FFFDF7]/15 uppercase">
            © {new Date().getFullYear()} Les Merveilles de Mimi — {t('footer.copyright')}
          </p>
          <p className="font-sans text-[10px] text-[#FFFDF7]/10">
            {t('footer.motto')}
          </p>
        </div>
      </div>
    </footer>
  );
}

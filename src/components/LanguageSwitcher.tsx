'use client';

import { useLocale, LOCALES, type Locale } from '@/i18n';
import { useRouter, usePathname } from 'next/navigation';

const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
  ar: 'العربية',
};

function stripLocalePrefix(pathname: string): string {
  return pathname.replace(/^\/(fr|en|ar)/, '') || '/';
}

interface LanguageSwitcherProps {
  mobile?: boolean;
  onHero?: boolean; // true = dark hero bg, false = light scrolled navbar
}

export default function LanguageSwitcher({ mobile = false, onHero = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: Locale) {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    const path = stripLocalePrefix(pathname);
    router.push(`/${newLocale}${path === '/' ? '' : path}`);
  }

  // Separator color adapts to background. The mobile menu overlay is cream,
  // so the mobile switcher uses the dark palette (not the dark-video one).
  const separatorColor = mobile
    ? 'rgba(46,33,24,0.25)'
    : onHero
    ? 'rgba(255,255,255,0.30)'
    : 'rgba(46,33,24,0.20)';

  // Inactive label color adapts to background
  const inactiveColor = mobile
    ? '#7A6A5A'
    : onHero
    ? 'rgba(255,255,255,0.55)'
    : '#7A6A5A';

  // Hover color adapts to background
  const hoverClass = !mobile && onHero ? 'hover:text-[#FFFDF7]' : 'hover:text-[#2E2118]';

  if (mobile) {
    return (
      <div
        className="flex items-center gap-3 px-5 py-2.5 rounded-full"
        style={{
          background: 'rgba(46,33,24,0.04)',
          border: '1px solid rgba(46,33,24,0.12)',
        }}
      >
        {LOCALES.map((l, i) => (
          <span key={l} className="flex items-center gap-3">
            {i > 0 && (
              <span
                className="select-none font-sans"
                style={{ color: separatorColor, fontSize: 11 }}
              >
                ·
              </span>
            )}
            <button
              onClick={() => switchLocale(l)}
              className={`font-sans text-[12px] tracking-[0.15em] font-medium transition-colors duration-500 ${hoverClass}`}
              style={{
                color: locale === l ? '#FDC921' : inactiveColor,
                fontWeight: locale === l ? 600 : 500,
              }}
              aria-label={`Switch to ${l}`}
              aria-current={locale === l ? 'true' : undefined}
            >
              {LOCALE_LABELS[l]}
            </button>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && (
            <span
              className="select-none font-sans"
              style={{ color: separatorColor, fontSize: 10, transition: 'color 500ms ease-out' }}
            >
              ·
            </span>
          )}
          <button
            onClick={() => switchLocale(l)}
            className={`font-sans text-[12px] tracking-[0.15em] font-medium transition-colors duration-500 ${hoverClass}`}
            style={{
              color: locale === l ? '#FDC921' : inactiveColor,
              fontWeight: locale === l ? 600 : 500,
              transition: 'color 500ms ease-out',
            }}
            aria-label={`Switch to ${l}`}
            aria-current={locale === l ? 'true' : undefined}
          >
            {LOCALE_LABELS[l]}
          </button>
        </span>
      ))}
    </div>
  );
}

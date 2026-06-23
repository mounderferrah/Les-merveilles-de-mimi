import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LOCALES, type Locale } from '@/i18n/config';

const DEFAULT_LOCALE: Locale = 'fr';

function getLocale(request: NextRequest): Locale {
  // 1. Saved cookie preference
  const cookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookie && LOCALES.includes(cookie as Locale)) {
    return cookie as Locale;
  }

  // 2. Accept-Language header — first matching locale wins
  const acceptLang = request.headers.get('accept-language') ?? '';
  if (/\bar\b/i.test(acceptLang)) return 'ar';
  if (/\ben\b/i.test(acceptLang)) return 'en';

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already locale-prefixed — pass through
  if (LOCALES.some((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`)) {
    return NextResponse.next();
  }

  // Redirect bare paths to the appropriate locale
  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and files with extensions
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:jpg|jpeg|png|gif|webp|svg|mp4|ico|txt|xml|json)$).*)',
  ],
};

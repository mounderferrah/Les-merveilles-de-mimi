export type Locale = 'fr' | 'en' | 'ar';
export type Messages = Record<string, string>;

export const LOCALES: Locale[] = ['fr', 'en', 'ar'];

export function isRTL(locale: Locale): boolean {
  return locale === 'ar';
}

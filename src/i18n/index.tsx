'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Locale, Messages } from './config';
import { useMarkInitialLoadComplete } from '@/lib/useInitialLoad';

export type { Locale, Messages };
export { LOCALES, isRTL } from './config';

interface I18nContextValue {
  locale: Locale;
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export default function I18nProvider({ locale, messages, children }: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  // Mounts once per document load and persists across client navigation — the
  // ideal place to mark the initial load as complete for the intro gate.
  useMarkInitialLoadComplete();

  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function useT(): (key: string) => string {
  const { messages } = useI18n();
  return (key: string) => messages[key] ?? key;
}

export function useLocale(): Locale {
  return useI18n().locale;
}

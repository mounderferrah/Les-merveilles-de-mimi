import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import I18nProvider from '@/i18n';
import { LOCALES, isRTL, type Locale, type Messages } from '@/i18n/config';
import SmoothScroll from '@/components/SmoothScroll';
import '../globals.css';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<unknown>;
};

function hasLocale(lang: string): lang is Locale {
  return LOCALES.includes(lang as Locale);
}

async function loadMessages(locale: Locale): Promise<Messages> {
  const m = await import(`../../../messages/${locale}.json`);
  return m.default as Messages;
}

export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { lang } = (await params) as { lang: string };
  const locale = hasLocale(lang) ? lang : 'fr';
  const messages = await loadMessages(locale);

  const base = 'https://lesmerveillesdmimi.dz';

  return {
    title: messages['meta.home.title'] ?? 'Les Merveilles de Mimi',
    description: messages['meta.home.desc'] ?? 'Pâtisseries artisanales depuis 2012.',
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        fr: `${base}/fr`,
        en: `${base}/en`,
        ar: `${base}/ar`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { lang } = (await params) as { lang: string };

  if (!hasLocale(lang)) notFound();

  const messages = await loadMessages(lang);
  const dir = isRTL(lang) ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Inter:wght@300;400;500&family=Poppins:wght@300;400;500&family=Noto+Naskh+Arabic:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full antialiased bg-ivory text-brown overflow-x-hidden">
        <I18nProvider locale={lang} messages={messages}>
          <SmoothScroll>{children}</SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}

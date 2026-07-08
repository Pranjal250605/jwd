import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import {
  Shippori_Mincho_B1,
  Cormorant_Garamond,
  Inter,
  IBM_Plex_Mono,
} from 'next/font/google';
import { routing } from '@/i18n/routing';
import { SmoothScroll } from '@/components/SmoothScroll';
import { ChatWidget } from '@/components/advisor/ChatWidget';
import '../globals.css';

const shippori = Shippori_Mincho_B1({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-shippori',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'JWD INVESTMENT — 日本とドバイを結ぶ、資産の架け橋',
    template: '%s | JWD INVESTMENT',
  },
  description:
    'The Bridge Between Japan & Dubai Real Estate and Wealth Creation. ドバイ不動産投資・日本不動産・ファミリーオフィスまで、二つの市場を知り尽くしたパートナー。',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${shippori.variable} ${cormorant.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body>
        <NextIntlClientProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <ChatWidget />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

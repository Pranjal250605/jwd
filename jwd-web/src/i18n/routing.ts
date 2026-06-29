import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  // ja lives at "/", en at "/en" — JP is the primary market
  localePrefix: 'as-needed',
  // Always open in Japanese: ignore the browser's accept-language header and
  // the locale cookie so "/" never auto-redirects English browsers to /en.
  // The navbar's EN toggle still works — it links to the /en path directly.
  localeDetection: false,
});

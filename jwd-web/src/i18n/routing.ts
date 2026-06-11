import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  // ja lives at "/", en at "/en" — JP is the primary market
  localePrefix: 'as-needed',
});

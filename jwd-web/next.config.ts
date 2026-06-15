import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Locally the repo root has its own package-lock, so pin file tracing to this
  // app to silence the multi-lockfile warning. On Vercel the app builds in
  // isolation (Root Directory = jwd-web); pinning it there makes Vercel's
  // builder look for .next at the wrong level (ENOENT .next/package.json), so
  // let Vercel resolve the output paths itself.
  ...(process.env.VERCEL ? {} : { outputFileTracingRoot: import.meta.dirname }),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default withNextIntl(nextConfig);

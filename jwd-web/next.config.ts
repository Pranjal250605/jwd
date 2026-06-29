import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/**
 * Baseline security headers applied to every route. These are the low-breakage,
 * high-value ones: clickjacking protection (frame-ancestors / X-Frame-Options),
 * MIME-sniffing off, a tight referrer policy, a locked-down permissions policy,
 * and HSTS. We intentionally do NOT ship a full script-src CSP yet — that needs
 * per-source tuning (Next inline bootstrap, framer-motion, future TradingView)
 * and is a separate hardening pass.
 */
const SECURITY_HEADERS = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'" },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }];
  },
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

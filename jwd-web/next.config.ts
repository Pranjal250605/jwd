import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Repo root has its own package-lock; pin tracing to this app
  outputFileTracingRoot: import.meta.dirname,
};

export default withNextIntl(nextConfig);

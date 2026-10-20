import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // The technology pages were removed (the site no longer names its stack);
  // old links land on the services page.
  async redirects() {
    return [
      { source: '/tecnologias', destination: '/servicios', permanent: true },
      { source: '/tecnologias/:slug', destination: '/servicios', permanent: true },
      { source: '/en/tecnologias', destination: '/en/services', permanent: true },
      { source: '/en/tecnologias/:slug', destination: '/en/services', permanent: true },
    ];
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default withNextIntl(nextConfig);

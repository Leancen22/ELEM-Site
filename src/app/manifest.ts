import type { MetadataRoute } from 'next';
import { site, siteCopy } from '@/lib/site';
import { defaultLocale } from '@/i18n/config';

export default function manifest(): MetadataRoute.Manifest {
  const copy = siteCopy[defaultLocale];
  return {
    name: `${site.name} | ${copy.tagline}`,
    short_name: site.name,
    description: copy.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#fff1f4',
    theme_color: '#e81457',
    icons: [
      { src: '/favicon.ico', sizes: '512x512', type: 'image/png' },
      { src: '/favicon.ico', type: 'image/x-icon' },
    ],
  };
}

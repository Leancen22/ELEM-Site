import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale, LOCALE_COOKIE } from './config';

/**
 * Localized routing: Spanish keeps clean URLs (no prefix), English is served
 * under /en with translated slugs. The keys below are the internal (canonical)
 * paths that match the folders under `src/app/[locale]`; the values are the
 * public slugs per locale.
 */
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeCookie: { name: LOCALE_COOKIE },
  // The URL is the single source of truth for the language. Without this,
  // a NEXT_LOCALE=en cookie (or an English browser) makes next-intl redirect
  // every Spanish path to its /en equivalent. The locale only changes through
  // the explicit header switch.
  localeDetection: false,
  pathnames: {
    '/': '/',
    '/servicios': { es: '/servicios', en: '/services' },
    '/soluciones': { es: '/soluciones', en: '/solutions' },
    '/casos-de-exito': { es: '/casos-de-exito', en: '/case-studies' },
    '/nosotros': { es: '/nosotros', en: '/about' },
    '/contacto': { es: '/contacto', en: '/contact' },
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/mapa-del-sitio': { es: '/mapa-del-sitio', en: '/sitemap' },
    '/tecnologias': '/tecnologias',
    '/tecnologias/[slug]': '/tecnologias/[slug]',
    '/legal/[doc]': '/legal/[doc]',
  },
});

export type Pathname = keyof typeof routing.pathnames;

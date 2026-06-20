import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { posts, postSlugs } from '@/content/blog';
import { techSlugs } from '@/content/tech';
import { defaultLocale, locales } from '@/i18n/config';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

type Internal = keyof typeof routing.pathnames;
type Href = Parameters<typeof getPathname>[0]['href'];
type StaticHref = Exclude<Internal, '/blog/[slug]' | '/legal/[doc]' | '/tecnologias/[slug]'>;

function url(locale: (typeof locales)[number], href: Href) {
  return `${site.url}${getPathname({ locale, href })}`;
}

/** Emits every static route in both locales with hreflang alternates. */
function entry(href: StaticHref, priority: number, lastModified: Date) {
  const languages = Object.fromEntries(
    locales.map((l) => [l, url(l, href)])
  ) as Record<(typeof locales)[number], string>;

  return {
    url: url(defaultLocale, href),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: StaticHref[] = [
    '/',
    '/servicios',
    // '/soluciones', // oculto: menú fusionado en Servicios

    '/tecnologias',
    // '/casos-de-exito', // oculto: empresa nueva, sin casos/referencias todavía
    '/blog',
    '/nosotros',
    '/contacto',
  ];

  const staticEntries = staticRoutes.map((href) =>
    entry(href, href === '/' ? 1 : 0.8, now)
  );

  const techEntries = techSlugs.map((slug) => {
    const href = { pathname: '/tecnologias/[slug]', params: { slug } } as const;
    const languages = Object.fromEntries(
      locales.map((l) => [l, url(l, href)])
    ) as Record<(typeof locales)[number], string>;
    return {
      url: url(defaultLocale, href),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages },
    };
  });

  const legalDocs = ['privacidad', 'cookies', 'aviso-legal'];
  const legalEntries = legalDocs.map((doc) => {
    const href = { pathname: '/legal/[doc]', params: { doc } } as const;
    const languages = Object.fromEntries(
      locales.map((l) => [l, url(l, href)])
    ) as Record<(typeof locales)[number], string>;
    return {
      url: url(defaultLocale, href),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: { languages },
    };
  });

  const blogRoutes = postSlugs.map((slug) => {
    const post = posts[defaultLocale].find((p) => p.slug === slug)!;
    const href = { pathname: '/blog/[slug]', params: { slug } } as const;
    const languages = Object.fromEntries(
      locales.map((l) => [l, url(l, href)])
    ) as Record<(typeof locales)[number], string>;
    return {
      url: url(defaultLocale, href),
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: { languages },
    };
  });

  return [...staticEntries, ...techEntries, ...legalEntries, ...blogRoutes];
}

import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { getAllNews, newsSlugs } from '@/content/news';
// Oculto: blog desactivado por ahora.
// import { getAllPosts, postSlugs } from '@/content/blog';
import { defaultLocale, locales } from '@/i18n/config';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

type Internal = keyof typeof routing.pathnames;
type Href = Parameters<typeof getPathname>[0]['href'];
type StaticHref = Exclude<Internal, '/blog/[slug]' | '/noticias/[slug]' | '/legal/[doc]'>;

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

    '/como-trabajamos',
    // '/casos-de-exito', // oculto: empresa nueva, sin casos/referencias todavía
    // '/blog', // oculto: blog desactivado por ahora
    '/nosotros',
    '/noticias',
    '/contacto',
  ];

  const staticEntries = staticRoutes.map((href) =>
    entry(href, href === '/' ? 1 : 0.8, now)
  );

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

  const newsMeta = getAllNews(defaultLocale);
  const newsEntries = newsSlugs.map((slug) => {
    const item = newsMeta.find((n) => n.slug === slug);
    const href = { pathname: '/noticias/[slug]', params: { slug } } as const;
    const languages = Object.fromEntries(
      locales.map((l) => [l, url(l, href)])
    ) as Record<(typeof locales)[number], string>;
    return {
      url: url(defaultLocale, href),
      lastModified: item ? new Date(item.date) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: { languages },
    };
  });

  // Oculto: blog desactivado por ahora (página _blog fuera de rutas).
  // const blogMeta = getAllPosts(defaultLocale);
  // const blogRoutes = postSlugs.map((slug) => {
  //   const post = blogMeta.find((p) => p.slug === slug);
  //   const href = { pathname: '/blog/[slug]', params: { slug } } as const;
  //   const languages = Object.fromEntries(
  //     locales.map((l) => [l, url(l, href)])
  //   ) as Record<(typeof locales)[number], string>;
  //   return {
  //     url: url(defaultLocale, href),
  //     lastModified: post ? new Date(post.date) : now,
  //     changeFrequency: 'monthly' as const,
  //     priority: 0.6,
  //     alternates: { languages },
  //   };
  // });

  return [...staticEntries, ...newsEntries, ...legalEntries];
}

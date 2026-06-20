import type { Metadata } from 'next';
import { site } from '@/lib/site';
import { locales, type Locale } from '@/i18n/config';
import { getPathname } from '@/i18n/navigation';

type Href = Parameters<typeof getPathname>[0]['href'];

export function buildMetadata({
  title,
  description,
  locale,
  href,
}: {
  title: string;
  description: string;
  locale: Locale;
  href: Href;
}): Metadata {
  const path = getPathname({ locale, href });
  const url = `${site.url}${path}`;
  const languages = Object.fromEntries(
    locales.map((l) => [l, `${site.url}${getPathname({ locale: l, href })}`])
  );
  return {
    title,
    description,
    alternates: { canonical: path, languages },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title: `${title} · ${site.name}`,
      description,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${site.name}`,
      description,
      images: ['/opengraph-image'],
    },
  };
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TechLanding } from '@/components/tech/tech-landing';
import { getTechPage, techSlugs } from '@/content/tech';
import { ui } from '@/content/ui';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, serviceSchema, faqSchema, breadcrumbSchema } from '@/components/seo/json-ld';

export function generateStaticParams() {
  return techSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const page = getTechPage(slug, locale);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.hero.description,
    locale,
    href: { pathname: '/tecnologias/[slug]', params: { slug } },
  });
}

export default async function TechnologyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const page = getTechPage(slug, locale);
  if (!page) notFound();
  return (
    <>
      <JsonLd data={serviceSchema({ name: page.metaTitle, description: page.hero.description, slug: `tecnologias/${slug}` })} />
      <JsonLd data={faqSchema(page.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: ui[locale].tech.breadcrumbHome, href: '/' },
          { name: ui[locale].tech.breadcrumbTech, href: '/tecnologias' },
          { name: page.name, href: `/tecnologias/${slug}` },
        ])}
      />
      <TechLanding page={page} locale={locale as Locale} />
    </>
  );
}

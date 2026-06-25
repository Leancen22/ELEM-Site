import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { BlogIndex } from '@/components/blog/blog-index';
import { getAllPosts } from '@/content/blog';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  blog: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  all: string;
  featured: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Blog',
    metaDesc:
      'Artículos de ingeniería sobre Drupal, Next.js, Java y Python: arquitectura, performance, APIs, DevOps y modernización de sistemas.',
    home: 'Inicio',
    blog: 'Blog',
    heroTitle: 'Ideas de ingeniería que',
    heroHighlight: 'comparten valor',
    heroDesc:
      'Lo que aprendemos construyendo software de nivel enterprise, sin humo y con ejemplos reales.',
    all: 'Todos',
    featured: 'Destacado',
  },
  en: {
    metaTitle: 'Blog',
    metaDesc:
      'Engineering articles on Drupal, Next.js, Java and Python: architecture, performance, APIs, DevOps and system modernization.',
    home: 'Home',
    blog: 'Blog',
    heroTitle: 'Engineering ideas that',
    heroHighlight: 'share value',
    heroDesc:
      'What we learn building enterprise-grade software, no fluff and with real examples.',
    all: 'All',
    featured: 'Featured',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = content[locale];
  return buildMetadata({ title: t.metaTitle, description: t.metaDesc, locale, href: '/blog' });
}

export default async function BlogPage() {
  const locale = await getLocale();
  const t = content[locale];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, href: '/' },
          { name: t.blog, href: '/blog' },
        ])}
      />
      <PageHero
        eyebrow={t.blog}
        title={t.heroTitle}
        highlight={t.heroHighlight}
        description={t.heroDesc}
        breadcrumbs={[
          { name: t.home, href: '/' },
          { name: t.blog, href: '/blog' },
        ]}
      />

      <Section className="pt-4">
        <BlogIndex posts={getAllPosts(locale)} locale={locale} allLabel={t.all} featuredLabel={t.featured} />
      </Section>
    </>
  );
}

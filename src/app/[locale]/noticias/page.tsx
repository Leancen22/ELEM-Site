import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/components/i18n/link';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { getAllNews, formatDate } from '@/content/news';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  news: string;
  heroTitle: string;
  heroDesc: string;
  read: string;
  empty: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Noticias',
    metaDesc: 'Avisos de seguridad y novedades que afectan a los sistemas de nuestros clientes, explicados con claridad.',
    home: 'Inicio',
    news: 'Noticias',
    heroTitle: 'Noticias',
    heroDesc: 'Avisos y novedades que pueden afectar a tus sistemas, con lo que hay que hacer al respecto.',
    read: 'Leer noticia',
    empty: 'Todavía no hay noticias publicadas.',
  },
  en: {
    metaTitle: 'News',
    metaDesc: 'Security advisories and updates that affect our clients’ systems, explained clearly.',
    home: 'Home',
    news: 'News',
    heroTitle: 'News',
    heroDesc: 'Advisories and updates that may affect your systems, and what to do about them.',
    read: 'Read more',
    empty: 'No news published yet.',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = content[locale];
  return buildMetadata({ title: t.metaTitle, description: t.metaDesc, locale, href: '/noticias' });
}

export default async function NewsPage() {
  const locale = await getLocale();
  const t = content[locale];
  const items = getAllNews(locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, href: '/' },
          { name: t.news, href: '/noticias' },
        ])}
      />
      <PageHero
        eyebrow={t.news}
        title={t.heroTitle}
        description={t.heroDesc}
        breadcrumbs={[
          { name: t.home, href: '/' },
          { name: t.news, href: '/noticias' },
        ]}
      />

      <Section>
        {items.length === 0 ? (
          <p className="text-lg text-muted-foreground">{t.empty}</p>
        ) : (
          <ol className="border-t border-border">
            {items.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={Math.min(i, 3) * 0.05} className="border-b border-border">
                <Link
                  href={`/noticias/${item.slug}`}
                  className="group grid gap-3 py-8 md:grid-cols-[12rem_1fr_auto] md:gap-10"
                >
                  <div className="text-[15px] text-muted-foreground">
                    <time dateTime={item.date} className="tabular-nums">{formatDate(item.date, locale)}</time>
                    {item.category ? <span className="block text-primary">{item.category}</span> : null}
                  </div>
                  <div className="max-w-3xl">
                    <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                      {item.title}
                    </h2>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{item.excerpt}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 self-start text-[15px] font-medium md:pt-1">
                    {t.read}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        )}
      </Section>
    </>
  );
}

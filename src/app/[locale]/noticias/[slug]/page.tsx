import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from '@/components/i18n/link';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/motion/reveal';
import { getNews, newsSlugs, formatDate } from '@/content/news';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import { getPathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { cn } from '@/lib/utils';

const copy: Record<Locale, { home: string; news: string; back: string; talk: string }> = {
  es: { home: 'Inicio', news: 'Noticias', back: 'Volver a noticias', talk: 'Hablemos' },
  en: { home: 'Home', news: 'News', back: 'Back to news', talk: 'Let’s talk' },
};

export function generateStaticParams() {
  return newsSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const item = getNews(slug, locale);
  if (!item) return {};
  return buildMetadata({
    title: item.title,
    description: item.excerpt,
    locale,
    href: { pathname: '/noticias/[slug]', params: { slug: item.slug } },
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const item = getNews(slug, locale);
  if (!item) notFound();

  const t = copy[locale];
  const href = `/noticias/${item.slug}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.excerpt,
    datePublished: item.date,
    author: { '@type': 'Organization', name: site.legalName },
    publisher: { '@type': 'Organization', name: site.legalName },
    mainEntityOfPage: `${site.url}${getPathname({
      locale,
      href: { pathname: '/noticias/[slug]', params: { slug: item.slug } },
    })}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, href: '/' },
          { name: t.news, href: '/noticias' },
          { name: item.title, href },
        ])}
      />

      <article>
        <PageHero
          title={item.title}
          description={item.excerpt}
          breadcrumbs={[
            { name: t.home, href: '/' },
            { name: t.news, href: '/noticias' },
            { name: item.category || item.title, href },
          ]}
        >
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] text-muted-foreground">
            <time dateTime={item.date} className="tabular-nums">{formatDate(item.date, locale)}</time>
            {item.category ? (
              <>
                <span aria-hidden>·</span>
                <span className="text-primary">{item.category}</span>
              </>
            ) : null}
            <span aria-hidden>·</span>
            <span>{item.author}</span>
          </p>
        </PageHero>

        <Section className="!pt-12 sm:!pt-16">
          <div className="mx-auto max-w-[680px]">
            <Reveal amount={0}>
              <div
                className={cn(
                  'prose prose-lg max-w-none dark:prose-invert',
                  'prose-headings:tracking-tight prose-h2:mt-12 prose-h2:mb-3 prose-h2:text-[1.5rem]',
                  'prose-p:text-pretty prose-p:leading-[1.8] prose-p:text-foreground/85',
                  'prose-strong:text-foreground prose-li:text-foreground/85',
                  'prose-a:font-medium prose-a:text-primary prose-a:underline-offset-4',
                  'prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none',
                  'prose-pre:border prose-pre:border-border prose-pre:bg-muted prose-pre:text-foreground [&_pre_code]:bg-transparent [&_pre_code]:p-0'
                )}
                dangerouslySetInnerHTML={{ __html: item.contentHtml }}
              />
            </Reveal>

            <div className="mt-14 flex items-center justify-between border-t border-border pt-8">
              <Button asChild variant="ghost">
                <Link href="/noticias">
                  <ArrowLeft className="size-4" /> {t.back}
                </Link>
              </Button>
              <Button asChild>
                <Link href="/contacto">
                  {t.talk} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Section>
      </article>
    </>
  );
}

import type { Metadata } from 'next';
import { Link } from '@/components/i18n/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Aurora } from '@/components/visuals/aurora';
import { Reveal } from '@/components/motion/reveal';
import { posts, postSlugs, getPost, formatDate } from '@/content/blog';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { cn } from '@/lib/utils';

const copy: Record<Locale, { home: string; blog: string; back: string; talk: string; keepReading: string }> = {
  es: { home: 'Inicio', blog: 'Blog', back: 'Volver al blog', talk: 'Hablemos', keepReading: 'Sigue leyendo' },
  en: { home: 'Home', blog: 'Blog', back: 'Back to blog', talk: 'Let’s talk', keepReading: 'Keep reading' },
};

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getPost(slug, locale);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    locale,
    href: { pathname: '/blog/[slug]', params: { slug: post.slug } },
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = getPost(slug, locale);
  if (!post) notFound();

  const t = copy[locale];
  const related = posts[locale].filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: site.legalName },
    publisher: { '@type': 'Organization', name: site.legalName },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, href: '/' },
          { name: t.blog, href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ])}
      />

      <article>
        <header className="relative overflow-hidden pb-10 pt-32 sm:pt-40">
          <Aurora />
          <div className="absolute inset-0 bg-grid opacity-[0.14] mask-fade-b" />
          <div className="container-wide relative max-w-3xl">
            <Breadcrumbs
              items={[
                { name: t.home, href: '/' },
                { name: t.blog, href: '/blog' },
                { name: post.category, href: '/blog' },
              ]}
            />
            <Reveal className="mt-8">
              <Badge>{post.category}</Badge>
              <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{post.author}</span>
                <span>·</span>
                <span>{formatDate(post.date, locale)}</span>
                <span>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-3.5" /> {post.readingTime}
                </span>
              </div>
            </Reveal>
          </div>
        </header>

        <div className="container-wide">
          <div className={cn('relative mx-auto h-56 max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br sm:h-72', post.accent)}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,.35),transparent_55%)]" />
            <div className="absolute inset-0 bg-grid opacity-20" />
          </div>
        </div>

        <Section className="pt-14">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-8">
              {post.body.map((block, i) => (
                <Reveal key={i}>
                  {block.heading ? (
                    <h2 className="font-display text-2xl font-bold">{block.heading}</h2>
                  ) : null}
                  <div className="mt-3 space-y-4">
                    {block.paragraphs.map((p, j) => (
                      <p key={j} className="text-lg leading-relaxed text-muted-foreground">
                        {p}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
              <Button asChild variant="ghost">
                <Link href="/blog">
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

      <Section className="border-t border-border/60 bg-muted/30">
        <h2 className="font-display text-2xl font-bold">{t.keepReading}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-background/70 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30"
            >
              <Badge>{p.category}</Badge>
              <h3 className="mt-4 font-display text-base font-bold leading-snug transition-colors group-hover:text-rose-600">
                {p.title}
              </h3>
              <span className="mt-3 text-xs text-muted-foreground">
                {formatDate(p.date, locale)}
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

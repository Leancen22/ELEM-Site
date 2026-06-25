import type { Metadata } from 'next';
import Image from 'next/image';
import { Link } from '@/components/i18n/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Aurora } from '@/components/visuals/aurora';
import { LogoMark } from '@/components/brand/logo';
import { Reveal } from '@/components/motion/reveal';
import { getAllPosts, postSlugs, getPost, formatDate } from '@/content/blog';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { cn } from '@/lib/utils';

const isSvg = (src: string) => src.endsWith('.svg');

const copy: Record<
  Locale,
  { home: string; blog: string; back: string; talk: string; keepReading: string; writtenBy: string; team: string }
> = {
  es: {
    home: 'Inicio',
    blog: 'Blog',
    back: 'Volver al blog',
    talk: 'Hablemos',
    keepReading: 'Sigue leyendo',
    writtenBy: 'Escrito por',
    team: 'Equipo de ingeniería de ELEM',
  },
  en: {
    home: 'Home',
    blog: 'Blog',
    back: 'Back to blog',
    talk: 'Let’s talk',
    keepReading: 'Keep reading',
    writtenBy: 'Written by',
    team: 'ELEM engineering team',
  },
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
  const related = getAllPosts(locale).filter((p) => p.slug !== post.slug).slice(0, 3);

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
        {/* HEADER */}
        <header className="relative overflow-hidden pb-10 pt-32 sm:pt-40">
          <Aurora />
          <div className="absolute inset-0 bg-grid opacity-[0.14] mask-fade-b" />
          <div className="container-wide relative max-w-3xl">
            <Breadcrumbs
              items={[
                { name: t.home, href: '/' },
                { name: t.blog, href: '/blog' },
                { name: post.category, href: `/blog/${post.slug}` },
              ]}
            />
            <Reveal className="mt-8">
              <Badge>{post.category}</Badge>
              <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-[2.75rem] sm:leading-[1.08]">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
              <div className="mt-7 flex items-center gap-3 border-t border-border/70 pt-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-card">
                  <LogoMark className="size-5" />
                </span>
                <div className="text-sm">
                  <div className="font-semibold text-foreground">{post.author}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(post.date, locale)}</span>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" /> {post.readingTime}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </header>

        {/* COVER */}
        <div className="container-wide">
          <div
            className={cn(
              'relative mx-auto mt-4 flex h-48 max-w-3xl items-end overflow-hidden rounded-3xl p-6 sm:mt-6 sm:h-64',
              !post.image && 'bg-gradient-to-br',
              !post.image && post.accent
            )}
          >
            {post.image ? (
              <>
                <Image
                  src={post.image}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-cover"
                  unoptimized={isSvg(post.image)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,.35),transparent_55%)]" />
                <div className="absolute inset-0 bg-grid opacity-20" />
              </>
            )}
            <LogoMark className="absolute right-6 top-6 size-10 opacity-90 [&_*]:fill-white" />
            <span className="relative rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-700">
              {post.category}
            </span>
          </div>
        </div>

        {/* BODY */}
        <Section className="!pt-8 sm:!pt-10">
          <div className="mx-auto max-w-[680px]">
            <Reveal>
              <div
                className={cn(
                  'prose prose-lg max-w-none dark:prose-invert',
                  'prose-headings:font-display prose-headings:tracking-tight',
                  'prose-h2:mt-12 prose-h2:mb-3 prose-h2:text-[1.6rem]',
                  'prose-p:text-pretty prose-p:leading-[1.85] prose-p:text-foreground/85',
                  'prose-strong:text-foreground prose-li:text-foreground/85',
                  'prose-a:font-medium prose-a:text-rose-600 prose-a:no-underline hover:prose-a:underline',
                  'prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none',
                  '[&>p:first-child]:text-xl [&>p:first-child]:leading-[1.7] [&>p:first-child]:text-foreground'
                )}
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />
            </Reveal>

            {/* author byline */}
            <div className="mt-12 flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
              <span className="grid size-12 shrink-0 place-items-center rounded-full border border-border bg-background">
                <LogoMark className="size-6" />
              </span>
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {t.writtenBy}
                </div>
                <div className="font-display text-base font-bold text-foreground">{post.author}</div>
                <div className="text-sm text-muted-foreground">{t.team}</div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-8">
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

      {/* RELATED */}
      <Section className="border-t border-border/60 bg-muted/30">
        <h2 className="font-display text-2xl font-bold tracking-tight">{t.keepReading}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur transition-all hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30"
            >
              <div className={cn('h-1 w-full bg-gradient-to-r', p.accent)} />
              <div className="flex flex-1 flex-col p-6">
                <Badge variant="outline" className="w-fit">{p.category}</Badge>
                <h3 className="mt-4 font-display text-base font-bold leading-snug tracking-tight transition-colors group-hover:text-rose-600">
                  {p.title}
                </h3>
                <span className="mt-4 flex items-center gap-2 border-t border-border/70 pt-4 text-xs text-muted-foreground">
                  {formatDate(p.date, locale)}
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" /> {p.readingTime}
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

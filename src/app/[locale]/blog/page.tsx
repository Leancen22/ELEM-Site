import type { Metadata } from 'next';
import { Link } from '@/components/i18n/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/motion/reveal';
import { posts, formatDate } from '@/content/blog';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { cn } from '@/lib/utils';

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  blog: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'ELEM | Blog',
    metaDesc:
      'Artículos sobre Drupal, React, Java, PHP, Node.js, arquitectura, performance, APIs y modernización de sistemas.',
    home: 'Inicio',
    blog: 'Blog',
    heroTitle: 'Ideas de ingeniería que',
    heroHighlight: 'comparten valor',
    heroDesc:
      'Lo que aprendemos construyendo software de nivel enterprise, sin humo y con ejemplos reales.',
  },
  en: {
    metaTitle: 'ELEM | Blog',
    metaDesc:
      'Articles on Drupal, React, Java, PHP, Node.js, architecture, performance, APIs and system modernization.',
    home: 'Home',
    blog: 'Blog',
    heroTitle: 'Engineering ideas that',
    heroHighlight: 'share value',
    heroDesc:
      'What we learn building enterprise-grade software, no fluff and with real examples.',
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
  const featured = posts[locale].filter((p) => p.featured);
  const rest = posts[locale].filter((p) => !p.featured);

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
        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                <div className={cn('relative h-48 overflow-hidden bg-gradient-to-br', post.accent)}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,.35),transparent_55%)]" />
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-700">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-display text-xl font-bold leading-snug transition-colors group-hover:text-rose-600">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDate(post.date, locale)}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-3.5" /> {post.readingTime}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border/60 bg-muted/30 pt-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.07}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-background/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30"
              >
                <Badge>{post.category}</Badge>
                <h2 className="mt-4 font-display text-lg font-bold leading-snug transition-colors group-hover:text-rose-600">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>{formatDate(post.date, locale)}</span>
                  <ArrowUpRight className="size-4 text-rose-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

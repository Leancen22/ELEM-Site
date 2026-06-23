'use client';

import * as React from 'react';
import Image from 'next/image';
import { Link } from '@/components/i18n/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LogoMark } from '@/components/brand/logo';
import { Reveal } from '@/components/motion/reveal';
import { formatDate, type PostMeta } from '@/content/blog-utils';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

const isSvg = (src: string) => src.endsWith('.svg');

function Byline({
  author,
  date,
  readingTime,
  locale,
  compact,
}: {
  author: string;
  date: string;
  readingTime: string;
  locale: Locale;
  compact?: boolean;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
      <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border bg-card">
        <LogoMark className="size-4" />
      </span>
      <span className="truncate font-medium text-foreground/80">{author}</span>
      <span aria-hidden>·</span>
      <span className="whitespace-nowrap">{formatDate(date, locale)}</span>
      {!compact ? (
        <>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <Clock className="size-3" /> {readingTime}
          </span>
        </>
      ) : null}
    </div>
  );
}

export function BlogIndex({
  posts,
  locale,
  allLabel,
  featuredLabel,
}: {
  posts: PostMeta[];
  locale: Locale;
  allLabel: string;
  featuredLabel: string;
}) {
  const hero = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== hero.slug);
  const categories = React.useMemo(
    () => [allLabel, ...Array.from(new Set(posts.map((p) => p.category)))],
    [posts, allLabel]
  );
  const [active, setActive] = React.useState(allLabel);

  const visible = active === allLabel ? rest : rest.filter((p) => p.category === active);

  return (
    <div className="container-wide">
      {/* Featured article — only on the unfiltered view */}
      {active === allLabel ? (
        <Reveal>
          <Link
            href={`/blog/${hero.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover lg:grid-cols-2"
          >
            <div className="relative flex min-h-[240px] flex-col justify-between overflow-hidden p-8 text-white">
              {hero.image ? (
                <>
                  <Image
                    src={hero.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    unoptimized={isSvg(hero.image)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25" />
                </>
              ) : (
                <>
                  <div className={cn('absolute inset-0 bg-gradient-to-br', hero.accent)} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,.3),transparent_50%)]" />
                  <div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/15 blur-2xl" />
                </>
              )}
              <span className="relative inline-flex w-fit items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-700">
                {featuredLabel}
              </span>
              <LogoMark className="relative size-12 opacity-90 [&_*]:fill-white" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <Badge variant="outline" className="w-fit">{hero.category}</Badge>
              <h2 className="mt-4 font-display text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-rose-600 sm:text-3xl">
                {hero.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{hero.excerpt}</p>
              <div className="mt-6">
                <Byline author={hero.author} date={hero.date} readingTime={hero.readingTime} locale={locale} />
              </div>
            </div>
          </Link>
        </Reveal>
      ) : null}

      {/* Category filter */}
      <div className="mt-12 flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              active === cat
                ? 'border-transparent bg-brand-gradient text-white shadow-glow'
                : 'border-border bg-background/70 text-foreground/70 hover:border-rose-300 hover:text-rose-600'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article grid */}
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, i) => (
          <Reveal key={post.slug} delay={(i % 3) * 0.06}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/70 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30"
            >
              {post.image ? (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={isSvg(post.image)}
                  />
                </div>
              ) : (
                <div className={cn('h-1 w-full bg-gradient-to-r', post.accent)} />
              )}
              <div className="flex flex-1 flex-col p-6">
                <Badge variant="outline" className="w-fit">{post.category}</Badge>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-rose-600">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                  <Byline author={post.author} date={post.date} readingTime={post.readingTime} locale={locale} compact />
                  <ArrowUpRight className="size-4 shrink-0 text-rose-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

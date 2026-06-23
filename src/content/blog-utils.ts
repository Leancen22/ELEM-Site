import type { Locale } from '@/i18n/config';

/** Metadata for a blog post (frontmatter + derived fields). Safe to import on the client. */
export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  /** Derived from the markdown body word count. */
  readingTime: string;
  accent: string;
  /** Optional cover image (path under /public). Falls back to the accent gradient. */
  image?: string;
  featured?: boolean;
};

/** A full post: metadata plus the rendered HTML body. */
export type Post = PostMeta & { contentHtml: string };

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

/** ~200 words per minute, rounded up, min 1. */
export function readingTimeFromText(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

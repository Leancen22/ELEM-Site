import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { locales, defaultLocale, type Locale } from '@/i18n/config';
import { readingTimeFromText, type Post, type PostMeta } from './blog-utils';
import { blogShortcodes } from './blog-shortcodes';

export type { Post, PostMeta } from './blog-utils';
export { formatDate } from './blog-utils';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function renderMarkdown(content: string, locale: Locale): string {
  const md = new Marked({ gfm: true, breaks: false });
  md.use({ extensions: [blogShortcodes(locale)] });
  return md.parse(content) as string;
}

function parseFile(locale: Locale, slug: string): Post | undefined {
  const file = path.join(BLOG_DIR, locale, `${slug}.md`);
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ''),
    category: String(data.category ?? ''),
    author: String(data.author ?? ''),
    date: String(data.date ?? ''),
    accent: String(data.accent ?? 'from-rose-500 to-fuchsia-600'),
    image: data.image ? String(data.image) : undefined,
    featured: Boolean(data.featured),
    readingTime: data.readingTime ? String(data.readingTime) : readingTimeFromText(content),
    contentHtml: renderMarkdown(content, locale),
  };
}

/** All posts for a locale, newest first (metadata only — no rendered body). */
export function getAllPosts(locale: Locale): PostMeta[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];
  const slugs = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
  const posts = slugs
    .map((slug) => parseFile(locale, slug))
    .filter((p): p is Post => Boolean(p))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ contentHtml, ...meta }) => meta);
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** A single post with its rendered HTML body. */
export function getPost(slug: string, locale: Locale): Post | undefined {
  return parseFile(locale, slug);
}

/** Slugs are shared across locales — derive from the default locale's folder. */
export const postSlugs = (() => {
  const dir = path.join(BLOG_DIR, defaultLocale);
  if (!fs.existsSync(dir)) return [] as string[];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
})();

export { locales };

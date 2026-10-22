import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { defaultLocale, type Locale } from '@/i18n/config';
import { readingTimeFromText, type Post, type PostMeta } from './blog-utils';
import { blogShortcodes } from './blog-shortcodes';

function renderMarkdown(content: string, locale: Locale): string {
  const md = new Marked({ gfm: true, breaks: false });
  md.use({ extensions: [blogShortcodes(locale)] });
  return md.parse(content) as string;
}

/**
 * A folder of Markdown entries under `content/<name>/{es,en}/<slug>.md`.
 * Shared by the blog and the news section.
 */
export function createCollection(name: string) {
  const root = path.join(process.cwd(), 'content', name);

  function parseFile(locale: Locale, slug: string): Post | undefined {
    const file = path.join(root, locale, `${slug}.md`);
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

  function listSlugs(locale: Locale): string[] {
    const dir = path.join(root, locale);
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
  }

  return {
    /** All entries for a locale, newest first (metadata only — no rendered body). */
    getAll(locale: Locale): PostMeta[] {
      return listSlugs(locale)
        .map((slug) => parseFile(locale, slug))
        .filter((p): p is Post => Boolean(p))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ contentHtml, ...meta }) => meta)
        .sort((a, b) => (a.date < b.date ? 1 : -1));
    },
    /** A single entry with its rendered HTML body. */
    get(slug: string, locale: Locale): Post | undefined {
      return parseFile(locale, slug);
    },
    /** Slugs are shared across locales — derived from the default locale's folder. */
    slugs: listSlugs(defaultLocale),
  };
}

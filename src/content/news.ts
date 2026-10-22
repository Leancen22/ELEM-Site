import 'server-only';
import type { Locale } from '@/i18n/config';
import { createCollection } from './collection';

export type { Post as NewsItem, PostMeta as NewsMeta } from './blog-utils';
export { formatDate } from './blog-utils';

/** News entries live in content/news/{es,en}/<slug>.md (same frontmatter as the blog). */
const news = createCollection('news');

export const getAllNews = (locale: Locale) => news.getAll(locale);
export const getNews = (slug: string, locale: Locale) => news.get(slug, locale);
export const newsSlugs = news.slugs;

import 'server-only';
import type { Locale } from '@/i18n/config';
import { createCollection } from './collection';

export type { Post, PostMeta } from './blog-utils';
export { formatDate } from './blog-utils';
export { locales } from '@/i18n/config';

const blog = createCollection('blog');

export const getAllPosts = (locale: Locale) => blog.getAll(locale);
export const getPost = (slug: string, locale: Locale) => blog.get(slug, locale);
export const postSlugs = blog.slugs;

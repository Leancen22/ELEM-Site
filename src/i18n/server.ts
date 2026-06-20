import 'server-only';
import { getLocale as getIntlLocale } from 'next-intl/server';
import type { Locale } from './config';

/** Reads the active locale (resolved from the URL) in server components & metadata. */
export async function getLocale(): Promise<Locale> {
  return (await getIntlLocale()) as Locale;
}

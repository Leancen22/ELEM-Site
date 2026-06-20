export const locales = ['es', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

/** Cookie that stores the visitor's language preference (no URL prefix). */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'es' || value === 'en';
}

/** OpenGraph-style locale codes, keyed by app locale. */
export const ogLocale: Record<Locale, string> = {
  es: 'es_ES',
  en: 'en_US',
};

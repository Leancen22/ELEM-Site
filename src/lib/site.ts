import type { Locale } from '@/i18n/config';

export const site = {
  name: 'ELEM',
  legalName: 'ELEM',
  url: 'https://elem.uy',
  email: 'contacto@elemuy.com',
  phone: '+598 98 858 254',
  social: {
    linkedin: 'https://www.linkedin.com/company/elemuy',
    instagram: 'https://www.instagram.com/elem.uy/'
  },
} as const;

/** Locale-dependent corporate copy. */
export const siteCopy: Record<
  Locale,
  // { tagline: string; description: string; address: string; ogLocale: string }
  { tagline: string; description: string; ogLocale: string }
> = {
  es: {
    tagline: 'Desarrollo de Software',
    description:
      'ELEM diseña, construye y moderniza plataformas digitales de alto rendimiento. Expertos en Drupal, Next.js y Java, integraciones empresariales y APIs a medida.',
    // address: 'Calle de la Innovación 12, 28010 Madrid, España',
    ogLocale: 'es_ES',
  },
  en: {
    tagline: 'Software Development',
    description:
      'ELEM designs, builds and modernizes high-performance digital platforms. Experts in Drupal, Next.js and Java, enterprise integrations and custom APIs.',
    // address: 'Calle de la Innovación 12, 28010 Madrid, Spain',
    ogLocale: 'en_US',
  },
};

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: string;
};

export type MegaColumn = {
  title: string;
  items: NavLink[];
};

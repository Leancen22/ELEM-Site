import type { Locale } from '@/i18n/config';

export const site = {
  name: 'ELEM',
  legalName: 'ELEM',
  url: 'https://elem.uy',
  email: 'contacto@elem.uy',
  // Teléfono oculto a pedido.
  // phone: '+598 98 858 254',
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
    tagline: 'Software a medida',
    description:
      'ELEM es un estudio de ingeniería de software. Diseñamos, construimos y evolucionamos plataformas web, aplicaciones y sistemas a medida para empresas.',
    // address: 'Calle de la Innovación 12, 28010 Madrid, España',
    ogLocale: 'es_ES',
  },
  en: {
    tagline: 'Custom software',
    description:
      'ELEM is a software engineering studio. We design, build and evolve web platforms, applications and custom systems for companies.',
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

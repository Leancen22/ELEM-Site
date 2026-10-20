import type { Locale } from '@/i18n/config';

export type Ui = {
  header: {
    talk: string;
    startProject: string;
    contact: string;
    navLabel: string;
    openMenu: string;
    closeMenu: string;
  };
  footer: {
    about: string;
    colServices: string;
    colCompany: string;
    rights: string;
    privacy: string;
    cookies: string;
    legal: string;
    sitemap: string;
  };
};

export const ui: Record<Locale, Ui> = {
  es: {
    header: {
      talk: 'Hablemos',
      startProject: 'Iniciar proyecto',
      contact: 'Contacto',
      navLabel: 'Navegación principal',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    footer: {
      about: 'Estudio de ingeniería de software. Diseñamos, construimos y evolucionamos software para empresas.',
      colServices: 'Qué hacemos',
      colCompany: 'Empresa',
      rights: 'Todos los derechos reservados.',
      privacy: 'Privacidad',
      cookies: 'Cookies',
      legal: 'Aviso legal',
      sitemap: 'Mapa del sitio',
    },
  },
  en: {
    header: {
      talk: "Let's talk",
      startProject: 'Start a project',
      contact: 'Contact',
      navLabel: 'Main navigation',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    footer: {
      about: 'Software engineering studio. We design, build and evolve software for companies.',
      colServices: 'What we do',
      colCompany: 'Company',
      rights: 'All rights reserved.',
      privacy: 'Privacy',
      cookies: 'Cookies',
      legal: 'Legal notice',
      sitemap: 'Sitemap',
    },
  },
};

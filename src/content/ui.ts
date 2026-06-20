import type { Locale } from '@/i18n/config';

export type Ui = {
  header: {
    talk: string;
    startProject: string;
    openMenu: string;
    closeMenu: string;
  };
  tech: {
    breadcrumbHome: string;
    breadcrumbTech: string;
    ctaTalk: string;
    ctaCases: string;
    benefitsEyebrow: string;
    benefitsTitlePre: string;
    benefitsTitleMid: string;
    archEyebrow: string;
    useCasesEyebrow: string;
    useCasesTitle: string;
    useCasesDesc: string;
    integrationsEyebrow: string;
    integrationsTitle: string;
    faqEyebrow: string;
    faqTitlePre: string;
    faqAccent: string;
    faqDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    relatedStack: string;
    startProject: string;
  };
  footer: {
    ctaTitle: string;
    ctaSubtitle: string;
    ctaButton: string;
    colServices: string;
    colSolutions: string;
    colTech: string;
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
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    tech: {
      breadcrumbHome: 'Inicio',
      breadcrumbTech: 'Tecnologías',
      ctaTalk: 'Hablar de mi proyecto',
      ctaCases: 'Ver casos de éxito',
      benefitsEyebrow: 'Beneficios',
      benefitsTitlePre: 'Por qué elegir',
      benefitsTitleMid: 'con',
      archEyebrow: 'Arquitectura',
      useCasesEyebrow: 'Casos de uso',
      useCasesTitle: 'Dónde brilla {name}',
      useCasesDesc: 'Estos son los escenarios donde aplicamos {name} con mayor impacto.',
      integrationsEyebrow: 'Integraciones',
      integrationsTitle: 'Se conecta con todo tu ecosistema',
      faqEyebrow: 'Preguntas frecuentes',
      faqTitlePre: 'Resolvemos tus',
      faqAccent: 'dudas',
      faqDesc: '¿No encuentras lo que buscas? Escríbenos y te respondemos en menos de 24h.',
      ctaTitle: '¿Construimos tu proyecto con {name}?',
      ctaDesc: 'Cuéntanos tu reto. Un arquitecto senior te responde con un plan concreto.',
      relatedStack: 'Stack relacionado:',
      startProject: 'Iniciar proyecto',
    },
    footer: {
      ctaTitle: '¿Listo para construir algo extraordinario?',
      ctaSubtitle:
        'Cuéntanos tu reto. Te respondemos en menos de 24 horas con un plan concreto.',
      ctaButton: 'Iniciar proyecto',
      colServices: 'Servicios',
      colSolutions: 'Soluciones',
      colTech: 'Tecnologías',
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
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    tech: {
      breadcrumbHome: 'Home',
      breadcrumbTech: 'Technologies',
      ctaTalk: 'Discuss my project',
      ctaCases: 'See case studies',
      benefitsEyebrow: 'Benefits',
      benefitsTitlePre: 'Why choose',
      benefitsTitleMid: 'with',
      archEyebrow: 'Architecture',
      useCasesEyebrow: 'Use cases',
      useCasesTitle: 'Where {name} shines',
      useCasesDesc: 'These are the scenarios where we apply {name} with the greatest impact.',
      integrationsEyebrow: 'Integrations',
      integrationsTitle: 'It connects with your entire ecosystem',
      faqEyebrow: 'FAQ',
      faqTitlePre: 'We answer your',
      faqAccent: 'questions',
      faqDesc: 'Can’t find what you’re looking for? Write to us and we’ll reply within 24h.',
      ctaTitle: 'Shall we build your project with {name}?',
      ctaDesc: 'Tell us about your challenge. A senior architect will reply with a concrete plan.',
      relatedStack: 'Related stack:',
      startProject: 'Start a project',
    },
    footer: {
      ctaTitle: 'Ready to build something extraordinary?',
      ctaSubtitle:
        'Tell us about your challenge. We reply within 24 hours with a concrete plan.',
      ctaButton: 'Start a project',
      colServices: 'Services',
      colSolutions: 'Solutions',
      colTech: 'Technologies',
      colCompany: 'Company',
      rights: 'All rights reserved.',
      privacy: 'Privacy',
      cookies: 'Cookies',
      legal: 'Legal notice',
      sitemap: 'Sitemap',
    },
  },
};

import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { Methodology } from '@/components/sections/methodology';
import { Benefits } from '@/components/sections/benefits';
import { CtaFinal } from '@/components/sections/cta-final';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  page: string;
  heroTitle: string;
  heroDesc: string;
  ctaTitle: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Cómo trabajamos · Nuestro proceso',
    metaDesc:
      'Un proceso claro en cuatro etapas, de la primera reunión al mantenimiento, y los compromisos que asumimos en cada proyecto.',
    home: 'Inicio',
    page: 'Cómo trabajamos',
    heroTitle: 'Un proceso claro, de la primera reunión al mantenimiento.',
    heroDesc:
      'Cuatro etapas y compromisos concretos para que siempre sepas en qué punto está tu proyecto.',
    ctaTitle: '¿Empezamos por la primera reunión?',
  },
  en: {
    metaTitle: 'How we work · Our process',
    metaDesc:
      'A clear four-stage process, from the first meeting to maintenance, and the commitments we make on every project.',
    home: 'Home',
    page: 'How we work',
    heroTitle: 'A clear process, from the first meeting to maintenance.',
    heroDesc: 'Four stages and concrete commitments so you always know where your project stands.',
    ctaTitle: 'Shall we start with the first meeting?',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = content[locale];
  return buildMetadata({ title: t.metaTitle, description: t.metaDesc, locale, href: '/como-trabajamos' });
}

export default async function ComoTrabajamosPage() {
  const t = content[await getLocale()];
  const crumbs = [
    { name: t.home, href: '/' },
    { name: t.page, href: '/como-trabajamos' },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero title={t.heroTitle} description={t.heroDesc} breadcrumbs={crumbs} />
      <Methodology hideHeader />
      <Benefits />
      <CtaFinal title={t.ctaTitle} />
    </>
  );
}

import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { ServiceIndexChips, ServiceIndexSidebar } from '@/components/services/service-index';
import { CtaFinal } from '@/components/sections/cta-final';
import { home } from '@/content/home';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  servicios: string;
  heroTitle: string;
  heroDesc: string;
  onThisPage: string;
  includes: string;
  ctaTitle: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Qué hacemos · Desarrollo de software a medida',
    metaDesc:
      'Desarrollo web, aplicaciones móviles, software a medida, automatización de procesos y consultoría técnica para empresas.',
    home: 'Inicio',
    servicios: 'Qué hacemos',
    heroTitle: 'Un equipo para todo el ciclo de vida de tu software.',
    heroDesc:
      'Desde la idea hasta la operación diaria: diseñamos, construimos y mantenemos la tecnología que tu empresa necesita.',
    onThisPage: 'En esta página',
    includes: 'Qué incluye',
    ctaTitle: '¿No sabes qué servicio necesitas? Cuéntanos tu caso y te orientamos.',
  },
  en: {
    metaTitle: 'What we do · Custom software development',
    metaDesc:
      'Web development, mobile apps, custom software, process automation and technical consulting for companies.',
    home: 'Home',
    servicios: 'What we do',
    heroTitle: 'One team for the whole life of your software.',
    heroDesc:
      'From the idea to day-to-day operation: we design, build and maintain the technology your company needs.',
    onThisPage: 'On this page',
    includes: 'What’s included',
    ctaTitle: 'Not sure which service you need? Tell us about your case and we’ll point you in the right direction.',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = content[locale];
  return buildMetadata({ title: t.metaTitle, description: t.metaDesc, locale, href: '/servicios' });
}

export default async function ServiciosPage() {
  const locale = await getLocale();
  const t = content[locale];
  const services = home[locale].services;
  const index = services.map((s) => ({ id: s.id, title: s.title }));
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, href: '/' },
          { name: t.servicios, href: '/servicios' },
        ])}
      />
      <PageHero
        eyebrow={t.servicios}
        title={t.heroTitle}
        description={t.heroDesc}
        breadcrumbs={[
          { name: t.home, href: '/' },
          { name: t.servicios, href: '/servicios' },
        ]}
      />

      {/* Service lines */}
      <Section className="pt-12 sm:pt-16">
        {/* The index marks the section in view: chips on phone/tablet, sticky column on desktop. */}
        <ServiceIndexChips items={index} label={t.onThisPage} />

        <div className="grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-20">
          <ServiceIndexSidebar items={index} label={t.onThisPage} />

          <div className="border-t border-border">
            {services.map((s, i) => (
              <Reveal
                key={s.id}
                id={s.id}
                className="grid scroll-mt-36 gap-8 border-b border-border py-12 sm:py-16 xl:grid-cols-[1.1fr_1fr] xl:gap-14"
              >
                <div>
                  <span className="text-[15px] tabular-nums text-muted-foreground">0{i + 1}</span>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{s.title}</h2>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
                <div>
                  <p className="text-[15px] font-medium text-muted-foreground">{t.includes}</p>
                  <ul className="mt-4 border-t border-border">
                    {s.includes.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-border py-3 text-base">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CtaFinal title={t.ctaTitle} />
    </>
  );
}

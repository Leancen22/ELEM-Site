import type { Metadata } from 'next';
import { Link } from '@/components/i18n/link';
import { PageHero } from '@/components/layout/page-hero';
import { Section, SectionHeader } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { CtaFinal } from '@/components/sections/cta-final';
import { home } from '@/content/home';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

type DetailItem = { id: string; title: string; body: string; points: string[] };
type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  servicios: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  onThisPage: string;
  includes: string;
  stack: string;
  capEyebrow: string;
  capTitle: string;
  capDesc: string;
  /** Cross-cutting capabilities. Ids kept stable for old /servicios#… links. */
  detail: DetailItem[];
  ctaTitle: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Servicios de ingeniería de software',
    metaDesc:
      'Desarrollo web, aplicaciones móviles y software a medida con Drupal, Next.js y Java. Integraciones, APIs, modernización de sistemas y entrega continua.',
    home: 'Inicio',
    servicios: 'Servicios',
    heroTitle: 'Un solo equipo para todo el ciclo de vida de tu software.',
    heroHighlight: '',
    heroDesc:
      'Cinco líneas de servicio con un mismo estándar: diseño cuidado, código revisado y entregas que puedes ver funcionando.',
    onThisPage: 'En esta página',
    includes: 'Qué incluye',
    stack: 'Tecnologías',
    capEyebrow: 'Capacidades transversales',
    capTitle: 'Lo que aplicamos en todos los proyectos.',
    capDesc: 'Más allá de la línea de servicio, estas prácticas forman parte de cada entrega.',
    detail: [
      { id: 'arquitectura', title: 'Arquitectura de software', body: 'Diseñamos sistemas que crecen con tu negocio: fiables, fáciles de mantener y preparados para escalar. Dejamos cada decisión documentada para que tu equipo siempre tenga el control.', points: ['Diseño a medida', 'Preparado para escalar', 'Fiable y mantenible', 'Decisiones documentadas'] },
      { id: 'apis', title: 'APIs y microservicios', body: 'Construimos APIs seguras y bien documentadas que permiten que tus sistemas (y los de tus socios) se comuniquen de forma ordenada y segura.', points: ['APIs seguras', 'Bien documentadas', 'Fáciles de integrar', 'Preparadas para crecer'] },
      { id: 'modernizacion', title: 'Modernización de sistemas', body: 'Renovamos sistemas antiguos paso a paso, sin frenar tu operación, reduciendo costes de mantenimiento y riesgos con el tiempo.', points: ['Renovación gradual', 'Sin interrupciones', 'Menos costes de mantenimiento', 'Menor riesgo'] },
      { id: 'entrega', title: 'Entrega continua', body: 'Automatizamos la puesta en producción con contenedores y entrega continua, para publicar mejoras de forma rápida, segura y sin sorpresas.', points: ['Contenedores con Docker', 'Entrega continua (CI/CD)', 'Despliegues sin cortes', 'Control de versiones con Git'] },
    ],
    ctaTitle: '¿No sabes en qué línea encaja tu proyecto? Cuéntanos y lo vemos juntos.',
  },
  en: {
    metaTitle: 'Software engineering services',
    metaDesc:
      'Web, mobile and custom software development with Drupal, Next.js and Java. Integrations, APIs, system modernization and continuous delivery.',
    home: 'Home',
    servicios: 'Services',
    heroTitle: 'One team for your software’s whole lifecycle.',
    heroHighlight: '',
    heroDesc:
      'Five service lines with one standard: careful design, reviewed code and releases you can see working.',
    onThisPage: 'On this page',
    includes: 'What’s included',
    stack: 'Technologies',
    capEyebrow: 'Cross-cutting capabilities',
    capTitle: 'What we apply on every project.',
    capDesc: 'Whatever the service line, these practices are part of every release.',
    detail: [
      { id: 'arquitectura', title: 'Software architecture', body: 'We design systems that grow with your business: reliable, easy to maintain and ready to scale. Every decision is documented so your team always stays in control.', points: ['Tailored design', 'Ready to scale', 'Reliable and maintainable', 'Documented decisions'] },
      { id: 'apis', title: 'APIs & Microservices', body: 'We build secure, well-documented APIs that let your systems (and your partners’) talk to each other in an orderly, secure way.', points: ['Secure APIs', 'Well documented', 'Easy to integrate', 'Ready to grow'] },
      { id: 'modernizacion', title: 'System modernization', body: 'We renew legacy systems step by step, without stopping your operation, cutting maintenance costs and risk over time.', points: ['Gradual renewal', 'No interruptions', 'Lower maintenance costs', 'Reduced risk'] },
      { id: 'entrega', title: 'Continuous delivery', body: 'We automate releases with containers and continuous delivery, so you ship improvements fast, safely and with no surprises.', points: ['Containers with Docker', 'Continuous delivery (CI/CD)', 'Zero-downtime deploys', 'Version control with Git'] },
    ],
    ctaTitle: 'Not sure which line your project fits? Tell us and we’ll work it out together.',
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
        highlight={t.heroHighlight}
        description={t.heroDesc}
        breadcrumbs={[
          { name: t.home, href: '/' },
          { name: t.servicios, href: '/servicios' },
        ]}
      />

      {/* Service lines */}
      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-12 lg:grid-cols-[14rem_1fr] lg:gap-20">
          <nav aria-label={t.onThisPage} className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {t.onThisPage}
            </p>
            <ol className="mt-4 space-y-2 text-sm">
              {services.map((s, i) => (
                <li key={s.id}>
                  <Link href={`/servicios#${s.id}`} className="group flex gap-3 text-muted-foreground hover:text-foreground">
                    <span className="font-mono text-xs leading-5">0{i + 1}</span>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="border-t border-border">
            {services.map((s, i) => (
              <Reveal
                key={s.id}
                id={s.id}
                className="grid scroll-mt-24 gap-8 border-b border-border py-12 sm:py-16 xl:grid-cols-[1.1fr_1fr] xl:gap-14"
              >
                <div>
                  <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{s.title}</h2>
                  <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.includes}</p>
                  <ul className="mt-4 border-t border-border">
                    {s.includes.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-border py-3 text-[15px]">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm">
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.stack}</span>
                    <span className="ml-3 text-foreground/85">{s.stack}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Cross-cutting capabilities */}
      <Section className="bg-surface border-y border-border">
        <SectionHeader eyebrow={t.capEyebrow} title={t.capTitle} description={t.capDesc} />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {t.detail.map((d, i) => (
            <Reveal key={d.id} id={d.id} delay={i * 0.05} className="scroll-mt-28 border-t border-foreground/80 pt-6">
              <h3 className="text-lg font-semibold tracking-tight">{d.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{d.body}</p>
              <p className="mt-4 text-sm text-foreground/80">{d.points.join(' · ')}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaFinal title={t.ctaTitle} />
    </>
  );
}

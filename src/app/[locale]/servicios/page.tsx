import type { Metadata } from 'next';
import { Link } from '@/components/i18n/link';
import { ArrowRight, Check } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section, SectionHeader, GradientTitle } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { techLogos, type TechKey } from '@/components/visuals/tech-logos';
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
  more: string;
  detail: DetailItem[];
  stackEyebrow: string;
  stackLead: string;
  stackAccent: string;
  stackDesc: string;
  stackCta: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Servicios de ingeniería de software',
    metaDesc:
      'Desarrollo web, aplicaciones móviles y software a medida con Drupal, Next.js y Java. Integraciones, APIs, modernización de sistemas y entrega continua.',
    home: 'Inicio',
    servicios: 'Servicios',
    heroTitle: 'Todo lo que tu plataforma necesita,',
    heroHighlight: 'bajo un mismo techo',
    heroDesc:
      'De la estrategia a la operación. Un equipo senior que diseña, construye y opera software de nivel enterprise.',
    more: 'Saber más',
    detail: [
      { id: 'arquitectura', title: 'Arquitectura de Software', body: 'Diseñamos sistemas que crecen con tu negocio: fiables, fáciles de mantener y preparados para escalar. Dejamos cada decisión documentada para que tu equipo siempre tenga el control.', points: ['Diseño a medida', 'Preparado para escalar', 'Fiable y mantenible', 'Decisiones documentadas'] },
      { id: 'integraciones', title: 'Consultoría', body: 'Conectamos tus sistemas (ERP, CRM, pasarelas de pago y aplicaciones existentes) para que la información fluya sin errores ni datos duplicados.', points: ['Arquitectura de software', 'Buenas prácticas de desarrollo', 'Decisiones tecnológicas', 'Escalabilidad y mantenibilidad'] },
      { id: 'apis', title: 'APIs y Microservicios', body: 'Construimos APIs seguras y bien documentadas que permiten que tus sistemas (y los de tus socios) se comuniquen de forma ordenada y segura.', points: ['APIs seguras', 'Bien documentadas', 'Fáciles de integrar', 'Preparadas para crecer'] },
      { id: 'modernizacion', title: 'Modernización de Sistemas', body: 'Renovamos sistemas antiguos paso a paso, sin frenar tu operación, reduciendo costes de mantenimiento y riesgos con el tiempo.', points: ['Renovación gradual', 'Sin interrupciones', 'Menos costes de mantenimiento', 'Menor riesgo'] },
      { id: 'entrega', title: 'Despliegue y Entrega Continua', body: 'Automatizamos la puesta en producción con contenedores y entrega continua, para publicar mejoras de forma rápida, segura y sin sorpresas.', points: ['Contenedores con Docker', 'Entrega continua (CI/CD)', 'Despliegues sin cortes', 'Control de versiones con Git'] },
    ],
    stackEyebrow: 'Stack tecnológico',
    stackLead: 'Tecnología elegida por sus',
    stackAccent: 'méritos',
    stackDesc: 'Sin modas ni ataduras a un único proveedor. La herramienta correcta para cada problema.',
    stackCta: 'Hablar con un arquitecto',
  },
  en: {
    metaTitle: 'Software engineering services',
    metaDesc:
      'Web, mobile and custom software development with Drupal, Next.js and Java. Integrations, APIs, system modernization and continuous delivery.',
    home: 'Home',
    servicios: 'Services',
    heroTitle: 'Everything your platform needs,',
    heroHighlight: 'under one roof',
    heroDesc:
      'From strategy to operations. A senior team that designs, builds and operates enterprise-grade software.',
    more: 'Learn more',
    detail: [
      { id: 'arquitectura', title: 'Software Architecture', body: 'We design systems that grow with your business: reliable, easy to maintain and ready to scale. Every decision is documented so your team always stays in control.', points: ['Tailored design', 'Ready to scale', 'Reliable and maintainable', 'Documented decisions'] },
      { id: 'integraciones', title: 'Integrations', body: 'We connect your systems (ERP, CRM, payment gateways and existing apps) so information flows with no errors or duplicated data.', points: ['ERP and CRM connections', 'Payment gateways', 'Reliable sync', 'No duplicated data'] },
      { id: 'apis', title: 'APIs & Microservices', body: 'We build secure, well-documented APIs that let your systems (and your partners’) talk to each other in an orderly, secure way.', points: ['Secure APIs', 'Well documented', 'Easy to integrate', 'Ready to grow'] },
      { id: 'modernizacion', title: 'System Modernization', body: 'We renew legacy systems step by step, without stopping your operation, cutting maintenance costs and risk over time.', points: ['Gradual renewal', 'No interruptions', 'Lower maintenance costs', 'Reduced risk'] },
      { id: 'entrega', title: 'Deployment & Continuous Delivery', body: 'We automate releases with containers and continuous delivery, so you ship improvements fast, safely and with no surprises.', points: ['Containers with Docker', 'Continuous delivery (CI/CD)', 'Zero-downtime deploys', 'Version control with Git'] },
    ],
    stackEyebrow: 'Technology stack',
    stackLead: 'Technology chosen on its',
    stackAccent: 'merits',
    stackDesc: 'No fads or single-vendor lock-in. The right tool for each problem.',
    stackCta: 'Talk to an architect',
  },
};

const stack: { key: TechKey; name: string }[] = [
  { key: 'drupal', name: 'Drupal' },
  { key: 'next', name: 'Next.js' },
  { key: 'java', name: 'Java + Spring Boot' },
  { key: 'python', name: 'Python' },
  { key: 'docker', name: 'Docker' },
  { key: 'kubernetes', name: 'Kubernetes' },
  { key: 'ddev', name: 'ddev' },
  { key: 'git', name: 'Git' },
];

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

      {/* Overview grid */}
      <Section className="pt-4">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Link
                href={service.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                  <Icon name={service.icon} className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600">
                  {t.more} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Detailed sections */}
      <Section className="border-y border-border/60 bg-muted/30">
        <div className="space-y-16">
          {t.detail.map((d, i) => (
            <Reveal
              key={d.id}
              id={d.id}
              className="grid scroll-mt-28 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <span className="font-mono text-sm font-semibold text-rose-500">
                  0{i + 1}
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                  {d.title}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{d.body}</p>
              </div>
              <ul className={`grid gap-3 sm:grid-cols-2 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                {d.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background/70 p-4 text-sm font-medium backdrop-blur"
                  >
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                      <Check className="size-3.5" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Stack */}
      <Section id="stack">
        <SectionHeader
          eyebrow={t.stackEyebrow}
          title={<GradientTitle lead={t.stackLead} accent={t.stackAccent} />}
          description={t.stackDesc}
        />
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stack.map((tech, i) => {
            const Logo = techLogos[tech.key];
            return (
              <Reveal
                key={tech.name}
                delay={i * 0.05}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30"
              >
                <span className="grid size-14 place-items-center rounded-2xl border border-white/60 bg-white/80 shadow-card transition-transform group-hover:scale-110 dark:border-white/10 dark:bg-white/5">
                  <Logo className="size-9" />
                </span>
                <span className="text-sm font-semibold">{tech.name}</span>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href="/contacto">
              {t.stackCta} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

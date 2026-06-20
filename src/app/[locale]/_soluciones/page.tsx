import type { Metadata } from 'next';
import { Link } from '@/components/i18n/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Reveal } from '@/components/motion/reveal';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

type Solution = { id: string; icon: string; title: string; description: string; tags: string[] };
type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  soluciones: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  solutions: Solution[];
  ctaText: string;
  ctaButton: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Soluciones empresariales',
    metaDesc:
      'Portales corporativos, intranets, sistemas internos, e-commerce, aplicaciones empresariales, automatización e integraciones ERP y CRM.',
    home: 'Inicio',
    soluciones: 'Soluciones',
    heroTitle: 'Soluciones para cada',
    heroHighlight: 'reto de negocio',
    heroDesc:
      'Plataformas listas para producción que resuelven problemas reales y crecen con tu organización.',
    solutions: [
      { id: 'portales', icon: 'Globe', title: 'Portales Corporativos', description: 'Sitios institucionales de alto tráfico, accesibles y fáciles de gobernar.', tags: ['Drupal', 'React', 'SEO técnico', 'Accesibilidad AAA'] },
      { id: 'intranets', icon: 'Layers', title: 'Intranets', description: 'Espacios internos con búsqueda, permisos y flujos que conectan a tu organización.', tags: ['SSO', 'Búsqueda', 'Permisos', 'Workflows'] },
      { id: 'sistemas', icon: 'Boxes', title: 'Sistemas Internos', description: 'Herramientas a medida que digitalizan procesos y eliminan hojas de cálculo.', tags: ['Backoffice', 'Dashboards', 'Roles', 'Auditoría'] },
      { id: 'ecommerce', icon: 'Workflow', title: 'E-commerce', description: 'Tiendas headless de alto rendimiento con catálogos masivos y conversión optimizada.', tags: ['Headless', 'Pagos', 'Catálogo 1M+', 'Core Web Vitals'] },
      { id: 'apps', icon: 'Code2', title: 'Aplicaciones Empresariales', description: 'Plataformas SaaS y apps web ricas, multi-tenant y listas para escalar.', tags: ['React', 'Node.js', 'Multi-tenant', 'Tiempo real'] },
      { id: 'automatizacion', icon: 'RefreshCw', title: 'Automatización', description: 'Orquestación de procesos de negocio que reduce errores y libera a tu equipo.', tags: ['Workflows', 'Reglas', 'Notificaciones', 'iPaaS'] },
      { id: 'erp', icon: 'Database', title: 'Integraciones ERP', description: 'Sincronización fiable con SAP, Dynamics y otros sistemas de gestión.', tags: ['SAP', 'Dynamics', 'Sincronización', 'Idempotencia'] },
      { id: 'crm', icon: 'GitMerge', title: 'Integraciones CRM', description: 'Datos de clientes unificados entre Salesforce, HubSpot y tus plataformas.', tags: ['Salesforce', 'HubSpot', 'Webhooks', 'Datos 360°'] },
    ],
    ctaText: '¿Tu reto no encaja en ninguna categoría? Mejor todavía.',
    ctaButton: 'Cuéntanos tu caso',
  },
  en: {
    metaTitle: 'Enterprise solutions',
    metaDesc:
      'Corporate portals, intranets, internal systems, e-commerce, enterprise applications, automation and ERP and CRM integrations.',
    home: 'Home',
    soluciones: 'Solutions',
    heroTitle: 'Solutions for every',
    heroHighlight: 'business challenge',
    heroDesc:
      'Production-ready platforms that solve real problems and grow with your organization.',
    solutions: [
      { id: 'portales', icon: 'Globe', title: 'Corporate Portals', description: 'High-traffic institutional sites, accessible and easy to govern.', tags: ['Drupal', 'React', 'Technical SEO', 'AAA accessibility'] },
      { id: 'intranets', icon: 'Layers', title: 'Intranets', description: 'Internal spaces with search, permissions and workflows that connect your organization.', tags: ['SSO', 'Search', 'Permissions', 'Workflows'] },
      { id: 'sistemas', icon: 'Boxes', title: 'Internal Systems', description: 'Tailored tools that digitize processes and eliminate spreadsheets.', tags: ['Backoffice', 'Dashboards', 'Roles', 'Auditing'] },
      { id: 'ecommerce', icon: 'Workflow', title: 'E-commerce', description: 'High-performance headless stores with massive catalogs and optimized conversion.', tags: ['Headless', 'Payments', '1M+ catalog', 'Core Web Vitals'] },
      { id: 'apps', icon: 'Code2', title: 'Enterprise Applications', description: 'Rich, multi-tenant SaaS platforms and web apps ready to scale.', tags: ['React', 'Node.js', 'Multi-tenant', 'Realtime'] },
      { id: 'automatizacion', icon: 'RefreshCw', title: 'Automation', description: 'Business-process orchestration that reduces errors and frees your team.', tags: ['Workflows', 'Rules', 'Notifications', 'iPaaS'] },
      { id: 'erp', icon: 'Database', title: 'ERP Integrations', description: 'Reliable synchronization with SAP, Dynamics and other management systems.', tags: ['SAP', 'Dynamics', 'Sync', 'Idempotency'] },
      { id: 'crm', icon: 'GitMerge', title: 'CRM Integrations', description: 'Unified customer data across Salesforce, HubSpot and your platforms.', tags: ['Salesforce', 'HubSpot', 'Webhooks', '360° data'] },
    ],
    ctaText: 'Your challenge doesn’t fit any category? Even better.',
    ctaButton: 'Tell us about your case',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = content[locale];
  return buildMetadata({ title: t.metaTitle, description: t.metaDesc, locale, href: '/soluciones' });
}

export default async function SolucionesPage() {
  const t = content[await getLocale()];
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, href: '/' },
          { name: t.soluciones, href: '/soluciones' },
        ])}
      />
      <PageHero
        eyebrow={t.soluciones}
        title={t.heroTitle}
        highlight={t.heroHighlight}
        description={t.heroDesc}
        breadcrumbs={[
          { name: t.home, href: '/' },
          { name: t.soluciones, href: '/soluciones' },
        ]}
      />

      <Section className="pt-4">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.solutions.map((s, i) => (
            <Reveal
              key={s.id}
              id={s.id}
              delay={(i % 3) * 0.07}
              className="group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30"
            >
              <div className="absolute right-0 top-0 size-24 translate-x-8 -translate-y-8 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" />
              <div className="grid size-12 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <Icon name={s.icon} className="size-5" />
              </div>
              <h2 className="mt-5 font-display text-lg font-bold">{s.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <p className="text-muted-foreground">{t.ctaText}</p>
          <Button asChild size="lg">
            <Link href="/contacto">
              {t.ctaButton} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

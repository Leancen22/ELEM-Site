import type { Metadata } from 'next';
import { Link } from '@/components/i18n/link';
import { ArrowUpRight, Boxes, Building, Compass, Cpu, Layers, Scale } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Stagger, StaggerItem } from '@/components/motion/reveal';
import { servicios, tecnologias, devops, empresa } from '@/lib/navigation';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

type SiteLink = { label: string; href: string; description?: string };
type Group = { icon: LucideIcon; title: string; items: SiteLink[] };

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  sitemap: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  groupMain: string;
  groupServices: string;
  groupTech: string;
  groupDevops: string;
  groupCompany: string;
  groupLegal: string;
  main: SiteLink[];
  legal: SiteLink[];
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Mapa del sitio · Todas las páginas de ELEM',
    metaDesc:
      'Encuentra de un vistazo todas las secciones de ELEM: servicios, tecnologías, empresa y páginas legales. Navega directo a lo que buscas.',
    home: 'Inicio',
    sitemap: 'Mapa del sitio',
    heroTitle: 'Todo el sitio,',
    heroHighlight: 'de un vistazo',
    heroDesc:
      'Un índice claro de cada sección y página de ELEM. Si te perdiste, aquí encuentras el camino de vuelta.',
    groupMain: 'Principal',
    groupServices: 'Servicios',
    groupTech: 'Tecnologías',
    groupDevops: 'DevOps & herramientas',
    groupCompany: 'Empresa',
    groupLegal: 'Legal',
    main: [
      { label: 'Inicio', href: '/', description: 'Página principal' },
      { label: 'Servicios', href: '/servicios', description: 'Qué hacemos y cómo' },
      { label: 'Tecnologías', href: '/tecnologias', description: 'Nuestro stack técnico' },
      { label: 'Nosotros', href: '/nosotros', description: 'El equipo y la metodología' },
      { label: 'Blog', href: '/blog', description: 'Ideas y artículos de ingeniería' },
      { label: 'Contacto', href: '/contacto', description: 'Hablemos de tu proyecto' },
    ],
    legal: [
      { label: 'Privacidad', href: '/legal/privacidad' },
      { label: 'Cookies', href: '/legal/cookies' },
      { label: 'Aviso legal', href: '/legal/aviso-legal' },
    ],
  },
  en: {
    metaTitle: 'Sitemap · Every page on ELEM',
    metaDesc:
      'See every section of ELEM at a glance: services, technologies, company and legal pages. Jump straight to what you need.',
    home: 'Home',
    sitemap: 'Sitemap',
    heroTitle: 'The whole site,',
    heroHighlight: 'at a glance',
    heroDesc:
      'A clear index of every section and page on ELEM. If you got lost, here is the way back.',
    groupMain: 'Main',
    groupServices: 'Services',
    groupTech: 'Technologies',
    groupDevops: 'DevOps & tools',
    groupCompany: 'Company',
    groupLegal: 'Legal',
    main: [
      { label: 'Home', href: '/', description: 'Landing page' },
      { label: 'Services', href: '/servicios', description: 'What we do and how' },
      { label: 'Technologies', href: '/tecnologias', description: 'Our technology stack' },
      { label: 'About', href: '/nosotros', description: 'The team and methodology' },
      { label: 'Blog', href: '/blog', description: 'Engineering ideas and articles' },
      { label: 'Contact', href: '/contacto', description: "Let's talk about your project" },
    ],
    legal: [
      { label: 'Privacy', href: '/legal/privacidad' },
      { label: 'Cookies', href: '/legal/cookies' },
      { label: 'Legal notice', href: '/legal/aviso-legal' },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = content[locale];
  return buildMetadata({
    title: t.metaTitle,
    description: t.metaDesc,
    locale,
    href: '/mapa-del-sitio',
  });
}

export default async function SitemapPage() {
  const locale = await getLocale();
  const t = content[locale];

  const groups: Group[] = [
    { icon: Compass, title: t.groupMain, items: t.main },
    { icon: Layers, title: t.groupServices, items: servicios[locale] },
    { icon: Cpu, title: t.groupTech, items: tecnologias[locale] },
    { icon: Boxes, title: t.groupDevops, items: devops[locale] },
    { icon: Building, title: t.groupCompany, items: empresa[locale] },
    { icon: Scale, title: t.groupLegal, items: t.legal },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, href: '/' },
          { name: t.sitemap, href: '/mapa-del-sitio' },
        ])}
      />
      <PageHero
        eyebrow={t.sitemap}
        title={t.heroTitle}
        highlight={t.heroHighlight}
        description={t.heroDesc}
        breadcrumbs={[
          { name: t.home, href: '/' },
          { name: t.sitemap, href: '/mapa-del-sitio' },
        ]}
      />

      <Section className="pt-6">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <StaggerItem key={group.title}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                      <Icon className="size-5" />
                    </span>
                    <h2 className="font-display text-lg font-bold">{group.title}</h2>
                  </div>
                  <ul className="mt-5 space-y-1">
                    {group.items.map((item) => (
                      <li key={item.label + item.href}>
                        <Link
                          href={item.href}
                          className="group flex items-start justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-rose-50 dark:hover:bg-white/5"
                        >
                          <span>
                            <span className="block text-sm font-semibold text-foreground transition-colors group-hover:text-rose-600">
                              {item.label}
                            </span>
                            {item.description ? (
                              <span className="block text-xs text-muted-foreground">
                                {item.description}
                              </span>
                            ) : null}
                          </span>
                          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-rose-500" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>
    </>
  );
}

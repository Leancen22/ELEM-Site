import type { Metadata } from 'next';
import { Link } from '@/components/i18n/link';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { servicios, tecnologias, devops, empresa } from '@/lib/navigation';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

type SiteLink = { label: string; href: string; description?: string };
type Group = { title: string; items: SiteLink[] };

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
    heroTitle: 'Todo el sitio, de un vistazo.',
    heroHighlight: '',
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
      // Oculto: blog desactivado por ahora.
      // { label: 'Blog', href: '/blog', description: 'Ideas y artículos de ingeniería' },
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
    heroTitle: 'The whole site, at a glance.',
    heroHighlight: '',
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
      // Oculto: blog desactivado por ahora.
      // { label: 'Blog', href: '/blog', description: 'Engineering ideas and articles' },
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
    { title: t.groupMain, items: t.main },
    { title: t.groupServices, items: servicios[locale] },
    { title: t.groupTech, items: tecnologias[locale] },
    { title: t.groupDevops, items: devops[locale] },
    { title: t.groupCompany, items: empresa[locale] },
    { title: t.groupLegal, items: t.legal },
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

      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={(i % 3) * 0.05} className="border-t border-foreground/80 pt-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li key={item.label + item.href}>
                    <Link href={item.href} className="group block">
                      <span className="font-medium transition-colors group-hover:text-primary">{item.label}</span>
                      {item.description ? (
                        <span className="block text-sm text-muted-foreground">{item.description}</span>
                      ) : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}

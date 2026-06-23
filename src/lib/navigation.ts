import type { LucideIcon } from 'lucide-react';
import {
  Boxes,
  Braces,
  Building2,
  Code2,
  Cpu,
  Database,
  GitMerge,
  Globe,
  LayoutGrid,
  Layers,
  LifeBuoy,
  Network,
  Plug,
  RefreshCw,
  Rocket,
  Smartphone,
  ShoppingCart,
  Users,
  Workflow,
  BookOpen,
  Building,
  Newspaper,
  Mail,
  Route,
  Trophy,
  ShieldCheck,
} from 'lucide-react';
import type { Locale } from '@/i18n/config';

export type MenuItem = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
};

export type MenuColumn = {
  title: string;
  items: MenuItem[];
};

export type NavEntry = {
  label: string;
  href?: string;
  columns?: MenuColumn[];
  featured?: {
    title: string;
    description: string;
    href: string;
    cta: string;
    topBlock?: { title: string; description: string; cta: string; href: string };
  };
};

type L = Record<Locale, string>;
type RawItem = {
  href: string;
  icon?: LucideIcon;
  label: L;
  description?: L;
};

function pick(items: RawItem[], locale: Locale): MenuItem[] {
  return items.map((it) => ({
    href: it.href,
    icon: it.icon,
    label: it.label[locale],
    description: it.description?.[locale],
  }));
}

const serviciosRaw: RawItem[] = [
  // Qué hacemos (líneas de servicio)
  { href: '/servicios', icon: Globe, label: { es: 'Desarrollo web', en: 'Web development' }, description: { es: 'Portales, intranets y e-commerce', en: 'Portals, intranets and e-commerce' } },
  { href: '/servicios', icon: Smartphone, label: { es: 'Aplicaciones móviles', en: 'Mobile apps' }, description: { es: 'Apps multiplataforma', en: 'Cross-platform apps' } },
  { href: '/servicios', icon: Code2, label: { es: 'Desarrollo de software', en: 'Software development' }, description: { es: 'Sistemas internos y apps empresariales', en: 'Internal systems and enterprise apps' } },
  { href: '/servicios', icon: Workflow, label: { es: 'Automatizaciones', en: 'Automation' }, description: { es: 'Integraciones ERP/CRM y procesos', en: 'ERP/CRM integrations and processes' } },
  
  // Arquitectura & Cloud (capacidades + herramientas)
  { href: '/servicios#arquitectura', icon: Layers, label: { es: 'Arquitectura Empresarial', en: 'Enterprise Architecture' }, description: { es: 'Diseño de sistemas a escala', en: 'Systems design at scale' } },
  { href: '/servicios#integraciones', icon: Plug, label: { es: 'Consultoría', en: 'Consultancy' }, description: { es: 'Asesoramiento técnico para el diseño, arquitectura y desarrollo de software', en: 'Technical guidance for software design, architecture, and development' } },
  { href: '/servicios#apis', icon: Network, label: { es: 'APIs y Microservicios', en: 'APIs & Microservices' }, description: { es: 'Arquitecturas desacopladas', en: 'Decoupled architectures' } },
  { href: '/servicios#modernizacion', icon: RefreshCw, label: { es: 'Modernización de Sistemas', en: 'System Modernization' }, description: { es: 'Docker, Git, ddev y CI/CD', en: 'Docker, Git, ddev and CI/CD' } },
];

const solucionesRaw: RawItem[] = [
  { href: '/soluciones#portales', icon: Building2, label: { es: 'Portales Corporativos', en: 'Corporate Portals' } },
  { href: '/soluciones#intranets', icon: Users, label: { es: 'Intranets', en: 'Intranets' } },
  { href: '/soluciones#sistemas', icon: LayoutGrid, label: { es: 'Sistemas Internos', en: 'Internal Systems' } },
  { href: '/soluciones#ecommerce', icon: ShoppingCart, label: { es: 'E-commerce', en: 'E-commerce' } },
  { href: '/soluciones#apps', icon: Boxes, label: { es: 'Aplicaciones Empresariales', en: 'Enterprise Applications' } },
  { href: '/soluciones#automatizacion', icon: Workflow, label: { es: 'Automatización', en: 'Automation' } },
  { href: '/soluciones#erp', icon: Database, label: { es: 'Integraciones ERP', en: 'ERP Integrations' } },
  { href: '/soluciones#crm', icon: GitMerge, label: { es: 'Integraciones CRM', en: 'CRM Integrations' } },
];

// Tecnologías núcleo (cada una con su landing page).
const tecnologiasRaw: RawItem[] = [
  { href: '/tecnologias/drupal', icon: Globe, label: { es: 'Drupal', en: 'Drupal' }, description: { es: 'CMS de nivel enterprise', en: 'Enterprise-grade CMS' } },
  { href: '/tecnologias/nextjs', icon: Code2, label: { es: 'Next.js', en: 'Next.js' }, description: { es: 'Frontend React, rápido y SEO', en: 'React frontend, fast and SEO-ready' } },
  { href: '/tecnologias/java', icon: Cpu, label: { es: 'Java + Spring Boot', en: 'Java + Spring Boot' }, description: { es: 'Backend de misión crítica', en: 'Mission-critical backend' } },
  { href: '/tecnologias/python', icon: Braces, label: { es: 'Python', en: 'Python' }, description: { es: 'APIs, datos y automatización', en: 'APIs, data and automation' } },
];

// DevOps y herramientas (Docker/Kubernetes como DevOps; ddev, Git, etc.).
const devopsRaw: RawItem[] = [
  { href: '/servicios#cloud', icon: Boxes, label: { es: 'Docker', en: 'Docker' }, description: { es: 'Contenedores reproducibles', en: 'Reproducible containers' } },
  { href: '/servicios#cloud', icon: Network, label: { es: 'Kubernetes', en: 'Kubernetes' }, description: { es: 'Orquestación cloud-native', en: 'Cloud-native orchestration' } },
  { href: '/servicios#cloud', icon: RefreshCw, label: { es: 'ddev', en: 'ddev' }, description: { es: 'Entornos de desarrollo reproducibles', en: 'Reproducible dev environments' } },
  { href: '/servicios#cloud', icon: GitMerge, label: { es: 'Git', en: 'Git' }, description: { es: 'Control de versiones y CI/CD', en: 'Version control and CI/CD' } },
];

const empresaRaw: RawItem[] = [
  { href: '/nosotros', icon: Building, label: { es: 'Nosotros', en: 'About Us' }, description: { es: 'Quiénes somos', en: 'Who we are' } },
  { href: '/nosotros#metodologia', icon: Route, label: { es: 'Metodología', en: 'Methodology' }, description: { es: 'Cómo trabajamos', en: 'How we work' } },
  // Oculto: empresa nueva, sin casos/referencias todavía.
  // { href: '/casos-de-exito', icon: Trophy, label: { es: 'Casos de Éxito', en: 'Case Studies' }, description: { es: 'Resultados reales', en: 'Real results' } },
  { href: '/blog', icon: Newspaper, label: { es: 'Blog', en: 'Blog' }, description: { es: 'Ideas y artículos', en: 'Ideas and articles' } },
  { href: '/contacto', icon: Mail, label: { es: 'Contacto', en: 'Contact' }, description: { es: 'Hablemos', en: "Let's talk" } },
];

export const servicios: Record<Locale, MenuItem[]> = {
  es: pick(serviciosRaw, 'es'),
  en: pick(serviciosRaw, 'en'),
};
export const soluciones: Record<Locale, MenuItem[]> = {
  es: pick(solucionesRaw, 'es'),
  en: pick(solucionesRaw, 'en'),
};
export const tecnologias: Record<Locale, MenuItem[]> = {
  es: pick(tecnologiasRaw, 'es'),
  en: pick(tecnologiasRaw, 'en'),
};
export const devops: Record<Locale, MenuItem[]> = {
  es: pick(devopsRaw, 'es'),
  en: pick(devopsRaw, 'en'),
};
export const empresa: Record<Locale, MenuItem[]> = {
  es: pick(empresaRaw, 'es'),
  en: pick(empresaRaw, 'en'),
};

const navCopy = {
  servicios: { es: 'Servicios', en: 'Services' },
  soluciones: { es: 'Soluciones', en: 'Solutions' },
  tecnologias: { es: 'Tecnologías', en: 'Technologies' },
  empresa: { es: 'Nosotros', en: 'About' },
  contacto: { es: 'Contacto', en: 'Contact' },
  colQueHacemos: { es: 'Qué hacemos', en: 'What we do' },
  colDesarrollo: { es: 'Desarrollo', en: 'Development' },
  colArqCloud: { es: 'Ingeniería & Arquitectura', en: 'Engineering & Architecture' },
  colPlataformas: { es: 'Plataformas', en: 'Platforms' },
  colOperacion: { es: 'Operación & Datos', en: 'Operations & Data' },
  colLenguajes: { es: 'Lenguajes & Frameworks', en: 'Languages & Frameworks' },
  colCloudDevops: { es: 'Cloud & DevOps', en: 'Cloud & DevOps' },
  colElem: { es: 'ELEM', en: 'ELEM' },
  featServiciosTitle: { es: 'Transformación digital de extremo a extremo', en: 'End-to-end digital transformation' },
  featServiciosDesc: { es: 'Del descubrimiento al soporte, un único equipo que diseña, construye y opera tu plataforma.', en: 'From discovery to support, a single team that designs, builds and operates your platform.' },
  featServiciosCta: { es: 'Ver todos los servicios', en: 'See all services' },
  featSolucionesTitle: { es: 'Soluciones para cada vertical', en: 'Solutions for every vertical' },
  featSolucionesDesc: { es: 'Portales, intranets, e-commerce e integraciones ERP/CRM listas para escalar.', en: 'Portals, intranets, e-commerce and ERP/CRM integrations ready to scale.' },
  featSolucionesCta: { es: 'Explorar soluciones', en: 'Explore solutions' },
  featTecTitle: { es: 'Stack moderno, sin atajos', en: 'A modern stack, no shortcuts' },
  featTecDesc: { es: 'Elegimos la tecnología por sus méritos y la operamos con estándares de ingeniería.', en: 'We choose technology on its merits and run it to engineering standards.' },
  featTecCta: { es: 'Conocer el stack', en: 'Explore the stack' },
  featEmpresaTitle: { es: 'Ingeniería con propósito', en: 'Engineering with purpose' },
  featEmpresaDesc: { es: 'Un equipo senior, una metodología probada y obsesión por el impacto medible.', en: 'A senior team, a proven methodology and an obsession with measurable impact.' },
  featEmpresaCta: { es: 'Conócenos', en: 'Get to know us' },
} satisfies Record<string, Record<Locale, string>>;

export function getMainNav(locale: Locale): NavEntry[] {
  const c = (k: keyof typeof navCopy) => navCopy[k][locale];
  const s = pick(serviciosRaw, locale);
  // const so = pick(solucionesRaw, locale); // menú Soluciones fusionado en Servicios
  // const t = pick(tecnologiasRaw, locale);
  const e = pick(empresaRaw, locale);
  return [
    {
      label: c('servicios'),
      columns: [
        // Líneas de servicio
        { title: c('colQueHacemos'), items: s.slice(0, 4) },
        // Capacidades técnicas + herramientas (Docker, Git, ddev)
        { title: c('colArqCloud'), items: s.slice(4) },
      ],
      featured: {
        title: c('featServiciosTitle'),
        description: c('featServiciosDesc'),
        href: '/servicios',
        cta: c('featServiciosCta'),
        topBlock: {
          title: c('featTecTitle'),
          description: c('featTecDesc'),
          cta: c('featTecCta'),
          href: '/tecnologias',
        },
      },
    },
    // Menú "Soluciones" fusionado dentro de Servicios (sus casos se mencionan
    // en las descripciones de las líneas de servicio). Página /soluciones oculta.
    // {
    //   label: c('soluciones'),
    //   columns: [
    //     { title: c('colPlataformas'), items: so.slice(0, 4) },
    //     { title: c('colOperacion'), items: so.slice(4) },
    //   ],
    //   featured: {
    //     title: c('featSolucionesTitle'),
    //     description: c('featSolucionesDesc'),
    //     href: '/soluciones',
    //     cta: c('featSolucionesCta'),
    //   },
    // },
    // Menú "Tecnologías" fusionado dentro de Servicios (evita la duplicación
    // Servicios/Tecnologías). Las tech-pages siguen vivas para SEO.
    // {
    //   label: c('tecnologias'),
    //   columns: [
    //     { title: c('colLenguajes'), items: t.slice(0, 5) },
    //     { title: c('colCloudDevops'), items: t.slice(5) },
    //   ],
    //   featured: {
    //     title: c('featTecTitle'),
    //     description: c('featTecDesc'),
    //     href: '/servicios#stack',
    //     cta: c('featTecCta'),
    //   },
    // },
    {
      label: c('empresa'),
      columns: [{ title: c('colElem'), items: e }],
      featured: {
        title: c('featEmpresaTitle'),
        description: c('featEmpresaDesc'),
        href: '/nosotros',
        cta: c('featEmpresaCta'),
      },
    },
    // Link directo, sin mega-menú
    { label: c('contacto'), href: '/contacto' },
  ];
}

const supportNavRaw: RawItem[] = [
  { href: '/servicios', label: { es: 'Servicios', en: 'Services' } },
  // { href: '/soluciones', label: { es: 'Soluciones', en: 'Solutions' } },
  // Oculto: empresa nueva, sin casos/referencias todavía.
  // { href: '/casos-de-exito', label: { es: 'Casos de Éxito', en: 'Case Studies' } },
  { href: '/blog', label: { es: 'Blog', en: 'Blog' } },
  { href: '/nosotros', label: { es: 'Nosotros', en: 'About Us' } },
];

export function getSupportNav(locale: Locale) {
  return supportNavRaw.map((it) => ({ label: it.label[locale], href: it.href }));
}

export { LifeBuoy, ShieldCheck, Rocket, BookOpen };

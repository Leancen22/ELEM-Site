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

// Líneas de servicio: cada una apunta a su sección en /servicios.
const serviciosRaw: RawItem[] = [
  { href: '/servicios#web', label: { es: 'Desarrollo web', en: 'Web development' }, description: { es: 'Portales, intranets y e-commerce', en: 'Portals, intranets and e-commerce' } },
  { href: '/servicios#movil', label: { es: 'Aplicaciones móviles', en: 'Mobile apps' }, description: { es: 'Apps para iOS y Android', en: 'iOS and Android apps' } },
  { href: '/servicios#software', label: { es: 'Software a medida', en: 'Custom software' }, description: { es: 'Sistemas internos y backends', en: 'Internal systems and backends' } },
  { href: '/servicios#automatizacion', label: { es: 'Automatización e integraciones', en: 'Automation & integrations' }, description: { es: 'ERP, CRM y procesos', en: 'ERP, CRM and processes' } },
  { href: '/servicios#consultoria', label: { es: 'Consultoría técnica', en: 'Technical consulting' }, description: { es: 'Arquitectura, stack y DevOps', en: 'Architecture, stack and DevOps' } },
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
  { href: '/nosotros#metodologia', icon: Route, label: { es: 'Cómo trabajamos', en: 'How we work' }, description: { es: 'Nuestro proceso', en: 'Our process' } },
  // Oculto: empresa nueva, sin casos/referencias todavía.
  // { href: '/casos-de-exito', icon: Trophy, label: { es: 'Casos de Éxito', en: 'Case Studies' }, description: { es: 'Resultados reales', en: 'Real results' } },
  // Oculto: blog desactivado por ahora (página _blog fuera de rutas).
  // { href: '/blog', icon: Newspaper, label: { es: 'Blog', en: 'Blog' }, description: { es: 'Ideas y artículos', en: 'Ideas and articles' } },
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

/**
 * Top navigation: flat links, no mega-menu. The site is small enough that
 * every section is one click away; Contacto is the header CTA button.
 * (Soluciones y casos de éxito siguen ocultos; ver historial.)
 */
export function getMainNav(locale: Locale): NavEntry[] {
  const c = (k: keyof typeof navCopy) => navCopy[k][locale];
  return [
    { label: c('servicios'), href: '/servicios' },
    { label: c('tecnologias'), href: '/tecnologias' },
    { label: c('empresa'), href: '/nosotros' },
  ];
}

const supportNavRaw: RawItem[] = [
  { href: '/servicios', label: { es: 'Servicios', en: 'Services' } },
  // { href: '/soluciones', label: { es: 'Soluciones', en: 'Solutions' } },
  // Oculto: empresa nueva, sin casos/referencias todavía.
  // { href: '/casos-de-exito', label: { es: 'Casos de Éxito', en: 'Case Studies' } },
  // Oculto: blog desactivado por ahora.
  // { href: '/blog', label: { es: 'Blog', en: 'Blog' } },
  { href: '/nosotros', label: { es: 'Nosotros', en: 'About Us' } },
];

export function getSupportNav(locale: Locale) {
  return supportNavRaw.map((it) => ({ label: it.label[locale], href: it.href }));
}

export { LifeBuoy, ShieldCheck, Rocket, BookOpen };

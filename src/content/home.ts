import type { TechKey } from '@/components/visuals/tech-logos';
import type { Locale } from '@/i18n/config';

/** A service line. `id` is the anchor on /servicios (e.g. /servicios#web). */
export type ServiceCard = {
  id: string;
  title: string;
  description: string;
  includes: string[];
};

export type MetricItem = { value: number; suffix: string; label: string };

export type CaseStudy = {
  client: string;
  sector: string;
  title: string;
  impact: string;
  kpis: { value: string; label: string }[];
  tech: TechKey[];
  accent: string;
};

export type MethodologyStep = { step: string; title: string; tagline: string; description: string };
export type Principle = { title: string; body: string };
export type Testimonial = { quote: string; name: string; role: string };

type SectionHead = {
  eyebrow: string;
  lead: string;
  accent?: string;
  tail?: string;
  description?: string;
};

export type HomeContent = {
  services: ServiceCard[];
  metrics: MetricItem[];
  caseStudies: CaseStudy[];
  methodology: MethodologyStep[];
  principles: Principle[];
  testimonials: Testimonial[];
  partners: string[];
  sections: {
    hero: {
      title: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    partners: { heading: string };
    services: SectionHead & { more: string; all: string };
    metrics: { eyebrow: string; title: string };
    caseStudies: SectionHead & { viewAll: string };
    methodology: SectionHead & { more: string };
    principles: SectionHead;
    testimonials: SectionHead & { prev: string; next: string; goTo: string };
    cta: {
      eyebrow: string;
      title: string;
      description: string;
      primary: string;
      secondary: string;
    };
  };
};

const partners = [
  'Banco Atlas',
  'RetailMax',
  'GovDigital',
  'Industrias Vela',
  'NovaHealth',
  'LogiTrans',
  'EduPrime',
  'Seguros Orión',
];

export const home: Record<Locale, HomeContent> = {
  es: {
    partners,
    services: [
      { id: 'web', title: 'Desarrollo web', description: 'Sitios, portales e intranets que cargan rápido, se ven bien en cualquier dispositivo y tu equipo puede actualizar sin depender de nadie.', includes: ['Sitios corporativos e institucionales', 'Portales, intranets y tiendas online', 'Gestor de contenidos fácil de usar', 'Accesibilidad y posicionamiento en buscadores'] },
      { id: 'movil', title: 'Aplicaciones móviles', description: 'Apps para iOS y Android que se integran con los sistemas que ya usas.', includes: ['Una sola app para iOS y Android', 'Diseño pensado para el uso diario', 'Conexión con tus sistemas actuales', 'Publicación en tiendas y mantenimiento'] },
      { id: 'software', title: 'Software a medida', description: 'Sistemas internos y aplicaciones de negocio que se adaptan a tus procesos, no al revés.', includes: ['Sistemas de gestión internos', 'Integraciones entre aplicaciones', 'Modernización de sistemas antiguos', 'Arquitectura documentada y preparada para crecer'] },
      { id: 'automatizacion', title: 'Automatización e integraciones', description: 'Conectamos tus herramientas y eliminamos el trabajo manual repetitivo.', includes: ['Integración con ERP, CRM y medios de pago', 'Flujos de trabajo automáticos', 'Datos sincronizados entre sistemas', 'Reportes que se generan solos'] },
      { id: 'consultoria', title: 'Consultoría técnica', description: 'Una mirada experta antes de invertir: qué construir, cómo y con qué.', includes: ['Auditoría de código y arquitectura', 'Selección de tecnología', 'Hoja de ruta técnica', 'Procesos de despliegue y calidad'] },
    ],
    metrics: [
      { value: 4, suffix: '', label: 'Tecnologías núcleo' },
      { value: 100, suffix: '%', label: 'Equipo senior' },
      { value: 24, suffix: 'h', label: 'Tiempo de respuesta' },
      { value: 7, suffix: '', label: 'Fases de nuestro método' },
    ],
    caseStudies: [
      { client: 'Banco Atlas', sector: 'Banca', title: 'Core de pagos modernizado a microservicios', impact: 'De 6 a 0,3 segundos de latencia media en transacciones.', kpis: [{ value: '-95%', label: 'latencia' }, { value: '99.99%', label: 'uptime' }, { value: '3×', label: 'throughput' }], tech: ['java', 'node', 'kubernetes', 'aws'], accent: 'from-rose-500 to-fuchsia-600' },
      { client: 'RetailMax', sector: 'E-commerce', title: 'Plataforma headless con Drupal + React', impact: '+38% de conversión y catálogo de 1,2M de SKU.', kpis: [{ value: '+38%', label: 'conversión' }, { value: '0.8s', label: 'LCP' }, { value: '1.2M', label: 'SKU' }], tech: ['drupal', 'react', 'php', 'docker'], accent: 'from-fuchsia-500 to-rose-600' },
      { client: 'GovDigital', sector: 'Sector público', title: 'Portal ciudadano accesible para 4M de usuarios', impact: 'Accesibilidad AAA y 4M de trámites digitales al año.', kpis: [{ value: 'AAA', label: 'accesibilidad' }, { value: '4M', label: 'trámites/año' }, { value: '-60%', label: 'tiempo gestión' }], tech: ['drupal', 'react', 'php', 'aws'], accent: 'from-rose-600 to-purple-600' },
    ],
    methodology: [
      { step: '01', title: 'Descubrimiento', tagline: 'Entendemos el problema', description: 'Conocemos tu negocio, a quién sirve el sistema y qué tienes hoy. Acordamos objetivos medibles.' },
      { step: '02', title: 'Diseño', tagline: 'Damos forma a la solución', description: 'Definimos la arquitectura y la experiencia de uso. Validamos con prototipos antes de escribir código.' },
      { step: '03', title: 'Desarrollo', tagline: 'Construimos por etapas', description: 'Avanzamos en etapas cortas. Cada cambio se revisa y se prueba antes de llegar a producción.' },
      { step: '04', title: 'Lanzamiento y evolución', tagline: 'Publicamos y acompañamos', description: 'Salimos a producción sin interrupciones y seguimos mejorando el producto con soporte continuo.' },
    ],
    principles: [
      { title: 'Hablas con quien construye', body: 'Sin intermediarios: las decisiones técnicas las conversas con el equipo que diseña y programa.' },
      { title: 'Avances cada dos semanas', body: 'Ves software funcionando de forma regular y sabes siempre qué viene después.' },
      { title: 'Calidad incluida', body: 'Revisión de código, pruebas automáticas y accesibilidad forman parte de cada entrega. No son un extra.' },
      { title: 'Todo queda en tus manos', body: 'Elegimos la tecnología según tu problema y te entregamos todo: código, documentación y accesos.' },
    ],
    testimonials: [
      { quote: 'ELEM transformó nuestro core legacy en una plataforma de microservicios sin un solo minuto de caída. Su nivel de ingeniería es excepcional.', name: 'María Sanz', role: 'CTO, Banco Atlas' },
      { quote: 'Pasamos de releases trimestrales a despliegues diarios. El equipo de ELEM elevó el estándar de todo nuestro departamento de tecnología.', name: 'Daniel Ortega', role: 'VP Engineering, RetailMax' },
      { quote: 'Necesitábamos un portal accesible para millones de ciudadanos. Lo entregaron con una calidad y rigor que no habíamos visto antes.', name: 'Lucía Fernández', role: 'Directora Digital, GovDigital' },
      { quote: 'Su dominio de Drupal y React es total. La integración con nuestro ERP fue impecable y la performance, sobresaliente.', name: 'Carlos Méndez', role: 'Head of IT, Industrias Vela' },
    ],
    sections: {
      hero: {
        title: 'Software a medida, bien hecho desde el primer día.',
        description: 'Diseñamos, construimos y evolucionamos plataformas web, aplicaciones y sistemas internos para empresas.',
        ctaPrimary: 'Cuéntanos tu proyecto',
        ctaSecondary: 'Qué hacemos',
      },
      partners: { heading: 'Empresas líderes confían en ELEM' },
      services: {
        eyebrow: 'Servicios',
        lead: 'Qué hacemos',
        description: 'Cinco servicios y un mismo equipo, de la idea a la operación diaria.',
        more: 'Ver detalle',
        all: 'Ver todos los servicios',
      },
      metrics: { eyebrow: 'Impacto medible', title: 'Resultados que hablan por nosotros' },
      caseStudies: {
        eyebrow: 'Casos de éxito',
        lead: 'Impacto real en empresas',
        accent: 'exigentes',
        description: 'Plataformas críticas, resultados medibles. Así se ve nuestro trabajo en producción.',
        viewAll: 'Ver todos',
      },
      methodology: {
        eyebrow: 'Cómo trabajamos',
        lead: 'Cómo trabajamos',
        description: 'Un proceso claro, de la primera reunión al mantenimiento.',
        more: 'Conocer el proceso',
      },
      principles: {
        eyebrow: 'Por qué ELEM',
        lead: 'Lo que puedes esperar de nosotros.',
      },
      testimonials: {
        eyebrow: 'Testimonios',
        lead: 'Lo que dicen quienes ya',
        accent: 'trabajan con nosotros',
        prev: 'Anterior',
        next: 'Siguiente',
        goTo: 'Ir al testimonio',
      },
      cta: {
        eyebrow: 'Contacto',
        title: 'Cuéntanos qué necesitas construir.',
        description: 'Respondemos en menos de 24 horas hábiles con los próximos pasos.',
        primary: 'Escribirnos',
        secondary: 'contacto@elem.uy',
      },
    },
  },
  en: {
    partners,
    services: [
      { id: 'web', title: 'Web development', description: 'Websites, portals and intranets that load fast, look right on any device and your team can update on its own.', includes: ['Corporate and institutional websites', 'Portals, intranets and online stores', 'An easy-to-use content manager', 'Accessibility and search visibility'] },
      { id: 'movil', title: 'Mobile apps', description: 'iOS and Android apps that work with the systems you already use.', includes: ['One app for iOS and Android', 'Design built for everyday use', 'Connected to your current systems', 'Store publishing and maintenance'] },
      { id: 'software', title: 'Custom software', description: 'Internal systems and business applications that fit your processes, not the other way round.', includes: ['Internal management systems', 'Integrations between applications', 'Modernization of legacy systems', 'Documented architecture, ready to grow'] },
      { id: 'automatizacion', title: 'Automation & integrations', description: 'We connect your tools and remove repetitive manual work.', includes: ['ERP, CRM and payment integrations', 'Automated workflows', 'Data kept in sync across systems', 'Reports that build themselves'] },
      { id: 'consultoria', title: 'Technical consulting', description: 'An expert view before you invest: what to build, how, and with what.', includes: ['Code and architecture audits', 'Technology selection', 'Technical roadmap', 'Release and quality processes'] },
    ],
    metrics: [
      { value: 4, suffix: '', label: 'Core technologies' },
      { value: 100, suffix: '%', label: 'Senior team' },
      { value: 24, suffix: 'h', label: 'Response time' },
      { value: 7, suffix: '', label: 'Steps in our method' },
    ],
    caseStudies: [
      { client: 'Banco Atlas', sector: 'Banking', title: 'Payments core modernized to microservices', impact: 'From 6 to 0.3 seconds average transaction latency.', kpis: [{ value: '-95%', label: 'latency' }, { value: '99.99%', label: 'uptime' }, { value: '3×', label: 'throughput' }], tech: ['java', 'node', 'kubernetes', 'aws'], accent: 'from-rose-500 to-fuchsia-600' },
      { client: 'RetailMax', sector: 'E-commerce', title: 'Headless platform with Drupal + React', impact: '+38% conversion and a 1.2M SKU catalog.', kpis: [{ value: '+38%', label: 'conversion' }, { value: '0.8s', label: 'LCP' }, { value: '1.2M', label: 'SKU' }], tech: ['drupal', 'react', 'php', 'docker'], accent: 'from-fuchsia-500 to-rose-600' },
      { client: 'GovDigital', sector: 'Public sector', title: 'Accessible citizen portal for 4M users', impact: 'AAA accessibility and 4M digital procedures per year.', kpis: [{ value: 'AAA', label: 'accessibility' }, { value: '4M', label: 'procedures/yr' }, { value: '-60%', label: 'processing time' }], tech: ['drupal', 'react', 'php', 'aws'], accent: 'from-rose-600 to-purple-600' },
    ],
    methodology: [
      { step: '01', title: 'Discovery', tagline: 'We understand the problem', description: 'We learn your business, who the system serves and what you have today. We agree on measurable goals.' },
      { step: '02', title: 'Design', tagline: 'We shape the solution', description: 'We define the architecture and the user experience. We validate with prototypes before writing code.' },
      { step: '03', title: 'Development', tagline: 'We build in stages', description: 'We move in short stages. Every change is reviewed and tested before it reaches production.' },
      { step: '04', title: 'Launch and evolution', tagline: 'We ship and stay on', description: 'We go live with no downtime and keep improving the product with ongoing support.' },
    ],
    principles: [
      { title: 'You talk to the builders', body: 'No middlemen: you discuss technical decisions with the team that designs and codes.' },
      { title: 'Progress every two weeks', body: 'You see working software regularly and always know what comes next.' },
      { title: 'Quality included', body: 'Code review, automated testing and accessibility are part of every release. Not an extra.' },
      { title: 'Everything stays with you', body: 'We pick technology to fit your problem and hand everything over: code, documentation and access.' },
    ],
    testimonials: [
      { quote: 'ELEM turned our legacy core into a microservices platform without a single minute of downtime. Their engineering level is exceptional.', name: 'María Sanz', role: 'CTO, Banco Atlas' },
      { quote: 'We went from quarterly releases to daily deployments. The ELEM team raised the standard of our entire technology department.', name: 'Daniel Ortega', role: 'VP Engineering, RetailMax' },
      { quote: 'We needed an accessible portal for millions of citizens. They delivered it with a quality and rigor we had never seen before.', name: 'Lucía Fernández', role: 'Digital Director, GovDigital' },
      { quote: 'Their command of Drupal and React is total. The integration with our ERP was flawless and the performance outstanding.', name: 'Carlos Méndez', role: 'Head of IT, Industrias Vela' },
    ],
    sections: {
      hero: {
        title: 'Custom software, built right from day one.',
        description: 'We design, build and evolve web platforms, applications and internal systems for companies.',
        ctaPrimary: 'Tell us about your project',
        ctaSecondary: 'What we do',
      },
      partners: { heading: 'Leading companies trust ELEM' },
      services: {
        eyebrow: 'Services',
        lead: 'What we do',
        description: 'Five services and one team, from the idea to day-to-day operation.',
        more: 'See details',
        all: 'See all services',
      },
      metrics: { eyebrow: 'Measurable impact', title: 'Results that speak for us' },
      caseStudies: {
        eyebrow: 'Case studies',
        lead: 'Real impact for demanding',
        accent: 'companies',
        description: 'Critical platforms, measurable results. This is what our work looks like in production.',
        viewAll: 'View all',
      },
      methodology: {
        eyebrow: 'How we work',
        lead: 'How we work',
        description: 'A clear process, from the first meeting to maintenance.',
        more: 'See the process',
      },
      principles: {
        eyebrow: 'Why ELEM',
        lead: 'What you can expect from us.',
      },
      testimonials: {
        eyebrow: 'Testimonials',
        lead: 'What those who already',
        accent: 'work with us say',
        prev: 'Previous',
        next: 'Next',
        goTo: 'Go to testimonial',
      },
      cta: {
        eyebrow: 'Contact',
        title: 'Tell us what you need to build.',
        description: 'We reply within 24 business hours with the next steps.',
        primary: 'Get in touch',
        secondary: 'contacto@elem.uy',
      },
    },
  },
};

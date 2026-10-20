import type { TechKey } from '@/components/visuals/tech-logos';
import type { Locale } from '@/i18n/config';

export type TechCard = {
  key: TechKey;
  name: string;
  href: string;
  tagline: string;
  useCases: string[];
};

export type Tool = { key?: TechKey; name: string };

/** A service line. `id` is the anchor on /servicios (e.g. /servicios#web). */
export type ServiceCard = {
  id: string;
  title: string;
  description: string;
  includes: string[];
  stack: string;
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
  techCards: TechCard[];
  tools: Tool[];
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
    technologies: SectionHead & { toolsLabel: string; more: string };
    services: SectionHead & { more: string; all: string };
    metrics: { eyebrow: string; title: string };
    caseStudies: SectionHead & { viewAll: string };
    methodology: SectionHead;
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
    techCards: [
      { key: 'drupal', name: 'Drupal', href: '/tecnologias/drupal', tagline: 'CMS de nivel enterprise para portales y plataformas de contenido.', useCases: ['Portales corporativos', 'Gobierno digital', 'Multi-sitio'] },
      { key: 'next', name: 'Next.js', href: '/tecnologias/nextjs', tagline: 'Frontend moderno sobre React: rápido, accesible y SEO-friendly.', useCases: ['Web apps', 'Sitios de alto rendimiento', 'Design systems'] },
      { key: 'java', name: 'Java + Spring Boot', href: '/tecnologias/java', tagline: 'Backend robusto y escalable con Spring Boot.', useCases: ['APIs y microservicios', 'Sistemas de misión crítica', 'Event-driven'] },
      { key: 'python', name: 'Python', href: '/tecnologias/python', tagline: 'APIs, datos y automatización; IA en producción.', useCases: ['APIs con FastAPI', 'Pipelines de datos', 'Automatización e IA'] },
    ],
    tools: [
      { key: 'ddev', name: 'ddev' },
      { key: 'git', name: 'Git' },
      { key: 'docker', name: 'Docker' },
      { key: 'kubernetes', name: 'Kubernetes' },
    ],
    services: [
      { id: 'web', title: 'Desarrollo web', description: 'Sitios, portales, intranets y e-commerce rápidos, accesibles y fáciles de mantener por tu equipo.', includes: ['Portales corporativos e institucionales', 'Web apps y e-commerce', 'CMS editable con Drupal', 'Rendimiento, accesibilidad y SEO técnico'], stack: 'Next.js · Drupal' },
      { id: 'movil', title: 'Aplicaciones móviles', description: 'Apps para iOS y Android desde una sola base de código, conectadas a los sistemas que ya usas.', includes: ['Apps multiplataforma', 'Diseño de experiencia móvil', 'Integración con tus APIs y backends', 'Publicación en tiendas y mantenimiento'], stack: 'iOS · Android' },
      { id: 'software', title: 'Software a medida', description: 'Sistemas internos, backends y aplicaciones empresariales diseñados para durar y crecer.', includes: ['Sistemas de gestión internos', 'APIs y microservicios', 'Modernización de sistemas legacy', 'Arquitectura documentada y escalable'], stack: 'Java + Spring Boot · Python' },
      { id: 'automatizacion', title: 'Automatización e integraciones', description: 'Conectamos tus sistemas y automatizamos tareas repetitivas para ganar tiempo y reducir errores.', includes: ['Integraciones con ERP, CRM y pagos', 'Flujos y tareas automatizadas', 'Sincronización de datos entre sistemas', 'Pipelines de datos'], stack: 'Python · APIs · Webhooks' },
      { id: 'consultoria', title: 'Consultoría técnica', description: 'Te ayudamos a decidir bien antes de invertir: arquitectura, stack y prácticas de ingeniería.', includes: ['Auditoría de código y arquitectura', 'Elección de stack tecnológico', 'Hoja de ruta técnica', 'DevOps y entrega continua'], stack: 'Docker · Kubernetes · CI/CD' },
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
      { step: '01', title: 'Descubrimiento y análisis', tagline: 'Entendemos tu negocio', description: 'Nos reunimos contigo para entender tu negocio, quién usará la plataforma y tus limitaciones. Revisamos tus sistemas y datos actuales y fijamos objetivos claros y medibles.' },
      { step: '02', title: 'Diseño', tagline: 'Damos forma a la solución', description: 'Definimos la arquitectura técnica y diseñamos la interfaz pensando en quien la usará. Validamos las ideas con prototipos antes de programar.' },
      { step: '03', title: 'Desarrollo y QA', tagline: 'Construimos a medida', description: 'Programamos en ciclos cortos, revisando cada cambio. En paralelo probamos rendimiento, seguridad y accesibilidad para garantizar la calidad de cada versión.' },
      { step: '04', title: 'Entrega y soporte', tagline: 'Lanzamos y acompañamos', description: 'Lanzamos la plataforma de forma controlada, sin cortes de servicio y pudiendo volver atrás si algo falla. Después seguimos a tu lado: mejoras, evolución y soporte con SLA.' },
    ],
    principles: [
      { title: 'Hablas con quien construye', body: 'Sin capas comerciales ni intermediarios. Las conversaciones técnicas las tienes con el equipo que diseña y programa tu proyecto.' },
      { title: 'Avance visible cada dos semanas', body: 'Trabajamos en ciclos cortos, con demos y software desplegable. Siempre sabes en qué punto está el proyecto y qué viene después.' },
      { title: 'Calidad de serie', body: 'Revisión de código, tests automatizados, integración continua y accesibilidad forman parte del trabajo. No son extras.' },
      { title: 'El código es tuyo', body: 'Documentamos cada decisión y entregamos todo: repositorio, infraestructura y conocimiento. Sin dependencias forzadas.' },
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
        description: 'Diseñamos, construimos y mantenemos plataformas web, apps y sistemas internos para empresas que necesitan que su tecnología funcione. Un equipo senior, trato directo y estándares de ingeniería en cada entrega.',
        ctaPrimary: 'Cuéntanos tu proyecto',
        ctaSecondary: 'Ver servicios',
      },
      partners: { heading: 'Empresas líderes confían en ELEM' },
      technologies: {
        eyebrow: 'Tecnología',
        lead: 'Pocas tecnologías, dominadas a fondo.',
        description: 'Elegimos cada herramienta por sus méritos y la operamos con disciplina de ingeniería. Sin modas ni ataduras a un proveedor.',
        toolsLabel: 'DevOps y herramientas',
        more: 'Ver tecnologías',
      },
      services: {
        eyebrow: 'Servicios',
        lead: 'Qué hacemos',
        description: 'Un único equipo para todo el ciclo de vida de tu producto: estrategia, diseño, desarrollo y evolución.',
        more: 'Ver detalle',
        all: 'Todos los servicios',
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
        lead: 'Un proceso claro, de la primera reunión al mantenimiento.',
        description: 'Cuatro fases que reducen la incertidumbre y te dan visibilidad en cada paso.',
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
        description: 'Te respondemos en menos de 24 horas hábiles. Si encaja, agendamos una llamada y te proponemos alcance, plazos y presupuesto.',
        primary: 'Escribirnos',
        secondary: 'contacto@elem.uy',
      },
    },
  },
  en: {
    partners,
    techCards: [
      { key: 'drupal', name: 'Drupal', href: '/tecnologias/drupal', tagline: 'Enterprise-grade CMS for content portals and platforms.', useCases: ['Corporate portals', 'Digital government', 'Multi-site'] },
      { key: 'next', name: 'Next.js', href: '/tecnologias/nextjs', tagline: 'Modern React-based frontend: fast, accessible and SEO-friendly.', useCases: ['Web apps', 'High-performance sites', 'Design systems'] },
      { key: 'java', name: 'Java + Spring Boot', href: '/tecnologias/java', tagline: 'Robust, scalable backend with Spring Boot.', useCases: ['APIs & microservices', 'Mission-critical systems', 'Event-driven'] },
      { key: 'python', name: 'Python', href: '/tecnologias/python', tagline: 'APIs, data and automation; AI in production.', useCases: ['APIs with FastAPI', 'Data pipelines', 'Automation & AI'] },
    ],
    tools: [
      { key: 'ddev', name: 'ddev' },
      { key: 'git', name: 'Git' },
      { key: 'docker', name: 'Docker' },
      { key: 'kubernetes', name: 'Kubernetes' },
    ],
    services: [
      { id: 'web', title: 'Web development', description: 'Fast, accessible websites, portals, intranets and e-commerce that your team can maintain.', includes: ['Corporate and institutional portals', 'Web apps and e-commerce', 'Editable CMS with Drupal', 'Performance, accessibility and technical SEO'], stack: 'Next.js · Drupal' },
      { id: 'movil', title: 'Mobile apps', description: 'iOS and Android apps from a single codebase, connected to the systems you already use.', includes: ['Cross-platform apps', 'Mobile experience design', 'Integration with your APIs and backends', 'Store publishing and maintenance'], stack: 'iOS · Android' },
      { id: 'software', title: 'Custom software', description: 'Internal systems, backends and business applications designed to last and grow.', includes: ['Internal management systems', 'APIs and microservices', 'Legacy system modernization', 'Documented, scalable architecture'], stack: 'Java + Spring Boot · Python' },
      { id: 'automatizacion', title: 'Automation & integrations', description: 'We connect your systems and automate repetitive work to save time and cut errors.', includes: ['ERP, CRM and payment integrations', 'Automated workflows and tasks', 'Data sync between systems', 'Data pipelines'], stack: 'Python · APIs · Webhooks' },
      { id: 'consultoria', title: 'Technical consulting', description: 'We help you decide well before you invest: architecture, stack and engineering practices.', includes: ['Code and architecture audits', 'Technology stack selection', 'Technical roadmap', 'DevOps and continuous delivery'], stack: 'Docker · Kubernetes · CI/CD' },
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
      { step: '01', title: 'Discovery & Analysis', tagline: 'We understand your business', description: 'We meet with you to understand your business, who will use the platform and your constraints. We review your current systems and data and set clear, measurable goals.' },
      { step: '02', title: 'Design', tagline: 'We shape the solution', description: 'We define the technical architecture and design the interface around the people who will use it. We validate ideas with prototypes before writing any code.' },
      { step: '03', title: 'Development & QA', tagline: 'We build to measure', description: 'We code in short cycles, reviewing every change. In parallel we test performance, security and accessibility to ensure the quality of every release.' },
      { step: '04', title: 'Delivery & support', tagline: 'We launch and stay on', description: 'We launch the platform in a controlled way, with no downtime and the ability to roll back if something fails. Then we stay by your side: improvements, evolution and support with an SLA.' },
    ],
    principles: [
      { title: 'You talk to the builders', body: 'No sales layers, no middlemen. Technical conversations happen with the team that designs and codes your project.' },
      { title: 'Visible progress every two weeks', body: 'We work in short cycles with demos and deployable software. You always know where the project stands and what comes next.' },
      { title: 'Quality by default', body: 'Code review, automated tests, continuous integration and accessibility are part of the job. Not extras.' },
      { title: 'The code is yours', body: 'We document every decision and hand over everything: repository, infrastructure and knowledge. No forced lock-in.' },
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
        description: 'We design, build and maintain web platforms, apps and internal systems for companies that need their technology to work. A senior team, direct contact and engineering standards in every release.',
        ctaPrimary: 'Tell us about your project',
        ctaSecondary: 'See services',
      },
      partners: { heading: 'Leading companies trust ELEM' },
      technologies: {
        eyebrow: 'Technology',
        lead: 'A few technologies, mastered in depth.',
        description: 'We choose every tool on its merits and run it with engineering discipline. No fads, no vendor lock-in.',
        toolsLabel: 'DevOps & tools',
        more: 'See technologies',
      },
      services: {
        eyebrow: 'Services',
        lead: 'What we do',
        description: 'One team for your product’s whole lifecycle: strategy, design, development and evolution.',
        more: 'See details',
        all: 'All services',
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
        lead: 'A clear process, from the first meeting to maintenance.',
        description: 'Four phases that reduce uncertainty and give you visibility at every step.',
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
        description: 'We reply within 24 business hours. If it’s a fit, we schedule a call and propose scope, timeline and budget.',
        primary: 'Get in touch',
        secondary: 'contacto@elem.uy',
      },
    },
  },
};

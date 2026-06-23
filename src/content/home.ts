import type { TechKey } from '@/components/visuals/tech-logos';
import type { Locale } from '@/i18n/config';

export type TechCard = {
  key: TechKey;
  name: string;
  href: string;
  tagline: string;
  useCases: string[];
  accent: string;
};

export type Tool = { key?: TechKey; name: string };

export type ServiceCard = {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
  href: string;
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

export type MethodologyStep = { step: string; title: string; description: string };
export type Benefit = { title: string; body: string };
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
  benefits: Benefit[];
  testimonials: Testimonial[];
  partners: string[];
  sections: {
    hero: {
      titleLead: string;
      titleAccent: string;
      titleTail: string;
      descLead: string;
      descStrong: string;
      descTail: string;
      ctaPrimary: string;
      ctaSecondary: string;
      ratingClients: string;
      scroll: string;
    };
    partners: { heading: string };
    technologies: SectionHead & {
      toolsLabel: string;
      ctaKicker: string;
      ctaTitle: string;
      ctaCta: string;
    };
    services: SectionHead & { more: string };
    metrics: { eyebrow: string; title: string };
    caseStudies: SectionHead & { viewAll: string };
    methodology: SectionHead;
    benefits: SectionHead & { stats: { k: string; l: string }[] };
    testimonials: SectionHead & { prev: string; next: string; goTo: string };
    cta: {
      badge: string;
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
      { key: 'drupal', name: 'Drupal', href: '/tecnologias/drupal', tagline: 'CMS de nivel enterprise para portales y plataformas de contenido.', useCases: ['Portales corporativos', 'Gobierno digital', 'Multi-sitio'], accent: 'from-sky-500/20 to-rose-500/10' },
      { key: 'next', name: 'Next.js', href: '/tecnologias/nextjs', tagline: 'Frontend moderno sobre React: rápido, accesible y SEO-friendly.', useCases: ['Web apps', 'Sitios de alto rendimiento', 'Design systems'], accent: 'from-cyan-400/20 to-fuchsia-500/10' },
      { key: 'java', name: 'Java + Spring Boot', href: '/tecnologias/java', tagline: 'Backend robusto y escalable con Spring Boot.', useCases: ['APIs y microservicios', 'Sistemas de misión crítica', 'Event-driven'], accent: 'from-orange-500/20 to-rose-500/10' },
      { key: 'python', name: 'Python', href: '/tecnologias/python', tagline: 'APIs, datos y automatización; IA en producción.', useCases: ['APIs con FastAPI', 'Pipelines de datos', 'Automatización e IA'], accent: 'from-amber-400/20 to-sky-500/10' },
    ],
    tools: [
      { key: 'ddev', name: 'ddev' },
      { key: 'git', name: 'Git' },
      { key: 'docker', name: 'Docker' },
      { key: 'kubernetes', name: 'Kubernetes' },
    ],
    services: [
      { icon: 'Globe', title: 'Desarrollo web', description: 'Sitios y aplicaciones web a medida: rápidas, accesibles y fáciles de mantener.', benefits: ['Web apps con Next.js', 'CMS con Drupal', 'Rendimiento y SEO'], href: '/servicios' },
      { icon: 'Smartphone', title: 'Aplicaciones móviles', description: 'Apps multiplataforma con una sola base de código y experiencia fluida.', benefits: ['iOS y Android', 'Multiplataforma', 'Integración con APIs'], href: '/servicios' },
      { icon: 'Code2', title: 'Desarrollo de software', description: 'Sistemas a medida y backends robustos con Java y Spring Boot.', benefits: ['APIs y microservicios', 'Arquitectura escalable', 'Calidad de ingeniería'], href: '/servicios' },
      { icon: 'Workflow', title: 'Automatizaciones', description: 'Automatizamos procesos e integramos tus sistemas para ahorrar tiempo y errores.', benefits: ['Integraciones', 'Flujos automáticos', 'Conexión de sistemas'], href: '/servicios' },
      {
        icon: 'Lightbulb',
        title: 'Consultoría',
        description: 'Asesoramiento técnico para diseño de software, arquitectura y toma de decisiones tecnológicas.',
        benefits: ['Arquitectura de software', 'Stack tecnológico', 'Buenas prácticas de desarrollo'],
        href: '/servicios'
      }
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
      { step: '01', title: 'Descubrimiento', description: 'Entendemos negocio, usuarios y restricciones. Definimos objetivos medibles.' },
      { step: '02', title: 'Análisis', description: 'Auditamos sistemas, datos y arquitectura actual. Identificamos riesgos y oportunidades.' },
      { step: '03', title: 'Diseño', description: 'Arquitectura técnica, UX/UI y plan de entrega incremental con prototipos validados.' },
      { step: '04', title: 'Desarrollo', description: 'Ingeniería con CI/CD, revisión de código y entregas continuas cada sprint.' },
      { step: '05', title: 'QA', description: 'Testing automatizado, performance, seguridad y accesibilidad en cada release.' },
      { step: '06', title: 'Implementación', description: 'Despliegue con contenedores, cero cortes de servicio y vuelta atrás segura.' },
      { step: '07', title: 'Soporte', description: 'Operación, evolución y SLA. Tu plataforma mejora de forma continua.' },
    ],
    benefits: [
      { title: 'Equipo senior, sin intermediarios', body: 'Trabajas directamente con arquitectos e ingenieros senior. Sin capas, sin ruido: decisiones rápidas y de calidad.' },
      { title: 'Entregas incrementales y predecibles', body: 'Cada sprint produce software funcional y desplegable. Visibilidad total del avance con métricas, demos y roadmap vivo.' },
      { title: 'Calidad de ingeniería como estándar', body: 'CI/CD, testing automatizado, revisión de código, seguridad y observabilidad vienen de serie. No son extras, son la base.' },
      { title: 'Tecnología elegida por sus méritos', body: 'Drupal, Next.js, Java o Python: usamos la herramienta correcta para cada problema, sin modas ni ataduras a un único proveedor.' },
      { title: 'Pensado para escalar', body: 'Arquitecturas desacopladas y preparadas para crecer en tráfico, equipo y funcionalidad sin reescrituras.' },
    ],
    testimonials: [
      { quote: 'ELEM transformó nuestro core legacy en una plataforma de microservicios sin un solo minuto de caída. Su nivel de ingeniería es excepcional.', name: 'María Sanz', role: 'CTO, Banco Atlas' },
      { quote: 'Pasamos de releases trimestrales a despliegues diarios. El equipo de ELEM elevó el estándar de todo nuestro departamento de tecnología.', name: 'Daniel Ortega', role: 'VP Engineering, RetailMax' },
      { quote: 'Necesitábamos un portal accesible para millones de ciudadanos. Lo entregaron con una calidad y rigor que no habíamos visto antes.', name: 'Lucía Fernández', role: 'Directora Digital, GovDigital' },
      { quote: 'Su dominio de Drupal y React es total. La integración con nuestro ERP fue impecable y la performance, sobresaliente.', name: 'Carlos Méndez', role: 'Head of IT, Industrias Vela' },
    ],
    sections: {
      hero: {
        titleLead: 'Construimos el',
        titleAccent: 'software',
        titleTail: 'que mueve empresas líderes',
        descLead: 'Diseñamos, desarrollamos y modernizamos plataformas digitales de alto rendimiento. Expertos en ',
        descStrong: 'Drupal, React, Java y PHP',
        descTail: ', integraciones empresariales y APIs a medida.',
        ctaPrimary: 'Iniciar proyecto',
        ctaSecondary: 'Ver casos de éxito',
        ratingClients: '140+ clientes',
        scroll: 'Scroll',
      },
      partners: { heading: 'Empresas líderes confían en ELEM' },
      technologies: {
        eyebrow: 'Tecnologías core',
        lead: 'Dominamos el stack que tu negocio',
        accent: 'necesita',
        description: 'Pocas tecnologías, una sola obsesión: construir software fiable, rápido y preparado para escalar.',
        toolsLabel: 'También trabajamos con',
        ctaKicker: '+ Entrega continua',
        ctaTitle: 'Contenedores y CI/CD para entregar con confianza',
        ctaCta: 'Ver servicios',
      },
      services: {
        eyebrow: 'Servicios',
        lead: 'De la idea a producción,',
        accent: 'sin fricción',
        description: 'Un único partner para todo el ciclo de vida de tu plataforma: estrategia, diseño, ingeniería y operación.',
        more: 'Saber más',
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
        eyebrow: 'Metodología',
        lead: 'Un proceso probado, de',
        accent: 'extremo a extremo',
        description: 'Siete fases que convierten la incertidumbre en software fiable, entregado de forma continua.',
      },
      benefits: {
        eyebrow: 'Por qué ELEM',
        lead: 'Ingeniería en la que',
        accent: 'puedes confiar',
        description: 'No vendemos horas. Entregamos resultados con un estándar de calidad que se nota desde el primer sprint.',
        stats: [
          { k: '100%', l: 'equipo senior' },
          { k: '0', l: 'intermediarios' },
          { k: '24h', l: 'tiempo de respuesta' },
          { k: '4', l: 'tecnologías núcleo' },
        ],
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
        badge: 'Hablemos',
        title: 'Convirtamos tu próximo reto en tu mayor ventaja competitiva',
        description: 'Agenda una sesión sin compromiso. Analizamos tu caso y te proponemos un plan concreto en menos de una semana.',
        primary: 'Iniciar proyecto',
        secondary: 'Agendar una llamada',
      },
    },
  },
  en: {
    partners,
    techCards: [
      { key: 'drupal', name: 'Drupal', href: '/tecnologias/drupal', tagline: 'Enterprise-grade CMS for content portals and platforms.', useCases: ['Corporate portals', 'Digital government', 'Multi-site'], accent: 'from-sky-500/20 to-rose-500/10' },
      { key: 'next', name: 'Next.js', href: '/tecnologias/nextjs', tagline: 'Modern React-based frontend: fast, accessible and SEO-friendly.', useCases: ['Web apps', 'High-performance sites', 'Design systems'], accent: 'from-cyan-400/20 to-fuchsia-500/10' },
      { key: 'java', name: 'Java + Spring Boot', href: '/tecnologias/java', tagline: 'Robust, scalable backend with Spring Boot.', useCases: ['APIs & microservices', 'Mission-critical systems', 'Event-driven'], accent: 'from-orange-500/20 to-rose-500/10' },
      { key: 'python', name: 'Python', href: '/tecnologias/python', tagline: 'APIs, data and automation; AI in production.', useCases: ['APIs with FastAPI', 'Data pipelines', 'Automation & AI'], accent: 'from-amber-400/20 to-sky-500/10' },
    ],
    tools: [
      { key: 'ddev', name: 'ddev' },
      { key: 'git', name: 'Git' },
      { key: 'docker', name: 'Docker' },
      { key: 'kubernetes', name: 'Kubernetes' },
    ],
    services: [
      { icon: 'Globe', title: 'Web development', description: 'Custom websites and web apps: fast, accessible and easy to maintain.', benefits: ['Web apps with Next.js', 'CMS with Drupal', 'Performance & SEO'], href: '/servicios' },
      { icon: 'Smartphone', title: 'Mobile apps', description: 'Cross-platform apps from a single codebase with a smooth experience.', benefits: ['iOS & Android', 'Cross-platform', 'API integration'], href: '/servicios' },
      { icon: 'Code2', title: 'Software development', description: 'Custom systems and robust backends with Java and Spring Boot.', benefits: ['APIs & microservices', 'Scalable architecture', 'Engineering quality'], href: '/servicios' },
      { icon: 'Workflow', title: 'Automation', description: 'We automate processes and integrate your systems to save time and errors.', benefits: ['Integrations', 'Automated workflows', 'System connectivity'], href: '/servicios' },
      {
        icon: 'Lightbulb',
        title: 'Consulting',
        description: 'Technical guidance for software design, architecture, and technology decision-making.',
        benefits: ['Software architecture', 'Technology stack', 'Best development practices'],
        href: '/servicios'
      }
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
      { step: '01', title: 'Discovery', description: 'We understand the business, users and constraints. We define measurable goals.' },
      { step: '02', title: 'Analysis', description: 'We audit current systems, data and architecture. We identify risks and opportunities.' },
      { step: '03', title: 'Design', description: 'Technical architecture, UX/UI and an incremental delivery plan with validated prototypes.' },
      { step: '04', title: 'Development', description: 'Engineering with CI/CD, code review and continuous delivery every sprint.' },
      { step: '05', title: 'QA', description: 'Automated testing, performance, security and accessibility on every release.' },
      { step: '06', title: 'Deployment', description: 'Container-based rollout with zero downtime and safe rollback.' },
      { step: '07', title: 'Support', description: 'Operation, evolution and SLA. Your platform keeps improving continuously.' },
    ],
    benefits: [
      { title: 'A senior team, no middlemen', body: 'You work directly with senior architects and engineers. No layers, no noise: fast, high-quality decisions.' },
      { title: 'Incremental, predictable delivery', body: 'Every sprint produces functional, deployable software. Full visibility of progress with metrics, demos and a living roadmap.' },
      { title: 'Engineering quality as standard', body: 'CI/CD, automated testing, code review, security and observability come built in. They are not extras — they are the foundation.' },
      { title: 'Technology chosen on its merits', body: 'Drupal, Next.js, Java or Python: we use the right tool for each problem, with no fads or single-vendor lock-in.' },
      { title: 'Built to scale', body: 'Decoupled architectures ready to grow in traffic, team and functionality without rewrites.' },
    ],
    testimonials: [
      { quote: 'ELEM turned our legacy core into a microservices platform without a single minute of downtime. Their engineering level is exceptional.', name: 'María Sanz', role: 'CTO, Banco Atlas' },
      { quote: 'We went from quarterly releases to daily deployments. The ELEM team raised the standard of our entire technology department.', name: 'Daniel Ortega', role: 'VP Engineering, RetailMax' },
      { quote: 'We needed an accessible portal for millions of citizens. They delivered it with a quality and rigor we had never seen before.', name: 'Lucía Fernández', role: 'Digital Director, GovDigital' },
      { quote: 'Their command of Drupal and React is total. The integration with our ERP was flawless and the performance outstanding.', name: 'Carlos Méndez', role: 'Head of IT, Industrias Vela' },
    ],
    sections: {
      hero: {
        titleLead: 'We build the',
        titleAccent: 'software',
        titleTail: 'that powers leading companies',
        descLead: 'We design, build and modernize high-performance digital platforms. Experts in ',
        descStrong: 'Drupal, React, Java and PHP',
        descTail: ', enterprise integrations and custom APIs.',
        ctaPrimary: 'Start a project',
        ctaSecondary: 'See case studies',
        ratingClients: '140+ clients',
        scroll: 'Scroll',
      },
      partners: { heading: 'Leading companies trust ELEM' },
      technologies: {
        eyebrow: 'Core technologies',
        lead: 'We master the stack your business',
        accent: 'needs',
        description: 'A few technologies, one obsession: building reliable, fast software ready to scale.',
        toolsLabel: 'We also work with',
        ctaKicker: '+ Continuous delivery',
        ctaTitle: 'Containers and CI/CD to ship with confidence',
        ctaCta: 'See services',
      },
      services: {
        eyebrow: 'Services',
        lead: 'From idea to production,',
        accent: 'frictionless',
        description: 'A single partner for your platform’s entire lifecycle: strategy, design, engineering and operations.',
        more: 'Learn more',
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
        eyebrow: 'Methodology',
        lead: 'A proven process, from',
        accent: 'end to end',
        description: 'Seven phases that turn uncertainty into reliable software, delivered continuously.',
      },
      benefits: {
        eyebrow: 'Why ELEM',
        lead: 'Engineering you can',
        accent: 'rely on',
        description: 'We don’t sell hours. We deliver results with a quality standard you notice from the very first sprint.',
        stats: [
          { k: '100%', l: 'senior team' },
          { k: '0', l: 'middlemen' },
          { k: '24h', l: 'response time' },
          { k: '4', l: 'core technologies' },
        ],
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
        badge: 'Let’s talk',
        title: 'Let’s turn your next challenge into your biggest competitive advantage',
        description: 'Book a no-commitment session. We analyze your case and propose a concrete plan in less than a week.',
        primary: 'Start a project',
        secondary: 'Schedule a call',
      },
    },
  },
};

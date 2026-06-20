import type { TechKey } from '@/components/visuals/tech-logos';
import type { Locale } from '@/i18n/config';
import { defaultLocale } from '@/i18n/config';

export type TechPage = {
  slug: string;
  key: TechKey;
  name: string;
  metaTitle: string;
  eyebrow: string;
  hero: { title: string; highlight: string; description: string };
  stats: { value: string; label: string }[];
  benefits: { icon: string; title: string; description: string }[];
  architecture: {
    title: string;
    description: string;
    layers: { name: string; items: string[] }[];
  };
  useCases: { title: string; description: string }[];
  integrations: string[];
  faqs: { q: string; a: string }[];
  related: TechKey[];
};

export const techPages: Record<Locale, Record<string, TechPage>> = {
  es: {
    drupal: {
      slug: 'drupal',
      key: 'drupal',
      name: 'Drupal',
      metaTitle: 'Desarrollo Drupal enterprise',
      eyebrow: 'Desarrollo Drupal',
      hero: {
        title: 'Portales de contenido',
        highlight: 'de nivel enterprise',
        description:
          'Construimos plataformas Drupal seguras, escalables y editables, listas para gobiernos, banca y grandes corporaciones. Headless o tradicional, siempre con estándares de ingeniería.',
      },
      stats: [
        { value: '10 / 11', label: 'versiones soportadas' },
        { value: 'AAA', label: 'accesibilidad objetivo' },
        { value: 'API-first', label: 'headless & JSON:API' },
        { value: 'ENS·GDPR', label: 'cumplimiento' },
      ],
      benefits: [
        { icon: 'ShieldCheck', title: 'Seguridad enterprise', description: 'Hardening, actualizaciones gestionadas y cumplimiento (ENS, GDPR). Drupal es el CMS preferido del sector público por su madurez en seguridad.' },
        { icon: 'Layers', title: 'Arquitectura multi-sitio', description: 'Un único core para decenas de portales con gobierno editorial, marcas y permisos diferenciados.' },
        { icon: 'Code2', title: 'Headless / decoupled', description: 'API-first con JSON:API y GraphQL para alimentar frontends Next.js, apps móviles y kioscos desde una sola fuente.' },
        { icon: 'Workflow', title: 'Editorial avanzado', description: 'Flujos de publicación, previsualización, traducción y versionado que empoderan a equipos de contenido no técnicos.' },
      ],
      architecture: {
        title: 'Una arquitectura Drupal pensada para escalar',
        description: 'Separamos presentación, contenido y servicios para que cada capa evolucione sin frenar a las demás.',
        layers: [
          { name: 'Presentación', items: ['Next.js', 'Twig', 'Design System'] },
          { name: 'API', items: ['JSON:API', 'GraphQL', 'Webhooks'] },
          { name: 'Core Drupal', items: ['PHP 8.3 · Symfony', 'Entidades', 'Workflows', 'Permisos'] },
          { name: 'Infraestructura', items: ['Docker', 'Kubernetes', 'CDN'] },
        ],
      },
      useCases: [
        { title: 'Portales gubernamentales', description: 'Sedes electrónicas accesibles para millones de ciudadanos.' },
        { title: 'Medios y editoriales', description: 'Gestión de contenido a gran escala con alto tráfico.' },
        { title: 'Intranets corporativas', description: 'Conocimiento interno, búsqueda y permisos granulares.' },
        { title: 'Multi-marca', description: 'Decenas de sitios gestionados desde un único core.' },
      ],
      integrations: ['PHP 8.3', 'Symfony', 'Next.js', 'GraphQL', 'Docker', 'PostgreSQL'],
      faqs: [
        { q: '¿Drupal sigue siendo relevante en 2025?', a: 'Más que nunca. Está construido sobre PHP 8.3 moderno y componentes de Symfony, y con Drupal 10/11 y su enfoque API-first es la base de portales de alto tráfico, banca y administración pública por su seguridad y flexibilidad headless.' },
        { q: '¿Pueden migrar mi Drupal 7 antiguo?', a: 'Sí. Diseñamos migraciones incrementales a Drupal 10/11 preservando contenido, SEO y URLs, con cero pérdida de datos.' },
        { q: '¿Drupal headless con Next.js?', a: 'Es nuestra arquitectura recomendada para experiencias premium: Drupal como fuente de contenido y Next.js para el frontend.' },
        { q: '¿Qué nivel de accesibilidad alcanzan?', a: 'Entregamos sitios conformes con WCAG 2.1 AA/AAA, auditados con herramientas automáticas y testing manual.' },
      ],
      related: ['next', 'python', 'docker'],
    },
    nextjs: {
      slug: 'nextjs',
      key: 'next',
      name: 'Next.js',
      metaTitle: 'Desarrollo frontend con Next.js',
      eyebrow: 'Desarrollo Frontend',
      hero: {
        title: 'Interfaces que se sienten',
        highlight: 'instantáneas',
        description:
          'Diseñamos y construimos frontends con Next.js y React: design systems, dashboards y apps SaaS con performance impecable, SSR y accesibilidad de serie.',
      },
      stats: [
        { value: 'SSR/SSG', label: 'render híbrido' },
        { value: '<1s', label: 'objetivo de LCP' },
        { value: '100', label: 'meta Lighthouse' },
        { value: 'AA', label: 'accesibilidad' },
      ],
      benefits: [
        { icon: 'Rocket', title: 'Rendimiento extremo', description: 'SSR/SSG y App Router, code-splitting y optimización de Core Web Vitals para cargas casi instantáneas.' },
        { icon: 'Layers', title: 'Design systems', description: 'Bibliotecas de componentes consistentes, documentadas y reutilizables que aceleran a todo tu equipo.' },
        { icon: 'ShieldCheck', title: 'Accesibilidad real', description: 'Componentes accesibles por defecto (teclado, lectores de pantalla, contraste) conforme a WCAG.' },
        { icon: 'GitMerge', title: 'Mantenibilidad', description: 'TypeScript estricto, testing y arquitectura modular para que el código escale con el equipo.' },
      ],
      architecture: {
        title: 'Frontend moderno, construido para durar',
        description: 'Una base sólida con Next.js, TypeScript y un design system que hace que añadir features sea rápido y seguro.',
        layers: [
          { name: 'App', items: ['Next.js 15', 'React 19', 'Server Components'] },
          { name: 'UI', items: ['Design System', 'Tailwind', 'Framer Motion'] },
          { name: 'Estado & Datos', items: ['TanStack Query', 'Server Actions', 'GraphQL'] },
          { name: 'Calidad', items: ['TypeScript', 'Testing', 'CI/CD'] },
        ],
      },
      useCases: [
        { title: 'Dashboards de datos', description: 'Visualizaciones complejas, fluidas y en tiempo real.' },
        { title: 'Productos SaaS', description: 'Aplicaciones web ricas, multi-tenant y escalables.' },
        { title: 'Design systems', description: 'Una única fuente de verdad visual para toda la organización.' },
        { title: 'Webs de alto tráfico', description: 'Marketing y e-commerce con SEO y performance de primer nivel.' },
      ],
      integrations: ['React', 'TypeScript', 'GraphQL', 'Drupal', 'Tailwind', 'Vercel'],
      faqs: [
        { q: '¿Por qué Next.js y no React a secas?', a: 'Next.js aporta SSR/SSG, App Router, Server Components y optimización integrada. Para apps internas sin SEO valoramos también SPA puras con React + Vite.' },
        { q: '¿Pueden integrar con nuestro backend existente?', a: 'Sí, consumimos cualquier API REST, GraphQL o gRPC, y construimos capas BFF con Server Actions cuando conviene.' },
        { q: '¿Cómo garantizan la performance?', a: 'Presupuestos de performance, monitorización de Core Web Vitals y optimización continua de imágenes, fuentes y JavaScript.' },
        { q: '¿Entregáis un design system?', a: 'Podemos construir uno a medida o partir de uno existente, documentado y listo para escalar.' },
      ],
      related: ['drupal', 'java', 'git'],
    },
    java: {
      slug: 'java',
      key: 'java',
      name: 'Java',
      metaTitle: 'Backend Java con Spring Boot',
      eyebrow: 'Backend Java',
      hero: {
        title: 'Backends de misión crítica',
        highlight: 'que nunca fallan',
        description:
          'Sistemas Java con Spring Boot, resilientes, observables y orientados a eventos. La base de banca, seguros e industria que no se puede permitir caídas.',
      },
      stats: [
        { value: 'Spring', label: 'Boot · Cloud' },
        { value: '99.9%', label: 'objetivo de uptime' },
        { value: '<100ms', label: 'objetivo p99' },
        { value: 'JVM', label: 'stack probado' },
      ],
      benefits: [
        { icon: 'ShieldCheck', title: 'Alta disponibilidad', description: 'Arquitecturas tolerantes a fallos con circuit breakers, retries y despliegues sin downtime.' },
        { icon: 'Rocket', title: 'Rendimiento a escala', description: 'JVM optimizada, caching distribuido y procesamiento asíncrono para picos de tráfico extremos.' },
        { icon: 'Workflow', title: 'Event-driven', description: 'Kafka y mensajería para sistemas desacoplados, auditables y reactivos.' },
        { icon: 'Layers', title: 'Spring ecosystem', description: 'Spring Boot, Security, Data y Cloud para acelerar sin sacrificar control.' },
      ],
      architecture: {
        title: 'Microservicios Java resilientes y observables',
        description: 'Dominio bien delimitado, comunicación asíncrona y observabilidad de extremo a extremo.',
        layers: [
          { name: 'API Gateway', items: ['Spring Cloud Gateway', 'Rate limiting', 'Auth'] },
          { name: 'Servicios', items: ['Spring Boot', 'Domain-Driven', 'REST / gRPC'] },
          { name: 'Mensajería', items: ['Kafka', 'Eventos', 'Sagas'] },
          { name: 'Datos & Ops', items: ['PostgreSQL', 'Redis', 'Observabilidad'] },
        ],
      },
      useCases: [
        { title: 'Core bancario', description: 'Transacciones seguras, auditables y de baja latencia.' },
        { title: 'APIs de alto tráfico', description: 'Servicios que soportan millones de peticiones diarias.' },
        { title: 'Sistemas de seguros', description: 'Motores de reglas y procesamiento batch a gran escala.' },
        { title: 'Plataformas industriales', description: 'Integración con sistemas IoT y de producción.' },
      ],
      integrations: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Kubernetes', 'Docker', 'Redis'],
      faqs: [
        { q: '¿Spring Boot o Quarkus?', a: 'Spring Boot por defecto por su madurez y ecosistema; Quarkus cuando el arranque rápido y el footprint nativo son críticos (serverless, edge).' },
        { q: '¿Pueden migrar un monolito Java?', a: 'Sí, aplicamos el patrón strangler para extraer microservicios de forma incremental sin parar el negocio.' },
        { q: '¿Cómo aseguran la observabilidad?', a: 'Tracing distribuido (OpenTelemetry), métricas (Prometheus) y logs estructurados, con dashboards y alertas.' },
        { q: '¿Soportáis event sourcing?', a: 'Sí, diseñamos arquitecturas event-driven con Kafka, CQRS y event sourcing cuando aportan valor.' },
      ],
      related: ['python', 'kubernetes', 'docker'],
    },
    python: {
      slug: 'python',
      key: 'python',
      name: 'Python',
      metaTitle: 'Desarrollo backend, datos y automatización con Python',
      eyebrow: 'Backend & Datos',
      hero: {
        title: 'APIs, datos y automatización',
        highlight: 'con Python',
        description:
          'Construimos APIs rápidas con FastAPI y Django, pipelines de datos y automatizaciones a medida. Python es nuestra herramienta para mover datos, integrar sistemas y poner IA en producción.',
      },
      stats: [
        { value: 'FastAPI', label: 'APIs async' },
        { value: '90%+', label: 'objetivo de cobertura' },
        { value: 'ETL·IA', label: 'datos y modelos' },
        { value: 'MLOps', label: 'IA en producción' },
      ],
      benefits: [
        { icon: 'Rocket', title: 'APIs veloces', description: 'FastAPI con tipado, validación con Pydantic y async para servicios de baja latencia listos para escalar.' },
        { icon: 'Database', title: 'Datos e integración', description: 'Pipelines ETL/ELT, orquestación con Airflow y conectores a tus ERP, CRM y data warehouse.' },
        { icon: 'Workflow', title: 'Automatización', description: 'Scripts y servicios que eliminan trabajo manual: informes, scraping, sincronizaciones y tareas programadas.' },
        { icon: 'Cpu', title: 'IA en producción', description: 'Integramos modelos y LLMs con buenas prácticas de MLOps: reproducibilidad, evaluación y monitorización.' },
      ],
      architecture: {
        title: 'Python orientado a servicios y a datos',
        description: 'Código tipado, testeable y desplegable, con una separación clara entre API, dominio y procesamiento de datos.',
        layers: [
          { name: 'API', items: ['FastAPI', 'Django REST', 'Pydantic'] },
          { name: 'Dominio', items: ['Casos de uso', 'Servicios', 'Tipado estricto'] },
          { name: 'Datos', items: ['Pandas / Polars', 'Airflow', 'PostgreSQL'] },
          { name: 'IA & Ops', items: ['LLMs', 'MLOps', 'Docker'] },
        ],
      },
      useCases: [
        { title: 'APIs de negocio', description: 'Backends ligeros y rápidos para web y móvil.' },
        { title: 'Pipelines de datos', description: 'Ingesta, transformación y carga a gran escala.' },
        { title: 'Automatización de procesos', description: 'Integraciones y tareas que ahorran horas de trabajo manual.' },
        { title: 'IA & machine learning', description: 'Modelos y LLMs integrados en tus productos.' },
      ],
      integrations: ['FastAPI', 'Django', 'PostgreSQL', 'Airflow', 'Pandas', 'Docker'],
      faqs: [
        { q: '¿FastAPI o Django?', a: 'FastAPI para microservicios y APIs async de alto rendimiento; Django cuando necesitas un framework completo con ORM, admin y baterías incluidas. Elegimos según tu caso.' },
        { q: '¿Para qué usáis Python además de backend?', a: 'Para datos (ETL, análisis), automatización de procesos, scripting de infraestructura e integración de modelos de IA y LLMs en producción.' },
        { q: '¿Cómo aseguráis la calidad?', a: 'Tipado con mypy, tests con pytest, linting con ruff y CI que bloquea regresiones en cada cambio.' },
        { q: '¿Podéis poner un modelo de IA en producción?', a: 'Sí, con prácticas de MLOps: empaquetado, evaluación, despliegue en contenedores y monitorización del rendimiento del modelo.' },
      ],
      related: ['java', 'docker', 'git'],
    },
  },
  en: {
    drupal: {
      slug: 'drupal',
      key: 'drupal',
      name: 'Drupal',
      metaTitle: 'Enterprise Drupal development',
      eyebrow: 'Drupal Development',
      hero: {
        title: 'Content portals',
        highlight: 'at enterprise scale',
        description:
          'We build secure, scalable and editable Drupal platforms, ready for governments, banking and large corporations. Headless or traditional, always to engineering standards.',
      },
      stats: [
        { value: '10 / 11', label: 'supported versions' },
        { value: 'AAA', label: 'accessibility target' },
        { value: 'API-first', label: 'headless & JSON:API' },
        { value: 'ENS·GDPR', label: 'compliance' },
      ],
      benefits: [
        { icon: 'ShieldCheck', title: 'Enterprise security', description: 'Hardening, managed updates and compliance (ENS, GDPR). Drupal is the public sector’s CMS of choice for its security maturity.' },
        { icon: 'Layers', title: 'Multi-site architecture', description: 'A single core for dozens of portals with distinct editorial governance, brands and permissions.' },
        { icon: 'Code2', title: 'Headless / decoupled', description: 'API-first with JSON:API and GraphQL to feed Next.js frontends, mobile apps and kiosks from a single source.' },
        { icon: 'Workflow', title: 'Advanced editorial', description: 'Publishing, preview, translation and versioning workflows that empower non-technical content teams.' },
      ],
      architecture: {
        title: 'A Drupal architecture built to scale',
        description: 'We separate presentation, content and services so each layer can evolve without holding the others back.',
        layers: [
          { name: 'Presentation', items: ['Next.js', 'Twig', 'Design System'] },
          { name: 'API', items: ['JSON:API', 'GraphQL', 'Webhooks'] },
          { name: 'Drupal Core', items: ['PHP 8.3 · Symfony', 'Entities', 'Workflows', 'Permissions'] },
          { name: 'Infrastructure', items: ['Docker', 'Kubernetes', 'CDN'] },
        ],
      },
      useCases: [
        { title: 'Government portals', description: 'Accessible e-government sites for millions of citizens.' },
        { title: 'Media and publishing', description: 'Large-scale content management with high traffic.' },
        { title: 'Corporate intranets', description: 'Internal knowledge, search and granular permissions.' },
        { title: 'Multi-brand', description: 'Dozens of sites managed from a single core.' },
      ],
      integrations: ['PHP 8.3', 'Symfony', 'Next.js', 'GraphQL', 'Docker', 'PostgreSQL'],
      faqs: [
        { q: 'Is Drupal still relevant in 2025?', a: 'More than ever. It is built on modern PHP 8.3 and Symfony components, and with Drupal 10/11 and its API-first approach it powers high-traffic, banking and public-administration portals thanks to its security and headless flexibility.' },
        { q: 'Can you migrate my old Drupal 7?', a: 'Yes. We design incremental migrations to Drupal 10/11 preserving content, SEO and URLs, with zero data loss.' },
        { q: 'Headless Drupal with Next.js?', a: 'It is our recommended architecture for premium experiences: Drupal as the content source and Next.js for the frontend.' },
        { q: 'What accessibility level do you reach?', a: 'We deliver sites compliant with WCAG 2.1 AA/AAA, audited with automated tools and manual testing.' },
      ],
      related: ['next', 'python', 'docker'],
    },
    nextjs: {
      slug: 'nextjs',
      key: 'next',
      name: 'Next.js',
      metaTitle: 'Frontend development with Next.js',
      eyebrow: 'Frontend Development',
      hero: {
        title: 'Interfaces that feel',
        highlight: 'instant',
        description:
          'We design and build frontends with Next.js and React: design systems, dashboards and SaaS apps with flawless performance, SSR and built-in accessibility.',
      },
      stats: [
        { value: 'SSR/SSG', label: 'hybrid rendering' },
        { value: '<1s', label: 'LCP target' },
        { value: '100', label: 'Lighthouse goal' },
        { value: 'AA', label: 'accessibility' },
      ],
      benefits: [
        { icon: 'Rocket', title: 'Extreme performance', description: 'SSR/SSG and App Router, code-splitting and Core Web Vitals optimization for near-instant loads.' },
        { icon: 'Layers', title: 'Design systems', description: 'Consistent, documented and reusable component libraries that speed up your entire team.' },
        { icon: 'ShieldCheck', title: 'Real accessibility', description: 'Components accessible by default (keyboard, screen readers, contrast) compliant with WCAG.' },
        { icon: 'GitMerge', title: 'Maintainability', description: 'Strict TypeScript, testing and modular architecture so the code scales with the team.' },
      ],
      architecture: {
        title: 'A modern frontend, built to last',
        description: 'A solid foundation with Next.js, TypeScript and a design system that makes adding features fast and safe.',
        layers: [
          { name: 'App', items: ['Next.js 15', 'React 19', 'Server Components'] },
          { name: 'UI', items: ['Design System', 'Tailwind', 'Framer Motion'] },
          { name: 'State & Data', items: ['TanStack Query', 'Server Actions', 'GraphQL'] },
          { name: 'Quality', items: ['TypeScript', 'Testing', 'CI/CD'] },
        ],
      },
      useCases: [
        { title: 'Data dashboards', description: 'Complex, fluid, real-time visualizations.' },
        { title: 'SaaS products', description: 'Rich, multi-tenant and scalable web applications.' },
        { title: 'Design systems', description: 'A single visual source of truth for the whole organization.' },
        { title: 'High-traffic sites', description: 'Marketing and e-commerce with top-tier SEO and performance.' },
      ],
      integrations: ['React', 'TypeScript', 'GraphQL', 'Drupal', 'Tailwind', 'Vercel'],
      faqs: [
        { q: 'Why Next.js and not plain React?', a: 'Next.js brings SSR/SSG, App Router, Server Components and built-in optimization. For internal apps without SEO we also consider pure SPAs with React + Vite.' },
        { q: 'Can you integrate with our existing backend?', a: 'Yes, we consume any REST, GraphQL or gRPC API, and build BFF layers with Server Actions when it makes sense.' },
        { q: 'How do you guarantee performance?', a: 'Performance budgets, Core Web Vitals monitoring and continuous optimization of images, fonts and JavaScript.' },
        { q: 'Do you deliver a design system?', a: 'We can build one from scratch or start from an existing one, documented and ready to scale.' },
      ],
      related: ['drupal', 'java', 'git'],
    },
    java: {
      slug: 'java',
      key: 'java',
      name: 'Java',
      metaTitle: 'Java backend with Spring Boot',
      eyebrow: 'Java Backend',
      hero: {
        title: 'Mission-critical backends',
        highlight: 'that never fail',
        description:
          'Java systems with Spring Boot, resilient, observable and event-driven. The foundation for banking, insurance and industry that cannot afford downtime.',
      },
      stats: [
        { value: 'Spring', label: 'Boot · Cloud' },
        { value: '99.9%', label: 'uptime target' },
        { value: '<100ms', label: 'p99 target' },
        { value: 'JVM', label: 'battle-tested stack' },
      ],
      benefits: [
        { icon: 'ShieldCheck', title: 'High availability', description: 'Fault-tolerant architectures with circuit breakers, retries and zero-downtime deployments.' },
        { icon: 'Rocket', title: 'Performance at scale', description: 'Optimized JVM, distributed caching and asynchronous processing for extreme traffic peaks.' },
        { icon: 'Workflow', title: 'Event-driven', description: 'Kafka and messaging for decoupled, auditable and reactive systems.' },
        { icon: 'Layers', title: 'Spring ecosystem', description: 'Spring Boot, Security, Data and Cloud to move fast without sacrificing control.' },
      ],
      architecture: {
        title: 'Resilient and observable Java microservices',
        description: 'Well-bounded domains, asynchronous communication and end-to-end observability.',
        layers: [
          { name: 'API Gateway', items: ['Spring Cloud Gateway', 'Rate limiting', 'Auth'] },
          { name: 'Services', items: ['Spring Boot', 'Domain-Driven', 'REST / gRPC'] },
          { name: 'Messaging', items: ['Kafka', 'Events', 'Sagas'] },
          { name: 'Data & Ops', items: ['PostgreSQL', 'Redis', 'Observability'] },
        ],
      },
      useCases: [
        { title: 'Banking core', description: 'Secure, auditable and low-latency transactions.' },
        { title: 'High-traffic APIs', description: 'Services that handle millions of requests per day.' },
        { title: 'Insurance systems', description: 'Rule engines and large-scale batch processing.' },
        { title: 'Industrial platforms', description: 'Integration with IoT and production systems.' },
      ],
      integrations: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Kubernetes', 'Docker', 'Redis'],
      faqs: [
        { q: 'Spring Boot or Quarkus?', a: 'Spring Boot by default for its maturity and ecosystem; Quarkus when fast startup and native footprint are critical (serverless, edge).' },
        { q: 'Can you migrate a Java monolith?', a: 'Yes, we apply the strangler pattern to extract microservices incrementally without stopping the business.' },
        { q: 'How do you ensure observability?', a: 'Distributed tracing (OpenTelemetry), metrics (Prometheus) and structured logs, with dashboards and alerts.' },
        { q: 'Do you support event sourcing?', a: 'Yes, we design event-driven architectures with Kafka, CQRS and event sourcing when they add value.' },
      ],
      related: ['python', 'kubernetes', 'docker'],
    },
    python: {
      slug: 'python',
      key: 'python',
      name: 'Python',
      metaTitle: 'Backend, data and automation with Python',
      eyebrow: 'Backend & Data',
      hero: {
        title: 'APIs, data and automation',
        highlight: 'with Python',
        description:
          'We build fast APIs with FastAPI and Django, data pipelines and custom automation. Python is our tool to move data, integrate systems and put AI into production.',
      },
      stats: [
        { value: 'FastAPI', label: 'async APIs' },
        { value: '90%+', label: 'coverage target' },
        { value: 'ETL·AI', label: 'data & models' },
        { value: 'MLOps', label: 'AI to production' },
      ],
      benefits: [
        { icon: 'Rocket', title: 'Fast APIs', description: 'FastAPI with typing, Pydantic validation and async for low-latency services ready to scale.' },
        { icon: 'Database', title: 'Data & integration', description: 'ETL/ELT pipelines, orchestration with Airflow and connectors to your ERP, CRM and data warehouse.' },
        { icon: 'Workflow', title: 'Automation', description: 'Scripts and services that remove manual work: reports, scraping, syncs and scheduled tasks.' },
        { icon: 'Cpu', title: 'AI in production', description: 'We integrate models and LLMs with solid MLOps practices: reproducibility, evaluation and monitoring.' },
      ],
      architecture: {
        title: 'Python oriented to services and data',
        description: 'Typed, testable and deployable code, with a clear separation between API, domain and data processing.',
        layers: [
          { name: 'API', items: ['FastAPI', 'Django REST', 'Pydantic'] },
          { name: 'Domain', items: ['Use cases', 'Services', 'Strict typing'] },
          { name: 'Data', items: ['Pandas / Polars', 'Airflow', 'PostgreSQL'] },
          { name: 'AI & Ops', items: ['LLMs', 'MLOps', 'Docker'] },
        ],
      },
      useCases: [
        { title: 'Business APIs', description: 'Lightweight, fast backends for web and mobile.' },
        { title: 'Data pipelines', description: 'Large-scale ingestion, transformation and loading.' },
        { title: 'Process automation', description: 'Integrations and tasks that save hours of manual work.' },
        { title: 'AI & machine learning', description: 'Models and LLMs embedded in your products.' },
      ],
      integrations: ['FastAPI', 'Django', 'PostgreSQL', 'Airflow', 'Pandas', 'Docker'],
      faqs: [
        { q: 'FastAPI or Django?', a: 'FastAPI for microservices and high-performance async APIs; Django when you need a full framework with ORM, admin and batteries included. We choose based on your case.' },
        { q: 'What do you use Python for besides backend?', a: 'For data (ETL, analytics), process automation, infrastructure scripting and integrating AI models and LLMs into production.' },
        { q: 'How do you ensure quality?', a: 'Typing with mypy, tests with pytest, linting with ruff and CI that blocks regressions on every change.' },
        { q: 'Can you put an AI model into production?', a: 'Yes, with MLOps practices: packaging, evaluation, container deployment and monitoring of model performance.' },
      ],
      related: ['java', 'docker', 'git'],
    },
  },
};

export const techSlugs = Object.keys(techPages[defaultLocale]);

export function getTechPage(slug: string, locale: Locale) {
  return techPages[locale][slug];
}

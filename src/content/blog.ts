import type { Locale } from '@/i18n/config';
import { defaultLocale } from '@/i18n/config';

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  accent: string;
  featured?: boolean;
  body: { heading?: string; paragraphs: string[] }[];
};

export const posts: Record<Locale, Post[]> = {
  es: [
    {
      slug: 'drupal-headless-react',
      title: 'Drupal headless con React: la mejor de dos mundos',
      excerpt:
        'Cómo combinar la potencia editorial de Drupal con la velocidad de React para construir experiencias digitales premium.',
      category: 'Arquitectura',
      author: 'Equipo ELEM',
      date: '2026-05-28',
      readingTime: '7 min',
      accent: 'from-sky-500 to-rose-500',
      featured: true,
      body: [
        {
          paragraphs: [
            'Durante años, la elección entre un CMS robusto y un frontend moderno fue un compromiso. Drupal headless rompe esa falsa dicotomía: el contenido vive en Drupal, la experiencia la entrega React.',
            'En este artículo desgranamos la arquitectura que usamos en proyectos de alto tráfico, desde la capa JSON:API hasta el renderizado en Next.js.',
          ],
        },
        {
          heading: 'Por qué desacoplar',
          paragraphs: [
            'Desacoplar presentación y contenido permite que cada capa evolucione a su ritmo. Los editores mantienen flujos conocidos; los desarrolladores frontend trabajan con las herramientas que mejor conocen.',
            'Además, una única fuente de contenido puede alimentar web, app móvil y kioscos sin duplicar esfuerzos.',
          ],
        },
        {
          heading: 'Rendimiento sin concesiones',
          paragraphs: [
            'Con SSG e ISR en Next.js servimos páginas casi instantáneas, mientras Drupal sigue siendo la fuente de verdad. El resultado: LCP por debajo del segundo incluso con catálogos enormes.',
          ],
        },
      ],
    },
    {
      slug: 'microservicios-java-strangler',
      title: 'Del monolito a microservicios sin parar el negocio',
      excerpt:
        'El patrón strangler explicado con un caso real de migración de un core bancario en Java a una arquitectura event-driven.',
      category: 'Backend',
      author: 'Equipo ELEM',
      date: '2026-05-12',
      readingTime: '9 min',
      accent: 'from-orange-500 to-rose-600',
      featured: true,
      body: [
        {
          paragraphs: [
            'Reescribir un sistema crítico de golpe es la receta del desastre. El patrón strangler propone lo contrario: extraer capacidades de forma incremental hasta que el monolito deja de ser necesario.',
          ],
        },
        {
          heading: 'Empezar por los bordes',
          paragraphs: [
            'Identificamos los dominios con menos acoplamiento y mayor valor, y los extraemos primero. Cada microservicio se despliega de forma independiente, con su propio ciclo de vida.',
          ],
        },
        {
          heading: 'Eventos como columna vertebral',
          paragraphs: [
            'Kafka actúa como sistema nervioso: los servicios se comunican de forma asíncrona, lo que reduce el acoplamiento y habilita auditoría y resiliencia.',
          ],
        },
      ],
    },
    {
      slug: 'core-web-vitals-react',
      title: 'Core Web Vitals: cómo logramos un LCP de 0,8s',
      excerpt:
        'Técnicas concretas de optimización en React y Next.js para alcanzar puntuaciones de Lighthouse cercanas a 100.',
      category: 'Performance',
      author: 'Equipo ELEM',
      date: '2026-04-30',
      readingTime: '6 min',
      accent: 'from-cyan-500 to-fuchsia-500',
      body: [
        {
          paragraphs: [
            'La performance no es un extra: es parte de la experiencia y del SEO. Repasamos las palancas que más impacto tienen en Core Web Vitals.',
          ],
        },
        {
          heading: 'Imágenes y fuentes primero',
          paragraphs: [
            'Formatos modernos, dimensiones explícitas y carga prioritaria del LCP. Las fuentes, con display swap y subsetting.',
          ],
        },
      ],
    },
    {
      slug: 'apis-first-contratos',
      title: 'API-first: diseñar el contrato antes que el código',
      excerpt:
        'Por qué definir tus APIs con OpenAPI antes de implementarlas acelera a todo el equipo y reduce errores.',
      category: 'APIs',
      author: 'Equipo ELEM',
      date: '2026-04-15',
      readingTime: '5 min',
      accent: 'from-rose-500 to-purple-600',
      body: [
        {
          paragraphs: [
            'Cuando el contrato de la API se define primero, frontend y backend pueden trabajar en paralelo contra la misma especificación.',
          ],
        },
      ],
    },
    {
      slug: 'node-realtime-escala',
      title: 'Realtime a escala con Node.js y WebSockets',
      excerpt:
        'Cómo sostener millones de conexiones simultáneas con un escalado horizontal y backpressure bien diseñado.',
      category: 'Backend',
      author: 'Equipo ELEM',
      date: '2026-03-29',
      readingTime: '8 min',
      accent: 'from-emerald-500 to-rose-500',
      body: [
        {
          paragraphs: [
            'El tiempo real cambia las reglas. Repasamos la arquitectura que usamos para chat, dashboards en vivo y streaming de eventos.',
          ],
        },
      ],
    },
    {
      slug: 'modernizar-php-legacy',
      title: 'Modernizar PHP legacy sin reescribirlo todo',
      excerpt:
        'Una hoja de ruta práctica para llevar código PHP heredado a una arquitectura limpia y versiones modernas.',
      category: 'Backend',
      author: 'Equipo ELEM',
      date: '2026-03-10',
      readingTime: '7 min',
      accent: 'from-indigo-500 to-rose-500',
      body: [
        {
          paragraphs: [
            'El PHP de hace una década no tiene por qué ser un lastre. Con disciplina y las herramientas adecuadas, se moderniza de forma segura.',
          ],
        },
      ],
    },
  ],
  en: [
    {
      slug: 'drupal-headless-react',
      title: 'Headless Drupal with React: the best of both worlds',
      excerpt:
        'How to combine Drupal’s editorial power with React’s speed to build premium digital experiences.',
      category: 'Architecture',
      author: 'ELEM Team',
      date: '2026-05-28',
      readingTime: '7 min',
      accent: 'from-sky-500 to-rose-500',
      featured: true,
      body: [
        {
          paragraphs: [
            'For years, the choice between a robust CMS and a modern frontend was a compromise. Headless Drupal breaks that false dichotomy: content lives in Drupal, the experience is delivered by React.',
            'In this article we break down the architecture we use on high-traffic projects, from the JSON:API layer to rendering in Next.js.',
          ],
        },
        {
          heading: 'Why decouple',
          paragraphs: [
            'Decoupling presentation and content lets each layer evolve at its own pace. Editors keep familiar workflows; frontend developers work with the tools they know best.',
            'On top of that, a single content source can feed web, mobile app and kiosks without duplicating effort.',
          ],
        },
        {
          heading: 'Performance with no compromises',
          paragraphs: [
            'With SSG and ISR in Next.js we serve near-instant pages while Drupal remains the source of truth. The result: sub-second LCP even with huge catalogs.',
          ],
        },
      ],
    },
    {
      slug: 'microservicios-java-strangler',
      title: 'From monolith to microservices without stopping the business',
      excerpt:
        'The strangler pattern explained with a real case of migrating a Java banking core to an event-driven architecture.',
      category: 'Backend',
      author: 'ELEM Team',
      date: '2026-05-12',
      readingTime: '9 min',
      accent: 'from-orange-500 to-rose-600',
      featured: true,
      body: [
        {
          paragraphs: [
            'Rewriting a critical system all at once is a recipe for disaster. The strangler pattern proposes the opposite: extract capabilities incrementally until the monolith is no longer needed.',
          ],
        },
        {
          heading: 'Start at the edges',
          paragraphs: [
            'We identify the domains with the least coupling and the most value, and extract them first. Each microservice deploys independently, with its own lifecycle.',
          ],
        },
        {
          heading: 'Events as the backbone',
          paragraphs: [
            'Kafka acts as the nervous system: services communicate asynchronously, which reduces coupling and enables auditing and resilience.',
          ],
        },
      ],
    },
    {
      slug: 'core-web-vitals-react',
      title: 'Core Web Vitals: how we achieved a 0.8s LCP',
      excerpt:
        'Concrete optimization techniques in React and Next.js to reach Lighthouse scores close to 100.',
      category: 'Performance',
      author: 'ELEM Team',
      date: '2026-04-30',
      readingTime: '6 min',
      accent: 'from-cyan-500 to-fuchsia-500',
      body: [
        {
          paragraphs: [
            'Performance is not an extra: it is part of the experience and of SEO. We review the levers with the most impact on Core Web Vitals.',
          ],
        },
        {
          heading: 'Images and fonts first',
          paragraphs: [
            'Modern formats, explicit dimensions and priority loading of the LCP. Fonts, with display swap and subsetting.',
          ],
        },
      ],
    },
    {
      slug: 'apis-first-contratos',
      title: 'API-first: design the contract before the code',
      excerpt:
        'Why defining your APIs with OpenAPI before implementing them speeds up the whole team and reduces errors.',
      category: 'APIs',
      author: 'ELEM Team',
      date: '2026-04-15',
      readingTime: '5 min',
      accent: 'from-rose-500 to-purple-600',
      body: [
        {
          paragraphs: [
            'When the API contract is defined first, frontend and backend can work in parallel against the same specification.',
          ],
        },
      ],
    },
    {
      slug: 'node-realtime-escala',
      title: 'Realtime at scale with Node.js and WebSockets',
      excerpt:
        'How to sustain millions of simultaneous connections with horizontal scaling and well-designed backpressure.',
      category: 'Backend',
      author: 'ELEM Team',
      date: '2026-03-29',
      readingTime: '8 min',
      accent: 'from-emerald-500 to-rose-500',
      body: [
        {
          paragraphs: [
            'Realtime changes the rules. We review the architecture we use for chat, live dashboards and event streaming.',
          ],
        },
      ],
    },
    {
      slug: 'modernizar-php-legacy',
      title: 'Modernize legacy PHP without rewriting everything',
      excerpt:
        'A practical roadmap to bring inherited PHP code to a clean architecture and modern versions.',
      category: 'Backend',
      author: 'ELEM Team',
      date: '2026-03-10',
      readingTime: '7 min',
      accent: 'from-indigo-500 to-rose-500',
      body: [
        {
          paragraphs: [
            'Decade-old PHP doesn’t have to be a burden. With discipline and the right tools, it can be modernized safely.',
          ],
        },
      ],
    },
  ],
};

/** Slugs are shared across locales — use the default locale as the source. */
export const postSlugs = posts[defaultLocale].map((p) => p.slug);

export function getPost(slug: string, locale: Locale) {
  return posts[locale].find((p) => p.slug === slug);
}

export function formatDate(iso: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

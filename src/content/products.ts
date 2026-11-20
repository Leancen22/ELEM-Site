import type { Locale } from '@/i18n/config';

/*
 * Páginas de producto (ELEM Core y ELEM One). Los planes y sus precios de referencia son los mismos que vienen
 * cargados en cada producto (Core: Plataforma → Planes; One: panel de plataforma → Planes). Si cambian allá,
 * hay que cambiarlos acá.
 */

export type ProductId = 'core' | 'one';

export type Shot = { src: string; alt: string; width: number; height: number };

export type Feature = { title: string; body: string; points: string[]; image: Shot };

export type Plan = {
  name: string;
  description: string;
  price: string;
  /** "/ mes", "por persona / mes"… */
  unit: string;
  featured?: boolean;
  /** Lo que lo distingue del anterior (o lo que incluye, en el primero). */
  items: string[];
};

export type Product = {
  id: ProductId;
  name: string;
  href: '/productos/elem-core' | '/productos/elem-one';
  metaTitle: string;
  metaDesc: string;
  /** Una línea para la tarjeta del índice de productos. */
  summary: string;
  heroTitle: string;
  heroDesc: string;
  heroImage: Shot;
  heroPhone: Shot;
  video: { src: string; poster: string; vertical: boolean; title: string; body: string };
  featuresTitle: string;
  features: Feature[];
  moreTitle: string;
  more: { title: string; body: string }[];
  plansTitle: string;
  plansDesc: string;
  plans: Plan[];
  plansNote: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
};

export type ProductsCopy = {
  home: string;
  products: string;
  demo: string;
  seePlans: string;
  recommended: string;
  includes: string;
  everythingIn: (plan: string) => string;
  learnMore: string;
  watchVideo: string;
  indexMetaTitle: string;
  indexMetaDesc: string;
  indexTitle: string;
  indexDesc: string;
  assist: { name: string; summary: string; cta: string; href: string };
  indexCtaTitle: string;
};

// Capturas a 2400 × 1500 (pantalla de 1600 × 1000 a ×1,5): nítidas en pantallas de alta densidad.
const W = 2400, H = 1500;
const core = (f: string, alt: string): Shot => ({ src: `/productos/core/${f}.webp`, alt, width: W, height: H });
const one = (f: string, alt: string): Shot => ({ src: `/productos/one/${f}.webp`, alt, width: W, height: H });

export const productsCopy: Record<Locale, ProductsCopy> = {
  es: {
    home: 'Inicio',
    products: 'Productos',
    demo: 'Pide tu demo',
    seePlans: 'Ver planes',
    recommended: 'Recomendado',
    includes: 'Incluye',
    everythingIn: (plan) => `Todo lo de ${plan}, y además:`,
    learnMore: 'Conocer',
    watchVideo: 'Ver el video',
    indexMetaTitle: 'Productos · ELEM Core, ELEM One y ELEM Assist',
    indexMetaDesc:
      'Productos de ELEM: un CMS para editar tu web sin depender de nadie, una intranet con gestión de personas y un asistente con IA para tu sitio.',
    indexTitle: 'Productos listos para usar, hechos por el mismo equipo.',
    indexDesc:
      'Lo que aprendimos construyendo software a medida, convertido en productos: para tu web, para tu equipo y para quienes te escriben.',
    assist: {
      name: 'ELEM Assist',
      summary:
        'Un asistente con IA para tu sitio que responde con tus documentos y tus páginas, cita de dónde sale cada dato y guía trámites paso a paso.',
      cta: 'Ver el lanzamiento',
      href: '/noticias/presentamos-elem-assist',
    },
    indexCtaTitle: '¿No sabes cuál te sirve? Cuéntanos qué necesitas y te lo mostramos.',
  },
  en: {
    home: 'Home',
    products: 'Products',
    demo: 'Request a demo',
    seePlans: 'See plans',
    recommended: 'Recommended',
    includes: 'Includes',
    everythingIn: (plan) => `Everything in ${plan}, plus:`,
    learnMore: 'Learn more',
    watchVideo: 'Watch the video',
    indexMetaTitle: 'Products · ELEM Core, ELEM One and ELEM Assist',
    indexMetaDesc:
      'ELEM products: a CMS to edit your website without depending on anyone, an intranet with people management, and an AI assistant for your site.',
    indexTitle: 'Ready-to-use products, built by the same team.',
    indexDesc:
      'What we learned building custom software, turned into products: for your website, for your team and for the people who write to you.',
    assist: {
      name: 'ELEM Assist',
      summary:
        'An AI assistant for your site that answers with your documents and pages, cites where each fact comes from and guides people through procedures step by step.',
      cta: 'Read the launch',
      href: '/noticias/presentamos-elem-assist',
    },
    indexCtaTitle: 'Not sure which one fits? Tell us what you need and we’ll show you.',
  },
};

export const products: Record<Locale, Record<ProductId, Product>> = {
  es: {
    core: {
      id: 'core',
      name: 'ELEM Core',
      href: '/productos/elem-core',
      metaTitle: 'ELEM Core · El CMS para editar tu web tú mismo',
      metaDesc:
        'Edita tu sitio sobre la página misma: doble clic, escribes y publicas. Bloques, varios idiomas, formularios, estadísticas sin cookies y dominio propio. Planes desde USD 25 por mes.',
      summary:
        'El CMS para editar tu web sobre la página misma: doble clic, escribes y publicas. Nosotros nos ocupamos del alojamiento, la seguridad y el soporte.',
      heroTitle: 'Tu web, en tus manos.',
      heroDesc:
        'ELEM Core es el CMS para editar tu sitio sobre la página misma: haces doble clic, escribes y publicas. Sin tickets ni esperas. Nosotros nos ocupamos del alojamiento, la seguridad y el soporte.',
      heroImage: core('editar', 'Editor de ELEM Core: el título de la portada recién cambiado sobre la página, con sus ajustes al costado y «Publicar cambios» listo'),
      heroPhone: { src: '/productos/core/sitio-celular.webp', alt: 'El sitio publicado, visto en un celular', width: 900, height: 1948 },
      video: {
        src: '/videos/elem-core.mp4',
        poster: '/videos/elem-core-poster.jpg',
        vertical: true,
        title: 'Cambiar una frase no debería tardar 23 días.',
        body: 'Pedirle a alguien que cambie un título y esperar semanas es más común de lo que parece. Con ELEM Core lo cambias tú: doble clic sobre el texto, escribes y publicas. En el video, de punta a punta, tarda 4 segundos.',
      },
      featuresTitle: 'Todo lo que tu sitio necesita, sin tocar código.',
      features: [
        {
          title: 'Editas sobre la página, no en un formulario.',
          body: 'Ves el sitio tal como lo verá la gente y cambias lo que quieras ahí mismo. Lo que editas queda en borrador hasta que lo publicas.',
          points: [
            'Doble clic sobre cualquier texto para cambiarlo',
            'Borrador separado de lo publicado; también se puede programar',
            'Historial de versiones: compara dos versiones lado a lado y vuelve atrás',
            'Colores, letras y espacios desde el panel de diseño',
          ],
          image: core('diseno', 'Panel de diseño de ELEM Core: al elegir un color del tema, el título cambia en la página'),
        },
        {
          title: 'Armas páginas arrastrando bloques.',
          body: 'Portadas, texto con imagen, galerías, pestañas, carruseles, mapas, formularios y listados de contenido que se actualizan solos.',
          points: [
            'Iteradores: «Novedades», «Productos» o lo que cargues, con filtros para el visitante',
            'Contenedores para armar filas y columnas, también en celular',
            'Piezas reutilizables: cambias una y se actualiza en todas las páginas',
            'Encabezado y pie editables con las mismas piezas',
          ],
          image: core('bloques', 'Un «Iterador de contenido» arrastrado desde el panel Agregar hasta la página, con la línea de dónde va a caer'),
        },
        {
          title: 'En varios idiomas, con su propia dirección.',
          body: 'Cada traducción es una página propia vinculada a la original, con su dirección y su estado. El selector de idioma aparece solo en el sitio.',
          points: [
            'El idioma principal sin prefijo y los demás con el suyo (/en/…)',
            'Crea la versión que falta copiando, o traducida con IA',
            'Menús, encabezados y pies por idioma',
            'Etiquetas para buscadores (hreflang) automáticas',
          ],
          image: core('idiomas', 'La versión en inglés abierta en el editor, con el menú de traducciones de la página'),
        },
        {
          title: 'Se ve bien en cualquier pantalla.',
          body: 'Revisas el sitio como escritorio, tablet o celular desde el mismo editor, y ajustas cada uno por separado si hace falta.',
          points: [
            'Márgenes, colores, alineación y tamaño de letra por dispositivo',
            'Columnas en tablet y celular, y orden invertido al apilar',
            'Ocultar un bloque en un dispositivo',
            'Imágenes optimizadas en varios tamaños, sin datos EXIF',
          ],
          image: core('celular', 'La página en vista de celular, dentro del editor de ELEM Core'),
        },
      ],
      moreTitle: 'Y además',
      more: [
        { title: 'Formularios', body: 'Contacto, presupuestos o inscripciones, con adjuntos, campos condicionales, aviso por email, anti-spam y exportación a Excel.' },
        { title: 'Estadísticas sin cookies', body: 'Visitantes, páginas más vistas, de dónde llegan y qué buscan, sin cookies y sin seguir a nadie.' },
        { title: 'Buscadores y redirecciones', body: 'Sitemap, robots y redirecciones 301 automáticas cuando cambias una dirección. Buscador interno en el sitio.' },
        { title: 'Tu dominio con HTTPS', body: 'Agregas tu dominio, te mostramos qué cargar en el DNS y el certificado se renueva solo.' },
        { title: 'Áreas privadas', body: 'Páginas sólo para miembros o ciertos grupos, con registro abierto, por invitación o con aprobación.' },
        { title: 'IA donde ayuda', body: 'Texto alternativo de imágenes, resúmenes, títulos para buscadores y traducciones, a pedido y sin enviar nada más.' },
        { title: 'Trae tu sitio actual', body: 'Importa entradas, páginas, categorías e imágenes desde WordPress o Drupal, sin duplicar.' },
        { title: 'API y webhooks', body: 'Claves por aplicación y avisos firmados al publicar, para conectar tu contenido con otros sistemas.' },
        { title: 'Soluciones listas', body: 'Paquetes que se suman con un clic, como el de automotora: catálogo con filtros, ficha y comparador.' },
      ],
      plansTitle: 'Planes',
      plansDesc: 'Todos los planes incluyen el editor completo, alojamiento, HTTPS, actualizaciones y soporte.',
      plans: [
        {
          name: 'Esencial',
          description: 'Un sitio institucional con formularios, estadísticas y SEO.',
          price: 'USD 25',
          unit: '/ mes',
          items: ['1 GB de archivos', 'Hasta 3 personas editando', '1 dominio propio', 'Editor visual y todos los bloques', 'Formularios y estadísticas', 'Buscadores y redirecciones'],
        },
        {
          name: 'Profesional',
          description: 'Más espacio y equipo, varios idiomas, miembros e IA.',
          price: 'USD 55',
          unit: '/ mes',
          featured: true,
          items: ['5 GB de archivos', 'Hasta 10 personas editando', '3 dominios propios', 'Sitio en varios idiomas', 'Miembros y páginas privadas', 'Asistente de IA en el editor'],
        },
        {
          name: 'Empresa',
          description: 'Para equipos grandes: espacio amplio y todo incluido.',
          price: 'USD 140',
          unit: '/ mes',
          items: ['20 GB de archivos', 'Personas sin límite', '10 dominios propios', 'Varios idiomas, miembros e IA'],
        },
      ],
      plansNote:
        'Precios de referencia en dólares, por sitio y por mes. ¿Necesitas una instancia dedicada o en tu propia infraestructura? Escríbenos y lo armamos.',
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        { q: '¿Necesito saber programar?', a: 'No. Editas sobre la página: doble clic en un texto, arrastras bloques y eliges colores desde un panel. Si quieres algo a medida, el kit para desarrolladores permite sumar bloques y temas propios.' },
        { q: '¿Puedo traer el contenido de mi sitio actual?', a: 'Sí. ELEM Core importa entradas, páginas con su jerarquía, categorías e imágenes desde WordPress (con su archivo de exportación) y desde Drupal 8 o posterior.' },
        { q: '¿Qué pasa si me equivoco?', a: 'Lo que editas queda en borrador hasta que lo publicas, y cada versión queda guardada: puedes comparar dos versiones y volver a la anterior con un clic.' },
        { q: '¿Puedo usar mi propio dominio?', a: 'Sí. Lo agregas desde la configuración, te mostramos los registros DNS a cargar y, cuando se verifica, el certificado HTTPS se emite y se renueva solo.' },
        { q: '¿Dónde se aloja mi sitio?', a: 'En nuestra infraestructura: nos ocupamos del servidor, las actualizaciones y la seguridad. Si tu empresa lo necesita, también lo instalamos en una instancia dedicada o en tus servidores.' },
        { q: '¿Puedo cambiar de plan?', a: 'Sí. Si tu sitio crece, pasas al plan siguiente sin migrar nada: el contenido y el diseño quedan como están.' },
      ],
      ctaTitle: '¿Lo vemos funcionando con tu sitio?',
    },
    one: {
      id: 'one',
      name: 'ELEM One',
      href: '/productos/elem-one',
      metaTitle: 'ELEM One · Intranet y gestión de personas en una sola plataforma',
      metaDesc:
        'Comunicación interna, vacaciones y licencias, recibos, capacitación, desempeño y un asistente, en una sola plataforma. Planes desde USD 2,5 por persona por mes.',
      summary:
        'Intranet y recursos humanos en una sola plataforma: comunicación interna, trámites, recibos, capacitación y más, en el navegador y en el celular.',
      heroTitle: 'Tu empresa, en un solo lugar.',
      heroDesc:
        'ELEM One reúne la comunicación interna y la gestión de personas: novedades, chat, vacaciones, recibos, capacitación y desempeño. Cada uno encuentra lo suyo y RRHH deja de responder lo mismo diez veces.',
      heroImage: one('feed', 'Muro de ELEM One con anuncios, celebraciones y accesos rápidos'),
      heroPhone: { src: '/productos/one/feed-celular.webp', alt: 'ELEM One en un celular', width: 900, height: 1948 },
      video: {
        src: '/videos/elem-one.mp4',
        poster: '/videos/elem-one-poster.jpg',
        vertical: false,
        title: 'Menos correos, planillas y grupos de WhatsApp.',
        body: 'La comunicación interna y los trámites del día a día suelen estar repartidos en muchos lados. ELEM One los junta en una sola plataforma que se usa desde el navegador o el celular.',
      },
      featuresTitle: 'Comunicación y RRHH, en la misma plataforma.',
      features: [
        {
          title: 'Que todos se enteren.',
          body: 'Un muro para anuncios y novedades, noticias dirigidas a un área o a una sede, encuestas y transmisiones en vivo para las reuniones generales.',
          points: [
            'Publicaciones con audiencia: toda la empresa, un área o una sede',
            'Celebraciones, reconocimientos y eventos',
            'Encuestas de clima y eNPS con resultados al instante',
            'Transmisiones en vivo que quedan grabadas',
          ],
          image: one('news', 'Noticias de ELEM One con portadas, categorías y la nota destacada'),
        },
        {
          title: 'Trámites sin correos de ida y vuelta.',
          body: 'Cada persona pide sus vacaciones y licencias, ve sus saldos y sigue el estado de sus trámites. RRHH aprueba y tiene todo registrado.',
          points: [
            'Vacaciones, licencias y días de estudio con saldos',
            'Portal de trámites con estado y responsable',
            'Control horario y horas extra',
            'Calendario de feriados y ausencias del equipo',
          ],
          image: one('time-off', 'Vacaciones y licencias en ELEM One'),
        },
        {
          title: 'Recibos y documentos, siempre a mano.',
          body: 'RRHH envía recibos de sueldo y documentos a cada persona, que los ve, los descarga y confirma que los recibió.',
          points: [
            'Recibos, contratos y constancias por lote: se reparten solos por el nombre del archivo',
            'Confirmación de recepción por persona',
            'Documentos de la empresa y base de conocimiento',
            'Sólo lo ve quien tiene que verlo',
          ],
          image: one('documents', 'Mis documentos en ELEM One'),
        },
        {
          title: 'Sabes qué funciona.',
          body: 'Métricas de adopción y de uso por módulo y por área, para saber qué se usa, qué no y dónde hay que empujar.',
          points: [
            'Personas activas por día',
            'Uso por módulo y adopción por área',
            'Invitaciones pendientes y confirmaciones de lectura',
            'Solicitudes del portal pendientes',
          ],
          image: one('metrics', 'Métricas de uso de ELEM One'),
        },
      ],
      moreTitle: 'Y además',
      more: [
        { title: 'Chat', body: 'Mensajes directos y en grupos en tiempo real, con archivos e imágenes.' },
        { title: 'Onboarding y offboarding', body: 'Tareas de bienvenida y de salida con responsable y fecha, para que nadie quede a la deriva.' },
        { title: 'Desempeño y objetivos', body: 'Ciclos de evaluación con autoevaluación y devolución del jefe, feedback entre compañeros y objetivos por área.' },
        { title: 'Capacitaciones', body: 'Cursos internos con evaluación y certificado, para la inducción y la formación continua.' },
        { title: 'Buzón de ideas', body: 'Propuestas con nombre o anónimas, votos, comentarios y respuestas oficiales.' },
        { title: 'Organigrama y personas', body: 'Quién es quién, en qué área está y a quién reporta, con búsqueda.' },
        { title: 'Reserva de espacios', body: 'Salas, puestos y cocheras por sede, sin superposiciones.' },
        { title: 'Asistente', body: 'Responde preguntas sobre políticas y trámites con lo que la empresa publicó. No accede a datos personales.' },
        { title: 'Seguridad', body: 'Verificación en dos pasos, cuentas corporativas (SSO), alta automática y registro de cada cambio administrativo.' },
      ],
      plansTitle: 'Planes',
      plansDesc: 'Pagas por persona. Cada empresa prende los módulos que usa y deja el resto apagado.',
      plans: [
        {
          name: 'Comunicación',
          description: 'Reemplaza el WhatsApp y el mail interno.',
          price: 'USD 2,5',
          unit: 'por persona / mes',
          items: ['Hasta 300 personas', 'Muro, noticias y alertas', 'Chat y grupos', 'Encuestas y transmisiones en vivo', 'Eventos, celebraciones y reconocimientos', 'Buzón de ideas y marketplace interno', 'Organigrama, archivos y calendario', 'Métricas de uso'],
        },
        {
          name: 'Comunicación + Gestión',
          description: 'RRHH en un solo lugar.',
          price: 'USD 5',
          unit: 'por persona / mes',
          featured: true,
          items: ['Sin tope de personas', 'Vacaciones y licencias', 'Portal de trámites', 'Recibos y documentos', 'Control horario', 'Onboarding y offboarding', 'Desempeño, objetivos y capacitaciones', 'Beneficios, reserva de espacios y búsquedas internas'],
        },
        {
          name: 'Empresa',
          description: 'Todo, con SSO, auditoría, API, nómina y asistente IA.',
          price: 'USD 7',
          unit: 'por persona / mes',
          items: ['Ingreso con cuentas corporativas (SSO)', 'Auditoría de cambios', 'API para integrar tus sistemas', 'Nómina', 'Asistente con IA'],
        },
      ],
      plansNote: 'Precios de referencia en dólares, por persona y por mes. ¿Quieres verlo con tu equipo antes de decidir? Escríbenos y coordinamos una demo.',
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        { q: '¿Se usa desde el celular?', a: 'Sí. ELEM One funciona en el navegador y en el celular, con avisos de lo que te toca: un trámite aprobado, una noticia nueva o un mensaje.' },
        { q: '¿Tengo que usar todos los módulos?', a: 'No. Cada empresa prende los módulos que va a usar y deja el resto apagado. Puedes empezar por la comunicación y sumar la gestión después.' },
        { q: '¿Cómo entra la gente?', a: 'Con su cuenta corporativa (SSO) o con usuario y contraseña, con verificación en dos pasos si la exiges. Las altas se pueden cargar a mano, por planilla o de forma automática desde tus sistemas.' },
        { q: '¿El asistente ve datos personales?', a: 'No. Sólo usa lo que la empresa publicó para todo el equipo, como políticas y procedimientos.' },
        { q: '¿Puedo pasar mis datos actuales?', a: 'Sí. Las personas, áreas y jefes se importan desde una planilla, y te ayudamos con el resto en la puesta en marcha.' },
      ],
      ctaTitle: '¿Lo vemos funcionando con casos de tu empresa?',
    },
  },
  en: {
    core: {
      id: 'core',
      name: 'ELEM Core',
      href: '/productos/elem-core',
      metaTitle: 'ELEM Core · The CMS to edit your website yourself',
      metaDesc:
        'Edit your site right on the page: double-click, type and publish. Blocks, multiple languages, forms, cookie-free analytics and your own domain. Plans from USD 25 per month.',
      summary:
        'The CMS to edit your website right on the page: double-click, type and publish. We take care of hosting, security and support.',
      heroTitle: 'Your website, in your hands.',
      heroDesc:
        'ELEM Core is the CMS to edit your site right on the page: double-click, type and publish. No tickets, no waiting. We take care of hosting, security and support.',
      heroImage: core('editar', 'ELEM Core editor: the home page title just changed on the page, with its settings on the side and “Publish changes” ready'),
      heroPhone: { src: '/productos/core/sitio-celular.webp', alt: 'The published site on a phone', width: 900, height: 1948 },
      video: {
        src: '/videos/elem-core.mp4',
        poster: '/videos/elem-core-poster.jpg',
        vertical: true,
        title: 'Changing one sentence shouldn’t take 23 days.',
        body: 'Asking someone to change a headline and waiting for weeks is more common than it seems. With ELEM Core you change it yourself: double-click the text, type and publish. In the video it takes 4 seconds, start to finish.',
      },
      featuresTitle: 'Everything your site needs, without touching code.',
      features: [
        {
          title: 'You edit on the page, not in a form.',
          body: 'You see the site exactly as people will and change anything right there. Your edits stay in draft until you publish them.',
          points: [
            'Double-click any text to change it',
            'Draft kept separate from what’s live; publishing can be scheduled',
            'Version history: compare two versions side by side and roll back',
            'Colors, fonts and spacing from the design panel',
          ],
          image: core('diseno', 'ELEM Core design panel: picking a theme color changes the title on the page'),
        },
        {
          title: 'Build pages by dragging blocks.',
          body: 'Heroes, text with image, galleries, tabs, carousels, maps, forms and content listings that update themselves.',
          points: [
            'Iterators: “News”, “Products” or anything you publish, with visitor filters',
            'Containers to build rows and columns, on phones too',
            'Reusable pieces: change one and every page updates',
            'Editable header and footer with the same pieces',
          ],
          image: core('bloques', 'A content iterator dragged from the Add panel onto the page, with the line showing where it will land'),
        },
        {
          title: 'In several languages, each with its own URL.',
          body: 'Each translation is its own page linked to the original, with its own URL and status. The language switcher shows up on the site by itself.',
          points: [
            'Main language without a prefix, the rest with theirs (/en/…)',
            'Create the missing version by copying it, or translated with AI',
            'Menus, headers and footers per language',
            'Automatic hreflang tags for search engines',
          ],
          image: core('idiomas', 'The English version open in the editor, with the page’s translations menu'),
        },
        {
          title: 'Looks right on any screen.',
          body: 'Preview the site as desktop, tablet or phone from the same editor, and tune each one separately when needed.',
          points: [
            'Margins, colors, alignment and font size per device',
            'Columns on tablet and phone, and reversed order when stacking',
            'Hide a block on a given device',
            'Images optimized in several sizes, with EXIF data stripped',
          ],
          image: core('celular', 'The page in phone view, inside the ELEM Core editor'),
        },
      ],
      moreTitle: 'And also',
      more: [
        { title: 'Forms', body: 'Contact, quotes or sign-ups, with attachments, conditional fields, email alerts, anti-spam and Excel export.' },
        { title: 'Cookie-free analytics', body: 'Visitors, top pages, where they come from and what they search for, without tracking anyone.' },
        { title: 'SEO and redirects', body: 'Sitemap, robots and automatic 301 redirects when you change a URL. Built-in site search.' },
        { title: 'Your domain with HTTPS', body: 'Add your domain, we show you what to set in DNS, and the certificate renews itself.' },
        { title: 'Private areas', body: 'Pages only for members or certain groups, with open, invite-only or approval sign-up.' },
        { title: 'AI where it helps', body: 'Image alt text, summaries, search titles and translations, on request and sending nothing else.' },
        { title: 'Bring your current site', body: 'Import posts, pages, categories and images from WordPress or Drupal, without duplicates.' },
        { title: 'API and webhooks', body: 'Per-app keys and signed notifications on publish, to connect your content with other systems.' },
        { title: 'Ready-made solutions', body: 'One-click packages, like the car dealer one: catalog with filters, detail page and comparison.' },
      ],
      plansTitle: 'Plans',
      plansDesc: 'Every plan includes the full editor, hosting, HTTPS, updates and support.',
      plans: [
        {
          name: 'Essential',
          description: 'A corporate site with forms, analytics and SEO.',
          price: 'USD 25',
          unit: '/ month',
          items: ['1 GB of files', 'Up to 3 editors', '1 custom domain', 'Visual editor and every block', 'Forms and analytics', 'SEO and redirects'],
        },
        {
          name: 'Professional',
          description: 'More space and team, multiple languages, members and AI.',
          price: 'USD 55',
          unit: '/ month',
          featured: true,
          items: ['5 GB of files', 'Up to 10 editors', '3 custom domains', 'Multilingual site', 'Members and private pages', 'AI assistant in the editor'],
        },
        {
          name: 'Enterprise',
          description: 'For large teams: plenty of space and everything included.',
          price: 'USD 140',
          unit: '/ month',
          items: ['20 GB of files', 'Unlimited editors', '10 custom domains', 'Languages, members and AI'],
        },
      ],
      plansNote:
        'Reference prices in US dollars, per site per month. Need a dedicated instance or one on your own infrastructure? Write to us and we’ll set it up.',
      faqTitle: 'Frequently asked questions',
      faqs: [
        { q: 'Do I need to know how to code?', a: 'No. You edit on the page: double-click a text, drag blocks and pick colors from a panel. If you want something custom, the developer kit lets you add your own blocks and themes.' },
        { q: 'Can I bring the content of my current site?', a: 'Yes. ELEM Core imports posts, pages with their hierarchy, categories and images from WordPress (with its export file) and from Drupal 8 or later.' },
        { q: 'What if I make a mistake?', a: 'Your edits stay in draft until you publish them, and every version is saved: you can compare two versions and go back to the previous one with a click.' },
        { q: 'Can I use my own domain?', a: 'Yes. Add it from the settings, we show you the DNS records to set and, once verified, the HTTPS certificate is issued and renewed automatically.' },
        { q: 'Where is my site hosted?', a: 'On our infrastructure: we take care of the server, updates and security. If your company needs it, we also install it on a dedicated instance or on your servers.' },
        { q: 'Can I change plans?', a: 'Yes. If your site grows, you move to the next plan without migrating anything: content and design stay as they are.' },
      ],
      ctaTitle: 'Shall we see it working with your site?',
    },
    one: {
      id: 'one',
      name: 'ELEM One',
      href: '/productos/elem-one',
      metaTitle: 'ELEM One · Intranet and people management in one platform',
      metaDesc:
        'Internal communication, time off, payslips, training, performance and an assistant, in one platform. Plans from USD 2.5 per person per month.',
      summary:
        'Intranet and HR in one platform: internal communication, requests, payslips, training and more, in the browser and on the phone.',
      heroTitle: 'Your company, in one place.',
      heroDesc:
        'ELEM One brings internal communication and people management together: news, chat, time off, payslips, training and performance. Everyone finds what they need, and HR stops answering the same question ten times.',
      heroImage: one('feed', 'ELEM One feed with announcements, celebrations and shortcuts'),
      heroPhone: { src: '/productos/one/feed-celular.webp', alt: 'ELEM One on a phone', width: 900, height: 1948 },
      video: {
        src: '/videos/elem-one.mp4',
        poster: '/videos/elem-one-poster.jpg',
        vertical: false,
        title: 'Fewer emails, spreadsheets and WhatsApp groups.',
        body: 'Internal communication and everyday requests are usually scattered everywhere. ELEM One brings them together in one platform, used from the browser or the phone.',
      },
      featuresTitle: 'Communication and HR, on the same platform.',
      features: [
        {
          title: 'Keep everyone in the loop.',
          body: 'A feed for announcements and news, posts aimed at a department or a site, surveys and live streams for all-hands meetings.',
          points: [
            'Posts with an audience: the whole company, a department or a site',
            'Celebrations, recognitions and events',
            'Climate and eNPS surveys with instant results',
            'Live streams that stay recorded',
          ],
          image: one('news', 'ELEM One news with covers, categories and the featured story'),
        },
        {
          title: 'Requests without back-and-forth emails.',
          body: 'Everyone requests their own time off, sees their balances and follows their requests. HR approves and keeps everything on record.',
          points: [
            'Vacation, leave and study days with balances',
            'Request portal with status and owner',
            'Time tracking and overtime',
            'Holiday and team absence calendar',
          ],
          image: one('time-off', 'Time off in ELEM One'),
        },
        {
          title: 'Payslips and documents, always at hand.',
          body: 'HR sends payslips and documents to each person, who views them, downloads them and confirms receipt.',
          points: [
            'Payslips, contracts and certificates in bulk: matched to each person by file name',
            'Per-person receipt confirmation',
            'Company documents and knowledge base',
            'Only visible to whoever should see it',
          ],
          image: one('documents', 'My documents in ELEM One'),
        },
        {
          title: 'Know what works.',
          body: 'Adoption and usage metrics by module and department, to know what’s used, what isn’t and where to push.',
          points: [
            'Daily active people',
            'Usage by module and adoption by department',
            'Pending invitations and read confirmations',
            'Pending portal requests',
          ],
          image: one('metrics', 'ELEM One usage metrics'),
        },
      ],
      moreTitle: 'And also',
      more: [
        { title: 'Chat', body: 'Real-time direct and group messages, with files and images.' },
        { title: 'Onboarding and offboarding', body: 'Welcome and exit tasks with owner and date, so nobody is left adrift.' },
        { title: 'Performance and goals', body: 'Review cycles with self-assessment and manager feedback, peer feedback and goals by department.' },
        { title: 'Training', body: 'Internal courses with quizzes and certificates, for induction and ongoing learning.' },
        { title: 'Idea box', body: 'Named or anonymous proposals, votes, comments and official answers.' },
        { title: 'Org chart and people', body: 'Who’s who, which department they’re in and who they report to, with search.' },
        { title: 'Space booking', body: 'Rooms, desks and parking spots per site, with no double bookings.' },
        { title: 'Assistant', body: 'Answers questions about policies and procedures with what the company published. No access to personal data.' },
        { title: 'Security', body: 'Two-step verification, corporate accounts (SSO), automatic provisioning and a log of every admin change.' },
      ],
      plansTitle: 'Plans',
      plansDesc: 'You pay per person. Each company turns on the modules it uses and leaves the rest off.',
      plans: [
        {
          name: 'Communication',
          description: 'Replaces WhatsApp and internal email.',
          price: 'USD 2.5',
          unit: 'per person / month',
          items: ['Up to 300 people', 'Feed, news and alerts', 'Chat and groups', 'Surveys and live streams', 'Events, celebrations and recognitions', 'Idea box and internal marketplace', 'Org chart, files and calendar', 'Usage metrics'],
        },
        {
          name: 'Communication + HR',
          description: 'HR in one place.',
          price: 'USD 5',
          unit: 'per person / month',
          featured: true,
          items: ['No people cap', 'Vacation and leave', 'Request portal', 'Payslips and documents', 'Time tracking', 'Onboarding and offboarding', 'Performance, goals and training', 'Benefits, space booking and internal jobs'],
        },
        {
          name: 'Enterprise',
          description: 'Everything, with SSO, audit, API, payroll and AI assistant.',
          price: 'USD 7',
          unit: 'per person / month',
          items: ['Sign-in with corporate accounts (SSO)', 'Change audit log', 'API to integrate your systems', 'Payroll', 'AI assistant'],
        },
      ],
      plansNote: 'Reference prices in US dollars, per person per month. Want to see it with your team before deciding? Write to us and we’ll set up a demo.',
      faqTitle: 'Frequently asked questions',
      faqs: [
        { q: 'Does it work on phones?', a: 'Yes. ELEM One works in the browser and on the phone, with notifications for what concerns you: an approved request, a new post or a message.' },
        { q: 'Do I have to use every module?', a: 'No. Each company turns on the modules it will use and leaves the rest off. You can start with communication and add HR later.' },
        { q: 'How do people sign in?', a: 'With their corporate account (SSO) or with a username and password, with two-step verification if you require it. People can be added by hand, from a spreadsheet or automatically from your systems.' },
        { q: 'Does the assistant see personal data?', a: 'No. It only uses what the company published for the whole team, such as policies and procedures.' },
        { q: 'Can I bring my current data?', a: 'Yes. People, departments and managers are imported from a spreadsheet, and we help you with the rest during rollout.' },
      ],
      ctaTitle: 'Shall we see it working with your company’s cases?',
    },
  },
};

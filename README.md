# ELEM — Plataforma corporativa

Sitio web corporativo premium para **ELEM**, empresa de ingeniería de software
especializada en Drupal, React, Java, PHP y Node.js, integraciones empresariales,
APIs/microservicios, arquitectura, modernización legacy y cloud.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS** + design system propio (paleta rosada tecnológica)
- **Framer Motion** y **GSAP** para animaciones premium
- **Radix UI / Shadcn-style** primitives (button, badge, accordion, tabs)
- **Embla Carousel** (testimonios) · **React Hook Form** + **Zod** (formularios)
- **Lucide Icons** + logotipos SVG de marca propios
- SEO técnico completo: metadata dinámica, Open Graph, Twitter Cards, JSON-LD,
  `sitemap.xml`, `robots.txt`, manifest, iconos y OG image generados con `next/og`

## Scripts

```bash
npm run dev        # desarrollo en http://localhost:3000
npm run build      # build de producción
npm run start      # servir el build
npm run typecheck  # comprobación de tipos
npm run lint       # linting
```

## Estructura

```
src/
  app/                 # rutas (App Router) + SEO (sitemap, robots, manifest, og)
    drupal|react|java|php|nodejs/   # landings de tecnología
    servicios soluciones casos-de-exito blog nosotros contacto legal/[doc]
  components/
    layout/            # header (mega menús), footer, page-hero
    sections/          # secciones de la home
    tech/              # plantilla de landing de tecnología
    motion/            # primitivas de animación (reveal, magnetic, counter, tilt…)
    visuals/           # aurora, partículas, órbita hero, logos SVG, code window
    ui/                # primitivas (button, badge, accordion, faq, section…)
    seo/               # JSON-LD schemas
    contact/           # formulario (RHF + Zod)
  content/             # datos de home, tech, casos, blog
  lib/                 # site config, navegación, utils, helpers SEO
```

## Personalización rápida

- **Marca / contacto / dominio:** `src/lib/site.ts`
- **Navegación y mega menús:** `src/lib/navigation.ts`
- **Contenido de secciones:** `src/content/*`
- **Paleta y tokens:** `tailwind.config.ts` + `src/app/globals.css`
- **Endpoint del formulario:** conectar en `src/components/contact/contact-form.tsx`
  (actualmente simula el envío).

## Imágenes

Todas las composiciones visuales son **SVG/CSS generativos propios** (gradientes,
mallas, partículas en canvas, órbita de tecnologías, ventanas de código y
logotipos de marca). No se usan placeholders genéricos.

import { Link } from '@/components/i18n/link';
import { ArrowLeft, Home, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Aurora } from '@/components/visuals/aurora';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';

const copy: Record<
  Locale,
  {
    title: string;
    body: string;
    home: string;
    contact: string;
    linksLabel: string;
    sitemap: string;
    links: { label: string; href: string }[];
  }
> = {
  es: {
    title: 'Esta página se fue a producción y no volvió',
    body: 'El enlace que seguiste no existe o se ha movido. Volvamos a terreno conocido.',
    home: 'Ir al inicio',
    contact: 'Contactar',
    linksLabel: 'O salta directo a:',
    sitemap: 'Ver mapa del sitio',
    links: [
      { label: 'Servicios', href: '/servicios' },
      { label: 'Nosotros', href: '/nosotros' },
      // Oculto: blog desactivado por ahora.
      // { label: 'Blog', href: '/blog' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  en: {
    title: 'This page went to production and never came back',
    body: 'The link you followed doesn’t exist or has moved. Let’s get back to familiar ground.',
    home: 'Go home',
    contact: 'Contact',
    linksLabel: 'Or jump straight to:',
    sitemap: 'View sitemap',
    links: [
      { label: 'Services', href: '/servicios' },
      { label: 'About', href: '/nosotros' },
      // Oculto: blog desactivado por ahora.
      // { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contacto' },
    ],
  },
};

export default async function NotFound() {
  const t = copy[await getLocale()];
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-32">
      <Aurora />
      <div className="absolute inset-0 bg-grid opacity-[0.18] mask-fade-b" />
      <div className="relative text-center">
        <p className="font-display text-[7rem] font-extrabold leading-none text-gradient-animated sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{t.title}</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">{t.body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="size-4" /> {t.home}
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">
              <ArrowLeft className="size-4" /> {t.contact}
            </Link>
          </Button>
        </div>

        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            {t.linksLabel}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {t.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-border bg-background/70 px-4 py-2 text-sm font-medium text-foreground/80 backdrop-blur transition-colors hover:border-rose-300 hover:text-rose-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/mapa-del-sitio"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 hover:text-rose-700"
          >
            <Map className="size-4" /> {t.sitemap}
          </Link>
        </div>
      </div>
    </section>
  );
}

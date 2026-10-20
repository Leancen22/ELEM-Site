import { Link } from '@/components/i18n/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
    title: 'No encontramos esta página.',
    body: 'El enlace que seguiste no existe o cambió de dirección.',
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
    title: 'We couldn’t find this page.',
    body: 'The link you followed doesn’t exist or has moved.',
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
    <section className="pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div className="container-wide max-w-3xl">
        <p className="font-mono text-sm text-primary">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{t.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{t.body}</p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link href="/">
              {t.home} <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/contacto">{t.contact}</Link>
          </Button>
        </div>
        <p className="mt-14 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.linksLabel}</p>
        <ul className="mt-4 border-t border-border">
          {[...t.links, { label: t.sitemap, href: '/mapa-del-sitio' }].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center justify-between border-b border-border py-4 font-medium transition-colors hover:text-primary"
              >
                {link.label} <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

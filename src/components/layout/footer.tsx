import { Link } from '@/components/i18n/link';
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { site, siteCopy } from '@/lib/site';
import { servicios, soluciones, tecnologias, empresa } from '@/lib/navigation';
import { getLocale } from '@/i18n/server';
import { ui } from '@/content/ui';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.9l-5.4-7.06L3.99 22H.73l8.02-9.17L1.5 2h7.06l4.88 6.45L18.244 2Zm-1.21 18h1.81L7.05 3.9H5.11L17.034 20Z" />
  </svg>
);

export async function Footer() {
  const locale = await getLocale();
  const copy = siteCopy[locale];
  const t = ui[locale].footer;
  return (
    <footer className="relative overflow-hidden border-t border-border bg-muted/40">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand-gradient opacity-60" />
      <div className="container-wide pt-16 sm:pt-20">
        {/* CTA strip */}
        <div className="relative overflow-hidden rounded-3xl border border-rose-200/60 bg-brand-gradient px-6 py-10 text-white shadow-glow sm:px-12 sm:py-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,.3),transparent_45%)]" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">
                {t.ctaTitle}
              </h3>
              <p className="mt-2 text-white/85">{t.ctaSubtitle}</p>
            </div>
            <Link
              href="/contacto"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-rose-700 shadow-lg transition-transform hover:scale-[1.03]"
            >
              {t.ctaButton}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid grid-cols-2 gap-8 py-16 md:grid-cols-12">
          <div className="col-span-2 md:col-span-3">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {copy.description}
            </p>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-rose-600">
                <Mail className="size-4 text-rose-500" /> {site.email}
              </a>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-rose-600">
                <Phone className="size-4 text-rose-500" /> {site.phone}
              </a>
              {/* <p className="flex items-center gap-2">
                <MapPin className="size-4 text-rose-500" /> {copy.address}
              </p> */}
            </div>
            <div className="mt-6 flex items-center gap-2">
              <SocialLink href={site.social.linkedin} label="LinkedIn">
                <Linkedin className="size-4" />
              </SocialLink>
              <SocialLink href={site.social.instagram} label="GitHub">
                <Instagram className="size-4" />
              </SocialLink>
            </div>
          </div>

          <FooterCol title={t.colServices} items={servicios[locale]} className="md:col-span-3" />
          {/* Columna Soluciones oculta: menú fusionado en Servicios.
          <FooterCol title={t.colSolutions} items={soluciones[locale].slice(0, 6)} className="md:col-span-3" /> */}
          <FooterCol title={t.colTech} items={tecnologias[locale]} className="md:col-span-3" />
          <FooterCol title={t.colCompany} items={empresa[locale]} className="md:col-span-3" />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {t.rights}
          </p>
          <div className="flex items-center gap-5">
            <Link href="/mapa-del-sitio" className="hover:text-rose-600">
              {t.sitemap}
            </Link>
            <Link href="/legal/privacidad" className="hover:text-rose-600">
              {t.privacy}
            </Link>
            <Link href="/legal/cookies" className="hover:text-rose-600">
              {t.cookies}
            </Link>
            <Link href="/legal/aviso-legal" className="hover:text-rose-600">
              {t.legal}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
  className,
}: {
  title: string;
  items: { label: string; href: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.label + item.href}>
            <Link
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-rose-600"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-9 place-items-center rounded-xl border border-border bg-background text-foreground transition-colors hover:border-rose-200 hover:bg-brand-gradient hover:text-white"
    >
      {children}
    </a>
  );
}

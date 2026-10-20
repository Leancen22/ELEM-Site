import { Link } from '@/components/i18n/link';
import { Logo } from '@/components/brand/logo';
import { site, siteCopy } from '@/lib/site';
import { servicios, tecnologias, empresa } from '@/lib/navigation';
import { getLocale } from '@/i18n/server';
import { ui } from '@/content/ui';

export async function Footer() {
  const locale = await getLocale();
  const copy = siteCopy[locale];
  const t = ui[locale].footer;
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-wide">
        <div className="grid gap-12 py-16 sm:py-20 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">{copy.description}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-sm font-medium underline decoration-border underline-offset-4 hover:decoration-current"
            >
              {site.email}
            </a>
          </div>

          <FooterCol title={t.colServices} items={servicios[locale]} className="md:col-span-3" />
          <FooterCol title={t.colTech} items={tecnologias[locale]} className="md:col-span-2" />
          <FooterCol
            title={t.colCompany}
            items={[
              ...empresa[locale],
              { label: 'LinkedIn', href: site.social.linkedin, external: true },
              { label: 'Instagram', href: site.social.instagram, external: true },
            ]}
            className="md:col-span-3"
          />
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-border py-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {t.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/mapa-del-sitio" className="hover:text-foreground">
              {t.sitemap}
            </Link>
            <Link href="/legal/privacidad" className="hover:text-foreground">
              {t.privacy}
            </Link>
            <Link href="/legal/cookies" className="hover:text-foreground">
              {t.cookies}
            </Link>
            <Link href="/legal/aviso-legal" className="hover:text-foreground">
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
  items: { label: string; href: string; external?: boolean }[];
  className?: string;
}) {
  const linkCls = 'text-sm text-foreground/85 transition-colors hover:text-foreground hover:underline underline-offset-4';
  return (
    <div className={className}>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{title}</p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item.label + item.href}>
            {item.external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={linkCls}>
                {item.label}
              </a>
            ) : (
              <Link href={item.href} className={linkCls}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

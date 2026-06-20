import { Link } from '@/components/i18n/link';
import { ChevronRight } from 'lucide-react';
import { getLocale } from '@/i18n/server';

export async function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  const locale = await getLocale();
  return (
    <nav
      aria-label={locale === 'en' ? 'Breadcrumb' : 'Migas de pan'}
      className="flex items-center gap-1.5 text-sm"
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={item.href} className="flex items-center gap-1.5">
            {last ? (
              <span className="font-medium text-foreground">{item.name}</span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-rose-600"
              >
                {item.name}
              </Link>
            )}
            {!last && <ChevronRight className="size-3.5 text-muted-foreground/60" />}
          </span>
        );
      })}
    </nav>
  );
}

'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { Languages } from 'lucide-react';
import { useLocale } from '@/i18n/provider';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales } from '@/i18n/config';
import { cn } from '@/lib/utils';

export function LocaleSwitch({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [pending, startTransition] = React.useTransition();

  const next = locale === 'es' ? 'en' : 'es';

  const change = () => {
    startTransition(() => {
      // `pathname` is the internal (canonical) path; next-intl swaps the locale
      // and translates the slug, keeping the user on the same page.
      router.replace(
        // @ts-expect-error -- params are passed through to satisfy dynamic routes
        { pathname, params },
        { locale: next }
      );
    });
  };

  return (
    <button
      type="button"
      onClick={change}
      disabled={pending}
      aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a español'}
      title={locales.map((l) => l.toUpperCase()).join(' / ')}
      className={cn(
        'inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-background/70 px-2.5 text-sm font-semibold text-foreground transition-colors hover:border-rose-300 hover:text-rose-600 disabled:opacity-60',
        className
      )}
    >
      <Languages className="size-4" />
      <span className="tabular-nums">{locale.toUpperCase()}</span>
    </button>
  );
}

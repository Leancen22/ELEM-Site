'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useLocale } from '@/i18n/provider';
import { cn } from '@/lib/utils';

const labels = {
  es: { light: 'Modo claro', dark: 'Modo oscuro' },
  en: { light: 'Light mode', dark: 'Dark mode' },
};

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const locale = useLocale();

  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';
  const t = labels[locale];

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted && isDark ? t.light : t.dark}
      className={cn(
        'grid size-10 place-items-center rounded-xl border border-border bg-background/70 text-foreground transition-colors hover:border-rose-300 hover:text-rose-600',
        className
      )}
    >
      {/* Render both icons; CSS swaps via opacity to avoid hydration flash. */}
      <Sun
        className={cn(
          'size-[18px] transition-all',
          mounted && isDark ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        )}
      />
      <Moon
        className={cn(
          'absolute size-[18px] transition-all',
          mounted && isDark ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        )}
      />
    </button>
  );
}

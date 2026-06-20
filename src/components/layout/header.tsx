'use client';

import * as React from 'react';
import { Link } from '@/components/i18n/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/motion/magnetic';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { LocaleSwitch } from '@/components/i18n/locale-switch';
import { getMainNav, type NavEntry } from '@/lib/navigation';
import { useLocale } from '@/i18n/provider';
import { ui } from '@/content/ui';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const mainNav = getMainNav(locale);
  const t = ui[locale].header;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
    setOpen(null);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled ? 'py-2.5' : 'py-4'
      )}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="container-wide">
        <div
          className={cn(
            'flex items-center justify-between gap-4 rounded-2xl px-4 transition-all duration-500',
            scrolled
              ? 'h-14 border border-border/70 bg-background/70 shadow-card backdrop-blur-xl'
              : 'h-16 border border-transparent bg-transparent'
          )}
        >
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((entry) =>
              entry.columns ? (
                <div
                  key={entry.label}
                  className="relative"
                  onMouseEnter={() => setOpen(entry.label)}
                >
                  <button
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-rose-600',
                      open === entry.label && 'text-rose-600'
                    )}
                    aria-expanded={open === entry.label}
                  >
                    {entry.label}
                    <ChevronDown
                      className={cn(
                        'size-3.5 transition-transform duration-300',
                        open === entry.label && 'rotate-180'
                      )}
                    />
                  </button>
                </div>
              ) : (
                <div
                  key={entry.label}
                  className="relative"
                  onMouseEnter={() => setOpen(null)}
                >
                  <Link
                    href={entry.href!}
                    className="inline-flex items-center rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-rose-600"
                  >
                    {entry.label}
                  </Link>
                </div>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <LocaleSwitch />
              <ThemeToggle />
            </div>
            <Magnetic className="hidden sm:block">
              <Button asChild size="sm">
                <Link href="/contacto">
                  {t.startProject} <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
            <button
              className="grid size-10 place-items-center rounded-xl border border-border bg-background/70 text-foreground lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mega menu panel */}
        <AnimatePresence>
          {open && (
            <MegaPanel
              entry={mainNav.find((e) => e.label === open)!}
              onMouseEnter={() => setOpen(open)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            nav={mainNav}
            ctaLabel={t.startProject}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function MegaPanel({
  entry,
  onMouseEnter,
}: {
  entry: NavEntry;
  onMouseEnter: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onMouseEnter}
      className="absolute inset-x-0 top-full hidden px-[max(1.25rem,calc((100vw-1360px)/2+1.25rem))] pt-3 lg:block"
    >
      <div className="overflow-hidden rounded-3xl border border-border/70 bg-background/85 shadow-card-hover backdrop-blur-2xl">
        <div className="grid grid-cols-12">
          <div className="col-span-8 grid grid-cols-2 gap-x-6 gap-y-1 p-6">
            {entry.columns?.map((col) => (
              <div key={col.title} className="space-y-1">
                <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  {col.title}
                </p>
                {col.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="group flex items-start gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-rose-50 dark:hover:bg-white/5"
                    >
                      {Icon ? (
                        <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-border bg-background text-rose-600 transition-colors group-hover:border-rose-200 group-hover:bg-brand-gradient group-hover:text-white">
                          <Icon className="size-4" />
                        </span>
                      ) : null}
                      <span>
                        <span className="block text-sm font-semibold text-foreground transition-colors group-hover:text-rose-700">
                          {item.label}
                        </span>
                        {item.description ? (
                          <span className="block text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          {entry.featured ? (
            <div className="group relative col-span-4 flex flex-col justify-center overflow-hidden p-7 text-white">
              <div className="absolute inset-0 bg-brand-gradient" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,.35),transparent_45%)]" />
              <div className="absolute -right-6 -top-6 size-32 rounded-full bg-white/15 blur-2xl" />
              <div className="relative">
                {entry.featured.topBlock ? (
                  <>
                    <Link href={entry.featured.topBlock.href} className="block">
                      <h4 className="font-display text-base font-bold leading-tight">
                        {entry.featured.topBlock.title}
                      </h4>
                      <p className="mt-1.5 text-xs leading-relaxed text-white/80">
                        {entry.featured.topBlock.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold">
                        {entry.featured.topBlock.cta}
                        <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </Link>
                    <div className="my-5 h-px bg-white/25" />
                  </>
                ) : null}
                <Link href={entry.featured.href} className="block">
                  <h4 className="font-display text-base font-bold leading-tight">
                    {entry.featured.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/80">
                    {entry.featured.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold">
                    {entry.featured.cta}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}

function MobileMenu({
  nav,
  ctaLabel,
  onClose,
}: {
  nav: NavEntry[];
  ctaLabel: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 top-0 z-40 lg:hidden"
    >
      <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -16, opacity: 0 }}
        transition={{ duration: 0.25 }}
        data-lenis-prevent
        className="relative h-full overflow-y-auto px-5 pb-10 pt-24"
      >
        <div className="mb-6 flex items-center gap-2">
          <LocaleSwitch />
          <ThemeToggle />
        </div>
        <nav className="space-y-6">
          {nav.map((entry) =>
            !entry.columns && entry.href ? (
              <Link
                key={entry.label}
                href={entry.href}
                onClick={onClose}
                className="block text-xs font-semibold uppercase tracking-[0.16em] text-rose-600"
              >
                {entry.label}
              </Link>
            ) : (
            <div key={entry.label}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-rose-600">
                {entry.label}
              </p>
              <div className="grid grid-cols-1 gap-1">
                {entry.columns?.flatMap((c) => c.items).map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label + item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-rose-50 dark:hover:bg-white/5"
                    >
                      {Icon ? <Icon className="size-4 text-rose-500" /> : null}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <Button asChild size="lg" className="mt-8 w-full">
          <Link href="/contacto" onClick={onClose}>
            {ctaLabel} <ArrowRight className="size-4" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}

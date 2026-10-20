'use client';

import * as React from 'react';
import { Link } from '@/components/i18n/link';
import { usePathname } from '@/i18n/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from '@/components/brand/logo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { LocaleSwitch } from '@/components/i18n/locale-switch';
import { getMainNav, type NavEntry } from '@/lib/navigation';
import { useLocale } from '@/i18n/provider';
import { ui } from '@/content/ui';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // Internal (canonical) path, e.g. "/servicios" for both /servicios and /en/services.
  const pathname = usePathname();
  const locale = useLocale();
  const mainNav = getMainNav(locale);
  const t = ui[locale].header;

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href?: string) => !!href && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
        scrolled || mobileOpen
          ? 'border-border bg-background/85 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      )}
    >
      {/* relative z-50 keeps the bar (logo + close toggle) above the mobile overlay (z-40). */}
      <div className="container-wide relative z-50 flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label={t.navLabel}>
          {mainNav.map((entry) => (
            <Link
              key={entry.label}
              href={entry.href!}
              aria-current={isActive(entry.href) ? 'page' : undefined}
              className={cn(
                'rounded-md px-3.5 py-2 text-sm font-medium transition-colors hover:text-foreground',
                isActive(entry.href) ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {entry.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden items-center sm:flex">
            <LocaleSwitch />
            <ThemeToggle />
          </div>
          <Button asChild size="sm" className="ml-2 hidden sm:inline-flex">
            <Link href="/contacto">
              {t.contact} <ArrowRight />
            </Link>
          </Button>
          <button
            className="ml-1 grid size-10 place-items-center rounded-md text-foreground hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t.closeMenu : t.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <MobileMenu
            nav={mainNav}
            contactLabel={t.contact}
            onClose={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileMenu({
  nav,
  contactLabel,
  onClose,
}: {
  nav: NavEntry[];
  contactLabel: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      data-lenis-prevent
      className="fixed inset-0 z-40 overflow-y-auto bg-background px-5 pb-10 pt-24 lg:hidden"
    >
      <nav className="border-t border-border">
        {[...nav, { label: contactLabel, href: '/contacto' }].map((entry, i) => (
          <Link
            key={entry.label}
            href={entry.href!}
            onClick={onClose}
            className="flex items-baseline gap-4 border-b border-border py-5 text-2xl font-semibold tracking-tight"
          >
            <span className="font-mono text-xs font-normal text-muted-foreground">0{i + 1}</span>
            {entry.label}
          </Link>
        ))}
      </nav>
      <div className="mt-8 flex items-center gap-1">
        <LocaleSwitch />
        <ThemeToggle />
      </div>
    </motion.div>
  );
}

'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
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
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const closeMenu = React.useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);
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
        scrolled
          ? 'border-border bg-background/85 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      )}
    >
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
            ref={menuButtonRef}
            className="ml-1 grid size-11 place-items-center rounded-md text-foreground hover:bg-muted lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label={t.openMenu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        nav={mainNav}
        contactLabel={t.contact}
        closeLabel={t.closeMenu}
        navLabel={t.navLabel}
        isActive={isActive}
        onClose={closeMenu}
      />
    </header>
  );
}

/*
 * Mobile navigation: a drawer that slides in from the right. It is portalled
 * to <body> because the header's backdrop-filter turns it into the containing
 * block for fixed descendants, which clipped the old overlay to the bar.
 */
function MobileMenu({
  open,
  nav,
  contactLabel,
  closeLabel,
  navLabel,
  isActive,
  onClose,
}: {
  open: boolean;
  nav: NavEntry[];
  contactLabel: string;
  closeLabel: string;
  navLabel: string;
  isActive: (href?: string) => boolean;
  onClose: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const ease = [0.22, 1, 0.36, 1] as const;

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={navLabel}
          className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1, transition: { duration: 0.32 } }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          {/* Panel */}
          <motion.aside
            data-lenis-prevent
            className="absolute inset-y-0 right-0 flex w-[86vw] max-w-sm flex-col overflow-y-auto bg-background shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease }}
          >
            <div className="flex h-16 shrink-0 items-center justify-end px-4">
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label={closeLabel}
                className="grid size-11 place-items-center rounded-md text-foreground hover:bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex-1 px-6 pt-4">
              <ul>
                {nav.map((entry, i) => {
                  const active = isActive(entry.href);
                  return (
                    <motion.li
                      key={entry.label}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 + i * 0.05, ease }}
                    >
                      <Link
                        href={entry.href!}
                        onClick={onClose}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between border-b border-border py-4 text-2xl font-semibold tracking-tight transition-colors',
                          active ? 'text-primary' : 'text-foreground hover:text-primary'
                        )}
                      >
                        {entry.label}
                        <ArrowRight className="size-5 opacity-40" />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-5 px-6 pb-8 pt-6">
              <Button asChild size="lg" className="w-full">
                <Link href="/contacto" onClick={onClose}>
                  {contactLabel} <ArrowRight />
                </Link>
              </Button>
              <div className="flex items-center gap-1">
                <LocaleSwitch />
                <ThemeToggle />
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

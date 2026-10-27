'use client';

import * as React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Link } from '@/components/i18n/link';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/i18n/provider';

type Consent = 'granted' | 'denied';

const STORAGE_KEY = 'elem-analytics-consent';
const OPEN_EVENT = 'elem:open-consent';

const labels = {
  es: {
    title: 'Cookies',
    text: 'Usamos cookies analíticas para entender, de forma agregada, cómo se usa el sitio. Solo se activan si las aceptás.',
    policy: 'Política de cookies',
    accept: 'Aceptar',
    reject: 'Rechazar',
    region: 'Consentimiento de cookies',
    settings: 'Configurar cookies',
  },
  en: {
    title: 'Cookies',
    text: 'We use analytics cookies to understand, in aggregate, how the site is used. They are only set if you accept them.',
    policy: 'Cookie policy',
    accept: 'Accept',
    reject: 'Reject',
    region: 'Cookie consent',
    settings: 'Cookie settings',
  },
};

function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : null;
  } catch {
    return null;
  }
}

/** Removes the _ga / _ga_<id> cookies GA4 sets on the site's root domain. */
function clearGaCookies() {
  const host = location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.split('=')[0].trim();
    if (!name.startsWith('_ga')) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

// Both choices look the same on purpose: rejecting is as easy as accepting.
const choiceCls =
  'flex-1 border border-background/30 text-background hover:bg-background/10 hover:text-background focus-visible:ring-background focus-visible:ring-offset-foreground';

/**
 * Cookie banner + GA4 loader. GA is not loaded at all until the visitor
 * accepts; the choice is kept in localStorage and can be changed from the
 * footer's "Cookie settings" link. With `load` false (dev) the banner works
 * but GA is never loaded.
 */
export function AnalyticsConsent({ gaId, load }: { gaId: string; load: boolean }) {
  const locale = useLocale();
  const t = labels[locale];
  // undefined = not read yet (SSR / first paint), so the banner never flashes.
  const [consent, setConsent] = React.useState<Consent | null | undefined>(undefined);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const stored = readConsent();
    setConsent(stored);
    setOpen(stored === null);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = (value: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Storage blocked: the choice applies to this page view only.
    }
    setOpen(false);
    if (value === 'denied' && consent === 'granted') {
      // gtag is already running; clear its cookies and reload to unload it.
      clearGaCookies();
      location.reload();
      return;
    }
    setConsent(value);
  };

  return (
    <>
      {load && consent === 'granted' && <GoogleAnalytics gaId={gaId} />}
      {open && (
        <div
          role="region"
          aria-label={t.region}
          // Inverted colors + strong shadow so it reads as an overlay, not page content.
          className="fixed inset-x-4 bottom-4 z-50 max-w-md rounded-lg bg-foreground p-5 text-background shadow-[0_12px_48px_-8px_rgba(0,0,0,0.45)] sm:left-6 sm:right-auto sm:bottom-6"
        >
          <p className="text-[15px] font-medium">{t.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-background/75">
            {t.text}{' '}
            <Link
              href="/legal/cookies"
              className="text-background underline decoration-background/40 underline-offset-4 hover:decoration-current"
            >
              {t.policy}
            </Link>
          </p>
          <div className="mt-4 flex gap-3">
            <Button size="sm" variant="ghost" className={choiceCls} onClick={() => choose('denied')}>
              {t.reject}
            </Button>
            <Button size="sm" variant="ghost" className={choiceCls} onClick={() => choose('granted')}>
              {t.accept}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

/** Footer link that reopens the consent banner. */
export function CookieSettingsButton({ className }: { className?: string }) {
  const locale = useLocale();
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
    >
      {labels[locale].settings}
    </button>
  );
}

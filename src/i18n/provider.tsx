'use client';

import * as React from 'react';
import { defaultLocale, type Locale } from './config';

const LocaleContext = React.createContext<Locale>(defaultLocale);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

/** Active locale inside client components. */
export function useLocale(): Locale {
  return React.useContext(LocaleContext);
}

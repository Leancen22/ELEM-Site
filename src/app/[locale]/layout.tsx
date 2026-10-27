import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { site, siteCopy } from '@/lib/site';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { SmoothScroll } from '@/components/motion/smooth-scroll';
import { JsonLd, organizationSchema } from '@/components/seo/json-ld';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { AnalyticsConsent } from '@/components/analytics/analytics-consent';
import { gaId, loadAnalytics } from '@/lib/analytics';
import { LocaleProvider } from '@/i18n/provider';
import { routing } from '@/i18n/routing';
import type { Locale } from '@/i18n/config';
import '../globals.css';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfaf8' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0c0d' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const keywords: Record<string, string[]> = {
  es: [
    'desarrollo de software a medida',
    'desarrollo web',
    'aplicaciones móviles',
    'sistemas a medida',
    'automatización de procesos',
    'integraciones empresariales',
    'modernización de sistemas',
    'consultoría tecnológica',
    'estudio de ingeniería de software',
  ],
  en: [
    'custom software development',
    'web development',
    'mobile apps',
    'custom systems',
    'process automation',
    'enterprise integrations',
    'legacy system modernization',
    'technology consulting',
    'software engineering studio',
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Non-locale paths (e.g. devtools/well-known probes) can fall into [locale];
  // guard so metadata generation doesn't crash on an unknown locale.
  if (!hasLocale(routing.locales, locale)) notFound();
  const copy = siteCopy[locale];
  const title = `${site.name} | ${copy.tagline}`;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: title,
      template: `${site.name} | %s`,
    },
    description: copy.description,
    applicationName: site.name,
    keywords: keywords[locale],
    authors: [{ name: site.legalName }],
    creator: site.legalName,
    alternates: {
      canonical: locale === 'es' ? '/' : '/en',
      languages: { es: '/', en: '/en', 'x-default': '/' },
    },
    icons: {
      // favicon.ico is served automatically via the app/favicon.ico convention.
      icon: { url: '/favicon.ico', type: 'image/x-icon' },
      apple: { url: '/favicon.ico', type: 'image/x-icon' },
    },
    openGraph: {
      type: 'website',
      locale: copy.ogLocale,
      url: site.url,
      siteName: site.name,
      title,
      description: copy.description,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: copy.description,
      images: ['/opengraph-image'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    manifest: '/manifest.webmanifest',
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale}>
            <LocaleProvider locale={locale}>
              <JsonLd data={organizationSchema(locale)} />
              <SmoothScroll />
              <Header />
              <main id="contenido">{children}</main>
              <Footer />
              {gaId && <AnalyticsConsent gaId={gaId} load={loadAnalytics} />}
            </LocaleProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

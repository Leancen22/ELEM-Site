import { site, siteCopy } from '@/lib/site';
import { defaultLocale, type Locale } from '@/i18n/config';

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, static, server-rendered content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema(locale: Locale = defaultLocale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/favicon.ico`,
    description: siteCopy[locale].description,
    email: site.email,
    // Teléfono oculto a pedido.
    // telephone: site.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle de la Innovación 12',
      addressLocality: 'Madrid',
      postalCode: '28010',
      addressCountry: 'ES',
    },
    sameAs: [site.social.linkedin, site.social.instagram],
  };
}

export function websiteSchema(locale: Locale = defaultLocale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    inLanguage: locale === 'en' ? 'en-US' : 'es-ES',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.url}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: input.name,
    name: input.name,
    description: input.description,
    url: `${site.url}/${input.slug}`,
    provider: {
      '@type': 'Organization',
      name: site.legalName,
      url: site.url,
    },
    areaServed: 'ES',
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

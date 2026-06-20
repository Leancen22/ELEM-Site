import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone, ShieldCheck, Zap } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { ContactForm } from '@/components/contact/contact-form';
import { site, siteCopy } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

const highlightIcons = [Clock, ShieldCheck, Zap];

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  contacto: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  highlights: { title: string; body: string }[];
  contactData: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Contacto · Hablemos de tu proyecto',
    metaDesc:
      'Cuéntanos tu reto y te respondemos en menos de 24 horas con un plan concreto. Ingeniería de software premium para tu empresa.',
    home: 'Inicio',
    contacto: 'Contacto',
    heroTitle: 'Hablemos de tu',
    heroHighlight: 'próximo proyecto',
    heroDesc:
      'Sin compromisos ni formularios eternos. Cuéntanos qué necesitas y te respondemos rápido, de ingeniero a ingeniero.',
    highlights: [
      { title: 'Respuesta en 24h', body: 'Un arquitecto senior revisa tu caso, no un comercial.' },
      { title: 'Confidencialidad', body: 'Firmamos NDA sin problema antes de entrar en detalle.' },
      { title: 'Plan concreto', body: 'Te proponemos enfoque, alcance y siguientes pasos.' },
    ],
    contactData: 'Datos de contacto',
  },
  en: {
    metaTitle: 'Contact · Let’s talk about your project',
    metaDesc:
      'Tell us about your challenge and we’ll reply within 24 hours with a concrete plan. Premium software engineering for your company.',
    home: 'Home',
    contacto: 'Contact',
    heroTitle: 'Let’s talk about your',
    heroHighlight: 'next project',
    heroDesc:
      'No commitments or endless forms. Tell us what you need and we’ll reply fast, engineer to engineer.',
    highlights: [
      { title: '24h response', body: 'A senior architect reviews your case, not a salesperson.' },
      { title: 'Confidentiality', body: 'We’re happy to sign an NDA before getting into detail.' },
      { title: 'A concrete plan', body: 'We propose approach, scope and next steps.' },
    ],
    contactData: 'Contact details',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = content[locale];
  return buildMetadata({ title: t.metaTitle, description: t.metaDesc, locale, href: '/contacto' });
}

export default async function ContactoPage() {
  const locale = await getLocale();
  const t = content[locale];
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, href: '/' },
          { name: t.contacto, href: '/contacto' },
        ])}
      />
      <PageHero
        eyebrow={t.contacto}
        title={t.heroTitle}
        highlight={t.heroHighlight}
        description={t.heroDesc}
        breadcrumbs={[
          { name: t.home, href: '/' },
          { name: t.contacto, href: '/contacto' },
        ]}
      />

      <Section className="pt-4">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Info column */}
          <Reveal className="space-y-8">
            <div className="space-y-3">
              {t.highlights.map((h, i) => {
                const HIcon = highlightIcons[i % highlightIcons.length];
                return (
                  <div
                    key={h.title}
                    className="flex items-start gap-4 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">
                      <HIcon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold">{h.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{h.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
              <h3 className="font-display text-base font-bold">{t.contactData}</h3>
              <div className="mt-4 space-y-3 text-sm">
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-rose-600">
                  <Mail className="size-4 text-rose-500" /> {site.email}
                </a>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-muted-foreground hover:text-rose-600">
                  <Phone className="size-4 text-rose-500" /> {site.phone}
                </a>
                {/* <p className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="size-4 text-rose-500" /> {siteCopy[locale].address}
                </p> */}
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="left">
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}

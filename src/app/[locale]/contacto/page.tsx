import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { ContactForm } from '@/components/contact/contact-form';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  contacto: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  nextTitle: string;
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
    heroTitle: 'Hablemos de tu proyecto.',
    heroHighlight: '',
    heroDesc:
      'Cuéntanos qué necesitas en pocas líneas. Te responde una persona técnica, no un comercial.',
    nextTitle: 'Qué pasa después',
    highlights: [
      { title: 'Te respondemos en 24 h hábiles', body: 'Revisamos tu mensaje y, si hace falta, te hacemos algunas preguntas.' },
      { title: 'Llamada de 30 minutos', body: 'Entendemos el contexto, los objetivos y las restricciones. Firmamos NDA si lo necesitas.' },
      { title: 'Propuesta concreta', body: 'Te enviamos enfoque, alcance, plazos y presupuesto. Sin compromiso.' },
    ],
    contactData: 'O escríbenos directamente',
  },
  en: {
    metaTitle: 'Contact · Let’s talk about your project',
    metaDesc:
      'Tell us about your challenge and we’ll reply within 24 hours with a concrete plan. Premium software engineering for your company.',
    home: 'Home',
    contacto: 'Contact',
    heroTitle: 'Let’s talk about your project.',
    heroHighlight: '',
    heroDesc:
      'Tell us what you need in a few lines. A technical person replies, not a salesperson.',
    nextTitle: 'What happens next',
    highlights: [
      { title: 'We reply within 24 business hours', body: 'We review your message and, if needed, ask a few questions.' },
      { title: 'A 30-minute call', body: 'We understand context, goals and constraints. We’ll sign an NDA if you need one.' },
      { title: 'A concrete proposal', body: 'We send approach, scope, timeline and budget. No commitment.' },
    ],
    contactData: 'Or email us directly',
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

      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.nextTitle}</p>
            <ol className="mt-5 border-t border-border">
              {t.highlights.map((h, i) => (
                <li key={h.title} className="grid grid-cols-[2.5rem_1fr] border-b border-border py-6">
                  <span className="font-mono text-sm text-primary">0{i + 1}</span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{h.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{h.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-10 text-sm text-muted-foreground">{t.contactData}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-1 inline-block text-xl font-semibold tracking-tight underline decoration-border underline-offset-[6px] hover:decoration-primary"
            >
              {site.email}
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}

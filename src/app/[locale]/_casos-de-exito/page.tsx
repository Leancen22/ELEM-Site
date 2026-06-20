import type { Metadata } from 'next';
import { Link } from '@/components/i18n/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/motion/reveal';
import { AnimatedCounter } from '@/components/motion/counter';
import { techLogos } from '@/components/visuals/tech-logos';
import { cases } from '@/content/cases';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { cn } from '@/lib/utils';

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  casos: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  heroStats: { v: number; s: string; l: string }[];
  cta: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Casos de éxito',
    metaDesc:
      'Plataformas críticas con resultados medibles: banca, e-commerce, sector público, salud, logística y educación. Así trabaja ELEM en producción.',
    home: 'Inicio',
    casos: 'Casos de Éxito',
    heroTitle: 'Resultados reales en empresas',
    heroHighlight: 'exigentes',
    heroDesc:
      'No mostramos maquetas. Mostramos plataformas en producción que mueven negocios de verdad.',
    heroStats: [
      { v: 320, s: '+', l: 'Proyectos' },
      { v: 14, s: '', l: 'Países' },
      { v: 99, s: '%', l: 'En plazo' },
      { v: 140, s: '+', l: 'Clientes' },
    ],
    cta: 'Quiero resultados así',
  },
  en: {
    metaTitle: 'Case studies',
    metaDesc:
      'Critical platforms with measurable results: banking, e-commerce, public sector, healthcare, logistics and education. This is how ELEM works in production.',
    home: 'Home',
    casos: 'Case Studies',
    heroTitle: 'Real results for demanding',
    heroHighlight: 'companies',
    heroDesc:
      'We don’t show mockups. We show platforms in production that move real businesses.',
    heroStats: [
      { v: 320, s: '+', l: 'Projects' },
      { v: 14, s: '', l: 'Countries' },
      { v: 99, s: '%', l: 'On time' },
      { v: 140, s: '+', l: 'Clients' },
    ],
    cta: 'I want results like these',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = content[locale];
  return buildMetadata({ title: t.metaTitle, description: t.metaDesc, locale, href: '/casos-de-exito' });
}

export default async function CasosPage() {
  const locale = await getLocale();
  const t = content[locale];
  const featured = cases[locale].filter((c) => c.featured);
  const rest = cases[locale].filter((c) => !c.featured);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, href: '/' },
          { name: t.casos, href: '/casos-de-exito' },
        ])}
      />
      <PageHero
        eyebrow={t.casos}
        title={t.heroTitle}
        highlight={t.heroHighlight}
        description={t.heroDesc}
        breadcrumbs={[
          { name: t.home, href: '/' },
          { name: t.casos, href: '/casos-de-exito' },
        ]}
      >
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.heroStats.map((m) => (
            <div key={m.l} className="rounded-2xl border border-border bg-card/60 p-5 text-center backdrop-blur">
              <div className="font-display text-3xl font-extrabold text-gradient">
                <AnimatedCounter value={m.v} suffix={m.s} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{m.l}</div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Featured */}
      <Section className="pt-4">
        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <div className={cn('relative h-52 overflow-hidden bg-gradient-to-br', cs.accent)}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,.35),transparent_55%)]" />
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-700">
                    {cs.sector}
                  </span>
                  <div className="absolute bottom-5 left-5 flex gap-2">
                    {cs.tech.map((techKey) => {
                      const Logo = techLogos[techKey];
                      return (
                        <span key={techKey} className="grid size-10 place-items-center rounded-xl border border-white/40 bg-white/90 shadow backdrop-blur">
                          <Logo className="size-6" />
                        </span>
                      );
                    })}
                  </div>
                </div>
                <div className="p-7">
                  <p className="text-sm font-semibold text-rose-600">{cs.client}</p>
                  <h2 className="mt-1.5 font-display text-xl font-bold leading-snug">
                    {cs.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {cs.summary}
                  </p>
                  <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-6">
                    {cs.kpis.map((k) => (
                      <div key={k.label}>
                        <div className="font-display text-2xl font-extrabold text-gradient">
                          {k.value}
                        </div>
                        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                          {k.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Rest grid */}
      <Section className="border-t border-border/60 bg-muted/30">
        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((cs, i) => (
            <Reveal key={cs.slug} delay={(i % 2) * 0.1}>
              <article className="group flex h-full flex-col rounded-2xl border border-border bg-background/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30">
                <div className="flex items-center justify-between">
                  <Badge>{cs.sector}</Badge>
                  <div className="flex gap-1.5">
                    {cs.tech.map((techKey) => {
                      const Logo = techLogos[techKey];
                      return (
                        <span key={techKey} className="grid size-8 place-items-center rounded-lg border border-border bg-card">
                          <Logo className="size-5" />
                        </span>
                      );
                    })}
                  </div>
                </div>
                <p className="mt-5 text-sm font-semibold text-rose-600">{cs.client}</p>
                <h2 className="mt-1 font-display text-lg font-bold leading-snug">
                  {cs.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{cs.impact}</p>
                <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-5">
                  {cs.kpis.map((k) => (
                    <div key={k.label}>
                      <div className="font-display text-lg font-extrabold text-gradient">
                        {k.value}
                      </div>
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {k.label}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
          >
            {t.cta} <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}

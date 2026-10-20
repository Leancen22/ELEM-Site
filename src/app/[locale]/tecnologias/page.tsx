import type { Metadata } from 'next';
import { Link } from '@/components/i18n/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { CtaFinal } from '@/components/sections/cta-final';
import { techPages } from '@/content/tech';
import { devops } from '@/lib/navigation';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  tech: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  devopsLabel: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Tecnologías · El stack de ELEM',
    metaDesc:
      'Elegimos la tecnología por sus méritos: Drupal, Next.js, Java + Spring Boot y Python, operados con estándares de ingeniería y prácticas DevOps.',
    home: 'Inicio',
    tech: 'Tecnologías',
    heroTitle: 'Pocas tecnologías, dominadas a fondo.',
    heroHighlight: '',
    heroDesc:
      'Elegimos cada tecnología por sus méritos y la operamos con disciplina de ingeniería. Estas son las plataformas con las que construimos.',
    devopsLabel: 'DevOps & herramientas',
  },
  en: {
    metaTitle: 'Technologies · The ELEM stack',
    metaDesc:
      'We choose technology on its merits: Drupal, Next.js, Java + Spring Boot and Python, run to engineering standards with DevOps practices.',
    home: 'Home',
    tech: 'Technologies',
    heroTitle: 'A few technologies, mastered in depth.',
    heroHighlight: '',
    heroDesc:
      'We choose each technology on its merits and run it with engineering discipline. These are the platforms we build with.',
    devopsLabel: 'DevOps & tools',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = content[locale];
  return buildMetadata({ title: t.metaTitle, description: t.metaDesc, locale, href: '/tecnologias' });
}

export default async function TechnologiesPage() {
  const locale = await getLocale();
  const t = content[locale];
  const pages = Object.values(techPages[locale]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, href: '/' },
          { name: t.tech, href: '/tecnologias' },
        ])}
      />
      <PageHero
        eyebrow={t.tech}
        title={t.heroTitle}
        highlight={t.heroHighlight}
        description={t.heroDesc}
        breadcrumbs={[
          { name: t.home, href: '/' },
          { name: t.tech, href: '/tecnologias' },
        ]}
      />

      <Section className="pt-12 sm:pt-16">
        <ol className="border-t border-border">
          {pages.map((page, i) => (
            <Reveal as="li" key={page.slug} delay={i * 0.04}>
              <Link
                href={`/tecnologias/${page.slug}`}
                className="group grid gap-3 border-b border-border py-9 sm:grid-cols-[3rem_1fr_1.4fr_auto] sm:gap-8"
              >
                <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
                    {page.name}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{page.eyebrow}</p>
                </div>
                <p className="max-w-xl leading-relaxed text-muted-foreground">{page.hero.description}</p>
                <ArrowUpRight className="hidden size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
              </Link>
            </Reveal>
          ))}
        </ol>

        <p className="mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{t.devopsLabel}</span>
          <span className="text-foreground/80">{devops[locale].map((tool) => tool.label).join(' · ')}</span>
        </p>
      </Section>

      <CtaFinal />
    </>
  );
}

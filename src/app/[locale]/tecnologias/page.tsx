import type { Metadata } from 'next';
import { Link } from '@/components/i18n/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Stagger, StaggerItem } from '@/components/motion/reveal';
import { techPages } from '@/content/tech';
import { techLogos } from '@/components/visuals/tech-logos';
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
    heroTitle: 'Un stack moderno,',
    heroHighlight: 'sin atajos',
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
    heroTitle: 'A modern stack,',
    heroHighlight: 'no shortcuts',
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

      <Section className="pt-6">
        <Stagger className="grid gap-5 sm:grid-cols-2">
          {pages.map((page) => {
            const Logo = techLogos[page.key];
            return (
              <StaggerItem key={page.slug}>
                <Link href={`/tecnologias/${page.slug}`} className="group block h-full">
                  <article className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30">
                    <div className="flex items-start justify-between">
                      <span className="grid size-14 place-items-center rounded-2xl border border-white/60 bg-white/80 shadow-card backdrop-blur dark:border-white/10 dark:bg-white/5">
                        <Logo className="size-9" />
                      </span>
                      <span className="grid size-9 place-items-center rounded-full border border-border bg-background/70 text-rose-600 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                    <h2 className="mt-5 font-display text-xl font-bold text-foreground">{page.name}</h2>
                    <p className="mt-1 text-sm font-medium text-rose-500">{page.eyebrow}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {page.hero.description}
                    </p>
                  </article>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* DevOps & tools */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border/60 pt-10">
          <span className="text-sm font-medium text-muted-foreground">{t.devopsLabel}</span>
          {devops[locale].map((tool) => (
            <span key={tool.label} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80">
              {tool.label}
            </span>
          ))}
        </div>
      </Section>
    </>
  );
}

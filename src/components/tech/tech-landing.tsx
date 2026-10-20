import { Link } from '@/components/i18n/link';
import { ArrowRight } from 'lucide-react';
import type { TechPage } from '@/content/tech';
import type { Locale } from '@/i18n/config';
import { ui } from '@/content/ui';
import { Section, SectionHeader } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Faq } from '@/components/ui/faq';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Reveal } from '@/components/motion/reveal';
import { CtaFinal } from '@/components/sections/cta-final';

export function TechLanding({ page, locale }: { page: TechPage; locale: Locale }) {
  const t = ui[locale].tech;

  return (
    <>
      {/* HERO */}
      <section className="bg-wash border-b border-border pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { name: t.breadcrumbHome, href: '/' },
              { name: t.breadcrumbTech, href: '/tecnologias' },
              { name: page.name, href: `/tecnologias/${page.slug}` },
            ]}
          />
          <Reveal className="mt-10 max-w-4xl">
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              {page.hero.title} {page.hero.highlight}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {page.hero.description}
            </p>
            <Button asChild size="lg" className="mt-10">
              <Link href="/contacto">
                {t.ctaTalk} <ArrowRight />
              </Link>
            </Button>
          </Reveal>

          <dl className="mt-16 grid grid-cols-2 border-t border-border lg:grid-cols-4">
            {page.stats.map((s, i) => (
              <div
                key={s.label}
                className={`border-b border-border py-6 pr-4 lg:border-b-0 ${i % 2 === 1 ? 'border-l pl-6' : ''} ${i >= 2 ? 'lg:border-l lg:pl-6' : ''}`}
              >
                <dt className="text-sm text-muted-foreground">{s.label}</dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* BENEFITS */}
      <Section>
        <SectionHeader
          eyebrow={t.benefitsEyebrow}
          title={`${t.benefitsTitlePre} ${page.name} ${t.benefitsTitleMid} ELEM`}
        />
        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {page.benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 2) * 0.05} className="border-t border-foreground/80 pt-6">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{b.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{b.description}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ARCHITECTURE */}
      <section className="bg-surface border-y border-border py-24 sm:py-32">
        <div className="container-wide">
          <div className="flex max-w-3xl flex-col gap-5">
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl">
              {page.architecture.title}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{page.architecture.description}</p>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
            {page.architecture.layers.map((layer, i) => (
              <Reveal as="li" key={layer.name} delay={i * 0.08} className="bg-card p-7">
                <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                <h3 className="mt-6 text-lg font-semibold">{layer.name}</h3>
                <ul className="mt-4 space-y-2">
                  {layer.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* USE CASES */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader
            eyebrow={t.useCasesEyebrow}
            title={t.useCasesTitle.replace('{name}', page.name)}
            description={t.useCasesDesc.replace('{name}', page.name)}
          />
          <ul className="border-t border-border">
            {page.useCases.map((uc) => (
              <li key={uc.title} className="border-b border-border py-6">
                <h3 className="text-lg font-semibold tracking-tight">{uc.title}</h3>
                <p className="mt-1.5 text-muted-foreground">{uc.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-14 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {t.integrationsEyebrow}
          </span>
          <span className="text-foreground/80">{page.integrations.join(' · ')}</span>
        </p>
      </Section>

      {/* FAQ */}
      <Section className="bg-surface border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeader
            eyebrow={t.faqEyebrow}
            title={`${t.faqTitlePre} ${t.faqAccent}`}
            description={t.faqDesc}
          />
          <Faq faqs={page.faqs} />
        </div>
      </Section>

      <CtaFinal title={t.ctaTitle.replace('{name}', page.name)} description={t.ctaDesc} />
    </>
  );
}

import { Link } from '@/components/i18n/link';
import { ArrowRight, ArrowUpRight, Check, Plug } from 'lucide-react';
import type { TechPage } from '@/content/tech';
import type { Locale } from '@/i18n/config';
import { ui } from '@/content/ui';
import { Section, SectionHeader } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Faq } from '@/components/ui/faq';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { Magnetic } from '@/components/motion/magnetic';
import { Aurora } from '@/components/visuals/aurora';
import { CodeWindow } from '@/components/visuals/code-window';
import { techLogos } from '@/components/visuals/tech-logos';
import { codeSamples } from './code-samples';

export function TechLanding({ page, locale }: { page: TechPage; locale: Locale }) {
  const Logo = techLogos[page.key];
  const t = ui[locale].tech;
  const withName = (tpl: string) => {
    const [pre, post] = tpl.split('{name}');
    return (
      <>
        {pre}
        <span className="text-gradient">{page.name}</span>
        {post}
      </>
    );
  };

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-36 [@media(max-height:860px)]:pt-24 [@media(max-height:760px)]:pt-20 [@media(max-height:700px)]:pt-16">
        <Aurora />
        <div className="absolute inset-0 bg-grid opacity-[0.18] mask-fade-b" />
        <div className="container-wide relative">
          <Breadcrumbs
            items={[
              { name: t.breadcrumbHome, href: '/' },
              { name: t.breadcrumbTech, href: '/tecnologias' },
              { name: page.name, href: `/tecnologias/${page.slug}` },
            ]}
          />
          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 [@media(max-height:820px)]:mt-6 [@media(max-height:820px)]:gap-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-14 place-items-center rounded-2xl border border-white/60 bg-white/80 shadow-card backdrop-blur dark:border-white/10 dark:bg-white/5">
                  <Logo className="size-9" />
                </span>
                <span className="eyebrow">{page.eyebrow}</span>
              </div>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl [@media(max-height:820px)]:mt-4 [@media(max-height:760px)]:lg:!text-5xl">
                {page.hero.title}{' '}
                <span className="text-gradient-animated">{page.hero.highlight}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {page.hero.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic>
                  <Button asChild size="lg">
                    <Link href="/contacto">
                      {t.ctaTalk} <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </Magnetic>
                {/* Oculto: casos de éxito desactivados (empresa nueva, sin referencias).
                <Button asChild size="lg" variant="secondary">
                  <Link href="/casos-de-exito">{t.ctaCases}</Link>
                </Button>
                */}
              </div>
            </div>

            <Reveal direction="left" className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-gradient opacity-20 blur-3xl" />
              <CodeWindow
                title={codeSamples[page.slug]?.title ?? 'elem.ts'}
                lines={codeSamples[page.slug]?.lines ?? []}
              />
            </Reveal>
          </div>

          {/* stats */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 lg:grid-cols-4 [@media(max-height:820px)]:mt-8 [@media(max-height:720px)]:mt-6">
            {page.stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 0.08}
                className="rounded-2xl border border-border bg-card/60 p-5 text-center backdrop-blur"
              >
                <div className="font-display text-3xl font-extrabold text-gradient sm:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <Section>
        <SectionHeader
          eyebrow={t.benefitsEyebrow}
          title={
            <>
              {t.benefitsTitlePre} {page.name} {t.benefitsTitleMid}{' '}
              <span className="text-gradient">ELEM</span>
            </>
          }
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {page.benefits.map((b) => (
            <StaggerItem key={b.title}>
              <div className="group flex h-full gap-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                  <Icon name={b.icon} className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{b.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ARCHITECTURE */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-mesh-rose opacity-50" />
        <div className="container-wide relative">
          <SectionHeader
            eyebrow={t.archEyebrow}
            title={page.architecture.title}
            description={page.architecture.description}
          />
          <div className="mt-14 grid gap-4 md:grid-cols-4">
            {page.architecture.layers.map((layer, i) => (
              <Reveal key={layer.name} delay={i * 0.1} className="relative">
                <div className="relative h-full rounded-2xl border border-border bg-card/80 p-5 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-rose-500">
                      0{i + 1}
                    </span>
                    {i < page.architecture.layers.length - 1 && (
                      <ArrowRight className="hidden size-4 text-rose-300 md:block" />
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold">{layer.name}</h3>
                  <ul className="mt-3 space-y-2">
                    {layer.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="size-1.5 rounded-full bg-brand-gradient" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            align="left"
            eyebrow={t.useCasesEyebrow}
            title={withName(t.useCasesTitle)}
            description={t.useCasesDesc.replace('{name}', page.name)}
          />
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {page.useCases.map((uc) => (
              <StaggerItem key={uc.title}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-colors hover:border-rose-200 dark:hover:border-rose-500/30">
                  <Check className="size-5 text-rose-500" />
                  <h3 className="mt-3 font-display text-base font-bold">{uc.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {uc.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* INTEGRATIONS */}
      <Section className="border-y border-border/60 bg-muted/30">
        <div className="flex flex-col items-center text-center">
          <span className="eyebrow">
            <Plug className="size-3.5" /> {t.integrationsEyebrow}
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold sm:text-3xl">
            {t.integrationsTitle}
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {page.integrations.map((tech) => (
              <Badge key={tech} variant="outline" className="bg-background px-4 py-2 text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            align="left"
            eyebrow={t.faqEyebrow}
            title={
              <>
                {t.faqTitlePre} <span className="text-gradient">{t.faqAccent}</span>
              </>
            }
            description={t.faqDesc}
          />
          <Faq faqs={page.faqs} />
        </div>
      </Section>

      {/* RELATED + CTA */}
      <Section className="pt-0">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-500 via-fuchsia-600 to-purple-700 px-6 py-14 text-white shadow-glow-lg sm:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,.25),transparent_45%)]" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-4xl">
                {t.ctaTitle.replace('{name}', page.name)}
              </h2>
              <p className="mt-3 max-w-xl text-white/85">{t.ctaDesc}</p>
              <div className="mt-6 flex items-center gap-2">
                <span className="text-sm text-white/70">{t.relatedStack}</span>
                <div className="flex gap-2">
                  {page.related.map((key) => {
                    const RLogo = techLogos[key];
                    return (
                      <span
                        key={key}
                        className="grid size-9 place-items-center rounded-xl bg-white/90"
                      >
                        <RLogo className="size-5" />
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <Magnetic>
              <Button asChild size="lg" className="bg-white text-rose-700 hover:bg-white">
                <Link href="/contacto">
                  {t.startProject} <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </Magnetic>
          </div>
        </div>
      </Section>
    </>
  );
}

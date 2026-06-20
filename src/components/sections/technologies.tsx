'use client';

import { Link } from '@/components/i18n/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { SectionHeader, GradientTitle } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { TiltCard } from '@/components/motion/tilt-card';
import { techLogos } from '@/components/visuals/tech-logos';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';
import { cn } from '@/lib/utils';

export function Technologies() {
  const content = home[useLocale()];
  const techCards = content.techCards;
  const tools = content.tools;
  const t = content.sections.technologies;
  return (
    <section id="tecnologias" className="section-rose relative py-20 sm:py-28">
      <div className="container-wide">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={<GradientTitle lead={t.lead} accent={t.accent} />}
          description={t.description}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {techCards.map((tech, i) => {
            const Logo = techLogos[tech.key];
            const isWide = i >= 3;
            return (
              <Reveal
                key={tech.key}
                delay={i * 0.07}
                className={cn(isWide && 'lg:col-span-1', i === 4 && 'sm:col-span-2 lg:col-span-1')}
              >
                <Link href={tech.href} className="group block h-full perspective">
                  <TiltCard className="h-full">
                    <article className="card-gradient-border relative flex h-full flex-col overflow-hidden p-6 shadow-card transition-shadow duration-300 group-hover:shadow-card-hover">
                      <div
                        className={cn(
                          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60',
                          tech.accent
                        )}
                      />
                      <div className="relative flex items-start justify-between">
                        <div className="grid size-16 place-items-center rounded-2xl border border-white/60 bg-white/80 shadow-card backdrop-blur dark:border-white/10 dark:bg-white/5">
                          <Logo className="size-10" />
                        </div>
                        <span className="grid size-9 place-items-center rounded-full border border-border bg-background/70 text-rose-600 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>

                      <h3 className="relative mt-5 font-display text-2xl font-bold text-foreground">
                        {tech.name}
                      </h3>
                      <p className="relative mt-1.5 text-sm text-muted-foreground">
                        {tech.tagline}
                      </p>

                      <ul className="relative mt-6 space-y-2 border-t border-border/60 pt-5">
                        {tech.useCases.map((uc) => (
                          <li
                            key={uc}
                            className="flex items-center gap-2 text-sm text-foreground/80"
                          >
                            <Check className="size-4 text-rose-500" />
                            {uc}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </TiltCard>
                </Link>
              </Reveal>
            );
          })}

          {/* CTA tile */}
          <Reveal delay={0.35} className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/servicios#stack"
              className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-[var(--radius)] bg-brand-gradient p-6 text-white shadow-glow"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,.3),transparent_45%)]" />
              <div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/15 blur-2xl transition-transform duration-500 group-hover:scale-125" />
              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                  {t.ctaKicker}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight">
                  {t.ctaTitle}
                </h3>
              </div>
              <span className="relative inline-flex items-center gap-2 text-sm font-semibold">
                {t.ctaCta}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Tools / ecosystem */}
        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <span className="text-sm font-medium text-muted-foreground">
            {t.toolsLabel}
          </span>
          {tools.map((tool) => {
            const ToolLogo = tool.key ? techLogos[tool.key] : null;
            return (
              <span
                key={tool.name}
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80"
              >
                {ToolLogo ? <ToolLogo className="size-5" /> : null}
                {tool.name}
              </span>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

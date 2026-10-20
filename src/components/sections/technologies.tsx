'use client';

import { Link } from '@/components/i18n/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

/** Core stack as a typographic list (no logos). */
export function Technologies() {
  const content = home[useLocale()];
  const techCards = content.techCards;
  const tools = content.tools;
  const t = content.sections.technologies;
  return (
    <section id="tecnologias" className="scroll-mt-20 bg-surface border-y border-border py-24 sm:py-32">
      <div className="container-wide">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader eyebrow={t.eyebrow} title={t.lead} description={t.description} />
          <Link
            href="/tecnologias"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
          >
            {t.more}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {techCards.map((tech, i) => (
            <Reveal key={tech.key} delay={i * 0.05} className="bg-background">
              <Link href={tech.href} className="group flex h-full flex-col p-7 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-3xl">
                    {tech.name}
                  </h3>
                  <ArrowUpRight className="mt-1 size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{tech.tagline}</p>
                <p className="mt-6 text-sm text-foreground/80">{tech.useCases.join(' · ')}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {t.toolsLabel}
          </span>
          <span className="text-foreground/80">{tools.map((tool) => tool.name).join(' · ')}</span>
        </p>
      </div>
    </section>
  );
}

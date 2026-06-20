'use client';

import { Link } from '@/components/i18n/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeader, GradientTitle } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { techLogos } from '@/components/visuals/tech-logos';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';
import { cn } from '@/lib/utils';

export function CaseStudies() {
  const content = home[useLocale()];
  const caseStudies = content.caseStudies;
  const t = content.sections.caseStudies;
  return (
    <section id="casos" className="section-rose py-20 sm:py-28">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            eyebrow={t.eyebrow}
            title={<GradientTitle lead={t.lead} accent={t.accent} />}
            description={t.description}
          />
          <Button asChild variant="secondary" className="shrink-0">
            <Link href="/casos-de-exito">
              {t.viewAll} <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.client} delay={i * 0.1}>
              <Link
                href="/casos-de-exito"
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                {/* visual header */}
                <div className={cn('relative h-44 overflow-hidden bg-gradient-to-br', cs.accent)}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,.4),transparent_55%)]" />
                  <div className="absolute inset-0 bg-grid opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center gap-3">
                    {cs.tech.map((t) => {
                      const Logo = techLogos[t];
                      return (
                        <div
                          key={t}
                          className="grid size-12 place-items-center rounded-2xl border border-white/40 bg-white/90 shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110"
                        >
                          <Logo className="size-7" />
                        </div>
                      );
                    })}
                  </div>
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-700 shadow">
                    {cs.sector}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-semibold text-rose-600">{cs.client}</p>
                  <h3 className="mt-1.5 font-display text-lg font-bold leading-snug text-foreground">
                    {cs.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {cs.impact}
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-5">
                    {cs.kpis.map((k) => (
                      <div key={k.label}>
                        <div className="font-display text-xl font-extrabold text-gradient">
                          {k.value}
                        </div>
                        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                          {k.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import { Reveal } from '@/components/motion/reveal';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

/** Four-phase process on a tinted surface. Reused on /nosotros. */
export function Methodology() {
  const content = home[useLocale()];
  const methodology = content.methodology;
  const t = content.sections.methodology;

  return (
    <section id="metodologia" className="bg-surface scroll-mt-20 border-y border-border py-24 sm:py-32">
      <div className="container-wide">
        <div className="flex max-w-3xl flex-col gap-5">
          <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]">
            {t.lead}
          </h2>
          {t.description ? (
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.description}
            </p>
          ) : null}
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {methodology.map((m, i) => (
            <Reveal as="li" key={m.step} delay={i * 0.08} className="flex flex-col bg-card p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm text-muted-foreground">{m.step}</span>
                <span className="h-1 w-10 rounded-full bg-brand-gradient" />
              </div>
              <h3 className="mt-10 text-xl font-semibold tracking-tight">{m.title}</h3>
              <p className="mt-1 text-sm font-medium text-primary">{m.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.description}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

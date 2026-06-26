'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeader, GradientTitle } from '@/components/ui/section';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

export function Methodology() {
  const content = home[useLocale()];
  const methodology = content.methodology;
  const t = content.sections.methodology;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="metodologia" className="section-light relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.5] mask-fade-b" />
      <div className="container-wide relative">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={<GradientTitle lead={t.lead} accent={t.accent} />}
          description={t.description}
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          {/* track */}
          <div className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-0.5 bg-border" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] top-2 w-0.5 bg-brand-gradient"
          />

          <div className="space-y-6">
            {methodology.map((m, i) => {
              const dark = i % 2 === 0;
              return (
                <motion.div
                  key={m.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex items-stretch gap-6 pl-14"
                >
                  <div className="absolute left-[6px] top-5 z-10 grid size-7 place-items-center rounded-full bg-brand-gradient text-[11px] font-bold text-white shadow-glow">
                    {i + 1}
                  </div>
                  <div
                    className={`flex-1 rounded-2xl p-6 backdrop-blur transition-colors ${
                      dark
                        ? 'bg-foreground text-background hover:bg-foreground/95'
                        : 'border border-border bg-card/70 text-foreground hover:border-rose-200 dark:hover:border-rose-500/30'
                    }`}
                  >
                    <span
                      className={`font-mono text-xs font-semibold uppercase tracking-wide ${
                        dark ? 'text-rose-300 dark:text-rose-600' : 'text-rose-500'
                      }`}
                    >
                      {m.step} · {m.title}
                    </span>
                    <h3 className="mt-1.5 font-display text-xl font-bold">
                      {m.tagline}
                    </h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        dark ? 'text-background/70' : 'text-muted-foreground'
                      }`}
                    >
                      {m.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

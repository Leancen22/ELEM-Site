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
          <div className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[27px] top-2 w-0.5 bg-brand-gradient md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-8">
            {methodology.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={m.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-start gap-6 md:w-1/2 ${
                    left
                      ? 'md:ml-0 md:pr-12 md:text-right'
                      : 'md:ml-auto md:flex-row-reverse md:pl-12 md:text-left'
                  }`}
                >
                  <div
                    className={`absolute left-[14px] top-1.5 z-10 grid size-7 place-items-center rounded-full bg-brand-gradient text-[11px] font-bold text-white shadow-glow md:left-auto ${
                      left ? 'md:-right-[14px]' : 'md:-left-[14px]'
                    }`}
                  >
                    {i + 1}
                  </div>
                  <div className="ml-14 flex-1 rounded-2xl border border-border bg-card/70 p-5 backdrop-blur transition-colors hover:border-rose-200 md:ml-0 dark:hover:border-rose-500/30">
                    <span className="font-mono text-xs font-semibold text-rose-500">
                      {m.step}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                      {m.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
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

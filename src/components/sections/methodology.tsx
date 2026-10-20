'use client';

import * as React from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/components/i18n/link';
import { Reveal } from '@/components/motion/reveal';
import { useParallaxEnabled, useSettleProgress } from '@/components/motion/parallax';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';
import type { MethodologyStep } from '@/content/home';

/*
 * Four-phase process on a tinted surface. Reused on /nosotros.
 * On scroll a brand-gradient rail fills across the phases; each card rises
 * into place in turn and its marker lights up as the rail reaches it.
 */
/**
 * `showLink` adds a link to the full /como-trabajamos page (home); `hideHeader`
 * drops the heading where the page hero already says it (/como-trabajamos).
 */
export function Methodology({
  showLink = false,
  hideHeader = false,
}: {
  showLink?: boolean;
  hideHeader?: boolean;
}) {
  const content = home[useLocale()];
  const methodology = content.methodology;
  const t = content.sections.methodology;
  const ref = React.useRef<HTMLElement>(null);
  const enabled = useParallaxEnabled();
  const progress = useSettleProgress(ref);
  const rail = useTransform(progress, [0.2, 1], [0, 1]);

  return (
    <section ref={ref} id="metodologia" className="bg-surface scroll-mt-20 border-y border-border py-24 sm:py-32">
      <div className="container-wide">
        {hideHeader ? null : (
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
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
          {showLink ? (
            <Link
              href="/como-trabajamos"
              className="group inline-flex shrink-0 items-center gap-2 py-1 text-[15px] font-medium underline-offset-4 hover:underline"
            >
              {t.more}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </Reveal>
        )}

        {/* Progress rail across the phases */}
        <div aria-hidden className="mt-14 hidden h-1 overflow-hidden rounded-full bg-border lg:block">
          <motion.div
            className="h-full origin-left rounded-full bg-brand-gradient"
            style={enabled ? { scaleX: rail } : undefined}
          />
        </div>

        <Reveal amount={0.05}>
          <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {methodology.map((m, i) => (
              <StepCard key={m.step} step={m} index={i} progress={progress} enabled={enabled} />
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function StepCard({
  step,
  index,
  progress,
  enabled,
}: {
  step: MethodologyStep;
  index: number;
  progress: MotionValue<number>;
  enabled: boolean;
}) {
  // Each card starts lower than the previous one and settles in turn.
  const y = useTransform(progress, [0, 0.45 + index * 0.15], [70 + index * 35, 0]);
  const opacity = useTransform(progress, [0.05 + index * 0.1, 0.4 + index * 0.12], [0, 1]);
  // Its marker lights up when the rail reaches its quarter.
  const marker = useTransform(progress, [0.2 + index * 0.2, 0.4 + index * 0.2], [0, 1]);

  return (
    <motion.li
      className="flex flex-col rounded-lg border border-border bg-card p-7 sm:p-8"
      style={enabled ? { y, opacity } : undefined}
    >
      <div className="flex items-center justify-between">
        <span className="text-[15px] tabular-nums text-muted-foreground">{step.step}</span>
        <span className="h-1 w-10 overflow-hidden rounded-full bg-border">
          <motion.span
            className="block h-full origin-left rounded-full bg-brand-gradient"
            style={enabled ? { scaleX: marker } : undefined}
          />
        </span>
      </div>
      <h3 className="mt-10 text-xl font-semibold tracking-tight">{step.title}</h3>
      <p className="mt-1 text-[15px] font-medium text-primary">{step.tagline}</p>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground">{step.description}</p>
    </motion.li>
  );
}

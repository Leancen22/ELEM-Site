'use client';

import * as React from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { useParallaxEnabled, useSettleProgress } from '@/components/motion/parallax';
import { home, type Principle } from '@/content/home';
import { useLocale } from '@/i18n/provider';

/*
 * "Why ELEM": four working principles, text only. On scroll the heading slides
 * in and each column's top rule draws left to right, one after another, with
 * its text following it.
 */
export function Benefits() {
  const content = home[useLocale()];
  const principles = content.principles;
  const t = content.sections.principles;
  const ref = React.useRef<HTMLElement>(null);
  const enabled = useParallaxEnabled();
  const progress = useSettleProgress(ref);
  const headX = useTransform(progress, [0, 0.5], [-80, 0]);
  const headOpacity = useTransform(progress, [0, 0.4], [0, 1]);

  return (
    <section ref={ref} id="por-que-elem" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-wide">
        <motion.div style={enabled ? { x: headX, opacity: headOpacity } : undefined}>
          <SectionHeader eyebrow={t.eyebrow} title={t.lead} description={t.description} />
        </motion.div>
        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {principles.map((p, i) =>
            enabled ? (
              <PrincipleItem key={p.title} principle={p} index={i} progress={progress} />
            ) : (
              <Reveal key={p.title} delay={i * 0.06} className="border-t border-foreground/80 pt-6">
                <PrincipleBody principle={p} index={i} />
              </Reveal>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function PrincipleItem({
  principle,
  index,
  progress,
}: {
  principle: Principle;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.15 + index * 0.12;
  const line = useTransform(progress, [start, start + 0.3], [0, 1]);
  const opacity = useTransform(progress, [start + 0.1, start + 0.35], [0, 1]);
  const y = useTransform(progress, [start + 0.1, start + 0.35], [24, 0]);

  return (
    <div>
      <motion.div aria-hidden className="h-px origin-left bg-foreground/80" style={{ scaleX: line }} />
      <motion.div className="pt-6" style={{ opacity, y }}>
        <PrincipleBody principle={principle} index={index} />
      </motion.div>
    </div>
  );
}

function PrincipleBody({ principle, index }: { principle: Principle; index: number }) {
  return (
    <>
      <span className="text-sm tabular-nums text-muted-foreground">0{index + 1}</span>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{principle.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{principle.body}</p>
    </>
  );
}

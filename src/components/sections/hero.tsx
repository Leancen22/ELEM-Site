'use client';

import * as React from 'react';
import { Link } from '@/components/i18n/link';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';
import { ParallaxWash, useParallaxEnabled } from '@/components/motion/parallax';

const ease = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease },
  }),
};

export function Hero() {
  const t = home[useLocale()].sections.hero;
  const ref = React.useRef<HTMLElement>(null);
  // 0 while the hero fills the screen → 1 once it has scrolled out.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const parallax = useParallaxEnabled();
  // The copy lags behind (moves down) and fades while the bars race up.
  const textY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden border-b border-border pb-24 pt-36 sm:pb-32 sm:pt-44">
      <ParallaxWash />
      <div className="container-wide">
        {/* Headline across the full width (2 lines on desktop, 3 on a phone);
            below it the copy and actions, with the isotype bars on the right. */}
        <motion.div className="relative z-10" style={parallax ? { y: textY, opacity: textOpacity } : undefined}>
        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="max-w-[24ch] text-[2.25rem] font-semibold leading-[1.04] tracking-[-0.035em] text-foreground sm:max-w-[20ch] sm:text-6xl lg:max-w-none lg:text-[4.5rem] xl:text-[5rem]"
        >
          {t.title}
        </motion.h1>
        </motion.div>

        <div className="mt-8 grid items-center gap-14 lg:mt-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <motion.div style={parallax ? { y: textY, opacity: textOpacity } : undefined}>
            <motion.p
              custom={2}
              variants={fade}
              initial="hidden"
              animate="show"
              className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              {t.description}
            </motion.p>
            <motion.div
              custom={3}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg">
                <Link href="/contacto">
                  {t.ctaPrimary} <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/servicios">{t.ctaSecondary}</Link>
              </Button>
            </motion.div>
          </motion.div>

          <BrandBars progress={scrollYProgress} />
        </div>

      </div>
    </section>
  );
}

/**
 * The ELEM isotype (three bars forming an "E") drawn large as the hero's
 * signature element. On scroll each bar travels at its own speed, so the "E"
 * briefly comes apart and settles as the hero leaves the screen.
 */
function BrandBars({ progress }: { progress: MotionValue<number> }) {
  const enabled = useParallaxEnabled();
  const top = useTransform(progress, [0, 1], [0, -420]);
  const middle = useTransform(progress, [0, 1], [0, -230]);
  const bottom = useTransform(progress, [0, 1], [0, -70]);
  const bars = [
    { width: '100%', className: 'bg-brand-gradient', y: top },
    { width: '72%', className: 'bg-brand-gradient-soft', y: middle },
    { width: '100%', className: 'bg-brand-gradient', y: bottom },
  ];
  return (
    <div aria-hidden className="relative z-0 hidden flex-col gap-5 lg:flex">
      {bars.map((bar, i) => (
        <motion.div key={i} style={enabled ? { y: bar.y } : undefined}>
          <motion.div
            className={`h-12 origin-left rounded-full xl:h-14 ${bar.className}`}
            style={{ width: bar.width }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease }}
          />
        </motion.div>
      ))}
    </div>
  );
}

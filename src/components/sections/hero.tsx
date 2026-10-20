'use client';

import { Link } from '@/components/i18n/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

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

  return (
    <section className="bg-wash relative overflow-hidden border-b border-border pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div className="container-wide">
        <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            <motion.h1
              custom={1}
              variants={fade}
              initial="hidden"
              animate="show"
              className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[4.5rem]"
            >
              {t.title}
            </motion.h1>
            <motion.p
              custom={2}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
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
          </div>

          <BrandBars />
        </div>

      </div>
    </section>
  );
}

/** The ELEM isotype (three bars forming an "E") drawn large as the hero's signature element. */
function BrandBars() {
  const bars = [
    { width: '100%', className: 'bg-brand-gradient' },
    { width: '72%', className: 'bg-brand-gradient-soft' },
    { width: '100%', className: 'bg-brand-gradient' },
  ];
  return (
    <div aria-hidden className="hidden flex-col gap-6 lg:flex">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className={`h-16 origin-left rounded-full xl:h-[4.5rem] ${bar.className}`}
          style={{ width: bar.width }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease }}
        />
      ))}
    </div>
  );
}

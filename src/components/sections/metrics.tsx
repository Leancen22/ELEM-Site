'use client';

import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/motion/counter';
import { Reveal } from '@/components/motion/reveal';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

export function Metrics() {
  const content = home[useLocale()];
  const metrics = content.metrics;
  const t = content.sections.metrics;
  return (
    <section className="relative overflow-hidden py-20">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-950 via-[#7a0c3d] to-[#4a0a52] px-6 py-14 text-white shadow-glow-lg sm:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(251,53,107,.4),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(214,36,240,.35),transparent_45%)]" />
          <div className="absolute inset-0 bg-grid opacity-[0.12]" />
          <motion.div
            aria-hidden
            className="absolute -right-20 -top-20 size-72 rounded-full bg-fuchsia-500/30 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative">
            <Reveal className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                {t.eyebrow}
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
                {t.title}
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
              {metrics.map((m, i) => (
                <Reveal key={m.label} delay={i * 0.1} className="text-center">
                  <div className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                    <AnimatedCounter value={m.value} suffix={m.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-white/75">{m.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

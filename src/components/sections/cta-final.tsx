'use client';

import { Link } from '@/components/i18n/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/motion/magnetic';
import { Reveal } from '@/components/motion/reveal';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

export function CtaFinal() {
  const t = home[useLocale()].sections.cta;
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container-wide">
        <div className="relative overflow-hidden rounded-[2rem] border border-rose-200/40 px-6 py-16 text-center sm:px-12 sm:py-24">
          {/* animated gradient bg */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-500 via-fuchsia-600 to-purple-700 bg-[length:200%_200%] animate-gradient-pan" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.25),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,.2),transparent_40%)]" />
          <div className="absolute inset-0 -z-10 bg-grid opacity-10" />
          <motion.div
            aria-hidden
            className="absolute -left-20 top-0 -z-10 size-72 rounded-full bg-white/20 blur-3xl"
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          <Reveal className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {t.badge}
            </span>
            <h2 className="mx-auto mt-6 max-w-3xl font-display text-3xl font-extrabold leading-[1.1] text-white sm:text-5xl">
              {t.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
              {t.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-rose-700 shadow-lg hover:bg-white"
                >
                  <Link href="/contacto">
                    {t.primary} <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Magnetic>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:border-white hover:text-white"
              >
                <Link href="/contacto">
                  <Calendar className="size-4" /> {t.secondary}
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

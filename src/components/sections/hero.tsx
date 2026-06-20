'use client';

import * as React from 'react';
import { Link } from '@/components/i18n/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, PlayCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Magnetic } from '@/components/motion/magnetic';
import { Aurora } from '@/components/visuals/aurora';
import { ParticleField } from '@/components/visuals/particle-field';
import { HeroOrbit } from '@/components/visuals/hero-orbit';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

const stack = ['Drupal', 'React', 'Java', 'PHP', 'Node.js'];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Hero() {
  const t = home[useLocale()].sections.hero;
  const [atTop, setAtTop] = React.useState(true);
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    // Reveal the scroll hint last, after the hero content has animated in.
    const id = setTimeout(() => setEntered(true), 1200);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(id);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden py-24 [@media(max-height:780px)]:py-16 [@media(max-height:680px)]:py-12">
      <Aurora />
      <ParticleField className="absolute inset-0 -z-0 opacity-70" />
      <div className="absolute inset-0 -z-0 bg-grid opacity-[0.25] mask-fade-b" />
      <div className="absolute inset-x-0 bottom-0 -z-0 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="container-wide relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.h1
              custom={0}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.2rem] [@media(max-height:780px)]:mt-4 [@media(max-height:780px)]:!text-5xl"
            >
              {t.titleLead}{' '}
              <span className="text-gradient-animated">{t.titleAccent}</span>{' '}
              {t.titleTail}
            </motion.h1>

            <motion.p
              custom={1}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground [@media(max-height:780px)]:mt-4 [@media(max-height:680px)]:text-base"
            >
              {t.descLead}
              <span className="font-semibold text-foreground">{t.descStrong}</span>
              {t.descTail}
            </motion.p>

            <motion.div
              custom={2}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap items-center gap-3 [@media(max-height:780px)]:mt-6"
            >
              <Magnetic>
                <Button asChild size="lg">
                  <Link href="/contacto">
                    {t.ctaPrimary} <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Magnetic>
              {/* Oculto: casos de éxito desactivados (empresa nueva, sin referencias).
              <Button asChild size="lg" variant="secondary">
                <Link href="/casos-de-exito">
                  <PlayCircle className="size-4" /> {t.ctaSecondary}
                </Link>
              </Button>
              */}
            </motion.div>

            <motion.div
              custom={3}
              variants={fade}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center [@media(max-height:780px)]:mt-6"
            >
              {/* Rating de clientes oculto: empresa nueva, sin referencias todavía.
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-rose-500 text-rose-500" />
                ))}
                <span className="ml-1.5 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">4.9/5</span> ·{' '}
                  {t.ratingClients}
                </span>
              </div>
              <div className="hidden h-5 w-px bg-border sm:block" />
              */}

              {/* //tecnologias */}
              {/* <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                {stack.map((s) => (
                  <span key={s} className="font-medium text-foreground/70">
                    {s}
                  </span>
                ))}
              </div> */}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <HeroOrbit />
          </motion.div>
        </div>
      </div>

      {/* scroll indicator — two small moving arrows pinned to the bottom,
          visible only at the top of the page */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: atTop && entered ? 1 : 0,
            y: atTop && entered ? 0 : 10,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {[0, 1].map((i) => (
            <motion.span
              key={i}
              className="-mt-1 text-rose-600 dark:text-rose-400"
              animate={{ y: [0, 4, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.18,
              }}
            >
              <ChevronDown className="size-5" strokeWidth={2.5} />
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

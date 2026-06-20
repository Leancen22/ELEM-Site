'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CodeWindow } from './code-window';
import { useLocale } from '@/i18n/provider';
import { cn } from '@/lib/utils';

/**
 * Home hero visual — a single clean code editor. Simple and directly
 * representative of "we build software". The richer "live architecture"
 * diagram lives in `hero-system.tsx` (used on /tecnologias); the logo orbit
 * in `hero-orbit.tsx`.
 */

type Tok = { t: string; c?: 'key' | 'str' | 'fn' | 'com' | 'punc' };

const comments = {
  es: { top: '// Del descubrimiento al soporte', ship: '  // CI/CD · 99,99% uptime' },
  en: { top: '// From discovery to support', ship: '  // CI/CD · 99.99% uptime' },
} as const;

function sample(locale: 'es' | 'en'): Tok[][] {
  const c = comments[locale];
  return [
    [{ t: c.top, c: 'com' }],
    [
      { t: 'export ', c: 'key' },
      { t: 'async ', c: 'key' },
      { t: 'function ', c: 'key' },
      { t: 'build', c: 'fn' },
      { t: '(idea: Brief): ' },
      { t: 'Promise', c: 'fn' },
      { t: '<Platform> {' },
    ],
    [
      { t: '  const ', c: 'key' },
      { t: 'plan = ' },
      { t: 'await ', c: 'key' },
      { t: 'design', c: 'fn' },
      { t: '(idea);' },
    ],
    [
      { t: '  const ', c: 'key' },
      { t: 'app = ' },
      { t: 'engineer', c: 'fn' },
      { t: '(plan, {' },
    ],
    [
      { t: '    stack: [' },
      { t: "'Next.js'", c: 'str' },
      { t: ', ' },
      { t: "'Java'", c: 'str' },
      { t: ', ' },
      { t: "'Python'", c: 'str' },
      { t: '],' },
    ],
    [{ t: '    quality: ' }, { t: "'senior'", c: 'str' }, { t: ',' }],
    [{ t: '  });' }],
    [
      { t: '  return ', c: 'key' },
      { t: 'ship', c: 'fn' },
      { t: '(app);' },
      { t: comments[locale].ship, c: 'com' },
    ],
    [{ t: '}' }],
  ];
}

export function HeroCode({ className }: { className?: string }) {
  const locale = useLocale();
  const reduce = useReducedMotion();

  return (
    <div className={cn('relative mx-auto w-full max-w-[480px]', className)}>
      {/* brand halo behind the editor */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-brand-gradient opacity-20 blur-3xl" />

      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CodeWindow title="platform.ts" lines={sample(locale)} />
      </motion.div>
    </div>
  );
}

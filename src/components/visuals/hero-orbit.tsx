'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ReactLogo,
  NodeLogo,
  JavaLogo,
  PhpLogo,
  DrupalLogo,
  DockerLogo,
} from './tech-logos';
import { cn } from '@/lib/utils';

const ring1 = [
  { Logo: DrupalLogo, angle: 0 },
  { Logo: ReactLogo, angle: 120 },
  { Logo: NodeLogo, angle: 240 },
];
const ring2 = [
  { Logo: JavaLogo, angle: 60 },
  { Logo: PhpLogo, angle: 180 },
  { Logo: DockerLogo, angle: 300 },
];

function OrbitRing({
  radius,
  duration,
  reverse,
  items,
}: {
  radius: number;
  duration: number;
  reverse?: boolean;
  items: { Logo: React.ComponentType<{ className?: string }>; angle: number }[];
}) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, ease: 'linear', repeat: Infinity }}
    >
      <div
        className="absolute left-1/2 top-1/2 rounded-full border border-rose-300/30 dark:border-rose-500/20"
        style={{
          width: radius * 2,
          height: radius * 2,
          transform: 'translate(-50%,-50%)',
        }}
      />
      {items.map(({ Logo, angle }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 grid size-14 place-items-center rounded-2xl border border-white/60 bg-white/90 shadow-card backdrop-blur dark:border-white/10 dark:bg-white/[0.06]"
            style={{ x: x - 28, y: y - 28 }}
            animate={{ rotate: reverse ? 360 : -360 }}
            transition={{ duration, ease: 'linear', repeat: Infinity }}
          >
            <Logo className="size-8" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export function HeroOrbit({ className }: { className?: string }) {
  return (
    <div
      className={cn('relative mx-auto aspect-square w-full max-w-[520px]', className)}
      aria-hidden
    >
      {/* core glow */}
      <div className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gradient opacity-30 blur-3xl animate-pulse-glow" />

      {/* orbit rings */}
      <div className="absolute inset-[12%]">
        <OrbitRing radius={170} duration={34} items={ring1} />
      </div>
      <div className="absolute inset-[12%]">
        <OrbitRing radius={108} duration={26} reverse items={ring2} />
      </div>

      {/* center node */}
      <div className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="size-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Image
            src="/icon.png"
            alt=""
            width={128}
            height={128}
            priority
            className="size-full object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
}

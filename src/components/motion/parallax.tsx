'use client';

import * as React from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Parallax is off below 768px (touch scrolling makes
 * it jittery) and off for prefers-reduced-motion. Starts disabled so server
 * and first client render match.
 */
export function useParallaxEnabled(minWidth = 768) {
  const reduce = useReducedMotion();
  const [wide, setWide] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [minWidth]);
  return wide && !reduce;
}

/** The soft brand light behind a hero, drifting down slower than the page. */
export function ParallaxWash({ className }: { className?: string }) {
  const enabled = useParallaxEnabled();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 420]);
  return (
    <motion.div
      aria-hidden
      style={enabled ? { y } : undefined}
      // Taller than the section so the drift never uncovers its top edge.
      className={cn('bg-wash pointer-events-none absolute inset-x-0 -top-[70%] bottom-0 -z-10', className)}
    />
  );
}

const ProgressContext = React.createContext<MotionValue<number> | null>(null);

/**
 * A section whose scroll progress (0 as it enters, 1 as it leaves) drives its
 * children. With `pan`, its gradient background slides as it passes.
 */
export function ParallaxSection({
  className,
  pan = false,
  children,
}: {
  className?: string;
  pan?: boolean;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLElement>(null);
  const enabled = useParallaxEnabled();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const backgroundPosition = useTransform(scrollYProgress, [0, 1], ['0% 50%', '100% 50%']);
  return (
    <ProgressContext.Provider value={scrollYProgress}>
      <motion.section
        ref={ref}
        className={className}
        style={enabled && pan ? { backgroundPosition, backgroundSize: '200% 200%' } : undefined}
      >
        {children}
      </motion.section>
    </ProgressContext.Provider>
  );
}

/** Moves faster or slower than its ParallaxSection: travels `distance`px each way. */
export function ParallaxItem({
  distance = 40,
  className,
  children,
}: {
  distance?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const enabled = useParallaxEnabled();
  const fallback = useMotionValue(0.5);
  const progress = React.useContext(ProgressContext) ?? fallback;
  const y = useTransform(progress, [0, 1], [distance, -distance]);
  return (
    <motion.div className={className} style={enabled ? { y } : undefined}>
      {children}
    </motion.div>
  );
}

/**
 * Scroll progress of a section for "settling" effects: 0 when its top enters
 * the bottom of the screen, 1 once its centre reaches the middle (clamped, so
 * everything is still while it is being read).
 */
export function useSettleProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  return scrollYProgress;
}

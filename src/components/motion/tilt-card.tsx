'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as React from 'react';
import { cn } from '@/lib/utils';

export function TiltCard({
  children,
  className,
  max = 9,
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glow?: boolean;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  });

  const glowX = useTransform(px, [0, 1], ['0%', '100%']);
  const glowY = useTransform(py, [0, 1], ['0%', '100%']);
  const glowBg = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(420px circle at ${x} ${y}, rgba(251,53,107,0.18), transparent 65%)`
  );

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn('preserve-3d relative', className)}
    >
      {glow ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 [.group:hover_&]:opacity-100"
          style={{ background: glowBg }}
        />
      ) : null}
      {children}
    </motion.div>
  );
}

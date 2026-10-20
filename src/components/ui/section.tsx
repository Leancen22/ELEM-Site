import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Renders a heading from lead/accent/tail fragments. The accent used to be a
 * gradient highlight; it now reads as one plain sentence (cleaner, less
 * "template"), so callers and content files keep their shape.
 */
export function GradientTitle({
  lead,
  accent,
  tail,
}: {
  lead: string;
  accent?: string;
  tail?: string;
}) {
  return <>{[lead, accent, tail].filter(Boolean).join(' ')}</>;
}

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn('relative scroll-mt-20 py-20 sm:py-28', className)}>
      <div className="container-wide">{children}</div>
    </section>
  );
}

/** `eyebrow` is accepted for compatibility but no longer rendered. */
export function SectionHeader({
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex max-w-3xl flex-col gap-5',
        align === 'center' && 'mx-auto items-center text-center',
        className
      )}
    >
      <h2 className="text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

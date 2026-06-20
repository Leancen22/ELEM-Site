import * as React from 'react';
import { cn } from '@/lib/utils';

/** Renders a heading with an optional gradient-highlighted accent fragment. */
export function GradientTitle({
  lead,
  accent,
  tail,
}: {
  lead: string;
  accent?: string;
  tail?: string;
}) {
  return (
    <>
      {lead}
      {accent ? (
        <>
          {lead ? ' ' : ''}
          <span className="text-gradient">{accent}</span>
        </>
      ) : null}
      {tail ? ` ${tail}` : ''}
    </>
  );
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
    <section id={id} className={cn('relative py-20 sm:py-28', className)}>
      <div className="container-wide">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
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
        'flex max-w-2xl flex-col gap-4',
        align === 'center' && 'mx-auto items-center text-center',
        className
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

import { cn } from '@/lib/utils';

/**
 * Layered, animated gradient "aurora" blobs. Pure CSS — GPU friendly.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      <div className="absolute -left-[10%] top-[-15%] size-[55vw] max-w-[760px] rounded-full bg-rose-400/40 blur-[120px] animate-float-slow dark:bg-rose-500/25" />
      <div className="absolute right-[-8%] top-[8%] size-[42vw] max-w-[620px] rounded-full bg-fuchsia-500/30 blur-[120px] animate-float dark:bg-fuchsia-500/20" />
      <div className="absolute bottom-[-20%] left-[28%] size-[48vw] max-w-[680px] rounded-full bg-rose-500/25 blur-[130px] animate-float-slow dark:bg-rose-600/20" />
    </div>
  );
}

export function GridGlow({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0', className)}>
      <div className="absolute inset-0 bg-grid opacity-[0.4] mask-fade-b" />
      <div className="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-rose-300/20 blur-[120px] dark:bg-rose-500/15" />
    </div>
  );
}

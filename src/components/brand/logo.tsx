import { Link } from '@/components/i18n/link';
import { cn } from '@/lib/utils';

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('size-9 shrink-0', className)}
      role="img"
      aria-label="ELEM"
    >
      <defs>
        <linearGradient id="elemBrandGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fb356b" />
          <stop offset="50%" stopColor="#e6128f" />
          <stop offset="100%" stopColor="#bc12d6" />
        </linearGradient>
        <linearGradient id="elemBrandGradSoft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff6890" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
      </defs>
      <rect x="4" y="5" width="16" height="3" rx="1.5" fill="url(#elemBrandGrad)" />
      <rect x="4" y="10.5" width="12" height="3" rx="1.5" fill="url(#elemBrandGradSoft)" />
      <rect x="4" y="16" width="16" height="3" rx="1.5" fill="url(#elemBrandGrad)" />
    </svg>
  );
}

export function Logo({
  className,
  href = '/',
  showText = true,
}: {
  className?: string;
  href?: string;
  showText?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label="ELEM — Inicio"
    >
      <LogoMark className="transition-transform duration-300 group-hover:scale-105" />
      {showText ? (
        <span className="bg-brand-gradient bg-clip-text font-display text-xl font-extrabold tracking-tight text-transparent">
          ELEM
        </span>
      ) : null}
    </Link>
  );
}

'use client';

import * as React from 'react';
import { Link } from '@/components/i18n/link';
import { cn } from '@/lib/utils';

type Item = { id: string; title: string };

/**
 * Tracks which service section is in view (scrollspy). The active section is
 * the last one whose top has passed a line ~35% down the viewport.
 */
function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState(ids[0]);

  React.useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      // At the very bottom of the page, the last section is the active one.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        const last = els[els.length - 1];
        if (last.getBoundingClientRect().top < window.innerHeight) current = last.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ids]);

  return active;
}

/** Desktop: sticky column beside the sections. */
export function ServiceIndexSidebar({ items, label }: { items: Item[]; label: string }) {
  const ids = React.useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveSection(ids);

  return (
    <nav aria-label={label} className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
      <p className="text-[15px] font-medium text-muted-foreground">{label}</p>
      <ol className="mt-4 space-y-1 text-[15px]">
        {items.map((s, i) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <Link
                href={`/servicios#${s.id}`}
                aria-current={on ? 'location' : undefined}
                className={cn(
                  'relative flex gap-3 py-1.5 pl-4 transition-colors duration-200',
                  'before:absolute before:inset-y-1 before:left-0 before:w-0.5 before:rounded-full before:transition-colors before:duration-200',
                  on
                    ? 'font-medium text-primary before:bg-primary'
                    : 'text-muted-foreground before:bg-border hover:text-foreground'
                )}
              >
                <span className="text-sm tabular-nums leading-6">0{i + 1}</span>
                {s.title}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Phone/tablet: a swipeable row of chips that stays under the header. */
export function ServiceIndexChips({ items, label }: { items: Item[]; label: string }) {
  const ids = React.useMemo(() => items.map((i) => i.id), [items]);
  const active = useActiveSection(ids);
  const rowRef = React.useRef<HTMLElement>(null);

  // Keep the active chip in view as the page scrolls.
  React.useEffect(() => {
    const row = rowRef.current;
    const chip = row?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!row || !chip) return;
    const target = chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2;
    row.scrollTo({ left: target, behavior: 'smooth' });
  }, [active]);

  return (
    <nav
      ref={rowRef}
      aria-label={label}
      className="sticky top-16 z-30 -mx-5 mb-4 overflow-x-auto bg-background/95 px-5 py-3 backdrop-blur [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:hidden [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max gap-2">
        {items.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <Link
                href={`/servicios#${s.id}`}
                data-id={s.id}
                aria-current={on ? 'location' : undefined}
                className={cn(
                  'inline-flex h-10 items-center whitespace-nowrap rounded-full border px-4 text-[15px] font-medium transition-colors duration-200',
                  on
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:border-primary hover:text-primary'
                )}
              >
                {s.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

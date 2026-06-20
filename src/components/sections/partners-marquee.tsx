'use client';

import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

export function PartnersMarquee() {
  const content = home[useLocale()];
  const row = [...content.partners, ...content.partners];
  return (
    <section className="border-y border-border/60 bg-muted/30 py-10">
      <div className="container-wide">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {content.sections.partners.heading}
        </p>
        <div className="mask-fade-x mt-7 overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-14">
            {row.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap font-display text-xl font-bold text-foreground/35 transition-colors hover:text-rose-500"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

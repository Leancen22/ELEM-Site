'use client';

import { SectionHeader } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

/** "Why ELEM": four working principles, text only. */
export function Benefits() {
  const content = home[useLocale()];
  const principles = content.principles;
  const t = content.sections.principles;

  return (
    <section id="por-que-elem" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-wide">
        <SectionHeader eyebrow={t.eyebrow} title={t.lead} description={t.description} />
        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06} className="border-t border-foreground/80 pt-6">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

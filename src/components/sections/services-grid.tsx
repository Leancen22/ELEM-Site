'use client';

import { Link } from '@/components/i18n/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

export function ServicesGrid() {
  const content = home[useLocale()];
  const services = content.services;
  const t = content.sections.services;
  return (
    <section id="servicios" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader eyebrow={t.eyebrow} title={t.lead} description={t.description} />
          <Link
            href="/servicios"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            {t.all}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ol className="border-t border-border">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id} delay={i * 0.04}>
              <Link
                href={`/servicios#${service.id}`}
                className="group grid gap-4 border-b border-border py-8 sm:grid-cols-[3rem_1fr_auto] sm:gap-6"
              >
                <span className="font-mono text-sm text-muted-foreground">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground/80">
                    {service.stack}
                  </p>
                </div>
                <ArrowUpRight className="hidden size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block" />
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

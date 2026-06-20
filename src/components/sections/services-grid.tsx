'use client';

import { Link } from '@/components/i18n/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeader, GradientTitle } from '@/components/ui/section';
import { Stagger, StaggerItem } from '@/components/motion/reveal';
import { Icon } from '@/components/ui/icon';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

export function ServicesGrid() {
  const content = home[useLocale()];
  const services = content.services;
  const t = content.sections.services;
  return (
    <section id="servicios" className="section-light relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-mesh-rose opacity-30" />
      <div className="container-wide relative">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={<GradientTitle lead={t.lead} accent={t.accent} />}
          description={t.description}
        />

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Link
                href={service.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30"
              >
                <div className="absolute right-0 top-0 size-24 translate-x-8 -translate-y-8 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" />
                <div className="grid size-12 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon name={service.icon} className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {service.benefits.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs font-medium text-foreground/70"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600">
                  {t.more}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

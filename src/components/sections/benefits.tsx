'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Rocket, GitBranch, Layers, TrendingUp } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeader, GradientTitle } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';

const icons = [ShieldCheck, Rocket, GitBranch, Layers, TrendingUp];

export function Benefits() {
  const [active, setActive] = useState('item-0');
  const content = home[useLocale()];
  const benefits = content.benefits;
  const t = content.sections.benefits;

  return (
    <section id="beneficios" className="section-rose py-20 sm:py-28">
      <div className="container-wide">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow={t.eyebrow}
              title={<GradientTitle lead={t.lead} accent={t.accent} />}
              description={t.description}
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {t.stats.map((s) => (
                <div
                  key={s.l}
                  className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur"
                >
                  <div className="font-display text-2xl font-extrabold text-gradient">
                    {s.k}
                  </div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Accordion
              type="single"
              collapsible
              value={active}
              onValueChange={(v) => setActive(v || '')}
              className="space-y-3"
            >
              {benefits.map((b, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <AccordionItem key={b.title} value={`item-${i}`}>
                    <AccordionTrigger>
                      <span className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white">
                          <Icon className="size-4" />
                        </span>
                        {b.title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pl-12"
                      >
                        {b.body}
                      </motion.p>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

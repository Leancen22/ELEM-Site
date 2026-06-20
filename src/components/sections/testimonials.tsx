'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { SectionHeader, GradientTitle } from '@/components/ui/section';
import { home } from '@/content/home';
import { useLocale } from '@/i18n/provider';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4800, stopOnInteraction: false, stopOnMouseEnter: true })]
  );
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const content = home[useLocale()];
  const testimonials = content.testimonials;
  const t = content.sections.testimonials;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <section className="section-light overflow-hidden py-20 sm:py-28">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            align="left"
            eyebrow={t.eyebrow}
            title={<GradientTitle lead={t.lead} accent={t.accent} />}
          />
          <div className="flex gap-2">
            <button
              aria-label={t.prev}
              onClick={() => emblaApi?.scrollPrev()}
              className="grid size-11 place-items-center rounded-full border border-border bg-background transition-colors hover:border-rose-300 hover:text-rose-600"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              aria-label={t.next}
              onClick={() => emblaApi?.scrollNext()}
              className="grid size-11 place-items-center rounded-full border border-border bg-background transition-colors hover:border-rose-300 hover:text-rose-600"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="min-w-0 flex-[0_0_88%] sm:flex-[0_0_55%] lg:flex-[0_0_42%]"
              >
                <figure className="card-gradient-border flex h-full flex-col p-7 shadow-card">
                  <Quote className="size-9 text-rose-300" />
                  <blockquote className="mt-4 flex-1 text-lg font-medium leading-relaxed text-foreground">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span className="grid size-11 place-items-center rounded-full bg-brand-gradient font-display text-sm font-bold text-white">
                      {t.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {t.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              aria-label={`${t.goTo} ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                selected === i ? 'w-7 bg-brand-gradient' : 'w-2 bg-border'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

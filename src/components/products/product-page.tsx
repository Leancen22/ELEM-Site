import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from '@/components/i18n/link';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Section, SectionHeader } from '@/components/ui/section';
import { Faq } from '@/components/ui/faq';
import { Reveal } from '@/components/motion/reveal';
import { ParallaxWash } from '@/components/motion/parallax';
import { CtaFinal } from '@/components/sections/cta-final';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/seo/json-ld';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';
import type { Product, ProductsCopy, Shot } from '@/content/products';

/** Logo del producto: las tres barras de ELEM, el nombre y el producto (como en los videos). */
export function ProductLockup({ name, className }: { name: string; className?: string }) {
  const [brand, ...rest] = name.split(' ');
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <span aria-hidden className="flex w-8 flex-col gap-[5px]">
        <i className="block h-[5px] w-8 rounded-full bg-brand-gradient" />
        <i className="block h-[5px] w-6 rounded-full bg-brand-gradient-soft" />
        <i className="block h-[5px] w-8 rounded-full bg-brand-gradient" />
      </span>
      <span className="text-lg font-medium tracking-[0.3em] text-gradient">{brand}</span>
      <span className="text-lg font-normal text-muted-foreground">{rest.join(' ')}</span>
    </span>
  );
}

/** Captura dentro de una ventana de navegador. */
/** `sizes`: el ancho con que se muestra (Next elige el archivo); calidad alta porque son interfaces con texto chico. */
export function BrowserFrame({ shot, className, priority, sizes = '(min-width: 1024px) 680px, 100vw' }: { shot: Shot; className?: string; priority?: boolean; sizes?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_80px_-30px_rgba(18,2,9,0.35)]', className)}>
      <div aria-hidden className="flex h-8 items-center gap-1.5 border-b border-border bg-muted/60 px-3.5">
        <i className="size-2.5 rounded-full bg-foreground/15" />
        <i className="size-2.5 rounded-full bg-foreground/15" />
        <i className="size-2.5 rounded-full bg-foreground/15" />
      </div>
      <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} priority={priority} sizes={sizes} quality={90} className="block h-auto w-full" />
    </div>
  );
}

/** Marco de celular, para una captura o un video vertical. */
function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-[2.2rem] bg-neutral-950 p-2 shadow-[0_30px_80px_-25px_rgba(18,2,9,0.55)] ring-1 ring-white/10', className)}>
      <div className="overflow-hidden rounded-[1.7rem] bg-black">{children}</div>
    </div>
  );
}

export function ProductPage({ product: p, copy: t }: { product: Product; copy: ProductsCopy }) {
  const crumbs = [
    { name: t.home, href: '/' },
    { name: t.products, href: '/productos' },
    { name: p.name, href: p.href },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <JsonLd data={faqSchema(p.faqs)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: p.name,
          description: p.metaDesc,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          publisher: { '@type': 'Organization', name: site.name, url: site.url },
          offers: p.plans.map((plan) => ({
            '@type': 'Offer',
            name: plan.name,
            price: plan.price.replace(/[^\d.,]/g, '').replace(',', '.'),
            priceCurrency: 'USD',
          })),
        }}
      />

      {/* Hero: texto arriba y la captura grande, con el celular encima. */}
      <section className="relative isolate overflow-hidden border-b border-border pb-16 pt-32 sm:pb-24 sm:pt-40">
        <ParallaxWash />
        <div className="container-wide">
          <Breadcrumbs items={crumbs} />
          <Reveal className="mt-10 max-w-3xl">
            <ProductLockup name={p.name} />
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">{p.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{p.heroDesc}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contacto">
                  {t.demo} <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <a href="#planes">{t.seePlans}</a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative mt-14 sm:mt-16 lg:pr-24">
            <BrowserFrame shot={p.heroImage} priority sizes="(min-width: 1280px) 1120px, 100vw" />
            <PhoneFrame className="absolute -bottom-8 right-2 hidden w-[180px] sm:block lg:right-0 lg:w-[220px]">
              <Image src={p.heroPhone.src} alt={p.heroPhone.alt} width={p.heroPhone.width} height={p.heroPhone.height} sizes="220px" quality={90} className="block h-auto w-full" />
            </PhoneFrame>
          </Reveal>
        </div>
      </section>

      {/* Video */}
      <Section className="bg-surface">
        <div className={cn('grid items-center gap-12', p.video.vertical ? 'lg:grid-cols-[1fr_auto] lg:gap-24' : 'lg:grid-cols-1')}>
          <Reveal className={cn(!p.video.vertical && 'max-w-3xl')}>
            <SectionHeader title={p.video.title} description={p.video.body} />
          </Reveal>
          <Reveal delay={0.1} className={cn(p.video.vertical ? 'mx-auto w-full max-w-[320px]' : 'w-full')}>
            {p.video.vertical ? (
              <PhoneFrame>
                <video className="block aspect-[9/16] w-full" controls preload="metadata" playsInline poster={p.video.poster} aria-label={t.watchVideo}>
                  <source src={p.video.src} type="video/mp4" />
                </video>
              </PhoneFrame>
            ) : (
              <video className="block w-full rounded-2xl border border-border shadow-[0_30px_80px_-30px_rgba(18,2,9,0.35)]" controls preload="metadata" playsInline poster={p.video.poster} aria-label={t.watchVideo}>
                <source src={p.video.src} type="video/mp4" />
              </video>
            )}
          </Reveal>
        </div>
      </Section>

      {/* Funciones principales, alternando captura a izquierda y derecha. */}
      <Section>
        <Reveal>
          <SectionHeader title={p.featuresTitle} />
        </Reveal>
        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          {p.features.map((f, i) => (
            <div key={f.title} className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <Reveal className={cn(i % 2 === 1 && 'lg:order-2')}>
                <span className="text-[15px] tabular-nums text-muted-foreground">0{i + 1}</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{f.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{f.body}</p>
                <ul className="mt-6 border-t border-border">
                  {f.points.map((pt) => (
                    <li key={pt} className="flex gap-3 border-b border-border py-3 text-base">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.1} direction={i % 2 === 1 ? 'right' : 'left'} className={cn(i % 2 === 1 && 'lg:order-1')}>
                <BrowserFrame shot={f.image} />
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* Más funciones */}
      <Section className="border-t border-border pt-16 sm:pt-20">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] sm:text-3xl">{p.moreTitle}</h2>
        </Reveal>
        <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {p.more.map((m, i) => (
            <Reveal key={m.title} delay={(i % 3) * 0.05} className="border-t border-foreground/80 pt-5">
              <h3 className="text-lg font-semibold tracking-tight">{m.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">{m.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Planes */}
      <Section id="planes" className="bg-surface">
        <Reveal>
          <SectionHeader title={p.plansTitle} description={p.plansDesc} />
        </Reveal>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {p.plans.map((plan, i) => (
            <Reveal
              key={plan.name}
              delay={i * 0.06}
              className={cn(
                'relative flex flex-col rounded-2xl border bg-card p-7 sm:p-8',
                plan.featured ? 'border-primary shadow-[0_30px_70px_-35px_rgba(230,18,143,0.55)] ring-1 ring-primary' : 'border-border'
              )}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{t.recommended}</span>
              )}
              <h3 className="text-xl font-semibold tracking-tight">{plan.name}</h3>
              <p className="mt-2 min-h-[3rem] text-[15px] leading-relaxed text-muted-foreground">{plan.description}</p>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-[-0.03em]">{plan.price}</span>
                <span className="text-[15px] text-muted-foreground">{plan.unit}</span>
              </p>
              <p className="mt-8 text-[15px] font-medium text-muted-foreground">{i === 0 ? t.includes : t.everythingIn(p.plans[i - 1].name)}</p>
              <ul className="mt-4 flex-1 space-y-3">
                {plan.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] leading-snug">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    {it}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full" variant={plan.featured ? 'primary' : 'secondary'}>
                <Link href="/contacto">
                  {t.demo} <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">{p.plansNote}</p>
      </Section>

      {/* Preguntas frecuentes */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeader title={p.faqTitle} />
          </Reveal>
          <Reveal delay={0.05}>
            <Faq faqs={p.faqs} />
          </Reveal>
        </div>
      </Section>

      <CtaFinal title={p.ctaTitle} />
    </>
  );
}

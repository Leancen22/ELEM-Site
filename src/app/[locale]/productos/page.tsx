import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/components/i18n/link';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { CtaFinal } from '@/components/sections/cta-final';
import { ProductLockup } from '@/components/products/product-page';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';
import { products, productsCopy } from '@/content/products';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = productsCopy[locale];
  return buildMetadata({ title: t.indexMetaTitle, description: t.indexMetaDesc, locale, href: '/productos' });
}

export default async function ProductosPage() {
  const locale = await getLocale();
  const t = productsCopy[locale];
  const crumbs = [
    { name: t.home, href: '/' },
    { name: t.products, href: '/productos' },
  ];
  const cards = [
    ...(['core', 'one'] as const).map((id) => {
      const p = products[locale][id];
      return { name: p.name, summary: p.summary, href: p.href as string, cta: t.learnMore, image: p.heroImage.src, from: p.plans[0].price, unit: p.plans[0].unit };
    }),
    { name: t.assist.name, summary: t.assist.summary, href: t.assist.href, cta: t.assist.cta, image: '/videos/elem-assist-poster.jpg', from: '', unit: '' },
  ];
  const from = locale === 'en' ? 'From' : 'Desde';
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero title={t.indexTitle} description={t.indexDesc} breadcrumbs={crumbs} />
      <Section className="pt-12 sm:pt-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06}>
              <Link
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-foreground/30"
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-border bg-muted">
                  <Image
                    src={c.image}
                    alt=""
                    width={800}
                    height={500}
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <ProductLockup name={c.name} />
                  <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">{c.summary}</p>
                  {c.from && (
                    <p className="mt-6 text-[15px] text-muted-foreground">
                      {from} <span className="font-semibold text-foreground">{c.from}</span> {c.unit}
                    </p>
                  )}
                  <span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-primary">
                    {c.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      <CtaFinal title={t.indexCtaTitle} />
    </>
  );
}

import { Link } from '@/components/i18n/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { home } from '@/content/home';
import { site } from '@/lib/site';
import { getLocale } from '@/i18n/server';
import { ParallaxItem, ParallaxSection } from '@/components/motion/parallax';

/**
 * Closing call to action on the brand gradient — the one large gradient
 * surface on the site. Optional overrides let inner pages tailor the copy.
 */
export async function CtaFinal({
  title,
  description,
}: {
  title?: string;
  description?: string;
} = {}) {
  const t = home[await getLocale()].sections.cta;
  return (
    <ParallaxSection pan className="overflow-hidden bg-brand-gradient text-white">
      <div className="container-wide grid gap-10 py-20 sm:py-28 lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <ParallaxItem distance={120}>
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {title ?? t.title}
          </h2>
        </ParallaxItem>
        <ParallaxItem distance={40}>
          <p className="max-w-md text-lg leading-relaxed text-white/85">{description ?? t.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button asChild size="lg" variant="inverse">
              <Link href="/contacto">
                {t.primary} <ArrowRight />
              </Link>
            </Button>
            <a
              href={`mailto:${site.email}`}
              className="py-1 text-[15px] font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
            >
              {site.email}
            </a>
          </div>
        </ParallaxItem>
      </div>
    </ParallaxSection>
  );
}

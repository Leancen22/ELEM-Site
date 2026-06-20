import { Aurora } from '@/components/visuals/aurora';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Reveal } from '@/components/motion/reveal';

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  breadcrumbs: { name: string; href: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-36 [@media(max-height:860px)]:pt-24 [@media(max-height:760px)]:pt-20 [@media(max-height:700px)]:pt-16">
      <Aurora />
      <div className="absolute inset-0 bg-grid opacity-[0.16] mask-fade-b" />
      <div className="absolute inset-x-0 bottom-0 -z-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <div className="container-wide relative">
        <Breadcrumbs items={breadcrumbs} />
        <Reveal className="mt-8 max-w-3xl">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {title}{' '}
            {highlight ? (
              <span className="text-gradient-animated">{highlight}</span>
            ) : null}
          </h1>
          {description ? (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

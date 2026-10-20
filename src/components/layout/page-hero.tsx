import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { Reveal } from '@/components/motion/reveal';

/** `eyebrow` is accepted for compatibility but no longer rendered. */
export function PageHero({
  title,
  highlight,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  breadcrumbs: { name: string; href: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-wash relative border-b border-border pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div className="container-wide">
        <Breadcrumbs items={breadcrumbs} />
        <Reveal className="mt-10 max-w-4xl">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {title}
            {highlight ? <> {highlight}</> : null}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

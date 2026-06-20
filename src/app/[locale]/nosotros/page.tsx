import type { Metadata } from 'next';
import { Link } from '@/components/i18n/link';
import { ArrowRight, Heart, Gem, Handshake, Lightbulb, Target, Users } from 'lucide-react';
import { PageHero } from '@/components/layout/page-hero';
import { Section, SectionHeader, GradientTitle } from '@/components/ui/section';
import { Button } from '@/components/ui/button';
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal';
import { AnimatedCounter } from '@/components/motion/counter';
import { Methodology } from '@/components/sections/methodology';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

const valueIcons = [Gem, Handshake, Lightbulb, Target, Users, Heart];

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  nosotros: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
  heroStats: { v: number; s: string; l: string }[];
  storyEyebrow: string;
  storyLead: string;
  storyAccent: string;
  storyDesc: string;
  storyBody: string;
  timeline: { year: string; title: string; body: string }[];
  valuesEyebrow: string;
  valuesLead: string;
  valuesAccent: string;
  values: { title: string; body: string }[];
  ctaTitle: string;
  ctaDesc: string;
  ctaButton: string;
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Nosotros · El equipo detrás de ELEM',
    metaDesc:
      'Somos un equipo senior de ingeniería de software con más de una década construyendo plataformas críticas. Conoce nuestra historia, valores y metodología.',
    home: 'Inicio',
    nosotros: 'Nosotros',
    heroTitle: 'Ingeniería con',
    heroHighlight: 'propósito',
    heroDesc:
      'Somos el equipo senior que las empresas llaman cuando el proyecto no puede salir mal. Más de una década construyendo software de misión crítica.',
    heroStats: [
      { v: 14, s: '', l: 'Años' },
      { v: 60, s: '+', l: 'Ingenieros senior' },
      { v: 320, s: '+', l: 'Proyectos' },
      { v: 14, s: '', l: 'Países' },
    ],
    storyEyebrow: 'Nuestra historia',
    storyLead: 'Empezamos con una idea simple:',
    storyAccent: 'hacer software bien',
    storyDesc:
      'En un mercado lleno de promesas vacías, decidimos competir solo con una cosa: la calidad de nuestra ingeniería. Catorce años después, sigue siendo nuestra única estrategia.',
    storyBody:
      'Hoy somos un equipo multidisciplinar que diseña, construye y opera plataformas para banca, sector público, salud, retail y más. Pero seguimos siendo, en el fondo, esos ingenieros que no saben entregar algo a medias.',
    timeline: [
      { year: '2012', title: 'Nace ELEM', body: 'Tres ingenieros con la obsesión de hacer software bien hecho.' },
      { year: '2016', title: 'Primer gran portal público', body: 'Entregamos una sede electrónica para millones de ciudadanos.' },
      { year: '2019', title: 'Expansión cloud-native', body: 'Adoptamos Kubernetes y arquitecturas event-driven a gran escala.' },
      { year: '2022', title: '100+ ingenieros', body: 'Consolidamos equipos especializados en Drupal, React, Java y PHP' },
      { year: '2026', title: 'Referente en transformación', body: '320+ proyectos en 14 países y una reputación construida proyecto a proyecto.' },
    ],
    valuesEyebrow: 'Valores',
    valuesLead: 'Lo que nos mueve, todos los',
    valuesAccent: 'días',
    values: [
      { title: 'Excelencia técnica', body: 'No entregamos nada que no firmaríamos con nuestro nombre. La calidad es innegociable.' },
      { title: 'Honestidad radical', body: 'Te decimos lo que necesitas oír, no lo que quieres oír. Sin sorpresas, sin letra pequeña.' },
      { title: 'Curiosidad constante', body: 'Aprendemos sin parar. La tecnología cambia y nosotros con ella, siempre por delante.' },
      { title: 'Foco en el impacto', body: 'No medimos líneas de código, medimos resultados de negocio. Lo que no aporta valor, sobra.' },
      { title: 'Equipo sobre ego', body: 'Las mejores ideas ganan, vengan de donde vengan. Construimos juntos.' },
      { title: 'Cuidado por el detalle', body: 'La diferencia entre bueno y excepcional está en los detalles. Y vivimos en ellos.' },
    ],
    ctaTitle: '¿Quieres un equipo así de tu lado?',
    ctaDesc:
      'Trabajamos con un número limitado de clientes para garantizar la calidad. Hablemos de tu proyecto.',
    ctaButton: 'Iniciar conversación',
  },
  en: {
    metaTitle: 'About · The team behind ELEM',
    metaDesc:
      'We are a senior software engineering team with over a decade building critical platforms. Discover our story, values and methodology.',
    home: 'Home',
    nosotros: 'About Us',
    heroTitle: 'Engineering with',
    heroHighlight: 'purpose',
    heroDesc:
      'We are the senior team companies call when the project cannot go wrong. Over a decade building mission-critical software.',
    heroStats: [
      { v: 14, s: '', l: 'Years' },
      { v: 60, s: '+', l: 'Senior engineers' },
      { v: 320, s: '+', l: 'Projects' },
      { v: 14, s: '', l: 'Countries' },
    ],
    storyEyebrow: 'Our story',
    storyLead: 'We started with a simple idea:',
    storyAccent: 'build software well',
    storyDesc:
      'In a market full of empty promises, we decided to compete on just one thing: the quality of our engineering. Fourteen years later, it remains our only strategy.',
    storyBody:
      'Today we are a multidisciplinary team that designs, builds and operates platforms for banking, the public sector, healthcare, retail and more. But at heart we are still those engineers who can’t deliver something half done.',
    timeline: [
      { year: '2012', title: 'ELEM is born', body: 'Three engineers obsessed with building software the right way.' },
      { year: '2016', title: 'First major public portal', body: 'We delivered an e-government site for millions of citizens.' },
      { year: '2019', title: 'Cloud-native expansion', body: 'We adopted Kubernetes and event-driven architectures at scale.' },
      { year: '2022', title: '100+ engineers', body: 'We consolidated teams specialized in Drupal, React, Java and PHP' },
      { year: '2026', title: 'A transformation benchmark', body: '320+ projects across 14 countries and a reputation built project by project.' },
    ],
    valuesEyebrow: 'Values',
    valuesLead: 'What drives us, every single',
    valuesAccent: 'day',
    values: [
      { title: 'Technical excellence', body: 'We deliver nothing we wouldn’t sign with our name. Quality is non-negotiable.' },
      { title: 'Radical honesty', body: 'We tell you what you need to hear, not what you want to hear. No surprises, no fine print.' },
      { title: 'Constant curiosity', body: 'We never stop learning. Technology changes and so do we, always ahead.' },
      { title: 'Focus on impact', body: 'We don’t measure lines of code, we measure business results. What adds no value is dropped.' },
      { title: 'Team over ego', body: 'The best ideas win, wherever they come from. We build together.' },
      { title: 'Care for detail', body: 'The difference between good and exceptional is in the details. And we live in them.' },
    ],
    ctaTitle: 'Want a team like this on your side?',
    ctaDesc:
      'We work with a limited number of clients to guarantee quality. Let’s talk about your project.',
    ctaButton: 'Start a conversation',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = content[locale];
  return buildMetadata({ title: t.metaTitle, description: t.metaDesc, locale, href: '/nosotros' });
}

export default async function NosotrosPage() {
  const t = content[await getLocale()];
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: t.home, href: '/' },
          { name: t.nosotros, href: '/nosotros' },
        ])}
      />
      <PageHero
        eyebrow={t.nosotros}
        title={t.heroTitle}
        highlight={t.heroHighlight}
        description={t.heroDesc}
        breadcrumbs={[
          { name: t.home, href: '/' },
          { name: t.nosotros, href: '/nosotros' },
        ]}
      >
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {t.heroStats.map((m) => (
            <div key={m.l} className="rounded-2xl border border-border bg-card/60 p-5 text-center backdrop-blur">
              <div className="font-display text-3xl font-extrabold text-gradient">
                <AnimatedCounter value={m.v} suffix={m.s} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{m.l}</div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Story */}
      <Section className="pt-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal>
            <SectionHeader
              align="left"
              eyebrow={t.storyEyebrow}
              title={<GradientTitle lead={t.storyLead} accent={t.storyAccent} />}
              description={t.storyDesc}
            />
            <p className="mt-5 leading-relaxed text-muted-foreground">{t.storyBody}</p>
          </Reveal>

          <Reveal direction="left">
            <ol className="relative space-y-6 border-l border-border pl-8">
              {t.timeline.map((item) => (
                <li key={item.year} className="relative">
                  <span className="absolute -left-[39px] grid size-6 place-items-center rounded-full bg-brand-gradient text-[10px] font-bold text-white shadow-glow">
                    ●
                  </span>
                  <span className="font-mono text-sm font-semibold text-rose-500">
                    {item.year}
                  </span>
                  <h3 className="mt-0.5 font-display text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section className="border-y border-border/60 bg-muted/30">
        <SectionHeader
          eyebrow={t.valuesEyebrow}
          title={<GradientTitle lead={t.valuesLead} accent={t.valuesAccent} />}
        />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.values.map((v, i) => {
            const VIcon = valueIcons[i % valueIcons.length];
            return (
              <StaggerItem key={v.title}>
                <div className="group flex h-full flex-col rounded-2xl border border-border bg-background/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30">
                  <span className="grid size-12 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-110">
                    <VIcon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Methodology (reused) */}
      <div id="metodologia" className="scroll-mt-24">
        <Methodology />
      </div>

      {/* Team / CTA */}
      <Section className="border-t border-border/60">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-rose-500 via-fuchsia-600 to-purple-700 px-6 py-14 text-center text-white shadow-glow-lg sm:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,.25),transparent_45%)]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-2xl font-bold sm:text-4xl">
              {t.ctaTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/85">{t.ctaDesc}</p>
            <Button asChild size="lg" className="mt-8 bg-white text-rose-700 hover:bg-white">
              <Link href="/contacto">
                {t.ctaButton} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

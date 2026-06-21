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
      'Somos un equipo senior de ingeniería de software. Conoce nuestra historia, nuestros valores y cómo trabajamos.',
    home: 'Inicio',
    nosotros: 'Nosotros',
    heroTitle: 'Ingeniería con',
    heroHighlight: 'propósito',
    heroDesc:
      'Somos el equipo senior que quieres cuando el proyecto no puede salir mal: pocos clientes a la vez, estándares de ingeniería y trato directo con quien escribe el código.',
    heroStats: [
      { v: 100, s: '%', l: 'Equipo senior' },
      { v: 0, s: '', l: 'Intermediarios' },
      { v: 4, s: '', l: 'Tecnologías núcleo' },
      { v: 24, s: 'h', l: 'Respuesta' },
    ],
    storyEyebrow: 'Nuestra historia',
    storyLead: 'Empezamos con una idea simple:',
    storyAccent: 'hacer software bien',
    storyDesc:
      'En un mercado lleno de promesas vacías, decidimos competir solo con una cosa: la calidad de nuestra ingeniería. Somos una compañía joven, y esa es —y será— nuestra única estrategia.',
    storyBody:
      'Diseñamos, construimos y operamos plataformas web y software a medida, de principio a fin. Tomamos pocos proyectos a la vez y tratamos cada uno como si llevara nuestro nombre, porque lo lleva: somos esos ingenieros que no saben entregar algo a medias.',
    timeline: [
      { year: '2025', title: 'Nace ELEM', body: 'Arrancamos con una obsesión y ningún atajo: hacer software bien hecho, de principio a fin.' },
      { year: '2026', title: 'Nuestra forma de trabajar', body: 'Definimos el método: equipo senior sin intermediarios, estándares de ingeniería (CI/CD, testing, accesibilidad) y entregas incrementales.' },
      { year: 'Hoy', title: 'Proyecto a proyecto', body: 'Construimos nuestra reputación un proyecto a la vez, con la calidad como única carta de presentación.' },
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
      'We are a senior software engineering team. Discover our story, our values and how we work.',
    home: 'Home',
    nosotros: 'About Us',
    heroTitle: 'Engineering with',
    heroHighlight: 'purpose',
    heroDesc:
      'We are the senior team you want when the project cannot go wrong: few clients at a time, engineering standards and direct contact with the people who write the code.',
    heroStats: [
      { v: 100, s: '%', l: 'Senior team' },
      { v: 0, s: '', l: 'Middlemen' },
      { v: 4, s: '', l: 'Core technologies' },
      { v: 24, s: 'h', l: 'Response time' },
    ],
    storyEyebrow: 'Our story',
    storyLead: 'We started with a simple idea:',
    storyAccent: 'build software well',
    storyDesc:
      'In a market full of empty promises, we decided to compete on just one thing: the quality of our engineering. We are a young company, and that is —and will be— our only strategy.',
    storyBody:
      'We design, build and operate web platforms and custom software, end to end. We take few projects at a time and treat each one as if it carried our name, because it does: we are those engineers who can’t deliver something half done.',
    timeline: [
      { year: '2025', title: 'ELEM is born', body: 'We start with one obsession and no shortcuts: build software the right way, end to end.' },
      { year: '2026', title: 'How we work', body: 'We define the method: a senior team with no middlemen, engineering standards (CI/CD, testing, accessibility) and incremental delivery.' },
      { year: 'Today', title: 'Project by project', body: 'We build our reputation one project at a time, with quality as our only calling card.' },
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

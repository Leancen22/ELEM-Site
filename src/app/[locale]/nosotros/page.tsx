import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { Section, SectionHeader, GradientTitle } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { Methodology } from '@/components/sections/methodology';
import { CtaFinal } from '@/components/sections/cta-final';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import type { Locale } from '@/i18n/config';
import { JsonLd, breadcrumbSchema } from '@/components/seo/json-ld';

type Content = {
  metaTitle: string;
  metaDesc: string;
  home: string;
  nosotros: string;
  heroTitle: string;
  heroHighlight: string;
  heroDesc: string;
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
};

const content: Record<Locale, Content> = {
  es: {
    metaTitle: 'Nosotros · El equipo detrás de ELEM',
    metaDesc:
      'Somos un equipo senior de ingeniería de software. Conoce nuestra historia, nuestros valores y cómo trabajamos.',
    home: 'Inicio',
    nosotros: 'Nosotros',
    heroTitle: 'Preferimos hacer menos proyectos, y hacerlos bien.',
    heroHighlight: '',
    heroDesc:
      'ELEM es un estudio de ingeniería de software. Trabajamos con pocos clientes a la vez, con estándares de ingeniería altos y trato directo con quien escribe el código.',
    storyEyebrow: 'Nuestra historia',
    storyLead: 'Empezamos con una idea simple: hacer software bien.',
    storyAccent: '',
    storyDesc:
      'En un mercado lleno de promesas vacías, decidimos competir solo con una cosa: la calidad de nuestra ingeniería. Somos una compañía joven, y esa es, y será, nuestra única estrategia.',
    storyBody:
      'Diseñamos, construimos y operamos plataformas web y software a medida, de principio a fin. Tomamos pocos proyectos a la vez y tratamos cada uno como si llevara nuestro nombre, porque lo lleva: somos esos ingenieros que no saben entregar algo a medias.',
    timeline: [
      { year: '2025', title: 'Nace ELEM', body: 'Arrancamos con una obsesión y ningún atajo: hacer software bien hecho, de principio a fin.' },
      { year: '2026', title: 'Nuestra forma de trabajar', body: 'Definimos el método: equipo senior sin intermediarios, estándares de ingeniería (CI/CD, testing, accesibilidad) y entregas incrementales.' },
      { year: 'Hoy', title: 'Proyecto a proyecto', body: 'Construimos nuestra reputación un proyecto a la vez, con la calidad como única carta de presentación.' },
    ],
    valuesEyebrow: 'Valores',
    valuesLead: 'Cómo tomamos decisiones.',
    valuesAccent: '',
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
  },
  en: {
    metaTitle: 'About · The team behind ELEM',
    metaDesc:
      'We are a senior software engineering team. Discover our story, our values and how we work.',
    home: 'Home',
    nosotros: 'About Us',
    heroTitle: 'We’d rather take on fewer projects, and do them well.',
    heroHighlight: '',
    heroDesc:
      'ELEM is a software engineering studio. We work with few clients at a time, with high engineering standards and direct contact with the people who write the code.',
    storyEyebrow: 'Our story',
    storyLead: 'We started with a simple idea: build software well.',
    storyAccent: '',
    storyDesc:
      'In a market full of empty promises, we decided to compete on just one thing: the quality of our engineering. We are a young company, and that is, and will be, our only strategy.',
    storyBody:
      'We design, build and operate web platforms and custom software, end to end. We take few projects at a time and treat each one as if it carried our name, because it does: we are those engineers who can’t deliver something half done.',
    timeline: [
      { year: '2025', title: 'ELEM is born', body: 'We start with one obsession and no shortcuts: build software the right way, end to end.' },
      { year: '2026', title: 'How we work', body: 'We define the method: a senior team with no middlemen, engineering standards (CI/CD, testing, accessibility) and incremental delivery.' },
      { year: 'Today', title: 'Project by project', body: 'We build our reputation one project at a time, with quality as our only calling card.' },
    ],
    valuesEyebrow: 'Values',
    valuesLead: 'How we make decisions.',
    valuesAccent: '',
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
      />

      {/* Story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <SectionHeader
              eyebrow={t.storyEyebrow}
              title={<GradientTitle lead={t.storyLead} accent={t.storyAccent} />}
            />
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.storyDesc}</p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{t.storyBody}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol className="border-t border-border">
              {t.timeline.map((item) => (
                <li key={item.year} className="grid grid-cols-[5rem_1fr] gap-4 border-b border-border py-7">
                  <span className="font-mono text-sm text-primary">{item.year}</span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section className="border-t border-border">
        <SectionHeader
          eyebrow={t.valuesEyebrow}
          title={<GradientTitle lead={t.valuesLead} accent={t.valuesAccent} />}
        />
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {t.values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 0.05} className="border-t border-foreground/80 pt-6">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Methodology />

      <CtaFinal title={t.ctaTitle} description={t.ctaDesc} />
    </>
  );
}

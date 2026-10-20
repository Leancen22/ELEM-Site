import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { Section, SectionHeader, GradientTitle } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
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
    metaTitle: 'Nosotros · Quiénes somos',
    metaDesc:
      'ELEM es un estudio de ingeniería de software. Conoce nuestra historia y los valores que guían nuestro trabajo.',
    home: 'Inicio',
    nosotros: 'Nosotros',
    heroTitle: 'Preferimos hacer menos proyectos, y hacerlos bien.',
    heroHighlight: '',
    heroDesc:
      'ELEM es un estudio de ingeniería de software. Trabajamos con pocos clientes a la vez para darle a cada proyecto la atención que merece.',
    storyEyebrow: 'Nuestra historia',
    storyLead: 'Empezamos con una idea simple: hacer software bien.',
    storyAccent: '',
    storyDesc:
      'Somos una empresa joven y elegimos competir con una sola cosa: la calidad de nuestro trabajo.',
    storyBody:
      'Acompañamos cada proyecto de principio a fin y lo tratamos como si llevara nuestro nombre. Porque lo lleva.',
    timeline: [
      { year: '2025', title: 'Nace ELEM', body: 'Arrancamos con un objetivo: hacer software bien hecho, sin atajos.' },
      { year: '2026', title: 'Definimos el método', body: 'Un proceso claro y estándares de calidad que aplicamos en cada proyecto.' },
      { year: 'Hoy', title: 'Proyecto a proyecto', body: 'Construimos nuestra reputación con cada entrega.' },
    ],
    valuesEyebrow: 'Valores',
    valuesLead: 'Lo que nos guía.',
    valuesAccent: '',
    values: [
      { title: 'Excelencia técnica', body: 'No entregamos nada que no firmaríamos con nuestro nombre.' },
      { title: 'Honestidad', body: 'Te decimos lo que necesitas oír, aunque no sea lo que esperabas. Sin letra pequeña.' },
      { title: 'Curiosidad', body: 'La tecnología cambia y nosotros con ella. Aprender es parte del trabajo.' },
      { title: 'Foco en el impacto', body: 'Medimos el éxito por los resultados de tu negocio, no por las líneas de código.' },
    ],
    ctaTitle: '¿Quieres un equipo así de tu lado?',
    ctaDesc: 'Cuéntanos qué necesitas y te respondemos con los próximos pasos.',
  },
  en: {
    metaTitle: 'About · Who we are',
    metaDesc:
      'ELEM is a software engineering studio. Learn our story and the values that guide our work.',
    home: 'Home',
    nosotros: 'About',
    heroTitle: 'We’d rather take on fewer projects, and do them well.',
    heroHighlight: '',
    heroDesc:
      'ELEM is a software engineering studio. We work with few clients at a time so every project gets the attention it deserves.',
    storyEyebrow: 'Our story',
    storyLead: 'We started with a simple idea: build software well.',
    storyAccent: '',
    storyDesc:
      'We are a young company and we chose to compete on one thing only: the quality of our work.',
    storyBody:
      'We stay with every project from start to finish and treat it as if it carried our name. Because it does.',
    timeline: [
      { year: '2025', title: 'ELEM is born', body: 'We started with one goal: well-built software, no shortcuts.' },
      { year: '2026', title: 'We define the method', body: 'A clear process and quality standards we apply on every project.' },
      { year: 'Today', title: 'Project by project', body: 'We build our reputation with every release.' },
    ],
    valuesEyebrow: 'Values',
    valuesLead: 'What guides us.',
    valuesAccent: '',
    values: [
      { title: 'Technical excellence', body: 'We deliver nothing we wouldn’t sign with our name.' },
      { title: 'Honesty', body: 'We tell you what you need to hear, even if it isn’t what you expected. No fine print.' },
      { title: 'Curiosity', body: 'Technology changes and so do we. Learning is part of the job.' },
      { title: 'Focus on impact', body: 'We measure success by your business results, not by lines of code.' },
    ],
    ctaTitle: 'Want a team like this on your side?',
    ctaDesc: 'Tell us what you need and we’ll reply with the next steps.',
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
                  <span className="text-[15px] tabular-nums text-primary">{item.year}</span>
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
        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {t.values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05} className="border-t border-foreground/80 pt-6">
              <span className="text-sm tabular-nums text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{v.body}</p>
            </Reveal>
          ))}
        </div>
      </Section>


      <CtaFinal title={t.ctaTitle} description={t.ctaDesc} />
    </>
  );
}

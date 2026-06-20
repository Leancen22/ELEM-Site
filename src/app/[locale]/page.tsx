import { Hero } from '@/components/sections/hero';
// Oculto: empresa nueva, sin clientes/referencias todavía.
// import { PartnersMarquee } from '@/components/sections/partners-marquee';
import { Technologies } from '@/components/sections/technologies';
import { ServicesGrid } from '@/components/sections/services-grid';
// import { Metrics } from '@/components/sections/metrics';
// import { CaseStudies } from '@/components/sections/case-studies';
import { Methodology } from '@/components/sections/methodology';
import { Benefits } from '@/components/sections/benefits';
// import { Testimonials } from '@/components/sections/testimonials';
import { CtaFinal } from '@/components/sections/cta-final';
import { JsonLd, websiteSchema } from '@/components/seo/json-ld';
import { getLocale } from '@/i18n/server';

export default async function HomePage() {
  const locale = await getLocale();
  return (
    <>
      <JsonLd data={websiteSchema(locale)} />
      <Hero />
      {/* Oculto: empresa nueva, sin clientes/referencias todavía. */}
      {/* <PartnersMarquee /> */}
      <ServicesGrid />
      <Technologies />
      {/* <Metrics /> */}
      {/* <CaseStudies /> */}
      <Methodology />
      <Benefits />
      {/* <Testimonials /> */}
      <CtaFinal />
    </>
  );
}

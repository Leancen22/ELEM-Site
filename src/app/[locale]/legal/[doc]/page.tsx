import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/layout/page-hero';
import { Section } from '@/components/ui/section';
import { site, siteCopy } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import { getLocale } from '@/i18n/server';
import { defaultLocale, type Locale } from '@/i18n/config';

type Doc = { title: string; intro: string; sections: { h: string; p: string }[] };

const docs: Record<Locale, Record<string, Doc>> = {
  es: {
    privacidad: {
      title: 'Política de Privacidad',
      intro:
        'En ELEM nos tomamos en serio la protección de tus datos personales. Esta política explica qué datos recogemos, con qué finalidad y cómo los tratamos.',
      sections: [
        // { h: 'Responsable del tratamiento', p: `El responsable es ${site.legalName}, con domicilio en ${siteCopy.es.address} y correo de contacto ${site.email}.` },
        { h: 'Responsable del tratamiento', p: `El responsable es ${site.legalName}, con correo de contacto ${site.email}.` },
        { h: 'Datos que recogemos', p: 'Recogemos los datos que nos facilitas a través de nuestros formularios (nombre, email, empresa y mensaje) con la única finalidad de responder a tu consulta.' },
        { h: 'Analítica', p: 'Si lo aceptas, usamos Google Analytics para obtener estadísticas agregadas de uso del sitio. El detalle está en la Política de Cookies.' },
        { h: 'Base legal', p: 'El tratamiento se basa en tu consentimiento, que puedes retirar en cualquier momento escribiéndonos.' },
        { h: 'Conservación', p: 'Conservamos tus datos el tiempo necesario para atender tu solicitud y, posteriormente, durante los plazos legalmente exigidos.' },
        { h: 'Tus derechos', p: 'Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ' + site.email + '.' },
      ],
    },
    cookies: {
      title: 'Política de Cookies',
      intro:
        'Este sitio utiliza un número mínimo de cookies: las necesarias para su funcionamiento y, solo si las aceptas, las de analítica para entender de forma agregada cómo se usa.',
      sections: [
        { h: 'Almacenamiento técnico', p: 'Guardamos en tu navegador tu idioma (cookie NEXT_LOCALE), tu preferencia de tema (claro u oscuro) y tu elección sobre cookies. Es imprescindible para el funcionamiento del sitio y no requiere consentimiento.' },
        { h: 'Cookies analíticas', p: 'Usamos Google Analytics 4, de Google LLC, para medir de forma agregada qué páginas se visitan y cómo se llega al sitio. Solo se activa si lo aceptas en el aviso de cookies. Establece las cookies _ga y _ga_<ID>, con una duración de hasta 2 años. Google puede tratar estos datos fuera de tu país; más información en policies.google.com/privacy.' },
        { h: 'Gestión', p: 'Puedes aceptar o rechazar las cookies analíticas en el aviso que aparece en tu primera visita, y cambiar tu elección en cualquier momento desde el enlace «Configurar cookies» al pie de cada página. También puedes eliminarlas desde la configuración de tu navegador.' },
      ],
    },
    'aviso-legal': {
      title: 'Aviso Legal',
      intro: 'Condiciones generales de uso del sitio web de ELEM.',
      sections: [
        // { h: 'Titularidad', p: `Este sitio web es titularidad de ${site.legalName}, con domicilio en ${siteCopy.es.address}.` },
        { h: 'Titularidad', p: `Este sitio web es titularidad de ${site.legalName}.` },
        { h: 'Propiedad intelectual', p: 'Todos los contenidos del sitio (textos, diseños, código y marcas) están protegidos por derechos de propiedad intelectual e industrial.' },
        { h: 'Responsabilidad', p: 'ELEM no se hace responsable del uso indebido de los contenidos del sitio por parte de terceros.' },
      ],
    },
  },
  en: {
    privacidad: {
      title: 'Privacy Policy',
      intro:
        'At ELEM we take the protection of your personal data seriously. This policy explains what data we collect, for what purpose and how we process it.',
      sections: [
        // { h: 'Data controller', p: `The controller is ${site.legalName}, located at ${siteCopy.en.address}, contact email ${site.email}.` },
        { h: 'Data controller', p: `The controller is ${site.legalName}, with contact email ${site.email}.` },
        { h: 'Data we collect', p: 'We collect the data you provide through our forms (name, email, company and message) for the sole purpose of answering your enquiry.' },
        { h: 'Analytics', p: 'If you accept it, we use Google Analytics to obtain aggregate statistics on how the site is used. Details are in the Cookie Policy.' },
        { h: 'Legal basis', p: 'Processing is based on your consent, which you can withdraw at any time by writing to us.' },
        { h: 'Retention', p: 'We keep your data for as long as necessary to handle your request and, afterwards, for the legally required periods.' },
        { h: 'Your rights', p: 'You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ' + site.email + '.' },
      ],
    },
    cookies: {
      title: 'Cookie Policy',
      intro:
        'This site uses a minimal number of cookies: those necessary for it to work and, only if you accept them, analytics cookies to understand in aggregate how it is used.',
      sections: [
        { h: 'Technical storage', p: 'We store your language (NEXT_LOCALE cookie), your theme preference (light or dark) and your cookie choice in your browser. This is essential for the site to work and does not require consent.' },
        { h: 'Analytics cookies', p: 'We use Google Analytics 4, by Google LLC, to measure in aggregate which pages are visited and how people reach the site. It is only enabled if you accept it in the cookie notice. It sets the _ga and _ga_<ID> cookies, which last up to 2 years. Google may process this data outside your country; more information at policies.google.com/privacy.' },
        { h: 'Management', p: 'You can accept or reject analytics cookies in the notice shown on your first visit, and change your choice at any time from the "Cookie settings" link at the bottom of every page. You can also delete them from your browser settings.' },
      ],
    },
    'aviso-legal': {
      title: 'Legal Notice',
      intro: 'General terms of use of the ELEM website.',
      sections: [
        // { h: 'Ownership', p: `This website is owned by ${site.legalName}, located at ${siteCopy.en.address}.` },
        { h: 'Ownership', p: `This website is owned by ${site.legalName}.` },
        { h: 'Intellectual property', p: 'All site contents (texts, designs, code and trademarks) are protected by intellectual and industrial property rights.' },
        { h: 'Liability', p: 'ELEM is not liable for any misuse of the site’s contents by third parties.' },
      ],
    },
  },
};

const lastUpdated: Record<Locale, string> = {
  es: 'Última actualización: octubre de 2026.',
  en: 'Last updated: October 2026.',
};

export function generateStaticParams() {
  return Object.keys(docs[defaultLocale]).map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  const locale = await getLocale();
  const data = docs[locale][doc];
  if (!data) return {};
  return buildMetadata({
    title: data.title,
    description: data.intro,
    locale,
    href: { pathname: '/legal/[doc]', params: { doc } },
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ doc: string }>;
}) {
  const { doc } = await params;
  const locale = await getLocale();
  const data = docs[locale][doc];
  if (!data) notFound();

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={data.title}
        description={data.intro}
        breadcrumbs={[
          { name: locale === 'en' ? 'Home' : 'Inicio', href: '/' },
          { name: data.title, href: `/legal/${doc}` },
        ]}
      />
      <Section className="pt-4">
        <div className="mx-auto max-w-3xl space-y-8">
          {data.sections.map((s) => (
            <div key={s.h}>
              <h2 className="font-display text-xl font-bold">{s.h}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.p}</p>
            </div>
          ))}
          <p className="border-t border-border pt-6 text-sm text-muted-foreground">
            {lastUpdated[locale]}
          </p>
        </div>
      </Section>
    </>
  );
}

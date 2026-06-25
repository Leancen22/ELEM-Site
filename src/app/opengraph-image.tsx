import { ImageResponse } from 'next/og';
import { site, siteCopy } from '@/lib/site';
import { defaultLocale } from '@/i18n/config';

export const alt = `${site.name}: ${siteCopy[defaultLocale].tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: '#1a0411',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(251,53,107,0.55), transparent 45%), radial-gradient(circle at 85% 80%, rgba(214,36,240,0.45), transparent 45%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: 'linear-gradient(135deg, #fb356b, #bc12d6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 44,
              fontWeight: 800,
            }}
          >
            E
          </div>
          <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>ELEM</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, maxWidth: 920 }}>
            Construimos el software que mueve empresas líderes
          </div>
          <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.75)' }}>
            Drupal · Next.js · Java · Docker
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, color: 'rgba(255,255,255,0.7)' }}>
          <span>Ingeniería de software empresarial premium</span>
          <span style={{ marginLeft: 'auto', color: '#ff6890' }}>elem.dev</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

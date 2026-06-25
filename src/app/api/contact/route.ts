import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { site } from '@/lib/site';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().max(160).optional().or(z.literal('')),
  service: z.string().min(1).max(120),
  message: z.string().min(10).max(5000),
  consent: z.literal(true),
});

function esc(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Collapse CR/LF so attacker-controlled fields that end up in email headers
// (subject, reply-to name) can't inject extra headers.
function stripHeader(value: string) {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

// Same-origin browser POSTs always send an Origin header; we accept our own
// domain and localhost. A missing Origin (non-browser clients) still has to
// pass schema validation and the honeypot, so we don't hard-block it here.
function isAllowedOrigin(origin: string | null) {
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname;
    const siteHost = new URL(site.url).hostname;
    return (
      host === siteHost ||
      host === `www.${siteHost}` ||
      host === 'localhost' ||
      host === '127.0.0.1'
    );
  } catch {
    return false;
  }
}

// Validates a Cloudflare Turnstile token against the siteverify API.
// If TURNSTILE_SECRET_KEY is not set, verification is skipped (the form keeps
// working with just honeypot + Origin) so the captcha can be rolled out by
// simply adding the env vars in Vercel.
async function verifyTurnstile(token: unknown, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { skipped: true, ok: true };
  if (typeof token !== 'string' || token === '') return { skipped: false, ok: false };

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.append('remoteip', ip);

  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      { method: 'POST', body }
    );
    const data = (await res.json()) as { success?: boolean };
    return { skipped: false, ok: data.success === true };
  } catch {
    return { skipped: false, ok: false };
  }
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request.headers.get('origin'))) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  // Honeypot: real users never see the `website` field; bots fill it. Pretend
  // success so we don't reveal the trap, but never send the email.
  const honeypot = (payload as { website?: unknown } | null)?.website;
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 422 });
  }

  // CAPTCHA: verify the Turnstile token (Vercel sets x-forwarded-for).
  const token = (payload as { turnstileToken?: unknown } | null)?.turnstileToken;
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
  const captcha = await verifyTurnstile(token, ip);
  if (!captcha.ok) {
    return NextResponse.json({ error: 'captcha_failed' }, { status: 403 });
  }

  const { email, company, message } = parsed.data;
  const name = stripHeader(parsed.data.name);
  const service = stripHeader(parsed.data.service);

  const host = process.env.ZOHO_SMTP_HOST ?? 'smtp.zoho.com';
  const port = Number(process.env.ZOHO_SMTP_PORT ?? 465);
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASS;
  const to = process.env.CONTACT_TO ?? site.email;

  if (!user || !pass) {
    console.error('Contact form: missing ZOHO_SMTP_USER / ZOHO_SMTP_PASS');
    return NextResponse.json({ error: 'not_configured' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  const lines = [
    ['Nombre', name],
    ['Email', email],
    ['Empresa', company || '-'],
    ['Servicio', service],
  ];

  try {
    await transporter.sendMail({
      // The authenticated Zoho mailbox must be the sender.
      from: `"${site.name} Web" <${user}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Nuevo contacto: ${service} de ${name}`,
      text:
        lines.map(([k, v]) => `${k}: ${v}`).join('\n') +
        `\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;font-size:15px;color:#111">
          <h2 style="margin:0 0 16px">Nuevo mensaje desde el formulario web</h2>
          ${lines
            .map(
              ([k, v]) =>
                `<p style="margin:4px 0"><strong>${k}:</strong> ${esc(v)}</p>`
            )
            .join('')}
          <p style="margin:16px 0 4px"><strong>Mensaje:</strong></p>
          <p style="margin:0;white-space:pre-wrap">${esc(message)}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Contact form: failed to send email', error);
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

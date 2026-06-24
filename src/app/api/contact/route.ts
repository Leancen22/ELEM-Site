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

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 422 });
  }

  const { name, email, company, service, message } = parsed.data;

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
    ['Empresa', company || '—'],
    ['Servicio', service],
  ];

  try {
    await transporter.sendMail({
      // The authenticated Zoho mailbox must be the sender.
      from: `"${site.name} — Web" <${user}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Nuevo contacto: ${service} — ${name}`,
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

'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@/components/i18n/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/i18n/provider';
import type { Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

// Falls back to Cloudflare's official "always passes" test key so the widget
// works in dev. The real key is injected via env in Vercel.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA';

type TurnstileApi = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      callback: (token: string) => void;
      'expired-callback'?: () => void;
      'error-callback'?: () => void;
      theme?: 'auto' | 'light' | 'dark';
    }
  ) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type FormCopy = {
  name: string;
  namePlaceholder: string;
  email: string;
  company: string;
  companyPlaceholder: string;
  service: string;
  servicePlaceholder: string;
  services: string[];
  message: string;
  messagePlaceholder: string;
  consentPre: string;
  consentLink: string;
  consentPost: string;
  submit: string;
  sending: string;
  successTitle: string;
  successBody: string;
  sendAnother: string;
  sendError: string;
  captchaError: string;
  errors: {
    name: string;
    email: string;
    service: string;
    message: string;
    consent: string;
  };
};

const formCopy: Record<Locale, FormCopy> = {
  es: {
    name: 'Nombre',
    namePlaceholder: 'Tu nombre',
    email: 'Email',
    company: 'Empresa (opcional)',
    companyPlaceholder: 'Nombre de tu empresa',
    service: '¿En qué te ayudamos?',
    servicePlaceholder: 'Selecciona un servicio',
    services: ['Desarrollo web', 'Aplicaciones móviles', 'Desarrollo de software', 'Automatizaciones', 'Arquitectura empresarial', 'Integraciones / APIs', 'Modernización de sistemas', 'Cloud & DevOps', 'Otro'],
    message: 'Cuéntanos tu proyecto',
    messagePlaceholder: '¿Qué reto quieres resolver? Cuanto más nos cuentes, mejor.',
    consentPre: 'Acepto la ',
    consentLink: 'política de privacidad',
    consentPost: ' y el tratamiento de mis datos para responder a mi consulta.',
    submit: 'Enviar mensaje',
    sending: 'Enviando…',
    successTitle: '¡Mensaje enviado!',
    successBody: 'Gracias por escribirnos. Un arquitecto senior revisará tu caso y te responderá en menos de 24 horas.',
    sendAnother: 'Enviar otro mensaje',
    sendError: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a contacto@elem.uy.',
    captchaError: 'Verifica que no eres un robot antes de enviar.',
    errors: {
      name: 'Indícanos tu nombre',
      email: 'Introduce un email válido',
      service: 'Selecciona un servicio',
      message: 'Cuéntanos un poco más (mín. 10 caracteres)',
      consent: 'Necesitamos tu consentimiento',
    },
  },
  en: {
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    company: 'Company (optional)',
    companyPlaceholder: 'Your company name',
    service: 'How can we help?',
    servicePlaceholder: 'Select a service',
    services: ['Web development', 'Mobile apps', 'Software development', 'Automation', 'Enterprise architecture', 'Integrations / APIs', 'System modernization', 'Cloud & DevOps', 'Other'],
    message: 'Tell us about your project',
    messagePlaceholder: 'What challenge do you want to solve? The more you tell us, the better.',
    consentPre: 'I accept the ',
    consentLink: 'privacy policy',
    consentPost: ' and the processing of my data to answer my enquiry.',
    submit: 'Send message',
    sending: 'Sending…',
    successTitle: 'Message sent!',
    successBody: 'Thanks for reaching out. A senior architect will review your case and reply within 24 hours.',
    sendAnother: 'Send another message',
    sendError: 'We couldn’t send your message. Please try again or email us at contacto@elem.uy.',
    captchaError: 'Please confirm you are not a robot before sending.',
    errors: {
      name: 'Tell us your name',
      email: 'Enter a valid email',
      service: 'Select a service',
      message: 'Tell us a bit more (min. 10 characters)',
      consent: 'We need your consent',
    },
  },
};

function makeSchema(e: FormCopy['errors']) {
  return z.object({
    name: z.string().min(2, e.name),
    email: z.string().email(e.email),
    company: z.string().optional(),
    service: z.string().min(1, e.service),
    message: z.string().min(10, e.message),
    consent: z.literal(true, { errorMap: () => ({ message: e.consent }) }),
  });
}

export function ContactForm() {
  const locale = useLocale();
  const t = formCopy[locale];
  const schema = useMemo(() => makeSchema(t.errors), [t.errors]);
  type FormValues = z.infer<typeof schema>;
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  // Honeypot: kept out of react-hook-form so it never shows as a field.
  const honeypotRef = useRef<HTMLInputElement>(null);
  // Turnstile token + a handle to reset the widget after each attempt.
  const tokenRef = useRef('');
  const resetCaptchaRef = useRef<() => void>(() => {});
  // Stable handlers so the Turnstile widget isn't re-created on every render.
  const handleToken = useCallback((tok: string) => {
    tokenRef.current = tok;
    if (tok) setCaptchaError(false);
  }, []);
  const registerCaptchaReset = useCallback((fn: () => void) => {
    resetCaptchaRef.current = fn;
  }, []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setSendError(false);
    setCaptchaError(false);
    if (!tokenRef.current) {
      setCaptchaError(true);
      return;
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          website: honeypotRef.current?.value ?? '',
          turnstileToken: tokenRef.current,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setSent(true);
      reset();
    } catch {
      setSendError(true);
    } finally {
      // Turnstile tokens are single-use — reset for the next attempt.
      tokenRef.current = '';
      resetCaptchaRef.current();
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center rounded-3xl border border-rose-200 bg-card p-10 text-center shadow-card"
          >
            <span className="grid size-16 place-items-center rounded-full bg-brand-gradient text-white shadow-glow">
              <CheckCircle2 className="size-8" />
            </span>
            <h3 className="mt-6 font-display text-2xl font-bold">{t.successTitle}</h3>
            <p className="mt-2 max-w-sm text-muted-foreground">{t.successBody}</p>
            <Button onClick={() => setSent(false)} variant="secondary" className="mt-6">
              {t.sendAnother}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-card sm:p-8"
            noValidate
          >
            {/* Honeypot: hidden from users, off-screen and aria-hidden. Bots
                that auto-fill it get silently rejected by the API. */}
            <div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
              <label>
                Website
                <input
                  ref={honeypotRef}
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t.name} error={errors.name?.message}>
                <input
                  {...register('name')}
                  placeholder={t.namePlaceholder}
                  className={inputCls(!!errors.name)}
                />
              </Field>
              <Field label={t.email} error={errors.email?.message}>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="tu@empresa.com"
                  className={inputCls(!!errors.email)}
                />
              </Field>
            </div>

            <Field label={t.company} error={errors.company?.message}>
              <input
                {...register('company')}
                placeholder={t.companyPlaceholder}
                className={inputCls(false)}
              />
            </Field>

            <Field label={t.service} error={errors.service?.message}>
              <select {...register('service')} className={inputCls(!!errors.service)} defaultValue="">
                <option value="" disabled>
                  {t.servicePlaceholder}
                </option>
                {t.services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={t.message} error={errors.message?.message}>
              <textarea
                {...register('message')}
                rows={5}
                placeholder={t.messagePlaceholder}
                className={cn(inputCls(!!errors.message), 'resize-none')}
              />
            </Field>

            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                {...register('consent')}
                className="mt-0.5 size-4 rounded border-border text-rose-600 focus:ring-rose-500"
              />
              <span>
                {t.consentPre}
                <Link href="/legal/privacidad" className="font-medium text-rose-600 hover:underline">
                  {t.consentLink}
                </Link>
                {t.consentPost}
              </span>
            </label>
            {errors.consent?.message ? (
              <p className="-mt-2 text-xs font-medium text-rose-600">
                {errors.consent.message}
              </p>
            ) : null}

            {sendError ? (
              <p className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950/40">
                {t.sendError}
              </p>
            ) : null}

            <Turnstile onToken={handleToken} registerReset={registerCaptchaReset} />
            {captchaError ? (
              <p className="-mt-2 text-xs font-medium text-rose-600">{t.captchaError}</p>
            ) : null}

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> {t.sending}
                </>
              ) : (
                <>
                  {t.submit} <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

// Renders the Cloudflare Turnstile widget via the official script (no deps).
// Mounted only while the form is visible, so it re-renders cleanly after
// "send another". `onToken` receives the token; `registerReset` exposes a
// reset handle to the parent for single-use token refresh.
function Turnstile({
  onToken,
  registerReset,
}: {
  onToken: (token: string) => void;
  registerReset: (reset: () => void) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let widgetId: string | undefined;
    let cancelled = false;
    let poll: ReturnType<typeof setInterval> | undefined;

    const renderWidget = () => {
      if (cancelled || !ref.current || !window.turnstile || widgetId) return;
      widgetId = window.turnstile.render(ref.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token) => onToken(token),
        'expired-callback': () => onToken(''),
        'error-callback': () => onToken(''),
        theme: 'auto',
      });
      registerReset(() => window.turnstile?.reset(widgetId));
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      if (!document.getElementById('cf-turnstile-script')) {
        const s = document.createElement('script');
        s.id = 'cf-turnstile-script';
        s.src =
          'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
      }
      poll = setInterval(() => {
        if (window.turnstile) {
          if (poll) clearInterval(poll);
          renderWidget();
        }
      }, 150);
    }

    return () => {
      cancelled = true;
      if (poll) clearInterval(poll);
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onToken, registerReset]);

  return <div ref={ref} className="flex justify-start" />;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs font-medium text-rose-600">{error}</span> : null}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-rose-500/40',
    hasError ? 'border-rose-400' : 'border-border focus:border-rose-300'
  );
}

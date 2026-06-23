import 'server-only';
import type { TokenizerAndRendererExtension, Tokens } from 'marked';
import type { Locale } from '@/i18n/config';

/**
 * Markdown shortcodes for blog posts: a "link" card and a "download" card,
 * rendered as brand-styled HTML inside the prose body. Usage in any .md:
 *
 *   ::link
 *   href: https://example.com
 *   title: Read the spec
 *   text: Optional description.
 *   ::
 *
 *   ::download
 *   href: /files/resource.pdf
 *   title: Download the guide
 *   meta: PDF · Quick reference
 *   ::
 */

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const ICONS = {
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  arrow: '<path d="M7 17 17 7"/><path d="M7 7h10v10"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
};

const svg = (paths: string, size = 20) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const labels: Record<Locale, { download: string }> = {
  es: { download: 'Descargar' },
  en: { download: 'Download' },
};

const CARD =
  'not-prose group my-6 flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-5 no-underline shadow-card transition-all hover:-translate-y-0.5 hover:border-rose-200 hover:shadow-card-hover dark:hover:border-rose-500/30';

function localizeHref(href: string, locale: Locale) {
  if (locale === 'en' && href.startsWith('/') && !href.startsWith('//')) return `/en${href}`;
  return href;
}

type ShortcodeToken = Tokens.Generic & {
  type: 'shortcode';
  kind: 'link' | 'download';
  fields: Record<string, string>;
};

export function blogShortcodes(locale: Locale): TokenizerAndRendererExtension {
  const t = labels[locale];
  return {
    name: 'shortcode',
    level: 'block',
    start(src: string) {
      return src.match(/::(?:link|download)\b/)?.index;
    },
    tokenizer(src: string) {
      const rule = /^ {0,3}::(link|download)[ \t]*\n([\s\S]*?)\n {0,3}::[ \t]*(?:\n+|$)/;
      const m = rule.exec(src);
      if (!m) return undefined;
      const fields: Record<string, string> = {};
      for (const line of m[2].split('\n')) {
        const i = line.indexOf(':');
        if (i > 0) fields[line.slice(0, i).trim()] = line.slice(i + 1).trim();
      }
      const token: ShortcodeToken = {
        type: 'shortcode',
        raw: m[0],
        kind: m[1] as 'link' | 'download',
        fields,
      };
      return token;
    },
    renderer(tok) {
      const token = tok as ShortcodeToken;
      const f = token.fields;
      const title = esc(f.title || '');

      if (token.kind === 'link') {
        const external = /^https?:\/\//.test(f.href || '');
        const url = esc(external ? f.href || '#' : localizeHref(f.href || '#', locale));
        const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
        const text = f.text
          ? `<span class="mt-0.5 block text-sm text-muted-foreground">${esc(f.text)}</span>`
          : '';
        return (
          `<a href="${url}"${attrs} class="${CARD}">` +
          `<span class="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-white shadow-glow">${svg(ICONS.link)}</span>` +
          `<span class="min-w-0 flex-1"><span class="block font-display text-base font-bold text-foreground transition-colors group-hover:text-rose-600">${title}</span>${text}</span>` +
          `<span class="shrink-0 text-rose-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">${svg(ICONS.arrow, 18)}</span>` +
          `</a>`
        );
      }

      // download
      const href = esc(f.href || '#');
      const filename = f.filename ? ` download="${esc(f.filename)}"` : ' download';
      const meta = f.meta
        ? `<span class="mt-0.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">${esc(f.meta)}</span>`
        : '';
      return (
        `<a href="${href}"${filename} class="${CARD}">` +
        `<span class="grid size-11 shrink-0 place-items-center rounded-xl border border-border bg-background text-rose-600">${svg(ICONS.download)}</span>` +
        `<span class="min-w-0 flex-1"><span class="block font-display text-base font-bold text-foreground">${title}</span>${meta}</span>` +
        `<span class="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow">${svg(ICONS.download, 16)}${t.download}</span>` +
        `</a>`
      );
    },
  };
}

'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLocale } from '@/i18n/provider';
import { cn } from '@/lib/utils';

/**
 * "Live architecture" hero visual — an animated system topology
 * (clients → edge → API gateway → services → data) with data pulses flowing
 * through the connectors and floating SLA chips. Communicates how ELEM designs
 * and operates platforms, instead of listing technology logos. The classic
 * logo-orbit lives in `hero-orbit.tsx`.
 */

type Pulse = { path: string; dur: number; begin: number };

const flowPaths = {
  cw: 'M104,46 C104,70 150,78 168,93',
  cm: 'M200,46 L200,93',
  ca: 'M296,46 C296,70 250,78 232,93',
  eg: 'M200,127 L200,165',
  gwW: 'M168,215 C130,238 120,244 94,261',
  gwA: 'M200,215 L200,261',
  gwD: 'M232,215 C270,238 280,244 306,261',
  sW: 'M94,307 C94,330 120,340 150,346',
  sA: 'M200,307 L200,346',
  sD: 'M306,307 C306,330 280,340 250,346',
} as const;

const pulses: Pulse[] = [
  { path: flowPaths.cw, dur: 2.8, begin: 0.0 },
  { path: flowPaths.cm, dur: 2.6, begin: 0.4 },
  { path: flowPaths.ca, dur: 2.8, begin: 0.8 },
  { path: flowPaths.eg, dur: 1.7, begin: 0.3 },
  { path: flowPaths.gwW, dur: 2.4, begin: 0.0 },
  { path: flowPaths.gwA, dur: 2.2, begin: 0.6 },
  { path: flowPaths.gwD, dur: 2.4, begin: 1.1 },
  { path: flowPaths.sW, dur: 2.3, begin: 0.5 },
  { path: flowPaths.sA, dur: 2.1, begin: 1.0 },
  { path: flowPaths.sD, dur: 2.3, begin: 1.5 },
];

const copy = {
  es: { web: 'Web', mobile: 'Móvil', api: 'API', gateway: 'API Gateway', gwSub: 'Auth · Rate limit', roleWeb: 'Frontend', roleApi: 'Backend', roleData: 'Datos & IA', uptime: 'uptime', deploy: 'deploy continuo' },
  en: { web: 'Web', mobile: 'Mobile', api: 'API', gateway: 'API Gateway', gwSub: 'Auth · Rate limit', roleWeb: 'Frontend', roleApi: 'Backend', roleData: 'Data & AI', uptime: 'uptime', deploy: 'continuous deploy' },
} as const;

const card = { fill: 'hsl(var(--card))', stroke: 'hsl(var(--border))' };
const txt = 'hsl(var(--foreground))';
const sub = 'hsl(var(--muted-foreground))';

function Node({
  x,
  y,
  w,
  h,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children: React.ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={11} fill={card.fill} stroke={card.stroke} strokeWidth={1.4} />
      {children}
    </g>
  );
}

export function HeroSystem({ className }: { className?: string }) {
  const t = copy[useLocale()];
  const reduce = useReducedMotion();

  return (
    <div className={cn('relative mx-auto aspect-square w-full max-w-[520px]', className)} aria-hidden>
      {/* ambient brand glow */}
      <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gradient opacity-20 blur-3xl" />

      <svg viewBox="0 0 400 400" className="relative size-full font-display" fill="none">
        <defs>
          <linearGradient id="sys-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fb356b" />
            <stop offset="0.5" stopColor="#e6128f" />
            <stop offset="1" stopColor="#bc12d6" />
          </linearGradient>
          <radialGradient id="sys-pulse" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ff6890" />
            <stop offset="1" stopColor="#bc12d6" />
          </radialGradient>
        </defs>

        {/* connectors */}
        <g stroke="hsl(var(--border))" strokeWidth={1.6} strokeLinecap="round">
          {Object.values(flowPaths).map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        {/* data pulses travelling along the connectors */}
        {!reduce &&
          pulses.map((p, i) => (
            <circle key={i} r={3.1} fill="url(#sys-pulse)" style={{ filter: 'drop-shadow(0 0 4px rgba(251,53,107,.9))' }}>
              <animateMotion dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" calcMode="linear" path={p.path} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.85;1" dur={`${p.dur}s`} begin={`${p.begin}s`} repeatCount="indefinite" />
            </circle>
          ))}

        {/* ── clients ── */}
        {[
          { cx: 104, label: t.web },
          { cx: 200, label: t.mobile },
          { cx: 296, label: t.api },
        ].map((c) => (
          <Node key={c.label} x={c.cx - 30} y={22} w={60} h={24}>
            <text x={c.cx} y={38} textAnchor="middle" fontSize="11" fontWeight="600" fill={txt}>
              {c.label}
            </text>
          </Node>
        ))}

        {/* ── edge / CDN ── */}
        <Node x={125} y={93} w={150} h={34}>
          <text x={200} y={114} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={txt}>
            Edge · CDN
          </text>
        </Node>

        {/* ── API gateway (branded hub) ── */}
        <g>
          <rect x={114} y={165} width={172} height={50} rx={13} fill="url(#sys-brand)" />
          <rect x={114} y={165} width={172} height={50} rx={13} fill="url(#sys-brand)" opacity={0.5} style={{ filter: 'blur(7px)' }} />
          <text x={200} y={188} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">
            {t.gateway}
          </text>
          <text x={200} y={204} textAnchor="middle" fontSize="9.5" fontWeight="500" fill="rgba(255,255,255,.85)">
            {t.gwSub}
          </text>
        </g>

        {/* ── services ── */}
        {[
          { cx: 94, tech: 'Next.js', role: t.roleWeb },
          { cx: 200, tech: 'Java', role: t.roleApi },
          { cx: 306, tech: 'Python', role: t.roleData },
        ].map((s) => (
          <Node key={s.tech} x={s.cx - 53} y={261} w={106} h={46}>
            <circle cx={s.cx + 38} cy={273} r={3} fill="#22c55e">
              {!reduce && <animate attributeName="opacity" values="1;.25;1" dur="1.8s" repeatCount="indefinite" />}
            </circle>
            <text x={s.cx} y={282} textAnchor="middle" fontSize="13" fontWeight="700" fill={txt}>
              {s.tech}
            </text>
            <text x={s.cx} y={296} textAnchor="middle" fontSize="9" fontWeight="500" fill={sub}>
              {s.role}
            </text>
          </Node>
        ))}

        {/* ── data layer ── */}
        <Node x={75} y={346} w={250} h={40}>
          <text x={200} y={371} textAnchor="middle" fontSize="12" fontWeight="700" fill={txt}>
            PostgreSQL · Redis · Kafka
          </text>
        </Node>
      </svg>

      {/* floating SLA chips */}
      <FloatChip className="left-[1%] top-[20%]" delay={0}>
        <span className="size-1.5 rounded-full bg-emerald-500" />
        <span className="font-semibold text-foreground">99.99%</span>
        <span className="text-muted-foreground">{t.uptime}</span>
      </FloatChip>
      <FloatChip className="right-[0%] top-[46%]" delay={1.1}>
        <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">p99</span>
        <span className="text-muted-foreground">98 ms</span>
      </FloatChip>
      <FloatChip className="bottom-[12%] left-[3%]" delay={0.6}>
        <span className="size-1.5 rounded-full bg-brand-gradient" />
        <span className="text-muted-foreground">{t.deploy}</span>
      </FloatChip>
    </div>
  );
}

function FloatChip({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(
        'absolute inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs shadow-card backdrop-blur',
        className
      )}
      animate={reduce ? undefined : { y: [0, -7, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
}

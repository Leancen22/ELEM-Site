import type { TechKey } from '@/components/visuals/tech-logos';
import type { Locale } from '@/i18n/config';

export type CaseStudy = {
  slug: string;
  client: string;
  sector: string;
  title: string;
  summary: string;
  impact: string;
  kpis: { value: string; label: string }[];
  tech: TechKey[];
  accent: string;
  featured?: boolean;
};

export const cases: Record<Locale, CaseStudy[]> = {
  es: [
    {
      slug: 'banco-atlas-core',
      client: 'Banco Atlas',
      sector: 'Banca',
      title: 'Core de pagos modernizado a microservicios',
      summary:
        'Migramos un core monolítico a una arquitectura event-driven en Java y Node.js sobre Kubernetes, sin una sola interrupción de servicio.',
      impact: 'De 6 a 0,3 segundos de latencia media en transacciones.',
      kpis: [
        { value: '-95%', label: 'latencia' },
        { value: '99.99%', label: 'uptime' },
        { value: '3×', label: 'throughput' },
      ],
      tech: ['java', 'node', 'kubernetes', 'aws'],
      accent: 'from-rose-500 to-fuchsia-600',
      featured: true,
    },
    {
      slug: 'retailmax-headless',
      client: 'RetailMax',
      sector: 'E-commerce',
      title: 'Plataforma headless con Drupal + React',
      summary:
        'Catálogo de 1,2M de SKU servido por Drupal headless y un frontend React con performance de primer nivel.',
      impact: '+38% de conversión y LCP por debajo de un segundo.',
      kpis: [
        { value: '+38%', label: 'conversión' },
        { value: '0.8s', label: 'LCP' },
        { value: '1.2M', label: 'SKU' },
      ],
      tech: ['drupal', 'react', 'php', 'docker'],
      accent: 'from-fuchsia-500 to-rose-600',
      featured: true,
    },
    {
      slug: 'govdigital-portal',
      client: 'GovDigital',
      sector: 'Sector público',
      title: 'Portal ciudadano accesible para 4M de usuarios',
      summary:
        'Sede electrónica conforme a WCAG AAA con 4 millones de trámites digitales al año y reducción drástica de tiempos de gestión.',
      impact: 'Accesibilidad AAA y -60% en tiempo de gestión.',
      kpis: [
        { value: 'AAA', label: 'accesibilidad' },
        { value: '4M', label: 'trámites/año' },
        { value: '-60%', label: 'tiempo gestión' },
      ],
      tech: ['drupal', 'react', 'php', 'aws'],
      accent: 'from-rose-600 to-purple-600',
    },
    {
      slug: 'novahealth-realtime',
      client: 'NovaHealth',
      sector: 'Salud',
      title: 'Plataforma clínica en tiempo real',
      summary:
        'Sistema de monitorización en tiempo real con Node.js y WebSockets que conecta dispositivos médicos y equipos asistenciales.',
      impact: '120k eventos/min procesados con latencia sub-50ms.',
      kpis: [
        { value: '120k', label: 'eventos/min' },
        { value: '<50ms', label: 'latencia' },
        { value: '24/7', label: 'disponibilidad' },
      ],
      tech: ['node', 'react', 'kubernetes'],
      accent: 'from-rose-500 to-pink-600',
    },
    {
      slug: 'logitrans-integraciones',
      client: 'LogiTrans',
      sector: 'Logística',
      title: 'Integración ERP y trazabilidad de flota',
      summary:
        'Conectamos SAP con una plataforma de seguimiento construida en Java, unificando datos de flota en tiempo real.',
      impact: 'Visibilidad total de 8.000 vehículos y -30% de incidencias.',
      kpis: [
        { value: '8.000', label: 'vehículos' },
        { value: '-30%', label: 'incidencias' },
        { value: 'SAP', label: 'integración' },
      ],
      tech: ['java', 'node', 'aws'],
      accent: 'from-fuchsia-600 to-purple-600',
    },
    {
      slug: 'eduprime-saas',
      client: 'EduPrime',
      sector: 'Educación',
      title: 'SaaS educativo multi-tenant',
      summary:
        'Plataforma de aprendizaje multi-tenant con React y PHP, escalada a más de 500 instituciones.',
      impact: '500+ instituciones y 1,5M de estudiantes activos.',
      kpis: [
        { value: '500+', label: 'instituciones' },
        { value: '1.5M', label: 'estudiantes' },
        { value: '99.9%', label: 'uptime' },
      ],
      tech: ['react', 'php', 'docker'],
      accent: 'from-rose-500 to-fuchsia-500',
    },
  ],
  en: [
    {
      slug: 'banco-atlas-core',
      client: 'Banco Atlas',
      sector: 'Banking',
      title: 'Payments core modernized to microservices',
      summary:
        'We migrated a monolithic core to an event-driven architecture in Java and Node.js on Kubernetes, without a single service interruption.',
      impact: 'From 6 to 0.3 seconds average transaction latency.',
      kpis: [
        { value: '-95%', label: 'latency' },
        { value: '99.99%', label: 'uptime' },
        { value: '3×', label: 'throughput' },
      ],
      tech: ['java', 'node', 'kubernetes', 'aws'],
      accent: 'from-rose-500 to-fuchsia-600',
      featured: true,
    },
    {
      slug: 'retailmax-headless',
      client: 'RetailMax',
      sector: 'E-commerce',
      title: 'Headless platform with Drupal + React',
      summary:
        'A 1.2M SKU catalog served by headless Drupal and a React frontend with top-tier performance.',
      impact: '+38% conversion and sub-second LCP.',
      kpis: [
        { value: '+38%', label: 'conversion' },
        { value: '0.8s', label: 'LCP' },
        { value: '1.2M', label: 'SKU' },
      ],
      tech: ['drupal', 'react', 'php', 'docker'],
      accent: 'from-fuchsia-500 to-rose-600',
      featured: true,
    },
    {
      slug: 'govdigital-portal',
      client: 'GovDigital',
      sector: 'Public sector',
      title: 'Accessible citizen portal for 4M users',
      summary:
        'A WCAG AAA-compliant e-government site with 4 million digital procedures a year and a drastic reduction in processing times.',
      impact: 'AAA accessibility and -60% processing time.',
      kpis: [
        { value: 'AAA', label: 'accessibility' },
        { value: '4M', label: 'procedures/yr' },
        { value: '-60%', label: 'processing time' },
      ],
      tech: ['drupal', 'react', 'php', 'aws'],
      accent: 'from-rose-600 to-purple-600',
    },
    {
      slug: 'novahealth-realtime',
      client: 'NovaHealth',
      sector: 'Healthcare',
      title: 'Real-time clinical platform',
      summary:
        'A real-time monitoring system with Node.js and WebSockets connecting medical devices and care teams.',
      impact: '120k events/min processed with sub-50ms latency.',
      kpis: [
        { value: '120k', label: 'events/min' },
        { value: '<50ms', label: 'latency' },
        { value: '24/7', label: 'availability' },
      ],
      tech: ['node', 'react', 'kubernetes'],
      accent: 'from-rose-500 to-pink-600',
    },
    {
      slug: 'logitrans-integraciones',
      client: 'LogiTrans',
      sector: 'Logistics',
      title: 'ERP integration and fleet tracking',
      summary:
        'We connected SAP with a tracking platform built in Java, unifying fleet data in real time.',
      impact: 'Full visibility of 8,000 vehicles and -30% incidents.',
      kpis: [
        { value: '8,000', label: 'vehicles' },
        { value: '-30%', label: 'incidents' },
        { value: 'SAP', label: 'integration' },
      ],
      tech: ['java', 'node', 'aws'],
      accent: 'from-fuchsia-600 to-purple-600',
    },
    {
      slug: 'eduprime-saas',
      client: 'EduPrime',
      sector: 'Education',
      title: 'Multi-tenant education SaaS',
      summary:
        'A multi-tenant learning platform with React and PHP, scaled to more than 500 institutions.',
      impact: '500+ institutions and 1.5M active students.',
      kpis: [
        { value: '500+', label: 'institutions' },
        { value: '1.5M', label: 'students' },
        { value: '99.9%', label: 'uptime' },
      ],
      tech: ['react', 'php', 'docker'],
      accent: 'from-rose-500 to-fuchsia-500',
    },
  ],
};

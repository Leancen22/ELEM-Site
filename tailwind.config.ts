import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx}',
    './src/content/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1360px' },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // Brand scale (rose-driven tech identity)
        rose: {
          50: '#fff1f4',
          100: '#ffe2e8',
          200: '#ffc9d6',
          300: '#ff9fb6',
          400: '#ff6890',
          500: '#fb356b',
          600: '#e81457',
          700: '#c40847',
          800: '#a40a43',
          900: '#8a0d40',
          950: '#4d011f',
        },
        fuchsia: {
          400: '#e879f9',
          500: '#d624f0',
          600: '#bc12d6',
        },
        magenta: '#e6128f',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(232, 20, 87, 0.45)',
        'glow-lg': '0 0 120px -20px rgba(232, 20, 87, 0.55)',
        card: '0 1px 1px rgba(0,0,0,.04), 0 8px 24px -12px rgba(80,0,40,.18)',
        'card-hover': '0 1px 1px rgba(0,0,0,.04), 0 24px 60px -20px rgba(196,8,71,.35)',
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(120deg, #fb356b 0%, #e6128f 45%, #bc12d6 100%)',
        'brand-gradient-soft':
          'linear-gradient(120deg, #ff6890 0%, #e879f9 100%)',
        'mesh-rose':
          'radial-gradient(at 18% 20%, rgba(251,53,107,.28) 0px, transparent 50%), radial-gradient(at 82% 12%, rgba(214,36,240,.22) 0px, transparent 50%), radial-gradient(at 70% 80%, rgba(230,18,143,.20) 0px, transparent 55%), radial-gradient(at 12% 78%, rgba(255,104,144,.18) 0px, transparent 50%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-22px) translateX(10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up': 'accordion-up 0.3s ease-out',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        marquee: 'marquee 38s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};

export default config;

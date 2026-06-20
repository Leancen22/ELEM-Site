'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Premium smooth scrolling powered by Lenis.
 * - Disabled for touch devices (native scroll) and reduced-motion users.
 * - Updates the real window scroll position, so Framer Motion's `useScroll`
 *   (scroll progress bar, methodology timeline, parallax) keeps working.
 * - Intercepts same-page anchor links so they glide instead of jumping.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isCoarse) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Smooth in-page anchor navigation.
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || !href.includes('#')) return;

      const [path, hash] = href.split('#');
      const samePage = path === '' || path === window.location.pathname;
      if (!hash || !samePage) return;

      const el = document.getElementById(hash);
      if (!el) return;

      e.preventDefault();
      lenis.scrollTo(el, { offset: -96 });
      history.pushState(null, '', `#${hash}`);
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}

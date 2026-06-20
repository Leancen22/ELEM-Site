import { notFound } from 'next/navigation';

/**
 * Catch-all for unknown paths under a locale. Without it, unmatched routes fall
 * back to Next.js' bare default 404 instead of our brand-styled `not-found.tsx`.
 */
export default function CatchAllNotFound() {
  notFound();
}

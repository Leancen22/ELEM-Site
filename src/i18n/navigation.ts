import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/** Locale-aware navigation APIs (translate slugs and handle the /en prefix). */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

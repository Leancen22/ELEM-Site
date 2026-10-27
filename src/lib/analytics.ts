import { site } from '@/lib/site';

// GA4 loads only in production builds, so local dev doesn't pollute the stats.
// NEXT_PUBLIC_GA_ID overrides the default ID; set it to empty to disable.
const id = process.env.NEXT_PUBLIC_GA_ID ?? site.gaId;

/** The GA4 Measurement ID when analytics is enabled, otherwise null. */
export const gaId = process.env.NODE_ENV === 'production' && id ? id : null;

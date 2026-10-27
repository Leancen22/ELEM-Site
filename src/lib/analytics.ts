import { site } from '@/lib/site';

// NEXT_PUBLIC_GA_ID overrides the default ID; set it to empty to disable.
const id = process.env.NEXT_PUBLIC_GA_ID ?? site.gaId;

/** The GA4 Measurement ID, or null when analytics is disabled. */
export const gaId = id || null;

// GA itself only loads in production builds, so local dev doesn't pollute the
// stats; the consent banner still shows in dev so it can be tested.
export const loadAnalytics = process.env.NODE_ENV === 'production';

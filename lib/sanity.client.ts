import { createClient } from '@sanity/client';
import { dataset, projectId, apiVersion } from '@/sanity/env';

// Client-side Sanity client (no token)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
});

// Server-side only functions should be moved to sanity.admin.ts

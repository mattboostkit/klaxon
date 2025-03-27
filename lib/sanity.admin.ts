import { createClient } from '@sanity/client';
import { dataset, projectId, apiVersion } from '@/sanity/env';

// This client is used for admin operations like creating content
export const adminClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Always use the API directly for write operations
  perspective: 'published',
});

/**
 * This file contains the unified Sanity client configuration for the application
 */

import { createClient } from '@sanity/client';
import { dataset, projectId, apiVersion } from '@/sanity/env';

// Create a standard client for read operations
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for build time to avoid stale content
  token: process.env.SANITY_API_TOKEN, // Token needed for private datasets
  perspective: 'published'
});

// Admin client with write permissions (only use server-side)
export const adminClient = client.withConfig({
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Never use CDN for admin operations
});

// Function to get posts for blog pages
export async function getPosts() {
  return client.fetch(`
    *[_type == "post" && defined(slug.current)] {
      _id,
      title,
      excerpt,
      "slug": slug,
      mainImage,
      publishedAt,
      "categories": categories[]->title,
      "author": author->name
    } | order(publishedAt desc)
  `);
}

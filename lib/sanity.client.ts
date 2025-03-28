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

// Function to fetch blog posts
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

// Server-side only functions should be moved to sanity.admin.ts

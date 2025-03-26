import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Create a client with fallback for image URLs
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'lcql4dst',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-04-20',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

// Modified to handle missing images gracefully
export function urlFor(source: SanityImageSource | undefined) {
  if (!source) {
    return {
      url: () => 'https://via.placeholder.com/800x450?text=Image+Not+Available',
      width: () => ({ height: () => ({ url: () => 'https://via.placeholder.com/800x450?text=Image+Not+Available' }) }),
    };
  }
  return builder.image(source);
}
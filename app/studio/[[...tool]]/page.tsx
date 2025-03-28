/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config';

export const dynamic = 'force-static';

export { metadata, viewport } from 'next-sanity/studio';

// We're disabling the Studio temporarily until schema issues are fixed
export default function StudioPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Sanity Studio Temporarily Unavailable</h1>
      <p>The Sanity Studio is currently being updated. Please check back later.</p>
    </div>
  );
}

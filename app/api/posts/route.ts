import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity.client';

export async function GET() {
  try {
    // Always use public client for API routes called from browser
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      excerpt,
      "category": category->title,
      "author": author->name,
      publishedAt,
      "imageUrl": mainImage.asset->url,
      "href": "/blog/" + slug.current
    }`);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

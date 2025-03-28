import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity.client';

// Fallback mock posts for when Sanity is unavailable
const MOCK_POSTS = [
  {
    _id: 'mock-post-1',
    title: 'Video Editing Trends for 2025',
    excerpt: 'Discover the latest trends in video editing that will dominate 2025.',
    category: 'Editing',
    author: 'Klaxon Team',
    publishedAt: new Date().toISOString(),
    imageUrl: null,
    href: '/blog/video-editing-trends-2025'
  },
  {
    _id: 'mock-post-2',
    title: 'Visual Storytelling in Video Production',
    excerpt: 'Learn how to tell compelling stories through visual elements in your videos.',
    category: 'Video Production',
    author: 'Klaxon Team',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    imageUrl: null,
    href: '/blog/visual-storytelling-video-production'
  },
  {
    _id: 'mock-post-3',
    title: 'The Art of Sound Design in Video Production',
    excerpt: 'Explore how sound design can elevate your video productions to new heights.',
    category: 'Sound Design',
    author: 'Klaxon Team',
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    imageUrl: null,
    href: '/blog/sound-design-video-production'
  }
];

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
    
    // If no posts were found or the array is empty, use mocks
    if (!posts || posts.length === 0) {
      console.log("No posts found, returning mock data");
      return NextResponse.json(MOCK_POSTS);
    }
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts from Sanity:", error);
    // Return mock posts instead of an error
    return NextResponse.json(MOCK_POSTS);
  }
}

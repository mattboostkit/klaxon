import { Suspense } from 'react';
import { client } from '@/lib/sanity.client';
import { BlogHero } from '@/components/BlogHero';
import { Newsletter } from '@/components/Newsletter';
import { CTASection } from '@/components/CTASection';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'Blog | Klaxon Studio',
  description: 'Insights, tips, and resources from Klaxon Studio to help you navigate the video production landscape.',
};

// Fallback data for when Sanity is unavailable
const MOCK_CATEGORIES = [
  { title: 'Video Production' },
  { title: 'Sound Design' },
  { title: 'Editing' }
];

const MOCK_POSTS = [
  {
    _id: 'mock-post-1',
    title: 'Video Editing Trends for 2025',
    slug: { current: 'video-editing-trends-2025' },
    excerpt: 'Discover the latest trends in video editing that will dominate 2025.',
    mainImage: null,
    publishedAt: new Date().toISOString(),
    categories: ['Video Production', 'Editing'],
    author: 'Klaxon Team'
  },
  {
    _id: 'mock-post-2',
    title: 'Visual Storytelling in Video Production',
    slug: { current: 'visual-storytelling-video-production' },
    excerpt: 'Learn how to tell compelling stories through visual elements in your videos.',
    mainImage: null,
    publishedAt: new Date().toISOString(),
    categories: ['Video Production'],
    author: 'Klaxon Team'
  },
  {
    _id: 'mock-post-3',
    title: 'The Art of Sound Design in Video Production',
    slug: { current: 'sound-design-video-production' },
    excerpt: 'Explore how sound design can elevate your video productions to new heights.',
    mainImage: null,
    publishedAt: new Date().toISOString(),
    categories: ['Sound Design', 'Video Production'],
    author: 'Klaxon Team'
  }
];

async function getBlogCategories() {
  try {
    const categories = await client.fetch(`
      *[_type == "category"]{
        title
      }
    `);
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return mock categories if Sanity fetch fails
    return MOCK_CATEGORIES;
  }
}

async function getBlogPosts() {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        publishedAt,
        "categories": categories[]->title,
        "author": author->name
      }
    `);
    
    // If no posts were found or the array is empty, use mocks
    if (!posts || posts.length === 0) {
      return MOCK_POSTS;
    }
    
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Return mock posts if Sanity fetch fails
    return MOCK_POSTS;
  }
}

export default async function BlogPage() {
  const categories = await getBlogCategories();
  const posts = await getBlogPosts();
  
  return (
    <>
      <BlogHero />
      <section className="py-16 bg-klaxon-gray">
        <div className="container mx-auto px-6">
          <Suspense fallback={<div className="h-96 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-klaxon-accent border-t-transparent rounded-full animate-spin"></div>
          </div>}>
            <BlogClient categories={categories} posts={posts} />
          </Suspense>
        </div>
      </section>
      <Newsletter />
      <CTASection />
    </>
  );
}

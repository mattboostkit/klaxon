import { Suspense } from 'react';
import { client } from '@/lib/sanity';
import { BlogHero } from '@/components/BlogHero';
import { Newsletter } from '@/components/Newsletter';
import { CTASection } from '@/components/CTASection';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'Blog | Klaxon Studio',
  description: 'Insights, tips, and resources from Klaxon Studio to help you navigate the video production landscape.',
};

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
    return [];
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
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const categories = await getBlogCategories();
  const posts = await getBlogPosts();
  
  return (
    <>
      <BlogHero onSearch={(query) => {}} />
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
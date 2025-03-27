import { createClient } from 'next-sanity';
import { dataset, projectId, apiVersion } from '@/sanity/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Only use the token for authenticated requests, not for public content
  token: process.env.SANITY_API_TOKEN,
  useCdn: process.env.NODE_ENV === 'production',
});

export async function getPosts() {
  // For demo purposes, we'll return mock data
  // In production, you would fetch from Sanity with:
  // return client.fetch(`*[_type == "post"] | order(publishedAt desc) {...}`);
  
  return [
    {
      id: 1,
      title: 'The Importance of Brand Consistency Across Digital Platforms',
      excerpt: 'Discover why maintaining a consistent brand voice and visual identity across all digital touchpoints is crucial for business success.',
      category: 'Branding',
      author: 'Sarah Johnson',
      date: new Date('2023-09-15'),
      imageUrl: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      href: '/blog/brand-consistency',
    },
    {
      id: 2,
      title: 'Web Design Trends to Watch in 2025',
      excerpt: 'Explore the cutting-edge design trends that are shaping the digital landscape and how to incorporate them into your website.',
      category: 'Web Design',
      author: 'Michael Chen',
      date: new Date('2023-09-10'),
      imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      href: '/blog/web-design-trends',
    },
    {
      id: 3,
      title: 'How to Create a Successful Digital Marketing Strategy',
      excerpt: 'Learn the key components of an effective digital marketing strategy and how to implement them for your business.',
      category: 'Digital Marketing',
      author: 'Emma Davis',
      date: new Date('2023-09-05'),
      imageUrl: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      href: '/blog/digital-marketing-strategy',
    },
    {
      id: 4,
      title: 'The Power of User Experience in Driving Conversions',
      excerpt: 'Understand how UX design principles can significantly impact your conversion rates and overall business success.',
      category: 'Development',
      author: 'Robert Kim',
      date: new Date('2023-08-28'),
      imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      href: '/blog/ux-driving-conversions',
    },
    {
      id: 5,
      title: '10 Tips for Optimizing Your Website for Search Engines',
      excerpt: 'Practical tips and strategies to improve your website\'s visibility in search engine results and drive organic traffic.',
      category: 'Tips & Tricks',
      author: 'Jennifer Lopez',
      date: new Date('2023-08-20'),
      imageUrl: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      href: '/blog/seo-optimization-tips',
    },
    {
      id: 6,
      title: 'The Future of Web Development: What to Expect in 2026',
      excerpt: 'A look ahead at the emerging technologies and trends that will shape the web development landscape in the coming years.',
      category: 'Development',
      author: 'David Wilson',
      date: new Date('2023-08-15'),
      imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      href: '/blog/future-web-development',
    },
  ];
}

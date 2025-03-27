'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';
import { urlFor } from '@/lib/sanity';

// Define the Post type
interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: Date;
  imageUrl: string;
  href: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

interface BlogGridProps {
  searchQuery: string;
  selectedCategory: string | null;
  posts?: any[]; // Make posts optional to maintain backward compatibility
}

export function BlogGrid({ searchQuery, selectedCategory, posts: propPosts }: BlogGridProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(!propPosts);

  useEffect(() => {
    // If posts are provided as props, use them
    if (propPosts) {
      const formattedPosts = propPosts.map((post: any) => ({
        ...post,
        date: post.date instanceof Date ? post.date : new Date(post.publishedAt || Date.now()),
        imageUrl: post.mainImage ? urlFor(post.mainImage).url() : '/placeholder.jpg',
        href: `/blog/${post.slug.current}`,
        id: post._id,
        category: post.categories?.[0] || 'Uncategorized'
      }));
      setPosts(formattedPosts);
      setLoading(false);
      return;
    }
    
    // Otherwise fetch posts
    async function fetchPosts() {
      try {
        // In a real app, this would be an API call to your backend
        // For now, we'll import the mock data directly
        const { getPosts } = await import('@/lib/sanity.client');
        const fetchedPosts = await getPosts();
        
        // Convert string dates to Date objects if needed
        const formattedPosts = fetchedPosts.map((post: any) => ({
          ...post,
          date: post.date instanceof Date ? post.date : new Date(post.date),
        }));
        
        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [propPosts]);

  // Filter posts based on search query and selected category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-klaxon-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold text-klaxon-white mb-4">No posts found</h3>
        <p className="text-klaxon-white text-opacity-70">
          Try adjusting your search or filter criteria to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {filteredPosts.map((post) => (
        <motion.article
          key={post.id}
          variants={itemVariants}
          className="bg-klaxon-black rounded-lg overflow-hidden group cursor-pointer"
        >
          <Link href={post.href} className="block">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <span className="text-sm text-klaxon-accent">{post.category}</span>
                <span className="mx-2 text-klaxon-white text-opacity-30">•</span>
                <span className="text-sm text-klaxon-white text-opacity-60">
                  {formatDistanceToNow(post.date, { addSuffix: true })}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-klaxon-white mb-3 group-hover:text-klaxon-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-klaxon-white text-opacity-70 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-klaxon-accent flex items-center justify-center text-klaxon-white font-semibold text-sm">
                  {post.author.split(' ').map(name => name[0]).join('')}
                </div>
                <span className="ml-2 text-sm text-klaxon-white">
                  {post.author}
                </span>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}

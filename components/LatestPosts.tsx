'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

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

export function LatestPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        
        // Only show the first 3 posts
        setPosts(formattedPosts.slice(0, 3));
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <section className="py-24 bg-klaxon-gray">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-klaxon-white mb-4">
              Latest from the <span className="text-klaxon-accent">Blog</span>
            </h2>
            <p className="text-klaxon-white text-opacity-80 max-w-xl">
              Insights, tips, and resources to help you navigate the digital landscape.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Link 
              href="/blog" 
              className="text-klaxon-white hover:text-klaxon-accent transition-colors inline-flex items-center"
            >
              View All Posts
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-klaxon-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {posts.map((post) => (
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
        )}
      </div>
    </section>
  );
}
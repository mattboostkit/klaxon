'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BlogGrid } from '@/components/BlogGrid';

interface ClientBlogPageProps {
  categories: any[];
  posts: any[];
}

export default function BlogClient({ categories, posts }: ClientBlogPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const categoryButtons = categories.length > 0 
    ? categories.map(cat => cat.title) 
    : ['Video Production', 'Storytelling', 'Video Editing', 'Sound Design'];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        <button
          onClick={() => handleCategoryChange(null)}
          className={`px-6 py-2 rounded-full ${
            selectedCategory === null
              ? 'bg-klaxon-accent text-klaxon-white'
              : 'bg-klaxon-black text-klaxon-white hover:bg-klaxon-black/80'
          } transition-colors`}
        >
          All
        </button>
        {categoryButtons.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-6 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-klaxon-accent text-klaxon-white'
                : 'bg-klaxon-black text-klaxon-white hover:bg-klaxon-black/80'
            } transition-colors`}
          >
            {category}
          </button>
        ))}
      </motion.div>
      
      <BlogGrid 
        searchQuery={searchQuery} 
        selectedCategory={selectedCategory} 
        posts={posts}
      />
    </>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search } from 'lucide-react';

interface BlogHeroProps {
  onSearch: (query: string) => void;
}

export function BlogHero({ onSearch }: BlogHeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="pt-36 pb-20 bg-klaxon-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-klaxon-accent"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-klaxon-accent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-klaxon-white mb-6">
            Our <span className="text-klaxon-accent">Blog</span>
          </h1>
          <p className="text-klaxon-white text-opacity-80 text-xl mb-10">
            Insights, tips, and resources to help you navigate the video production landscape.
          </p>
          
          {/* Search Form */}
          <form 
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto relative"
          >
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-klaxon-gray border border-klaxon-white border-opacity-10 text-klaxon-white placeholder-klaxon-white placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-klaxon-accent pr-14"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-klaxon-white hover:text-klaxon-accent transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
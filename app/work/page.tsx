'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { WorkHero } from '@/components/WorkHero';
import { PortfolioGrid } from '@/components/PortfolioGrid';
import { ClientsSection } from '@/components/ClientsSection';
import { CTASection } from '@/components/CTASection';

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <WorkHero />
      <section className="py-16 bg-klaxon-gray">
        <div className="container mx-auto px-6">
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
            {['Branding', 'Web Design', 'Development', 'UI/UX', 'Marketing'].map((category) => (
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
          
          <PortfolioGrid selectedCategory={selectedCategory} />
        </div>
      </section>
      <ClientsSection />
      <CTASection />
    </>
  );
}
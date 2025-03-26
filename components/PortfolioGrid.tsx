'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// This would typically come from Sanity
const projects = [
  {
    id: 1,
    title: 'Brand Identity Design',
    category: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    href: '/work/brand-identity-design',
  },
  {
    id: 2,
    title: 'E-Commerce Website',
    category: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1555421689-3f034debb7a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    href: '/work/e-commerce-website',
  },
  {
    id: 3,
    title: 'Mobile App Development',
    category: 'Development',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    href: '/work/mobile-app-development',
  },
  {
    id: 4,
    title: 'Social Media Campaign',
    category: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    href: '/work/social-media-campaign',
  },
  {
    id: 5,
    title: 'UX Research & Design',
    category: 'UI/UX',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    href: '/work/ux-research-design',
  },
  {
    id: 6,
    title: 'Corporate Brand Refresh',
    category: 'Branding',
    imageUrl: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    href: '/work/corporate-brand-refresh',
  },
];

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

interface PortfolioGridProps {
  selectedCategory: string | null;
}

export function PortfolioGrid({ selectedCategory }: PortfolioGridProps) {
  // Filter projects based on selected category
  const filteredProjects = selectedCategory
    ? projects.filter(project => project.category === selectedCategory)
    : projects;

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-2xl font-semibold text-klaxon-white mb-4">No projects found</h3>
        <p className="text-klaxon-white text-opacity-70">
          Try selecting a different category to find what you're looking for.
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
      {filteredProjects.map((project) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          className="portfolio-item group"
        >
          <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="portfolio-item-overlay">
              <div className="text-center p-6">
                <span className="text-klaxon-accent text-sm font-medium mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold text-klaxon-white mb-4">
                  {project.title}
                </h3>
                <Link
                  href={project.href}
                  className="inline-block px-6 py-2 border border-klaxon-accent text-klaxon-accent hover:bg-klaxon-accent hover:text-klaxon-white transition-colors"
                >
                  View Project
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
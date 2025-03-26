'use client';

import { motion } from 'framer-motion';

export function WorkHero() {
  return (
    <section className="bg-klaxon-black text-klaxon-white py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-xl md:text-2xl text-klaxon-gray-light mb-8">
            Explore our portfolio of creative projects and successful collaborations
          </p>
          <div className="w-24 h-1 bg-klaxon-accent mx-auto"></div>
        </motion.div>
      </div>
    </section>
  );
}

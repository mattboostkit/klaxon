'use client';

import { motion } from 'framer-motion';
import { ClientLogos } from './ClientLogos';

export function ClientsSection() {
  return (
    <section className="py-20 bg-klaxon-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
          <p className="text-lg text-klaxon-gray-dark max-w-2xl mx-auto">
            We&apos;ve had the privilege of working with some amazing companies across various industries
          </p>
        </motion.div>
        
        <ClientLogos />
      </div>
    </section>
  );
}

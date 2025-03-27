'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 bg-klaxon-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-klaxon-accent"></div>
        <div className="absolute top-40 right-10 w-40 h-40 rounded-full bg-klaxon-accent"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-klaxon-accent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-klaxon-gray p-12 md:p-16 rounded-lg text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-klaxon-white mb-6">
            Ready to Transform Your <span className="text-klaxon-accent">Digital Presence</span>?
          </h2>
          <p className="text-klaxon-white text-opacity-80 mb-10 max-w-2xl mx-auto">
            Let&apos;s collaborate and create something extraordinary together. Reach out to discuss your project or schedule a consultation with our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-klaxon-accent text-klaxon-white px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Get in Touch
            </Link>
            <Link 
              href="/work" 
              className="border border-klaxon-white text-klaxon-white px-8 py-3 rounded-md hover:bg-klaxon-white hover:bg-opacity-10 transition-colors"
            >
              Explore Our Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

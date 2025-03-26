'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export function AboutSnippet() {
  return (
    <section className="py-24 bg-klaxon-black">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative h-[500px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
              alt="Klaxon Studio Team"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-klaxon-black to-transparent opacity-60"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-klaxon-accent uppercase tracking-wider text-sm font-medium mb-2 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-klaxon-white mb-6">
              We are a creative studio focused on building <span className="text-klaxon-accent">digital experiences</span>
            </h2>
            <p className="text-klaxon-white text-opacity-80 mb-6">
              Founded in 2020, Klaxon Studio is a creative agency that combines strategy, design, and technology to create memorable digital experiences for forward-thinking brands and businesses.
            </p>
            <p className="text-klaxon-white text-opacity-80 mb-8">
              Our team of designers, developers, and marketing experts work collaboratively to deliver innovative solutions that help our clients stand out in today's competitive digital landscape.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-10">
              <div>
                <h3 className="text-klaxon-accent text-4xl font-bold mb-2">100+</h3>
                <p className="text-klaxon-white">Projects Delivered</p>
              </div>
              <div>
                <h3 className="text-klaxon-accent text-4xl font-bold mb-2">50+</h3>
                <p className="text-klaxon-white">Happy Clients</p>
              </div>
            </div>
            
            <Link 
              href="/about" 
              className="inline-flex items-center text-klaxon-white bg-klaxon-accent px-6 py-3 rounded hover:bg-opacity-90 transition-colors"
            >
              Learn More About Us <ArrowUpRight size={18} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
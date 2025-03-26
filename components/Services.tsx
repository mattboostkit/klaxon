'use client';

import { motion } from 'framer-motion';
import { Layers, Palette, LineChart, Layout, Code, Share2 } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <Palette size={36} />,
    title: 'Branding',
    description: 'We create distinctive brand identities that resonate with your audience and stand out in the market.',
    href: '/services',
  },
  {
    icon: <Layout size={36} />,
    title: 'Web Design',
    description: 'Our custom websites are built to represent your brand, engage visitors, and drive conversions.',
    href: '/services',
  },
  {
    icon: <Code size={36} />,
    title: 'Development',
    description: 'We build scalable, high-performance websites and applications with cutting-edge technology.',
    href: '/services',
  },
  {
    icon: <LineChart size={36} />,
    title: 'Digital Marketing',
    description: 'Strategic marketing solutions to increase your online presence and drive targeted traffic.',
    href: '/services',
  },
  {
    icon: <Layers size={36} />,
    title: 'UI/UX Design',
    description: 'Creating intuitive user experiences and interfaces that delight users and achieve business goals.',
    href: '/services',
  },
  {
    icon: <Share2 size={36} />,
    title: 'Content Creation',
    description: 'Compelling copy and visual content that tells your story and engages your audience.',
    href: '/services',
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

export function Services() {
  return (
    <section className="py-24 bg-klaxon-gray">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-klaxon-white mb-4"
          >
            Our <span className="text-klaxon-accent">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-klaxon-white text-opacity-80 max-w-2xl mx-auto"
          >
            We offer a comprehensive range of digital services to help your business stand out and succeed in the digital landscape.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-klaxon-black p-8 rounded-lg hover:shadow-lg transition-shadow group"
            >
              <div className="text-klaxon-accent mb-4 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-klaxon-white mb-3">
                {service.title}
              </h3>
              <p className="text-klaxon-white text-opacity-70 mb-4">
                {service.description}
              </p>
              <Link 
                href={service.href} 
                className="text-klaxon-accent group-hover:underline inline-flex items-center"
              >
                Learn More
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}
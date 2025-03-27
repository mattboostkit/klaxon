'use client';

import { motion } from 'framer-motion';
import { PenTool, Film, Scissors, Sparkles, Video, Music } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: <PenTool size={36} />,
    title: 'Creative Concept & Scripting',
    description: 'We craft compelling narratives tailored to your vision, developing scripts and storyboards that captivate audiences and reflect your brand\'s unique voice.',
    href: '/services'
  },
  {
    icon: <Film size={36} />,
    title: 'Full-Service Production',
    description: 'Our four-person crew handles everything from scouting locations to operating state-of-the-art cameras, ensuring your shoot runs smoothly and delivers top-quality footage.',
    href: '/services'
  },
  {
    icon: <Scissors size={36} />,
    title: 'Post-Production & Editing',
    description: 'We combine expert editing techniques, colour grading and sound design to shape raw footage into polished, engaging videos that leave a lasting impression.',
    href: '/services'
  },
  {
    icon: <Sparkles size={36} />,
    title: 'Motion Graphics & Animation',
    description: 'Add extra flair to your projects with animated elements and graphics that underscore key messages, enhance storytelling and help you stand out in the market.',
    href: '/services'
  },
  {
    icon: <Video size={36} />,
    title: 'Commercial & Corporate Films',
    description: 'Whether you\'re launching a product or refining your brand, we produce visually stunning corporate and commercial videos that resonate with clients and customers alike.',
    href: '/services'
  },
  {
    icon: <Music size={36} />,
    title: 'Live Events & Music Videos',
    description: 'From multi-camera event coverage to atmospheric music videos, we capture the energy of live performances and transform them into memorable, cinematic experiences.',
    href: '/services'
  }
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
            We&apos;re a nimble team of four dedicated to producing standout video content for brands of every size. From concept to final edit, we bring cinematic expertise and fresh ideas to each project, ensuring your story truly shines.
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

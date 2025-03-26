'use client';

import { motion } from 'framer-motion';

export function ValueProposition() {
  const values = [
    {
      title: 'Creativity',
      description: 'We approach every project with fresh ideas and innovative thinking to create unique and impactful content.',
      icon: '✨',
    },
    {
      title: 'Quality',
      description: "We're committed to excellence in everything we do, from concept development to final delivery.",
      icon: '🏆',
    },
    {
      title: 'Collaboration',
      description: 'We work closely with our clients, treating their goals as our own and building lasting partnerships.',
      icon: '🤝',
    },
    {
      title: 'Authenticity',
      description: "We believe in creating genuine content that resonates with audiences and reflects our clients' true values.",
      icon: '💯',
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-klaxon-black mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These core principles guide our work and define who we are as a creative agency.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold text-klaxon-black mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

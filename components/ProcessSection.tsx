'use client';

import { motion } from 'framer-motion';

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start by understanding your business, goals, and target audience to create a strategic foundation.'
  },
  {
    number: '02',
    title: 'Planning',
    description: 'We develop a detailed roadmap outlining the project scope, timeline, and deliverables.'
  },
  {
    number: '03',
    title: 'Design',
    description: 'Our creative team crafts visually stunning designs that align with your brand and business objectives.'
  },
  {
    number: '04',
    title: 'Development',
    description: 'We build your solution using cutting-edge technologies and industry best practices.'
  },
  {
    number: '05',
    title: 'Testing',
    description: 'Rigorous quality assurance ensures your product works flawlessly across all devices and platforms.'
  },
  {
    number: '06',
    title: 'Launch',
    description: 'We deploy your project and provide training to ensure a smooth transition and successful implementation.'
  }
];

export function ProcessSection() {
  return (
    <section className="py-20 bg-klaxon-black text-klaxon-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Process</h2>
          <p className="text-lg text-klaxon-gray-light max-w-2xl mx-auto">
            A structured approach that delivers consistent results
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-klaxon-gray-dark p-8 rounded-lg hover:border-klaxon-accent transition-colors"
            >
              <div className="text-4xl font-bold text-klaxon-accent mb-4">{step.number}</div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-klaxon-gray-light">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

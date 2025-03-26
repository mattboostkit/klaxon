'use client';

import { motion } from 'framer-motion';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export function HistoryTimeline() {
  const events: TimelineEvent[] = [
    {
      year: '2015',
      title: 'Klaxon Founded',
      description: 'Klaxon Studio was established with a vision to create compelling visual stories for brands.',
    },
    {
      year: '2017',
      title: 'First Major Client',
      description: 'Secured our first major client and delivered a campaign that exceeded expectations.',
    },
    {
      year: '2019',
      title: 'Team Expansion',
      description: 'Expanded our team to include specialists in cinematography, content strategy, and technical production.',
    },
    {
      year: '2021',
      title: 'Award Recognition',
      description: 'Received industry recognition with multiple awards for our creative work.',
    },
    {
      year: '2023',
      title: 'International Projects',
      description: 'Began working with international clients, expanding our reach beyond local markets.',
    },
    {
      year: '2025',
      title: 'New Studio Launch',
      description: 'Opened our new state-of-the-art production studio to enhance our creative capabilities.',
    },
  ];

  return (
    <div className="py-20 bg-klaxon-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The key milestones that have shaped Klaxon Studio into what it is today.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-klaxon-accent"></div>
          
          {events.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Year bubble */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-klaxon-accent flex items-center justify-center z-10">
                <span className="font-bold text-klaxon-black">{event.year}</span>
              </div>
              
              {/* Content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-300">{event.description}</p>
              </div>
              
              {/* Empty space for the other side */}
              <div className="w-5/12"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

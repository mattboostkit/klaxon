'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export function TeamSection() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Charlie Fox',
      role: 'Director & Co-Founder',
      bio: 'With extensive experience in creative direction, Charlie leads our team with innovative vision and a passion for impactful storytelling.',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'Jake Kirby',
      role: 'Director & Co-Founder',
      bio: 'Jake brings technical expertise and creative problem-solving to every project, ensuring flawless execution from concept to delivery.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'James England',
      role: 'Director & Co-Founder',
      bio: 'James combines strategic thinking with creative flair to develop compelling narratives that resonate with audiences.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'Matt Hill',
      role: 'Director & Co-Founder',
      bio: 'Matt oversees production operations with meticulous attention to detail, ensuring every project meets Klaxon\'s high standards.',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-klaxon-black mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the four talented professionals who bring your stories to life through the lens.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-klaxon-black">{member.name}</h3>
                <p className="text-klaxon-accent font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

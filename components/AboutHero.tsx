'use client';

import { motion } from 'framer-motion';

export function AboutHero() {
  return (
    <div className="relative bg-klaxon-black py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-klaxon-white mb-6"
          >
            About <span className="text-klaxon-accent">Klaxon</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-6 leading-relaxed"
          >
            Klaxon Studio is an independent video production company. Founded by three guys from England and a nomad from the Australian outback, we share a clear ethos of trust, pushing each other, and trying our hardest to find the best pint in London. What's most important to us however, is that we all love making standout video content.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-300 mb-6 leading-relaxed"
          >
            Between us we have a wide range of overlapping expertise, diverse ideas and opinions. Throw us a tricky brief, technical challenge or challenging creative proposition and we'll kick it around between us to find a way to make it happen!
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-300 mb-6 leading-relaxed"
          >
            We're totally adaptable when it comes to clients' needs for projects. We offer a number of different services to help brands and businesses create what our resident aussie Jake would call 'ripper' content.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl text-gray-300 mb-6 leading-relaxed"
          >
            Everyone likes to celebrate life's differences, including us, which is just as well because no two projects are ever the same. We have the experience, knowledge and expertise to make your project happen whichever way you wish to approach it.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 mb-10 leading-relaxed"
          >
            We're always up for chatting new propositions through with potential clients, and, aside from the perfect pint, there's some strong coffee drinking knowledge in the office, so any excuse to meet up and chat ideas, we're fully on-board with!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-24 h-1 bg-klaxon-accent mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

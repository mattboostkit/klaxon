'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Working with Klaxon Studio transformed our online presence. Their team delivered a website that perfectly captures our brand and has significantly improved our conversion rates.",
    author: "Sarah Johnson",
    position: "CEO, Innovate Tech",
    image: "/placeholder-avatar.jpg"
  },
  {
    quote: "The team at Klaxon Studio exceeded our expectations at every turn. Their strategic approach to our rebrand resulted in a cohesive identity that resonates with our audience.",
    author: "Michael Chen",
    position: "Marketing Director, Global Solutions",
    image: "/placeholder-avatar.jpg"
  },
  {
    quote: "Klaxon Studio&apos;s expertise in both design and development made them the perfect partner for our e-commerce platform. The results speak for themselves - our sales have increased by 40%.",
    author: "Emma Rodriguez",
    position: "Founder, Artisan Collective",
    image: "/placeholder-avatar.jpg"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-klaxon-gray-light">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-klaxon-gray-dark max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from some of our satisfied clients
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-klaxon-accent opacity-30">
            <Quote size={80} />
          </div>
          
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-klaxon-white p-10 rounded-lg shadow-lg text-center"
          >
            <p className="text-xl md:text-2xl mb-8 text-klaxon-gray-dark italic">
              &quot;{testimonials[currentIndex].quote}&quot;
            </p>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-klaxon-gray mb-4 overflow-hidden">
                {/* Image placeholder - replace with actual images */}
                <div className="w-full h-full bg-klaxon-accent"></div>
              </div>
              <h4 className="text-xl font-bold">{testimonials[currentIndex].author}</h4>
              <p className="text-klaxon-gray-dark">{testimonials[currentIndex].position}</p>
            </div>
          </motion.div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-klaxon-black text-klaxon-white hover:bg-klaxon-accent transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-klaxon-black text-klaxon-white hover:bg-klaxon-accent transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

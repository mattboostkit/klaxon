'use client';

import { motion } from 'framer-motion';
import { 
  Palette, 
  Globe, 
  Code, 
  Smartphone, 
  TrendingUp, 
  Search 
} from 'lucide-react';

const services = [
  {
    icon: <Palette className="w-12 h-12 text-klaxon-accent" />,
    title: 'Branding & Identity',
    description: 'We create distinctive brand identities that resonate with your audience and set you apart from competitors.'
  },
  {
    icon: <Globe className="w-12 h-12 text-klaxon-accent" />,
    title: 'Web Design',
    description: 'Our custom web designs are visually stunning, user-friendly, and strategically crafted to achieve your business goals.'
  },
  {
    icon: <Code className="w-12 h-12 text-klaxon-accent" />,
    title: 'Web Development',
    description: 'We build robust, scalable websites and web applications using the latest technologies and best practices.'
  },
  {
    icon: <Smartphone className="w-12 h-12 text-klaxon-accent" />,
    title: 'Mobile Development',
    description: 'Our mobile apps provide seamless experiences across devices while solving real user problems.'
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-klaxon-accent" />,
    title: 'Digital Marketing',
    description: 'We develop comprehensive digital marketing strategies to increase your visibility and drive conversions.'
  },
  {
    icon: <Search className="w-12 h-12 text-klaxon-accent" />,
    title: 'SEO Optimization',
    description: 'Our SEO services improve your search engine rankings and drive organic traffic to your website.'
  }
];

export function ServicesList() {
  return (
    <section className="py-20 bg-klaxon-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-klaxon-gray-light p-8 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-klaxon-gray-dark">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

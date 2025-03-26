'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { client } from '@/lib/sanity.client';
import { urlFor } from '@/sanity/lib/image';

interface Logo {
  _id: string;
  name: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  isMainLogo: boolean;
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logo, setLogo] = useState<Logo | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch the main logo from Sanity
    async function fetchLogo() {
      try {
        const data = await client.fetch(`
          *[_type == "logo" && isMainLogo == true && name == "Klaxon Studio Logo"][0]{
            _id,
            name,
            image,
            isMainLogo
          }
        `);
        
        setLogo(data);
      } catch (error) {
        console.error("Error fetching logo from Sanity:", error);
      }
    }
    
    fetchLogo();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5',
        isScrolled ? 'backdrop-blur-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {logo && logo.image && logo.image.asset && logo.image.asset._ref ? (
              <div className="relative h-24 w-44">
                <Image
                  src={urlFor(logo.image).width(440).height(240).url()}
                  alt="Klaxon Studio"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              <div className="text-2xl font-bold text-klaxon-white">
                KLAXON <span className="text-klaxon-accent">STUDIO</span>
              </div>
            )}
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['About', 'Services', 'Work', 'Blog', 'Contact'].map((item) => (
            <Link 
              key={item} 
              href={`/${item.toLowerCase()}`} 
              className="nav-link"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 text-klaxon-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-klaxon-black bg-opacity-70 backdrop-blur-sm flex flex-col items-center justify-center"
            >
              <nav className="flex flex-col items-center space-y-8">
                {['About', 'Services', 'Work', 'Blog', 'Contact'].map((item) => (
                  <Link 
                    key={item} 
                    href={`/${item.toLowerCase()}`} 
                    className="text-2xl nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

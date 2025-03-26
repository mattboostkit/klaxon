import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Facebook, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-klaxon-black pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Column 1: Logo and About */}
          <div>
            <Link href="/" className="text-2xl font-bold text-klaxon-white mb-6 inline-block">
              KLAXON <span className="text-klaxon-accent">STUDIO</span>
            </Link>
            <p className="text-klaxon-white text-opacity-80 mb-6">
              A creative digital agency specializing in branding, web design, and digital marketing solutions.
            </p>
            <div className="flex space-x-4">
              <Link href="https://instagram.com" className="text-klaxon-white hover:text-klaxon-accent transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-klaxon-white hover:text-klaxon-accent transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="https://linkedin.com" className="text-klaxon-white hover:text-klaxon-accent transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="https://facebook.com" className="text-klaxon-white hover:text-klaxon-accent transition-colors">
                <Facebook size={20} />
              </Link>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-klaxon-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['About', 'Services', 'Work', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-klaxon-white text-opacity-80 hover:text-klaxon-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div>
            <h3 className="text-xl font-semibold text-klaxon-white mb-6">Services</h3>
            <ul className="space-y-3">
              {['Creative Concept & Scripting', 'Full-Service Production', 'Post-Production & Editing', 'Motion Graphics & Animation', 'Commercial & Corporate Films', 'Live Events & Music Videos'].map((item) => (
                <li key={item}>
                  <Link href={`/services`} className="text-klaxon-white text-opacity-80 hover:text-klaxon-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div>
            <h3 className="text-xl font-semibold text-klaxon-white mb-6">Contact</h3>
            <p className="text-klaxon-white text-opacity-80 mb-4">
              Unit 408, Cocoa Studios, Biscuit Factory<br />
              Drummond Road, London, SE16 4FA
            </p>
            <p className="text-klaxon-white text-opacity-80 mb-4">
              hello@klaxon.studio<br />
              0208 0580 669
            </p>
            <Link 
              href="/contact" 
              className="text-klaxon-accent hover:underline inline-flex items-center"
            >
              Get in Touch <ArrowUpRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="border-t border-white border-opacity-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-klaxon-white text-opacity-60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Klaxon Studio. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-klaxon-white text-opacity-60 text-sm hover:text-klaxon-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-klaxon-white text-opacity-60 text-sm hover:text-klaxon-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

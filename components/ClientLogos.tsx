'use client';

import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity.client';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import Image from 'next/image';

interface Logo {
  _id: string;
  name: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  url?: string;
  isMainLogo: boolean;
  order: number;
}

export function ClientLogos() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLogos() {
      try {
        const data = await client.fetch(`
          *[_type == "logo" && !isMainLogo] | order(order asc) {
            _id,
            name,
            image,
            url,
            isMainLogo,
            order
          }
        `);
        setLogos(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching logos:', error);
        setIsLoading(false);
      }
    }

    fetchLogos();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-10 h-10 border-4 border-klaxon-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (logos.length === 0) {
    return null;
  }

  // Duplicate logos array to create continuous scrolling effect
  const scrollLogos = [...logos, ...logos];

  return (
    <div className="bg-white py-12 overflow-hidden">
      <div className="container mx-auto mb-8">
        <h2 className="text-3xl font-bold text-center text-klaxon-black mb-2">Our Clients</h2>
        <p className="text-center text-klaxon-gray max-w-2xl mx-auto">
          We&apos;re proud to work with these amazing companies
        </p>
      </div>
      
      <div className="relative">
        {/* Gradient overlay on left */}
        <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent"></div>
        
        {/* Scrolling logos */}
        <div className="flex items-center overflow-hidden py-6">
          <div className="flex space-x-12 animate-scroll">
            {scrollLogos.map((logo, index) => (
              <div key={`${logo._id}-${index}`} className="flex-shrink-0">
                {logo.url ? (
                  <Link 
                    href={logo.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <div className="relative h-16 w-32">
                      {logo.image && logo.image.asset && logo.image.asset._ref && (
                        <Image
                          src={urlFor(logo.image).width(128).height(64).url()}
                          alt={logo.name}
                          fill
                          className="object-contain"
                        />
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="relative h-16 w-32">
                    {logo.image && logo.image.asset && logo.image.asset._ref && (
                      <Image
                        src={urlFor(logo.image).width(128).height(64).url()}
                        alt={logo.name}
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient overlay on right */}
        <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </div>
  );
}

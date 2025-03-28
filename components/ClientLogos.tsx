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

// Mock logos for when Sanity is unavailable or CORS errors occur
const MOCK_LOGOS: Logo[] = [
  {
    _id: 'mock-logo-1',
    name: 'Company 1',
    image: { asset: { _ref: 'mock1' } },
    isMainLogo: false,
    order: 1
  },
  {
    _id: 'mock-logo-2', 
    name: 'Company 2',
    image: { asset: { _ref: 'mock2' } },
    isMainLogo: false,
    order: 2
  },
  {
    _id: 'mock-logo-3',
    name: 'Company 3',
    image: { asset: { _ref: 'mock3' } },
    isMainLogo: false,
    order: 3
  },
  {
    _id: 'mock-logo-4',
    name: 'Company 4',
    image: { asset: { _ref: 'mock4' } },
    isMainLogo: false,
    order: 4
  },
  {
    _id: 'mock-logo-5',
    name: 'Company 5',
    image: { asset: { _ref: 'mock5' } },
    isMainLogo: false,
    order: 5
  }
];

export function ClientLogos() {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [useLocalImages, setUseLocalImages] = useState(false);

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
        
        if (data && data.length > 0) {
          setLogos(data);
        } else {
          console.log("No logos found, using mock data");
          setLogos(MOCK_LOGOS);
          setUseLocalImages(true);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching logos:', error);
        // If there's an error (like 401 or CORS), use mock logos
        setLogos(MOCK_LOGOS);
        setUseLocalImages(true);
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
                      {useLocalImages ? (
                        // Use a local placeholder image if we're in fallback mode
                        <div className="flex items-center justify-center h-full w-full bg-klaxon-gray-light rounded">
                          <span className="text-sm font-medium text-klaxon-black">{logo.name}</span>
                        </div>
                      ) : logo.image && logo.image.asset && logo.image.asset._ref ? (
                        <Image
                          src={urlFor(logo.image).width(128).height(64).url()}
                          alt={logo.name}
                          fill
                          className="object-contain"
                          onError={() => setUseLocalImages(true)}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-klaxon-gray-light rounded">
                          <span className="text-sm font-medium text-klaxon-black">{logo.name}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="relative h-16 w-32">
                    {useLocalImages ? (
                      // Use a local placeholder image if we're in fallback mode
                      <div className="flex items-center justify-center h-full w-full bg-klaxon-gray-light rounded">
                        <span className="text-sm font-medium text-klaxon-black">{logo.name}</span>
                      </div>
                    ) : logo.image && logo.image.asset && logo.image.asset._ref ? (
                      <Image
                        src={urlFor(logo.image).width(128).height(64).url()}
                        alt={logo.name}
                        fill
                        className="object-contain"
                        onError={() => setUseLocalImages(true)}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-klaxon-gray-light rounded">
                        <span className="text-sm font-medium text-klaxon-black">{logo.name}</span>
                      </div>
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

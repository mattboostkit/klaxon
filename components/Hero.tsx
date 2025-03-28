'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { client } from '@/lib/sanity.client';
import { urlFor } from '@/sanity/lib/image';

interface VideoData {
  _id: string;
  title: string;
  description?: string;
  videoFile: {
    asset: {
      _ref: string;
      url: string;
    };
  };
  poster?: {
    asset: {
      _ref: string;
    };
  };
}

// Default video path to use if Sanity is unavailable
const DEFAULT_VIDEO_PATH = '/videos/default-video.mp4';
// Update with a static video path if you have one
// This should be a video file placed in the public/videos directory

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    // Fetch the latest video from Sanity
    async function fetchVideo() {
      try {
        const data = await client.fetch(`*[_type == "video"][0]{
          _id,
          title,
          description,
          videoFile{
            asset->{
              _ref,
              url
            }
          },
          poster{
            asset->{
              _ref
            }
          }
        }`);
        
        // Check if we got valid data with a video URL
        if (data && data.videoFile && data.videoFile.asset && data.videoFile.asset.url) {
          setVideoData(data);
        } else {
          console.log("No valid video found in Sanity, using fallback");
          setUsingFallback(true);
          // Create mock video data with fallback
          setVideoData({
            _id: 'fallback-video',
            title: 'Klaxon Showreel',
            videoFile: {
              asset: {
                _ref: 'fallback',
                url: '/klaxon_showreel.mp4', // This should be a video in your public folder
              }
            }
          });
        }
      } catch (error) {
        console.error("Error fetching video from Sanity:", error);
        setUsingFallback(true);
        // Create mock video data with fallback
        setVideoData({
          _id: 'fallback-video',
          title: 'Klaxon Showreel',
          videoFile: {
            asset: {
              _ref: 'fallback',
              url: '/klaxon_showreel.mp4', // This should be a video in your public folder
            }
          }
        });
      }
    }
    
    fetchVideo();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', () => {
        setIsVideoLoaded(true);
      });
      
      video.addEventListener('error', () => {
        console.error("Error loading video");
        setVideoError(true);
      });
    }
    
    // Set a timeout to handle cases where the video never loads
    const timeout = setTimeout(() => {
      if (!isVideoLoaded) {
        setVideoError(true);
      }
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, [videoData, isVideoLoaded]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowModal(false);
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      
      // Play the modal video with sound
      if (modalVideoRef.current) {
        modalVideoRef.current.play();
      }
    } else {
      document.body.style.overflow = '';
      
      // Pause the modal video when closing
      if (modalVideoRef.current) {
        modalVideoRef.current.pause();
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  return (
    <section className="hero hero-home h-screen w-full bg-no-repeat bg-cover bg-top relative overflow-hidden bg-klaxon-black">
      {/* Video Background or Fallback */}
      {!isVideoLoaded && !videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-klaxon-black">
          <div className="w-16 h-16 border-4 border-klaxon-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {videoError && (
        <div className="absolute inset-0 bg-klaxon-black">
          <div 
            className="absolute inset-0 bg-center bg-cover opacity-30"
            style={{ backgroundImage: "url('/placeholder.jpg')" }}
          ></div>
        </div>
      )}
      
      {videoData && !videoError && (
        <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden z-0">
          {/* Use a simplified video element to avoid CORS issues on client-side */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ opacity: isVideoLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
            poster="/placeholder.jpg"
            src="/videos/klaxon_showreel.mp4" // Direct src instead of source elements
            onError={() => setVideoError(true)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-klaxon-black bg-opacity-30"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-klaxon-white mb-2 uppercase leading-tight"
        >
          POWERFUL STORIES<br />
          <span className="text-klaxon-accent">THAT SPARK REAL EMOTION</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm md:text-base text-gray-300 max-w-2xl mb-10"
        >
          They say beauty is in the eye of the beholder, but we beg to differ! At Klaxon we have very clear ideas of what makes great content. Compelling stories, beautiful visuals, creative ideas – this is what makes us tick.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/contact" className="animated-button">
            Get in Touch
          </Link>
          <button 
            className="animated-button bg-transparent border-2 border-klaxon-white hover:bg-klaxon-white hover:text-klaxon-black transition-colors"
            onClick={() => setShowModal(true)}
          >
            Play Showreel
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-klaxon-white text-sm mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-klaxon-white rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-klaxon-white rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Full Screen Video Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
            <button 
              className="absolute top-4 right-4 z-10 text-white bg-klaxon-black bg-opacity-50 hover:bg-opacity-70 rounded-full p-2 transition-colors"
              onClick={() => setShowModal(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="w-full h-full flex items-center justify-center">
              {/* Fallback message when no video is available */}
              {!videoData || videoError ? (
                <div className="text-white text-center p-8">
                  <h3 className="text-2xl font-bold mb-4">Showreel Video Not Available</h3>
                  <p>The showreel video is currently unavailable. Please check back later.</p>
                </div>
              ) : (
                <video
                  ref={modalVideoRef}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  poster="/placeholder.jpg"
                  src="/videos/klaxon_showreel.mp4"
                  onError={(e) => {
                    console.error("Error loading modal video", e);
                    setVideoError(true);
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

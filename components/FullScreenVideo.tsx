'use client';

import { useEffect, useRef, useState } from 'react';
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

export function FullScreenVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await fetch('/api/video');
        if (!response.ok) {
          throw new Error('Failed to fetch video');
        }
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        if (!data.videoFile?.asset?.url) {
          throw new Error('Invalid video data');
        }

        setVideoData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
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
    }
  }, [videoData]);

  if (error) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-klaxon-black text-white">
        <p>Video unavailable: {error}</p>
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center bg-klaxon-black">
        <div className="w-16 h-16 border-4 border-klaxon-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Loading spinner */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-klaxon-black">
          <div className="w-16 h-16 border-4 border-klaxon-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="object-cover w-full h-full"
        style={{ opacity: isVideoLoaded ? 1 : 0, transition: 'opacity 1s ease' }}
        poster={videoData.poster?.asset?._ref ? urlFor(videoData.poster).url() : undefined}
        onError={() => setError('Failed to load video')}
      >
        <source src={videoData.videoFile.asset.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional overlay or content */}
      <div className="absolute inset-0 bg-klaxon-black bg-opacity-20"></div>
      
      {/* Optional title/description */}
      <div className="absolute bottom-10 left-10 text-white">
        <h2 className="text-2xl font-bold">{videoData.title}</h2>
        {videoData.description && <p>{videoData.description}</p>}
      </div>
    </div>
  );
}

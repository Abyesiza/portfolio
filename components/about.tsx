"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconDownload } from '@tabler/icons-react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useState, useEffect } from 'react';

// Define the social link type
interface SocialLink {
  platform: string;
  url: string;
}

export function AboutComponent() {
  const aboutData = useQuery(api.about.get);
  const [isLoading, setIsLoading] = useState(true);

  // Default content to show while loading
  const [bioContent, setBioContent] = useState({
    name: "Joel Abyesiza",
    title: "Statistician & Software Engineer",
    description: "Loading...",
    philosophy: "Loading...",
    approach: "Loading...",
    imageUrl: "/profile-image.jpg",
    resumeUrl: "/resume.pdf",
    socialLinks: [] as SocialLink[]
  });

  // Update bioContent when data is fetched from Convex
  useEffect(() => {
    if (aboutData) {
      setBioContent({
        name: aboutData.name || "Joel Abyesiza",
        title: aboutData.title || "Software Engineer & Web Developer",
        description: aboutData.description || "",
        philosophy: aboutData.philosophy || "",
        approach: aboutData.approach || "",
        imageUrl: aboutData.imageUrl || "/profile-image.jpg",
        resumeUrl: aboutData.resumeUrl || "/resume.pdf",
        socialLinks: aboutData.socialLinks || []
      });
      setIsLoading(false);
    }
  }, [aboutData]);

  // Get the appropriate icon for a social platform
  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <IconBrandGithub className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />;
      case 'linkedin':
        return <IconBrandLinkedin className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />;
      case 'twitter':
        return <IconBrandTwitter className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />;
      default:
        return <IconBrandGithub className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />;
    }
  };

  return (
    <div className="page-content">
      <div className="flex flex-col md:flex-row items-center content-gap">
        {/* Image Column */}
        <motion.div 
          className="w-full md:w-5/12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl">
            <Image 
              src={bioContent.imageUrl} 
              alt={bioContent.name}
              fill
              style={{ objectFit: 'cover' }}
              className={`rounded-2xl ${isLoading ? 'animate-pulse' : ''}`}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        </motion.div>
        
        {/* Content Column */}
        <motion.div 
          className="w-full md:w-7/12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.span 
            className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            About Me
          </motion.span>
          <motion.h1 
            className={`text-4xl md:text-5xl font-bold mb-3 text-neutral-900 dark:text-white ${isLoading ? 'animate-pulse' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {bioContent.name}
          </motion.h1>
          <motion.h2 
            className={`text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 mb-6 ${isLoading ? 'animate-pulse' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {bioContent.title}
          </motion.h2>
          <motion.p 
            className={`text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed ${isLoading ? 'animate-pulse' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {bioContent.description}
          </motion.p>
          <motion.p 
            className={`text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed ${isLoading ? 'animate-pulse' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            {bioContent.philosophy}
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {bioContent.resumeUrl && (
              <motion.a 
                href={bioContent.resumeUrl} 
                download="Joel_Abyesiza_Resume.pdf"
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconDownload size={18} />
                Download Resume
              </motion.a>
            )}
            
            {bioContent.socialLinks && bioContent.socialLinks.map((link, index) => (
              <motion.a 
                key={index}
                href={link.url} 
                className="p-2.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={link.platform}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSocialIcon(link.platform)}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

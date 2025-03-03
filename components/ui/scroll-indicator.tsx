"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";

export function ScrollIndicator() {
  const [showIndicator, setShowIndicator] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollPosition > pageHeight * 0.1) {
        setShowIndicator(false);
      } else {
        setShowIndicator(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: showIndicator ? 1 : 0 }}
      className="fixed bottom-8 right-8 z-30"
    >
      <motion.div
        animate={{ x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-full p-3"
      >
        <IconChevronRight className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
      </motion.div>
    </motion.div>
  );
} 
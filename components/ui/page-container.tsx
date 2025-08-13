"use client";
import React, { ReactNode, useEffect, useState, useRef, WheelEvent as ReactWheelEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Header } from "@/components/header";
import { cn } from "@/lib/utils";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  horizontalScroll?: boolean | string;
  contentOverflow?: boolean;
}

export function PageContainer({
  children,
  className,
  horizontalScroll = false,
  contentOverflow = false,
}: PageContainerProps) {
  // Create a ref for the horizontal scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  
  // Check if horizontalScroll is a string (title) or boolean
  const isHorizontalScroll = horizontalScroll !== false;
  const pageTitle = typeof horizontalScroll === 'string' ? horizontalScroll : '';
  
  // State for scroll indicators and position
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  
  // Setup scroll tracking for horizontal scroll
  useEffect(() => {
    if (!isHorizontalScroll || !scrollContainerRef.current) return;
    
    const scrollContainer = scrollContainerRef.current;
    const calculateScrollValues = () => {
      const containerWidth = scrollContainer.scrollWidth;
      const viewportWidth = scrollContainer.clientWidth;
      setMaxScroll(containerWidth - viewportWidth);
    };
    
    // Calculate initial values
    calculateScrollValues();
    
    // Update on resize
    window.addEventListener('resize', calculateScrollValues);
    
    // Handle scroll in the container
    const handleScroll = () => {
      const newPosition = scrollContainer.scrollLeft;
      setScrollPosition(newPosition);
      setShowLeftIndicator(newPosition > 50);
      setShowRightIndicator(newPosition < maxScroll - 50);
    };
    
    scrollContainer.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', calculateScrollValues);
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isHorizontalScroll, maxScroll]);
  
  // Scroll helpers for horizontal scrolling
  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  };
  
  const scrollRight = () => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  };

  // Handle wheel events for horizontal scrolling
  const handleWheel = (e: ReactWheelEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current || !isHorizontalScroll) return;
    
    // If user is explicitly scrolling horizontally, let the browser handle it
    if (e.deltaX !== 0) return;
    
    // Otherwise, convert vertical scroll to horizontal
    e.preventDefault();
    scrollContainerRef.current.scrollBy({
      left: e.deltaY,
      behavior: 'auto'
    });
  };

  return (
    <main 
      className={cn(
        "min-h-screen bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900",
        className
      )}
    >
      <div className={cn(
        "min-h-screen",
        isMobile ? "pb-20" : "pb-24" // Add extra padding for mobile tab bar
      )}>
        <div className={cn(
          "h-screen",
          contentOverflow ? "overflow-y-auto custom-scrollbar" : "overflow-hidden",
          isHorizontalScroll ? "" : "flex flex-col"
        )}>
          <div className={cn(
            "flex flex-col items-center justify-center",
            contentOverflow ? "py-16" : "flex-grow",
            isHorizontalScroll ? "pt-12 pb-8 h-full" : ""
          )}>
            {isHorizontalScroll ? (
              <>
                <h2 className="page-title">
                  {pageTitle}
                </h2>
                
                {/* Scroll indicators - only show on desktop */}
                {!isMobile && showLeftIndicator && (
                  <button 
                    onClick={scrollLeft}
                    className="absolute left-4 top-1/2 z-10 p-2 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all shadow-md"
                    aria-label="Scroll left"
                  >
                    <IconChevronLeft className="w-5 h-5" />
                  </button>
                )}
                
                {!isMobile && showRightIndicator && (
                  <button 
                    onClick={scrollRight}
                    className="absolute right-4 top-1/2 z-10 p-2 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all shadow-md"
                    aria-label="Scroll right"
                  >
                    <IconChevronRight className="w-5 h-5" />
                  </button>
                )}
                
                {/* Horizontal scrolling container */}
                <div 
                  ref={scrollContainerRef}
                  className="w-full h-full overflow-x-auto custom-scrollbar hide-scrollbar touch-scroll px-4 sm:px-8 lg:px-16 mb-4"
                  onWheel={handleWheel}
                >
                  <div className="flex gap-6 md:gap-8 lg:gap-10 py-4 min-w-max items-start">
                    {children}
                  </div>
                </div>
                
                {/* Scroll progress indicator */}
                <div className="w-full max-w-md h-1 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-blue-500/70 dark:bg-blue-600/70"
                    style={{ 
                      scaleX: maxScroll > 0 ? scrollPosition / maxScroll : 0,
                      transformOrigin: "0%" 
                    }}
                  />
                </div>
              </>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
      
      <Header />
    </main>
  );
} 
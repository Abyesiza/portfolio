"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FloatingDock } from "@/components/ui/floating-dock";
import { motion, AnimatePresence } from "framer-motion";
import { 
  IconHome, 
  IconUser, 
  IconBriefcase, 
  IconCode, 
  IconMessage,
  IconBrain
} from "@tabler/icons-react";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Navigation items
  const navItems = [
    {
      title: "Home",
      href: "/",
      icon: <IconHome className="h-5 w-5" />,
    },
    {
      title: "About",
      href: "/about",
      icon: <IconUser className="h-5 w-5" />,
    },
    {
      title: "Experience",
      href: "/experience",
      icon: <IconBriefcase className="h-5 w-5" />,
    },
    {
      title: "Projects",
      href: "/projects",
      icon: <IconCode className="h-5 w-5" />,
    },
    {
      title: "Skills",
      href: "/skills",
      icon: <IconBrain className="h-5 w-5" />,
    },
    {
      title: "Contact",
      href: "/contact",
      icon: <IconMessage className="h-5 w-5" />,
    },
  ];

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

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scroll state
      setIsScrolled(currentScrollY > 20);
      
      // Handle tab bar visibility
      if (isMobile) {
        // Show tab bar when scrolling up or at the top/bottom of the page
        if (currentScrollY < 20 || 
            currentScrollY < lastScrollY || 
            currentScrollY + window.innerHeight >= document.body.scrollHeight - 20) {
          setIsTabBarVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Hide tab bar when scrolling down (after scrolling a bit)
          setIsTabBarVisible(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobile]);

  // Function to simulate haptic feedback
  const simulateHapticFeedback = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15); // 15ms vibration
    }
  };

  // Handle tab click with haptic feedback
  const handleTabClick = () => {
    setIsMenuOpen(false);
    simulateHapticFeedback();
  };

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
          <FloatingDock items={navItems} showTitles={false} />
        </div>
      )}
      
      {/* Mobile Tab Navigation */}
      {isMobile && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 z-50 p-2"
          initial={{ y: 0 }}
          animate={{ y: isTabBarVisible ? 0 : '100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border border-neutral-200/50 dark:border-white/[0.1] rounded-xl shadow-lg">
            <div className="flex items-center justify-around h-16 px-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                
                return (
                  <motion.a 
                    key={index}
                    href={item.href}
                    className="relative flex items-center justify-center w-14 h-14"
                    onClick={() => handleTabClick()}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onTouchStart={() => setHoveredIndex(index)}
                    onTouchEnd={() => {
                      setTimeout(() => setHoveredIndex(null), 1000);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.div 
                      className={`${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-neutral-400 dark:text-neutral-500'}`}
                      animate={{ scale: isActive ? 1.2 : 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {React.cloneElement(item.icon as React.ReactElement, { className: "h-6 w-6" })}
                    </motion.div>
                    
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: -30 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute px-2 py-1 text-xs font-medium text-center rounded-md bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 shadow-sm whitespace-nowrap border border-neutral-200 dark:border-neutral-700"
                        >
                          {item.title}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {isActive && (
                      <motion.div 
                        className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-full"
                        layoutId="tab-background"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
} 
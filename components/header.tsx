"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FloatingDock } from "@/components/ui/floating-dock";
import { motion } from "framer-motion";
import { 
  IconHome, 
  IconUser, 
  IconBriefcase, 
  IconCode, 
  IconMessage 
} from "@tabler/icons-react";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
      icon: <IconCode className="h-5 w-5" />,
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
  const handleTabClick = (href: string) => {
    simulateHapticFeedback();
    // Navigation is handled by the link component
  };

  return (
    <>
      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
          <FloatingDock items={navItems} />
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
                    className="relative flex flex-col items-center justify-center w-14 h-full"
                    onClick={() => handleTabClick(item.href)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.div 
                      className={`${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-neutral-400 dark:text-neutral-500'}`}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {item.icon}
                    </motion.div>
                    <motion.span 
                      className={`text-xs mt-1 ${isActive ? 'font-medium text-blue-500 dark:text-blue-400' : 'text-neutral-400 dark:text-neutral-500'}`}
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      {item.title}
                    </motion.span>
                    {isActive && (
                      <motion.div 
                        className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10 rounded-lg"
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
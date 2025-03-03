"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { 
  IconDashboard,
  IconLogout,
  IconMenu2,
  IconX,
  IconBriefcase,
  IconCode,
  IconMail,
  IconLock,
  IconUser
} from "@tabler/icons-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      router.push("/login");
    }
  }, [router]);

  // Navigation items
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <IconDashboard className="h-5 w-5" />,
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: <IconBriefcase className="h-5 w-5" />,
    },
    {
      title: "Experiences",
      href: "/dashboard/experiences",
      icon: <IconBriefcase className="h-5 w-5" />,
    },
    {
      title: "About",
      href: "/dashboard/about",
      icon: <IconUser className="h-5 w-5" />,
    },
    {
      title: "Skills",
      href: "/dashboard/skills",
      icon: <IconCode className="h-5 w-5" />,
    },
    {
      title: "Contacts",
      href: "/dashboard/contacts",
      icon: <IconMail className="h-5 w-5" />,
    },
    {
      title: "Vault",
      href: "/dashboard/vault",
      icon: <IconLock className="h-5 w-5" />,
    },
  ];

  // Check if device is mobile and handle scroll
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setSidebarOpen(!isMobileView);
    };
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      
      // Redirect to login page
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback - redirect anyway
      router.push('/login');
    }
  };

  // Simulate haptic feedback for mobile
  const simulateHapticFeedback = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <AnimatePresence mode="wait">
        {/* Sidebar */}
        <motion.div 
          key="sidebar"
          className={`fixed top-0 left-0 z-40 h-screen bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-all duration-300`}
          initial={isMobile ? { x: -256 } : false}
          animate={{ 
            width: isSidebarOpen ? 256 : isMobile ? 0 : 80,
            x: isSidebarOpen ? 0 : isMobile ? -256 : 0
          }}
          exit={isMobile ? { x: -256 } : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex flex-col h-full">
            {/* Logo area */}
            <motion.div 
              className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-700"
              initial={false}
              animate={{ opacity: isSidebarOpen ? 1 : 0.5 }}
            >
              <span className="text-xl font-semibold truncate">Dashboard</span>
              {isMobile && (
                <motion.button 
                  onClick={() => {
                    simulateHapticFeedback();
                    setSidebarOpen(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconX className="h-5 w-5" />
                </motion.button>
              )}
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto custom-scrollbar">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors relative ${
                      isActive 
                        ? "text-blue-600 dark:text-blue-400" 
                        : "hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                    }`}
                    onClick={() => simulateHapticFeedback()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">{item.icon}</span>
                    <span className={`relative z-10 transition-opacity duration-200 ${
                      isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
                    }`}>
                      {item.title}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-blue-50 dark:bg-blue-900/20"
                        layoutId="activeNav"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </nav>

            {/* Logout button */}
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
              <motion.button
                onClick={() => {
                  simulateHapticFeedback();
                  handleLogout();
                }}
                className="flex items-center space-x-3 w-full px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconLogout className="h-5 w-5" />
                <span className={`transition-opacity duration-200 ${
                  isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
                }`}>
                  Logout
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Mobile overlay */}
        {isMobile && isSidebarOpen && (
          <motion.div 
            key="overlay"
            className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div 
        className="transition-all duration-300"
        animate={{ 
          marginLeft: isSidebarOpen ? 256 : isMobile ? 0 : 80,
          marginRight: 0
        }}
      >
        {/* Top bar */}
        <motion.header 
          className={`h-16 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-30 transition-shadow ${
            isScrolled ? "shadow-sm" : ""
          }`}
          initial={false}
          animate={{
            y: 0,
            opacity: 1
          }}
        >
          <div className="flex items-center justify-between h-full px-4">
            <motion.button 
              onClick={() => {
                simulateHapticFeedback();
                setSidebarOpen(!isSidebarOpen);
              }}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconMenu2 className="h-5 w-5" />
            </motion.button>
            <ThemeToggle />
          </div>
        </motion.header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8 transition-all">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {children}
          </motion.div>
        </main>
      </motion.div>
    </div>
  );
} 
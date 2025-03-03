"use client";

import { useTheme } from "@/providers/theme-provider";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed top-4 right-4 z-50 p-2 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 shadow-sm"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <IconMoon className="h-5 w-5 text-neutral-700" />
      ) : (
        <IconSun className="h-5 w-5 text-neutral-300" />
      )}
    </motion.button>
  );
} 
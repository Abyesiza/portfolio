"use client";

import { Hero } from "@/components/ui/hero";
import { PageContainer } from "@/components/ui/page-container";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center"
      >
        <Hero />
      </motion.div>
    </PageContainer>
  );
}

"use client"
import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,

  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
}

export function FloatingTabs() {
  const [activeTab, setActiveTab] = useState("skills");
  let mouseX = useMotionValue(Infinity);

  const tabs: Tab[] = [
    {
      id: "skills",
      title: "Skills",
      content: (
        <div className="space-y-4 mt-6">
          <div className="bg-neutral-900/5 dark:bg-neutral-100/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">Technical Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {["React", "Next.js", "TypeScript", "Python", "Data Analysis", "Machine Learning"].map((skill) => (
                <div key={skill} className="bg-neutral-900/10 dark:bg-neutral-100/10 rounded-md p-2 text-sm text-center">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "experience",
      title: "Experience",
      content: (
        <div className="space-y-4 mt-6">
          <div className="bg-neutral-900/5 dark:bg-neutral-100/5 rounded-lg p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Senior Developer</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">2020 - Present</p>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300">Led development of data-driven applications and ML models.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "projects",
      title: "Projects",
      content: (
        <div className="space-y-4 mt-6">
          <div className="bg-neutral-900/5 dark:bg-neutral-100/5 rounded-lg p-4">
            <div className="grid gap-4">
              {["Data Analysis Dashboard", "ML Pipeline", "Portfolio Website"].map((project) => (
                <div key={project} className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-3">
                  <h4 className="font-medium text-neutral-800 dark:text-neutral-200">{project}</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Description of the {project.toLowerCase()} project...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex justify-center gap-4 mb-8"
      >
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            isActive={activeTab === tab.id}
            mouseX={mouseX}
            onClick={() => setActiveTab(tab.id)}
            title={tab.title}
          />
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-xl shadow-black/5 dark:shadow-white/5"
        >
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </motion.div>
      </AnimatePresence>
            </div>
  );
}

function TabButton({
  isActive,
  mouseX,
  onClick,
  title,
}: {
  isActive: boolean;
  mouseX: any;
  onClick: () => void;
  title: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val: number) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [60, 100, 60]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      className={cn(
        "rounded-full flex items-center justify-center cursor-pointer transition-colors",
        isActive
          ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900"
          : "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700"
      )}
      onClick={onClick}
    >
      <span className="text-sm font-medium">{title}</span>
    </motion.div>
  );
}

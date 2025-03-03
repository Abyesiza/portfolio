"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { PageContainer } from "@/components/ui/page-container";
import Image from "next/image";
import { IconCode, IconLoader, IconFilter } from '@tabler/icons-react';

export default function SkillsPage() {
  const skills = useQuery(api.skills.list);
  const categories = useQuery(api.skills.getCategories);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [animateCards, setAnimateCards] = useState(true);

  // Group skills by category
  const groupedSkills = (skills || []).reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category]!.push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Sort categories by number of skills (most first)
  const sortedCategories = Object.keys(groupedSkills).sort((a, b) => {
    return (groupedSkills[b]?.length || 0) - (groupedSkills[a]?.length || 0);
  });

  const handleCategoryClick = (category: string) => {
    setAnimateCards(false);
    setTimeout(() => {
      setActiveCategory(activeCategory === category ? null : category);
      setAnimateCards(true);
    }, 10);
  };

  if (!skills || !categories) {
    return (
      <PageContainer>
        <div className="max-w-6xl w-full mx-auto px-4 py-12">
          <div className="flex justify-center items-center h-64">
            <IconLoader className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </PageContainer>
    );
  }

  const filteredCategories = activeCategory 
    ? [activeCategory] 
    : sortedCategories;

  return (
    <PageContainer>
      <div className="max-w-6xl w-full mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Skills & Technologies</h1>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <IconFilter className="h-4 w-4" />
            <span className="text-sm font-medium">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sortedCategories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
              >
                {category} ({groupedSkills[category]?.length || 0})
              </button>
            ))}
            {activeCategory && (
              <button
                onClick={() => handleCategoryClick(activeCategory)}
                className="px-3 py-1.5 text-sm rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {filteredCategories.map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-2xl font-semibold">{category}</h2>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {groupedSkills[category]?.map((skill) => (
                  <motion.div
                    key={skill._id}
                    initial={animateCards ? { opacity: 0, scale: 0.9 } : false}
                    animate={animateCards ? { opacity: 1, scale: 1 } : false}
                    className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-3 flex flex-col items-center text-center h-full"
                  >
                    <div className="mb-2">
                      {skill.iconUrl ? (
                        <div className="relative w-10 h-10 mx-auto">
                          <Image
                            src={skill.iconUrl}
                            alt={skill.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 mx-auto">
                          <IconCode className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-sm font-medium line-clamp-1">{skill.name}</h3>
                    
                    <div className="mt-auto pt-2 w-full">
                      <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {skills.length === 0 && (
          <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
            <IconCode className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <h3 className="text-lg font-medium mb-2">No skills found</h3>
            <p className="text-sm">
              Check back later to see my technical skills and proficiencies.
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}

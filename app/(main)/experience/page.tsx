"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { IconBriefcase, IconCalendar, IconMapPin, IconLoader, IconEye } from "@tabler/icons-react";
import { PageContainer } from "@/components/ui/page-container";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExperiencePage() {
  const experiences = useQuery(api.experiences.list);
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  // Trim description to specified length
  const trimDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  // Display loading state when data is being fetched
  if (!experiences) {
    return (
      <PageContainer horizontalScroll="Work Experience">
        <div className="w-full flex justify-center items-center min-h-[300px]">
          <IconLoader className="w-8 h-8 animate-spin text-blue-600 dark:text-blue-400" />
        </div>
      </PageContainer>
    );
  }

  // Display empty state if no experiences
  if (experiences.length === 0) {
    return (
      <PageContainer horizontalScroll="Work Experience">
        <div className="w-full flex flex-col justify-center items-center min-h-[300px] text-center p-6">
          <IconBriefcase className="w-12 h-12 text-neutral-400 dark:text-neutral-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No experiences yet</h3>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md">
            Check back later for updates on my professional journey.
          </p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer horizontalScroll="Work Experience">
      {experiences.map((experience) => (
        <div key={experience._id} className="card-container flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px]">
          <CardSpotlight className="h-[350px] w-full">
            <div className="h-full flex flex-col p-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-md overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
                    <Image
                      src={experience.logoUrl}
                      alt={experience.company}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">
                      {experience.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      {experience.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-neutral-600 dark:text-neutral-300 mb-2">
                  <span className="flex items-center gap-2">
                    <IconMapPin className="w-4 h-4" />
                    {experience.location}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 mb-3">
                  <IconCalendar className="w-4 h-4" />
                  {formatDate(experience.startDate)} - {experience.current ? 'Present' : experience.endDate ? formatDate(experience.endDate) : 'N/A'}
                </div>
                <p className="body-text text-sm mb-3">
                  {trimDescription(experience.description)}
                </p>
                {experience.description.length > 120 && (
                  <button
                    onClick={() => setSelectedExperience(experience)}
                    className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <IconEye className="w-3 h-3" />
                    View Details
                  </button>
                )}
              </div>

              <div className="mt-auto pt-4">
                <h4 className="section-title text-sm">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {experience.skills.map((skill, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 text-xs bg-neutral-100 dark:bg-neutral-700 rounded-full text-neutral-700 dark:text-neutral-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardSpotlight>
        </div>
      ))}

      {/* Experience Details Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedExperience(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-neutral-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
                    <Image
                      src={selectedExperience.logoUrl}
                      alt={selectedExperience.company}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
                      {selectedExperience.title}
                    </h3>
                    <p className="text-lg text-neutral-600 dark:text-neutral-300">
                      {selectedExperience.company}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-300">
                  <span className="flex items-center gap-2">
                    <IconMapPin className="w-4 h-4" />
                    {selectedExperience.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <IconCalendar className="w-4 h-4" />
                    {formatDate(selectedExperience.startDate)} - {selectedExperience.current ? 'Present' : selectedExperience.endDate ? formatDate(selectedExperience.endDate) : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-neutral-800 dark:text-neutral-200">
                      Description
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {selectedExperience.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-neutral-800 dark:text-neutral-200">
                      Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperience.skills.map((skill: string, index: number) => (
                        <span 
                          key={index} 
                          className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-700 rounded-lg text-neutral-700 dark:text-neutral-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => setSelectedExperience(null)}
                  className="w-full px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}

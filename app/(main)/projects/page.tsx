"use client";
import { PageContainer } from "@/components/ui/page-container";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { IconBrandGithub, IconExternalLink, IconStack2, IconEye } from "@tabler/icons-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  // Fetch projects from Convex
  const projects = useQuery(api.projects.list);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (projects !== undefined) {
      setIsLoading(false);
    }
  }, [projects]);

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  // Trim description to specified length
  const trimDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <PageContainer horizontalScroll="Projects">
      {isLoading ? (
        // Loading placeholders
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="card-container flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px]">
            <motion.div 
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-[350px] w-full bg-neutral-100 dark:bg-neutral-800 rounded-xl"
            />
          </div>
        ))
      ) : projects && projects.length > 0 ? (
        // Real projects from Convex
        projects.map((project) => (
          <div key={project._id} className="card-container flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px]">
            <CardSpotlight 
              className="h-[350px] w-full overflow-hidden"
            >
              <div className="h-full flex flex-col p-6">
                {project.imageUrl && (
                  <div className="relative w-full h-32 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="tag"
                      >
                        <IconStack2 className="w-3 h-3" />
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p className="body-text text-sm mb-3">
                    {trimDescription(project.description)}
                  </p>
                  {project.description.length > 100 && (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-2"
                    >
                      <IconEye className="w-3 h-3" />
                      View Details
                    </button>
                  )}
                </div>

                <div className="mt-auto pt-4">
                  <div className="flex items-center gap-3 pt-3">
                    {project.githubUrl && (
                      <Link 
                        href={project.githubUrl}
                        className="card-link"
                        target="_blank"
                      >
                        <IconBrandGithub className="w-4 h-4" />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link 
                        href={project.liveUrl}
                        className="card-link"
                        target="_blank"
                      >
                        <IconExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                    <button
                      onClick={() => handleProjectClick(project._id)}
                      className="card-link"
                      title="View Full Project"
                    >
                      <IconEye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </CardSpotlight>
          </div>
        ))
      ) : (
        // No projects found
        <div className="flex items-center justify-center w-full h-64 text-neutral-500 dark:text-neutral-400">
          No projects found. Add some projects in the dashboard.
        </div>
      )}

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
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
                {selectedProject.imageUrl && (
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map((tech: string) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full text-xs text-neutral-700 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[50vh] custom-scrollbar">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-neutral-800 dark:text-neutral-200">
                      Description
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex gap-3">
                  {selectedProject.githubUrl && (
                    <Link 
                      href={selectedProject.githubUrl}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors"
                    >
                      <IconBrandGithub className="w-4 h-4" />
                      GitHub
                    </Link>
                  )}
                  {selectedProject.liveUrl && (
                    <Link 
                      href={selectedProject.liveUrl}
                      target="_blank"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <IconExternalLink className="w-4 h-4" />
                      Live Demo
                    </Link>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex-1 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/ui/hero";
import { PageContainer } from "@/components/ui/page-container";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  IconStack2, 
  IconBrandGithub, 
  IconExternalLink, 
  IconArrowRight, 
  IconBriefcase,
  IconMapPin,
  IconCalendar
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const featuredProjects = useQuery(api.projects.getFeatured);
  const featuredExperiences = useQuery(api.experiences.getFeatured);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [isExperiencesLoading, setIsExperiencesLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (featuredProjects !== undefined) {
      setIsProjectsLoading(false);
    }
    if (featuredExperiences !== undefined) {
      setIsExperiencesLoading(false);
    }
  }, [featuredProjects, featuredExperiences]);

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  return (
    <PageContainer>
      <Hero />
      
      {/* Featured Projects Section */}
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Link 
            href="/projects" 
            className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
          >
            View all projects
            <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isProjectsLoading ? (
            // Loading placeholders
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                className="h-[300px] bg-neutral-100 dark:bg-neutral-800 rounded-xl"
              />
            ))
          ) : featuredProjects && featuredProjects.length > 0 ? (
            // Featured projects from Convex
            featuredProjects.map((project) => (
              <CardSpotlight 
                key={project._id}
                className="h-[300px] cursor-pointer"
                onClick={() => handleProjectClick(project._id)}
              >
                <div className="h-full p-5 flex flex-col">
                  {project.imageUrl && (
                    <div className="relative w-full h-36 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech}
                        className="tag text-[10px] px-1.5 py-0.5"
                      >
                        <IconStack2 className="w-2 h-2" />
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="mt-auto pt-3 flex items-center gap-3">
                    {project.githubUrl && (
                      <Link 
                        href={project.githubUrl}
                        className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <IconBrandGithub className="w-4 h-4" />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link 
                        href={project.liveUrl}
                        className="text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <IconExternalLink className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </CardSpotlight>
            ))
          ) : (
            <div className="col-span-3 text-center py-10 text-neutral-500 dark:text-neutral-400">
              No featured projects yet.
            </div>
          )}
        </div>
      </div>
      
      {/* Featured Experiences Section */}
      <div className="w-full max-w-6xl mx-auto px-4 py-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Work Experience</h2>
          <Link 
            href="/experience" 
            className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
          >
            View all experience
            <IconArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="space-y-6">
          {isExperiencesLoading ? (
            // Loading placeholders
            Array.from({ length: 2 }).map((_, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                className="h-[140px] bg-neutral-100 dark:bg-neutral-800 rounded-xl"
              />
            ))
          ) : featuredExperiences && featuredExperiences.length > 0 ? (
            // Featured experiences from Convex
            featuredExperiences.map((experience) => (
              <CardSpotlight 
                key={experience._id}
                className="w-full"
              >
                <div className="p-5 flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white dark:bg-neutral-700">
                      <Image
                        src={experience.logoUrl}
                        alt={experience.company}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between mb-1">
                      <h3 className="text-lg font-semibold">{experience.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                        <IconCalendar className="w-3.5 h-3.5" />
                        <span>{formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate!)}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                      <div className="flex items-center gap-1">
                        <IconBriefcase className="w-4 h-4" />
                        <span>{experience.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconMapPin className="w-4 h-4" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-2">
                      {experience.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {experience.skills.slice(0, 4).map((skill) => (
                        <span 
                          key={skill}
                          className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-700 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {experience.skills.length > 4 && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 self-center">
                          +{experience.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardSpotlight>
            ))
          ) : (
            <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
              No featured work experience yet.
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}

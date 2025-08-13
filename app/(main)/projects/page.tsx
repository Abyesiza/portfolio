"use client";
import { PageContainer } from "@/components/ui/page-container";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { IconBrandGithub, IconExternalLink, IconStack2 } from "@tabler/icons-react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  // Fetch projects from Convex
  const projects = useQuery(api.projects.list);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (projects !== undefined) {
      setIsLoading(false);
    }
  }, [projects]);

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
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
              className="min-h-[350px] w-full overflow-hidden cursor-pointer"
              onClick={() => handleProjectClick(project._id)}
            >
              <div className="flex flex-col p-6">
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
                  <p className="body-text line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="mt-auto pt-4">
                  <div className="flex items-center gap-3 pt-3">
                    {project.githubUrl && (
                      <Link 
                        href={project.githubUrl}
                        className="card-link"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
                      >
                        <IconBrandGithub className="w-4 h-4" />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link 
                        href={project.liveUrl}
                        className="card-link"
                        target="_blank"
                        onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
                      >
                        <IconExternalLink className="w-4 h-4" />
                      </Link>
                    )}
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
    </PageContainer>
  );
}

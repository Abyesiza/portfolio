"use client";

import { useEffect, useState } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { 
  IconCalendar, 
  IconBrandGithub, 
  IconExternalLink, 
  IconStack2,
  IconChevronLeft
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as Id<"projects">;
  const project = useQuery(api.projects.get, { id: projectId });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (project !== undefined) {
      setIsLoading(false);
    }
  }, [project]);

  // Format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto w-full px-4 py-8">
        {isLoading ? (
          // Loading state
          <div className="space-y-4">
            <motion.div 
              className="h-8 w-2/3 bg-neutral-200 dark:bg-neutral-700 rounded-md"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div 
              className="h-64 w-full bg-neutral-200 dark:bg-neutral-700 rounded-xl"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
              className="h-32 w-full bg-neutral-200 dark:bg-neutral-700 rounded-md"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        ) : project ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
            >
              <IconChevronLeft className="w-4 h-4" />
              Back to Projects
            </button>
            
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
              
              <div className="flex flex-wrap gap-2">
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
              
              <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1">
                  <IconCalendar className="w-4 h-4" />
                  {formatDate(project.createdAt)}
                </div>
                
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <Link 
                      href={project.githubUrl}
                      className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                      target="_blank"
                    >
                      <IconBrandGithub className="w-5 h-5" />
                    </Link>
                  )}
                  
                  {project.liveUrl && (
                    <Link 
                      href={project.liveUrl}
                      className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
                      target="_blank"
                    >
                      <IconExternalLink className="w-5 h-5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
            
            {project.imageUrl && (
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {project.description}
              </p>
              
              {/* Add more sections here if needed */}
            </div>
            
            {project.featured && (
              <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
                Featured Project
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium mb-2">Project not found</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              href="/projects"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Projects
            </Link>
          </div>
        )}
      </div>
    </PageContainer>
  );
} 
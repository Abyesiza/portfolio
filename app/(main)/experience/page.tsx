"use client";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { IconBriefcase, IconCalendar, IconMapPin, IconLoader } from "@tabler/icons-react";
import { PageContainer } from "@/components/ui/page-container";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";

export default function ExperiencePage() {
  const experiences = useQuery(api.experiences.list);
  
  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
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
          <CardSpotlight className="min-h-[350px] w-full">
            <div className="flex flex-col p-6">
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
                <p className="body-text text-sm">
                  {experience.description}
                </p>
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
    </PageContainer>
  );
}

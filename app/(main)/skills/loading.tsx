import { PageContainer } from "@/components/ui/page-container";
import { IconFilter } from "@tabler/icons-react";

export default function SkillsLoading() {
  return (
    <PageContainer>
      <div className="max-w-6xl w-full mx-auto px-4 py-12">
        <div className="h-9 w-64 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-8 animate-pulse" />

        {/* Category Filter Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <IconFilter className="h-4 w-4 text-neutral-300 dark:text-neutral-600" />
            <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div 
                key={index}
                className="h-8 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Skills Categories Skeletons */}
        <div className="space-y-12">
          {Array.from({ length: 3 }).map((_, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <div className="h-7 w-36 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse" />
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div 
                    key={index}
                    className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col items-center animate-pulse"
                  >
                    <div className="h-16 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-3" />
                    <div className="h-5 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-md mb-4" />
                    <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                    <div className="mt-1 w-full flex justify-between">
                      <div className="h-3 w-12 bg-neutral-200 dark:bg-neutral-700 rounded" />
                      <div className="h-3 w-12 bg-neutral-200 dark:bg-neutral-700 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
} 
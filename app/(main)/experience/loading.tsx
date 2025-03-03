import { CardSpotlight } from "@/components/ui/card-spotlight";
import { PageContainer } from "@/components/ui/page-container";

export default function ExperienceLoading() {
  // Create an array of 3 placeholder items for loading state
  const placeholders = Array.from({ length: 3 }).map((_, i) => i);

  return (
    <PageContainer horizontalScroll="Work Experience">
      {placeholders.map((index) => (
        <div key={index} className="card-container flex-shrink-0 w-[300px] sm:w-[350px] md:w-[400px]">
          <CardSpotlight className="h-[350px] w-full animate-pulse">
            <div className="h-full flex flex-col p-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-md bg-neutral-200 dark:bg-neutral-700 flex-shrink-0"></div>
                  <div className="space-y-2">
                    <div className="h-5 w-36 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                    <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  </div>
                </div>
                
                <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded mb-2"></div>
                <div className="h-4 w-40 bg-neutral-200 dark:bg-neutral-700 rounded mb-3"></div>
                
                <div className="space-y-2">
                  <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                  <div className="h-3 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                </div>
              </div>

              <div className="mt-auto pt-4">
                <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-700 rounded mb-3"></div>
                <div className="flex flex-wrap gap-1.5">
                  <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                  <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                  <div className="h-6 w-14 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                  <div className="h-6 w-18 bg-neutral-200 dark:bg-neutral-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardSpotlight>
        </div>
      ))}
    </PageContainer>
  );
} 
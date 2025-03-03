import { IconCode } from "@tabler/icons-react";

export default function SkillsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse" />
        <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg animate-pulse" />
      </div>

      {/* Skills Categories Skeletons */}
      <div className="space-y-8">
        {[1, 2, 3].map((categoryIndex) => (
          <div key={categoryIndex} className="space-y-4">
            <div className="h-7 w-36 bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 animate-pulse"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded bg-neutral-200 dark:bg-neutral-700">
                        <IconCode className="h-5 w-5 text-neutral-300 dark:text-neutral-600" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-5 w-24 bg-neutral-200 dark:bg-neutral-700 rounded" />
                        <div className="h-3 w-12 bg-neutral-200 dark:bg-neutral-700 rounded" />
                      </div>
                    </div>
                    <div className="h-6 w-6 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
                  </div>
                  
                  <div className="mt-3 w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
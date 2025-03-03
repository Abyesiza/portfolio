import { IconFileUpload, IconFiles, IconClock } from "@tabler/icons-react";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
        <div className="h-10 w-28 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                {index === 0 ? (
                  <IconFiles className="h-6 w-6 text-neutral-400" />
                ) : index === 1 ? (
                  <IconFileUpload className="h-6 w-6 text-neutral-400" />
                ) : (
                  <IconClock className="h-6 w-6 text-neutral-400" />
                )}
              </div>
              <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-700 rounded" />
              <div className="h-8 w-16 bg-neutral-200 dark:bg-neutral-700 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="h-6 w-32 bg-neutral-200 dark:bg-neutral-700 rounded" />
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="px-6 py-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                  <IconFileUpload className="h-5 w-5 text-neutral-400" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-700 rounded" />
                  <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700 rounded" />
                </div>
              </div>
              <div className="h-8 w-16 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
"use client";

import { IconLock, IconNote, IconPhoto, IconSearch, IconPlus } from "@tabler/icons-react";

export default function VaultLoading() {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <div className="w-full h-10 pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
          </div>
          
          <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-lg whitespace-nowrap opacity-70 animate-pulse">
            <IconPlus className="h-4 w-4" />
            <div className="w-16 h-4 bg-white/30 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex overflow-x-auto mb-6 pb-2">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className="px-4 py-2 rounded-lg mr-2 whitespace-nowrap h-10 w-28 bg-gray-200 dark:bg-gray-800 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          ></div>
        ))}
      </div>
      
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-neutral-900/30 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden h-64 animate-pulse"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full mr-3 bg-gray-200 dark:bg-gray-800"></div>
                  <div>
                    <div className="h-5 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-2"></div>
                    <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-800"></div>
                  ))}
                </div>
              </div>
              
              <div className="mt-3 h-28 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
              
              <div className="mt-4 flex flex-wrap gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-5 w-16 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
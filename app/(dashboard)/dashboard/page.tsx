"use client";
import { motion } from "framer-motion";
import {
  IconBriefcase,
  IconCode,
  IconClock,
  IconArrowUpRight
} from "@tabler/icons-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function DashboardPage() {
  // Get data from Convex
  const projects = useQuery(api.projects.list);
  const skills = useQuery(api.skills.list);
  const experiences = useQuery(api.experiences.list);

  // Stats for the dashboard
  const stats = [
    {
      title: "Total Projects",
      value: projects?.length.toString() || "0",
      icon: <IconBriefcase className="h-6 w-6" />,
      change: "Portfolio",
    },
    {
      title: "Skills",
      value: skills?.length.toString() || "0",
      icon: <IconCode className="h-6 w-6" />,
      change: "Expertise",
    },
    {
      title: "Experience",
      value: experiences?.length.toString() || "0",
      icon: <IconBriefcase className="h-6 w-6" />,
      change: "Career",
    },
  ];

  // Example recent activity - modify as needed
  const recentActivity = [
    {
      type: "project",
      name: "Latest Portfolio Project",
      time: "Recently added",
    },
    {
      type: "skill",
      name: "New Technology Skill",
      time: "Recently updated",
    },
    {
      type: "experience",
      name: "Work Experience",
      time: "Recently updated",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
          Dashboard Overview
        </h1>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => window.location.href = "/dashboard/projects"}
        >
          New Project
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                {stat.icon}
              </div>
              <div className="flex items-center space-x-1 text-blue-500">
                <span className="text-sm">{stat.change}</span>
                <IconArrowUpRight className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {stat.title}
              </h3>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm p-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-3 last:border-0"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <IconClock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{activity.name}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{activity.type}</p>
                </div>
              </div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 
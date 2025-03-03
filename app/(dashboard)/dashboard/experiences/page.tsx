"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadButton } from "@/lib/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { IconPlus, IconX, IconBriefcase, IconMapPin, IconCalendar } from "@tabler/icons-react";
import Image from "next/image";

export default function ExperiencesPage() {
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    skills: "",
    featured: false,
  });

  const createExperience = useMutation(api.experiences.create);
  const experiences = useQuery(api.experiences.list);
  const removeExperience = useMutation(api.experiences.remove);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedLogoUrl) {
      alert("Please upload a logo for the company");
      return;
    }

    try {
      // Convert dates to timestamps
      const startTimestamp = new Date(formData.startDate).getTime();
      let endTimestamp = formData.current ? undefined : formData.endDate ? new Date(formData.endDate).getTime() : undefined;

      await createExperience({
        title: formData.title,
        company: formData.company,
        location: formData.location,
        startDate: startTimestamp,
        endDate: endTimestamp,
        current: formData.current,
        description: formData.description,
        skills: formData.skills.split(",").map((s) => s.trim()),
        logoUrl: uploadedLogoUrl,
        featured: formData.featured,
      });

      resetForm();
    } catch (error) {
      console.error("Failed to create experience:", error);
      alert("Failed to create experience. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      skills: "",
      featured: false,
    });
    setUploadedLogoUrl("");
    setIsAddingExperience(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await removeExperience({ id: id as any });
      } catch (error) {
        console.error("Failed to delete experience:", error);
        alert("Failed to delete experience. Please try again.");
      }
    }
  };

  // Format date for display
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Work Experience</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingExperience(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <IconPlus className="h-5 w-5" />
          <span>Add Experience</span>
        </motion.button>
      </div>

      {/* Add Experience Form */}
      {isAddingExperience && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Add New Experience</h2>
            <button
              onClick={() => setIsAddingExperience(false)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
            >
              <IconX className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Position Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Skills</label>
                <input
                  type="text"
                  required
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({ ...formData, skills: e.target.value })
                  }
                  placeholder="React, TypeScript, Node.js..."
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  disabled={formData.current}
                  className={`w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formData.current ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.current}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        current: e.target.checked,
                        // Clear end date if current job
                        endDate: e.target.checked ? "" : formData.endDate,
                      });
                    }}
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Current Position</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Featured Experience</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-4">
                  <label className="text-sm font-medium">Company Logo</label>
                  
                  {uploadedLogoUrl ? (
                    <div className="flex items-center space-x-4">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                        <Image
                          src={uploadedLogoUrl}
                          alt="Company logo preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedLogoUrl("")}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
                      >
                        <IconX className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <UploadButton<"experienceLogo">
                      endpoint="experienceLogo"
                      onUploadBegin={() => {
                        setIsUploading(true);
                      }}
                      onClientUploadComplete={(res) => {
                        setIsUploading(false);
                        if (res && res.length > 0) {
                          console.log("Upload complete:", res);
                          setUploadedLogoUrl(res[0].url);
                        } else {
                          console.error("Upload response is empty or invalid", res);
                          alert("Upload failed: No response from server");
                        }
                      }}
                      onUploadError={(error: Error) => {
                        setIsUploading(false);
                        console.error("Upload error:", error);
                        alert(`Upload failed: ${error.message || "Unknown error"}`);
                      }}
                      className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700 ut-button:ut-readying:bg-blue-500 ut-button:ut-uploading:bg-blue-500"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsAddingExperience(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading || !uploadedLogoUrl}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                  isUploading || !uploadedLogoUrl
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isUploading ? "Uploading..." : "Save Experience"}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Experiences Timeline */}
      <div className="space-y-6">
        {experiences?.map((experience) => (
          <motion.div
            key={experience._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden"
          >
            <div className="p-6 flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden">
                  <Image
                    src={experience.logoUrl}
                    alt={experience.company}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{experience.title}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(experience._id)}
                      className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    >
                      <IconX className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <IconBriefcase className="h-4 w-4" />
                    <span>{experience.company}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1">
                    <IconMapPin className="h-4 w-4" />
                    <span>{experience.location}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <div className="flex items-center gap-1">
                    <IconCalendar className="h-4 w-4" />
                    <span>
                      {formatDate(experience.startDate)} - {experience.current ? 'Present' : experience.endDate ? formatDate(experience.endDate) : 'N/A'}
                    </span>
                  </div>
                </div>
                
                <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
                  {experience.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                
                {experience.featured && (
                  <div className="mt-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        {experiences && experiences.length === 0 && (
          <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
            <IconBriefcase className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <h3 className="text-lg font-medium mb-2">No experiences yet</h3>
            <p className="text-sm">
              Click the "Add Experience" button to add your work experience.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 
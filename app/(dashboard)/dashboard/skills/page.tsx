"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadButton } from "@/lib/uploadthing";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { IconPlus, IconX, IconCode, IconStarFilled, IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";

const CATEGORIES = [
  "Frontend", 
  "Backend", 
  "Mobile", 
  "DevOps", 
  "Design", 
  "Other",
  "Database",
  "Cloud",
  "Tools"
];

export default function SkillsPage() {
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [uploadedIconUrl, setUploadedIconUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    proficiency: 50,
    featured: false,
  });

  const createSkill = useMutation(api.skills.create);
  const removeSkill = useMutation(api.skills.remove);
  const skills = useQuery(api.skills.list);
  const categories = useQuery(api.skills.getCategories);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createSkill({
        name: formData.name,
        category: formData.category,
        proficiency: formData.proficiency,
        iconUrl: uploadedIconUrl || undefined,
        featured: formData.featured,
      });

      resetForm();
    } catch (error) {
      console.error("Failed to create skill:", error);
      alert("Failed to create skill. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Frontend",
      proficiency: 50,
      featured: false,
    });
    setUploadedIconUrl("");
    setIsAddingSkill(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await removeSkill({ id: id as Id<"skills"> });
      } catch (error) {
        console.error("Failed to delete skill:", error);
        alert("Failed to delete skill. Please try again.");
      }
    }
  };

  // Group skills by category
  const groupedSkills = (skills || []).reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category]!.push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddingSkill(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <IconPlus className="h-5 w-5" />
          <span>Add Skill</span>
        </motion.button>
      </div>

      {/* Add Skill Form */}
      {isAddingSkill && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Add New Skill</h2>
            <button
              onClick={() => setIsAddingSkill(false)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
            >
              <IconX className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Skill Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                  {categories?.filter(cat => !CATEGORIES.includes(cat)).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">
                  Proficiency ({formData.proficiency}%)
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) =>
                    setFormData({ ...formData, proficiency: parseInt(e.target.value) })
                  }
                  className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Expert</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium">Featured Skill</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-4">
                  <label className="text-sm font-medium">Skill Icon (Optional)</label>
                  
                  {uploadedIconUrl ? (
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                        <Image
                          src={uploadedIconUrl}
                          alt="Skill icon preview"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedIconUrl("")}
                        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg"
                      >
                        <IconX className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <UploadButton<"skillIcon">
                      endpoint="skillIcon"
                      onUploadBegin={() => {
                        setIsUploading(true);
                      }}
                      onClientUploadComplete={(res) => {
                        setIsUploading(false);
                        if (res && res.length > 0) {
                          console.log("Upload complete:", res);
                          setUploadedIconUrl(res[0].url);
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
                onClick={() => setIsAddingSkill(false)}
                className="px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
                  isUploading 
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isUploading ? "Uploading..." : "Save Skill"}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Skills by Category */}
      <div className="space-y-8">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-semibold">{category}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categorySkills?.map((skill) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4"
                >
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-3">
                      {skill.iconUrl ? (
                        <div className="relative w-10 h-10 rounded overflow-hidden bg-neutral-100 dark:bg-neutral-700">
                          <Image 
                            src={skill.iconUrl} 
                            alt={skill.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-10 h-10 rounded bg-neutral-100 dark:bg-neutral-700">
                          <IconCode className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium">{skill.name}</h3>
                        <div className="flex items-center">
                          {skill.featured && (
                            <IconStarFilled className="h-3 w-3 text-yellow-500 mr-1" />
                          )}
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">
                            {skill.proficiency}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(skill._id)}
                      className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                    >
                      <IconTrash className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="mt-3 w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
        
        {skills && skills.length === 0 && (
          <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
            <IconCode className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <h3 className="text-lg font-medium mb-2">No skills yet</h3>
            <p className="text-sm">
              Click the &ldquo;Add Skill&rdquo; button to add your technical skills.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 
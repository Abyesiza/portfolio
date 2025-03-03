"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { 
  IconUser, 
  IconEdit, 
  IconBrandGithub, 
  IconBrandLinkedin, 
  IconBrandTwitter,
  IconPlus,
  IconX,
  IconCheck,
  IconDeviceFloppy,
  IconPhotoPlus,
  IconTrash
} from "@tabler/icons-react";

// Social platform options
const socialPlatforms = [
  { id: "github", name: "GitHub", icon: <IconBrandGithub className="h-5 w-5" /> },
  { id: "linkedin", name: "LinkedIn", icon: <IconBrandLinkedin className="h-5 w-5" /> },
  { id: "twitter", name: "Twitter", icon: <IconBrandTwitter className="h-5 w-5" /> }
];

export default function AboutPage() {
  const aboutData = useQuery(api.about.get);
  const updateAbout = useMutation(api.about.upsert);
  const updateAboutImage = useMutation(api.about.updateImage);

  const [isUploading, setIsUploading] = useState(false);
  const [socialLinks, setSocialLinks] = useState<Array<{ platform: string; url: string }>>([]);
  const [newSocialPlatform, setNewSocialPlatform] = useState("github");
  const [newSocialUrl, setNewSocialUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    philosophy: "",
    approach: "",
    imageUrl: "",
    resumeUrl: "",
  });

  // Initialize form data when query results arrive
  useEffect(() => {
    if (aboutData) {
      setFormData({
        name: aboutData.name || "",
        title: aboutData.title || "",
        description: aboutData.description || "",
        philosophy: aboutData.philosophy || "",
        approach: aboutData.approach || "",
        imageUrl: aboutData.imageUrl || "",
        resumeUrl: aboutData.resumeUrl || "",
      });
      setSocialLinks(aboutData.socialLinks || []);
    }
  }, [aboutData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkAdd = () => {
    if (!newSocialUrl) return;

    setSocialLinks([
      ...socialLinks,
      { platform: newSocialPlatform, url: newSocialUrl }
    ]);
    
    setNewSocialPlatform("github");
    setNewSocialUrl("");
  };

  const handleSocialLinkRemove = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await updateAbout({
        id: aboutData?._id as Id<"about"> | undefined,
        ...formData,
        socialLinks,
      });
      
      alert("About page updated successfully!");
    } catch (error) {
      console.error("Failed to update about page:", error);
      alert("Failed to update about page. Please try again.");
    }
  };

  // Get the appropriate icon for a social platform
  const getSocialIcon = (platform: string) => {
    const found = socialPlatforms.find(p => p.id === platform);
    return found?.icon || <IconBrandGithub className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">About Page Management</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <IconDeviceFloppy className="h-5 w-5" />
          <span>Save Changes</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Image Section */}
        <div className="md:col-span-1 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 space-y-4">
          <h2 className="text-xl font-medium mb-4">Profile Image</h2>
          
          <div className="flex flex-col items-center">
            {formData.imageUrl ? (
              <div className="relative w-48 h-48 rounded-xl overflow-hidden mb-4">
                <Image
                  src={formData.imageUrl}
                  alt="Profile"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-xl"
                />
              </div>
            ) : (
              <div className="w-48 h-48 rounded-xl bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mb-4">
                <IconUser className="h-16 w-16 text-neutral-400" />
              </div>
            )}
            
            {isUploading ? (
              <div className="text-center">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">Uploading...</p>
              </div>
            ) : (
              <UploadButton
                endpoint="aboutImage"
                onUploadBegin={() => {
                  setIsUploading(true);
                }}
                onClientUploadComplete={(res) => {
                  setIsUploading(false);
                  if (res && res[0]) {
                    updateAboutImage({ 
                      id: aboutData?._id as Id<"about"> | undefined,
                      imageUrl: res[0].url 
                    });
                    setFormData(prev => ({ ...prev, imageUrl: res[0].url }));
                  }
                }}
                onUploadError={(err) => {
                  setIsUploading(false);
                  console.error("Upload failed:", err);
                  alert("Upload failed: " + err.message);
                }}
                className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700 ut-button:text-white ut-button:rounded-lg"
              />
            )}
          </div>
        </div>

        {/* Main Info Section */}
        <div className="md:col-span-2 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-xl font-medium mb-4">Personal Information</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Job Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                placeholder="Software Engineer & Web Developer"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                placeholder="Describe yourself and your background"
              />
            </div>
            
            <div>
              <label htmlFor="philosophy" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Philosophy
              </label>
              <textarea
                id="philosophy"
                name="philosophy"
                value={formData.philosophy}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                placeholder="Your work philosophy or approach"
              />
            </div>
            
            <div>
              <label htmlFor="approach" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Approach (Optional)
              </label>
              <textarea
                id="approach"
                name="approach"
                value={formData.approach}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                placeholder="Additional details about your approach"
              />
            </div>
            
            <div>
              <label htmlFor="resumeUrl" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Resume URL (Optional)
              </label>
              <input
                type="text"
                id="resumeUrl"
                name="resumeUrl"
                value={formData.resumeUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
                placeholder="URL to your resume PDF"
              />
            </div>
          </form>
        </div>
        
        {/* Social Links Section */}
        <div className="md:col-span-3 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-xl font-medium mb-4">Social Links</h2>
          
          <div className="space-y-4">
            {/* Current Social Links */}
            {socialLinks.length > 0 && (
              <div className="space-y-2">
                {socialLinks.map((link, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getSocialIcon(link.platform)}
                      <span className="font-medium">{link.platform}</span>
                      <span className="text-blue-600 dark:text-blue-400">{link.url}</span>
                    </div>
                    <button 
                      onClick={() => handleSocialLinkRemove(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <IconTrash className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Add New Social Link */}
            <div className="flex items-center gap-3">
              <select 
                value={newSocialPlatform}
                onChange={(e) => setNewSocialPlatform(e.target.value)}
                className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
              >
                {socialPlatforms.map(platform => (
                  <option key={platform.id} value={platform.id}>{platform.name}</option>
                ))}
              </select>
              
              <input 
                type="text"
                value={newSocialUrl}
                onChange={(e) => setNewSocialUrl(e.target.value)}
                placeholder="URL (e.g., https://github.com/yourusername)"
                className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
              />
              
              <button
                onClick={handleSocialLinkAdd}
                disabled={!newSocialUrl}
                className={`px-3 py-2 rounded-lg ${
                  newSocialUrl
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-neutral-200 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed"
                } transition-colors`}
              >
                <IconPlus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
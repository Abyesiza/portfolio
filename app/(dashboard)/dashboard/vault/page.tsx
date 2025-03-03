"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatDistanceToNow } from "date-fns";
import { 
  IconLock, 
  IconNote, 
  IconPhoto, 
  IconPlus, 
  IconPin, 
  IconPinnedOff,
  IconTrash,
  IconEdit,
  IconSearch,
  IconX,
  IconEye,
  IconEyeOff,
  IconTag,
  IconFolder
} from "@tabler/icons-react";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";

// Define type for Vault Item from database
interface VaultItem {
  _id: Id<"vault">;
  _creationTime: number;
  title: string;
  username?: string;
  password?: string;
  url?: string;
  notes?: string;
  isPinned: boolean;
  tags: string[];
  icon: string;
  imageUrl?: string;
  userId: string;
}

// Form data interface for adding/editing items
interface VaultFormData {
  title: string;
  type: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string[];
  isPinned: boolean;
  isEncrypted: boolean;
}

// Simple wrapper component to handle UploadThing type issues
function VaultImageUploader({ onComplete }: { onComplete: (url: string) => void }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  return (
    <div className="mt-2">
      {error && (
        <div className="text-red-500 mb-2 text-sm">
          {error}
          <button 
            className="ml-2 text-blue-500 hover:underline" 
            onClick={() => setError(null)}
          >
            Try Again
          </button>
        </div>
      )}
      <UploadButton
        endpoint="vaultImage"
        onClientUploadComplete={(res: { url: string; name: string; size: number }[]) => {
          setIsUploading(false);
          if (res && res[0]) {
            onComplete(res[0].url);
          }
        }}
        onUploadBegin={() => {
          setIsUploading(true);
          setError(null);
        }}
        onUploadError={(error: Error) => {
          console.error("Error uploading image:", error);
          setIsUploading(false);
          setError(error.message || "Error uploading image. Please try again.");
        }}
        appearance={{
          button: "bg-blue-600 hover:bg-blue-700 text-white rounded-md",
          container: "w-full flex justify-center"
        }}
      />
      {isUploading && (
        <div className="text-center mt-2 text-sm text-gray-500">
          Uploading... Please wait.
        </div>
      )}
    </div>
  );
}

export default function VaultPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<VaultItem | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<Record<string, boolean>>({});
  
  const vaultItems = useQuery(api.vault.list);
  const createVaultItem = useMutation(api.vault.create);
  const updateVaultItem = useMutation(api.vault.update);
  const togglePinItem = useMutation(api.vault.togglePin);
  const removeVaultItem = useMutation(api.vault.remove);
  
  const [formData, setFormData] = useState<VaultFormData>({
    title: "",
    type: "note",
    content: "",
    imageUrl: "",
    category: "General",
    tags: [],
    isPinned: false,
    isEncrypted: false,
  });
  
  const [newTag, setNewTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Filter items based on active tab and search query
  const filteredItems = vaultItems?.filter((item) => {
    const matchesTab = activeTab === "all" || item.type === activeTab;
    const matchesSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content && item.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesTab && matchesSearch;
  });
  
  // Sort items with pinned items first
  const sortedItems = filteredItems?.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.createdAt - a.createdAt;
  });
  
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const vaultData = {
        title: formData.title,
        type: formData.type || "note",
        content: formData.content || "",
        imageUrl: formData.imageUrl,
        category: formData.category || "General",
        tags: formData.tags,
        isPinned: formData.isPinned,
        isEncrypted: formData.isEncrypted,
      };
      
      if (editingItem) {
        // Update existing item
        await updateVaultItem({
          id: editingItem._id,
          ...vaultData,
        });
      } else {
        // Create new item
        await createVaultItem(vaultData);
      }
      
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving vault item:", error);
    }
  };
  
  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      type: item.type || "note",
      content: item.content || "",
      imageUrl: item.imageUrl || "",
      category: item.category || "General",
      tags: item.tags || [],
      isPinned: item.isPinned || false,
      isEncrypted: item.isEncrypted || false,
    });
    setShowAddModal(true);
  };
  
  const togglePasswordVisibility = (id: string) => {
    setIsPasswordVisible(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const handleTogglePin = async (id: Id<"vault">) => {
    await togglePinItem({ id });
  };
  
  const handleDelete = async (id: Id<"vault">) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await removeVaultItem({ id });
    }
  };
  
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };
  
  const resetForm = () => {
    setFormData({
      title: "",
      type: "note",
      content: "",
      imageUrl: "",
      category: "General",
      tags: [],
      isPinned: false,
      isEncrypted: false,
    });
    setEditingItem(null);
  };
  
  if (!vaultItems) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin h-8 w-8 border-2 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold">Private Vault</h1>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search vault..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <IconX className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg whitespace-nowrap"
          >
            <IconPlus className="h-4 w-4" />
            <span>Add Item</span>
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex overflow-x-auto mb-6 pb-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap flex items-center ${
            activeTab === "all"
              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          <IconLock className="h-4 w-4 mr-2" />
          All Items
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap flex items-center ${
            activeTab === "password"
              ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          <IconLock className="h-4 w-4 mr-2" />
          Passwords
        </button>
        <button
          onClick={() => setActiveTab("note")}
          className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap flex items-center ${
            activeTab === "note"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          <IconNote className="h-4 w-4 mr-2" />
          Notes
        </button>
        <button
          onClick={() => setActiveTab("image")}
          className={`px-4 py-2 rounded-lg mr-2 whitespace-nowrap flex items-center ${
            activeTab === "image"
              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          <IconPhoto className="h-4 w-4 mr-2" />
          Images
        </button>
      </div>
      
      {/* Content */}
      {sortedItems?.length === 0 ? (
        <div className="bg-white dark:bg-neutral-900/30 rounded-xl border border-neutral-200 dark:border-neutral-800 p-8 text-center">
          <IconLock className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
          <h2 className="text-xl font-medium mb-2">Your vault is empty</h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-6">
            Securely store your passwords, notes, and images in your private vault.
          </p>
          <button
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg inline-flex items-center"
          >
            <IconPlus className="h-4 w-4 mr-2" />
            Add Your First Item
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedItems?.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white dark:bg-neutral-900/30 rounded-xl border ${
                item.isPinned
                  ? "border-amber-300 dark:border-amber-700"
                  : "border-neutral-200 dark:border-neutral-800"
              } overflow-hidden relative`}
            >
              {item.isPinned && (
                <div className="absolute top-0 right-0 p-1 bg-amber-100 dark:bg-amber-900/30 rounded-bl-lg">
                  <IconPin className="h-4 w-4 text-amber-600" />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full mr-3 flex items-center justify-center ${
                      item.type === "password" 
                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" 
                        : item.type === "note"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                    }`}>
                      {item.type === "password" && <IconLock className="h-4 w-4" />}
                      {item.type === "note" && <IconNote className="h-4 w-4" />}
                      {item.type === "image" && <IconPhoto className="h-4 w-4" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(item.createdAt)} ago
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <button
                      onClick={() => handleTogglePin(item._id)}
                      className="p-1 rounded-full text-gray-400 hover:text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-900/20"
                    >
                      {item.isPinned ? (
                        <IconPinnedOff className="h-4 w-4" />
                      ) : (
                        <IconPin className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleEditItem(item)}
                      className="p-1 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                    >
                      <IconEdit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20"
                    >
                      <IconTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {item.category && (
                  <div className="flex items-center mb-2">
                    <IconFolder className="h-3.5 w-3.5 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.category}</span>
                  </div>
                )}
                
                {/* Item content based on type */}
                {item.type === "password" && (
                  <div className="relative mt-3 mb-2">
                    <input
                      type={isPasswordVisible[item._id.toString()] ? "text" : "password"}
                      value={item.content}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm"
                    />
                    <button
                      onClick={() => togglePasswordVisibility(item._id.toString())}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {isPasswordVisible[item._id.toString()] ? (
                        <IconEyeOff className="h-4 w-4" />
                      ) : (
                        <IconEye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}
                
                {item.type === "note" && (
                  <div className="mt-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-sm whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {item.content}
                  </div>
                )}
                
                {item.type === "image" && item.imageUrl && (
                  <div className="mt-3 rounded-lg overflow-hidden h-48 relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.tags.map((tag: string) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                      >
                        <IconTag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold">
                {editingItem ? "Edit Item" : "Add New Item"}
              </h2>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <IconX className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddItem} className="p-4">
              <div className="space-y-4">
                {!editingItem && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type
                    </label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, type: "password"})}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center ${
                          formData.type === "password" 
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" 
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        <IconLock className="h-4 w-4 mr-2" />
                        Password
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, type: "note"})}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center ${
                          formData.type === "note" 
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        <IconNote className="h-4 w-4 mr-2" />
                        Note
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, type: "image"})}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center ${
                          formData.type === "image" 
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" 
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                        <IconPhoto className="h-4 w-4 mr-2" />
                        Image
                      </button>
                    </div>
                  </div>
                )}
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                    placeholder="Enter a title"
                    required
                  />
                </div>
                
                {formData.type === "image" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Image
                    </label>
                    {formData.imageUrl ? (
                      <div className="relative h-48 mb-2 rounded-lg overflow-hidden">
                        <Image
                          src={formData.imageUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, imageUrl: ""})}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                        >
                          <IconX className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <VaultImageUploader 
                        onComplete={(url) => {
                          setFormData({
                            ...formData,
                            imageUrl: url,
                          });
                        }} 
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {formData.type === "password" ? "Password" : "Note Content"}
                    </label>
                    {formData.type === "password" ? (
                      <div className="relative">
                        <input
                          type={isPasswordVisible["new"] ? "text" : "password"}
                          id="content"
                          value={formData.content}
                          onChange={(e) => setFormData({...formData, content: e.target.value})}
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                          placeholder="Enter password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility("new")}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {isPasswordVisible["new"] ? (
                            <IconEyeOff className="h-4 w-4" />
                          ) : (
                            <IconEye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    ) : (
                      <textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg min-h-[100px] resize-y"
                        placeholder="Enter your notes here"
                        required
                      />
                    )}
                  </div>
                )}
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                    placeholder="e.g., Work, Personal, Finance"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tags
                  </label>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                      placeholder="Add a tag"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="p-2 bg-blue-500 text-white rounded-lg"
                    >
                      <IconPlus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-gray-400 hover:text-gray-600"
                          >
                            <IconX className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isEncrypted"
                      checked={formData.isEncrypted}
                      onChange={(e) => setFormData({...formData, isEncrypted: e.target.checked})}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <label htmlFor="isEncrypted" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Additional encryption
                    </label>
                  </div>
                  
                  {!editingItem && (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isPinned"
                        checked={formData.isPinned}
                        onChange={(e) => setFormData({...formData, isPinned: e.target.checked})}
                        className="h-4 w-4 text-blue-600 rounded border-gray-300"
                      />
                      <label htmlFor="isPinned" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Pin this item
                      </label>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingItem ? "Update" : "Save"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
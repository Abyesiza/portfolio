import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const aboutTable = defineTable({
  name: v.string(),
  title: v.string(),
  description: v.string(),
  philosophy: v.string(),
  approach: v.optional(v.string()),
  imageUrl: v.optional(v.string()),
  socialLinks: v.optional(v.array(v.object({
    platform: v.string(),
    url: v.string()
  }))),
  resumeUrl: v.optional(v.string()),
  createdAt: v.number(),
  updatedAt: v.optional(v.number()),
});

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    githubUrl: v.optional(v.string()),
    liveUrl: v.optional(v.string()),
    technologies: v.array(v.string()),
    featured: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  experiences: defineTable({
    title: v.string(),
    company: v.string(),
    location: v.string(),
    startDate: v.number(),
    endDate: v.optional(v.number()),
    current: v.boolean(),
    description: v.string(),
    skills: v.array(v.string()),
    logoUrl: v.string(),
    featured: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  skills: defineTable({
    name: v.string(),
    category: v.string(),
    proficiency: v.number(), // 1-100 scale
    iconUrl: v.optional(v.string()),
    featured: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    status: v.string(), // "new", "read", "replied"
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }),
  vault: defineTable({
    title: v.string(),
    type: v.string(), // "password", "note", "image"
    content: v.string(), // For passwords and notes
    imageUrl: v.optional(v.string()), // For image type entries
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isPinned: v.optional(v.boolean()),
    isEncrypted: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }),
  about: aboutTable,
}); 
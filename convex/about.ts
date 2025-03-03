import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

// Get the about page content
export const get = query({
  handler: async (ctx) => {
    const aboutData = await ctx.db.query("about").order("desc").first();
    return aboutData;
  },
});

// Create or update the about page content
export const upsert = mutation({
  args: {
    id: v.optional(v.id("about")),
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
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    const timestamp = Date.now();

    if (id) {
      // Update existing record
      await ctx.db.patch(id, {
        ...data,
        updatedAt: timestamp,
      });
      return id;
    } else {
      // Create new record
      const existingAbout = await ctx.db.query("about").first();
      
      // If there's an existing record, update it instead of creating a new one
      if (existingAbout) {
        await ctx.db.patch(existingAbout._id, {
          ...data,
          updatedAt: timestamp,
        });
        return existingAbout._id;
      }

      // Otherwise create a new record
      const newId = await ctx.db.insert("about", {
        ...data,
        createdAt: timestamp,
      });
      return newId;
    }
  },
});

// Update the about image
export const updateImage = mutation({
  args: {
    id: v.optional(v.id("about")),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, imageUrl } = args;
    const timestamp = Date.now();

    // If an ID is provided, update that record
    if (id) {
      await ctx.db.patch(id, {
        imageUrl,
        updatedAt: timestamp,
      });
      return id;
    }

    // Otherwise, find the first record and update it
    const existingAbout = await ctx.db.query("about").first();
    if (existingAbout) {
      await ctx.db.patch(existingAbout._id, {
        imageUrl,
        updatedAt: timestamp,
      });
      return existingAbout._id;
    }

    // If no record exists, create a new one with default values
    return await ctx.db.insert("about", {
      name: "Your Name",
      title: "Your Title",
      description: "Your description goes here",
      philosophy: "Your philosophy goes here",
      imageUrl,
      createdAt: timestamp,
    });
  },
}); 
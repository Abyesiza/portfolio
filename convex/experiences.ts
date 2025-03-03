import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const experienceId = await ctx.db.insert("experiences", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return experienceId;
  },
});

export const update = mutation({
  args: {
    id: v.id("experiences"),
    title: v.optional(v.string()),
    company: v.optional(v.string()),
    location: v.optional(v.string()),
    startDate: v.optional(v.number()),
    endDate: v.optional(v.number()),
    current: v.optional(v.boolean()),
    description: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    logoUrl: v.optional(v.string()),
    featured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, {
      ...fields,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("experiences") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const get = query({
  args: { id: v.id("experiences") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("experiences")
      .order("desc")
      .collect();
  },
});

export const getFeatured = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("experiences")
      .filter((q) => q.eq(q.field("featured"), true))
      .order("desc")
      .collect();
  },
}); 
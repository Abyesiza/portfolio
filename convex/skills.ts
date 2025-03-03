import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    proficiency: v.number(),
    iconUrl: v.optional(v.string()),
    featured: v.boolean(),
  },
  handler: async (ctx, args) => {
    const skillId = await ctx.db.insert("skills", {
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return skillId;
  },
});

export const update = mutation({
  args: {
    id: v.id("skills"),
    name: v.optional(v.string()),
    category: v.optional(v.string()),
    proficiency: v.optional(v.number()),
    iconUrl: v.optional(v.string()),
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
  args: { id: v.id("skills") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const get = query({
  args: { id: v.id("skills") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("skills")
      .order("desc")
      .collect();
  },
});

export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, { category }) => {
    return await ctx.db
      .query("skills")
      .filter((q) => q.eq(q.field("category"), category))
      .order("desc")
      .collect();
  },
});

export const getFeatured = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("skills")
      .filter((q) => q.eq(q.field("featured"), true))
      .order("desc")
      .collect();
  },
});

export const getCategories = query({
  handler: async (ctx) => {
    const skills = await ctx.db.query("skills").collect();
    const categories = new Set(skills.map(skill => skill.category));
    return Array.from(categories);
  },
}); 
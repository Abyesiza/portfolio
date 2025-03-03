import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new vault item
export const create = mutation({
  args: {
    title: v.string(),
    type: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isPinned: v.optional(v.boolean()),
    isEncrypted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const vaultId = await ctx.db.insert("vault", {
      title: args.title,
      type: args.type,
      content: args.content,
      imageUrl: args.imageUrl,
      category: args.category || "General",
      tags: args.tags || [],
      isPinned: args.isPinned || false,
      isEncrypted: args.isEncrypted || false,
      createdAt: Date.now(),
    });
    
    return vaultId;
  },
});

// Get all vault items
export const list = query({
  handler: async (ctx) => {
    const items = await ctx.db
      .query("vault")
      .order("desc")
      .collect();
    
    return items;
  },
});

// Get vault items by type
export const getByType = query({
  args: {
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("vault")
      .filter((q) => q.eq(q.field("type"), args.type))
      .order("desc")
      .collect();
    
    return items;
  },
});

// Get vault items by category
export const getByCategory = query({
  args: {
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const items = await ctx.db
      .query("vault")
      .filter((q) => q.eq(q.field("category"), args.category))
      .order("desc")
      .collect();
    
    return items;
  },
});

// Update a vault item
export const update = mutation({
  args: {
    id: v.id("vault"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    isPinned: v.optional(v.boolean()),
    isEncrypted: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    
    await ctx.db.patch(id, {
      ...fields,
      updatedAt: Date.now(),
    });
    
    return id;
  },
});

// Toggle pin status
export const togglePin = mutation({
  args: {
    id: v.id("vault"),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db.get(args.id);
    if (!item) throw new Error("Vault item not found");
    
    await ctx.db.patch(args.id, {
      isPinned: !item.isPinned,
      updatedAt: Date.now(),
    });
    
    return args.id;
  },
});

// Delete a vault item
export const remove = mutation({
  args: {
    id: v.id("vault"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    
    return args.id;
  },
}); 
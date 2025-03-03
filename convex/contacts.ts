import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new contact submission
export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const contactId = await ctx.db.insert("contacts", {
      name: args.name,
      email: args.email,
      message: args.message,
      status: "new",
      createdAt: Date.now(),
    });
    
    return contactId;
  },
});

// Get all contacts, sorted by most recent first
export const list = query({
  handler: async (ctx) => {
    const contacts = await ctx.db
      .query("contacts")
      .order("desc")
      .collect();
    
    return contacts;
  },
});

// Update contact status
export const updateStatus = mutation({
  args: {
    id: v.id("contacts"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
    
    return args.id;
  },
});

// Delete a contact
export const remove = mutation({
  args: {
    id: v.id("contacts"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    
    return args.id;
  },
}); 
import { mutation } from "./_generated/server";
import { v } from "convex/values";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const subscribe = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  returns: v.union(
    v.object({ status: v.literal("created"), id: v.id("subscribers") }),
    v.object({ status: v.literal("exists") }),
  ),
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim().toLowerCase();

    if (name.length < 1 || name.length > 200) {
      throw new Error("Name must be between 1 and 200 characters");
    }
    if (!emailPattern.test(email) || email.length > 320) {
      throw new Error("Invalid email address");
    }

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (existing) {
      return { status: "exists" as const };
    }

    const id = await ctx.db.insert("subscribers", {
      name,
      email,
      createdAt: Date.now(),
    });

    return { status: "created" as const, id };
  },
});

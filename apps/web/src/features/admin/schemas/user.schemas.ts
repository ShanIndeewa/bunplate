import { user } from "@repo/database";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const selectUserSchema = createSelectSchema(user);

export const insertUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["admin", "user", "moderator"]).default("user"),
  emailVerified: z.boolean().default(false),
  banned: z.boolean().default(false),
  banReason: z.string().optional(),
  banExpires: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// Extended type that includes password for creation
export const createUserSchema = insertUserSchema.extend({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters"),
});

export type CreateUser = z.infer<typeof createUserSchema>;

// Type for user with stats used in user cards
export type UserWithStats = z.infer<typeof selectUserSchema> & {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: Date | string | null;
  emailVerified: boolean;
  createdAt: Date | string;
};

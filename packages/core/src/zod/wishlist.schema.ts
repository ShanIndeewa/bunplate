import { z } from "zod";

export const wishlistSchema = z.object({
  id: z.string(),
  userId: z.string(),
  jobId: z.string(),
  organizationId: z.string().nullable(),
  jobStatus: z.enum(["live", "expired"]),
  isApplied: z.boolean(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

export const wishlistInsertSchema = wishlistSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const wishlistUpdateSchema = wishlistSchema
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type Wishlist = z.infer<typeof wishlistSchema>;
export type WishlistInsertType = z.infer<typeof wishlistInsertSchema>;
export type WishlistUpdateType = z.infer<typeof wishlistUpdateSchema>;

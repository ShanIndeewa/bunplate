
import { z } from "zod";

import { jobWishlist } from "../database/schema/jobWishlist.schema";

// Full row (select) schema — Date objects for timestamps
export const wishlistSchema = z.object(jobWishlist);

// Insert schema — omit server-managed fields
export const wishlistInsertSchema = z.object(jobWishlist).omit({
  id: true,
  userId: true, // set from session on the server
  createdAt: true, // defaultNow() in DB
  updatedAt: true, // defaultNow() in DB
});

// Update schema — same omissions, but everything optional
export const wishlistUpdateSchema = z.object(jobWishlist)
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

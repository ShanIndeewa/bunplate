
import { z } from "zod";

import { jobWishlist } from "../database/schema/jobWishlist.schema";

// ✅ Select schema (for reading wishlist records)
export const jobWishlistSchema = z.object(jobWishlist);

// ✅ Insert schema (for adding a new wishlist record)
export const jobWishlistInsertSchema = z.object(jobWishlist).omit({

  id: true,
  userId: true,        // user shouldn't be changed
  createdAt: true,      // default now()
  jobStatus: true,      // default "live"
  isApplied: true,      // default false
});

// ✅ Update schema (for updating wishlist record)
export const jobWishlistUpdateSchema = z.object(jobWishlist)
  .omit({
    id: true,
    userId: true,        // user shouldn't be changed
    jobId: true,         // job reference shouldn't be changed
    createdAt: true,
  })
  .partial(); // all fields optional for updates

// ✅ Types
export type JobWishlist = z.infer<typeof jobWishlistSchema>;
export type JobWishlistInsertType = z.infer<typeof jobWishlistInsertSchema>;
export type JobWishlistUpdateType = z.infer<typeof jobWishlistUpdateSchema>;

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { jobWishlist } from "core/database/schema";

// Full row (select) schema — Date objects for timestamps
export const jobWishlistSchema = createSelectSchema(jobWishlist);

// Insert schema — omit server-managed fields
export const jobWishlistInsertSchema = createInsertSchema(jobWishlist).omit({
  id: true,
  userId: true, // set from session on the server
  createdAt: true, // defaultNow() in DB
  updatedAt: true, // defaultNow() in DB
});

// Update schema — same omissions, but everything optional
export const jobWishlistUpdateSchema = createInsertSchema(jobWishlist)
  .omit({
    id: true,
    userId: true,
    jobId: true, // job reference shouldn't be changed
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type JobWishlist = z.infer<typeof jobWishlistSchema>;
export type JobWishlistInsertType = z.infer<typeof jobWishlistInsertSchema>;
export type JobWishlistUpdateType = z.infer<typeof jobWishlistUpdateSchema>;



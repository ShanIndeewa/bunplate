import { z } from "zod";

export const jobStatusSchema = z.enum(["live", "expired"]);

export const jobWishlistSchema = z.object({
  id: z.string(),
  userId: z.string(),
  jobId: z.string(),
  organizationId: z.string().nullable(),
  jobStatus: jobStatusSchema,
  isApplied: z.boolean(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

export const jobWishlistInsertSchema = jobWishlistSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  jobStatus: true,
  isApplied: true,
});

export const jobWishlistUpdateSchema = jobWishlistSchema
  .omit({
    id: true,
    userId: true,
    jobId: true,
    createdAt: true,
  })
  .partial();

export type JobWishlist = z.infer<typeof jobWishlistSchema>;
export type JobWishlistInsertType = z.infer<typeof jobWishlistInsertSchema>;
export type JobWishlistUpdateType = z.infer<typeof jobWishlistUpdateSchema>;

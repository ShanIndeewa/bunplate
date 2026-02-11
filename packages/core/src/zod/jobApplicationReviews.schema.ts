
import { z } from "zod";

import { jobApplicationReviews } from "../database/schema/jobApplicationReviews.schema";

export const jobApplicationReview = z.object(jobApplicationReviews);

export const jobApplicationReviewInsertSchema = z.object(
  jobApplicationReviews
).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  reviewerId: true, // reviewerId will be added from session
});

export const jobApplicationReviewUpdateSchema = z.object(
  jobApplicationReviews
)
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    reviewerId: true, // reviewerId cannot be updated
  })
  .partial();

export type jobApplicationReview = z.infer<typeof jobApplicationReview>;
export type jobApplicationReviewInsertType = z.infer<
  typeof jobApplicationReviewInsertSchema
>;
export type jobApplicationReviewUpdateType = z.infer<
  typeof jobApplicationReviewUpdateSchema
>;

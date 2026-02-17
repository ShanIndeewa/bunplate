import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { jobApplicationReviews } from "core/database/schema";

const statusEnum = z.enum([
  "draft",
  "submitted",
  "under_review",
  "shortlisted",
  "interview_scheduled",
  "offer_extended",
  "hired",
  "rejected",
  "withdrawn",
]);

export const jobApplicationReview = createSelectSchema(jobApplicationReviews, {
  status: statusEnum,
  attachments: z.any().nullable().optional(),
});

export const jobApplicationReviewInsertSchema = createInsertSchema(jobApplicationReviews, {
  status: statusEnum.optional(),
  attachments: z.any().nullable().optional(),
}).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  reviewerId: true, // reviewerId will be added from session
});

export const jobApplicationReviewUpdateSchema = createInsertSchema(jobApplicationReviews, {
  status: statusEnum.optional(),
  attachments: z.any().nullable().optional(),
})
  .omit({
    id: true,
    reviewerId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type jobApplicationReviewUpdateType = z.infer<typeof jobApplicationReviewUpdateSchema>;
export type jobApplicationReview = z.infer<typeof jobApplicationReview>;
export type jobApplicationReviewInsertType = z.infer<typeof jobApplicationReviewInsertSchema>;

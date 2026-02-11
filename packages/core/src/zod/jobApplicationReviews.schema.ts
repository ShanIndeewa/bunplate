import { z } from "zod";

/* ======================================================
   Base Schema (manual, NOT drizzle table)
====================================================== */

export const jobApplicationReviewSchema = z.object({
  id: z.string(),
  applicationId: z.string(),
  reviewerId: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  status: z.enum([
    "draft",
    "submitted",
    "under_review",
    "shortlisted",
    "interview_scheduled",
    "offer_extended",
    "hired",
    "rejected",
    "withdrawn",
  ]),
  comments: z.string().nullable().optional(),
  rating: z.number().nullable().optional(),
  attachments: z.any().nullable().optional(),
  interviewAt: z.coerce.date().nullable().optional(),
  interviewLocation: z.string().nullable().optional(),
  meetingLink: z.string().nullable().optional(),
});

/* ======================================================
   Insert Schema
====================================================== */

export const jobApplicationReviewInsertSchema = jobApplicationReviewSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  reviewerId: true, // will be added from session
});

/* ======================================================
   Update Schema
====================================================== */

export const jobApplicationReviewUpdateSchema = jobApplicationReviewSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    reviewerId: true,
  })
  .partial();

/* ======================================================
   TYPES
====================================================== */

export type JobApplicationReview = z.infer<typeof jobApplicationReviewSchema>;
export type JobApplicationReviewInsert =
  z.infer<typeof jobApplicationReviewInsertSchema>;
export type JobApplicationReviewUpdate =
  z.infer<typeof jobApplicationReviewUpdateSchema>;

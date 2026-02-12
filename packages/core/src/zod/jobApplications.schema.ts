import { z } from "zod";

/** Helpers */
const emptyToNull = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === "" ? null : v), schema.nullable());

/** applicant_profile JSONB shape */
export const ApplicantProfileSchema = z
  .object({
    fullName: z.string().min(1).max(256).optional(),
    email: z.string().email().max(256).optional(),
    phone: z.string().max(64).optional(),
    address: z.string().max(512).optional(),
    linkedin: z.string().url().max(512).nullable().optional(),
    portfolio: z.string().url().max(512).nullable().optional(),
  })
  .passthrough()
  .optional();

export const applicationStatusSchema = z.enum([
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

export const adminActionSchema = z.enum(["admin_only", "access_company"]);

/** SELECT schema (read shape) */
export const jobApplication = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  userId: z.string(),
  jobId: z.string(),
  roundNo: z.number(),
  status: applicationStatusSchema,
  adminAction: adminActionSchema,
  mediaId: z.string().nullable(),
  applicantProfile: ApplicantProfileSchema.nullable(),
  coverLetterText: z.string().nullable(),
  source: z.string().nullable(),
  referralCode: z.string().nullable(),
  tags: z.any().nullable(),
  submittedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/** INSERT schema (create shape) */
export const jobApplicationInsertSchema = jobApplication
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    submittedAt: true,
    organizationId: true,
    userId: true,
    roundNo: true,
    status: true,
    adminAction: true,
  })
  .extend({
    mediaId: emptyToNull(z.string().uuid()).optional(),
    tags: z.array(z.string()).max(50).optional(),
    source: z.string().max(64).nullable().optional(),
    referralCode: z.string().max(64).nullable().optional(),
    applicantProfile: ApplicantProfileSchema,
  });

/** UPDATE schema (patch shape) */
export const jobApplicationUpdateSchema = jobApplication
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
    submittedAt: true,
    jobId: true,
    roundNo: true,
    adminAction: true,
  })
  .extend({
    mediaId: emptyToNull(z.string().uuid()).optional(),
    tags: z.array(z.string()).max(50).optional(),
    source: z.string().max(64).nullable().optional(),
    referralCode: z.string().max(64).nullable().optional(),
    applicantProfile: ApplicantProfileSchema,
  })
  .partial();

/** ADMIN UPDATE schema (allows admin to update adminAction) */
export const jobApplicationAdminUpdateSchema = jobApplication
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
    submittedAt: true,
    jobId: true,
    roundNo: true,
  })
  .extend({
    mediaId: emptyToNull(z.string().uuid()).optional(),
    tags: z.array(z.string()).max(50).optional(),
    source: z.string().max(64).nullable().optional(),
    referralCode: z.string().max(64).nullable().optional(),
    applicantProfile: ApplicantProfileSchema,
    adminAction: adminActionSchema.optional(),
  })
  .partial();

export type JobApplication = z.infer<typeof jobApplication>;
export type JobApplicationInsert = z.infer<typeof jobApplicationInsertSchema>;
export type JobApplicationUpdate = z.infer<typeof jobApplicationUpdateSchema>;
export type JobApplicationAdminUpdate = z.infer<typeof jobApplicationAdminUpdateSchema>;

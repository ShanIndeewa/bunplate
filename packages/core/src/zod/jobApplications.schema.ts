import { jobApplications } from "../database/schema/jobApplications.schema";

import { z } from "zod";

/** Helpers */
const emptyToNull = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((v) => (v === "" ? null : v), schema.nullable());

/** applicant_profile JSONB shape (override) */
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

/** Common overrides reused below */
const commonOverrides = {
  tags: z.array(z.string()).max(50).optional(), // jsonb -> string[]
  source: z.string().max(64).nullable().optional(),
  referralCode: z.string().max(64).nullable().optional(),
  applicantProfile: ApplicantProfileSchema,
  adminAction: z.enum(["admin_only", "access_company"]).optional(),
  // coverLetterText is text and optional in DB, drizzle-zod infers optional automatically
};

/** SELECT schema (read shape) */
export const jobApplication = z.object(jobApplications).extend({
  ...commonOverrides,
});

/** INSERT schema (create shape) */
export const jobApplicationInsertSchema = z.object(jobApplications).extend({
  ...commonOverrides,
  // fix empty string issue & enforce uuid if present
  mediaId: emptyToNull(z.string().uuid()).optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  submittedAt: true,
  organizationId: true, // you'll likely set this server-side
  userId: true, // set from auth context
  roundNo: true, // default(1) – set/compute server-side if needed
  status: true, // default('submitted') – set server-side if you want to override
  adminAction: true, // only admins can set this
});

/** UPDATE schema (patch shape) */
export const jobApplicationUpdateSchema = z.object(jobApplications).extend({
  ...commonOverrides,
  mediaId: emptyToNull(z.string().uuid()).optional(),
})
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
    submittedAt: true,
    jobId: true, // don't allow job swap in a patch by default
    roundNo: true, // immutable via this schema
    adminAction: true, // only admins can update this
  })
  .partial();

/** ADMIN UPDATE schema (allows admin to update adminAction) */
export const jobApplicationAdminUpdateSchema = z.object(jobApplications).extend({
  ...commonOverrides,
  mediaId: emptyToNull(z.string().uuid()).optional(),
})
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
    submittedAt: true,
    jobId: true, // don't allow job swap in a patch by default
    roundNo: true, // immutable via this schema
  })
  .partial();

export type JobApplication = z.infer<typeof jobApplication>;
export type JobApplicationInsert = z.infer<typeof jobApplicationInsertSchema>;
export type JobApplicationUpdate = z.infer<typeof jobApplicationUpdateSchema>;
export type JobApplicationAdminUpdate = z.infer<typeof jobApplicationAdminUpdateSchema>;

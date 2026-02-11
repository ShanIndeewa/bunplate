import { sql } from "drizzle-orm";
import {
    index,
    integer,
    jsonb,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    varchar,
} from "drizzle-orm/pg-core";

import { organization, user } from "./auth.schema";
import { jobs } from "./job.schema";
import { media } from "./media.schema";

export const applicationStatusEnum = pgEnum("application_status", [
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

export const adminActionEnum = pgEnum("admin_action", [
  "admin_only",
  "access_company",
]);

export const jobApplications = pgTable(
  "job_applications",
  {
    // PK
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    // FKs
    organizationId: text("organization_id").references(() => organization.id),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    jobId: text("job_id")
      .notNull()
      .references(() => jobs.id, { onDelete: "cascade" }),

    // Re-apply flow: increment per (jobId, userId)
    roundNo: integer("round_no").notNull().default(1),

    // Status & resume/media
    status: applicationStatusEnum("status").notNull().default("submitted"),
    adminAction: adminActionEnum("admin_action").notNull().default("access_company"),
    mediaId: text("resume_id").references(() => media.id, {
      onDelete: "set null",
    }),

    // Applicant-provided details
    applicantProfile: jsonb("applicant_profile").$type<{
      fullName?: string;
      email?: string;
      phone?: string;
      address?: string;
      linkedin?: string;
      portfolio?: string;
    }>(),
    coverLetterText: text("cover_letter_text"),

    // Optional metadata
    source: varchar("source", { length: 64 }),
    referralCode: varchar("referral_code", { length: 64 }),
    tags: jsonb("tags"),

    // Timestamps
    submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    // One submission per (job, user, round)
    jobUserRoundUq: uniqueIndex("job_applications_job_user_round_uq").on(
      t.jobId,
      t.userId,
      t.roundNo
    ),
    jobIdx: index("job_applications_job_idx").on(t.jobId),
    userIdx: index("job_applications_user_idx").on(t.userId),
  })
);

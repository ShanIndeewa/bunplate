import { sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";
import {
  applicationStatusEnum,
  jobApplications,
} from "./jobApplications.schema";

/** --- Reviews (zero or more rows per application) --- */
export const jobApplicationReviews = pgTable(
  "job_application_reviews",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    applicationId: text("application_id")
      .notNull()
      .references(() => jobApplications.id, { onDelete: "cascade" }),

    status: applicationStatusEnum("status").notNull().default("under_review"),

    reviewerId: text("reviewer_id").references(() => user.id, {
      onDelete: "set null",
    }),

    rating: integer("rating"),
    comments: text("comments"),

    attachments: jsonb("attachments"),

    interviewAt: timestamp("interview_at", { withTimezone: true }),
    interviewLocation: varchar("interview_location", { length: 256 }),
    meetingLink: varchar("meeting_link", { length: 512 }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => ({
    applicationIdx: index("job_application_reviews_app_idx").on(
      t.applicationId
    ),
    reviewerIdx: index("job_application_reviews_reviewer_idx").on(t.reviewerId),
  })
);

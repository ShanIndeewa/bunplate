import { sql } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { organization, user } from "./auth.schema"; // assuming you have a users table
import { jobs } from "./job.schema"; // jobs are stored in "rooms" table

// ✅ Enum for job status
export const jobStatusEnum = pgEnum("job_status", ["live", "expired"]);

export const jobWishlist = pgTable(
  "jobWishlist",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    userId: text("user_id")
      .notNull()
      .references(() => user.id), // user who added the job

    jobId: text("job_id")
      .notNull()
      .references(() => jobs.id), // job added to wishlist

    organizationId: text("organization_id").references(() => organization.id), // company that owns the job

    // ✅ Track job status: live or expired
    jobStatus: jobStatusEnum("job_status").default("live").notNull(),

    // ✅ Track if user applied for this job
    isApplied: boolean("is_applied").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow(), // when it was added
    updatedAt: timestamp("updated_at").defaultNow(), // last update
  },
  (table) => ({
    // ✅ prevent duplicate entries (same user, same job)
    userJobUnique: uniqueIndex("user_job_unique").on(table.userId, table.jobId),
  })
);

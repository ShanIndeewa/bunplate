import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";
import { companies } from "./company.schema";
import { jobCategory } from "./job-category.schema";

// Enums
export const jobsTypeEnum = pgEnum("jobs_type", [
  "full_time",
  "part_time",
  "contract",
  "internship",
]);

export const jobsStatusEnum = pgEnum("jobs_status", [
  "open",
  "closed",
  "paused",
]);

// Jobs table
export const jobs = pgTable(
  "jobs",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    companyId: text("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    jobCategoryId: text("job_category_id").references(() => jobCategory.id, {
      onDelete: "set null",
    }),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    location: varchar("location", { length: 255 }),
    type: jobsTypeEnum("type").notNull(),
    salaryMin: numeric("salary_min", { precision: 10, scale: 2 }),
    salaryMax: numeric("salary_max", { precision: 10, scale: 2 }),
    experienceRequired: varchar("experience_required", { length: 100 }),
    skills: jsonb("skills"),
    numberOfVacancies: integer("number_of_vacancies").default(1).notNull(),
    status: jobsStatusEnum("status")
      .default(sql`'open'::jobs_status`)
      .notNull(),
    isRemote: boolean("is_remote").default(false).notNull(),
    postedAt: timestamp("posted_at")
      .default(sql`now()`)
      .notNull(),
    closingDate: timestamp("closing_date"),
    ...timestamps,
  },
  (table) => [index("jobs_company_idx").on(table.companyId)]
);

// Relations
export const jobsRelations = relations(jobs, ({ one }) => ({
  company: one(companies, {
    fields: [jobs.companyId],
    references: [companies.id],
  }),
  jobCategory: one(jobCategory, {
    fields: [jobs.jobCategoryId],
    references: [jobCategory.id],
  }),
}));

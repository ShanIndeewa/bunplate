import { sql } from "drizzle-orm";
import { date, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { organization, user } from "./auth.schema";

export const userEducations = pgTable("userEducation", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  organizationId: text("organization_id").references(() => organization.id),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  institutionName: varchar("institution_name", { length: 255 }).notNull(),
  degree: varchar("degree", { length: 255 }),
  fieldOfStudy: varchar("field_of_study", { length: 255 }),
  startDate: date("start_date"),
  endDate: date("end_date"),
  grade: varchar("grade", { length: 50 }),
  description: text("description"),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// title: varchar("title", { length: 255 }),
// companyName: varchar("company_name", { length: 255 }),
// employmentType: varchar("employment_type", { length: 50 }),
// startDate: date("start_date"),
// endDate: date("end_date"),
// isCurrent: boolean("is_current").default(false),
// description: text("description"),
// updatedAt: timestamp("updated_at").defaultNow(),
// createdAt: timestamp("created_at").defaultNow(),

// userId: text("user_id")
//   .references(() => user.id)
//   .notNull(),
// firstName: varchar("first_name", { length: 255 }).notNull(),
// lastName: varchar("last_name", { length: 255 }).notNull(),
// currentPosition: varchar("current_position", { length: 255 }),
// DOB: varchar("Date_of_birth", { length: 255 }),
// currentWorkplace: varchar("currentWorkplace", { length: 255 }),
// description: text("description"),
// additionalInfo: text("additional_info"),
// tagline: varchar("tagline", { length: 255 }),
// headline: varchar("headline", { length: 255 }),
// about: text("about"),
// location: varchar("location", { length: 255 }),
// profilePhotoUrl: varchar("profile_photo_url", { length: 500 }),
// bannerPhotoUrl: varchar("banner_photo_url", { length: 500 }),
// website: varchar("website", { length: 255 }),
// linkedinUrl: varchar("linkedin_url", { length: 255 }),
// githubUrl: varchar("github_url", { length: 255 }),
// portfolioUrl: varchar("portfolio_url", { length: 255 }),
// updatedAt: timestamp("updated_at").defaultNow(),
// createdAt: timestamp("created_at").defaultNow(),

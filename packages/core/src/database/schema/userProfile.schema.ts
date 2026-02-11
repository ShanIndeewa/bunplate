import { sql } from "drizzle-orm";
import { date, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { organization, user } from "./auth.schema";

export const userProfiles = pgTable("userProfile", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  organizationId: text("organization_id").references(() => organization.id),

  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }),
  currentPosition: varchar("current_position", { length: 255 }),
  DOB: date("Date_of_birth"),
  currentWorkplace: varchar("currentWorkplace", { length: 255 }),
  description: text("description"),
  additionalInfo: text("additional_info"),
  tagline: varchar("tagline", { length: 255 }),
  headline: varchar("headline", { length: 255 }),
  about: text("about"),
  location: varchar("location", { length: 255 }),
  profilePhotoUrl: varchar("profile_photo_url", { length: 500 }),
  bannerPhotoUrl: varchar("banner_photo_url", { length: 500 }),
  website: varchar("website", { length: 255 }),
  linkedinUrl: varchar("linkedin_url", { length: 255 }),
  githubUrl: varchar("github_url", { length: 255 }),
  portfolioUrl: varchar("portfolio_url", { length: 255 }),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

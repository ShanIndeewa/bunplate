import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const ad = pgTable("ad", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`), 

  userId: text("user_id")
    .references(() => user.id)
    .notNull(),

  // General Info
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url"),

  // Ad Meta
  category: varchar("category", { length: 100 }), // e.g. "Jobs", "Events"
  externalLink: text("external_link"),
  placement: varchar("placement", { length: 50 }).notNull(), // e.g. "homepage_top"
  adSize: varchar("ad_size", { length: 50 }).notNull(), // e.g. "300x250"

  // Scheduling
  isActive: boolean("is_active").default(true).notNull(),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),

  // Stats
  viewCount: integer("view_count").default(0).notNull(),
  clickCount: integer("click_count").default(0).notNull(),

  // Extra metadata (future-proof)
  metadata: jsonb("metadata").default({}),

  // Audit
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

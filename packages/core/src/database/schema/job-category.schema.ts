import { sql } from "drizzle-orm";
import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";
import { user } from "./auth.schema";

export const jobCategoryTypeEnum = pgEnum("job_category_type", [
  "Technology",
  "Design",
  "Marketing",
  "Healthcare",
  "Education",
  "Finance",
  "Hospitality",
  "Transportation",
  "Retail",
  "Engineering"
]);

export const jobCategory = pgTable("job_category", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .references(() => user.id)
    .notNull(),
  keyword: text("keyword").notNull(),
  description: text("description"),
  type: jobCategoryTypeEnum("type").notNull(),
  ...timestamps,
});

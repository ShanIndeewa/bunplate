import { sql } from "drizzle-orm";
import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "./helpers";
import { user } from "./auth.schema";

export const mediaTypeEnum = pgEnum("media_type", [
  "image",
  "video",
  "audio",
  "document"
]);

export const media = pgTable("media", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  url: text("url"),
  type: mediaTypeEnum("type"),
  filename: text("filename"),
  size: integer("size"),

  uploadedBy: text("uploaded_by").references(() => user.id, {
    onDelete: "set null"
  }),

  ...timestamps
});

import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const bulkMessage = pgTable("bulk_message", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  note: text("note").notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
  whatsappNumber: varchar("whatsapp_number", { length: 20 }).notNull(),
  status: text("status")
    .notNull()
    .$type<"pending" | "sent" | "failed">()
    .default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});


import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { bulkMessage } from "@repo/database";

export const bulkMessageSchema = createSelectSchema(bulkMessage);

export const bulkMessageInsertSchema = createInsertSchema(bulkMessage).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  status: true,
  userId: true, // userId will be added from session
});

export const bulkMessageUpdateSchema = createInsertSchema(bulkMessage)
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type bulkMessageUpdateType = z.infer<typeof bulkMessageUpdateSchema>;
export type bulkMessage = z.infer<typeof bulkMessageSchema>;
export type bulkMessageInsertType = z.infer<typeof bulkMessageInsertSchema>;


import { z } from "zod";

import { bulkMessage } from "../database/schema/bulk-message.schema";

export const bulkMessageSchema = z.object(bulkMessage);

export const bulkMessageInsertSchema = z.object(bulkMessage).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  status: true,
  userId: true, // userId will be added from session
});

export const bulkMessageUpdateSchema = z.object(bulkMessage)
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

// Bulk import schema
export const bulkMessageBulkImportSchema = z.object({
  records: z.array(
    z.object({
      note: z.string().min(1, "Note is required"),
      phoneNumber: z.string().min(1, "Phone number is required"),
      whatsappNumber: z.string().min(1, "WhatsApp number is required"),
    })
  ).min(1, "At least one record is required"),
});

export type bulkMessageUpdateType = z.infer<typeof bulkMessageUpdateSchema>;
export type bulkMessage = z.infer<typeof bulkMessageSchema>;
export type bulkMessageInsertType = z.infer<typeof bulkMessageInsertSchema>;
export type bulkMessageBulkImportType = z.infer<typeof bulkMessageBulkImportSchema>;

import { z } from "zod";

/* ======================================================
   Base Schema (manual, NOT drizzle table)
====================================================== */

export const bulkMessageSchema = z.object({
  id: z.string(),

  userId: z.string(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),

  status: z.enum(["pending", "sent", "failed"]),

  note: z.string(),

  phoneNumber: z.string(),

  whatsappNumber: z.string(),
});

/* ======================================================
   Insert
====================================================== */

export const bulkMessageInsertSchema = bulkMessageSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  status: true,
  userId: true,
});

/* ======================================================
   Update
====================================================== */

export const bulkMessageUpdateSchema = bulkMessageInsertSchema
  .partial()
  .extend({
    status: z.enum(["pending", "sent", "failed"]).optional(),
  });

/* ======================================================
   Bulk Import
====================================================== */

export const bulkMessageBulkImportSchema = z.object({
  records: z
    .array(
      z.object({
        note: z.string().min(1, "Note is required"),
        phoneNumber: z.string().min(1, "Phone number is required"),
        whatsappNumber: z.string().min(1, "WhatsApp number is required"),
      })
    )
    .min(1, "At least one record is required"),
});

/* ======================================================
   TYPES (PascalCase only)
====================================================== */

export type BulkMessage = z.infer<typeof bulkMessageSchema>;
export type BulkMessageInsert = z.infer<typeof bulkMessageInsertSchema>;
export type BulkMessageUpdate = z.infer<typeof bulkMessageUpdateSchema>;
export type BulkMessageBulkImport = z.infer<typeof bulkMessageBulkImportSchema>;

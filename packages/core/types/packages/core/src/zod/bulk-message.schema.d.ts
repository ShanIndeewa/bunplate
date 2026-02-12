import { z } from "zod";
export declare const bulkMessageSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
    status: z.ZodEnum<{
        pending: "pending";
        sent: "sent";
        failed: "failed";
    }>;
    note: z.ZodString;
    phoneNumber: z.ZodString;
    whatsappNumber: z.ZodString;
}, z.core.$strip>;
export declare const bulkMessageInsertSchema: z.ZodObject<{
    note: z.ZodString;
    phoneNumber: z.ZodString;
    whatsappNumber: z.ZodString;
}, z.core.$strip>;
export declare const bulkMessageUpdateSchema: z.ZodObject<{
    note: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
    whatsappNumber: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        sent: "sent";
        failed: "failed";
    }>>;
}, z.core.$strip>;
export declare const bulkMessageBulkImportSchema: z.ZodObject<{
    records: z.ZodArray<z.ZodObject<{
        note: z.ZodString;
        phoneNumber: z.ZodString;
        whatsappNumber: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type BulkMessage = z.infer<typeof bulkMessageSchema>;
export type BulkMessageInsert = z.infer<typeof bulkMessageInsertSchema>;
export type BulkMessageUpdate = z.infer<typeof bulkMessageUpdateSchema>;
export type BulkMessageBulkImport = z.infer<typeof bulkMessageBulkImportSchema>;

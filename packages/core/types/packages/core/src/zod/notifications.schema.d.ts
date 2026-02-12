import { z } from "zod";
export declare const notificationTypeSchema: z.ZodEnum<{
    pending: "pending";
    approved: "approved";
}>;
export declare const notificationsSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodNullable<z.ZodString>;
    title: z.ZodString;
    message: z.ZodString;
    metadata: z.ZodNullable<z.ZodString>;
    notificationType: z.ZodEnum<{
        pending: "pending";
        approved: "approved";
    }>;
    recipientType: z.ZodString;
    recipientId: z.ZodNullable<z.ZodString>;
    readAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export declare const notificationsInsertSchema: z.ZodObject<{
    metadata: z.ZodNullable<z.ZodString>;
    title: z.ZodString;
    message: z.ZodString;
    notificationType: z.ZodEnum<{
        pending: "pending";
        approved: "approved";
    }>;
    recipientType: z.ZodString;
    readAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const notificationsUpdateSchema: z.ZodObject<{
    metadata: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodOptional<z.ZodString>;
    message: z.ZodOptional<z.ZodString>;
    notificationType: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        approved: "approved";
    }>>;
    recipientType: z.ZodOptional<z.ZodString>;
    readAt: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
}, z.core.$strip>;
export type NotificationsUpdateType = z.infer<typeof notificationsUpdateSchema>;
export type Notifications = z.infer<typeof notificationsSchema>;
export type NotificationsInsertType = z.infer<typeof notificationsInsertSchema>;

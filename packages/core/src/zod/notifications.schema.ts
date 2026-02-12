import { z } from "zod";

export const notificationTypeSchema = z.enum(["pending", "approved"]);

export const notificationsSchema = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  title: z.string(),
  message: z.string(),
  metadata: z.string().nullable(),
  notificationType: notificationTypeSchema,
  recipientType: z.string(),
  recipientId: z.string().nullable(),
  readAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const notificationsInsertSchema = notificationsSchema.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  organizationId: true,
  recipientId: true,
});

export const notificationsUpdateSchema = notificationsSchema
  .omit({
    id: true,
    organizationId: true,
    createdAt: true,
    updatedAt: true,
    recipientId: true,
  })
  .partial();

export type NotificationsUpdateType = z.infer<typeof notificationsUpdateSchema>;
export type Notifications = z.infer<typeof notificationsSchema>;
export type NotificationsInsertType = z.infer<typeof notificationsInsertSchema>;

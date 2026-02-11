
import { z } from "zod";

import { notifications } from "../database/schema/notifications.schema";

export const notificationsSchema = z.object(notifications);

export const notificationsInsertSchema = z.object(notifications).omit(
  {
    id: true,
    updatedAt: true,
    createdAt: true,
    organizationId: true,
    recipientId: true,
  }
);

export const notificationsUpdateSchema = z.object(notifications)
  .omit({
    id: true,
    organizationId: true,
    createdAt: true,
    updatedAt: true,
    recipientId: true,
  })
  .partial();

export type notificationsUpdateType = z.infer<typeof notificationsUpdateSchema>;
export type notifications = z.infer<typeof notificationsSchema>;
export type notificationsInsertType = z.infer<typeof notificationsInsertSchema>;

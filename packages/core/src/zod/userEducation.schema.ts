
import { z } from "zod";

import { userEducations } from "../database/schema/userEducation.schema";

export const userEducation = z.object(userEducations);

export const userEducationInsertSchema = z.object(
  userEducations
).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  organizationId: true,
  userId: true,
});

export const userEducationUpdateSchema = z.object(userEducations)
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type userEducationUpdateType = z.infer<typeof userEducationUpdateSchema>;
export type userEducation = z.infer<typeof userEducation>;
export type userEducationInsertType = z.infer<typeof userEducationInsertSchema>;

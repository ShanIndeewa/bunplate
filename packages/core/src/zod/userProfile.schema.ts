
import { z } from "zod";

import { userProfiles } from "../database/schema/userProfile.schema";

export const userProfile = z.object(userProfiles);

export const userProfileInsertSchema = z.object(userProfiles).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  organizationId: true,
  userId: true,
});

export const userProfileUpdateSchema = z.object(userProfiles)
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type userProfileUpdateType = z.infer<typeof userProfileUpdateSchema>;
export type userProfile = z.infer<typeof userProfile>;
export type userProfileInsertType = z.infer<typeof userProfileInsertSchema>;

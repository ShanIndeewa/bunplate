
import { z } from "zod";

import { userProjects } from "../database/schema/userProjects.schema";

export const userProject = z.object(userProjects);

export const userProjectInsertSchema = z.object(userProjects).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  organizationId: true,
  userId: true,
});

export const userProjectUpdateSchema = z.object(userProjects)
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type userProjectUpdateType = z.infer<typeof userProjectUpdateSchema>;
export type userProject = z.infer<typeof userProject>;
export type userProjectInsertType = z.infer<typeof userProjectInsertSchema>;

import { z } from "zod";

export const userProject = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  userId: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  projectUrl: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  updatedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
});

export const userProjectInsertSchema = userProject.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  organizationId: true,
  userId: true,
});

export const userProjectUpdateSchema = userProject
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type UserProjectUpdateType = z.infer<typeof userProjectUpdateSchema>;
export type UserProject = z.infer<typeof userProject>;
export type UserProjectInsertType = z.infer<typeof userProjectInsertSchema>;

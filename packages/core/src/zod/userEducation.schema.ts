import { z } from "zod";

export const userEducation = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  userId: z.string(),
  institutionName: z.string(),
  degree: z.string().nullable(),
  fieldOfStudy: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  grade: z.string().nullable(),
  description: z.string().nullable(),
  updatedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
});

export const userEducationInsertSchema = userEducation.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  organizationId: true,
  userId: true,
});

export const userEducationUpdateSchema = userEducation
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type UserEducationUpdateType = z.infer<typeof userEducationUpdateSchema>;
export type UserEducation = z.infer<typeof userEducation>;
export type UserEducationInsertType = z.infer<typeof userEducationInsertSchema>;

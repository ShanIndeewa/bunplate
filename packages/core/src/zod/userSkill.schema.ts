import { z } from "zod";

export const userSkill = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  userId: z.string(),
  skillName: z.string(),
  proficiency: z.string().nullable(),
  updatedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
});

export const userSkillInsertSchema = userSkill.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  organizationId: true,
  userId: true,
});

export const userSkillUpdateSchema = userSkill
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type UserSkillUpdateType = z.infer<typeof userSkillUpdateSchema>;
export type UserSkill = z.infer<typeof userSkill>;
export type UserSkillInsertType = z.infer<typeof userSkillInsertSchema>;

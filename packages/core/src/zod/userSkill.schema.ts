
import { z } from "zod";

import { userSkills } from "../database/schema/userSkill.schema";

export const userSkill = z.object(userSkills);

export const userSkillInsertSchema = z.object(userSkills).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  organizationId: true,
  userId: true,
});

export const userSkillUpdateSchema = z.object(userSkills)
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type userSkillUpdateType = z.infer<typeof userSkillUpdateSchema>;
export type userSkill = z.infer<typeof userSkill>;
export type userSkillInsertType = z.infer<typeof userSkillInsertSchema>;

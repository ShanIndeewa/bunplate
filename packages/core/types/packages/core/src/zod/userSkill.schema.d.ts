import { z } from "zod";
export declare const userSkill: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodNullable<z.ZodString>;
    userId: z.ZodString;
    skillName: z.ZodString;
    proficiency: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const userSkillInsertSchema: z.ZodObject<{
    skillName: z.ZodString;
    proficiency: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const userSkillUpdateSchema: z.ZodObject<{
    skillName: z.ZodOptional<z.ZodString>;
    proficiency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type UserSkillUpdateType = z.infer<typeof userSkillUpdateSchema>;
export type UserSkill = z.infer<typeof userSkill>;
export type UserSkillInsertType = z.infer<typeof userSkillInsertSchema>;

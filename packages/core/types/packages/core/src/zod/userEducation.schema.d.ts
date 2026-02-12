import { z } from "zod";
export declare const userEducation: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodNullable<z.ZodString>;
    userId: z.ZodString;
    institutionName: z.ZodString;
    degree: z.ZodNullable<z.ZodString>;
    fieldOfStudy: z.ZodNullable<z.ZodString>;
    startDate: z.ZodNullable<z.ZodString>;
    endDate: z.ZodNullable<z.ZodString>;
    grade: z.ZodNullable<z.ZodString>;
    description: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const userEducationInsertSchema: z.ZodObject<{
    description: z.ZodNullable<z.ZodString>;
    startDate: z.ZodNullable<z.ZodString>;
    endDate: z.ZodNullable<z.ZodString>;
    institutionName: z.ZodString;
    degree: z.ZodNullable<z.ZodString>;
    fieldOfStudy: z.ZodNullable<z.ZodString>;
    grade: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const userEducationUpdateSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    startDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    institutionName: z.ZodOptional<z.ZodString>;
    degree: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fieldOfStudy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    grade: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type UserEducationUpdateType = z.infer<typeof userEducationUpdateSchema>;
export type UserEducation = z.infer<typeof userEducation>;
export type UserEducationInsertType = z.infer<typeof userEducationInsertSchema>;

import { z } from "zod";
export declare const userProject: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodNullable<z.ZodString>;
    userId: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    projectUrl: z.ZodNullable<z.ZodString>;
    startDate: z.ZodNullable<z.ZodString>;
    endDate: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const userProjectInsertSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    startDate: z.ZodNullable<z.ZodString>;
    endDate: z.ZodNullable<z.ZodString>;
    projectUrl: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const userProjectUpdateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    startDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    projectUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type UserProjectUpdateType = z.infer<typeof userProjectUpdateSchema>;
export type UserProject = z.infer<typeof userProject>;
export type UserProjectInsertType = z.infer<typeof userProjectInsertSchema>;

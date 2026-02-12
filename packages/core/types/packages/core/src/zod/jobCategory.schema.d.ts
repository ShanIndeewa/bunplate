import { z } from "zod";
export declare const jobCategoryTypeSchema: z.ZodEnum<{
    Technology: "Technology";
    Design: "Design";
    Marketing: "Marketing";
    Healthcare: "Healthcare";
    Education: "Education";
    Finance: "Finance";
    Hospitality: "Hospitality";
    Transportation: "Transportation";
    Retail: "Retail";
    Engineering: "Engineering";
}>;
export declare const jobCategorySelectSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    keyword: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<{
        Technology: "Technology";
        Design: "Design";
        Marketing: "Marketing";
        Healthcare: "Healthcare";
        Education: "Education";
        Finance: "Finance";
        Hospitality: "Hospitality";
        Transportation: "Transportation";
        Retail: "Retail";
        Engineering: "Engineering";
    }>;
    createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const jobCategoryInsertSchema: z.ZodObject<{
    description: z.ZodNullable<z.ZodString>;
    keyword: z.ZodString;
    type: z.ZodEnum<{
        Technology: "Technology";
        Design: "Design";
        Marketing: "Marketing";
        Healthcare: "Healthcare";
        Education: "Education";
        Finance: "Finance";
        Hospitality: "Hospitality";
        Transportation: "Transportation";
        Retail: "Retail";
        Engineering: "Engineering";
    }>;
}, z.core.$strip>;
export declare const jobCategoryUpdateSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    keyword: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        Technology: "Technology";
        Design: "Design";
        Marketing: "Marketing";
        Healthcare: "Healthcare";
        Education: "Education";
        Finance: "Finance";
        Hospitality: "Hospitality";
        Transportation: "Transportation";
        Retail: "Retail";
        Engineering: "Engineering";
    }>>;
}, z.core.$strip>;
export type JobCategory = z.infer<typeof jobCategorySelectSchema>;
export type JobCategoryInsert = z.infer<typeof jobCategoryInsertSchema>;
export type JobCategoryUpdate = z.infer<typeof jobCategoryUpdateSchema>;

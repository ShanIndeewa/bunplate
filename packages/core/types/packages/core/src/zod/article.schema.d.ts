import { z } from "zod";
export declare const articleSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodNullable<z.ZodString>;
    slug: z.ZodNullable<z.ZodString>;
    excerpt: z.ZodNullable<z.ZodString>;
    featuredImage: z.ZodNullable<z.ZodString>;
    userId: z.ZodString;
    organizationId: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const articleInsertSchema: z.ZodObject<{
    slug: z.ZodNullable<z.ZodString>;
    title: z.ZodString;
    excerpt: z.ZodNullable<z.ZodString>;
    content: z.ZodNullable<z.ZodString>;
    featuredImage: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
export declare const articleUpdateSchema: z.ZodObject<{
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    content: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    featuredImage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type Article = z.infer<typeof articleSchema>;
export type ArticleInsertType = z.infer<typeof articleInsertSchema>;
export type ArticleUpdateType = z.infer<typeof articleUpdateSchema>;

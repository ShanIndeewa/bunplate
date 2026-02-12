import { z } from "zod";
export declare const jobStatusSchema: z.ZodEnum<{
    live: "live";
    expired: "expired";
}>;
export declare const jobWishlistSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    jobId: z.ZodString;
    organizationId: z.ZodNullable<z.ZodString>;
    jobStatus: z.ZodEnum<{
        live: "live";
        expired: "expired";
    }>;
    isApplied: z.ZodBoolean;
    createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export declare const jobWishlistInsertSchema: z.ZodObject<{
    updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    organizationId: z.ZodNullable<z.ZodString>;
    jobId: z.ZodString;
}, z.core.$strip>;
export declare const jobWishlistUpdateSchema: z.ZodObject<{
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    jobStatus: z.ZodOptional<z.ZodEnum<{
        live: "live";
        expired: "expired";
    }>>;
    isApplied: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type JobWishlist = z.infer<typeof jobWishlistSchema>;
export type JobWishlistInsertType = z.infer<typeof jobWishlistInsertSchema>;
export type JobWishlistUpdateType = z.infer<typeof jobWishlistUpdateSchema>;

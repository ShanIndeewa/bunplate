import { z } from "zod";
export declare const wishlistSchema: z.ZodObject<{
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
export declare const wishlistInsertSchema: z.ZodObject<{
    organizationId: z.ZodNullable<z.ZodString>;
    jobId: z.ZodString;
    jobStatus: z.ZodEnum<{
        live: "live";
        expired: "expired";
    }>;
    isApplied: z.ZodBoolean;
}, z.core.$strip>;
export declare const wishlistUpdateSchema: z.ZodObject<{
    organizationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    jobId: z.ZodOptional<z.ZodString>;
    jobStatus: z.ZodOptional<z.ZodEnum<{
        live: "live";
        expired: "expired";
    }>>;
    isApplied: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type Wishlist = z.infer<typeof wishlistSchema>;
export type WishlistInsertType = z.infer<typeof wishlistInsertSchema>;
export type WishlistUpdateType = z.infer<typeof wishlistUpdateSchema>;

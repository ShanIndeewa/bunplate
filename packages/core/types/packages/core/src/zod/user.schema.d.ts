import { z } from "zod";
export declare const userSelectSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    emailVerified: z.ZodBoolean;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
    role: z.ZodNullable<z.ZodString>;
    banned: z.ZodNullable<z.ZodBoolean>;
    banReason: z.ZodNullable<z.ZodString>;
    banExpires: z.ZodNullable<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type User = z.infer<typeof userSelectSchema>;

import { z } from "zod";
export declare const checkUserTypeSchema: z.ZodObject<{
    userType: z.ZodEnum<{
        user: "user";
        companyOwner: "companyOwner";
        systemAdmin: "systemAdmin";
    }>;
}, z.core.$strip>;

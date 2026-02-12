import { z } from "zod";
export declare const mediaTypeSchema: z.ZodEnum<{
    image: "image";
    video: "video";
    audio: "audio";
    document: "document";
}>;
export type MediaType = z.infer<typeof mediaTypeSchema>;
export declare const mediaSchema: z.ZodObject<{
    id: z.ZodString;
    url: z.ZodString;
    type: z.ZodEnum<{
        image: "image";
        video: "video";
        audio: "audio";
        document: "document";
    }>;
    filename: z.ZodString;
    size: z.ZodNumber;
    uploadedBy: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodNullable<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type Media = z.infer<typeof mediaSchema>;
export declare const mediaUploadSchema: z.ZodObject<{
    type: z.ZodEnum<{
        image: "image";
        video: "video";
        audio: "audio";
        document: "document";
    }>;
    url: z.ZodString;
    filename: z.ZodString;
    size: z.ZodNumber;
}, z.core.$strip>;
export type MediaUploadType = z.infer<typeof mediaUploadSchema>;
export declare const mediaUpdateSchema: z.ZodObject<{
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    url: z.ZodOptional<z.ZodString>;
    filename: z.ZodOptional<z.ZodString>;
    size: z.ZodOptional<z.ZodNumber>;
    uploadedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type MediaUpdateType = z.infer<typeof mediaUpdateSchema>;

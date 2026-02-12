import { z } from "zod";

export const mediaTypeSchema = z.enum(["image", "video", "audio", "document"]);

export type MediaType = z.infer<typeof mediaTypeSchema>;

export const mediaSchema = z.object({
  id: z.string(),
  url: z.string(),
  type: mediaTypeSchema,
  filename: z.string(),
  size: z.number(),
  uploadedBy: z.string().nullable(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

export type Media = z.infer<typeof mediaSchema>;

export const mediaUploadSchema = mediaSchema.omit({
  id: true,
  uploadedBy: true,
  createdAt: true,
  updatedAt: true,
});

export type MediaUploadType = z.infer<typeof mediaUploadSchema>;

export const mediaUpdateSchema = mediaSchema
  .omit({
    id: true,
    createdAt: true,
    type: true,
  })
  .partial();

export type MediaUpdateType = z.infer<typeof mediaUpdateSchema>;

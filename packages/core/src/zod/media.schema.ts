
import { z } from "zod";

import { media, mediaTypeEnum } from "../database/schema/media.schema";

export const mediaTypeSchema = z.object(mediaTypeEnum);

export type MediaType = z.infer<typeof mediaTypeSchema>;

export const mediaSchema = z.object(media);

export type Media = z.infer<typeof mediaSchema>;

export const mediaUploadSchema = z.object(media).omit({
  id: true,
  uploadedBy: true,
  createdAt: true,
  updatedAt: true
});

export type MediaUploadType = z.infer<typeof mediaUploadSchema>;

export const mediaUpdateSchema = z.object(media)
  .omit({
    id: true,
    createdAt: true,
    type: true
  })
  .partial();

export type MediaUpdateType = z.infer<typeof mediaUpdateSchema>;

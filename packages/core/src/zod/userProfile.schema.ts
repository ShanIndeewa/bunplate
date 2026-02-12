import { z } from "zod";

export const userProfile = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  userId: z.string(),
  firstName: z.string(),
  lastName: z.string().nullable(),
  currentPosition: z.string().nullable(),
  DOB: z.string().nullable(),
  currentWorkplace: z.string().nullable(),
  description: z.string().nullable(),
  additionalInfo: z.string().nullable(),
  tagline: z.string().nullable(),
  headline: z.string().nullable(),
  about: z.string().nullable(),
  location: z.string().nullable(),
  profilePhotoUrl: z.string().nullable(),
  bannerPhotoUrl: z.string().nullable(),
  website: z.string().nullable(),
  linkedinUrl: z.string().nullable(),
  githubUrl: z.string().nullable(),
  portfolioUrl: z.string().nullable(),
  updatedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
});

export const userProfileInsertSchema = userProfile.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  organizationId: true,
  userId: true,
});

export const userProfileUpdateSchema = userProfile
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  })
  .partial();

export type UserProfileUpdateType = z.infer<typeof userProfileUpdateSchema>;
export type UserProfile = z.infer<typeof userProfile>;
export type UserProfileInsertType = z.infer<typeof userProfileInsertSchema>;

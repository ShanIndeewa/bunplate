import { z } from "zod";

export const userRecommendation = z.object({
  id: z.string(),
  organizationId: z.string().nullable(),
  userId: z.string(),
  recommenderUserId: z.string().nullable(),
  recommenderName: z.string(),
  recommenderTitle: z.string().nullable(),
  text: z.string().nullable(),
  updatedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date().nullable(),
});

export const userRecommendationInsertSchema = userRecommendation.omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  organizationId: true,
  userId: true,
  recommenderUserId: true,
});

export const userRecommendationUpdateSchema = userRecommendation
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
    recommenderUserId: true,
  })
  .partial();

export type UserRecommendationUpdate = z.infer<typeof userRecommendationUpdateSchema>;
export type UserRecommendation = z.infer<typeof userRecommendation>;
export type UserRecommendationInsert = z.infer<typeof userRecommendationInsertSchema>;

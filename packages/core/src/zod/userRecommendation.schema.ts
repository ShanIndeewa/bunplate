import { userRecommendations } from "../database/schema/userRecommendation.schema";

import { z } from "zod";

// DB -> TS type for selects
export const userRecommendation = z.object(userRecommendations);

// Insert schema (server will fill id/userId/orgId/timestamps)
export const userRecommendationInsertSchema = z.object(
  userRecommendations
).omit({
  id: true,
  updatedAt: true,
  createdAt: true,
  organizationId: true,
  userId: true,
  recommenderUserId: true,
});

// Partial update schema (server controls some fields)
export const userRecommendationUpdateSchema = z.object(
  userRecommendations
)
  .omit({
    id: true,
    organizationId: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
    recommenderUserId: true,
  })
  .partial();

export type UserRecommendationUpdate = z.infer<
  typeof userRecommendationUpdateSchema
>;
export type UserRecommendation = z.infer<typeof userRecommendation>;
export type UserRecommendationInsert = z.infer<
  typeof userRecommendationInsertSchema
>;

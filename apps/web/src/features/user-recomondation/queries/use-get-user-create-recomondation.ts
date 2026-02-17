// src/features/users/mutations/use-create-user-recommendation.ts
import { getClient } from "@/lib/rpc/client";
import { useMutation } from "@tanstack/react-query";

export interface CreateUserRecommendationInput {
  userId: string; // The user who receives the recommendation
  organizationId?: string; // optional
  recommenderUserId?: string; // optional, if the recommender has an account
  recommenderName: string;
  recommenderTitle?: string;
  text?: string; // the recommendation text
}

export const useCreateUserRecommendation = () => {
  return useMutation({
    mutationKey: ["create-user-recommendation"],
    mutationFn: async (data: CreateUserRecommendationInput) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.userrecommendation.$post({
        json: data,
      });

      if (!response.ok) {
        throw new Error("Failed to create user recommendation");
      }

      return response.json();
    },
  });
};

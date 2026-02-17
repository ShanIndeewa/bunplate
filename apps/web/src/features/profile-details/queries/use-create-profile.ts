import { getClient } from "@/lib/rpc/client";
import { useMutation } from "@tanstack/react-query";

export interface CreateUserProfileInput {
  userId: string;
  organizationId?: string;
  firstName: string;
  lastName?: string;
  currentPosition?: string;
  DOB?: string; // ISO format "YYYY-MM-DD"
  currentWorkplace?: string;
  description?: string;
  additionalInfo?: string;
  tagline?: string;
  headline?: string;
  about?: string;
  location?: string;
  profilePhotoUrl?: string;
  bannerPhotoUrl?: string;
  website?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  portfolioUrl?: string;
}

export const useCreateProfile = () => {
  return useMutation({
    mutationKey: ["create-user-profile"],
    mutationFn: async (data: CreateUserProfileInput) => {
      const rpcClient = await getClient();
      const response = await rpcClient.api.userprofile.$post({
        json: data,
      });

      if (!response.ok) {
        throw new Error("Failed to create user profile");
      }

      return response.json();
    },
  });
};

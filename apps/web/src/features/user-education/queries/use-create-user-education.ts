// src/features/userskills/mutations/use-create-user-education.ts
import { getClient } from "@/lib/rpc/client";
import { useMutation } from "@tanstack/react-query";

export interface CreateUserEducationInput {
  userId: string;
  organizationId?: string | null;
  institutionName: string;
  degree?: string | null;
  fieldOfStudy?: string | null;
  startDate?: string | null; // YYYY-MM-DD
  endDate?: string | null; // YYYY-MM-DD
  grade?: string | null;
  description?: string | null;
}

export const useCreateUserEducation = () => {
  return useMutation({
    mutationKey: ["create-user-education"],
    mutationFn: async (data: CreateUserEducationInput) => {
      const rpcClient = await getClient();
      const response = await rpcClient.api.usereducation.$post({
        json: data,
      });

      if (!response.ok) {
        throw new Error("Failed to create user education");
      }

      return response.json();
    },
  });
};

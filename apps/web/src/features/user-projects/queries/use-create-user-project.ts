import { getClient } from "@/lib/rpc/client";
import { useMutation } from "@tanstack/react-query";

export interface CreateUserProjectInput {
  userId: string;
  organizationId?: string;
  title: string;
  description?: string;
  projectUrl?: string;
  startDate?: string; // ISO format "YYYY-MM-DD"
  endDate?: string; // ISO format "YYYY-MM-DD"
}

export const useCreateUserProject = () => {
  return useMutation({
    mutationKey: ["create-user-project"],
    mutationFn: async (data: CreateUserProjectInput) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.userproject.$post({
        json: data,
      });

      if (!response.ok) {
        throw new Error("Failed to create user project");
      }

      return response.json();
    },
  });
};

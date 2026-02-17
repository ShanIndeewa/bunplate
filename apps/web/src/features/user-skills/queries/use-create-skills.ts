// src/features/userskills/mutations/use-create-user-skill.ts
import { getClient } from "@/lib/rpc/client";
import { useMutation } from "@tanstack/react-query";

export interface CreateUserSkillInput {
  userId: string;
  organizationId?: string;
  skillName: string;
  proficiency?: string;
}

export interface UserSkill {
  id: string;
  userId: string;
  organizationId?: string | null;
  skillName: string;
  proficiency?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Hook to create a new user skill
 */
export const useCreateUserSkill = () => {
  return useMutation<UserSkill, Error, CreateUserSkillInput>({
    mutationKey: ["create-user-skill"],
    mutationFn: async (data) => {
      const rpcClient = await getClient();
      const response = await rpcClient.api.userskill.$post({
        json: data,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to create user skill");
      }

      const json = await response.json();
      return json as UserSkill;
    },
  });
};

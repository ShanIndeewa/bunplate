// src/features/userskills/queries/use-get-user-skills.ts
import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface UserSkill {
  id: string;
  userId: string;
  organizationId?: string | null;
  skillName: string;
  proficiency?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

type Paginated<T> = { data: T[]; meta?: unknown };

/** Type guard for { data: T[] } */
function hasDataArray<T = unknown>(v: any): v is Paginated<T> {
  return v && typeof v === "object" && Array.isArray(v.data);
}

export const useGetUserSkills = () => {
  return useQuery<UserSkill[]>({
    queryKey: ["user-skills"],
    queryFn: async () => {
      const rpcClient = await getClient();
      const response = await rpcClient.api.userskill.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch user skills");
      }

      const json: unknown = await response.json();

      // ✅ Handle { data: [...] }
      if (hasDataArray<UserSkill>(json)) return json.data;

      // Fallbacks for other possible shapes
      if (Array.isArray(json)) return json as UserSkill[];
      if (Array.isArray((json as any)?.skills))
        return (json as any).skills as UserSkill[];
      if (json && typeof json === "object") return [json as UserSkill];

      return [];
    },
  });
};

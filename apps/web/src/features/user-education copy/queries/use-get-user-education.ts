import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface UserEducation {
  id: string;
  userId: string;
  organizationId?: string | null;
  institutionName: string;
  degree?: string | null;
  fieldOfStudy?: string | null;
  startDate?: string | null; // YYYY-MM-DD (drizzle date)
  endDate?: string | null; // YYYY-MM-DD
  grade?: string | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

type Paginated<T> = { data: T[]; meta?: unknown };

function hasDataArray<T = unknown>(v: any): v is Paginated<T> {
  return v && typeof v === "object" && Array.isArray(v.data);
}

export const useGetUserEducations = () => {
  return useQuery<UserEducation[]>({
    queryKey: ["user-educations"],
    queryFn: async () => {
      const rpcClient = await getClient();
      // Adjust this route to match your API (e.g. /api/usereducation)
      const response = await rpcClient.api.usereducation.$get();

      if (!response.ok) throw new Error("Failed to fetch user education");
      const json: unknown = await response.json();

      if (hasDataArray<UserEducation>(json)) return json.data;
      if (Array.isArray(json)) return json as UserEducation[];
      if (Array.isArray((json as any)?.educations))
        return (json as any).educations as UserEducation[];
      if (json && typeof json === "object") return [json as UserEducation];
      return [];
    },
  });
};

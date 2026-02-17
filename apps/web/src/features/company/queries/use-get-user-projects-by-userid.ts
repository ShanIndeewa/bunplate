import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface UserProject {
  id: string;
  userId: string;
  organizationId?: string | null;
  title: string;
  description?: string | null;
  projectUrl?: string | null;
  startDate?: string | null; // YYYY-MM-DD
  endDate?: string | null; // YYYY-MM-DD
  createdAt?: string | null;
  updatedAt?: string | null;
}

type Paginated<T> = { data: T[]; meta?: unknown };
const hasDataArray = <T>(v: any): v is Paginated<T> =>
  v && typeof v === "object" && Array.isArray(v.data);

export const useGetUserProjects = () => {
  return useQuery<UserProject[]>({
    queryKey: ["user-projects"],
    queryFn: async () => {
      const rpcClient = await getClient();
      // Adjust if your route differs (e.g., api/userprojects)
      const res = await rpcClient.api.userproject.$get();
      if (!res.ok) throw new Error("Failed to fetch user projects");

      const json: unknown = await res.json();
      if (hasDataArray<UserProject>(json)) return json.data;
      if (Array.isArray(json)) return json as UserProject[];
      if (Array.isArray((json as any)?.projects))
        return (json as any).projects as UserProject[];
      if (json && typeof json === "object") return [json as UserProject];
      return [];
    },
  });
};

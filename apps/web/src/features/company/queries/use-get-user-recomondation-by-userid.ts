import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface UserRecommendation {
  id: string;
  userId: string;
  organizationId?: string | null;
  recommenderUserId?: string | null;
  recommenderName: string;
  recommenderTitle?: string | null;
  text?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

type Paginated<T> = { data: T[]; meta?: unknown };
const hasDataArray = <T>(v: any): v is Paginated<T> =>
  v && typeof v === "object" && Array.isArray(v.data);

export const useGetUserRecommendations = () => {
  return useQuery<UserRecommendation[]>({
    queryKey: ["user-recommendations"],
    queryFn: async () => {
      const rpcClient = await getClient();
      // Adjust route if your API path differs
      const res = await rpcClient.api.userrecommendation.$get();
      if (!res.ok) throw new Error("Failed to fetch user recommendations");

      const json: unknown = await res.json();
      if (hasDataArray<UserRecommendation>(json)) return json.data;
      if (Array.isArray(json)) return json as UserRecommendation[];
      if (Array.isArray((json as any)?.recommendations))
        return (json as any).recommendations as UserRecommendation[];
      if (json && typeof json === "object") return [json as UserRecommendation];
      return [];
    },
  });
};

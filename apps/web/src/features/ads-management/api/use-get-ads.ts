import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

interface GetAdsParams {
  page?: number;
  limit?: number;
  sort?: "asc" | "desc";
  search?: string;
}

export const useGetAds = (params: GetAdsParams = {}) => {
  return useQuery({
    queryKey: ["ads", params],
    queryFn: async () => {
      const rpcClient = await getClient();

      const searchParams = new URLSearchParams();
      if (params.page) searchParams.set("page", params.page.toString());
      if (params.limit) searchParams.set("limit", params.limit.toString());
      if (params.sort) searchParams.set("sort", params.sort);
      if (params.search) searchParams.set("search", params.search);

      const response = await rpcClient.api.ads.$get({
        query: Object.fromEntries(searchParams),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch ads");
      }

      return response.json();
    },
  });
};



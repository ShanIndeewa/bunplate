import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyTypes = () => {
  const query = useQuery({
    queryKey: ["company-types"],
    queryFn: async () => {
      const rpcClient = await getClient();

      // Assuming you have an RPC route like /api/companies/types
      const response = await rpcClient.api.companies.types.$get({
        query: {},
      });

      if (!response.ok) {
        throw new Error("Failed to fetch company types");
      }

      const data = await response.json();
      return data;
    },
  });

  return query;
};

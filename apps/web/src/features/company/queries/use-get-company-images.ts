import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export const useGetCompanyImages = (companyId?: string) => {
  const query = useQuery({
    queryKey: ["companies", "images", companyId],
    queryFn: async () => {
      const rpcClient = await getClient();

      // Fetch current user's company if no companyId is provided
      let id = companyId;
      if (!id) {
        const myCompanyRes = await rpcClient.api.companies["my-company"].$get();
        if (!myCompanyRes.ok) {
          throw new Error("Failed to fetch my company");
        }
        const myCompany = await myCompanyRes.json();
        id = myCompany.id;
      }

      // Fetch company images
      const response = await rpcClient.api.companies[":id"].images.$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch company images");
      }

      const data = await response.json();
      return data;
    },
  });

  return query;
};

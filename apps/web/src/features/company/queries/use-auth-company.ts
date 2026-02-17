import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export const useUserCompany = () => {
  return useQuery({
    queryKey: ["user-company"],
    queryFn: async () => {
      const rpcClient = await getClient();

      const myCompanyRes = await rpcClient.api.companies["my-company"].$get({});

      if (!myCompanyRes.ok) {
        const errorData = await myCompanyRes.json();
        throw new Error(errorData.message || "Failed to fetch company");
      }

      const companyData = await myCompanyRes.json();

      return {
        company: companyData,
      };
    },
  });
};

import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";
import type { CompanyPolicy } from "../schemas/company.schema";

export const useGetCompanyPolicies = (companyId?: string) => {
  return useQuery<CompanyPolicy[]>({
    queryKey: ["companies", "policies", companyId],
    queryFn: async () => {
      const rpcClient = await getClient();
      let targetCompanyId = companyId;

      if (!targetCompanyId) {
        const myCompanyRes = await rpcClient.api.companies["my-company"].$get();
        if (!myCompanyRes.ok) throw new Error("Failed to fetch my company");
        const myCompany = await myCompanyRes.json();
        targetCompanyId = myCompany?.id;
      }

      if (!targetCompanyId) return [];

      const policiesRes = await rpcClient.api.companies[":id"].policies.$get({
        param: { id: targetCompanyId },
      });

      if (!policiesRes.ok) {
        const errorData = await policiesRes.json();
        throw new Error(
          errorData.message || "Failed to fetch company policies"
        );
      }

      const data = await policiesRes.json();
      return Array.isArray(data) ? data : [];
    },
    enabled: !!companyId || companyId === undefined,
  });
};

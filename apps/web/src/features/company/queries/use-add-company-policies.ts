import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";
import type { CompanyPolicy } from "../schemas/company.schema";

// Without companyId, will be added automatically
export type InsertCompanyPolicyTypeWithoutCompanyId = Omit<
  CompanyPolicy,
  "id" | "companyId" | "createdAt" | "updatedAt"
>;

export const useAddCompanyPolicies = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  return useMutation({
    mutationFn: async (policies: InsertCompanyPolicyTypeWithoutCompanyId[]) => {
      const rpcClient = await getClient();

      // fetch my company
      const myCompanyRes = await rpcClient.api.companies["my-company"].$get();
      if (!myCompanyRes.ok) throw new Error("Failed to fetch my company");
      const myCompany = await myCompanyRes.json();

      const preparedPolicies = policies.map((policy) => ({
        companyId: myCompany.id,
        policyType: policy.policyType,
        policyText: policy.policyText,
        effectiveDate: policy.effectiveDate,
        isActive: policy.isActive ?? true,
      }));

      const response = await rpcClient.api.companies.policies.$post({
        json: preparedPolicies,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create company policies"
        );
      }

      return await response.json(); // returns array of created policies
    },
    onMutate: () => {
      toast.loading("Creating company policies...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Company policies created successfully!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["companies", "policies"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create company policies", {
        id: toastId,
      });
    },
  });
};

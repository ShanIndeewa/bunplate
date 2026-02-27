import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { type z } from "zod";
import { companyInsertSchema } from "../schemas/company.schema";

// ✅ infer type from your insert schema
export type CompanyInsertType = z.infer<typeof companyInsertSchema>;

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: CompanyInsertType) => {
      const rpcClient = await getClient();

      // call POST /api/companies
      const response = await rpcClient.api.companies.$post({
        json: values,
      });

      if (!response.ok) {
        const errorData = await response.json() as any;
        // Handle 422 validation errors from the API
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const fieldErrors = errorData.errors
            .map((e: any) => `${e.path}: ${e.message}`)
            .join(", ");
          console.error("[create-company] Validation errors:", errorData.errors);
          throw new Error(`Validation failed — ${fieldErrors}`);
        }
        throw new Error(errorData.message || "Failed to create company");
      }

      const data = await response.json();
      return data;
    },
    onMutate: () => {
      toast.loading("Your company is being created...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Company created successfully!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create company", { id: toastId });
    },
  });

  return mutation;
};

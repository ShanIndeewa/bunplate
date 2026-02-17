import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";
import type { companyImageInsertSchema } from "../schemas/company.schema";

// InsertCompanyImageType without companyId
export type InsertCompanyImageTypeWithoutCompanyId = Omit<
  typeof companyImageInsertSchema._type,
  "companyId"
>;

export const useAddCompanyImages = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (images: InsertCompanyImageTypeWithoutCompanyId[]) => {
      const rpcClient = await getClient();

      // Fetch current user's company (similar to "my-company")
      const myCompanyRes = await rpcClient.api.companies["my-company"].$get();

      if (!myCompanyRes.ok) {
        throw new Error("Failed to fetch my company");
      }

      const myCompany = await myCompanyRes.json();

      // Attach companyId to each image
      const preparedImages = images.map((image) => ({
        ...image,
        companyId: myCompany.id,
      }));

      const response = await rpcClient.api.companies.images.$post({
        json: preparedImages,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to add new company images"
        );
      }

      const data = await response.json();
      return data;
    },
    onMutate: () => {
      toast.loading("Company images are uploading...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Company images uploaded successfully!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["companies", "images"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create company images", {
        id: toastId,
      });
    },
  });

  return mutation;
};

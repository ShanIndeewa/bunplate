import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";
import type { companyImageUpdateSchema } from "../schemas/company.schema";

// UpdateCompanyImageType without companyId
export type UpdateCompanyImageTypeWithoutCompanyId = Omit<
  typeof companyImageUpdateSchema._type,
  "companyId"
> & { id: string };

export const useUpdateCompanyImages = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (images: UpdateCompanyImageTypeWithoutCompanyId[]) => {
      const rpcClient = await getClient();

      // Fetch current user's company
      const myCompanyRes = await rpcClient.api.companies["my-company"].$get();
      if (!myCompanyRes.ok) {
        throw new Error("Failed to fetch my company");
      }

      const myCompany = await myCompanyRes.json();

      const preparedImages = images.map((image) => ({
        ...image,
        companyId: myCompany.id,
      }));

      // Update each image individually
      await Promise.all(
        preparedImages.map(async (image) => {
          const response = await rpcClient.api.companies.images[":id"].$put({
            param: { id: image.id! },
            json: image,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.message || "Failed to update company image"
            );
          }

          return response.json();
        })
      );

      return true;
    },
    onMutate: () => {
      toast.loading("Company images are updating...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Company images updated successfully!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["companies", "images"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update company images", {
        id: toastId,
      });
    },
  });

  return mutation;
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { type z } from "zod";
import { companyInsertSchema } from "core/zod";

export type CompanyInsertByAdminType = z.infer<typeof companyInsertSchema>;

export const useAdminCreateCompany = () => {
    const queryClient = useQueryClient();
    const toastId = useId();

    const mutation = useMutation({
        mutationFn: async (values: CompanyInsertByAdminType) => {
            try {
                const rpcClient = await getClient();
                const response = await rpcClient.api.companies.$post({
                    json: values,
                });
                if (!response.ok) {
                    let errorMsg = "Failed to create company";
                    try {
                        const errorData = await response.json();
                        errorMsg = errorData.message || errorMsg;
                        // Optionally log backend error details
                        if (errorData.stack) {
                            // eslint-disable-next-line no-console
                            console.error("[AdminCreateCompany] Backend error:", errorData.stack);
                        }
                    } catch (jsonErr) {
                        // eslint-disable-next-line no-console
                        console.error("[AdminCreateCompany] Error parsing backend error response", jsonErr);
                    }
                    throw new Error(errorMsg);
                }
                const data = await response.json();
                return data;
            } catch (err: any) {
                // eslint-disable-next-line no-console
                console.error("[AdminCreateCompany] Caught error:", err);
                throw err;
            }
        },
        onMutate: () => {
            toast.loading("Creating company...", { id: toastId });
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

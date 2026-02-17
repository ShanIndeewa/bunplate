"use server";

import { authClient } from "@/lib/auth-client";
import { getClient } from "@/lib/rpc/server";

export async function deleteCompanyAction(id: string) {
  try {
    // Ensure user is authenticated (optional, adjust depending on your auth flow)
    const sessionRes = await authClient.getSession();
    const session = sessionRes?.data;

    const rpcClient = await getClient();

    // Call DELETE /api/companies/:id
    const response = await rpcClient.api.companies[":id"].$delete({
      param: { id },
    });

    if (!response.ok) {
      let message = `Failed to delete company: ${response.status}`;
      try {
        const err = await response.json();
        if (err && err.message) message = err.message;
      } catch (e) {
        // ignore
      }
      throw new Error(message);
    }

    return { message: "Company deleted successfully" };
  } catch (err) {
    console.error("deleteCompanyAction error:", err);
    throw err instanceof Error ? err : new Error("Failed to delete company");
  }
}

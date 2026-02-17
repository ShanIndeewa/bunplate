"use server";

import { authClient } from "@/lib/auth-client";
import { getClient } from "@/lib/rpc/server";

type UpdateCompanyPayload = Record<string, unknown>;

export async function updateCompanyAction(
  id: string,
  data: UpdateCompanyPayload
) {
  try {
    // Ensure user is authenticated (optional, adjust depending on your auth flow)
    const sessionRes = await authClient.getSession();
    const session = sessionRes?.data;

    const rpcClient = await getClient();

    // Call PATCH /api/companies/:id
    const response = await rpcClient.api.companies[":id"].$patch({
      param: { id },
      json: data,
    });

    if (!response.ok) {
      let message = `Failed to update company: ${response.status}`;
      try {
        const err = await response.json();
        if (err && err.message) message = err.message;
      } catch (e) {
        // ignore
      }
      throw new Error(message);
    }

    const updated = await response.json();
    return updated;
  } catch (err) {
    console.error("updateCompanyAction error:", err);
    throw err instanceof Error ? err : new Error("Failed to update company");
  }
}

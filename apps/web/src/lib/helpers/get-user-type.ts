import { headers } from "next/headers";
import { authClient } from "@/lib/auth-client";

export type UserType = "systemAdmin" | "companyOwner" | "user";

export async function getUserType(): Promise<UserType> {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session) {
    return "user";
  }

  if (session.user.role === "admin") {
    return "systemAdmin";
  }

  if (session.session.activeOrganizationId) {
    return "companyOwner";
  }

  return "user";
}

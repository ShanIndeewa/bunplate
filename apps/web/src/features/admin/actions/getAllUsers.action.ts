"use server";

import { authClient } from "@/lib/auth-client";
import { getClient } from "@/lib/rpc/server";

type GetUsersParams = {
  page?: string;
  limit?: string;
  sort?: "asc" | "desc";
  search?: string;
  userId?: string;
  role?: "admin" | "user" | "moderator" | "b2b";
  status?: "active" | "banned" | "unverified";
  banned?: boolean; // Keep for backward compatibility
};

export async function getAllUsers({
  page = "1",
  limit = "20",
  sort = "desc",
  search = "",
  userId,
  role,
  status,
  banned,
}: GetUsersParams = {}) {
  try {
    console.log("getAllUsers called with params:", {
      page,
      limit,
      sort,
      search,
      userId,
      role,
      status,
      banned,
    });

    const rpcClient = await getClient();

    if (!rpcClient.api || !rpcClient.api.userlist) {
      throw new Error("RPC client API or userlist endpoint is undefined.");
    }

    // Get current session to check for active organization ID
    let currentSession = null;
    let currentUserOrgId = null;

    try {
      const sessionData = await authClient.getSession();
      currentSession = sessionData?.data;

      // Check for activeOrganizationId from session (similar to navigation)
      currentUserOrgId = currentSession?.session?.activeOrganizationId;

      console.log("Current session:", {
        hasSession: !!currentSession,
        hasUser: !!currentSession?.user,
        userRole: currentSession?.user?.role,
        activeOrganizationId: currentUserOrgId,
        isB2BUser: !!currentUserOrgId,
      });
    } catch (sessionError) {
      console.warn("Failed to get session:", sessionError);
    }

    // Build query parameters
    const queryParams: Record<string, string> = {
      page,
      limit,
      sort,
    };

    // Add current user's organization ID for context
    if (currentUserOrgId) {
      queryParams.currentUserOrgId = currentUserOrgId;
      console.log("Current user has organization access:", currentUserOrgId);
    }

    // Only add optional parameters if they have values
    if (search && search.trim()) {
      queryParams.search = search.trim();
    }

    if (userId && userId.trim()) {
      queryParams.userId = userId.trim();
    }

    // Handle role filtering including B2B
    if (role) {
      if (role === "user") {
        // For regular users, we want users WITHOUT activeOrganizationId AND role='user'
        queryParams.role = "user";
        queryParams.filterType = "regular";
        console.log("Filtering for regular users (no activeOrganizationId)");
      } else if (["admin", "moderator"].includes(role)) {
        queryParams.role = role;
        console.log(`Filtering for ${role} users`);
      }
    }

    // Handle status filtering (new approach)
    if (status) {
      switch (status) {
        case "active":
          queryParams.banned = "false";
          queryParams.emailVerified = "true";
          console.log(
            "Filtering for active users (not banned + verified email)"
          );
          break;
        case "banned":
          queryParams.banned = "true";
          console.log("Filtering for banned users");
          break;
        case "unverified":
          queryParams.banned = "false";
          queryParams.emailVerified = "false";
          console.log("Filtering for unverified users");
          break;
      }
    } else if (banned !== undefined) {
      // Backward compatibility
      queryParams.banned = banned.toString();
      console.log("Using legacy banned filter:", banned);
    }

    console.log("Sending query params to API:", queryParams);

    const response = await rpcClient.api.userlist.$get({
      query: queryParams,
    });

    console.log("API response:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      let errorDetails = null;

      try {
        const errorData = await response.json();
        console.log("Error response data:", errorData);

        if (typeof errorData === "string") {
          errorMessage = errorData;
        } else if (errorData && typeof errorData === "object") {
          if (typeof errorData.message === "string") {
            errorMessage = errorData.message;
          } else if (typeof errorData.error === "string") {
            errorMessage = errorData.error;
          } else {
            errorMessage = JSON.stringify(errorData);
          }
        }

        errorDetails = errorData;
      } catch (jsonError) {
        console.log("Failed to parse error response as JSON:", jsonError);
        try {
          const textError = await response.text();
          console.log("Error response text:", textError);
          errorMessage = textError || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
      }

      console.error("API Error Details:", {
        status: response.status,
        statusText: response.statusText,
        message: errorMessage,
        details: errorDetails,
        sentParams: queryParams,
      });

      throw new Error(errorMessage);
    }

    const data = await response.json();

    console.log("Successfully fetched users:", {
      totalCount: data.meta?.totalCount,
      dataLength: data.data?.length,
      filterApplied: {
        role,
        status,
        hasOrgFilter: !!currentUserOrgId,
        isB2BQuery: role === "b2b",
      },
    });

    // Log some sample user data to understand the structure
    if (data.data && data.data.length > 0) {
      console.log("Sample user data:", {
        firstUser: {
          id: data.data[0].id,
          email: data.data[0].email,
          role: data.data[0].role,
          activeOrganizationId: data.data[0].activeOrganizationId,
          isB2BUser: !!data.data[0].activeOrganizationId,
        },
      });
    }

    return data;
  } catch (error) {
    console.error("getAllUsers action error:", error);

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(
      `Failed to fetch users: ${typeof error === "string" ? error : JSON.stringify(error)}`
    );
  }
}

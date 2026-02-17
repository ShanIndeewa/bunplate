import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface UserProfile {
  id: string;
  firstName: string;
  lastName?: string;
  currentPosition?: string;
  location?: string;
  profilePhotoUrl?: string;
  bannerPhotoUrl?: string;
  // ...add other fields from your schema as needed
}

export const useGetProfileDetails = () => {
  return useQuery<UserProfile[]>({
    queryKey: ["user-profiles"],
    queryFn: async () => {
      const rpcClient = await getClient();
      const response = await rpcClient.api.userprofile.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch user profile details");
      }

      const json = await response.json();

      // Normalize various possible shapes to an array
      if (Array.isArray(json)) return json as UserProfile[];
      if (Array.isArray(json?.data)) return json.data as UserProfile[];
      if (json && typeof json === "object") return [json as UserProfile];
      return [];
    },
  });
};

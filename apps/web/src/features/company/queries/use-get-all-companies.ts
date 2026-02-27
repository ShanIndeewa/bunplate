import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";
import { type CompanySelectType } from "core/zod";

export interface CompanyFilterParams {
  page?: number;
  limit?: number;
  search?: string | null;
  sort?: "desc" | "asc" | undefined;
  companyType?: string | null;
  industryId?: string | null;
}

export interface CompaniesResponse {
  data: CompanySelectType[];
  meta: {
    currentPage: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

export const useGetCompanies = (params: CompanyFilterParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sort = "desc",
    companyType = null,
    industryId = null,
  } = params;

  const query = useQuery({
    queryKey: [
      "companies",
      { page, limit, search, sort, companyType, industryId },
    ],
    queryFn: async () => {
      const rpcClient = await getClient();

      const companiesRes = await rpcClient.api.companies.$get({
        query: {
          page: page.toString(),
          limit: limit.toString(),
          search: search || undefined,
          sort: sort || undefined,
          companyType: companyType || undefined,
          industryId: industryId || undefined,
        },
      });

      if (!companiesRes.ok) {
        const errorData = await companiesRes.json();
        throw new Error(errorData.message || "Failed to fetch companies");
      }

      const companies = await companiesRes.json();
      return companies as CompaniesResponse;
    },
  });

  return query;
};

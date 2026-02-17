// rename this to CompanyDetailsComponent if you have one
import { CompanyDetailsComponent } from "@/features/company/components/company-details";
import { getClient } from "@/lib/rpc/server";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string }; // Next.js params are not promises
};

export default async function CompanyDetailsPage({ params }: Props) {
  const { slug } = params;

  const rpcClient = await getClient();

  // Fetch company by slug or ID
  const companyRes = await rpcClient.api.companies[":id"].$get({
    param: { id: slug },
  });

  if (!companyRes.ok) {
    const errorData = await companyRes.json();

    if (companyRes.status === 404) {
      notFound();
    }

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Company
          </h1>
          <p className="text-muted-foreground">{errorData.message}</p>
        </div>
      </div>
    );
  }

  const companyData = await companyRes.json();

  return <CompanyDetailsComponent company={companyData as any} />; // you can rename props inside CompanyDetailsComponent if needed
}

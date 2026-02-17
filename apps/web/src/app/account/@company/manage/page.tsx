import ManageCompanyImages from "@/features/company/components/dashboard-components/company-images";
import ManageCompanyPolicies from "@/features/company/components/dashboard-components/company-policies";

type Props = {
  companyId: string; // you should get this dynamically from your data
};

export default function ManageOwnedCompany({ companyId }: Props) {
  return (
    <div className="space-y-3">
      <ManageCompanyImages />

      <ManageCompanyPolicies companyId={companyId} />
    </div>
  );
}

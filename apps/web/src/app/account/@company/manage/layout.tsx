import TabBarSwitcher from "@/features/company/components/tab-bar-switcher";
import { getClient } from "@/lib/rpc/server";
import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default async function CompanyManagementLayout({ children }: Props) {
  const rpcClient = await getClient();

  // Fetch the current user's company
  const myCompanyRes = await rpcClient.api.companies["my-company"].$get();

  if (!myCompanyRes.ok) {
    // Redirect if no company exists
    if (myCompanyRes.status === 404) redirect("/account/setup");
    return null;
  }

  const myCompany = await myCompanyRes.json();

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title={myCompany.name}
          description={
            myCompany.description?.slice(0, 70) + "..." ||
            `You are managing your company: ${myCompany.name}`
          }
          actionComponent={<></>}
        />

        <div>
          <Separator />
          <TabBarSwitcher />
          <Separator />
        </div>

        {children}
      </div>
    </PageContainer>
  );
}

import { getUserType } from "@/lib/helpers/get-user-type";

export default async function AccountPageLayout({
  company,
  user
}: {
  company?: React.ReactNode;
  user?: React.ReactNode;
}) {
  const userType = await getUserType();

  return <div>{userType === "companyOwner" ? company : user}</div>;
}

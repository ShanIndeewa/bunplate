// src/app/(root)/rooms/[slug]/page.tsx
type Props = { params: { slug: string } };
import JobDetails from "@/features/company/components/job-details";

export default async function RoomDetailsPage({ params }: Props) {
  const { slug } = await params;
  return <JobDetails id={slug} />;
}

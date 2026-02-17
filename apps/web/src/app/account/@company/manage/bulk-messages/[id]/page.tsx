import { getBulkMessage } from "@/features/bulk-message/actions/get-bulk-message";
import { BulkMessageDetails } from "@/features/bulk-message/components/bulk-message-details";
import PageContainer from "@/modules/layouts/page-container";
import { notFound } from "next/navigation";

interface BulkMessagePageProps {
  params: {
    id: string;
  };
}

export default async function BulkMessagePage({ params }: BulkMessagePageProps) {
  try {
    const bulkMessage = await getBulkMessage(params.id);

    return (
      <PageContainer>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Bulk Message Details</h1>
            <p className="text-muted-foreground">
              View and manage your bulk message details.
            </p>
          </div>
          <BulkMessageDetails bulkMessage={bulkMessage} />
        </div>
      </PageContainer>
    );
  } catch (error) {
    notFound();
  }
}


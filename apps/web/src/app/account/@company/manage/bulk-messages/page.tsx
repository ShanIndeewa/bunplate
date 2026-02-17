import { BulkMessageList } from "@/features/bulk-message/components/bulk-message-list";
import PageContainer from "@/modules/layouts/page-container";

export default function BulkMessagesPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Bulk Messages</h1>
          <p className="text-muted-foreground">
            Manage your bulk messages for phone and WhatsApp communication.
          </p>
        </div>
        <BulkMessageList />
      </div>
    </PageContainer>
  );
}


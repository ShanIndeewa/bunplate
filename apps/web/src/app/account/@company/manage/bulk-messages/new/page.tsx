"use client";

import { BulkMessageForm } from "@/features/bulk-message/components/bulk-message-form";
import PageContainer from "@/modules/layouts/page-container";
import { useRouter } from "next/navigation";

export default function NewBulkMessagePage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/account/manage/bulk-messages");
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create Bulk Messages</h1>
          <p className="text-muted-foreground">
            Create bulk messages for phone and WhatsApp communication. You can either enter messages manually or import them from an Excel file.
          </p>
        </div>
        <BulkMessageForm onSuccess={handleSuccess} />
      </div>
    </PageContainer>
  );
}

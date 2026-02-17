"use client";

import { BulkMessageForm } from "@/features/bulk-message/components/bulk-message-form";
import { useGetBulkMessage } from "@/features/bulk-message/queries/use-get-bulk-message";
import PageContainer from "@/modules/layouts/page-container";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

interface EditBulkMessagePageProps {
  params: {
    id: string;
  };
}

export default function EditBulkMessagePage({ params }: EditBulkMessagePageProps) {
  const router = useRouter();
  const { data: bulkMessage, isLoading, error } = useGetBulkMessage(params.id);

  const handleSuccess = () => {
    router.push("/account/manage/bulk-messages");
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="space-y-6">
          <div>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96 mt-2" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </PageContainer>
    );
  }

  if (error || !bulkMessage) {
    return (
      <PageContainer>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Bulk Message Not Found</h1>
            <p className="text-muted-foreground">
              The bulk message you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Bulk Message</h1>
          <p className="text-muted-foreground">
            Update your bulk message details.
          </p>
        </div>
        <BulkMessageForm
          initialData={bulkMessage}
          isEditing={true}
          onSuccess={handleSuccess}
        />
      </div>
    </PageContainer>
  );
}


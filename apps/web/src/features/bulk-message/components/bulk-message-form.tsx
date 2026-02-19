"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useBulkImportBulkMessage } from "../queries/use-bulk-import-bulk-message";
import { useCreateBulkMessage } from "../queries/use-create-bulk-message";
import { useUpdateBulkMessage } from "../queries/use-update-bulk-message";
import type { bulkMessageInsertType, bulkMessageUpdateType } from "../schemas";
import { ExcelImport } from "./excel-import";

const bulkMessageFormSchema = z.object({
  note: z.string().min(1, "Note is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  whatsappNumber: z.string().min(1, "WhatsApp number is required"),
});

type BulkMessageFormData = z.infer<typeof bulkMessageFormSchema>;

interface BulkMessageFormProps {
  initialData?: bulkMessageInsertType | bulkMessageUpdateType;
  isEditing?: boolean;
  onSuccess?: () => void;
}

export function BulkMessageForm({
  initialData,
  isEditing = false,
  onSuccess
}: BulkMessageFormProps) {
  const createBulkMessage = useCreateBulkMessage();
  const updateBulkMessage = useUpdateBulkMessage();
  const bulkImportBulkMessage = useBulkImportBulkMessage();
  const [activeTab, setActiveTab] = useState("manual");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BulkMessageFormData>({
    resolver: zodResolver(bulkMessageFormSchema) as any,
    defaultValues: initialData || {
      note: "",
      phoneNumber: "",
      whatsappNumber: "",
    },
  });

  const onSubmit = async (data: BulkMessageFormData) => {
    try {
      if (isEditing && initialData && "id" in initialData) {
        await updateBulkMessage.mutateAsync({
          id: initialData.id,
          data,
        });
      } else {
        await createBulkMessage.mutateAsync(data);
      }
      onSuccess?.();
    } catch (error) {
      // Error handling is done in the mutation hooks
    }
  };

  const handleExcelImport = async (data: Array<{ note: string; phoneNumber: string; whatsappNumber: string }>) => {
    try {
      await bulkImportBulkMessage.mutateAsync(data);
      onSuccess?.();
    } catch (error) {
      // Error handling is done in the mutation hooks
    }
  };

  if (isEditing) {
    // For editing, show only the manual form
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Bulk Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="note">Message Note</Label>
              <Textarea
                id="note"
                placeholder="Enter your message note..."
                {...register("note")}
                className="min-h-[100px]"
              />
              {errors.note && (
                <p className="text-sm text-destructive">{errors.note.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter phone number..."
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
              <Input
                id="whatsappNumber"
                type="tel"
                placeholder="Enter WhatsApp number..."
                {...register("whatsappNumber")}
              />
              {errors.whatsappNumber && (
                <p className="text-sm text-destructive">{errors.whatsappNumber.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Update"}
              </Button>
              <Button type="button" variant="outline" onClick={onSuccess}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="excel">Excel Import</TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Create New Bulk Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="note">Message Note</Label>
                  <Textarea
                    id="note"
                    placeholder="Enter your message note..."
                    {...register("note")}
                    className="min-h-[100px]"
                  />
                  {errors.note && (
                    <p className="text-sm text-destructive">{errors.note.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter phone number..."
                    {...register("phoneNumber")}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    placeholder="Enter WhatsApp number..."
                    {...register("whatsappNumber")}
                  />
                  {errors.whatsappNumber && (
                    <p className="text-sm text-destructive">{errors.whatsappNumber.message}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Create"}
                  </Button>
                  <Button type="button" variant="outline" onClick={onSuccess}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="excel">
          <ExcelImport
            onImport={handleExcelImport}
            onCancel={onSuccess}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

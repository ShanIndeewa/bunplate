"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Edit, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import type { bulkMessage } from "../schemas";

interface BulkMessageDetailsProps {
  bulkMessage: bulkMessage;
}

export function BulkMessageDetails({ bulkMessage }: BulkMessageDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "sent":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/account/manage/bulk-messages">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to List
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/account/manage/bulk-messages/${bulkMessage.id}/edit`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl">Bulk Message Details</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(bulkMessage.status)}>
                  {bulkMessage.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created {format(new Date(bulkMessage.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Message Note</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {bulkMessage.note}
              </p>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone Number</span>
                </div>
                <p className="text-muted-foreground">{bulkMessage.phoneNumber}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">WhatsApp Number</span>
                </div>
                <p className="text-muted-foreground">{bulkMessage.whatsappNumber}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Last Updated</span>
              </div>
              <p className="text-muted-foreground">
                {format(new Date(bulkMessage.updatedAt), "MMM dd, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


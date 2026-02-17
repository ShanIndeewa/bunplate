"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { Edit, Eye, MessageCircle, MoreHorizontal, Phone, Trash2 } from "lucide-react";
import Link from "next/link";

import type { bulkMessage } from "../schemas";

interface BulkMessageCardProps {
  bulkMessage: bulkMessage;
  onDelete: (id: string) => void;
}

export function BulkMessageCard({ bulkMessage, onDelete }: BulkMessageCardProps) {
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
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-medium line-clamp-2">
              {bulkMessage.note}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Created {format(new Date(bulkMessage.createdAt), "MMM dd, yyyy")}</span>
              <Badge className={getStatusColor(bulkMessage.status)}>
                {bulkMessage.status}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/account/manage/bulk-messages/${bulkMessage.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/account/manage/bulk-messages/${bulkMessage.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete(bulkMessage.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Phone:</span>
            <span>{bulkMessage.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">WhatsApp:</span>
            <span>{bulkMessage.whatsappNumber}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


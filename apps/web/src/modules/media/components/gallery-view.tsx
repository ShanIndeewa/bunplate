"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  ImageIcon,
  Loader2,
  Search,
  Upload,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────

export interface MediaFile {
  id: string;
  url: string;
  filename: string;
  type: string;
  size: number;
  uploadedBy: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface GalleryViewProps {
  /** Whether to render inside a Dialog */
  modal?: boolean;
  /** Controls the dialog open state */
  modalOpen?: boolean;
  /** Setter for the dialog open state */
  setModalOpen?: (open: boolean) => void;
  /** Which tab is active on mount */
  activeTab?: "library" | "upload";
  /** Called when the user confirms their selection */
  onUseSelected?: (files: MediaFile[]) => void;
}

// ── Hook: fetch media library ────────────────────────────────────────────

function useMediaLibrary(search: string) {
  return useQuery<{
    data: MediaFile[];
    meta: { totalCount: number; totalPages: number; currentPage: number; limit: number };
  }>({
    queryKey: ["media-library", search],
    queryFn: async () => {
      const rpcClient = await getClient();
      const response = await rpcClient.api.media.$get({
        query: { page: "1", limit: "50", search: search || undefined },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch media");
      }

      return response.json();
    },
    staleTime: 30_000,
  });
}

// ── Upload helper ────────────────────────────────────────────────────────

async function uploadMediaFile(file: File): Promise<MediaFile> {
  const rpcClient = await getClient();

  // Read the file as a data URL for simple storage
  // In production you'd upload to S3/Cloudinary and get a URL back
  const url = URL.createObjectURL(file);

  const response = await rpcClient.api.media.$post({
    json: {
      url,
      type: file.type.startsWith("image/")
        ? "image"
        : file.type.startsWith("video/")
          ? "video"
          : file.type.startsWith("audio/")
            ? "audio"
            : "document",
      filename: file.name,
      size: file.size,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to upload media");
  }

  return response.json();
}

// ── Component ────────────────────────────────────────────────────────────

export default function GalleryView({
  modal = false,
  modalOpen = false,
  setModalOpen,
  activeTab = "library",
  onUseSelected,
}: GalleryViewProps) {
  const [tab, setTab] = useState<string>(activeTab);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selected, setSelected] = useState<Map<string, MediaFile>>(new Map());
  const [uploading, setUploading] = useState(false);

  const { data, isLoading, refetch } = useMediaLibrary(debouncedSearch);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Reset selection when dialog closes
  useEffect(() => {
    if (!modalOpen) {
      setSelected(new Map());
    }
  }, [modalOpen]);

  const toggleSelect = useCallback((file: MediaFile) => {
    setSelected((prev) => {
      const next = new Map(prev);
      if (next.has(file.id)) {
        next.delete(file.id);
      } else {
        next.set(file.id, file);
      }
      return next;
    });
  }, []);

  const handleUseSelected = () => {
    onUseSelected?.(Array.from(selected.values()));
    setSelected(new Map());
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        await uploadMediaFile(file);
      }
      await refetch();
      setTab("library");
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const mediaItems = data?.data ?? [];

  const content = (
    <Tabs value={tab} onValueChange={setTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="library" className="gap-1.5">
          <ImageIcon className="h-4 w-4" />
          Library
        </TabsTrigger>
        <TabsTrigger value="upload" className="gap-1.5">
          <Upload className="h-4 w-4" />
          Upload
        </TabsTrigger>
      </TabsList>

      <TabsContent value="library" className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : mediaItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
            <ImageIcon className="h-10 w-10" />
            <p className="text-sm">No media found</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto pr-1">
            {mediaItems.map((file) => {
              const isSelected = selected.has(file.id);
              return (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => toggleSelect(file)}
                  className={cn(
                    "group relative aspect-square rounded-lg overflow-hidden border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-transparent hover:border-muted-foreground/30"
                  )}
                >
                  <Image
                    src={file.url}
                    alt={file.filename}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 20vw"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <CheckCircle2 className="h-6 w-6 text-primary drop-shadow" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white truncate">
                      {file.filename}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </TabsContent>

      <TabsContent value="upload" className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 gap-4 text-muted-foreground">
          <Upload className="h-10 w-10" />
          <div className="text-center space-y-1">
            <p className="text-sm font-medium">
              {uploading ? "Uploading..." : "Drop files here or click to browse"}
            </p>
            <p className="text-xs">Supports images, videos, audio, and documents</p>
          </div>
          <label>
            <Input
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
            <Button type="button" variant="outline" disabled={uploading} asChild>
              <span>
                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Choose Files
              </span>
            </Button>
          </label>
        </div>
      </TabsContent>
    </Tabs>
  );

  // Non-modal rendering
  if (!modal) {
    return (
      <div className="space-y-4">
        {content}
        {selected.size > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {selected.size} file{selected.size !== 1 ? "s" : ""} selected
            </p>
            <Button onClick={handleUseSelected}>
              Use Selected
            </Button>
          </div>
        )}
      </div>
    );
  }

  // Modal rendering
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Media Gallery</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto">{content}</div>
        <DialogFooter className="gap-2 sm:gap-0">
          <p className="text-sm text-muted-foreground mr-auto">
            {selected.size} file{selected.size !== 1 ? "s" : ""} selected
          </p>
          <Button
            variant="outline"
            onClick={() => setModalOpen?.(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUseSelected}
            disabled={selected.size === 0}
          >
            Use Selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

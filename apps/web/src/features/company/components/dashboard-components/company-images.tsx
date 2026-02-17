"use client";

import GalleryView from "@/modules/media/components/gallery-view";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/components/lib/utils";
import {
  LayoutGridIcon,
  Loader2,
  PlusIcon,
  Star,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAddCompanyImages } from "../../queries/use-add-company-images";
import { useGetCompanyImages } from "../../queries/use-get-company-images";
import { useUpdateCompanyImages } from "../../queries/use-update-company-images";

type Props = {
  className?: string;
};

export default function ManageCompanyImages({ className }: Props) {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [hasOrderChanged, setHasOrderChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    data: companyImages,
    isPending: loadingImages,
    error: loadingError,
  } = useGetCompanyImages();

  const { mutate: addImages, isPending: uploadingImages } =
    useAddCompanyImages();
  const { mutate: updateImages, isPending: updatingImage } =
    useUpdateCompanyImages();

  useEffect(() => {
    if (companyImages) setImages(companyImages);
  }, [companyImages]);

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
    setImageDialogOpen(true);
  };

  const handleMarkAsThumbnail = () => {
    if (!selectedImage) return;

    const currentThumbnail = images.find((img) => img.isThumbnail);

    updateImages(
      [
        { ...selectedImage, isThumbnail: true },
        ...(currentThumbnail && currentThumbnail.id !== selectedImage.id
          ? [{ ...currentThumbnail, isThumbnail: false }]
          : []),
      ],
      { onSuccess: () => setImageDialogOpen(false) }
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        setHasOrderChanged(true);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSaveChanges = () => {
    if (!hasOrderChanged) return;
    setIsSaving(true);

    const updatedImages = images.map((img, idx) => ({
      ...img,
      displayOrder: idx + 1,
    }));

    updateImages(updatedImages, {
      onSuccess: () => {
        setHasOrderChanged(false);
        setIsSaving(false);
      },
      onError: () => setIsSaving(false),
    });
  };

  function SortableImage({ image }: { image: any }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: image.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex: isDragging ? 10 : 1,
      opacity: isDragging ? 0.8 : 1,
    };

    return (
      <div ref={setNodeRef} style={style} className="relative group">
        <div
          className="drag-handle absolute top-1 left-1 bg-black/70 rounded p-1 z-10
                     cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100
                     transition-opacity"
          {...attributes}
          {...listeners}
        >
          <LayoutGridIcon className="size-3 text-white" />
        </div>

        <Image
          className="size-20 rounded-md aspect-square object-cover cursor-pointer hover:opacity-90 transition-opacity"
          width={200}
          height={200}
          src={image.imageUrl}
          alt={image.altText || ""}
          onClick={() => handleImageClick(image)}
          draggable={false}
        />

        {image.isThumbnail && (
          <div className="absolute top-1 right-1 bg-yellow-500 p-0.5 rounded-full">
            <StarIcon size={12} className="text-white" />
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {showGallery && (
        <GalleryView
          modal
          activeTab="library"
          onUseSelected={(files) => {
            addImages(
              files.map((file, idx) => ({
                imageUrl: file.url,
                altText: file.filename,
                displayOrder: images.length + idx + 1,
              }))
            );
            setShowGallery(false);
          }}
          modalOpen={showGallery}
          setModalOpen={setShowGallery}
        />
      )}

      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>

          {selectedImage && (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full aspect-video">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.altText || "Company image"}
                  fill
                  className="object-contain"
                />
                {selectedImage.isThumbnail && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded-md flex items-center gap-1">
                    <StarIcon size={16} />
                    <span className="text-xs">Thumbnail</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                {selectedImage.altText}
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={handleMarkAsThumbnail}
              disabled={updatingImage || selectedImage?.isThumbnail}
              className={cn(
                "flex items-center gap-2",
                selectedImage?.isThumbnail &&
                  "bg-yellow-600 hover:bg-yellow-700"
              )}
            >
              {updatingImage ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Star className="h-4 w-4" />
              )}
              {selectedImage?.isThumbnail
                ? "Current Thumbnail"
                : "Mark as Thumbnail"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className={cn("p-3", className)}>
        <CardHeader>
          <CardTitle className="text-xl">Manage Company Images</CardTitle>
          <CardDescription>
            Upload and manage images for your company listings.
            {hasOrderChanged && (
              <span className="text-amber-600 block mt-1">
                ⓘ You've changed the image order. Don't forget to save your
                changes.
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-row gap-3 flex-wrap">
            <div
              onClick={() => setShowGallery(true)}
              className="size-20 hover:bg-secondary/60 cursor-pointer rounded-md border-dashed border border-primary/30 flex items-center justify-center"
            >
              {uploadingImages ? (
                <Loader2 className="size-12 text-primary/60 animate-spin" />
              ) : (
                <PlusIcon className="text-primary/60 size-12" strokeWidth={1} />
              )}
            </div>

            {loadingError && (
              <div className="text-red-500">{loadingError.message}</div>
            )}

            {loadingImages &&
              Array(4)
                .fill("_")
                .map((_, idx) => <Skeleton key={idx} className="size-20" />)}

            {images.length > 0 && (
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={images.map((i) => i.id)}
                  strategy={rectSortingStrategy}
                >
                  {images.map((image) => (
                    <SortableImage key={image.id} image={image} />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </div>

          {images.length > 0 && (
            <div className="text-sm text-muted-foreground mt-4">
              <p>
                Drag images to reorder them. The first image will appear first
                in galleries.
              </p>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              if (hasOrderChanged && companyImages) {
                setImages(companyImages);
                setHasOrderChanged(false);
              }
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={!hasOrderChanged || isSaving}
            onClick={handleSaveChanges}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

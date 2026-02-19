"use client";

import { useGetArticle } from "@/features/article-management/api/use-get-single-article";
import { useUpdateArticle } from "@/features/article-management/api/use-update-article";
import { articleUpdateSchema, type articleUpdateType } from "@/features/article-management/schemas";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

interface EditArticlePageProps {
  params: {
    id: string;
  };
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: article, isLoading, isError } = useGetArticle(params.id);
  const { mutate: updateArticle, isPending } = useUpdateArticle();

  const form = useAppForm({
    validators: { onChange: articleUpdateSchema as any },
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
    },
    onSubmit: ({ value }) =>
      updateArticle(
        { id: params.id, data: value as articleUpdateType },
        {
          onSuccess: () => {
            toast.success("Article updated successfully");
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            router.push("/account/manage/article");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update article");
          },
        }
      ),
  });

  // Update form values when article data loads
  useEffect(() => {
    if (article) {
      form.setFieldValue("title", article.title || "");
      form.setFieldValue("slug", article.slug || "");
      form.setFieldValue("excerpt", article.excerpt || "");
      form.setFieldValue("content", article.content || "");
      form.setFieldValue("featuredImage", article.featuredImage || "");
    }
  }, [article, form]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form]
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/article">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <Card>
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/article">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Article Not Found</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              The article you're looking for doesn't exist or has been deleted.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/account/manage/article">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Articles
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Article</h1>
          <p className="text-muted-foreground">
            Update your article details
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>
            Update the information for your article
          </CardDescription>
        </CardHeader>
        <form.AppForm>
          <form onSubmit={handleSubmit}>
            <CardContent className="flex flex-col gap-y-5 mb-6">
              <form.AppField
                name="title"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Title</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter article title"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
              <form.AppField
                name="slug"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Slug</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter slug (optional)"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
              <form.AppField
                name="excerpt"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Excerpt</field.FormLabel>
                    <field.FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="Enter excerpt (optional)"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
              <form.AppField
                name="content"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Content</field.FormLabel>
                    <field.FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="Enter article content"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        rows={6}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
              <form.AppField
                name="featuredImage"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Featured Image URL</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter image URL"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" loading={isPending} disabled={isPending}>
                Update Article
              </Button>
            </CardFooter>
          </form>
        </form.AppForm>
      </Card>
    </div>
  );
}

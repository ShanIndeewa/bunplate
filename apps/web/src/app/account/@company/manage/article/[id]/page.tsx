"use client";

import { useGetArticle } from "@/features/article-management/api/use-get-single-article";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon, EditIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.id as string;
  const { data: article, isLoading, isError } = useGetArticle(articleId);

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
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/article">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{article.title}</h1>
            <p className="text-muted-foreground">
              Created {new Date(article.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/account/manage/article/${article.id}/edit`}>
              <EditIcon className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          {article.featuredImage && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={article.featuredImage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon className="h-4 w-4 mr-2" />
                View Image
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Article content and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {article.content && (
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{article.content}</p>
                </div>
              )}
              {!article.content && (
                <p className="text-muted-foreground italic">
                  No content available for this article.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Slug
                </label>
                <p className="text-sm">
                  {article.slug || "No slug provided"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Excerpt
                </label>
                <p className="text-sm">
                  {article.excerpt || "No excerpt provided"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  User ID
                </label>
                <p className="text-sm font-mono">
                  {article.userId || "Unknown"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Organization ID
                </label>
                <p className="text-sm font-mono">
                  {article.organizationId || "Unknown"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </label>
                <p className="text-sm">
                  {new Date(article.updatedAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {article.featuredImage && (
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-lg">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

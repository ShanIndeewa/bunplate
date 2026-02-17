"use client";

import { ArticleList } from "@/features/article-management/components/article-list";
import { CreateArticle } from "@/features/article-management/components/create-new-article";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";

export default function ArticleManagementPage() {
  const createArticleRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Article Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage your articles
          </p>
        </div>
        <CreateArticle triggerRef={createArticleRef} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleList />
        </CardContent>
      </Card>
    </div>
  );
}

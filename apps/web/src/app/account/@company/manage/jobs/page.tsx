"use client";

import { IconBriefcase } from "@tabler/icons-react";
import { Building, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import MyCompanyJobsPage from "@/app/ant/page";
import { JobCreateForm } from "@/features/company/components/jobs/bulk-create-jobs-form";
import JobCategoryCreateForm from "@/features/company/components/jobs/create-job-type-form";
import { JobCategoryList } from "@/features/company/components/jobs/job-type-card";

import { useUserCompany } from "@/features/company/queries/use-auth-company";

export default function ManageCompanyJobsPage() {
  const [createJobTypeDialogOpen, setCreateJobTypeDialogOpen] = useState(false);
  const [bulkCreateJobsDialogOpen, setBulkCreateJobsDialogOpen] =
    useState(false);
  const [selectedTab, setSelectedTab] = useState("job-types");

  const [selectedJobType, setSelectedJobType] = useState<string | null>(null);

  const { data: userCompany, isLoading: isLoadingCompany } = useUserCompany();
  const companyId = userCompany?.company?.id;

  // Loading state while fetching company info
  if (isLoadingCompany) {
    return (
      <div className="container mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="h-4 bg-muted rounded w-96"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state if no company found
  if (!companyId) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No company found</h3>
            <p className="text-muted-foreground">
              You need to have a company setup before managing jobs.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8">
      {/* Update Job Type Modal */}

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <div className="flex justify-between items-center">
          <TabsList className="grid w-[400px] grid-cols-2 rounded-xs">
            <TabsTrigger
              value="job-types"
              className="flex items-center gap-2 rounded-xs"
            >
              <Building className="h-4 w-4" />
              Job Types
            </TabsTrigger>
            <TabsTrigger
              value="jobs"
              className="flex items-center gap-2 rounded-xs"
            >
              <IconBriefcase className="h-4 w-4" />
              Jobs
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            {/* Create Job Type Dialog */}
            <Dialog
              open={createJobTypeDialogOpen}
              onOpenChange={setCreateJobTypeDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Job Type
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-fit">
                <ScrollArea className="h-full max-h-[90vh]">
                  <DialogHeader className="mb-3">
                    <DialogTitle>Create Job Type</DialogTitle>
                    <DialogDescription>
                      Set up a new job type with its specifications and pricing.
                    </DialogDescription>
                  </DialogHeader>
                  <JobCategoryCreateForm
                    onSuccess={() => setCreateJobTypeDialogOpen(false)}
                  />
                </ScrollArea>
              </DialogContent>
            </Dialog>

            {/* Bulk Create Jobs Dialog */}
            <Dialog
              open={bulkCreateJobsDialogOpen}
              onOpenChange={setBulkCreateJobsDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="rounded-sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Jobs
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl h-fit">
                <ScrollArea className="h-full max-h-[90vh]">
                  <DialogHeader className="mb-3">
                    <DialogTitle>Bulk Create Jobs</DialogTitle>
                    <DialogDescription>
                      Create multiple jobs at once for efficiency.
                    </DialogDescription>
                  </DialogHeader>
                  <JobCreateForm />
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <TabsContent value="job-types" className="space-y-6">
          <Card className="rounded-sm bg-secondary/45">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Job Types
              </CardTitle>
              <CardDescription>
                Manage your different job categories, each with its own
                specifications and pricing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JobCategoryList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-6">
          <Card className="rounded-sm bg-secondary/45">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconBriefcase className="h-5 w-5" />
                Jobs
              </CardTitle>
              <CardDescription>
                Manage individual job units, their status, and assignments.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MyCompanyJobsPage />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

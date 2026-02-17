"use client";

import { useGetCompanies } from "@/features/company/queries/use-get-all-companies";
import { useGetJobsByCompanyId } from "@/features/company/queries/use-get-jobs-by-company-id";
import { Job } from "@/features/company/schemas/compny.jobs.scheam";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance } from "date-fns";
import {
  Building2,
  Clock,
  DollarSign,
  Eye,
  Filter,
  MapPin,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "open":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "closed":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "paused":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getJobTypeColor = (type: string) => {
  switch (type) {
    case "full_time":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "part_time":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100";
    case "contract":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    case "internship":
      return "bg-pink-100 text-pink-800 hover:bg-pink-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const formatJobType = (type: string) => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatSalary = (min: number | null, max: number | null) => {
  if (!min && !max) return "Not specified";
  if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  if (min) return `From $${min.toLocaleString()}`;
  if (max) return `Up to $${max.toLocaleString()}`;
  return "Not specified";
};

export default function AdminJobsPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Fetch companies for the dropdown
  const {
    data: companiesData,
    isLoading: isLoadingCompanies,
    refetch: refetchCompanies,
  } = useGetCompanies({
    page: 1,
    limit: 100, // Get more companies for the dropdown
  });

  // Fetch jobs for selected company
  const {
    data: jobs = [],
    isLoading: isLoadingJobs,
    refetch: refetchJobs,
    error: jobsError,
  } = useGetJobsByCompanyId(selectedCompanyId);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job: Job) => {
    const matchesSearch =
      !searchTerm ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    const matchesType = typeFilter === "all" || job.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const handleCompanyChange = (companyId: string) => {
    setSelectedCompanyId(companyId === "all" ? "" : companyId);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setSelectedCompanyId("");
  };

  const activeFiltersCount = [
    searchTerm,
    statusFilter !== "all" ? statusFilter : null,
    typeFilter !== "all" ? typeFilter : null,
    selectedCompanyId,
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Jobs Management</h1>
          <p className="text-gray-600 mt-2">
            Manage and monitor job postings across all companies
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              refetchCompanies();
              if (selectedCompanyId) refetchJobs();
            }}
            disabled={isLoadingCompanies || isLoadingJobs}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoadingCompanies || isLoadingJobs ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold">{filteredJobs.length}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Open Jobs</p>
                <p className="text-2xl font-bold text-green-600">
                  {filteredJobs.filter((job) => job.status === "open").length}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Companies</p>
                <p className="text-2xl font-bold">
                  {companiesData?.data?.length || 0}
                </p>
              </div>
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Filters</p>
                <p className="text-2xl font-bold text-orange-600">
                  {activeFiltersCount}
                </p>
              </div>
              <Filter className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Company Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Company</label>
              <Select
                value={selectedCompanyId || "all"}
                onValueChange={handleCompanyChange}
                disabled={isLoadingCompanies}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companiesData?.data?.map((company: any) => (
                    <SelectItem key={company.id} value={company.id}>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3 w-3" />
                        {company.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full_time">Full Time</SelectItem>
                  <SelectItem value="part_time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            <div className="space-y-2">
              <label className="text-sm font-medium">&nbsp;</label>
              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={activeFiltersCount === 0}
                className="w-full"
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary">Search: "{searchTerm}"</Badge>
              )}
              {selectedCompanyId && (
                <Badge variant="secondary">
                  Company:{" "}
                  {
                    companiesData?.data?.find(
                      (c: any) => c.id === selectedCompanyId
                    )?.name
                  }
                </Badge>
              )}
              {statusFilter !== "all" && (
                <Badge variant="secondary">Status: {statusFilter}</Badge>
              )}
              {typeFilter !== "all" && (
                <Badge variant="secondary">
                  Type: {formatJobType(typeFilter)}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>
              Jobs ({filteredJobs.length})
              {selectedCompanyId && companiesData?.data && (
                <span className="text-base font-normal text-gray-600 ml-2">
                  from{" "}
                  {
                    companiesData.data.find(
                      (c: any) => c.id === selectedCompanyId
                    )?.name
                  }
                </span>
              )}
            </CardTitle>
            {!selectedCompanyId && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                Select a company to view jobs
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoadingJobs ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              <span>Loading jobs...</span>
            </div>
          ) : jobsError ? (
            <div className="text-center py-12">
              <p className="text-red-600">
                Error loading jobs: {jobsError.message}
              </p>
              <Button
                variant="outline"
                onClick={() => refetchJobs()}
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          ) : !selectedCompanyId ? (
            <div className="text-center py-12 text-gray-500">
              <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>
                Please select a company from the dropdown above to view their
                jobs.
              </p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Eye className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No jobs found matching your criteria.</p>
              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Salary</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Remote</TableHead>
                    <TableHead>Vacancies</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead>Closing Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job: Job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {job.description.substring(0, 100)}...
                          </p>
                          {job.skills && job.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {job.skills.slice(0, 3).map((skill, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {skill}
                                </Badge>
                              ))}
                              {job.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{job.skills.length - 3} more
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">
                            {job.company.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {job.location || "Not specified"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getJobTypeColor(job.type)}>
                          {formatJobType(job.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {formatSalary(job.salaryMin, job.salaryMax)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(job.status)}>
                          {job.status.charAt(0).toUpperCase() +
                            job.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={job.isRemote ? "default" : "outline"}
                          className={
                            job.isRemote ? "bg-blue-100 text-blue-800" : ""
                          }
                        >
                          {job.isRemote ? "Remote" : "On-site"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>{job.numberOfVacancies}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">
                            {formatDistance(
                              new Date(job.postedAt),
                              new Date(),
                              { addSuffix: true }
                            )}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {job.closingDate
                            ? new Date(job.closingDate).toLocaleDateString()
                            : "No deadline"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

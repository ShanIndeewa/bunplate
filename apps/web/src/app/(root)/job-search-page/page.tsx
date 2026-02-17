"use client";

import { JobFilterParams, useGetJobs } from "@/features/company/queries/use-get-all-jobs";
import { useGetCompanyByJobId } from "@/features/company/queries/use-get-company-by-job-id";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";

// Job type based on the API structure
type Job = {
  id: string;
  title?: string;
  description?: string;
  location?: string;
  type?: string;
  status?: string;
  company?: { id: string; name: string };
  companyId?: string;
  salaryMin?: number;
  salaryMax?: number;
  createdAt?: string;
  isRemote?: boolean;
  jobCategory?: {
    id: string;
    type: string;
    keyword: string;
  };
};

const employmentTypes = [
  { label: "Full-time", value: "full_time" },
  { label: "Part-time", value: "part_time" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
];

const jobCategories = [
  { label: "Technology", value: "technology" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Education", value: "education" },
  { label: "Finance", value: "finance" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Transportation", value: "transportation" },
  { label: "Retail", value: "retail" },
  { label: "Engineering", value: "engineering" },
];

const locations = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Seattle, WA",
  "Chicago, IL",
  "Denver, CO",
  "Boston, MA",
  "Miami, FL",
  "Remote"
];

const salaryRanges = [
  { label: "Under $50k", min: 0, max: 50000 },
  { label: "$50k - $75k", min: 50000, max: 75000 },
  { label: "$75k - $100k", min: 75000, max: 100000 },
  { label: "$100k - $125k", min: 100000, max: 125000 },
  { label: "$125k - $150k", min: 125000, max: 150000 },
  { label: "$150k+", min: 150000, max: 999999 },
];

// Job Card Component
function JobCard({ job }: { job: Job }) {
  const { data: company } = useGetCompanyByJobId(job.id);

  const formatSalary = (min?: number, max?: number) => {
    if (!min || !max) return "Salary not specified";
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Recently posted";
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const getEmploymentTypeLabel = (type?: string) => {
    const employmentType = employmentTypes.find(et => et.value === type);
    return employmentType?.label || type || "Full-time";
  };

  return (
    <Card className="p-6 border border-green-100">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* Company Logo */}
        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0">
          <Building2 className="w-8 h-8 text-green-600" />
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-gray-800 hover:text-green-600 transition-colors">
                <Link href={`/jobs/${job.id}`}>
                  {job.title || "Untitled Job"}
                </Link>
              </h3>
              <p className="text-green-600 font-medium">
                {company?.name || job.company?.name || "Company not specified"}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                {job.location && (
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-green-500" />
                    {job.location}
                  </div>
                )}
                <div className="flex items-center">
                  <Briefcase className="w-4 h-4 mr-1 text-green-500" />
                  {getEmploymentTypeLabel(job.type)}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 text-green-500" />
                  {formatDate(job.createdAt)}
                </div>
                {job.isRemote && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Remote
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              {(job.salaryMin || job.salaryMax) && (
                <div className="text-lg font-bold text-green-600">
                  {formatSalary(job.salaryMin, job.salaryMax)}
                </div>
              )}
              {job.status && (
                <div className="text-sm text-gray-500">
                  {job.status}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {job.description && (
            <p className="text-gray-600 mt-3 line-clamp-2">
              {job.description}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <Button
                size="sm"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                asChild
              >
                <Link href={`/jobs/${job.id}`}>
                  Apply Now
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="border-green-200 text-green-600 hover:bg-green-50">
                Save Job
              </Button>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              Posted {formatDate(job.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function JobSearchPageContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState("");
  const [selectedSalaryRange, setSelectedSalaryRange] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(6);

  // Initialize category from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Build filter parameters for the API - memoize to prevent unnecessary re-renders
  const filterParams: JobFilterParams = useMemo(() => ({
    page: currentPage,
    limit: jobsPerPage,
    search: searchTerm || null,
    sort: "desc",
    type: selectedEmploymentType as any || null,
    isRemote: isRemoteOnly || null,
    category: selectedCategory || null,
  }), [currentPage, jobsPerPage, searchTerm, selectedEmploymentType, isRemoteOnly, selectedCategory]);

  // Fetch jobs from API
  const {
    data: jobs = [],
    isLoading,
    error,
  } = useGetJobs(filterParams);

  // Client-side filtering for location and salary (since API might not support these)
  const filteredJobs = useMemo(() => {
    let filtered: Job[] = jobs || [];

    // Location filter (client-side)
    if (selectedLocation) {
      filtered = filtered.filter((job: Job) => job.location === selectedLocation);
    }

    // Salary range filter (client-side)
    if (selectedSalaryRange) {
      const range = salaryRanges.find((r) => r.label === selectedSalaryRange);
      if (range) {
        filtered = filtered.filter((job: Job) => {
          if (!job.salaryMin) return false;
          return job.salaryMin >= range.min && job.salaryMin <= range.max;
        });
      }
    }

    // Category filter (client-side) - if API doesn't support it
    if (selectedCategory) {
      filtered = filtered.filter((job: Job) => {
        // Check if job has a category that matches the selected category
        return job.jobCategory?.type?.toLowerCase() === selectedCategory.toLowerCase();
      });
    }

    return filtered;
  }, [jobs, selectedLocation, selectedSalaryRange, selectedCategory]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedLocation, selectedEmploymentType, selectedSalaryRange, isRemoteOnly, selectedCategory]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedEmploymentType("");
    setSelectedSalaryRange("");
    setSelectedCategory("");
    setIsRemoteOnly(false);
  };

  // For now, we'll use client-side pagination since we're filtering client-side
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Find Your Dream Job
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Discover thousands of job opportunities from top companies worldwide
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <Card className="p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-green-600" />
                  Filters
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-green-600 hover:text-green-700"
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Search Jobs
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Job title, company, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Location
                  </Label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Employment Type */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Employment Type
                  </Label>
                  <Select value={selectedEmploymentType} onValueChange={setSelectedEmploymentType}>
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Job Category */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Job Category
                  </Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary Range */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Salary Range
                  </Label>
                  <Select value={selectedSalaryRange} onValueChange={setSelectedSalaryRange}>
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                      <SelectValue placeholder="All ranges" />
                    </SelectTrigger>
                    <SelectContent>
                      {salaryRanges.map((range) => (
                        <SelectItem key={range.label} value={range.label}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Remote Only */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remote"
                    checked={isRemoteOnly}
                    onCheckedChange={(checked) => setIsRemoteOnly(checked === true)}
                  />
                  <Label htmlFor="remote" className="text-sm font-medium text-gray-700">
                    Remote only
                  </Label>
                </div>
              </div>
            </Card>
          </div>

          {/* Job Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredJobs.length} Jobs Found
                </h2>
                <p className="text-gray-600 mt-1">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length} results
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden border-green-200 text-green-600 hover:bg-green-50"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {showFilters ? "Hide" : "Show"} Filters
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="p-6 border border-green-100">
                    <div className="animate-pulse">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                        <div className="flex-1 space-y-3">
                          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Jobs</h3>
                <p className="text-gray-600 mb-4">
                  There was an error fetching job listings. Please try again.
                </p>
                <Button onClick={() => window.location.reload()} variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                  Try Again
                </Button>
              </Card>
            )}

            {/* Job Cards */}
            {!isLoading && !error && (
              <div className="space-y-4">
                {currentJobs.map((job: Job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredJobs.length === 0 && (
              <Card className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={clearFilters} variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                  Clear Filters
                </Button>
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="border-green-200 text-green-600 hover:bg-green-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "border-green-200 text-green-600 hover:bg-green-50"
                      }
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="border-green-200 text-green-600 hover:bg-green-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Find Your Dream Job
              </h1>
              <p className="text-xl text-green-100 max-w-2xl mx-auto">
                Discover thousands of job opportunities from top companies worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-80">
              <Card className="p-6 sticky top-8">
                <div className="animate-pulse space-y-6">
                  <div className="h-6 bg-gray-200 rounded w-24"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Job Results */}
            <div className="flex-1">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="p-6 border border-green-100">
                    <div className="animate-pulse">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                        <div className="flex-1 space-y-3">
                          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    }>
      <JobSearchPageContent />
    </Suspense>
  );
}

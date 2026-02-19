import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function JobNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h1>
          <p className="text-gray-600 mb-6">
            The job you're looking for doesn't exist or may have been removed.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700">
              <Link href="/job-search-page">
                <Search className="w-4 h-4 mr-2" />
                Browse All Jobs
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}



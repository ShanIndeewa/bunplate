"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/components/lib/utils";
import {
    Building2,
    Camera,
    ChevronLeft,
    ChevronRight,
    Facebook,
    Grid3X3,
    Heart,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Share2,
    Twitter,
    X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type CompanyDetailsProps = {
  company: {
    id: string;
    name: string;
    brandName?: string;
    description?: string;
    logoUrl?: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
    phone?: string;
    email?: string;
    latitude?: number;
    longitude?: number;
    companyType?: { id: string; name: string };
    industry?: { id: string; name: string };
    images: Array<{
      id: string;
      imageUrl: string;
      altText?: string;
      isThumbnail?: boolean;
    }>;
  };
};

export function CompanyDetailsComponent({ company }: CompanyDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const allImages = company.images || [];

  const handleShowOnMap = () => {
    if (company.latitude && company.longitude) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${company.latitude},${company.longitude}`,
        "_blank"
      );
    } else {
      alert("Map location not available for this company.");
    }
  };

  const ImageGalleryModal = () => {
    if (!isGalleryOpen) return null;

    const nextImage = () => {
      setSelectedImageIndex((prev) =>
        prev === allImages.length - 1 ? 0 : prev + 1
      );
    };

    const prevImage = () => {
      setSelectedImageIndex((prev) =>
        prev === 0 ? allImages.length - 1 : prev - 1
      );
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => setIsGalleryOpen(false)}
          >
            <X className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 text-white hover:bg-white/20"
            onClick={prevImage}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <div className="max-w-4xl max-h-full">
            <Image
              src={allImages[selectedImageIndex]?.imageUrl!}
              alt={allImages[selectedImageIndex]?.altText || "Company image"}
              width={800}
              height={600}
              className="object-contain max-w-full max-h-full"
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 text-white hover:bg-white/20"
            onClick={nextImage}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {selectedImageIndex + 1} / {allImages.length}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 to-green-100 font-inter">
      {/* Header */}
      <header className="relative bg-gradient-to-r from-green-600 via-green-700 to-green-800 h-72 text-white p-6 md:p-10 lg:p-14 overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold">Company Details</h1>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 transition-colors px-4 py-2 rounded-lg"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20 transition-colors px-4 py-2 rounded-lg"
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart
                className={cn(
                  "w-5 h-5 mr-2",
                  isLiked && "fill-red-500 text-red-500"
                )}
              />
              Save
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full opacity-10 transform translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-300 rounded-full opacity-10 transform -translate-x-32 translate-y-32"></div>
          <svg
            className="absolute top-0 right-0 h-full w-auto text-green-400 opacity-5"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="pattern-company"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-company)"
            />
          </svg>
        </div>
      </header>

      {/* Main */}
      <main className="relative -mt-32 z-20 container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 bg-white rounded-2xl shadow-lg border border-green-100 p-8 h-fit sticky top-6 self-start">
            {/* Company Header */}
            <div className="text-center mb-8">
              <div className="w-28 h-28 mx-auto mb-4 rounded-2xl shadow-lg border border-green-100 p-3 overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
                {company.logoUrl ? (
                  <Image
                    src={company.logoUrl}
                    alt={company.name}
                    width={112}
                    height={112}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {company.brandName || company.name}
              </h2>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {company.companyType?.name && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {company.companyType.name}
                  </span>
                )}
                {company.industry?.name && (
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                    {company.industry.name}
                  </span>
                )}
              </div>
            </div>

            {/* Social */}
            <div className="flex justify-center space-x-4 mb-8">
              <div className="p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer">
                <Facebook className="w-5 h-5 text-green-600" />
              </div>
              <div className="p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer">
                <Twitter className="w-5 h-5 text-green-600" />
              </div>
              <div className="p-3 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer">
                <Linkedin className="w-5 h-5 text-green-600" />
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start p-3 bg-green-50 rounded-xl">
                  <MapPin className="w-5 h-5 mr-3 flex-shrink-0 text-green-600 mt-0.5" />
                  <span className="text-sm text-gray-700">
                    {company.street}, {company.city}, {company.state},{" "}
                    {company.country}
                  </span>
                </div>
                {company.phone && (
                  <div className="flex items-center p-3 bg-green-50 rounded-xl">
                    <Phone className="w-5 h-5 mr-3 flex-shrink-0 text-green-600" />
                    <span className="text-sm text-gray-700">{company.phone}</span>
                  </div>
                )}
                {company.email && (
                  <div className="flex items-center p-3 bg-green-50 rounded-xl">
                    <Mail className="w-5 h-5 mr-3 flex-shrink-0 text-green-600" />
                    <span className="text-sm text-gray-700">{company.email}</span>
                  </div>
                )}
              </div>
            </div>

            {/* About */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                About the Company
              </h3>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {company.description || "No description available."}
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="w-full lg:w-2/3 bg-white rounded-2xl shadow-lg border border-green-100 p-8">
            {/* Gallery */}
            <div className="relative mb-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">Company Gallery</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 h-auto lg:h-[500px] rounded-xl overflow-hidden">
                {allImages.slice(0, 5).map((image, index) => (
                  <div
                    key={image.id}
                    className={cn(
                      "relative cursor-pointer group rounded-xl overflow-hidden border border-green-100",
                      index === 0
                        ? "md:col-span-2 lg:col-span-2 lg:row-span-2 h-[300px] md:h-[500px]"
                        : "h-[200px] md:h-[250px] lg:h-auto"
                    )}
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setIsGalleryOpen(true);
                    }}
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.altText || `Company image ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {index === 4 && allImages.length > 5 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 to-green-500/60 flex items-center justify-center text-white text-center">
                        <div>
                          <Grid3X3 className="w-8 h-8 mx-auto mb-2" />
                          <span className="text-sm font-semibold">
                            +{allImages.length - 5} photos
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {allImages.length > 0 && (
                <Button
                  className="absolute bottom-4 right-4 bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg border-0"
                  onClick={() => setIsGalleryOpen(true)}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Show all photos
                </Button>
              )}
            </div>

            <ImageGalleryModal />

            {/* Tabs */}
            <Tabs defaultValue="jobs">
              <TabsList className="grid w-full grid-cols-4 bg-green-50 border border-green-200 rounded-xl p-1">
                <TabsTrigger
                  value="jobs"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all"
                >
                  Jobs
                </TabsTrigger>
                <TabsTrigger
                  value="services"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all"
                >
                  Services
                </TabsTrigger>
                <TabsTrigger
                  value="location"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all"
                >
                  Location
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white data-[state=active]:shadow-sm rounded-lg transition-all"
                >
                  Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="jobs" className="mt-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Available Jobs</h2>
                </div>
                <Card className="p-8 text-center border border-green-100 bg-gradient-to-br from-green-50 to-white">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Jobs Available</h3>
                  <p className="text-gray-600">Jobs will be displayed here when available</p>
                </Card>
              </TabsContent>

              <TabsContent value="services" className="mt-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Services</h2>
                </div>
                <Card className="p-8 text-center border border-green-100 bg-gradient-to-br from-green-50 to-white">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Services Coming Soon</h3>
                  <p className="text-gray-600">Services offered by the company will be listed here</p>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="mt-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Location</h2>
                </div>
                <div className="h-96 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center border border-green-200">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">Map would be displayed here</p>
                  </div>
                </div>
                <div className="space-y-4 mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                    <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                    Address
                  </h3>
                  <div className="bg-green-50 rounded-xl p-4 space-y-2">
                    <p className="text-gray-700 font-medium">{company.street}</p>
                    <p className="text-gray-600">
                      {company.city}, {company.state} {company.postalCode}
                    </p>
                    <p className="text-gray-600">{company.country}</p>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg"
                    onClick={handleShowOnMap}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
                </div>
                <Card className="p-8 text-center border border-green-100 bg-gradient-to-br from-green-50 to-white">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
                  <p className="text-gray-600">Reviews will be displayed here when available</p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

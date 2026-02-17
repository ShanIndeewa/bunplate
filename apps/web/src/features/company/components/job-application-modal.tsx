"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import {
    AlertCircle,
    Briefcase,
    CheckCircle,
    Clock,
    ExternalLink,
    FileText,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    Star,
    Upload,
    User,
    X
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateJobApplication } from "../queries/use-create-job-application";

const jobApplicationSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(256, "Name too long"),
  email: z.string().email("Invalid email address").max(256, "Email too long"),
  phone: z.string().min(1, "Phone number is required").max(64, "Phone too long"),
  address: z.string().min(1, "Address is required").max(512, "Address too long"),
  linkedin: z.string().url("Invalid LinkedIn URL").max(512, "URL too long").optional().or(z.literal("")),
  portfolio: z.string().url("Invalid portfolio URL").max(512, "URL too long").optional().or(z.literal("")),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters").max(2000, "Cover letter too long"),
  source: z.string().max(64, "Source too long").optional(),
  referralCode: z.string().max(64, "Referral code too long").optional(),
});

type JobApplicationForm = z.infer<typeof jobApplicationSchema>;

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
  companyName: string;
}

export default function JobApplicationModal({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  companyName,
}: JobApplicationModalProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const createApplication = useCreateJobApplication();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<JobApplicationForm>({
    resolver: zodResolver(jobApplicationSchema),
  });

  const onSubmit = async (data: JobApplicationForm) => {
    try {
      // TODO: Upload resume file if selected
      // const mediaId = resumeFile ? await uploadFile(resumeFile) : null;

      const applicationData = {
        jobId,
        coverLetterText: data.coverLetter,
        source: data.source || "website",
        referralCode: data.referralCode || null,
        tags: ["web-application"],
        applicantProfile: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          linkedin: data.linkedin || null,
          portfolio: data.portfolio || null,
        },
        mediaId: null, // TODO: Set after file upload
      };

      console.log("Submitting application data:", applicationData);

      await createApplication.mutateAsync(applicationData);

      // Invalidate the application status query to refresh the UI
      queryClient.invalidateQueries({ queryKey: ["job-application-status", jobId] });

      reset();
      setResumeFile(null);
      onClose();
    } catch (error) {
      console.error("Failed to submit application:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type and size
      if (file.type !== "application/pdf" && !file.type.startsWith("image/")) {
        alert("Please upload a PDF or image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size must be less than 5MB");
        return;
      }
      setResumeFile(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden mx-4 animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Apply for Position</h2>
                <p className="text-green-100 mt-1 flex items-center gap-2">
                  <Star size={16} className="text-yellow-300" />
                  {jobTitle} at {companyName}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-xl"
            >
              <X size={24} />
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
          <form id="job-application-form" onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* Personal Information */}
            <div className="bg-green-50 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <User size={20} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User size={16} />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="Enter your full name"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${
                      errors.fullName
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                    }`}
                  />
                  {errors.fullName && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.fullName.message}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail size={16} />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email address"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                    }`}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.email.message}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Phone size={16} />
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="Enter your phone number"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${
                      errors.phone
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                    }`}
                  />
                  {errors.phone && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.phone.message}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin size={16} />
                    Address *
                  </Label>
                  <Input
                    id="address"
                    {...register("address")}
                    placeholder="Enter your address"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${
                      errors.address
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                    }`}
                  />
                  {errors.address && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.address.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Links */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <ExternalLink size={20} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Professional Links</h3>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">Optional</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Linkedin size={16} className="text-blue-600" />
                    LinkedIn Profile
                  </Label>
                  <div className="relative">
                    <Linkedin size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="linkedin"
                      {...register("linkedin")}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className={`h-12 pl-12 rounded-xl border-2 transition-all duration-200 ${
                        errors.linkedin
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                      }`}
                    />
                  </div>
                  {errors.linkedin && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.linkedin.message}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <ExternalLink size={16} className="text-purple-600" />
                    Portfolio/Website
                  </Label>
                  <div className="relative">
                    <ExternalLink size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      id="portfolio"
                      {...register("portfolio")}
                      placeholder="https://yourportfolio.com"
                      className={`h-12 pl-12 rounded-xl border-2 transition-all duration-200 ${
                        errors.portfolio
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                      }`}
                    />
                  </div>
                  {errors.portfolio && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.portfolio.message}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Upload size={20} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Resume/CV</h3>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">Recommended</span>
              </div>

              <div className="border-2 border-dashed border-green-300 rounded-2xl p-8 text-center hover:border-green-400 hover:bg-green-50 transition-all duration-200 group">
                <input
                  type="file"
                  id="resume"
                  accept=".pdf,.doc,.docx,image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="resume"
                  className="cursor-pointer flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Upload size={32} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-1">
                      {resumeFile ? (
                        <span className="flex items-center gap-2">
                          <CheckCircle size={20} className="text-green-600" />
                          {resumeFile.name}
                        </span>
                      ) : (
                        "Click to upload your resume"
                      )}
                    </p>
                    <p className="text-sm text-gray-500">PDF, DOC, DOCX or images up to 5MB</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileText size={20} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Cover Letter</h3>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">Required</span>
              </div>

              <div className="space-y-3">
                <Label htmlFor="coverLetter" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText size={16} />
                  Tell us why you're interested in this position *
                </Label>
                <Textarea
                  id="coverLetter"
                  {...register("coverLetter")}
                  placeholder="Write a compelling cover letter explaining your interest and qualifications for this role. Be specific about how your skills and experience align with the job requirements..."
                  rows={6}
                  className={`rounded-xl border-2 transition-all duration-200 resize-none ${
                    errors.coverLetter
                      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                      : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                  }`}
                />
                <div className="flex justify-between items-center">
                  {errors.coverLetter ? (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.coverLetter.message}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <Clock size={14} />
                      Minimum 50 characters recommended
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      (watch("coverLetter")?.length || 0) >= 50 ? "bg-green-500" : "bg-gray-300"
                    }`} />
                    <p className="text-gray-400 text-sm">
                      {watch("coverLetter")?.length || 0}/2000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Briefcase size={20} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Additional Information</h3>
                <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">Optional</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="source" className="text-sm font-medium text-gray-700">
                    How did you hear about us?
                  </Label>
                  <Input
                    id="source"
                    {...register("source")}
                    placeholder="e.g., LinkedIn, Company Website, Referral"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${
                      errors.source
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                    }`}
                  />
                  {errors.source && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.source.message}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referralCode" className="text-sm font-medium text-gray-700">
                    Referral Code (if any)
                  </Label>
                  <Input
                    id="referralCode"
                    {...register("referralCode")}
                    placeholder="Enter referral code"
                    className={`h-12 rounded-xl border-2 transition-all duration-200 ${
                      errors.referralCode
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-green-500 focus:ring-green-100"
                    }`}
                  />
                  {errors.referralCode && (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle size={16} />
                      {errors.referralCode.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              <p>By submitting, you agree to our terms and conditions</p>
            </div>
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={createApplication.isPending}
                className="px-8 py-3 rounded-xl border-2 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="job-application-form"
                disabled={createApplication.isPending}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                {createApplication.isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

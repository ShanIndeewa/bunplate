"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Building, Loader2 } from "lucide-react";
import { useState } from "react";

import {
    useAdminCreateCompany,
    type CompanyInsertByAdminType,
} from "@/features/company/queries/use-admin-create-company";

const companyStatusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "suspended", label: "Suspended" },
    { value: "pending_approval", label: "Pending Approval" },
];

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

const initialFormData = {
    name: "",
    brandName: "",
    description: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phone: "",
    email: "",
    website: "",
    logoUrl: "",
    employeeCount: 0,
    status: "active" as const,
    companyType: null as string | null,
    industryId: null as string | null,
    organizationId: "",
    createdBy: "",
};

export function AdminCreateCompanyDialog({ open, onOpenChange }: Props) {
    const { mutate, isPending } = useAdminCreateCompany();
    const [formData, setFormData] = useState(initialFormData);

    const updateField = (field: string, value: string | number | null) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload: CompanyInsertByAdminType = {
            name: formData.name,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            postalCode: formData.postalCode,
            organizationId: formData.organizationId,
            createdBy: formData.createdBy,
            description: formData.description || null,
            brandName: formData.brandName || null,
            phone: formData.phone || null,
            email: formData.email || null,
            website: formData.website || null,
            logoUrl: formData.logoUrl || null,
            companyType: formData.companyType || null,
            industryId: formData.industryId || null,
            employeeCount: formData.employeeCount || null,
            status: formData.status,
        };

        mutate(payload, {
            onSuccess: () => {
                setFormData(initialFormData);
                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-blue-600" />
                        Create New Company
                    </DialogTitle>
                    <DialogDescription>
                        Create a new company as admin. Fill in the required fields below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        {/* Organization & Creator */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="organizationId">
                                    Organization ID
                                </Label>
                                <Input
                                    id="organizationId"
                                    placeholder="Organization ID (Optional)"
                                    value={formData.organizationId}
                                    onChange={(e) => updateField("organizationId", e.target.value)}
                                    disabled={isPending}
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    Leave blank if not linked to an organization. Must be a valid ID if provided.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="createdBy">
                                    Created By (User ID) <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="createdBy"
                                    placeholder="User ID"
                                    value={formData.createdBy}
                                    onChange={(e) => updateField("createdBy", e.target.value)}
                                    required
                                    disabled={isPending}
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    Provide a valid User ID. Defaults to your ID if left blank.
                                </p>
                            </div>
                        </div>

                        {/* Company Name + Brand */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Company Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Company name"
                                    value={formData.name}
                                    onChange={(e) => updateField("name", e.target.value)}
                                    required
                                    disabled={isPending}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="brandName">Brand Name</Label>
                                <Input
                                    id="brandName"
                                    placeholder="Brand name"
                                    value={formData.brandName}
                                    onChange={(e) => updateField("brandName", e.target.value)}
                                    disabled={isPending}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Company description"
                                value={formData.description}
                                onChange={(e) => updateField("description", e.target.value)}
                                disabled={isPending}
                                rows={3}
                            />
                        </div>

                        {/* Address */}
                        <div className="space-y-2">
                            <Label htmlFor="street">
                                Street <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="street"
                                placeholder="Street address"
                                value={formData.street}
                                onChange={(e) => updateField("street", e.target.value)}
                                required
                                disabled={isPending}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="city">
                                    City <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={(e) => updateField("city", e.target.value)}
                                    required
                                    disabled={isPending}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="state">
                                    State <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="state"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={(e) => updateField("state", e.target.value)}
                                    required
                                    disabled={isPending}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="country">
                                    Country <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="country"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={(e) => updateField("country", e.target.value)}
                                    required
                                    disabled={isPending}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postalCode">
                                    Postal Code <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="postalCode"
                                    placeholder="Postal code"
                                    value={formData.postalCode}
                                    onChange={(e) => updateField("postalCode", e.target.value)}
                                    required
                                    disabled={isPending}
                                />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={(e) => updateField("phone", e.target.value)}
                                    disabled={isPending}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                    disabled={isPending}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    placeholder="Website URL"
                                    value={formData.website}
                                    onChange={(e) => updateField("website", e.target.value)}
                                    disabled={isPending}
                                />
                            </div>
                        </div>

                        {/* Logo + Employee Count */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label htmlFor="logoUrl">Logo URL</Label>
                                <Input
                                    id="logoUrl"
                                    placeholder="Logo URL"
                                    value={formData.logoUrl}
                                    onChange={(e) => updateField("logoUrl", e.target.value)}
                                    disabled={isPending}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="employeeCount">Employee Count</Label>
                                <Input
                                    id="employeeCount"
                                    type="number"
                                    min={0}
                                    placeholder="0"
                                    value={formData.employeeCount}
                                    onChange={(e) =>
                                        updateField("employeeCount", Number(e.target.value))
                                    }
                                    disabled={isPending}
                                />
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) => updateField("status", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {companyStatusOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Building className="mr-2 h-4 w-4" />
                                    Create Company
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

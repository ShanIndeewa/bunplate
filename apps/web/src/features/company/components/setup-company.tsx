"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/components/lib/utils";

import { AddressType } from "@/components/address-autocomplete";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { useCreateCompany } from "../queries/use-create-company";
import {
    companyInsertSchema,
    type CompanyInsertType,
} from "../schemas/company.schema";
import { CompanyTypesDropdown } from "./company-types-dropdown";

type Props = {
  className?: string;
};

const defaultValues: Partial<CompanyInsertType> = {
  name: "",
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
  status: "pending_approval",
};

export function SetupCompany({ className }: Props) {
  const { mutate, isPending } = useCreateCompany();
  const router = useRouter();

  const [selectedCompanyTypeID, setSelectedCompanyTypeID] = useState<
    string | undefined
  >(undefined);

  const [selectedIndustryID, setSelectedIndustryID] = useState<
    string | undefined
  >(undefined);

  const [searchInput, setSearchInput] = useState("");
  const [address, setAddress] = useState<AddressType>({
    address1: "",
    address2: "",
    formattedAddress: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    lat: 0,
    lng: 0,
  });

  const form = useAppForm({
    validators: { onChange: companyInsertSchema },
    defaultValues,
    onSubmit: ({ value }) =>
      mutate(
        {
          ...value,
          companyType: selectedCompanyTypeID,
          industryId: selectedIndustryID,
        } as CompanyInsertType,
        {
          onSuccess: () => {
            form.reset();
            router.push("/account/manage");
          },
        }
      ),
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form]
  );

  return (
    <Card className={cn("w-full max-w-4xl mx-auto px-4", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-heading">
          Setup your Company
        </CardTitle>
        <CardDescription>
          {`Fill out your company details. This will help us customize the platform to your needs.`}
        </CardDescription>
      </CardHeader>

      <form.AppForm>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Company Name + Brand Name */}
            <div className="grid grid-cols-2 gap-2">
              <form.AppField
                name="name"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Company Name</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter company name"
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
                name="brandName"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Brand Name</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter brand name"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>

            {/* Logo URL */}
            <form.AppField
              name="logoUrl"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Logo URL</field.FormLabel>
                  <field.FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Enter logo URL"
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            {/* Contact Info */}
            <div className="grid grid-cols-3 gap-2">
              <form.AppField
                name="phone"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Phone</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter phone"
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
                name="email"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Email</field.FormLabel>
                    <field.FormControl>
                      <Input
                        type="email"
                        disabled={isPending}
                        placeholder="Enter email"
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
                name="website"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Website</field.FormLabel>
                    <field.FormControl>
                      <Input
                        type="url"
                        disabled={isPending}
                        placeholder="Enter website URL"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>

            <form.AppField
              name="description"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Description</field.FormLabel>
                  <field.FormControl>
                    <Textarea
                      disabled={isPending}
                      placeholder="Enter company description"
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            {/* Address */}
            <form.AppField
              name="street"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Street</field.FormLabel>
                  <field.FormControl>
                    <Input
                      disabled={isPending}
                      placeholder="Enter street"
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <form.AppField
                name="city"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>City</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter city"
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
                name="state"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>State</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter state"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <form.AppField
                name="country"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Country</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter country"
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
                name="postalCode"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Postal Code</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter postal code"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>

            {/* Business Details */}
            <div className="grid grid-cols-2 gap-2">
              <CompanyTypesDropdown
                onSelect={(companyType) =>
                  setSelectedCompanyTypeID(companyType?.id)
                }
              />
              {/* Industry dropdown can be added here later */}
            </div>

            <form.AppField
              name="employeeCount"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Employee Count</field.FormLabel>
                  <field.FormControl>
                    <Input
                      type="number"
                      min={0}
                      disabled={isPending}
                      placeholder="Enter employee count"
                      value={field.state.value || 0}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="mt-8 flex">
            {/* Example button for submission */}
            <Button
              icon={<CheckCircle2 />}
              loading={isPending}
              type="submit"
              className="w-full py-4"
            >
              Complete Setup
            </Button>
          </CardFooter>
        </form>
      </form.AppForm>
    </Card>
  );
}

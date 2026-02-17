"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { Loader2, PlusIcon } from "lucide-react";

import { useAddCompanyPolicies } from "../../queries/use-add-company-policies";
import { useGetCompanyPolicies } from "../../queries/use-get-company-policies";

import type {
  CompanyPolicy,
  InsertCompanyPolicyType,
} from "../../schemas/company.schema";

type Props = {
  className?: string;
  companyId?: string; // optional, defaults to "my company"
};

export default function ManageCompanyPolicies({ className, companyId }: Props) {
  const [policies, setPolicies] = useState<CompanyPolicy[]>([]);
  const [newPolicyType, setNewPolicyType] = useState("");
  const [newPolicyText, setNewPolicyText] = useState("");

  const { data: fetchedPolicies, isPending: loadingPolicies } =
    useGetCompanyPolicies(companyId);
  const { mutate: addPolicy, isPending: addingPolicy } =
    useAddCompanyPolicies();

  useEffect(() => {
    setPolicies(Array.isArray(fetchedPolicies) ? fetchedPolicies : []);
  }, [fetchedPolicies]);

  const handleAddPolicy = () => {
    if (!newPolicyType.trim() || !newPolicyText.trim()) return;

    const newPolicy: InsertCompanyPolicyType = {
      policyType: newPolicyType,
      policyText: newPolicyText,
      companyId: "",
    };

    addPolicy([newPolicy], {
      // wrap in array to match mutation
      onSuccess: (createdPolicies: CompanyPolicy[]) => {
        setPolicies((prev) => [...prev, ...createdPolicies]);
        setNewPolicyType("");
        setNewPolicyText("");
      },
    });
  };

  return (
    <Card className={cn("p-3", className)}>
      <CardHeader>
        <CardTitle className="text-xl">Manage Company Policies</CardTitle>
        <CardDescription>Add new policies for your company.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Policy Type (e.g., HR, Privacy)"
            value={newPolicyType}
            onChange={(e) => setNewPolicyType(e.target.value)}
          />
          <Input
            placeholder="Policy Text"
            value={newPolicyText}
            onChange={(e) => setNewPolicyText(e.target.value)}
          />
          <Button onClick={handleAddPolicy} disabled={addingPolicy}>
            {addingPolicy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <PlusIcon className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="space-y-2">
          {loadingPolicies ? (
            Array(3)
              .fill("_")
              .map((_, idx) => (
                <div
                  key={idx}
                  className="h-10 bg-muted rounded animate-pulse"
                />
              ))
          ) : policies.length > 0 ? (
            policies.map((policy) => (
              <div
                key={policy.id}
                className="p-2 border rounded hover:bg-muted/20"
              >
                <strong>{policy.policyType}:</strong> {policy.policyText}
              </div>
            ))
          ) : (
            <div className="text-muted">No policies added yet.</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import {
    transformCompaniesData as transformCompaniesDataBase,
    transformDatesRecursive as transformDatesBase,
    WithDateConversions
} from "@/features/company/utils/transforms";

/**
 * Client-side utility for transforming date strings to Date objects
 * This wrapper ensures proper typing for client components
 */
export function transformDatesRecursive<T>(obj: T): WithDateConversions<T> {
  return transformDatesBase(obj);
}

/**
 * Client-side utility for transforming company data
 */
export function transformCompaniesData<T>(companies: T[]): WithDateConversions<T[]> {
  return transformCompaniesDataBase(companies);
}

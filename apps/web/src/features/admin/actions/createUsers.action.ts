"use server";

import { authClient } from "@/lib/auth-client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { insertUserSchema, type CreateUser } from "../schemas/user.schemas";

export async function createUser(data: CreateUser) {
  try {
    // Validate input data
    const validatedData = insertUserSchema.parse({
      name: data.name,
      email: data.email,
      role: data.role,
      emailVerified: data.emailVerified,
      banned: data.banned,
      banReason: data.banReason,
      banExpires: data.banExpires,
    });

    // Validate password separately
    if (!data.password || data.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    console.log("Creating user with validated data:", {
      ...validatedData,
      password: "***",
    });

    // Get headers for authentication
    const headersList = await headers();
    const cookieHeader = headersList.get("cookie");

    // Use Better Auth admin client to create user
    const { data: newUser, error } = await authClient.admin.createUser(
      {
        email: validatedData.email,
        password: data.password,
        name: validatedData.name,
        role: validatedData.role as "user" | "admin",
        data: {
          emailVerified: validatedData.emailVerified,
          banned: validatedData.banned,
          banReason: validatedData.banReason || undefined,
          banExpires: validatedData.banExpires || undefined,
        },
      },
      {
        headers: {
          ...(cookieHeader && { cookie: cookieHeader }),
        },
      }
    );

    if (error) {
      console.error("Better Auth error:", error);

      // Handle specific Better Auth errors
      if (error.code === "USER_ALREADY_EXISTS") {
        throw new Error("A user with this email already exists");
      }
      if (error.code === "INVALID_EMAIL") {
        throw new Error("Please enter a valid email address");
      }
      if (error.code === "WEAK_PASSWORD") {
        throw new Error("Password is too weak. Please use a stronger password");
      }
      if (error.code === "UNAUTHORIZED") {
        throw new Error("You don't have permission to create users");
      }

      throw new Error(error.message || "Failed to create user");
    }

    if (!newUser) {
      throw new Error("User creation failed - no user data returned");
    }

    console.log("User created successfully:", newUser);

    // If we have additional fields that aren't handled by Better Auth,
    // we might need to update them separately
    if (
      validatedData.banned ||
      validatedData.banReason ||
      validatedData.banExpires
    ) {
      try {
        // Update user with additional ban-related fields if needed
        const { error: updateError } = await authClient.admin.updateUser(
          {
            userId: (newUser as any).id ?? (newUser as any).user?.id,
            data: {
              banned: validatedData.banned,
              banReason: validatedData.banReason || undefined,
              banExpires: validatedData.banExpires || undefined,
            },
          },
          {
            headers: {
              ...(cookieHeader && { cookie: cookieHeader }),
            },
          }
        );

        if (updateError) {
          console.warn("Failed to update ban fields:", updateError);
          // Don't fail the entire operation for this
        }
      } catch (updateError) {
        console.warn("Failed to update additional user fields:", updateError);
        // Don't fail the entire operation for this
      }
    }

    // Revalidate the users page to show the new user
    revalidatePath("/admin/users");

    return newUser;
  } catch (error) {
    console.error("User creation error:", error);

    // Handle validation errors specifically
    if (error && typeof error === "object" && "issues" in error) {
      const validationError = error as any;
      const errorMessage =
        validationError.issues?.map((issue: any) => issue.message).join(", ") ||
        "Validation failed";
      throw new Error(`Validation failed: ${errorMessage}`);
    }

    throw error instanceof Error
      ? error
      : new Error("An unexpected error occurred while creating user");
  }
}

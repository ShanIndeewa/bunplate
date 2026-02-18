"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, Loader2, Plus, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "moderator";
  emailVerified: boolean;
  banned: boolean;
  banReason?: string;
  banExpires?: string;
}

export function CreateUserForm() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<CreateUserData>({
    name: "",
    email: "",
    password: "",
    role: "user",
    emailVerified: false,
    banned: false,
    banReason: "",
    banExpires: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, password }));
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 1) {
      newErrors.name = "Name must be at least 1 character";
    } else if (formData.name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (formData.password.length > 128) {
      newErrors.password = "Password must be less than 128 characters";
    }

    // Validate ban reason if banned
    if (
      formData.banned &&
      formData.banReason &&
      formData.banReason.length > 500
    ) {
      newErrors.banReason = "Ban reason must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof CreateUserData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Prepare the request body exactly as Better Auth expects
      const requestBody = {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        name: formData.name.trim(),
        role: formData.role,
        data: {
          emailVerified: formData.emailVerified,
          banned: formData.banned,
          ...(formData.banned &&
            formData.banReason && { banReason: formData.banReason.trim() }),
          ...(formData.banned &&
            formData.banExpires && { banExpires: formData.banExpires }),
        },
      };

      console.log("Creating user with data:", {
        ...requestBody,
        password: "***",
      });

      // Make direct fetch request to the backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/auth/admin/create-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for authentication
          body: JSON.stringify(requestBody),
        }
      );

      console.log("Create user response:", {
        status: response.status,
        ok: response.ok,
      });

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;

        try {
          const errorData = await response.json();
          console.error("API Error Response:", errorData);

          if (errorData.error) {
            // Handle Better Auth specific errors
            if (errorData.error.code === "USER_ALREADY_EXISTS") {
              errorMessage = "A user with this email already exists";
            } else if (errorData.error.code === "INVALID_EMAIL") {
              errorMessage = "Please enter a valid email address";
            } else if (errorData.error.code === "WEAK_PASSWORD") {
              errorMessage =
                "Password is too weak. Please use a stronger password";
            } else if (errorData.error.code === "UNAUTHORIZED") {
              errorMessage = "You don't have permission to create users";
            } else {
              errorMessage = errorData.error.message || errorData.error;
            }
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData === "string") {
            errorMessage = errorData;
          }
        } catch (parseError) {
          // If we can't parse the error response, use the status text
          errorMessage = response.statusText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error.message || "Failed to create user");
      }

      const newUser = result.data || result;
      console.log("User created successfully:", newUser);

      toast.success("User created successfully!", {
        description: `${formData.name} has been added to the system with password set.`,
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
        emailVerified: false,
        banned: false,
        banReason: "",
        banExpires: "",
      });
      setErrors({});
      setOpen(false);
      setShowPassword(false);

      // Refresh the current page to show the new user
      router.refresh();
    } catch (error) {
      console.error("Error creating user:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to create user";

      toast.error("Failed to create user", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!isLoading) {
      setOpen(newOpen);
      if (!newOpen) {
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "user",
          emailVerified: false,
          banned: false,
          banReason: "",
          banExpires: "",
        });
        setErrors({});
        setShowPassword(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Create New User
          </DialogTitle>
          <DialogDescription>
            Add a new user to the system. Fill in the required information
            below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Enter user's full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              disabled={isLoading}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              disabled={isLoading}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Password *</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={isLoading}
                className={errors.password ? "border-red-500 pr-20" : "pr-20"}
              />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 w-7 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-3 w-3" />
                  ) : (
                    <Eye className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password}</p>
              )}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateRandomPassword}
                disabled={isLoading}
                className="ml-auto text-xs"
              >
                Generate Password
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Minimum 8 characters. Click "Generate Password" for a secure
              random password.
            </p>
          </div>

          {/* Role Field */}
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={formData.role}
              onValueChange={(value: "user" | "admin" | "moderator") =>
                handleInputChange("role", value)
              }
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select user role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Email Verified Switch */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>Email Verified</Label>
              <div className="text-sm text-muted-foreground">
                Mark the email as verified
              </div>
            </div>
            <Switch
              checked={formData.emailVerified}
              onCheckedChange={(checked: boolean) =>
                handleInputChange("emailVerified", checked)
              }
              disabled={isLoading}
            />
          </div>

          {/* Banned Switch */}
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
            <div className="space-y-0.5">
              <Label>Banned</Label>
              <div className="text-sm text-muted-foreground">
                Mark the user as banned
              </div>
            </div>
            <Switch
              checked={formData.banned}
              onCheckedChange={(checked: boolean) =>
                handleInputChange("banned", checked)
              }
              disabled={isLoading}
            />
          </div>

          {/* Ban Reason Field - Only show if banned is true */}
          {formData.banned && (
            <div className="space-y-2">
              <Label htmlFor="banReason">Ban Reason</Label>
              <Textarea
                id="banReason"
                placeholder="Enter reason for banning this user"
                value={formData.banReason}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleInputChange("banReason", e.target.value)}
                disabled={isLoading}
                rows={3}
                className={errors.banReason ? "border-red-500" : ""}
              />
              {errors.banReason && (
                <p className="text-sm text-red-600">{errors.banReason}</p>
              )}
            </div>
          )}

          {/* Ban Expiry Field - Only show if banned is true */}
          {formData.banned && (
            <div className="space-y-2">
              <Label htmlFor="banExpires">Ban Expiry Date</Label>
              <Input
                id="banExpires"
                type="datetime-local"
                value={formData.banExpires}
                onChange={(e) =>
                  handleInputChange("banExpires", e.target.value)
                }
                disabled={isLoading}
              />
              <div className="text-sm text-muted-foreground">
                Leave empty for permanent ban
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create User
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

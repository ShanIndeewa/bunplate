// "use client";

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Ban,
//   Check,
//   Edit,
//   Loader2,
//   MoreHorizontal,
//   Trash2,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "sonner";
// import { type UserWithStats } from "../schemas/user.schemas";

// interface UsersTableProps {
//   users: UserWithStats[];
// }

// interface BanUserData {
//   banReason: string;
//   banDuration: "1h" | "1d" | "7d" | "30d" | "permanent";
// }

// export function UsersTable({ users }: UsersTableProps) {
//   const [isLoading, setIsLoading] = useState<string | null>(null);
//   const [banDialogOpen, setBanDialogOpen] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<UserWithStats | null>(null);
//   const [banData, setBanData] = useState<BanUserData>({
//     banReason: "",
//     banDuration: "7d",
//   });
//   const router = useRouter();

//   const getBanExpiresIn = (duration: string): number | undefined => {
//     switch (duration) {
//       case "1h":
//         return 60 * 60; // 1 hour in seconds
//       case "1d":
//         return 60 * 60 * 24; // 1 day in seconds
//       case "7d":
//         return 60 * 60 * 24 * 7; // 7 days in seconds
//       case "30d":
//         return 60 * 60 * 24 * 30; // 30 days in seconds
//       case "permanent":
//         return undefined; // No expiration
//       default:
//         return 60 * 60 * 24 * 7; // Default to 7 days
//     }
//   };

//   const handleEdit = (userId: string) => {
//     console.log("Edit user:", userId);
//     // TODO: Implement edit user functionality
//     toast.info("Edit user functionality coming soon");
//   };

//   const handleBanClick = (user: UserWithStats) => {
//     setSelectedUser(user);
//     setBanDialogOpen(true);
//   };

//   const handleBanUser = async () => {
//     if (!selectedUser || !banData.banReason.trim()) {
//       toast.error("Please provide a ban reason");
//       return;
//     }

//     setIsLoading(selectedUser.id);
//     try {
//       const requestBody = {
//         userId: selectedUser.id,
//         banReason: banData.banReason.trim(),
//         ...(banData.banDuration !== "permanent" && {
//           banExpiresIn: getBanExpiresIn(banData.banDuration),
//         }),
//       };

//       console.log("Banning user with data:", requestBody);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/admin/ban-user`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (!response.ok) {
//         let errorMessage = `HTTP error! status: ${response.status}`;
//         try {
//           const errorData = await response.json();
//           errorMessage =
//             errorData.error?.message || errorData.message || errorMessage;
//         } catch {
//           errorMessage = response.statusText || errorMessage;
//         }
//         throw new Error(errorMessage);
//       }

//       const result = await response.json();
//       console.log("User banned successfully:", result);

//       toast.success("User banned successfully", {
//         description: `${selectedUser.name || selectedUser.email} has been banned.`,
//       });

//       // Reset form and close dialog
//       setBanData({ banReason: "", banDuration: "7d" });
//       setBanDialogOpen(false);
//       setSelectedUser(null);

//       // Refresh the page to show updated user status
//       router.refresh();
//     } catch (error) {
//       console.error("Error banning user:", error);
//       toast.error("Failed to ban user", {
//         description:
//           error instanceof Error
//             ? error.message
//             : "An unexpected error occurred",
//       });
//     } finally {
//       setIsLoading(null);
//     }
//   };

//   const handleUnban = async (user: UserWithStats) => {
//     setIsLoading(user.id);
//     try {
//       const requestBody = {
//         userId: user.id,
//       };

//       console.log("Unbanning user:", requestBody);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/admin/unban-user`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (!response.ok) {
//         let errorMessage = `HTTP error! status: ${response.status}`;
//         try {
//           const errorData = await response.json();
//           errorMessage =
//             errorData.error?.message || errorData.message || errorMessage;
//         } catch {
//           errorMessage = response.statusText || errorMessage;
//         }
//         throw new Error(errorMessage);
//       }

//       const result = await response.json();
//       console.log("User unbanned successfully:", result);

//       toast.success("User unbanned successfully", {
//         description: `${user.name || user.email} has been unbanned.`,
//       });

//       // Refresh the page to show updated user status
//       router.refresh();
//     } catch (error) {
//       console.error("Error unbanning user:", error);
//       toast.error("Failed to unban user", {
//         description:
//           error instanceof Error
//             ? error.message
//             : "An unexpected error occurred",
//       });
//     } finally {
//       setIsLoading(null);
//     }
//   };

//   const handleDeleteClick = (user: UserWithStats) => {
//     setSelectedUser(user);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteUser = async () => {
//     if (!selectedUser) return;

//     setIsLoading(selectedUser.id);
//     try {
//       const requestBody = {
//         userId: selectedUser.id,
//       };

//       console.log("Deleting user:", requestBody);

//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/admin/remove-user`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//           body: JSON.stringify(requestBody),
//         }
//       );

//       if (!response.ok) {
//         let errorMessage = `HTTP error! status: ${response.status}`;
//         try {
//           const errorData = await response.json();
//           errorMessage =
//             errorData.error?.message || errorData.message || errorMessage;
//         } catch {
//           errorMessage = response.statusText || errorMessage;
//         }
//         throw new Error(errorMessage);
//       }

//       const result = await response.json();
//       console.log("User deleted successfully:", result);

//       toast.success("User deleted successfully", {
//         description: `${selectedUser.name || selectedUser.email} has been removed from the system.`,
//       });

//       // Close dialog and reset state
//       setDeleteDialogOpen(false);
//       setSelectedUser(null);

//       // Refresh the page to remove the deleted user from the list
//       router.refresh();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       toast.error("Failed to delete user", {
//         description:
//           error instanceof Error
//             ? error.message
//             : "An unexpected error occurred",
//       });
//     } finally {
//       setIsLoading(null);
//     }
//   };

//   const getRoleBadgeVariant = (role: string) => {
//     switch (role?.toLowerCase()) {
//       case "admin":
//         return "destructive";
//       case "moderator":
//         return "default";
//       case "user":
//       default:
//         return "secondary";
//     }
//   };

//   const getRoleBadgeColor = (role: string) => {
//     switch (role?.toLowerCase()) {
//       case "admin":
//         return "bg-red-100 text-red-800 hover:bg-red-100";
//       case "moderator":
//         return "bg-blue-100 text-blue-800 hover:bg-blue-100";
//       case "user":
//       default:
//         return "bg-gray-100 text-gray-800 hover:bg-gray-100";
//     }
//   };

//   return (
//     <>
//       <div className="rounded-md border">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[300px]">User</TableHead>
//               <TableHead>Role</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-center">Posts</TableHead>
//               <TableHead className="text-center">Followers</TableHead>
//               <TableHead className="text-center">Following</TableHead>
//               <TableHead>Joined</TableHead>
//               <TableHead>Last Active</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {users.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={9} className="h-24 text-center">
//                   <div className="flex flex-col items-center gap-2">
//                     <div className="rounded-full bg-cyan-100 p-3">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="text-cyan-600"
//                       >
//                         <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
//                         <circle cx="12" cy="7" r="4" />
//                       </svg>
//                     </div>
//                     <p className="text-muted-foreground">No users found</p>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               users.map((user) => (
//                 <TableRow key={user.id} className="hover:bg-muted/50">
//                   {/* User Info */}
//                   <TableCell>
//                     <div className="flex items-center space-x-3">
//                       <Avatar className="h-8 w-8">
//                         <AvatarImage
//                           src={user.image || undefined}
//                           alt={user.name || user.email}
//                         />
//                         <AvatarFallback className="text-xs">
//                           {user.name?.[0]?.toUpperCase() ||
//                             user.email?.[0]?.toUpperCase() ||
//                             "U"}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div className="min-w-0 flex-1">
//                         <p className="text-sm font-medium text-gray-900 truncate">
//                           {user.name || "Unknown User"}
//                         </p>
//                         <p className="text-xs text-gray-500 truncate">
//                           {user.email}
//                         </p>
//                         <p className="text-xs text-gray-400">
//                           ID: {user.id.slice(0, 8)}...
//                         </p>
//                       </div>
//                     </div>
//                   </TableCell>

//                   {/* Role */}
//                   <TableCell>
//                     <Badge className={getRoleBadgeColor(user.role || "user")}>
//                       {user.role || "user"}
//                     </Badge>
//                   </TableCell>

//                   {/* Status */}
//                   <TableCell>
//                     <div className="flex flex-col gap-1">
//                       {user.banned ? (
//                         <Badge variant="destructive" className="w-fit">
//                           Banned
//                         </Badge>
//                       ) : user.emailVerified ? (
//                         <Badge
//                           variant="default"
//                           className="bg-green-100 text-green-800 hover:bg-green-100 w-fit"
//                         >
//                           Active
//                         </Badge>
//                       ) : (
//                         <Badge variant="outline" className="w-fit">
//                           Unverified
//                         </Badge>
//                       )}
//                       {user.banned && user.banReason && (
//                         <p
//                           className="text-xs text-red-600 truncate max-w-[100px]"
//                           title={user.banReason}
//                         >
//                           {user.banReason}
//                         </p>
//                       )}
//                     </div>
//                   </TableCell>

//                   {/* Posts */}
//                   <TableCell className="text-center">
//                     <span className="font-medium">{user.posts || 0}</span>
//                   </TableCell>

//                   {/* Followers */}
//                   <TableCell className="text-center">
//                     <span className="font-medium">
//                       {user.connections?.followers || 0}
//                     </span>
//                   </TableCell>

//                   {/* Following */}
//                   <TableCell className="text-center">
//                     <span className="font-medium">
//                       {user.connections?.following || 0}
//                     </span>
//                   </TableCell>

//                   {/* Joined Date */}
//                   <TableCell>
//                     <span className="text-sm">
//                       {new Date(user.createdAt).toLocaleDateString()}
//                     </span>
//                   </TableCell>

//                   {/* Last Active */}
//                   <TableCell>
//                     <span className="text-sm">
//                       {user.lastActive
//                         ? new Date(user.lastActive).toLocaleDateString()
//                         : "Never"}
//                     </span>
//                   </TableCell>

//                   {/* Actions */}
//                   <TableCell className="text-right">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           disabled={isLoading === user.id}
//                         >
//                           {isLoading === user.id ? (
//                             <Loader2 className="h-4 w-4 animate-spin" />
//                           ) : (
//                             <MoreHorizontal className="h-4 w-4" />
//                           )}
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem onClick={() => handleEdit(user.id)}>
//                           <Edit className="h-4 w-4 mr-2" />
//                           Edit User
//                         </DropdownMenuItem>
//                         {user.banned ? (
//                           <DropdownMenuItem
//                             onClick={() => handleUnban(user)}
//                             disabled={isLoading === user.id}
//                           >
//                             <Check className="h-4 w-4 mr-2" />
//                             Unban User
//                           </DropdownMenuItem>
//                         ) : (
//                           <DropdownMenuItem
//                             onClick={() => handleBanClick(user)}
//                             disabled={isLoading === user.id}
//                           >
//                             <Ban className="h-4 w-4 mr-2" />
//                             Ban User
//                           </DropdownMenuItem>
//                         )}
//                         <DropdownMenuSeparator />
//                         <DropdownMenuItem
//                           onClick={() => handleDeleteClick(user)}
//                           className="text-red-600"
//                           disabled={isLoading === user.id}
//                         >
//                           <Trash2 className="h-4 w-4 mr-2" />
//                           Delete User
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Ban User Dialog */}
//       <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <Ban className="h-5 w-5 text-red-600" />
//               Ban User
//             </DialogTitle>
//             <DialogDescription>
//               Ban {selectedUser?.name || selectedUser?.email} from the platform.
//               This action can be reversed later.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="banReason">Ban Reason *</Label>
//               <Textarea
//                 id="banReason"
//                 placeholder="Enter the reason for banning this user"
//                 value={banData.banReason}
//                 onChange={(e) =>
//                   setBanData((prev) => ({ ...prev, banReason: e.target.value }))
//                 }
//                 rows={3}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="banDuration">Ban Duration</Label>
//               <Select
//                 value={banData.banDuration}
//                 onValueChange={(
//                   value: "1h" | "1d" | "7d" | "30d" | "permanent"
//                 ) => setBanData((prev) => ({ ...prev, banDuration: value }))}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select ban duration" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="1h">1 Hour</SelectItem>
//                   <SelectItem value="1d">1 Day</SelectItem>
//                   <SelectItem value="7d">7 Days</SelectItem>
//                   <SelectItem value="30d">30 Days</SelectItem>
//                   <SelectItem value="permanent">Permanent</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setBanDialogOpen(false);
//                 setBanData({ banReason: "", banDuration: "7d" });
//               }}
//               disabled={isLoading === selectedUser?.id}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleBanUser}
//               disabled={
//                 !banData.banReason.trim() || isLoading === selectedUser?.id
//               }
//             >
//               {isLoading === selectedUser?.id ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Banning...
//                 </>
//               ) : (
//                 <>
//                   <Ban className="mr-2 h-4 w-4" />
//                   Ban User
//                 </>
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Delete User Dialog */}
//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle className="flex items-center gap-2">
//               <Trash2 className="h-5 w-5 text-red-600" />
//               Delete User
//             </DialogTitle>
//             <DialogDescription>
//               Are you sure you want to permanently delete{" "}
//               {selectedUser?.name || selectedUser?.email}? This action cannot be
//               undone and will remove all associated data.
//             </DialogDescription>
//           </DialogHeader>

//           <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg
//                   className="h-5 w-5 text-yellow-400"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
//                 <div className="mt-2 text-sm text-yellow-700">
//                   <p>This will permanently delete:</p>
//                   <ul className="list-disc list-inside mt-1">
//                     <li>User account and profile</li>
//                     <li>All posts and comments</li>
//                     <li>All connections and followers</li>
//                     <li>All associated data</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setDeleteDialogOpen(false);
//                 setSelectedUser(null);
//               }}
//               disabled={isLoading === selectedUser?.id}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleDeleteUser}
//               disabled={isLoading === selectedUser?.id}
//             >
//               {isLoading === selectedUser?.id ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Deleting...
//                 </>
//               ) : (
//                 <>
//                   <Trash2 className="mr-2 h-4 w-4" />
//                   Delete Permanently
//                 </>
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Ban,
  Check,
  Edit,
  Eye,
  EyeOff,
  Key,
  Loader2,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { type UserWithStats } from "../schemas/user.schemas";

interface UsersTableProps {
  users: UserWithStats[];
}

interface BanUserData {
  banReason: string;
  banDuration: "1h" | "1d" | "7d" | "30d" | "permanent";
}

interface ChangePasswordData {
  newPassword: string;
  confirmPassword: string;
}

export function UsersTable({ users }: UsersTableProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [banDialogOpen, setBanDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithStats | null>(null);
  const [banData, setBanData] = useState<BanUserData>({
    banReason: "",
    banDuration: "7d",
  });
  const [passwordData, setPasswordData] = useState<ChangePasswordData>({
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const getBanExpiresIn = (duration: string): number | undefined => {
    switch (duration) {
      case "1h":
        return 60 * 60; // 1 hour in seconds
      case "1d":
        return 60 * 60 * 24; // 1 day in seconds
      case "7d":
        return 60 * 60 * 24 * 7; // 7 days in seconds
      case "30d":
        return 60 * 60 * 24 * 30; // 30 days in seconds
      case "permanent":
        return undefined; // No expiration
      default:
        return 60 * 60 * 24 * 7; // Default to 7 days
    }
  };

  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPasswordData((prev) => ({
      ...prev,
      newPassword: password,
      confirmPassword: password,
    }));
  };

  const handleEdit = (userId: string) => {
    console.log("Edit user:", userId);
    // TODO: Implement edit user functionality
    toast.info("Edit user functionality coming soon");
  };

  const handleBanClick = (user: UserWithStats) => {
    setSelectedUser(user);
    setBanDialogOpen(true);
  };

  const handlePasswordClick = (user: UserWithStats) => {
    setSelectedUser(user);
    setPasswordDialogOpen(true);
  };

  const handleChangePassword = async () => {
    if (!selectedUser) return;

    // Validate passwords
    if (!passwordData.newPassword.trim()) {
      toast.error("Please enter a new password");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(selectedUser.id);
    try {
      const requestBody = {
        userId: selectedUser.id,
        newPassword: passwordData.newPassword,
      };

      console.log("Changing password for user:", { userId: selectedUser.id });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/admin/set-user-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.error?.message || errorData.message || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("Password changed successfully:", result);

      toast.success("Password changed successfully", {
        description: `Password for ${selectedUser.name || selectedUser.email} has been updated.`,
      });

      // Reset form and close dialog
      setPasswordData({ newPassword: "", confirmPassword: "" });
      setPasswordDialogOpen(false);
      setSelectedUser(null);
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleBanUser = async () => {
    if (!selectedUser || !banData.banReason.trim()) {
      toast.error("Please provide a ban reason");
      return;
    }

    setIsLoading(selectedUser.id);
    try {
      const requestBody = {
        userId: selectedUser.id,
        banReason: banData.banReason.trim(),
        ...(banData.banDuration !== "permanent" && {
          banExpiresIn: getBanExpiresIn(banData.banDuration),
        }),
      };

      console.log("Banning user with data:", requestBody);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/admin/ban-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.error?.message || errorData.message || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("User banned successfully:", result);

      toast.success("User banned successfully", {
        description: `${selectedUser.name || selectedUser.email} has been banned.`,
      });

      // Reset form and close dialog
      setBanData({ banReason: "", banDuration: "7d" });
      setBanDialogOpen(false);
      setSelectedUser(null);

      // Refresh the page to show updated user status
      router.refresh();
    } catch (error) {
      console.error("Error banning user:", error);
      toast.error("Failed to ban user", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleUnban = async (user: UserWithStats) => {
    setIsLoading(user.id);
    try {
      const requestBody = {
        userId: user.id,
      };

      console.log("Unbanning user:", requestBody);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/admin/unban-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.error?.message || errorData.message || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("User unbanned successfully:", result);

      toast.success("User unbanned successfully", {
        description: `${user.name || user.email} has been unbanned.`,
      });

      // Refresh the page to show updated user status
      router.refresh();
    } catch (error) {
      console.error("Error unbanning user:", error);
      toast.error("Failed to unban user", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleDeleteClick = (user: UserWithStats) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setIsLoading(selectedUser.id);
    try {
      const requestBody = {
        userId: selectedUser.id,
      };

      console.log("Deleting user:", requestBody);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/admin/remove-user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.error?.message || errorData.message || errorMessage;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log("User deleted successfully:", result);

      toast.success("User deleted successfully", {
        description: `${selectedUser.name || selectedUser.email} has been removed from the system.`,
      });

      // Close dialog and reset state
      setDeleteDialogOpen(false);
      setSelectedUser(null);

      // Refresh the page to remove the deleted user from the list
      router.refresh();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "destructive";
      case "moderator":
        return "default";
      case "user":
      default:
        return "secondary";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "moderator":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "user":
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Posts</TableHead>
              <TableHead className="text-center">Followers</TableHead>
              <TableHead className="text-center">Following</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <div className="rounded-full bg-cyan-100 p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-cyan-600"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <p className="text-muted-foreground">No users found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  {/* User Info */}
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.image || undefined}
                          alt={user.name || user.email}
                        />
                        <AvatarFallback className="text-xs">
                          {user.name?.[0]?.toUpperCase() ||
                            user.email?.[0]?.toUpperCase() ||
                            "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.name || "Unknown User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                        <p className="text-xs text-gray-400">
                          ID: {user.id.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    <Badge className={getRoleBadgeColor(user.role || "user")}>
                      {user.role || "user"}
                    </Badge>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {user.banned ? (
                        <Badge variant="destructive" className="w-fit">
                          Banned
                        </Badge>
                      ) : user.emailVerified ? (
                        <Badge
                          variant="default"
                          className="bg-green-100 text-green-800 hover:bg-green-100 w-fit"
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="w-fit">
                          Unverified
                        </Badge>
                      )}
                      {user.banned && user.banReason && (
                        <p
                          className="text-xs text-red-600 truncate max-w-[100px]"
                          title={user.banReason}
                        >
                          {user.banReason}
                        </p>
                      )}
                    </div>
                  </TableCell>

                  {/* Posts */}
                  <TableCell className="text-center">
                    <span className="font-medium">{user.posts || 0}</span>
                  </TableCell>

                  {/* Followers */}
                  <TableCell className="text-center">
                    <span className="font-medium">
                      {user.connections?.followers || 0}
                    </span>
                  </TableCell>

                  {/* Following */}
                  <TableCell className="text-center">
                    <span className="font-medium">
                      {user.connections?.following || 0}
                    </span>
                  </TableCell>

                  {/* Joined Date */}
                  <TableCell>
                    <span className="text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </TableCell>

                  {/* Last Active */}
                  <TableCell>
                    <span className="text-sm">
                      {user.lastActive
                        ? new Date(user.lastActive).toLocaleDateString()
                        : "Never"}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={isLoading === user.id}
                        >
                          {isLoading === user.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <MoreHorizontal className="h-4 w-4" />
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(user.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handlePasswordClick(user)}
                          disabled={isLoading === user.id}
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Change Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.banned ? (
                          <DropdownMenuItem
                            onClick={() => handleUnban(user)}
                            disabled={isLoading === user.id}
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Unban User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => handleBanClick(user)}
                            disabled={isLoading === user.id}
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Ban User
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(user)}
                          className="text-red-600"
                          disabled={isLoading === user.id}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-blue-600" />
              Change User Password
            </DialogTitle>
            <DialogDescription>
              Set a new password for {selectedUser?.name || selectedUser?.email}
              . The user will need to use this new password to log in.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password *</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  className="pr-20"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum 8 characters required
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="pr-20"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-3 w-3" />
                    ) : (
                      <Eye className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
              {passwordData.newPassword &&
                passwordData.confirmPassword &&
                passwordData.newPassword !== passwordData.confirmPassword && (
                  <p className="text-xs text-red-600">Passwords do not match</p>
                )}
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateRandomPassword}
                className="text-xs"
              >
                Generate Random Password
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setPasswordDialogOpen(false);
                setPasswordData({ newPassword: "", confirmPassword: "" });
                setShowPassword(false);
                setShowConfirmPassword(false);
              }}
              disabled={isLoading === selectedUser?.id}
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              disabled={
                !passwordData.newPassword.trim() ||
                !passwordData.confirmPassword.trim() ||
                passwordData.newPassword !== passwordData.confirmPassword ||
                passwordData.newPassword.length < 8 ||
                isLoading === selectedUser?.id
              }
            >
              {isLoading === selectedUser?.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Changing...
                </>
              ) : (
                <>
                  <Key className="mr-2 h-4 w-4" />
                  Change Password
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban User Dialog */}
      <Dialog open={banDialogOpen} onOpenChange={setBanDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-red-600" />
              Ban User
            </DialogTitle>
            <DialogDescription>
              Ban {selectedUser?.name || selectedUser?.email} from the platform.
              This action can be reversed later.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="banReason">Ban Reason *</Label>
              <Textarea
                id="banReason"
                placeholder="Enter the reason for banning this user"
                value={banData.banReason}
                onChange={(e) =>
                  setBanData((prev) => ({ ...prev, banReason: e.target.value }))
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="banDuration">Ban Duration</Label>
              <Select
                value={banData.banDuration}
                onValueChange={(
                  value: "1h" | "1d" | "7d" | "30d" | "permanent"
                ) => setBanData((prev) => ({ ...prev, banDuration: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select ban duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setBanDialogOpen(false);
                setBanData({ banReason: "", banDuration: "7d" });
              }}
              disabled={isLoading === selectedUser?.id}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleBanUser}
              disabled={
                !banData.banReason.trim() || isLoading === selectedUser?.id
              }
            >
              {isLoading === selectedUser?.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Banning...
                </>
              ) : (
                <>
                  <Ban className="mr-2 h-4 w-4" />
                  Ban User
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-600" />
              Delete User
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete{" "}
              {selectedUser?.name || selectedUser?.email}? This action cannot be
              undone and will remove all associated data.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Warning</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>This will permanently delete:</p>
                  <ul className="list-disc list-inside mt-1">
                    <li>User account and profile</li>
                    <li>All posts and comments</li>
                    <li>All connections and followers</li>
                    <li>All associated data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteDialogOpen(false);
                setSelectedUser(null);
              }}
              disabled={isLoading === selectedUser?.id}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              disabled={isLoading === selectedUser?.id}
            >
              {isLoading === selectedUser?.id ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Permanently
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

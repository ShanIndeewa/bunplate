import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ban, Check, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { type UserWithStats } from "../schemas/user.schemas";

interface UserCardProps {
  user: UserWithStats;
}

export function UserCard({ user }: UserCardProps) {
  const handleEdit = () => {
    console.log("Edit user:", user.id);
  };

  const handleDelete = () => {
    console.log("Delete user:", user.id);
  };

  const handleBan = () => {
    console.log("Ban user:", user.id);
  };

  const handleUnban = () => {
    console.log("Unban user:", user.id);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "moderator":
        return "bg-blue-100 text-blue-800";
      case "user":
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={user.image || undefined}
                alt={user.name || user.email}
              />
              <AvatarFallback>
                {user.name?.[0]?.toUpperCase() ||
                  user.email?.[0]?.toUpperCase() ||
                  "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900">
                {user.name || "Unknown User"}
              </h3>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-400">ID: {user.id}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Role Badge */}
            <Badge className={getRoleBadgeColor(user.role || "user")}>
              {user.role || "user"}
            </Badge>

            {/* Status Badge */}
            {user.banned ? (
              <Badge variant="destructive">Banned</Badge>
            ) : user.emailVerified ? (
              <Badge variant="default" className="bg-green-100 text-green-800">
                Active
              </Badge>
            ) : (
              <Badge variant="outline">Unverified</Badge>
            )}

            {/* Actions Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </DropdownMenuItem>
                {user.banned ? (
                  <DropdownMenuItem onClick={handleUnban}>
                    <Check className="h-4 w-4 mr-2" />
                    Unban User
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={handleBan}>
                    <Ban className="h-4 w-4 mr-2" />
                    Ban User
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <p className="font-medium text-gray-900">
              {user.connections?.followers || 0}
            </p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-900">
              {user.connections?.following || 0}
            </p>
            <p className="text-gray-500">Following</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-900">{user.posts || 0}</p>
            <p className="text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-900">
              {user.lastActive
                ? new Date(user.lastActive).toLocaleDateString()
                : "Never"}
            </p>
            <p className="text-gray-500">Last Active</p>
          </div>
        </div>

        {user.banned && user.banReason && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-800">
              <span className="font-medium">Ban Reason:</span> {user.banReason}
            </p>
            {user.banExpires && (
              <p className="text-xs text-red-600 mt-1">
                Expires: {new Date(user.banExpires).toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
          <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          {user.updatedAt && (
            <span>Updated {new Date(user.updatedAt).toLocaleDateString()}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

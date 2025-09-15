"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Loader2, User, Settings, LogOut } from "lucide-react";

export default function UserDropdown({ size = "small", className }) {
  const { currentUser, logout, loading } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [navigationLoading, setNavigationLoading] = useState(null);

  // Show loading skeleton if auth is loading
  if (loading) {
    return (
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "flex items-center gap-2 rounded-full animate-pulse",
            size === "large" ? "px-2 py-1.5 rounded-lg" : "h-10 w-10"
          )}
        >
          <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>

          {size === "large" && (
            <div className="flex flex-col gap-1">
              <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-muted rounded animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  const userEmail = currentUser.email || "user@example.com";
  const userName = currentUser.displayName || userEmail.split("@")[0];
  const userInitials = userName.substring(0, 2).toUpperCase();

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleNavigation = async (path, key) => {
    setNavigationLoading(key);
    try {
      await router.push(path);
    } catch (error) {
      console.error("Navigation failed:", error);
    } finally {
      setNavigationLoading(null);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "relative h-10 w-10 rounded-full p-0 transition-all hover:bg-accent",
            size === "large" && "h-auto w-auto px-2 py-1.5 rounded-lg",
            className
          )}
          aria-label="User menu"
          disabled={logoutLoading}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentUser.photoURL} alt={userName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            {size === "large" && (
              <div className="flex flex-col items-start text-left">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-xs text-muted-foreground">
                  {userEmail}
                </span>
              </div>
            )}
          </div>

          {logoutLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* User info section with loading shimmer effect */}
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={currentUser.photoURL} alt={userName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            <span className="text-sm font-medium">{userName}</span>
            <span className="text-xs text-muted-foreground">{userEmail}</span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => handleNavigation("/profile", "profile")}
          className="cursor-pointer"
          disabled={navigationLoading === "profile" || logoutLoading}
        >
          <div className="flex items-center gap-2 w-full">
            {navigationLoading === "profile" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <User className="h-4 w-4" />
            )}
            <span>Profile</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleNavigation("/settings", "settings")}
          className="cursor-pointer"
          disabled={navigationLoading === "settings" || logoutLoading}
        >
          <div className="flex items-center gap-2 w-full">
            {navigationLoading === "settings" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Settings className="h-4 w-4" />
            )}
            <span>Settings</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-500 focus:text-red-500"
          disabled={logoutLoading || navigationLoading}
        >
          <div className="flex items-center gap-2 w-full">
            {logoutLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="h-4 w-4" />
            )}
            <span>{logoutLoading ? "Signing out..." : "Logout"}</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

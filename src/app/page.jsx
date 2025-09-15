"use client";

import { Button } from "@/components/ui/button";
import UserDropdown from "@/components/user-dropdown";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";

export default function Home() {
  const { currentUser } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen gap-4">
      {currentUser ? (
        <>
          <UserDropdown />
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </>
      ) : (
        <>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </>
      )}
    </div>
  );
}

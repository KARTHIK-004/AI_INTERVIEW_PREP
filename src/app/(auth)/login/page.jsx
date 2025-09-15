import { LoginForm } from "@/features/auth/components/forms/login-form";
import AuthRedirect from "@/features/auth/components/auth-redirect";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-4">
      <AuthRedirect />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <LoginForm />
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline hover:text-primary/80">
          Sign up
        </Link>
      </div>
    </div>
  );
}

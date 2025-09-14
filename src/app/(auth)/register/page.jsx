import { RegisterForm } from "@/features/auth/components/forms/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance pb-4">
          Enter your details below to create your account
        </p>
      </div>
      <RegisterForm />
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-primary/80">
          Sign in
        </Link>
      </div>
    </div>
  );
}

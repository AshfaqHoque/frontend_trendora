"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = (id: number) => {
    alert("Login successful!");
    router.push(`/profile/${id}`);
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h1 className="text-center mb-6 text-2xl font-bold text-gray-900">
          Login to <span className="text-blue-600">Trendora</span>
        </h1>
        <p className="text-center text-gray-600 text-sm mb-8">
          Welcome back! Please enter your details to continue.
        </p>

        {/* Form */}
        <LoginForm onSuccess={handleLoginSuccess} />

        {/* Links */}
        <div className="text-center text-sm text-gray-600 mt-6">
          <Link
            href="/forgot-password"
            className="text-blue-600 hover:text-blue-700 font-medium mr-4"
          >
            Forgot Password?
          </Link>
          <span className="text-gray-400">|</span>
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-700 font-medium ml-4"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

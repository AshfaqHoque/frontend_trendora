"use client";

import { useState } from "react";
import { loginSchema } from "@/lib/validation";
import { loginAdmin } from "@/lib/api";

interface LoginFormProps {
  onSuccess: (id: number) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      setError(firstError.message);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await loginAdmin(validation.data);
      onSuccess(result.id);
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data?.message || "Login failed");
      } else if (err.request) {
        setError("Unable to connect to server.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Email */}
      <div className="mb-5">
        <label className="block mb-1 font-medium text-gray-800">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          className="w-full px-3 py-2 text-sm text-gray-800 border rounded border-gray-400"
          placeholder="Enter your email"
        />
      </div>

      {/* Password */}
      <div className="mb-6">
        <label className="block mb-1 font-medium text-gray-800">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError("");
          }}
          className="w-full px-3 py-2 text-sm text-gray-800 border rounded border-gray-400"
          placeholder="Enter your password"
        />
      </div>

      {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 text-white rounded font-medium mb-4 ${
          isSubmitting
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

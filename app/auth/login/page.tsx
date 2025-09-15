"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/validation";
import { loginAdmin } from "@/lib/api";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

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
      alert(result.message);
      const username = email.split('@')[0];
      router.push(`/profile/${username}`);

    } catch (error: any) {
      setIsSubmitting(false);
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Registration failed';
        setError(errorMessage);
      } else if (error.request) {
        setError('Unable to connect to server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

return (
  <div className="max-w-md mx-auto mt-12 p-5 border border-gray-300 rounded-lg bg-gray-50">
    
    <h1 className="text-center mb-8 text-gray-800 text-xl font-semibold">
      Login to QuickShopBD
    </h1>

    <form onSubmit={handleSubmit} noValidate>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-1 font-medium text-gray-800">
          Email Address
        </label>
        <input 
          type="text" 
          id="email" 
          name="email" 
          value={email} 
          onChange={handleChangeEmail} 
          className={`w-full px-3 py-2 text-sm text-gray-800 border rounded box-border ${
            error && error.includes('email') 
              ? 'border-red-600 border-2' 
              : 'border-gray-400'
          }`}
          placeholder="Enter your email"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block mb-1 font-medium text-gray-800">
          Password
        </label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={password} 
          onChange={handleChangePassword} 
          className={`w-full px-3 py-2 text-sm text-gray-800 border rounded box-border ${
            error && error.includes('Password') 
              ? 'border-red-600 border-2' 
              : 'border-gray-400'
          }`}
          placeholder="Enter your password"
        />
      </div>

      {error && ( 
        <div className="text-red-600 text-xs mb-4 block">
          {error}
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={`w-full py-3 text-white rounded font-medium mb-4 ${
          isSubmitting 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
        }`}
      >
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>

      <div className="text-center text-sm text-gray-600">
        <Link href="/forgot-password" className="text-blue-600 no-underline mr-4 hover:text-blue-700">
          Forgot Password?
        </Link>
        <span>|</span>
        <Link href="/signup" className="text-blue-600 no-underline ml-4 hover:text-blue-700">
          Create Account
        </Link>
      </div>

    </form>
  </div>
);
}
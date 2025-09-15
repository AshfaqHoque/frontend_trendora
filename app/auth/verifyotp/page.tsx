"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmailSchema } from "@/lib/validation";
import { verifyEmail } from "@/lib/api";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailParam = searchParams.get('email') || '';
  setEmail(emailParam);

  const handleChange = (setter: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const validation = verifyEmailSchema.safeParse({ 
      email: email.trim(), 
      otp: otp.trim() 
    });

    if (!validation.success) {
      const firstError = validation.error.issues[0];
      setError(firstError.message);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await verifyEmail(validation.data);
      alert(result.message || 'Email verified successfully!');
      router.push('/');
      
    } catch (error: any) {
      setIsSubmitting(false);

      if (error.response) {
        const errorMessage = error.response.data?.message || 'Verification failed';
        setError(errorMessage);
      } else if (error.request) {
        setError('Unable to connect to server. Please check your connection.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

//   const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
//     if (value.length <= 6) {
//       setOtp(value);
//       if (error) setError('');
//     }
//   };

  return (
    <div className="max-w-md mx-auto mt-12 p-5 border border-gray-300 rounded-lg bg-gray-50">
      <h1 className="text-center mb-8 text-gray-800 text-xl font-semibold">
        Verify Your Email
      </h1>

      <p className="text-sm text-gray-600 mb-6 text-center">
        We've sent a verification code to your email address. Please enter the code below to complete your registration.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-1 font-medium text-gray-800">
            Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} 
            onChange={handleChange(setEmail)}
            className={`w-full px-3 py-2 text-sm text-gray-800 border rounded box-border`}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="otp" className="block mb-1 font-medium text-gray-800">
            Verification Code
          </label>
          <input 
            type="text" 
            id="otp" 
            name="otp" 
            value={otp} 
            onChange={handleChange(setOtp)}
            className={`w-full px-3 py-2 text-sm text-gray-800 border rounded box-border text-center tracking-wider`}
            placeholder="000"
            maxLength={3}
            inputMode="numeric"
            pattern="[0-9]*"
          />
          <small className="text-xs text-gray-600 mt-1 block">
            Enter the 3-digit code sent to your email
          </small>
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
          {isSubmitting ? 'Verifying...' : 'Verify Email'}
        </button>

        <div className="text-center text-sm text-gray-600">
          <Link href="/signup" className="text-blue-600 no-underline mr-4 hover:text-blue-700">
            Back to Sign Up
          </Link>
          {/* <Link href="/login" className="text-blue-600 no-underline hover:text-blue-700">
            Already verified? Login
          </Link> */}
        </div>
      </form>
    </div>
  );
}
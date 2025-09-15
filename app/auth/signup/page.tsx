"use client";

import { useState } from "react";
import Link from "next/link";
import { signupSchema } from "@/lib/validation";
import { registerAdmin } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (setter: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const validation = signupSchema.safeParse({ 
      fullName, 
      email, 
      age: parseInt(age), 
      password, 
      linkedInUrl 
    });

    if (!validation.success) {
      const firstError = validation.error.issues[0];
      setError(firstError.message);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await registerAdmin(validation.data);
      alert(result.message);
      router.push(`/auth/verifyotp?email=${encodeURIComponent(email)}`);

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
        Create Admin Account
      </h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-5">
          <label htmlFor="fullName" className="block mb-1 font-medium text-gray-800">
            Full Name
          </label>
          <input 
            type="text" 
            id="fullName" 
            name="fullName" 
            value={fullName} 
            onChange={handleChange(setFullName)}
            className={`w-full px-3 py-2 text-sm text-gray-800 border rounded ${
              error && (error.includes('name') || error.includes('Name')) 
                ? 'border-red-600 border-2' 
                : 'border-gray-400'
            } box-border`}
            placeholder="Enter your full name"
          />
        </div>

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
            className={`w-full px-3 py-2 text-sm text-gray-800 border rounded ${
              error && error.toLowerCase().includes('email') 
                ? 'border-red-600 border-2' 
                : 'border-gray-400'
            } box-border`}
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="age" className="block mb-1 font-medium text-gray-800">
            Age
          </label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            value={age} 
            onChange={handleChange(setAge)}
            className={`w-full px-3 py-2 text-sm text-gray-800 border rounded ${
              error && error.toLowerCase().includes('age') 
                ? 'border-red-600 border-2' 
                : 'border-gray-400'
            } box-border`}
            placeholder="Enter your age"
            min="20"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-1 font-medium text-gray-800">
            Password
          </label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password} 
            onChange={handleChange(setPassword)}
            className={`w-full px-3 py-2 text-sm text-gray-800 border rounded ${
              error && error.toLowerCase().includes('password') && !error.includes('match') 
                ? 'border-red-600 border-2' 
                : 'border-gray-400'
            } box-border`}
            placeholder="Enter your password"
          />
          <small className="text-xs text-gray-600 mt-1 block">
            Must contain at least one special character (@, #, $, &)
          </small>
        </div>

        <div className="mb-6">
          <label htmlFor="linkedInUrl" className="block mb-1 font-medium text-gray-800">
            LinkedIn Profile URL
          </label>
          <input 
            type="url" 
            id="linkedInUrl" 
            name="linkedInUrl" 
            value={linkedInUrl} 
            onChange={handleChange(setLinkedInUrl)}
            className={`w-full px-3 py-2 text-sm text-gray-800 border rounded ${
              error && (error.includes('LinkedIn') || error.includes('url')) 
                ? 'border-red-600 border-2' 
                : 'border-gray-400'
            } box-border`}
            placeholder="https://www.linkedin.com/in/username/"
          />
          <small className="text-xs text-gray-600 mt-1 block">
            Enter your LinkedIn profile URL
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
          {isSubmitting ? 'Creating Account...' : 'Create Admin Account'}
        </button>

        <div className="text-center text-sm text-gray-600">
          <Link href="/login" className="text-blue-600 no-underline mr-4 hover:text-blue-700">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
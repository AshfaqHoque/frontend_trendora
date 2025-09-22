import { getUser } from "@/lib/auth";
import Link from "next/link";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="bg-[#131921] border-b border-gray-800 shadow-sm">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-5 py-3">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-white hover:text-orange-500 transition-colors"
        >
          Trendora
        </Link>

        {/* Search Bar */}
        <div className="flex flex-1 max-w-lg mx-5">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 rounded-l-md border border-gray-700 bg-gray-900 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          />
          <button className="px-4 py-2 bg-orange-500 text-white rounded-r-md hover:bg-orange-600 transition-colors text-sm font-medium">
            Search
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link
            href="/help"
            className="text-gray-300 text-sm hover:text-white transition-colors"
          >
            Help & Support
          </Link>
          <Link
            href="/seller"
            className="text-gray-300 text-sm hover:text-white transition-colors"
          >
            Become a Seller
          </Link>

          {/* User Auth Section */}
          {user?.email ? (
            <Link
              href={`/profile/${user.id}`}
              className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium hover:bg-blue-700 transition-colors"
              title="Go to Profile"
            >
              {user.email[0].toUpperCase()}
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium px-3 py-1 border border-gray-700 bg-orange-500 rounded hover:bg-orange-600 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="text-sm font-medium px-3 py-1 border border-gray-700 bg-orange-500 rounded hover:bg-orange-600 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}

          <Link
            href="/cart"
            className="text-sm font-medium px-3 py-1 bg-blue-900 rounded hover:bg-blue-800 transition-colors"
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}

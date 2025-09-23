import { getUser } from "@/lib/auth";
import Link from "next/link";
import SimpleSearch from "@/components/search";
import SearchBar from "@/components/search";

export default async function Header() {
  const user = await getUser();

  return (
    <header className="bg-[#131921] text-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center px-4 py-2 space-x-4">
          
          {/* Logo Section */}
          <Link
            href="/"
            className="flex-shrink-0 px-2 py-1 hover:border border-white rounded transition-all duration-200"
            aria-label="Trendora Home"
          >
            <div className="text-2xl font-bold">Trendora</div>
            <div className="text-xs text-gray-300 -mt-1">.com</div>
          </Link>

          {/* Search Section */}
          <SearchBar />

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            
            {/* Help */}
            <Link
              href="/help"
              className="hidden lg:block px-2 py-1 hover:border border-white rounded transition-all duration-200"
            >
              <div className="text-xs text-gray-300">Customer</div>
              <div className="text-sm font-bold">Service</div>
            </Link>

            {/* User Account + Seller */}
            {user?.email ? (
              // If user is logged in
              <Link
                href={`/profile/${user.id}`}
                className="px-2 py-1 hover:border border-white rounded transition-all duration-200"
                title={`Welcome, ${user.email}`}
              >
                <div className="text-xs text-gray-300">
                  Hello, {user.email.split("@")[0]}
                </div>
                <div className="text-sm font-bold flex items-center">
                  Account
                </div>
              </Link>
            ) : (
              <div className="flex items-center space-x-1">
                <Link
                  href="/auth/login"
                  className="px-2 py-1 hover:border border-white rounded transition-all duration-200"
                >
                  <div className="text-xs text-gray-300">Hello, sign in</div>
                  <div className="text-sm font-bold flex items-center">
                    Account
                  </div>
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-2 py-1 hover:border border-white rounded transition-all duration-200"
                >
                  <div className="text-xs text-gray-300">New customer?</div>
                  <div className="text-sm font-bold text-[#febd69]">Start here</div>
                </Link>

                {/* Become a Seller  */}
                <Link
                  href="/seller"
                  className="hidden lg:block px-2 py-1 hover:border border-white rounded transition-all duration-200"
                >
                  <div className="text-xs text-gray-300">Become</div>
                  <div className="text-sm font-bold">a Seller</div>
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}
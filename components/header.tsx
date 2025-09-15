import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#131921] border-b border-black py-2">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-5">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-white no-underline"
        >
          QuickShopBD
        </Link>

        {/* Search Bar */}
        <div className="flex items-center gap-5">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="px-3 py-2 border border-gray-300 rounded-l-md w-[300px] text-sm"
            />
            <button className="px-3 py-2 bg-orange-500 text-white rounded-r-md cursor-pointer">
              Search
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-5">
          <Link href="/help" className="text-white text-sm no-underline">
            HELP & SUPPORT
          </Link>
          <Link href="/seller" className="text-white text-sm no-underline">
            BECOME A SELLER
          </Link>
          <Link
            href="/auth/login"
            className="text-white text-sm font-medium no-underline"
          >
            LOGIN
          </Link>
          <Link
            href="/auth/signup"
            className="text-white text-sm font-medium px-3 py-1 border border-black bg-[#b16316] rounded no-underline"
          >
            SIGN UP
          </Link>
          <Link
            href="/cart"
            className="text-white text-sm font-medium px-3 py-1 bg-[#102550] rounded no-underline"
          >
            CART
          </Link>
        </nav>
      </div>
    </header>
  );
}

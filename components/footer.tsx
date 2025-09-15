import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#222] text-[#eee] p-5 mt-8">
      <div className="flex justify-between flex-wrap max-w-[1000px] mx-auto">
        
        {/* Left Section */}
        <div className="flex-1 min-w-[200px] m-2.5">
          <h3 className="text-lg font-semibold">QuickShopBD</h3>
          <p>Bashundhara R/A, Bangladesh</p>
        </div>

        {/* Links Section */}
        <div className="flex-1 min-w-[200px] m-2.5">
          <h4 className="text-base font-semibold mb-2">Links</h4>
          <ul className="list-none p-0 space-y-1">
            <li>
              <Link href="/products" className="text-[#9acdff] no-underline hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-[#9acdff] no-underline hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[#9acdff] no-underline hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-[#9acdff] no-underline hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="flex-1 min-w-[200px] m-2.5">
          <h4 className="text-base font-semibold mb-2">Contact</h4>
          <p>Email: info@mystore.com</p>
          <p>Phone: 123-456-7890</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center mt-4 border-t border-[#444] pt-2.5 text-sm text-[#aaa]">
        <p>&copy; 2024 My Store. All rights reserved.</p>
      </div>
    </footer>
  );
}

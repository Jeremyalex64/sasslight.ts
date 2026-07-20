import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="url(#goldGradientFooter)"
                />
                <path
                  d="M20 8C14 8 10 12 10 18C10 24 14 28 20 32C26 28 30 24 30 18C30 12 26 8 20 8ZM20 26C16 26 14 22 14 18C14 14 16 12 20 12C24 12 26 14 26 18C26 22 24 26 20 26Z"
                  fill="white"
                />
                <path
                  d="M20 14C18 14 17 15 17 18C17 21 18 22 20 23C22 22 23 21 23 18C23 15 22 14 20 14Z"
                  fill="url(#goldGradientFooter)"
                />
                <defs>
                  <linearGradient
                    id="goldGradientFooter"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#B8860B" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-xl font-bold">
                <span className="text-gray-300">SASS</span>
                <span className="text-amber-500">LIGHT</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted source for quality affiliate products and exclusive
              deals.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-500 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-500 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-amber-500 transition"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-amber-500 transition">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/terms" className="hover:text-amber-500 transition">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-amber-500 transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Sasslight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

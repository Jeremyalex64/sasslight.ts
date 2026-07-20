"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="20" cy="20" r="18" fill="url(#goldGradient)" />
              <path
                d="M20 8C14 8 10 12 10 18C10 24 14 28 20 32C26 28 30 24 30 18C30 12 26 8 20 8ZM20 26C16 26 14 22 14 18C14 14 16 12 20 12C24 12 26 14 26 18C26 22 24 26 20 26Z"
                fill="white"
              />
              <path
                d="M20 14C18 14 17 15 17 18C17 21 18 22 20 23C22 22 23 21 23 18C23 15 22 14 20 14Z"
                fill="url(#goldGradient)"
              />
              <defs>
                <linearGradient
                  id="goldGradient"
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
              <span className="text-gray-800">SASS</span>
              <span className="text-amber-600">LIGHT</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-amber-700 font-medium transition"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-amber-700 font-medium transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-amber-700 font-medium transition"
            >
              Contact
            </Link>
            <Link
              href="/blogs"
              className="text-gray-700 hover:text-amber-700 font-medium transition"
            >
              Blogs
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/"
              className="block text-gray-700 hover:text-amber-700 font-medium transition py-2"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-amber-700 font-medium transition py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-amber-700 font-medium transition py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/blogs"
              className="block text-gray-700 hover:text-amber-700 font-medium transition py-2"
              onClick={() => setIsOpen(false)}
            >
              Blogs
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client";

import { usePathname, useRouter } from "next/navigation";
import { seoCategories } from "@/lib/seo-categories";

export default function CategoryFilter() {
  const pathname = usePathname();
  const router = useRouter();

  const currentCategory = pathname.match(/^\/categories\/([^\/]+)$/)?.[1];

  return (
    <div className="mb-6 sm:mb-8" style={{ minHeight: "80px" }}>
      <h3 className="text-sm font-semibold text-gray-700 mb-3">
        Filter by Category
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => router.push("/")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
            !currentCategory
              ? "bg-amber-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          All Products
        </button>
        {seoCategories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => router.push(`/categories/${cat.slug}`)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
              currentCategory === cat.slug
                ? "bg-amber-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

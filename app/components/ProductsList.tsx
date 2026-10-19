"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/products";

const PRODUCTS_PER_PAGE = 20;

interface ProductsListProps {
  categoryFilter?: string | null;
}

export default function ProductsList({
  categoryFilter,
}: ProductsListProps = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const data = (await res.json()) as Product[];
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, categoryFilter]);

  // Filter by category using the prop instead of pathname
  const filteredByCategory = categoryFilter
    ? products.filter(
        (p) => p.categories && p.categories.includes(categoryFilter),
      )
    : products;

  const filteredProducts = filteredByCategory.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Use requestAnimationFrame to avoid forced reflow
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  return (
    <div>
      <h2 className="sr-only">Products</h2>
      <div className="mb-6 sm:mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 text-base sm:text-lg border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-800 text-white placeholder-gray-400"
          style={{ minWidth: "280px" }}
        />
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-base sm:text-lg">
            No products available yet.
          </p>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Check back soon for new additions!
          </p>
        </div>
      ) : (
        <>
          <div
            className={`grid gap-3 sm:gap-6 ${
              currentProducts.length < 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
                : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
            style={{ minHeight: currentProducts.length < 4 ? "auto" : "680px" }}
          >
            {currentProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition active:scale-[0.98]"
                style={{
                  minHeight: "320px",
                  contain: "layout style paint",
                  contentVisibility: "auto",
                }}
              >
                {product.image && (
                  <div
                    className="relative w-full h-40 sm:h-48 overflow-hidden group"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                      fetchPriority={index === 0 ? "high" : "auto"}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAP//////////////////////////////////////wAALCAACAgBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAACv/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AT//Z"
                      quality={75}
                    />
                  </div>
                )}
                <div className="p-3 sm:p-6">
                  <h2 className="text-sm sm:text-lg xl:text-xl font-semibold mb-2 text-white line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-green-400">
                      {product.price}
                    </span>
                    <a
                      href={product.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 sm:py-2 rounded-md hover:bg-blue-700 transition text-center text-sm sm:text-base active:bg-blue-800"
                      aria-label={`Get access to ${product.name} - opens in new tab`}
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mt-6 sm:mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-full sm:w-auto px-6 py-3 sm:px-4 sm:py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 active:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base text-white"
              >
                Previous
              </button>
              <span className="text-gray-300 text-sm sm:text-base">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto px-6 py-3 sm:px-4 sm:py-2 bg-gray-800 border border-gray-700 rounded-md hover:bg-gray-700 active:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base text-white"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

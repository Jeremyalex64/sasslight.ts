"use client";

import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductsList from "../components/ProductsList";

interface CategoryContentProps {
  initialCategory: string;
}

export default function CategoryContent({
  initialCategory,
}: CategoryContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory,
  );

  return (
    <>
      <CategoryFilter
        onCategoryChange={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <ProductsList categoryFilter={selectedCategory} />
    </>
  );
}

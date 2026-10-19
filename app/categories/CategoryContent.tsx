"use client";

import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import ProductsList from "../components/ProductsList";

export default function CategoryContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

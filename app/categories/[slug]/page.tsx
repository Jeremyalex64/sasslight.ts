import { Metadata } from "next";
import { seoCategories } from "@/lib/seo-categories";
import Navigation from "@/components/Navigation";
import CategoryFilter from "../../components/CategoryFilter";
import ProductsList from "../../components/ProductsList";
import Footer from "@/components/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = seoCategories.find((c) => c.slug === slug);
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} - Sasslight`,
    description: `Discover ${category.primaryKeyword} and ${category.keywords.slice(0, 3).join(", ")}. Your trusted source for quality affiliate products and exclusive deals.`,
    keywords: [category.primaryKeyword, ...category.keywords],
    openGraph: {
      title: `${category.name} - Sasslight`,
      description: `Discover ${category.primaryKeyword} and ${category.keywords.slice(0, 3).join(", ")}. Your trusted source for quality affiliate products and exclusive deals.`,
      url: `https://sasslight.com/categories/${slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = seoCategories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900">
              Category Not Found
            </h1>
            <p className="mt-4 text-gray-600">
              The category you're looking for doesn't exist.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1" style={{ minHeight: "600px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              {category.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {category.primaryKeyword} and{" "}
              {category.keywords.slice(0, 3).join(", ")}
            </p>
          </div>
          <CategoryFilter />
          <ProductsList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

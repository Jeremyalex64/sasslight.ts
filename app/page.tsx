import { Metadata } from "next";
import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: true,
  loading: () => <nav className="h-16 bg-white shadow-sm" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
  loading: () => <footer className="h-16 bg-gray-900" />,
});

const ProductsList = dynamic(() => import("./components/ProductsList"), {
  loading: () => (
    <div className="text-center py-12">
      <p className="text-gray-500">Loading products...</p>
    </div>
  ),
});

export const revalidate = 1800; // Revalidate every 30 minutes

export const metadata: Metadata = {
  title:
    "Sasslight - Affiliate Marketing Store | Best Deals & Exclusive Products",
  description:
    "Discover amazing affiliate products and exclusive deals at Sasslight. Your trusted source for quality digital products, software, courses, and more at unbeatable prices.",
  keywords: [
    "affiliate marketing",
    "digital products",
    "online courses",
    "software deals",
    "exclusive offers",
    "best deals",
    "Sasslight",
    "affiliate store",
    "discount products",
  ],
  authors: [{ name: "Sasslight" }],
  metadataBase: new URL("https://sasslight.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sasslight - Affiliate Marketing Store",
    description:
      "Your trusted source for quality affiliate products and exclusive deals",
    type: "website",
    url: "https://sasslight.com",
    siteName: "Sasslight",
    images: [
      {
        url: "https://sasslight.com/sasslight-logo.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sasslight - Affiliate Marketing Store",
    description:
      "Your trusted source for quality affiliate products and exclusive deals",
    images: ["https://sasslight.com/sasslight-logo.png"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Discover Amazing Affiliate Products
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Your trusted source for quality digital products, software,
              courses, and exclusive deals at unbeatable prices.
            </p>
          </div>
          <ProductsList />
        </div>
      </main>
      <Footer />
    </div>
  );
}

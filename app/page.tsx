import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HomeContent from "./HomeContent";

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title:
    "Sasslight - Affiliate Marketing Store | Best Deals & Exclusive Products",
  description:
    "Discover amazing affiliate products and exclusive deals at Sasslight. Your trusted source for quality digital products, software, courses, and more at unbeatable prices.",
  keywords: [
    "affiliate marketing",
    "buy digital products",
    "digital products",
    "software deals",
    "online courses",
    "best affiliate products",
  ],
  openGraph: {
    title: "Sasslight - Affiliate Marketing Store",
    description:
      "Your trusted source for quality affiliate products and exclusive deals",
    type: "website",
    url: "https://sasslight.jeremyalex64.workers.dev",
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

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1 bg-gray-900" style={{ minHeight: "600px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Discover Amazing Digital Products
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Browse our curated collection of premium digital products,
              software, courses, and exclusive deals at unbeatable prices.
            </p>
          </div>
          <HomeContent />
        </div>
      </main>
      <Footer />
    </div>
  );
}

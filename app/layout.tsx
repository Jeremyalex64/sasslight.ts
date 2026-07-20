import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

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
  openGraph: {
    title: "Sasslight - Affiliate Marketing Store",
    description:
      "Your trusted source for quality affiliate products and exclusive deals",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sasslight",
    description:
      "Your trusted source for quality affiliate products and exclusive deals",
    url: "https://sasslight.com",
    logo: "https://sasslight.com/sasslight-logo.png",
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/sasslight-logo.png" type="image/png" />
        <link
          rel="dns-prefetch"
          href="https://pub-ce20785b75344a2485765616a6418c35.r2.dev"
        />
        <link
          rel="preload"
          href="/sasslight-logo.png"
          as="image"
          type="image/png"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          async
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

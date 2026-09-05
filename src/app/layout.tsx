import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SASSLIGHT — Curated JVZoo Affiliate Products",
	description:
		"Discover hand-picked JVZoo affiliate products. Honest reviews, great deals, and tools to grow your business.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/sasslight-logo.png" type="image/png" />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}>
				<Header />
				<main className="flex-1">{children}</main>
				<Footer />
			</body>
		</html>
	);
}

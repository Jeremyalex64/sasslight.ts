import Link from "next/link";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import AdminProductList from "@/components/AdminProductList";

export const metadata: Metadata = {
	title: "Admin Dashboard — SassLight",
};

export default async function AdminPage() {
	const products = await getAllProducts();

	return (
		<div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Admin Dashboard</h1>
					<p className="mt-2 text-zinc-600 dark:text-zinc-400">Manage your JVZoo affiliate products.</p>
				</div>
				<Link
					href="/add-product"
					className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-500"
				>
					+ Add Product
				</Link>
			</div>

			<div className="mt-10">
				<AdminProductList products={products} />
			</div>
		</div>
	);
}

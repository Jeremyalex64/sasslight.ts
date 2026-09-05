"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProductForm() {
	const router = useRouter();
	const [form, setForm] = useState({
		name: "",
		description: "",
		price: "",
		imageUrl: "",
		affiliateLink: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const res = await fetch("/api/products", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});

			if (!res.ok) {
				const data = (await res.json()) as { error?: string };
				setError(data.error || "Failed to add product");
				return;
			}

			router.push("/admin");
			router.refresh();
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const inputClass =
		"mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100";
	const labelClass = "block text-sm font-medium text-zinc-700 dark:text-zinc-300";

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			{error && (
				<div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
					{error}
				</div>
			)}

			<div>
				<label htmlFor="name" className={labelClass}>
					Product Name
				</label>
				<input
					id="name"
					name="name"
					type="text"
					value={form.name}
					onChange={handleChange}
					required
					className={inputClass}
					placeholder="Amazing JVZoo Product"
				/>
			</div>

			<div>
				<label htmlFor="description" className={labelClass}>
					Description
				</label>
				<textarea
					id="description"
					name="description"
					value={form.description}
					onChange={handleChange}
					required
					rows={4}
					className={inputClass}
					placeholder="Describe the product and its benefits..."
				/>
			</div>

			<div>
				<label htmlFor="price" className={labelClass}>
					Price
				</label>
				<input
					id="price"
					name="price"
					type="text"
					value={form.price}
					onChange={handleChange}
					required
					className={inputClass}
					placeholder="$47.00"
				/>
			</div>

			<div>
				<label htmlFor="imageUrl" className={labelClass}>
					Product Image URL
				</label>
				<input
					id="imageUrl"
					name="imageUrl"
					type="url"
					value={form.imageUrl}
					onChange={handleChange}
					required
					className={inputClass}
					placeholder="https://example.com/product-image.jpg"
				/>
			</div>

			<div>
				<label htmlFor="affiliateLink" className={labelClass}>
					JVZoo Affiliate Link
				</label>
				<input
					id="affiliateLink"
					name="affiliateLink"
					type="url"
					value={form.affiliateLink}
					onChange={handleChange}
					required
					className={inputClass}
					placeholder="https://www.jvzoo.com/c/..."
				/>
			</div>

			<div className="flex gap-3 pt-2">
				<button
					type="submit"
					disabled={loading}
					className="rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-amber-500 disabled:opacity-50"
				>
					{loading ? "Adding..." : "Add Product"}
				</button>
				<button
					type="button"
					onClick={() => router.push("/admin")}
					className="rounded-lg border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}

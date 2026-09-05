"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirect = searchParams.get("redirect") || "/admin";

	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password }),
			});

			if (!res.ok) {
				const data = (await res.json()) as { error?: string };
				setError(data.error || "Login failed");
				return;
			}

			router.push(redirect);
			router.refresh();
		} catch {
			setError("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			{error && (
				<div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
					{error}
				</div>
			)}

			<div>
				<label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
					Admin Password
				</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
					placeholder="Enter admin password"
				/>
			</div>

			<button
				type="submit"
				disabled={loading}
				className="w-full rounded-lg bg-amber-600 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-amber-500 disabled:opacity-50"
			>
				{loading ? "Signing in..." : "Sign In"}
			</button>
		</form>
	);
}

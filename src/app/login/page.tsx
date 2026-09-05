import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";
import NavBrand from "@/components/NavBrand";

export const metadata: Metadata = {
	title: "Admin Login — SASSLIGHT",
};

export default function LoginPage() {
	return (
		<div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-12 sm:px-6">
			<div className="w-full">
				<div className="flex justify-center">
					<NavBrand size="md" />
				</div>
				<h1 className="mt-8 text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100">
					Admin Access
				</h1>
				<p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
					Enter your password to manage products.
				</p>
				<div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
					<Suspense fallback={<div className="text-center text-zinc-500">Loading...</div>}>
						<LoginForm />
					</Suspense>
				</div>
			</div>
		</div>
	);
}

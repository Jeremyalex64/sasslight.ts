"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { brand } from "@/lib/brand";

interface LogoutButtonProps {
	className?: string;
}

export default function LogoutButton({ className = "" }: LogoutButtonProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);
		try {
			await fetch("/api/auth/login", { method: "DELETE" });
			router.push("/");
			router.refresh();
		} finally {
			setLoading(false);
		}
	};

	return (
		<button
			type="button"
			onClick={handleLogout}
			disabled={loading}
			className={`${brand.button.secondary} border-zinc-700 text-zinc-300 hover:border-red-800 hover:bg-red-950/50 hover:text-red-400 disabled:opacity-50 ${className}`}
		>
			{loading ? "Logging out..." : "Logout"}
		</button>
	);
}

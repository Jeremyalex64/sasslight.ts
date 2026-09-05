"use client";

import Link from "next/link";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

interface NavLink {
	href: string;
	label: string;
}

interface MobileNavProps {
	links: NavLink[];
	isLoggedIn: boolean;
}

export default function MobileNav({ links, isLoggedIn }: MobileNavProps) {
	const [open, setOpen] = useState(false);

	const closeMenu = () => setOpen(false);

	return (
		<div className="md:hidden">
			<button
				type="button"
				onClick={() => setOpen((prev) => !prev)}
				className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-700 text-zinc-300 transition-colors hover:border-amber-600 hover:text-amber-400"
				aria-expanded={open}
				aria-label={open ? "Close menu" : "Open menu"}
			>
				{open ? (
					<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				) : (
					<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
						<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				)}
			</button>

			{open && (
				<>
					<button
						type="button"
						className="fixed inset-0 top-28 z-40 bg-black/60 backdrop-blur-sm"
						onClick={closeMenu}
						aria-label="Close menu overlay"
					/>
					<nav className="absolute left-0 right-0 top-full z-50 border-b border-zinc-800 bg-black px-4 py-4 shadow-lg">
						<ul className="space-y-1">
							{links.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										onClick={closeMenu}
										className="block rounded-lg px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-amber-400"
									>
										{link.label}
									</Link>
								</li>
							))}
							{isLoggedIn && (
								<>
									<li>
										<Link
											href="/admin"
											onClick={closeMenu}
											className="block rounded-lg px-4 py-3 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 hover:text-amber-400"
										>
											Admin
										</Link>
									</li>
									<li className="px-4 pt-2">
										<LogoutButton className="w-full" />
									</li>
								</>
							)}
						</ul>
					</nav>
				</>
			)}
		</div>
	);
}

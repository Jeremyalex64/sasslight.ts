"use client";

import { useState } from "react";

export default function ContactForm() {
	const [submitted, setSubmitted] = useState(false);
	const [form, setForm] = useState({ name: "", email: "", message: "" });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
	};

	const inputClass =
		"mt-1 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100";

	if (submitted) {
		return (
			<div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-900 dark:bg-amber-950">
				<h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200">
					Message Sent!
				</h3>
				<p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
					Thanks for reaching out. We&apos;ll get back to you soon.
				</p>
			</div>
		);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div>
				<label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
					Name
				</label>
				<input
					id="name"
					type="text"
					value={form.name}
					onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
					required
					className={inputClass}
				/>
			</div>
			<div>
				<label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
					Email
				</label>
				<input
					id="email"
					type="email"
					value={form.email}
					onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
					required
					className={inputClass}
				/>
			</div>
			<div>
				<label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
					Message
				</label>
				<textarea
					id="message"
					value={form.message}
					onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
					required
					rows={5}
					className={inputClass}
				/>
			</div>
			<button
				type="submit"
				className="rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-amber-500"
			>
				Send Message
			</button>
		</form>
	);
}

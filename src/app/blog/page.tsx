import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
	title: "Blog — SassLight",
	description: "Affiliate marketing tips, JVZoo guides, and product insights.",
};

export default function BlogPage() {
	const posts = getAllPosts();

	return (
		<div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
			<h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Blog</h1>
			<p className="mt-4 text-zinc-600 dark:text-zinc-400">
				Tips, strategies, and insights for affiliate marketers.
			</p>

			<div className="mt-10 space-y-8">
				{posts.map((post) => (
					<article
						key={post.slug}
						className="rounded-2xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
					>
						<time className="text-sm text-zinc-500">
							{new Date(post.date).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</time>
						<h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
							<Link href={`/blog/${post.slug}`} className="hover:text-emerald-600">
								{post.title}
							</Link>
						</h2>
						<p className="mt-2 text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
						<Link
							href={`/blog/${post.slug}`}
							className="mt-4 inline-block text-sm font-medium text-emerald-600 hover:text-emerald-700"
						>
							Read more →
						</Link>
					</article>
				))}
			</div>
		</div>
	);
}

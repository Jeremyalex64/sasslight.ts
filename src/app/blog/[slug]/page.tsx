import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

export function generateStaticParams() {
	return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) return { title: "Post Not Found" };
	return { title: `${post.title} — SassLight`, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = getPostBySlug(slug);
	if (!post) notFound();

	return (
		<article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
			<Link
				href="/blog"
				className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
			>
				← Back to Blog
			</Link>

			<time className="mt-6 block text-sm text-zinc-500">
				{new Date(post.date).toLocaleDateString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				})}{" "}
				· {post.author}
			</time>

			<h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">{post.title}</h1>

			<div className="mt-8 space-y-4 whitespace-pre-line text-zinc-600 leading-relaxed dark:text-zinc-400">
				{post.content}
			</div>
		</article>
	);
}

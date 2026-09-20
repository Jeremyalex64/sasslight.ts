import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPostSlugs } from "../../../lib/sanity";
import PortableText from "../../../components/PortableText";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const seoTitle = post.seo?.metaTitle || post.title;
  const seoDescription = post.seo?.metaDescription || post.excerpt;

  return {
    title: `${seoTitle} — SassLight`,
    description: seoDescription,
    keywords: post.seo?.keywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: post.seo?.ogImage
        ? [post.seo.ogImage]
        : post.coverImage
          ? [post.coverImage]
          : [],
    },
    robots: {
      index: !post.seo?.noIndex,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
        {post.publishedAt
          ? new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "Draft"}{" "}
        · {post.author || "SassLight Team"}
      </time>

      <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {post.title}
      </h1>

      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.coverImage.alt || post.title}
          className="mt-8 w-full rounded-lg"
        />
      )}

      <div className="mt-8 prose prose-zinc dark:prose-invert max-w-none">
        <PortableText value={post.content} />
      </div>
    </article>
  );
}

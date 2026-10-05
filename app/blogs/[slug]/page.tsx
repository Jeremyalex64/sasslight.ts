import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import PortableText from "@/components/PortableText";
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/image-url";

const Navigation = dynamic(() => import("@/components/Navigation"), {
  ssr: true,
  loading: () => <nav className="h-16 bg-white shadow-sm" />,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: true,
  loading: () => <footer className="h-16 bg-gray-900" />,
});

export const revalidate = 3600;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Blog Post Not Found" };
  }

  const title = post.seo?.metaTitle || `${post.title} - Sasslight Blog`;
  const description =
    post.seo?.metaDescription ||
    post.excerpt ||
    `Read ${post.title} on Sasslight Blog`;
  const ogImage = post.seo?.ogImage || post.coverImage;

  return {
    title,
    description,
    keywords: post.seo?.keywords,
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      images: ogImage ? [urlFor(ogImage).width(1200).height(630).url()] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(slug, post.categories || [], 3);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <article className="flex-1 max-w-3xl w-full">
              {post.coverImage ? (
                <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(post.coverImage).width(1200).height(675).url()}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 768px"
                  />
                </div>
              ) : null}

              <header className="mb-6 sm:mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                  {post.categories?.map((category) => (
                    <span
                      key={category}
                      className="text-xs sm:text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  {post.author ? <span>By {post.author}</span> : null}
                  {post.author && post.publishedAt ? <span>•</span> : null}
                  {post.publishedAt ? (
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  ) : null}
                </div>
              </header>

              {post.excerpt ? (
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
              ) : null}

              <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                <PortableText value={post.content} />
              </div>
            </article>

            <aside className="w-full lg:w-80 space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                <div className="text-center text-gray-400 text-xs sm:text-sm">
                  Advertisement Space
                </div>
                <div className="w-full h-48 sm:h-64 bg-gray-100 rounded mt-2 flex items-center justify-center">
                  <span className="text-gray-400 text-xs sm:text-sm">
                    300x250 Ad
                  </span>
                </div>
              </div>

              {post.categories && post.categories.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    Categories
                  </h3>
                  <ul className="space-y-1 sm:space-y-2">
                    {post.categories.map((category) => (
                      <li key={category}>
                        <Link
                          href={`/blogs?category=${encodeURIComponent(category)}`}
                          className="block text-sm sm:text-base text-gray-600 hover:text-amber-600 transition py-1 sm:py-0"
                          aria-label={`Browse more posts in ${category} category`}
                        >
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  Related Posts
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {relatedPosts.length === 0 ? (
                    <p className="text-gray-400 text-xs sm:text-sm">
                      No related posts yet
                    </p>
                  ) : (
                    relatedPosts.map((related) => (
                      <Link
                        key={related._id}
                        href={`/blogs/${related.slug.current}`}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-amber-600 transition">
                          {related.title}
                        </h4>
                        {related.publishedAt ? (
                          <time className="text-xs text-gray-500">
                            {new Date(related.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </time>
                        ) : null}
                      </Link>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-3 sm:p-4">
                <div className="w-full h-48 sm:h-64 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-xs sm:text-sm">
                    300x250 Ad
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

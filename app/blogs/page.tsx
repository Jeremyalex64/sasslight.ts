import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { getAllPosts } from "@/sanity/queries";
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

export const metadata: Metadata = {
  title: "Blog - Sasslight Affiliate Marketing Insights",
  description:
    "Discover expert tips, strategies, and insights on affiliate marketing, digital products, and business growth from the Sasslight team.",
};

export default async function Blogs() {
  const blogPosts = await getAllPosts();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>

          {blogPosts.length === 0 ? (
            <p className="text-gray-600">
              No posts yet. Create your first article in{" "}
              <Link href="/studio" className="text-amber-600 hover:underline">
                Sanity Studio
              </Link>
              .
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  {post.coverImage ? (
                    <Link href={`/blogs/${post.slug.current}`}>
                      <div className="relative h-48 w-full">
                        <Image
                          src={urlFor(post.coverImage).width(600).height(338).url()}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </Link>
                  ) : null}

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      {post.categories?.[0] ? (
                        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                          {post.categories[0]}
                        </span>
                      ) : null}
                      {post.publishedAt ? (
                        <span className="text-xs text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-900">
                      <Link
                        href={`/blogs/${post.slug.current}`}
                        className="hover:text-amber-700 transition"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt ? (
                      <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    ) : null}
                    <Link
                      href={`/blogs/${post.slug.current}`}
                      className="text-amber-600 font-medium hover:text-amber-700 transition"
                      aria-label={`Read more about ${post.title}`}
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

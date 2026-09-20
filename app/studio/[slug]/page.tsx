import { redirect } from "next/navigation";

export default function StudioBlogRedirect({ params }: { params: { slug: string } }) {
  redirect(`/blogs/${params.slug}`);
}

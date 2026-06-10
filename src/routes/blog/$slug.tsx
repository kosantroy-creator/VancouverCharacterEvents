import { createFileRoute, notFound } from "@tanstack/react-router";
import { getPostBySlug } from "@/lib/blog-data";
import { BlogPostTemplate } from "@/components/site/BlogPostTemplate";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) return {};
    return {
      meta: [
        { title: `${post.title} | Vancouver Character Events` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${post.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${post.slug}` }],
    };
  },
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  return <BlogPostTemplate post={post} />;
}

import { getPostBySlug, getAllPosts } from "@/lib/posts";
import fs from "fs";
import path from "path";
import Link from "next/link";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/posts"));
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.md$/, ""),
    }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // Safe date instance (frontmatter may parse as Date or string)
  const date = new Date(String(post.date));
  const formattedDate = new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
    date,
  );

  // Basic reading time estimation from HTML text content
  const text = post.contentHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 225));

  // Previous/Next navigation
  const all = await getAllPosts();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <main className="min-h-screen bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {/* Back link + title */}
        <Link href="/" className="text-sm text-indigo-300 hover:text-white">
          ← Back to home
        </Link>

        <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-wide">
          {post.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-indigo-300">
          <time dateTime={date.toISOString()}>{formattedDate}</time>
          <span aria-hidden>•</span>
          <span>{readingTime} min read</span>
        </div>

        {/* Content */}
        <article className="mt-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl">
          <div
            className="prose prose-invert max-w-none px-5 sm:px-7 lg:px-10 py-8"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>

        <hr className="my-10 border-indigo-500/20" />

        {/* Prev/Next */}
        <nav className="grid sm:flex items-center justify-between gap-4 text-sm text-indigo-300">
          {prev ? (
            <Link
              href={`/posts/${prev.slug}`}
              className="group inline-flex items-center gap-2 hover:text-white transition-colors"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>
              <span className="line-clamp-1">Previous: {prev.title}</span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/posts/${next.slug}`}
              className="group inline-flex items-center gap-2 hover:text-white transition-colors self-end sm:self-auto"
            >
              <span className="line-clamp-1">Next: {next.title}</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </main>
  );
}

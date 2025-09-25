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

  // Derive a safe Date instance (frontmatter may parse as Date or string)
  const date = new Date((post.date as unknown) as string);
  const formattedDate = new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
    date,
  );

  // Basic reading time estimation from HTML text content
  const text = post.contentHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
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
    <section className="pb-12">
      <div className="bg-gradient-to-b from-neutral-50 to-transparent border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to home
          </Link>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            {post.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 text-sm text-gray-600">
            <time dateTime={date.toISOString()}>{formattedDate}</time>
            <span aria-hidden>•</span>
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div
          className="prose prose-neutral dark:prose-invert prose-img:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <hr className="my-10 border-neutral-200" />

        <nav className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm">
          {prev ? (
            <Link
              href={`/posts/${prev.slug}`}
              className="group inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
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
              className="group inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 self-end sm:self-auto"
            >
              <span className="line-clamp-1">Next: {next.title}</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </section>
  );
}

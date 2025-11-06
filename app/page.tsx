import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Hack The Planet",
};

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function excerptFromHtml(html: string, length = 240) {
  const text = stripHtml(html || "");
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "…";
}

export default async function HomePage() {
  const posts: Post[] = await getAllPosts();

  const pageTitle = typeof metadata.title === "string" ? metadata.title : "Home";

  return (
    <main className="min-h-screen bg-transparent p-10 font-sans">
      <h1 className="text-5xl font-bold mb-12 text-center tracking-wide">
        <span className="inline-flex items-center gap-2">
          {pageTitle}
          <span aria-hidden>🚀</span>
        </span>
      </h1>

      <div className="w-full max-w-3xl mx-auto mb-10">
        <div className="relative top-0 left-0 w-full h-full">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ/?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&loop=1&playlist=dQw4w9WgXcQ"
            title="Rick Astley - Never Gonna Give You Up"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {posts.map((post, i) => (
          <li key={post.slug} className="crash-in" style={{ animationDelay: `${i * 90}ms` }}>
            <Link
              href={`/posts/${post.slug}`}
              className="group block h-full rounded-xl bg-transparent p-6 shadow-lg"
              aria-label={`Read post: ${post.title}`}
            >
              <h2 className="text-lg font-semibold mb-2 group-hover:underline">{post.title}</h2>
              <span className="text-sm text-gray-600">{new Date(post.date).toLocaleDateString()}</span>

              <div className="mt-2 text-sm">
                {excerptFromHtml(post.contentHtml ?? "")}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

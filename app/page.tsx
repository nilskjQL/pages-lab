import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Hack The Planet",
};

export default async function HomePage() {
  const posts: Post[] = await getAllPosts();

  // Always use the current page title and append a rocket emoji
  const pageTitle =
    typeof metadata.title === "string" ? metadata.title : "Home";

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-700 to-blue-700 text-white p-10 font-sans">
      <h1 className="text-5xl font-bold mb-12 text-center tracking-wide">
        <span className="inline-flex items-center gap-2">
          <span>{pageTitle}</span>
          <span aria-hidden="true">🚀</span>
        </span>
      </h1>

      <div className="w-full max-w-3xl mx-auto mb-10">
        <div className="relative pt-[56.25%] rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&loop=1&playlist=dQw4w9WgXcQ"
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
              className="group block h-full rounded-xl bg-gradient-to-br from-purple-700 via-blue-700 to-cyan-700 p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label={`Read post: ${post.title}`}
            >
              <h2 className="text-lg font-semibold mb-2 underline-offset-4 group-hover:underline">
                {post.title}
              </h2>
              <span className="text-sm text-indigo-300">
                {post.date.toLocalDateString()}
              </span>
              <p className="mt-2 text-indigo-100">blabal</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

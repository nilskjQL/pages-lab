import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, Post } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Hack The Planet",
};

export default async function HomePage() {
  const posts: Post[] = await getAllPosts();

  return (
    <main className="min-h-screen bg-gradient-to-r from-red-700 to-blue-700 text-white p-10 font-sans">
      <h1 className="text-5xl font-bold mb-12 text-center tracking-wide">
        Hack The Planet
      </h1>
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
                {post.date.toLocaleDateString()}
              </span>
              <p className="mt-2 text-indigo-100">blabal</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

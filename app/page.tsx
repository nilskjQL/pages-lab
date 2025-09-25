import Link from "next/link";
import { getAllPosts, Post } from "@/lib/posts";

export default async function HomePage() {
  const posts: Post[] = await getAllPosts();

  return (
    <main className="min-h-screen bg-gradient-to-r from-cyan-900 via-blue-900 to-purple-900 text-white p-10 font-sans">
      <h1 className="text-5xl font-bold mb-12 text-center tracking-wide">
        Techy & Chill Blog Posts
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="bg-gradient-to-br from-purple-700 via-blue-700 to-cyan-700 rounded-xl p-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <Link
              href={`/posts/${post.slug}`}
              className="block text-lg font-semibold mb-2 hover:underline"
            >
              {post.title}
            </Link>
            <span className="text-sm text-indigo-300">
              {post.date.toLocaleDateString()}
            </span>
            <p className="mt-2 text-indigo-100">{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

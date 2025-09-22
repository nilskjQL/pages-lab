import Link from "next/link";
import { getAllPosts, Post } from "@/lib/posts";

export default async function HomePage() {
  const posts: Post[] = await getAllPosts();

  return (
    <main>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>{" "}
            <span> — {post.date.toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

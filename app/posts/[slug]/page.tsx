import { getPostBySlug } from "@/lib/posts";
import fs from "fs";
import path from "path";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/posts"));
  return files.map((file) => ({
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

  return (
    <section className="max-w-3xl mx-auto p-4 sm:p-8">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p>{post.date.toLocaleDateString()}</p>
      <div
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        className="prose"
      />
    </section>
  );
}

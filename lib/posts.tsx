import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  content: string;
  title: string;
  date: Date;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(process.cwd(), "content/posts", `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    ...data,
    slug,
    content,
    title: data.title,
    date: data.date,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const postsDir = path.join(process.cwd(), "content/posts");
  const fileNames = fs.readdirSync(postsDir);

  return fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        ...data,
        slug,
        content,
        title: data.title,
        date: data.date,
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

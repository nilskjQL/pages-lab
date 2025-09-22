import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface Post {
  slug: string;
  contentHtml: string;
  title: string;
  date: Date;
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(process.cwd(), "content/posts", `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return {
    ...data,
    slug,
    contentHtml,
    title: data.title,
    date: data.date,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const postsDir = path.join(process.cwd(), "content/posts");
  const fileNames = fs.readdirSync(postsDir);

  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const contentHtml = remark().use(html).processSync(content).toString();
      return {
        ...data,
        slug,
        contentHtml,
        title: data.title,
        date: data.date,
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

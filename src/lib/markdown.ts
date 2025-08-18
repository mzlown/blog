
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const hikesDirectory = path.join(process.cwd(), 'content/hikes');

export async function getHikeSlugs() {
  const files = await fs.readdir(hikesDirectory);
  return files.filter((file) => file.endsWith('.md')).map((file) => file.replace(/\.md$/, ''));
}

export async function getHikeBySlug(slug: string) {
  const fullPath = path.join(hikesDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    metadata: data,
    content,
  };
}


const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getPostSlugs() {
  const files = await fs.readdir(postsDirectory);
  return files.filter((file) => file.endsWith('.md')).map((file) => file.replace(/\.md$/, ''));
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    metadata: data,
    content,
  };
}

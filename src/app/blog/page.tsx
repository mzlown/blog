
import Link from 'next/link';
import { getPostSlugs, getPostBySlug } from '@/lib/markdown';
import Header from "../../components/header";

export default async function BlogIndexPage() {
      const slugs = await getPostSlugs();
    const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

    return (
        <div>
            <Header />
            <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
            <ul className="list-disc pl-6">
                {posts.map((post) => (
                <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
                </li>
                ))}
                </ul>
        </div>
  );
}

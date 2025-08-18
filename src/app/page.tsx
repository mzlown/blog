import Image from "next/image";
import Link from "next/link";
import Header from "../components/header";
import { getPostSlugs, getPostBySlug } from '@/lib/markdown';
import { title } from "process";

export default async function Home() {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug)));

  return (
    <div>
      <Header />
      <div className="px-6 py-4 flex flex-col items-center gap-[24px]">
        {posts.map((post, index) => (
          <Card key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

const Card = ({post}) => {
  return (
    <div className="w-xl rounded overflow-hidden shadow-md">
      <img src={post.metadata.img} alt={post.metadata.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{post.metadata.title}</div>
        <div className="font-bold text-lg mb-2">{post.metadata.date}</div>
        <p className="text-base mb-4">{post.metadata.summary}</p>
        <Link className="btn" href={`blog/${post.slug}`}>Read More</Link>
      </div>
    </div>
  );
};

import Image from "next/image";
import Link from "next/link";
import Header from "../components/header";
import ReactMarkdown from 'react-markdown';
import remarkEmoji from 'remark-emoji';
import { getHikeSlugs, getHikeBySlug, getPostSlugs, getPostBySlug } from '@/lib/markdown';
import { title } from "process";

export default async function Home() {
  const slugs = await getHikeSlugs();
  const hikes = await Promise.all(slugs.map((slug) => getHikeBySlug(slug)));
  const postSlugs = await getPostSlugs();
  const posts = await Promise.all(postSlugs.map((slug) => getPostBySlug(slug)));

  return (
    <div className="bg-[#f1f1f1] px-[16px] py-[16px]">
      <div className="flex flex-col gap-[8px] m-auto justify-center items-center mb-[24px]">
        <h1>Welcome to Trail Snackers</h1>
        <p>Where you come on adventures with me!</p>
        <h3>Recommended Hikes: 3</h3>
      </div>
      <div className="flex grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
        <div className="flex flex-col items-center lg:items-end gap-[24px] order-2 lg:order-1">
          {hikes.map((hike, index) => (
            <HikeCard key={index} post={hike} />
          ))}
        </div>
        <div className="flex flex-col items-center lg:items-start gap-[24px] order-1 lg:order-2">
          <div className="w-full lg:w-sm rounded overflow-hidden shadow-md bg-white">
            <img src="/hikes/gram.jpeg" alt="me"  />
            <div className="px-6 py-4">Hello trail friends! &#128522;</div>
          </div>
          <div className="flex flex-col items-center gap-[24px]">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HikeCard = ({post}) => {
  return (
    <div className="w-full lg:w-xl rounded overflow-hidden shadow-md bg-white">
      <img src={post.metadata.img} alt={post.metadata.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{post.metadata.title}</div>
        <div className="font-bold text-lg mb-2">{post.metadata.date}</div>
        <p className="text-base mb-4">{post.metadata.summary}</p>
        <Link className="btn" href={`hikes/${post.slug}`}>Read More</Link>
      </div>
    </div>
  );
};

const PostCard = ({post}) => {
  return (
    <div className="w-full lg:w-sm rounded overflow-hidden shadow-md bg-white">
      <div className="px-6 py-4">
        <ReactMarkdown remarkPlugins={[remarkEmoji]}>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
};


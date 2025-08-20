
import { getHikeBySlug, getHikeSlugs } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import remarkEmoji from 'remark-emoji';
import rehypeRaw from "rehype-raw";
import Header from '../../../components/header';

export async function generateStaticParams() {
  const slugs = await getHikeSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getHikeBySlug(slug);

  return (
    <div>
      <div className='px-[16px] py-[8px] w-full lg:w-[1024px] m-auto'>
        <ReactMarkdown remarkPlugins={[remarkEmoji]} rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}

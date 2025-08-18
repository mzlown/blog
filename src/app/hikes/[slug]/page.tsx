
import { getHikeBySlug, getHikeSlugs } from '@/lib/markdown';
import ReactMarkdown from 'react-markdown';
import remarkEmoji from 'remark-emoji';
import Header from '../../../components/header';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getHikeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getHikeBySlug(slug);

  return (
    <div>
      <Header />
      <div className='px-[16px] py-[8px]'>
        <h1>{post.metadata.title}</h1>
        <h2>{post.metadata.date}</h2>
        <ReactMarkdown remarkPlugins={[remarkEmoji]}>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}

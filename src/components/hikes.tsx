"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

const Hikes = ( {hikes} ) => {
  const allTags = [...new Set(hikes.map(hike => hike.metadata.tags).flat())].sort() as string[];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

  const filteredHikes = useMemo(() => {
    if (selectedTags.length === 0) return hikes;
    return hikes.filter(hike =>
      selectedTags.every(tag => hike.metadata.tags.includes(tag))
    );
  }, [selectedTags, hikes]);

  return (
    <div className="flex flex-col items-center lg:items-end gap-[24px] order-2 lg:order-1">
      <div className="flex flex-row flex-wrap gap-[8px] items-center w-full lg:w-xl rounded shadow-md bg-white px-6 py-4">
        <p>Tags: </p>
        {allTags.map((tag, index) => (
          <button 
            className={`px-2 py-1 rounded shadow ${
              selectedTags.includes(tag)
                ? "bg-blue-600 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`} 
            key={index}
           onClick={() => toggleTag(tag)}>{tag}</button>
        ))}
      </div>
      {filteredHikes.map((hike, index) => (
        <HikeCard key={index} post={hike} />
      ))}
    </div>
  );
};

const HikeCard = ({post}) => {
  const tags = post.metadata.tags;

  return (
    <div className="w-full lg:w-xl rounded overflow-hidden shadow-md bg-white">
      <img src={post.metadata.img} alt={post.metadata.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl">{post.metadata.title}</div>
        <div className="font-bold text-lg mb-2">{post.metadata.date}</div>
        <p className="text-base mb-4">{post.metadata.summary}</p>
        <Link href={`hikes/${post.slug}`}>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Read More
          </button>
        </Link>
        <div className="flex flex-row flex-wrap gap-2 mt-4 items-center">
          {tags.map((tag, index) => (
            <div key={index} className="bg-gray-100 rounded py-1 px-4">{tag}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hikes;

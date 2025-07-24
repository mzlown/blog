import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Zoe's website</h1>
      <Link href="/blog">Blog</Link>
    </div>
  );
}

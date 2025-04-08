import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';

interface FrontMatter {
  title: string;
  date: string;
  slug: string;
}

interface BlogPost {
  frontMatter: FrontMatter;
  slug: string;
}

export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <Head>
        <title>Blog | IntoTurnOne</title>
      </Head>
      <main className="max-w-4xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">From the Paddock: F1 Insights</h1>
        <ul className="space-y-6">
          {posts.map(({ frontMatter }) => (
            <li key={frontMatter.slug} className="border border-gray-800 rounded-lg p-4 hover:bg-gray-900 transition">
              <Link href={`/blog/${frontMatter.slug}`}>
                <div>
                  <h2 className="text-xl font-semibold">{frontMatter.title}</h2>
                  <p className="text-gray-400 text-sm">{new Date(frontMatter.date).toLocaleDateString()}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(blogDir);

  const posts: BlogPost[] = filenames.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    return {
      frontMatter: data as FrontMatter,
      slug: filename.replace(/\.mdx?$/, ''),
    };
  });

  // Optional: sort newest first
  posts.sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime());

  return {
    props: {
      posts,
    },
  };
}

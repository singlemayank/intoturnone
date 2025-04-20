import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Head from 'next/head';
import { format } from 'date-fns';
import Image from 'next/image';
import FeaturedCarousel from '@/components/FeaturedCarousel';


interface FrontMatter {
  title: string;
  date: string;
  slug: string;
  heroImage?: string;
  keywords?: string[];
}

interface BlogPost {
  frontMatter: FrontMatter;
  slug: string;
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

  posts.sort((a, b) => new Date(b.frontMatter.date).getTime() - new Date(a.frontMatter.date).getTime());

  return {
    props: {
      posts,
    },
  };
}
export default function BlogIndex({ posts }: { posts: BlogPost[] }) {
  const [hero, ...rest] = posts;

  return (
    <>
      <Head>
        <title>Blog | IntoTurnOne</title>
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-12 text-white">

  <h1 className="text-4xl font-bold mb-12">🏁 From the Paddock</h1>

  {/* ✅ Hero Post Section */}
  {hero && (
    <section className="mb-16">
      <Link href={`/blog/${hero.frontMatter.slug}`}>
        <div className="group relative h-[400px] w-full rounded-xl overflow-hidden border border-zinc-800 hover:shadow-xl transition">
          {hero.frontMatter.heroImage && (
            <Image
              src={hero.frontMatter.heroImage}
              alt={hero.frontMatter.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h2 className="text-3xl font-bold text-white group-hover:text-red-500 transition">
              {hero.frontMatter.title}
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              {format(new Date(hero.frontMatter.date), 'dd MMM yyyy')}
            </p>
          </div>
        </div>
      </Link>
    </section>
  )}

  {/* ✅ Post Grid Section */}
  <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {rest.map(({ frontMatter }) => (
      <Link key={frontMatter.slug} href={`/blog/${frontMatter.slug}`}>
        <div className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl overflow-hidden shadow hover:shadow-xl transition duration-300 cursor-pointer group">
          {frontMatter.heroImage && (
            <div className="relative h-48 w-full">
              <Image
                src={frontMatter.heroImage}
                alt={frontMatter.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-1 line-clamp-2">{frontMatter.title}</h3>
            <p className="text-gray-400 text-sm mb-2">
              {format(new Date(frontMatter.date), 'dd MMM yyyy')}
            </p>
            {frontMatter.keywords && (
              <div className="flex flex-wrap gap-2 mt-2">
                {frontMatter.keywords.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-zinc-800 text-gray-300 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    ))}
  </section>
</main>

    </>
  );
}

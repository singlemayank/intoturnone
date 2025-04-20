import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';

interface Props {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    date: string;
    slug: string;
  };
}

// ✅ Custom render mappings: demote h1 from MDX to h2/h3 and force white text
const components = {
  h1: (props: any) => <h2 className="text-2xl font-semibold my-6 text-white" {...props} />,
  h2: (props: any) => <h3 className="text-xl font-semibold my-5 text-white" {...props} />,
  h3: (props: any) => <h4 className="text-lg font-medium my-4 text-white" {...props} />,
  p: (props: any) => <p className="my-4 leading-7 text-white" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside my-4 text-white" {...props} />,
  li: (props: any) => <li className="ml-6 my-1 text-white" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-gray-500 pl-4 italic text-white my-4" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-800 text-pink-400 px-1 py-0.5 rounded" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-black text-white p-4 rounded my-4 overflow-x-auto" {...props} />
  ),
  img: (props: any) => <img className="rounded shadow my-4" alt={props.alt} {...props} />,
};

export default function BlogPost({ source, frontMatter }: Props) {
  const formattedDate = new Date(frontMatter.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <Head>
        <title>{`${frontMatter.title} | IntoTurnOne`}</title>
        <meta name="description" content={`Read about ${frontMatter.title}`} />
      </Head>

      <main className="prose lg:prose-xl dark:prose-invert max-w-4xl mx-auto px-4 py-10">
        {/* ✅ Title stays <h1> for accessibility and SEO */}
        <h1 className="text-white text-4xl font-bold mb-2">{frontMatter.title}</h1>
        <p className="text-sm text-gray-400 mb-6">{formattedDate}</p>
        <MDXRemote {...source} components={components} />
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(blogDir);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.mdx?$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  const mdx = await serialize(content);

  return {
    props: {
      source: mdx,
      frontMatter: {
        slug,
        ...data,
      },
    },
  };
};

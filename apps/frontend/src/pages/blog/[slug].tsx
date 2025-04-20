import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import { JSX } from 'react';

interface Props {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    date: string;
    slug: string;
  };
}

// ✅ ESLint-safe types for component overrides
const components = {
  h1: (props: JSX.IntrinsicElements['h1']) => (
    <h2 className="text-2xl font-semibold my-6 text-white" {...props} />
  ),
  h2: (props: JSX.IntrinsicElements['h2']) => (
    <h3 className="text-xl font-semibold my-5 text-white" {...props} />
  ),
  h3: (props: JSX.IntrinsicElements['h3']) => (
    <h4 className="text-lg font-medium my-4 text-white" {...props} />
  ),
  p: (props: JSX.IntrinsicElements['p']) => (
    <p className="my-4 leading-7 text-white" {...props} />
  ),
  ul: (props: JSX.IntrinsicElements['ul']) => (
    <ul className="list-disc list-inside my-4 text-white" {...props} />
  ),
  li: (props: JSX.IntrinsicElements['li']) => (
    <li className="ml-6 my-1 text-white" {...props} />
  ),
  blockquote: (props: JSX.IntrinsicElements['blockquote']) => (
    <blockquote className="border-l-4 border-gray-500 pl-4 italic text-white my-4" {...props} />
  ),
  code: (props: JSX.IntrinsicElements['code']) => (
    <code className="bg-gray-800 text-pink-400 px-1 py-0.5 rounded" {...props} />
  ),
  pre: (props: JSX.IntrinsicElements['pre']) => (
    <pre className="bg-black text-white p-4 rounded my-4 overflow-x-auto" {...props} />
  ),
  img: (props: JSX.IntrinsicElements['img']) => (
    <img className="rounded shadow my-4" alt={props.alt} {...props} />
  ),
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

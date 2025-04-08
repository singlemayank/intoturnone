import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

interface Props {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    title: string;
    date: string;
    slug: string;
  };
}

export default function BlogPost({ source, frontMatter }: Props) {
  return (
    <div className="prose prose-invert max-w-4xl mx-auto p-4">
      <h1>{frontMatter.title}</h1>
      <MDXRemote {...source} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'content/blog'));
  const paths = files.map((filename) => ({
    params: { slug: filename.replace('.mdx', '') }
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);
  const mdxSource = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(mdxSource);

  const mdx = await serialize(content);

  return {
    props: {
      source: mdx,
      frontMatter: data
    }
  };
};

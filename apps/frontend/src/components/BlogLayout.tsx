import Head from 'next/head';

interface BlogLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function BlogLayout({ title, children }: BlogLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Into Turn One</title>
        <meta name="description" content={`${title} - F1 blog from Into Turn One`} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="max-w-3xl mx-auto px-4 py-12 text-white bg-black font-sans leading-relaxed">
        {children}
      </main>
    </>
  );
}

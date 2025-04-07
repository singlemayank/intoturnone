import Head from 'next/head';
import { useTrendingNews } from '@/hooks/useTrendingNews';

export default function NewsPage() {
  const { data, error, isLoading } = useTrendingNews();

  return (
    <>
      <Head>
        <title>Latest F1 News | IntoTurnOne</title>
      </Head>
      <main className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">📰 Latest News</h1>

        {isLoading && <p>Loading news...</p>}
        {error && <p>Failed to load news. Try again later.</p>}

        <ul className="space-y-4">
          {data?.items?.map((item: any) => (
            <li key={item.link}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-200 rounded-lg p-4 hover:shadow transition"
              >
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.published}</p>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

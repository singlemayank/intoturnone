import { useTrendingNews } from '@/hooks/useTrendingNews';

const TrendingSection = () => {
  const { data, error, isLoading } = useTrendingNews();

  if (isLoading) return <p>Loading news...</p>;
  if (error) return <p>Failed to load news</p>;
  if (!data?.items || !Array.isArray(data.items)) return <p>No news available.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">🔥 Trending Now</h2>
      <ul className="space-y-2">
        {data.items.slice(0, 5).map((item: any) => (
          <li key={item.link}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-500"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingSection;

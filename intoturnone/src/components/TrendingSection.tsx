import Link from 'next/link';

const trendingArticles = [
  {
    title: 'Leclerc vs Norris: Who’s the Real Threat to Max?',
    link: '/blog/leclerc-norris-battle',
  },
  {
    title: 'McLaren’s Hidden Aero Upgrade Revealed',
    link: '/blog/mclaren-aero-upgrade',
  },
  {
    title: 'Alonso’s Radio Rant Explained',
    link: '/blog/alonso-radio-analysis',
  },
];

export default function TrendingSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 border-b border-red-600 pb-2">
        Trending Now
      </h2>
      <ul className="space-y-4">
        {trendingArticles.map((article, idx) => (
          <li key={idx}>
            <Link href={article.link} className="text-lg text-white hover:text-red-500 transition">
              → {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
